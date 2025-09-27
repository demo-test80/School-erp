const fs = require('fs');
const path = require('path');

// Common sidebar menu HTML to be inserted in all pages
const sidebarMenuHTML = `
            <ul class="sidebar-menu">
                <li class="menu-heading">Main</li>
                <li class="menu-item">
                    <a href="profile.html" class="menu-link">
                        <i class="fas fa-home"></i>
                        <span>Dashboard</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="profile.html#profile" class="menu-link">
                        <i class="fas fa-user"></i>
                        <span>My Profile</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="schedule.html" class="menu-link">
                        <i class="fas fa-calendar-alt"></i>
                        <span>Class Schedule</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="subjects.html" class="menu-link">
                        <i class="fas fa-book"></i>
                        <span>Subjects</span>
                    </a>
                </li>
                <li class="menu-divider"></li>
                <li class="menu-heading">Academic</li>
                <li class="menu-item">
                    <a href="assignments.html" class="menu-link">
                        <i class="fas fa-tasks"></i>
                        <span>Assignments</span>
                        <span class="menu-badge">3 New</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="results.html" class="menu-link">
                        <i class="fas fa-chart-line"></i>
                        <span>Results</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="attendance.html" class="menu-link">
                        <i class="fas fa-calendar-check"></i>
                        <span>Attendance</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="exam-schedule.html" class="menu-link">
                        <i class="fas fa-file-invoice"></i>
                        <span>Exam Schedule</span>
                    </a>
                </li>
                <li class="menu-divider"></li>
                <li class="menu-heading">Other</li>
                <li class="menu-item">
                    <a href="fees.html" class="menu-link">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>Fee Details</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="library.html" class="menu-link">
                        <i class="fas fa-book-reader"></i>
                        <span>Library</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="notifications.html" class="menu-link">
                        <i class="fas fa-bell"></i>
                        <span>Notifications</span>
                        <span class="menu-badge">5</span>
                    </a>
                </li>
                <li class="menu-item">
                    <a href="settings.html" class="menu-link">
                        <i class="fas fa-cog"></i>
                        <span>Settings</span>
                    </a>
                </li>
            </ul>`;

// Directory containing HTML files
const htmlDir = __dirname;

// Function to update navigation in a file
function updateNavigationInFile(filePath) {
    try {
        // Read the file content
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Skip if it's the settings page (already updated)
        if (filePath.includes('settings.html')) {
            console.log(`Skipping settings.html (already updated)`);
            return;
        }
        
        // Create a regex pattern to find the sidebar menu
        const sidebarPattern = /<ul class="sidebar-menu">[\s\S]*?<\/ul>/i;
        
        // Check if the file has a sidebar menu
        if (sidebarPattern.test(content)) {
            // Replace the existing sidebar menu
            const updatedContent = content.replace(sidebarPattern, sidebarMenuHTML);
            
            // Update the active state based on the current page
            const pageName = path.basename(filePath, '.html');
            let finalContent = updatedContent;
            
            // Set active state for the current page
            if (pageName !== 'profile') {
                const activeLink = `href="${pageName}.html"`;
                const activeLinkWithClass = `href="${pageName}.html" class="menu-link active"`;
                finalContent = updatedContent.replace(new RegExp(activeLink, 'g'), activeLinkWithClass);
                
                // Remove active class from other links
                finalContent = finalContent.replace(/class="menu-link active"/g, 'class="menu-link"');
                finalContent = finalContent.replace(activeLinkWithClass, activeLink + ' class="menu-link active"');
            } else {
                // Special case for profile page (dashboard)
                finalContent = updatedContent.replace(
                    'href="profile.html" class="menu-link"',
                    'href="profile.html" class="menu-link active"'
                );
            }
            
            // Write the updated content back to the file
            fs.writeFileSync(filePath, finalContent, 'utf8');
            console.log(`Updated navigation in ${path.basename(filePath)}`);
        } else {
            console.log(`No sidebar menu found in ${path.basename(filePath)}`);
        }
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error.message);
    }
}

// Get all HTML files in the directory
function updateAllNavigation() {
    const files = fs.readdirSync(htmlDir);
    const htmlFiles = files.filter(file => file.endsWith('.html') && file !== 'index.html' && file !== 'login.html' && file !== 'register.html');
    
    console.log('Updating navigation in the following files:');
    console.log('----------------------------------------');
    
    htmlFiles.forEach(file => {
        const filePath = path.join(htmlDir, file);
        updateNavigationInFile(filePath);
    });
    
    console.log('----------------------------------------');
    console.log('Navigation update complete!');
}

// Run the update
updateAllNavigation();
