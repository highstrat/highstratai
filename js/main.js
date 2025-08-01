// HIGHSTRAT AI Platform JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Phase Navigation
    initPhaseNavigation();
    
    // Initialize interactive elements
    initializeToolCards();
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            if (targetId) {
                showPhase(targetId);
            }
        });
    });
    
    // Add responsiveness handling
    handleResponsiveLayout();
    
    // Initialize demo data
    initializeDemoData();
});

// Function to handle phase navigation
function initPhaseNavigation() {
    // Handle sidebar navigation
    const sidebarLinks = document.querySelectorAll('.nav-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the appropriate phase
            const phaseId = this.getAttribute('data-phase');
            showPhase(phaseId);
        });
    });
    
    // Handle phase navigation buttons
    const phaseButtons = document.querySelectorAll('.phase-navigation button');
    phaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const phaseId = this.getAttribute('data-phase');
            
            // Update sidebar active state
            sidebarLinks.forEach(link => {
                if (link.getAttribute('data-phase') === phaseId) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
            
            showPhase(phaseId);
        });
    });
}

// Function to show the selected phase
function showPhase(phaseId) {
    // Add loading state
    const content = document.querySelector('.content');
    content.style.opacity = '0.7';
    content.style.pointerEvents = 'none';
    
    setTimeout(() => {
        // Hide all phase containers
        const containers = document.querySelectorAll('.phase-container');
        containers.forEach(container => container.classList.remove('active'));
        
        // Show the selected phase container
        const activeContainer = document.getElementById(phaseId);
        if (activeContainer) {
            activeContainer.classList.add('active');
            
            // Update phase navigation buttons 
            const phaseButtons = document.querySelectorAll('.phase-navigation button');
            phaseButtons.forEach(button => {
                if (button.getAttribute('data-phase') === phaseId) {
                    button.classList.add('active');
                } else {
                    button.classList.remove('active');
                }
            });
            
            // Update breadcrumb navigation
            const phaseNames = {
                'dashboard': 'Dashboard',
                'assess': 'Assess & Strategize',
                'design': 'Design & Modernize',
                'source': 'Source & Match',
                'implement': 'Implement & Deploy',
                'contract': 'Contract & Procure',
                'optimize': 'Optimize & Evolve'
            };
            
            const phaseSteps = {
                'dashboard': 1,
                'assess': 2,
                'design': 3,
                'source': 4,
                'implement': 5,
                'contract': 6,
                'optimize': 7
            };
            
            // Update breadcrumb
            const currentPhaseElement = document.getElementById('current-phase');
            const phaseStepElement = document.querySelector('.phase-step');
            
            if (currentPhaseElement && phaseStepElement) {
                currentPhaseElement.textContent = phaseNames[phaseId] || phaseId;
                phaseStepElement.textContent = `Step ${phaseSteps[phaseId] || 1} of 7`;
            }
            
            // Show success notification
            showNotification(`Switched to ${phaseNames[phaseId] || phaseId}`, 'success');
        }
        
        // Remove loading state
        content.style.opacity = '1';
        content.style.pointerEvents = 'auto';
    }, 200);
}

// Function to handle responsive layout
function handleResponsiveLayout() {
    const checkWidth = () => {
        const isMobile = window.innerWidth <= 768;
        const sidebar = document.querySelector('.sidebar');
        
        if (isMobile) {
            // Mobile optimizations
            sidebar.classList.add('mobile');
        } else {
            // Desktop layout
            sidebar.classList.remove('mobile');
        }
    };
    
    // Run on load
    checkWidth();
    
    // Run on resize
    window.addEventListener('resize', checkWidth);
}

// Function to initialize tool cards
function initializeToolCards() {
    const toolButtons = document.querySelectorAll('.tool-button');
    const toolCards = document.querySelectorAll('.tool-card');
    
    // Add hover effects to tool cards
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
    
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolName = this.parentElement.querySelector('h3').textContent;
            
            // Add loading state to button
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;
            this.style.opacity = '0.7';
            
            // Show a simple notification
            showNotification(`Launching ${toolName}...`, 'info');
            
            // For demo purposes, we'll just show a notification
            setTimeout(() => {
                showNotification(`${toolName} launched successfully!`, 'success');
                
                // Reset button state
                this.textContent = originalText;
                this.disabled = false;
                this.style.opacity = '1';
            }, 1500);
        });
    });
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    // Create icon based on type
    const icon = document.createElement('i');
    switch(type) {
        case 'success':
            icon.className = 'fas fa-check-circle';
            break;
        case 'error':
            icon.className = 'fas fa-exclamation-circle';
            break;
        case 'warning':
            icon.className = 'fas fa-exclamation-triangle';
            break;
        default:
            icon.className = 'fas fa-info-circle';
    }
    
    // Create message text
    const text = document.createElement('span');
    text.textContent = message;
    
    // Append elements
    notification.appendChild(icon);
    notification.appendChild(text);
    
    // Add to DOM
    if (!document.querySelector('.notifications-container')) {
        const container = document.createElement('div');
        container.className = 'notifications-container';
        document.body.appendChild(container);
    }
    
    document.querySelector('.notifications-container').appendChild(notification);
    
    // Add active class after a slight delay for animation
    setTimeout(() => {
        notification.classList.add('active');
    }, 10);
    
    // Remove notification after a delay
    setTimeout(() => {
        notification.classList.remove('active');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Function to initialize demo data (in a real app, this would come from an API)
function initializeDemoData() {
    // Add user name if available
    const userName = localStorage.getItem('userName');
    if (userName) {
        document.querySelector('.user-name').textContent = userName;
    }
    
    // Add event listeners for settings and help
    document.querySelector('.settings-link').addEventListener('click', e => {
        e.preventDefault();
        showNotification('Settings panel will be available in the next update.', 'info');
    });
    
    document.querySelector('.help-link').addEventListener('click', e => {
        e.preventDefault();
        showNotification('Help documentation will be available in the next update.', 'info');
    });
    
    // Add CSS for notifications that we generate dynamically
    const style = document.createElement('style');
    style.textContent = `
        .notifications-container {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
        
        .notification {
            background-color: white;
            border-radius: 8px;
            padding: 12px 15px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 10px;
            transform: translateX(120%);
            opacity: 0;
            transition: all 0.3s ease;
            min-width: 250px;
        }
        
        .notification.active {
            transform: translateX(0);
            opacity: 1;
        }
        
        .notification i {
            font-size: 20px;
        }
        
        .notification.info i {
            color: #0056b3;
        }
        
        .notification.success i {
            color: #28a745;
        }
        
        .notification.warning i {
            color: #ffc107;
        }
        
        .notification.error i {
            color: #dc3545;
        }
    `;
    document.head.appendChild(style);
}
