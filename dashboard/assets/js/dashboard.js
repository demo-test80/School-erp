// Admin Dashboard JavaScript
class Dashboard {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initializeComponents();
        this.loadDashboardData();
    }

    setupEventListeners() {
        // Sidebar toggle
        const sidebarToggle = document.querySelector('.sidebar-toggle');
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', this.toggleSidebar.bind(this));
        }

        // Mobile sidebar toggle
        const mobileToggle = document.querySelector('.mobile-sidebar-toggle');
        if (mobileToggle) {
            mobileToggle.addEventListener('click', this.toggleMobileSidebar.bind(this));
        }

        // Profile dropdown
        const profileToggle = document.querySelector('.profile-toggle');
        if (profileToggle) {
            profileToggle.addEventListener('click', this.toggleProfileDropdown.bind(this));
        }

        // Close dropdowns when clicking outside
        document.addEventListener('click', this.closeDropdowns.bind(this));

        // Modal handlers
        this.setupModalHandlers();

        // Form handlers
        this.setupFormHandlers();

        // Search functionality
        this.setupSearch();

        // Notification handlers
        this.setupNotificationHandlers();
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        }
    }

    toggleMobileSidebar() {
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            sidebar.classList.toggle('active');
        }
    }

    toggleProfileDropdown(e) {
        e.stopPropagation();
        const userProfile = document.querySelector('.user-profile');
        if (userProfile) {
            userProfile.classList.toggle('active');
        }
    }

    closeDropdowns(e) {
        const userProfile = document.querySelector('.user-profile');
        if (userProfile && !userProfile.contains(e.target)) {
            userProfile.classList.remove('active');
        }
    }

    initializeComponents() {
        // Restore sidebar state
        const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (sidebarCollapsed) {
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) {
                sidebar.classList.add('collapsed');
            }
        }

        // Initialize tooltips
        this.initializeTooltips();

        // Initialize charts if on dashboard
        if (window.location.pathname.includes('index.html') || window.location.pathname.endsWith('/dashboard/')) {
            this.initializeCharts();
        }

        // Set active navigation
        this.setActiveNavigation();
    }

    setActiveNavigation() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
                link.classList.add('active');
            }
        });
    }

    initializeTooltips() {
        // Simple tooltip implementation
        const tooltipElements = document.querySelectorAll('[data-tooltip]');
        tooltipElements.forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip.bind(this));
            element.addEventListener('mouseleave', this.hideTooltip.bind(this));
        });
    }

    showTooltip(e) {
        const text = e.target.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = text;
        document.body.appendChild(tooltip);

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
        tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
    }

    hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    initializeCharts() {
        // Placeholder for chart initialization
        // In a real application, you would use a charting library like Chart.js
        console.log('Charts initialized');
    }

    setupModalHandlers() {
        // Modal open buttons
        const modalTriggers = document.querySelectorAll('[data-modal]');
        modalTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const modalId = trigger.getAttribute('data-modal');
                this.openModal(modalId);
            });
        });

        // Modal close buttons
        const modalCloses = document.querySelectorAll('.modal-close, [data-modal-close]');
        modalCloses.forEach(close => {
            close.addEventListener('click', (e) => {
                e.preventDefault();
                this.closeModal();
            });
        });

        // Close modal on backdrop click
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        });
    }

    openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    closeModal() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    setupFormHandlers() {
        // Form submission handlers
        const forms = document.querySelectorAll('form[data-ajax]');
        forms.forEach(form => {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        });

        // Real-time validation
        const inputs = document.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', this.validateField.bind(this));
            input.addEventListener('input', this.clearFieldError.bind(this));
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;
        }

        // Simulate API call
        setTimeout(() => {
            this.showNotification('Success! Data has been saved.', 'success');
            
            // Reset loading state
            if (submitBtn) {
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;
            }
            
            // Close modal if form is in modal
            const modal = form.closest('.modal');
            if (modal) {
                this.closeModal();
            }
            
            // Refresh data
            this.loadDashboardData();
        }, 1500);
    }

    validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        const required = field.hasAttribute('required');
        
        if (required && !value) {
            this.showFieldError(field, 'This field is required');
        } else if (field.type === 'email' && value && !this.isValidEmail(value)) {
            this.showFieldError(field, 'Please enter a valid email address');
        }
    }

    clearFieldError(e) {
        const field = e.target;
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
        field.classList.remove('error');
    }

    showFieldError(field, message) {
        this.clearFieldError({ target: field });
        
        field.classList.add('error');
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        field.parentNode.appendChild(errorElement);
    }

    isValidEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    setupSearch() {
        const searchInputs = document.querySelectorAll('.search-input, #headerSearch');
        searchInputs.forEach(input => {
            input.addEventListener('input', this.handleSearch.bind(this));
        });
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const searchableElements = document.querySelectorAll('.searchable');
        
        searchableElements.forEach(element => {
            const text = element.textContent.toLowerCase();
            const row = element.closest('tr') || element.closest('.card');
            
            if (text.includes(query)) {
                if (row) row.style.display = '';
            } else {
                if (row) row.style.display = 'none';
            }
        });
    }

    loadDashboardData() {
        // Simulate loading dashboard data
        this.updateStats();
        this.loadRecentActivities();
    }

    updateStats() {
        // Update stat cards with animated counters
        const statValues = document.querySelectorAll('.stat-value');
        statValues.forEach(stat => {
            const finalValue = parseInt(stat.textContent);
            this.animateCounter(stat, 0, finalValue, 1000);
        });
    }

    animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    loadRecentActivities() {
        // Simulate loading recent activities
        console.log('Recent activities loaded');
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close">&times;</button>
        `;

        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto hide after 5 seconds
        setTimeout(() => this.hideNotification(notification), 5000);

        // Close button handler
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.hideNotification(notification);
        });
    }

    hideNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'check-circle',
            error: 'exclamation-circle',
            warning: 'exclamation-triangle',
            info: 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    setupNotificationHandlers() {
        // Notification button click handler
        const notificationBtn = document.querySelector('.notification-btn');
        if (notificationBtn) {
            notificationBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.showNotification('You have 3 new notifications', 'info');
            });
        }
    }

    // Utility methods
    formatDate(date) {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        }).format(new Date(date));
    }

    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Dashboard();
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Dashboard;
}
