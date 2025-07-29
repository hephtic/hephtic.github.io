document.addEventListener("DOMContentLoaded", function() {
  // Initialize particles
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 150 },
        "color": { "value": "#58a6ff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.4 },
        "size": { "value": 1.5 },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#58a6ff",
          "opacity": 0.2,
          "width": 1
        },
        "move": { "enable": true, "speed": 0.7 }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": { "onhover": { "enable": false} }
      }
    });
  }

  // Theme toggle functionality
  const toggleButton = document.getElementById('theme-toggle');
  const icon = document.getElementById('theme-icon');
  const html = document.documentElement;

  // Initial state
  if (localStorage.getItem('theme') === 'dark') {
    html.classList.add('dark');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  // Toggle logic
  toggleButton.addEventListener('click', () => {
    html.classList.toggle('dark');
    const isDark = html.classList.contains('dark');
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    // Update graph colors if visible
    if (document.getElementById('graphView')?.classList.contains('active')) {
      updateGraphColors();
    }
  });

  // Fade out particles before navigating to a new page
  document.querySelectorAll('.sidebar a').forEach(link => {
    const url = link.getAttribute('href');
    if (!url || url.startsWith('http') || url.startsWith('#')) return;
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const particles = document.getElementById('particles-js');
      if (particles) {
        particles.style.opacity = 0;
      }
      setTimeout(() => {
        window.location.href = url;
      }, 300); // Match to your CSS transition
    });
  });

  // Fade in particles on page load
  const particles = document.getElementById('particles-js');
  if (particles) {
    setTimeout(() => {
      particles.style.opacity = 1;
    }, 300); // Small delay to trigger the transition
  }

  window.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      window.addEventListener("scroll", () => {
        const scrollY = window.scrollY;
        const particles = document.getElementById("particles-js");
        if (particles) {
          particles.style.transform = `translateY(${scrollY * -0.2}px)`;
        }
      });
    }, 1500); // Wait for entry effect to finish
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const sidebar = document.querySelector(".sidebar");

  // Restore saved expansion state
  if (localStorage.getItem("sidebarExpanded") === "true") {
    sidebar.classList.add("expanded");
  }

  sidebar.addEventListener("mouseenter", () => {
    sidebar.classList.add("expanded");
    localStorage.setItem("sidebarExpanded", "true");
  });

  sidebar.addEventListener("mouseleave", () => {
    sidebar.classList.remove("expanded");
    localStorage.setItem("sidebarExpanded", "false");
  });

  const hoverZone = document.querySelector(".sidebar-hover-zone");
  if (hoverZone) {
    hoverZone.addEventListener("mouseenter", () => {
      sidebar.classList.add("expanded");
      localStorage.setItem("sidebarExpanded", "true");
    });

    hoverZone.addEventListener("mouseleave", () => {
      sidebar.classList.remove("expanded");
      localStorage.setItem("sidebarExpanded", "false");
    });
  }
});



document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("mobile-menu");
  const toggleButton = document.getElementById("sidebar-toggle");

  // Unified toggle function
  const toggleMenu = () => {
    menu.classList.toggle("hidden"); // For CSS that uses .hidden
    menu.classList.toggle("show");   // For CSS that uses .show
  };

  // Toggle on button click
  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent document click handler from firing
    toggleMenu();
  });

  // Close when clicking outside
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !toggleButton.contains(event.target)) {
      menu.classList.add("hidden");
      menu.classList.remove("show");
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menu.classList.add("hidden");
      menu.classList.remove("show");
    }
  });
});

let toggleLocked = false;

document.getElementById("toggle-view").addEventListener("click", () => {
  if (toggleLocked) return; // Ignore if locked
  toggleLocked = true;

  const textView = document.getElementById("textView");
  const graphView = document.getElementById("graphView");
  const viewIcon = document.getElementById("view-icon");
  const isGraphActive = graphView.classList.contains("active");

  if (!isGraphActive) {
    // Closing textView
    textView.classList.remove("active");
    // Opening graphView after delay for closing animation
    setTimeout(() => {
      graphView.classList.add("active");
      viewIcon.classList.remove("fa-diagram-project");
      viewIcon.classList.add("fa-list");
      // (Re)init graph here if needed)
      if (typeof initGraph === "function") initGraph();
    }, 500); // Match to your CSS transition duration
  } else {
    // Closing graphView
    graphView.classList.remove("active");
    // Opening textView after delay for closing animation
    setTimeout(() => {
      textView.classList.add("active");
      viewIcon.classList.remove("fa-list");
      viewIcon.classList.add("fa-diagram-project");
    }, 500); // Match to your CSS transition duration
  }

  // Unlock after transition (match your transition duration)
  setTimeout(() => {
    toggleLocked = false;
  }, 500); // 500ms transition + 100ms buffer
});

function initGraph() {
  const container = document.getElementById("project-graph");
  if (!container) {
    console.error("Graph container not found!");
    return;
  }

  // Theme colors
  const isDark = document.documentElement.classList.contains('dark');
  const nodeColor = isDark ? 'white' : 'black';
  const edgeColor = isDark ? 'white' : 'black';
  const fontColor = isDark ? 'white' : 'black';
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim() || '#fff';

  // Create nodes
  const nodes = new vis.DataSet([
  {
    id: 1,
    label: "Polymarket \nData Analysis",
    description: "Scraper and analysis toolkit for Polymarket trade, comment, and price data. Enables large-scale prediction market research.",
    url: "https://github.com/hephtic/blank"
  },
  {
    id: 2,
    label: "Income \nFactors",
    description: "Analyzes gender wage gaps using regression, decomposition, and machine learning on IPUMS labor data.",
    url: "https://github.com/hephtic/usa_income"
  },
  {
    id: 3,
    label: "Unemployment \nRecovery",
    description: "Quantile regressions explore the role of education in U.S. county-level unemployment recovery after COVID.",
    url: "https://github.com/hephtic/unemployment-education-recovery-analysis"
  },
  {
    id: 4,
    label: "Sticky \nInflation",
    description: "Decomposes CPI data to analyze sticky inflation and constructs a housing inflation tracker using Zillow data.",
    url: "https://github.com/hephtic/sticky-analysis"
  },
  {
    id: 5,
    label: "Game Theory \nSimulation",
    description: "Agent-based simulation of public goods games with punishment and mutation; identifies cooperation regimes.",
    url: "https://github.com/hephtic/game_theory"
  }
]);

  // Create edges
  const edges = new vis.DataSet([
  // Data-heavy and API-focused connection
  { id: 1, from: 1, to: 2 }, // Polymarket ↔ Income Factors (both use large datasets, regression/ML)

  // Policy & labor-related
  { id: 2, from: 2, to: 3 }, // Income Factors ↔ Unemployment Recovery (labor economics)

  // COVID recovery to inflation (macroeconomic link)
  { id: 3, from: 3, to: 4 }, // Unemployment Recovery ↔ Sticky Inflation

  // Theoretical/simulation link
  { id: 4, from: 2, to: 5 }, // Income Factors ↔ Game Theory (behavioral/social science overlap)

  // Optional: loop Polymarket into inflation (prediction market + macro)
  { id: 5, from: 1, to: 4 }  // Polymarket ↔ Sticky Inflation
]);

  // Network options
  const options = {
    physics: {
      enabled: true,
      solver: 'forceAtlas2Based', // Better for organic floating movement
      forceAtlas2Based: {
        gravitationalConstant: -50, // Negative for repulsion
        centralGravity: 0.01,      // Very weak central pull
        springLength: 120,         // Natural edge length
        springConstant: 0.08,      // Edge stiffness
        damping: 0.4,              // Higher = less bouncy (0.4 gives nice float)
        avoidOverlap: 0.2          // Prevents node overlap
      },
      stabilization: {
        enabled: true,
        iterations: 50,            // Fewer iterations = less rigid initial layout
        updateInterval: 25         // Smoother stabilization
      },
      timestep: 0.5,              // Slower simulation speed
      adaptiveTimestep: true       // Automatically adjusts speed
    },
    interaction: {
      dragNodes: false,            // Prevent manual node movement
      dragView: false,             // Prevent panning
      zoomView: false,             // Prevent zooming
      hover: true                  // Keep hover enabled
    },
    nodes: {
      shape: 'circle',
      color: {
        background: bgColor,
        border: nodeColor,
        highlight: { background: bgColor, border: nodeColor },
        hover: { background: bgColor, border: nodeColor }
      },
      font: {
        color: fontColor,
        size: 14,
        face: 'Computer Modern Serif, Georgia, Cambria, Times New Roman, serif',
      },
      borderWidth: 2,
      size: 30,
    },
    edges: {
      color: edgeColor,
      width: 2,
      smooth: false
    }
  };

  // Create the network
  const network = new vis.Network(container, { nodes, edges }, options);
  const velocities = {};

// after `const network = new vis.Network(...)`
  const originalPositions = network.getPositions();
  nodes.getIds().forEach(id => velocities[id] = { x: 0, y: 0 });

  /**
   * startFloat: continuous, smooth, slight drift around each node's original pos
   *
   * @param  {Network} network
   * @param  {DataSet} nodes
   * @param  {Object}  originalPositions  map nodeId → {x,y}
   * @param  {Object}  velocities         map nodeId → {x,y}
   * @param  {Object}  opts                tuning params
   * @return {Function}                    stop function
   */
function addFloatingMotionToNodes(nodeIds, {
  amplitude = 5,
  speed = 0.002,
} = {}) {

  const basePositions = network.getPositions(nodeIds);
  const offsets = {};

  nodeIds.forEach(id => {
    offsets[id] = {
      offsetX: Math.random() * 2 * Math.PI,
      offsetY: Math.random() * 2 * Math.PI
    };
  });

  function animate(time) {
    nodeIds.forEach(id => {
      const base = basePositions[id];
      const { offsetX, offsetY } = offsets[id];

      const dx = amplitude * Math.sin(offsetX + time * speed);
      const dy = amplitude * Math.cos(offsetY + time * speed);

      network.moveNode(id, base.x + dx, base.y + dy);
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

network.once('stabilizationIterationsDone', () => {
  const nodeIds = nodes.getIds();  // Just the IDs
  addFloatingMotionToNodes(nodeIds, {
    amplitude: 4,
    speed: 0.0013
  });
});

  // Store globally for theme updates
  window.graphNetwork = network;
  window.graphNodes = nodes;
  window.graphEdges = edges;

  // Animation state
  const animationFrames = new Map();
  const minSize = 50;
  const maxSize = 80;
  const animationStep = 0.01;
  const animationDelay = 16;
  let descHideTimeout = null;

  // Description box
  const descriptionBox = document.getElementById("description-box");

  // Node hover animation and description
  network.on("hoverNode", function (params) {
    const nodeId = params.node;
    const node = nodes.get(nodeId);
    if (!node) return;

    // Cancel any pending hide for description
    if (descHideTimeout) {
      clearTimeout(descHideTimeout);
      descHideTimeout = null;
    }

    // Show description
    if (descriptionBox) {
      descriptionBox.innerHTML = `<span>${node.label}</span><br>${node.description}`;
      descriptionBox.style.display = "block";
      setTimeout(() => { descriptionBox.style.opacity = 1; }, 10);
    }

    // Animate grow
    function grow() {
      const current = nodes.get(nodeId);
      let size = current.size || minSize;
      if (size < maxSize) {
        size = Math.min(size + animationStep, maxSize);
        nodes.update({ id: nodeId, size });
        const frame = setTimeout(grow, animationDelay);
        animationFrames.set(nodeId, frame);
      } else {
        nodes.update({ id: nodeId, size: maxSize });
        animationFrames.delete(nodeId);
      }
    }
    grow();
  });

  network.on("blurNode", function (params) {
    const nodeId = params.node;
    const node = nodes.get(nodeId);
    if (!node) return;

    // Cancel any running animation for this node
    if (animationFrames.has(nodeId)) {
      clearTimeout(animationFrames.get(nodeId));
      animationFrames.delete(nodeId);
    }

    // Hide description (with delay)
    if (descriptionBox) {
      descriptionBox.style.opacity = 0;
      descHideTimeout = setTimeout(() => {
        descriptionBox.style.display = "none";
        descHideTimeout = null;
      }, 120);
    }

    // Animate shrink
    function shrink() {
      const current = nodes.get(nodeId);
      let size = current.size || maxSize;
      if (size > minSize) {
        size = Math.max(size - animationStep, minSize);
        nodes.update({ id: nodeId, size });
        const frame = setTimeout(shrink, animationDelay);
        animationFrames.set(nodeId, frame);
      } else {
        nodes.update({ id: nodeId, size: minSize });
        animationFrames.delete(nodeId);
      }
    }
    shrink();
  });

  network.on("hoverNode", function () {
    network.body.container.style.cursor = "pointer";
  });
  
  network.on("blurNode", function () {
    network.body.container.style.cursor = "default";
  });

  // Open link on node click
  network.on("click", function(params) {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const node = nodes.get(nodeId);
      if (node && node.url) {
        window.open(node.url, "_blank");
      }
    }
  });
}

// Theme update function
function updateGraphColors() {
  const isDark = document.documentElement.classList.contains('dark');
  const nodeColor = isDark ? 'white' : 'black';
  const edgeColor = isDark ? 'white' : 'black';
  const fontColor = isDark ? 'white' : 'black';
  const bgColor = getComputedStyle(document.documentElement).getPropertyValue('--bg-color').trim() || '#fff';

  if (window.graphNetwork && window.graphNodes && window.graphEdges) {
    window.graphNodes.forEach(function(node) {
      window.graphNodes.update({
        id: node.id,
        color: {
          background: bgColor,
          border: nodeColor,
          highlight: { background: bgColor, border: nodeColor },
          hover: { background: bgColor, border: nodeColor }
        },
        font: { color: fontColor }
      });
    });
    window.graphEdges.forEach(function(edge) {
      window.graphEdges.update({
        id: edge.id,
        color: { color: edgeColor, inherit: false }
      });
    });
  }
}