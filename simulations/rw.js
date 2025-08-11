// --- Global Variables ---
const stepsList = [100, 1000, 10000, 20000];
const trials = 500;

let isAnimating = false;
let chartInstance = null;

// For 3D visualization
let threeRenderer, threeScene, threeCamera, threeAnimationId;

function getThemeColors() {
  const isDark = document.documentElement.classList.contains('dark');
  return {
    line: 'purple',
    text: isDark ? '#fff' : '#000',
    grid: isDark ? '#444' : '#ccc',
    // If you keep transparent canvas/webgl:
    clearColor: 0x000000,
    clearAlpha: 0,
  };
}

const colors = getThemeColors()



// --- Utility: Simulate a random walk path ---
function simulatePath(dim, steps) {
  const path = [];
  const pos = Array(dim).fill(0);

  for (let i = 0; i <= steps; i++) {
    path.push([...pos]);
    const axis = Math.floor(Math.random() * dim);
    const direction = Math.random() < 0.5 ? -1 : 1;
    pos[axis] += direction;
  }

  return path;
}

// --- Compute Return-to-Origin Rates ---
function computeReturnRates(dim) {
  const maxSteps = Math.max(...stepsList);
  const returnCounts = Object.fromEntries(stepsList.map(s => [s, 0]));

  for (let t = 0; t < trials; t++) {
    const path = simulatePath(dim, maxSteps);
    let returned = false;

    for (let i = 1; i <= maxSteps; i++) {
      const pos = path[i];
      const atOrigin = pos.every(coord => coord === 0);

      if (atOrigin && !returned) returned = true;

      if (stepsList.includes(i) && returned) {
        returnCounts[i]++;
      }
    }
  }

  return stepsList.map(s => returnCounts[s] / trials);
}

// --- Animate a Single Random Walk ---
function animatePath(dim) {
  const canvas = resetCanvas('walk-visualization');
  isAnimating = false;
  cancelAnimationFrame(threeAnimationId);

  // Clean up 3D if any
  if (threeRenderer) {
    threeRenderer.dispose?.();
    threeRenderer.forceContextLoss?.();
    threeRenderer.domElement = null;
    threeRenderer = null;
    threeScene = null;
    threeCamera = null;
  }

  const isDark = document.documentElement.classList.contains('dark');

  const steps = 200;
  const path = simulatePath(dim, steps);

  if (dim === 3) {
    // THREE.js visualization
    threeScene = new THREE.Scene();
    threeCamera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    threeRenderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });

    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array(path.flat());
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

    const material = new THREE.LineBasicMaterial({ color: colors.line });
    const line = new THREE.Line(geometry, material);
    threeScene.add(line);

    threeCamera.position.z = 18;
    isAnimating = true;
    let drawCount = 2; // start with the first segment
    function animate() {
      if (!isAnimating) return;

      if (drawCount < vertices.length / 3) {
        drawCount += 2; // increment by 1 point (or 2 for a smoother segment reveal)
        geometry.setDrawRange(0, drawCount);
      }

      line.rotation.x += 0.01;
      line.rotation.y += 0.01;

      threeRenderer.render(threeScene, threeCamera);
      threeAnimationId = requestAnimationFrame(animate);
    }

    animate();

  } else {
    // Canvas 1D/2D
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const scale = 5;
    const origin = { x: canvas.width / 2, y: canvas.height / 2 };

    let i = 0;
    isAnimating = true;

    function drawStep() {
      if (!isAnimating || i >= path.length - 1) return;

      const [x1, y1] = path[i];
      const [x2, y2] = path[i + 1];

      const startX = origin.x + (x1 || 0) * scale;
      const startY = origin.y + (y1 || 0) * scale;
      const endX = origin.x + (x2 || 0) * scale;
      const endY = origin.y + (y2 || 0) * scale;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = colors.line;    
      ctx.stroke();

      i++;
      requestAnimationFrame(drawStep);
    }

    drawStep();
  }
}

// --- Run Simulation + Update Chart ---
function runSimulation() {
  if (isAnimating) return;

  const runBtn = document.getElementById('run-btn');
  runBtn.disabled = true;
  runBtn.textContent = 'Simulating...';

  const dim = parseInt(document.getElementById('dimension-select').value);
  const rates = computeReturnRates(dim);

  // Display text summary
  const results = document.getElementById('return-rates');
  results.innerHTML = '';
  stepsList.forEach((step, i) => {
    const li = document.createElement('li');
    li.textContent = `${step} steps: ≈ ${(rates[i] * 100).toFixed(2)}% returned`;
    results.appendChild(li);
  });

  // Animate a single walk
  animatePath(dim);

  // Plot chart
  const chartCanvas = document.getElementById('returnChart');
  const ctx = chartCanvas.getContext('2d');

  if (chartInstance) chartInstance.destroy();

  const isDark = document.documentElement.classList.contains('dark');
chartInstance = new Chart(ctx, {
  type: 'line',
  data: {
    labels: stepsList,
    datasets: [{
      label: `Return Rate in ${dim}D`,
      data: rates,
      borderColor: colors.line,
      pointBackgroundColor: colors.line,
      pointBorderColor: colors.line,
      tension: 0.2
    }]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: colors.text,
          font: {
            family: 'Computer Modern Serif',
            size: 14,
          }
        }
      }
    },
    scales: {
      y: {
        min: 0, max: 1,
        title: {
          display: true,
          text: 'Return Rate',
          color: colors.text,
          font: {
            family: 'Computer Modern Serif',
            size: 14,
          }
        },
        ticks: {
          color: colors.text,
          font: {
            family: 'Computer Modern Serif',
            size: 12,
          }
        },
        grid: { color: colors.grid }
      },
      x: {
        title: {
          display: true,
          text: 'Steps',
          color: colors.text,
          font: {
            family: 'Computer Modern Serif',
            size: 14,
          }
        },
        ticks: {
          color: colors.text,
          font: {
            family: 'Computer Modern Serif',
            size: 12,
          }
        },
        grid: { color: colors.grid }
      }
    }
  }
});


  setTimeout(() => {
    isAnimating = false;
    runBtn.disabled = false;
    runBtn.textContent = 'Run Simulation';
  }, 3500);
}

function updateChartTheme() {
  if (!chartInstance) return;
  const colors = getThemeColors();

  chartInstance.data.datasets.forEach(ds => {
    ds.borderColor = colors.line;
    ds.pointBackgroundColor = colors.line;
    ds.pointBorderColor = colors.line;
  });

  chartInstance.options.plugins.legend.labels.color = colors.text;

  chartInstance.options.scales.x.ticks.color = colors.text;
  chartInstance.options.scales.y.ticks.color = colors.text;

  chartInstance.options.scales.x.grid.color = colors.grid;
  chartInstance.options.scales.y.grid.color = colors.grid;

  chartInstance.options.scales.x.title.color = colors.text;
  chartInstance.options.scales.y.title.color = colors.text;

  chartInstance.update('none'); // no animation; no data change
}

function resetCanvas(id) {
  const old = document.getElementById(id);
  const clone = old.cloneNode(false); // preserves width/height attributes
  old.replaceWith(clone);
  return clone;
}

function updateThreeTheme() {
  const colors = getThemeColors();
  if (threeRenderer) threeRenderer.setClearColor(colors.clearColor, colors.clearAlpha);

  if (threeScene) {
    threeScene.traverse(obj => {
      if (obj.isLine && obj.material?.color) {
        obj.material.color.set(colors.line);
      }
    });
    // Render once to show the new colors immediately
    if (threeCamera && threeRenderer) threeRenderer.render(threeScene, threeCamera);
  }
}

function updateChartTheme() {
  if (!chartInstance) return;
  const colors = getThemeColors();

  chartInstance.data.datasets.forEach(ds => {
    ds.borderColor = colors.line;
    ds.pointBackgroundColor = colors.line;
    ds.pointBorderColor = colors.line;
  });

  chartInstance.options.plugins.legend.labels.color = colors.text;
  chartInstance.options.scales.x.ticks.color = colors.text;
  chartInstance.options.scales.y.ticks.color = colors.text;
  chartInstance.options.scales.x.grid.color = colors.grid;
  chartInstance.options.scales.y.grid.color = colors.grid;
  chartInstance.options.scales.x.title.color = colors.text;
  chartInstance.options.scales.y.title.color = colors.text;

  chartInstance.update('none');
}

// --- Setup Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('run-btn').addEventListener('click', runSimulation);

  const observer = new MutationObserver(mutations => {
    for (const m of mutations) {
      if (m.attributeName === 'class') {
        updateChartTheme();
        updateThreeTheme();
      }
    }
  });
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
});