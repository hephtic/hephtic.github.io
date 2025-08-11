(() => {
  const canvas = document.getElementById("needleCanvas");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  const lineSpacing = 50;
  const needleLength = 50;
  const totalNeedles = 1000;
  const animateLimit = 1000;

  let hits = 0;
  let total = 0;
  let animationFrame;
  let piEstimates = [];

  const statsEl = document.getElementById("stats");
    
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

  function updateTextColors() {
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    statsEl.style.color = textColor;
  }

  // Get colors once
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
  const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-bg').trim();

  const chartCtx = document.getElementById('piChart').getContext('2d');
  const piChart = new Chart(chartCtx, {
    type: 'line',
    data: {
      labels: [],
      datasets: [
        {
          label: 'π Estimate',
          borderColor: '#0077ff',
          borderWidth: 2,
          fill: false,
          data: []
        },
        {
          label: 'Actual π',
          borderColor: '#E27D60',
          borderDash: [5, 5],
          borderWidth: 1.5,
          fill: false,
          data: []
        }
      ]
    },
    options: {
      responsive: false,
      animation: false,
      scales: {
        y: {
          suggestedMin: 2,
          suggestedMax: 4,
          ticks: { color: colors.text },
          grid: { color: gridColor },
          title: {
            display: true,
            text: 'π Estimate',
            color: textColor,
            font: { family: "'Computer Modern Serif', serif", size: 16 }
          }
        },
        x: {
          ticks: { color: colors.text },
          grid: { color: gridColor },
          title: {
            display: true,
            text: 'Total Needles Dropped',
            color: textColor,
            font: { family: "'Computer Modern Serif', serif", size: 16 }
          }
        }
      },
      plugins: {
        legend: {
          labels: {
            color: colors.text,
            font: { family: "'Computer Modern Serif', serif", size: 14 }
          }
        }
      }
    }
  });

  function drawLines() {
    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
    ctx.lineWidth = 1;
    for (let y = 0; y <= height; y += lineSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function dropNeedle(draw = false) {
    const xCenter = Math.random() * width;
    const yCenter = Math.random() * height;
    const angle = Math.random() * Math.PI;

    const dx = (needleLength / 2) * Math.cos(angle);
    const dy = (needleLength / 2) * Math.sin(angle);

    const x1 = xCenter - dx;
    const y1 = yCenter - dy;
    const x2 = xCenter + dx;
    const y2 = yCenter + dy;

    const crosses = Math.floor(y1 / lineSpacing) !== Math.floor(y2 / lineSpacing);
    if (crosses) hits++;
    total++;

    if (draw) {
      ctx.strokeStyle = crosses ? "#0077ff" : "#000000";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    updateStats();
  }

  function updateStats() {
    const piEstimate = hits > 0 ? (2 * needleLength * total) / (lineSpacing * hits) : NaN;
    const piRounded = hits > 0 ? piEstimate.toFixed(5) : "N/A";

    statsEl.innerText = `Hits: ${hits} | Total: ${total} | π Estimate: ${piRounded}`;

    if (hits > 0) {
      piEstimates.push(piEstimate);
      piChart.data.labels.push(total);
      piChart.data.datasets[0].data.push(piEstimate);
      piChart.data.datasets[1].data.push(Math.PI);
      piChart.update();
    }
  }

  function startSimulation() {
    let count = 0;
    function step() {
      if (count >= totalNeedles) return;
      dropNeedle(count < animateLimit);
      count++;
      animationFrame = requestAnimationFrame(step);
    }
    step();
  }

  function resetSim() {
    cancelAnimationFrame(animationFrame);
    hits = 0;
    total = 0;
    piEstimates = [];
    statsEl.innerText = "Hits: 0 | Total: 0 | π Estimate: N/A";

    piChart.data.labels = [];
    piChart.data.datasets.forEach(ds => ds.data = []);
    piChart.update();

    ctx.clearRect(0, 0, width, height); // Clear all needles
    drawLines(); // Redraw the background lines
  }

  function updateChartColors() {
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-color').trim();
    const gridColor = getComputedStyle(document.documentElement).getPropertyValue('--sidebar-bg').trim();

    piChart.options.scales.x.ticks.color = textColor;
    piChart.options.scales.y.ticks.color = textColor;
    piChart.options.scales.x.grid.color = gridColor;
    piChart.options.scales.y.grid.color = gridColor;

    piChart.options.scales.x.title.color = textColor;
    piChart.options.scales.y.title.color = textColor;

    piChart.options.plugins.legend.labels.color = textColor;

    piChart.update();
  }

  function observeThemeChanges() {
    const observer = new MutationObserver(() => {
      updateChartColors();
      updateTextColors();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }

  observeThemeChanges();

  // Expose functions globally for button onclicks
  window.startSimulation = startSimulation;
  window.resetSim = resetSim;

  drawLines();
})();

