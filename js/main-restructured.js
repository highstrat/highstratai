// HIGHSTRAT AI Platform - Restructured JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI
    setupNavigationHandlers();
    
    // Load data from Supabase (or mock data)
    loadDashboardData();
    
    // Set up tool card interactions
    setupToolCards();
});

// Function to set up navigation handlers
function setupNavigationHandlers() {
    // Set up sidebar navigation
    const sidebarLinks = document.querySelectorAll('.sidebar ul li a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the phase ID from the onclick attribute
            const onclickAttr = this.getAttribute('onclick');
            const phaseId = onclickAttr.match(/'([^']+)'/)[1];
            
            // Show the selected phase
            showPhase(phaseId);
            
            // Update active state in sidebar
            sidebarLinks.forEach(link => {
                if (link.getAttribute('onclick').includes(phaseId)) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });
        });
    });
    
    // Set up phase navigation buttons
    const phaseButtons = document.querySelectorAll('.phase-navigation button');
    phaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            // The onclick attribute already handles phase display,
            // but we'll add the active state management here
            const onclickAttr = this.getAttribute('onclick');
            const phaseId = onclickAttr.match(/'([^']+)'/)[1];
            
            phaseButtons.forEach(btn => {
                if (btn.getAttribute('onclick').includes(phaseId)) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        });
    });
}

// Function to show the selected phase
function showPhase(phaseId) {
    // Hide all phase containers
    const containers = document.querySelectorAll('.phase-container');
    containers.forEach(container => container.classList.remove('active'));
    
    // Show the selected phase container
    const activeContainer = document.getElementById(phaseId);
    if (activeContainer) {
        activeContainer.classList.add('active');
    }
}

// Function to load dashboard data from Supabase (or mock data)
async function loadDashboardData() {
    try {
        // Projects widget
        const projects = await fetchProjects();
        renderProjects(projects);
        
        // Assessments widget
        const assessments = await fetchAssessments();
        renderAssessments(assessments);
        
        // Metrics widget
        const metrics = await fetchMetrics();
        renderMetrics(metrics);
        
        // Activities widget
        const activities = await fetchActivities();
        renderActivities(activities);
    } catch (error) {
        console.error('Error loading dashboard data:', error);
        showError('Failed to load dashboard data. Please try again later.');
    }
}

// Function to render projects in the projects widget
function renderProjects(projects) {
    const projectsWidget = document.getElementById('projectsWidget');
    const widgetContent = projectsWidget.querySelector('.widget-content');
    
    if (projects.length === 0) {
        widgetContent.innerHTML = '<p>No active projects found.</p>';
        return;
    }
    
    let html = '';
    projects.forEach(project => {
        html += `
            <div class="project-card">
                <h4>${project.name}</h4>
                <div class="details">
                    <span class="date">${project.startDate} - ${project.endDate}</span>
                    <span class="status ${project.status.toLowerCase().replace(' ', '-')}">${project.status}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-value" style="width: ${project.completion}%"></div>
                </div>
            </div>
        `;
    });
    
    widgetContent.innerHTML = html;
}

// Function to render assessments in the assessments widget
function renderAssessments(assessments) {
    const assessmentsWidget = document.getElementById('assessmentsWidget');
    const widgetContent = assessmentsWidget.querySelector('.widget-content');
    
    if (assessments.length === 0) {
        widgetContent.innerHTML = '<p>No recent assessments found.</p>';
        return;
    }
    
    let html = '';
    assessments.forEach(assessment => {
        html += `
            <div class="assessment-card">
                <div class="score">${assessment.score}</div>
                <div class="details">
                    <h4>${assessment.name}</h4>
                    <div class="date">${assessment.date} • ${assessment.status}</div>
                </div>
            </div>
        `;
    });
    
    widgetContent.innerHTML = html;
}

// Function to render metrics in the metrics widget
function renderMetrics(metrics) {
    const metricsWidget = document.getElementById('metricsWidget');
    const widgetContent = metricsWidget.querySelector('.widget-content');
    
    if (metrics.length === 0) {
        widgetContent.innerHTML = '<p>No metrics available.</p>';
        return;
    }
    
    let html = '';
    metrics.forEach(metric => {
        html += `
            <div class="metric-row">
                <span class="label">${metric.name}</span>
                <span class="value">${metric.value}</span>
                <span class="trend ${metric.trend}">
                    <i class="fas fa-arrow-${metric.trend === 'up' ? 'up' : 'down'}"></i>
                    ${metric.percent}%
                </span>
            </div>
        `;
    });
    
    widgetContent.innerHTML = html;
}

// Function to render activities in the activities widget
function renderActivities(activities) {
    const activitiesWidget = document.getElementById('activitiesWidget');
    const widgetContent = activitiesWidget.querySelector('.widget-content');
    
    if (activities.length === 0) {
        widgetContent.innerHTML = '<p>No recent activities found.</p>';
        return;
    }
    
    let html = '';
    activities.forEach(activity => {
        let icon;
        switch (activity.type) {
            case 'assessment':
                icon = 'fa-clipboard-check';
                break;
            case 'contract':
                icon = 'fa-file-signature';
                break;
            case 'implementation':
                icon = 'fa-cogs';
                break;
            case 'design':
                icon = 'fa-pencil-ruler';
                break;
            default:
                icon = 'fa-calendar-check';
        }
        
        html += `
            <div class="activity-card">
                <div class="icon">
                    <i class="fas ${icon}"></i>
                </div>
                <div class="details">
                    <h4>${activity.name}</h4>
                    <div class="meta">
                        <span class="date">${activity.date}</span>
                        <span class="user">${activity.user}</span>
                    </div>
                </div>
            </div>
        `;
    });
    
    widgetContent.innerHTML = html;
}

// Function to set up tool card interactions
function setupToolCards() {
    const toolButtons = document.querySelectorAll('.tool-button');
    
    toolButtons.forEach(button => {
        button.addEventListener('click', function() {
            const toolName = this.parentElement.querySelector('h3').textContent;
            
            // Show a message that this would connect to the actual tool in a real implementation
            showNotification(`Launching ${toolName}... This would connect to the actual tool in a production environment.`);
        });
    });
}

// Function to show notifications
function showNotification(message, type = 'info') {
    // Create a notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add it to the document
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        container.style.position = 'fixed';
        container.style.top = '20px';
        container.style.right = '20px';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
    document.querySelector('.notification-container').appendChild(notification);
    
    // Style the notification
    notification.style.backgroundColor = '#fff';
    notification.style.color = '#333';
    notification.style.padding = '12px 20px';
    notification.style.margin = '10px 0';
    notification.style.borderRadius = '4px';
    notification.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
    notification.style.transition = 'all 0.3s ease';
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(50px)';
    
    if (type === 'error') {
        notification.style.borderLeft = '4px solid #dc3545';
    } else if (type === 'success') {
        notification.style.borderLeft = '4px solid #28a745';
    } else {
        notification.style.borderLeft = '4px solid #0099cc';
    }
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Remove after a delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(50px)';
        
        setTimeout(() => {
            notification.remove();
            
            // Remove container if empty
            const container = document.querySelector('.notification-container');
            if (container && container.children.length === 0) {
                container.remove();
            }
        }, 300);
    }, 5000);
}

// Function to show error messages
function showError(message) {
    showNotification(message, 'error');
}
