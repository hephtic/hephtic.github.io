document.addEventListener("DOMContentLoaded", function() {
  // Initialize particles
  if (typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      "particles": {
        "number": { "value": 60 },
        "color": { "value": "#58a6ff" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.3 },
        "size": { "value": 2 },
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
  const body = document.body;

  // Initial state
  if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  }

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDark = body.classList.contains('dark-mode');

    // Update icon
    icon.classList.toggle('fa-moon', !isDark);
    icon.classList.toggle('fa-sun', isDark);

    // Save preference
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  // View toggle functionality
  document.getElementById("toggle-view").addEventListener("click", () => {
    const g = document.getElementById("graph-view");
    const l = document.getElementById("list-view");
    g.style.display = g.style.display === "none" ? "block" : "none";
    l.style.display = l.style.display === "none" ? "block" : "none";
  });
});

fetch('sidebar.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('sidebar-container').innerHTML = data;
  });