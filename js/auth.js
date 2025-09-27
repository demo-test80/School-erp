// Authentication related functions

// Check if user is logged in
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

// Get current user data
function getCurrentUser() {
    const userData = localStorage.getItem('currentUser');
    return userData ? JSON.parse(userData) : null;
}

// Check if user has specific role
function hasRole(role) {
    const user = getCurrentUser();
    return user && user.role === role;
}

// Simulate login with role-based authentication
function login(username, password, role) {
    // Demo credentials for different roles
    const credentials = {
        student: {
            username: 'student@ksba.edu',
            password: 'student123',
            userData: {
                username: username,
                name: 'John Doe',
                role: 'student',
                studentId: 'KSBA20250001',
                class: 'Class 10 - Section A',
                email: 'student@ksba.edu'
            }
        },
        admin: {
            username: 'admin@ksba.edu',
            password: 'admin123',
            userData: {
                username: username,
                name: 'Admin User',
                role: 'admin',
                adminId: 'ADMIN001',
                department: 'Administration',
                email: 'admin@ksba.edu'
            }
        }
    };

    const roleCredentials = credentials[role];
    if (!roleCredentials) {
        return { success: false, message: 'Invalid role selected.' };
    }

    if (username === roleCredentials.username && password === roleCredentials.password) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(roleCredentials.userData));
        return { success: true, role: role };
    } else {
        return { 
            success: false, 
            message: `Invalid ${role} credentials. Please try again.` 
        };
    }
}

// Logout function
function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    // Check if we're in a dashboard subdirectory
    if (window.location.pathname.includes('/dashboard/')) {
        window.location.href = '../index.html';
    } else {
        window.location.href = 'index.html';
    }
}

// Check authentication status and update UI
function updateAuthUI() {
    const isLoggedIn = checkAuth();
    const authButtons = document.querySelector('.auth-buttons');
    const userMenu = document.querySelector('.user-menu');
    const currentUser = isLoggedIn ? JSON.parse(localStorage.getItem('currentUser')) : null;

    if (authButtons) {
        authButtons.style.display = isLoggedIn ? 'none' : 'flex';
    }
    
    if (userMenu) {
        userMenu.style.display = isLoggedIn ? 'flex' : 'none';
        
        if (isLoggedIn && currentUser) {
            const userNameElement = userMenu.querySelector('.user-name');
            if (userNameElement) {
                userNameElement.textContent = currentUser.name;
            }
        }
    }
}

// Initialize auth UI when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    updateAuthUI();
    
    // Handle role tab switching
    const roleTabs = document.querySelectorAll('.role-tab');
    const userRoleInput = document.getElementById('userRole');
    const loginText = document.querySelector('.login-text');
    
    roleTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active class from all tabs
            roleTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Update hidden input and button text
            const role = this.dataset.role;
            if (userRoleInput) userRoleInput.value = role;
            if (loginText) {
                loginText.textContent = role === 'admin' ? 'Login as Admin' : 'Login as Student';
            }
        });
    });
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const usernameInput = document.getElementById('username');
            const passwordInput = document.getElementById('password');
            const userRole = document.getElementById('userRole').value;
            const errorMessage = document.getElementById('error-message');
            
            // Reset errors
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.input-group, .form-group').forEach(el => el.classList.remove('error'));
            if (errorMessage) errorMessage.style.display = 'none';
            
            // Simple validation
            let valid = true;
            if (!usernameInput.value.trim()) {
                showError(usernameInput, 'Username is required');
                valid = false;
            }
            
            if (!passwordInput.value) {
                showError(passwordInput, 'Password is required');
                valid = false;
            }
            
            if (!valid) return;
            
            // Show loading state
            const submitBtn = loginForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Logging in...';
            submitBtn.disabled = true;
            
            // Simulate API delay
            setTimeout(() => {
                const result = login(usernameInput.value, passwordInput.value, userRole);
                
                if (result.success) {
                    // Redirect based on role
                    if (result.role === 'admin') {
                        window.location.href = 'dashboard/index.html';
                    } else {
                        window.location.href = 'profile.html';
                    }
                } else {
                    // Show error message
                    showError(usernameInput, result.message);
                    
                    // Reset button
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }
            }, 1000);
        });
    }
    
    // Handle logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            logout();
        });
    }
});

// Helper function to show error messages
function showError(input, message) {
    const parent = input.closest('.input-group') || input.closest('.form-group');
    if (!parent) return;
    
    parent.classList.add('error');
    
    // Remove any existing error message
    const existingError = parent.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    const error = document.createElement('div');
    error.className = 'error-message';
    error.style.color = '#dc3545';
    error.style.fontSize = '0.8rem';
    error.style.marginTop = '5px';
    error.textContent = message;
    
    parent.appendChild(error);
}
