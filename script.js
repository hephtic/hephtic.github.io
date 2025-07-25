document.addEventListener("DOMContentLoaded", function() {
  // Initialize particles
  if (typeof particlesJS !== 'undefined') {
    particlesJS.load('particles-js', 'particles.json', function() {
      console.log('Particles loaded.');
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