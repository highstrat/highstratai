// HIGHSTRAT AI Platform JavaScript

// Function to show the selected phase
function showPhase(phaseId) {
  // Hide all phase containers
  const containers = document.querySelectorAll('.phase-container');
  containers.forEach(container => container.classList.remove('active'));

  // Show the selected phase container
  const activeContainer = document.getElementById(phaseId);
  activeContainer.classList.add('active');
  
  // Update active state in sidebar
  const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
  sidebarLinks.forEach(link => {
    if (link.getAttribute('onclick').includes(phaseId)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
  
  // Update active state in phase navigation
  const phaseButtons = document.querySelectorAll('.phase-navigation button');
  phaseButtons.forEach(button => {
    if (button.getAttribute('onclick').includes(phaseId)) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

// Initialize the platform when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Set Dashboard as active in sidebar
  const dashboardLink = document.querySelector('.sidebar ul li a[onclick*="dashboard"]');
  if (dashboardLink) {
    dashboardLink.classList.add('active');
  }
});
