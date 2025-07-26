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

  // Update icon
  icon.classList.toggle('fa-moon', !isDark);
  icon.classList.toggle('fa-sun', isDark);

  // Save preference
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
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

