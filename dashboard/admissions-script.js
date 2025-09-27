// Admission Management JavaScript
let currentApplicationId = null;

// Sample admission data
const admissionData = {
    'ADM001': {
        id: 'ADM001',
        studentName: 'Rahul Ahmed',
        dateOfBirth: '2018-05-15',
        gender: 'Male',
        bloodGroup: 'B+',
        nationality: 'Bangladeshi',
        religion: 'Islam',
        fatherName: 'Abdul Ahmed',
        fatherOccupation: 'Business',
        motherName: 'Rashida Ahmed',
        motherOccupation: 'Teacher',
        address: '123 Main Street, Dhaka',
        city: 'Dhaka',
        state: 'Dhaka Division',
        postalCode: '1000',
        phone: '+880 1712-345678',
        email: 'ahmed.family@email.com',
        classApplied: 'Class 1',
        previousSchool: 'Little Stars Kindergarten',
        applicationDate: '2025-01-05',
        status: 'pending'
    },
    'ADM002': {
        id: 'ADM002',
        studentName: 'Fatima Khan',
        dateOfBirth: '2020-03-22',
        gender: 'Female',
        bloodGroup: 'A+',
        nationality: 'Bangladeshi',
        religion: 'Islam',
        fatherName: 'Mohammad Khan',
        fatherOccupation: 'Engineer',
        motherName: 'Salma Khan',
        motherOccupation: 'Doctor',
        address: '456 Park Avenue, Chittagong',
        city: 'Chittagong',
        state: 'Chittagong Division',
        postalCode: '4000',
        phone: '+880 1812-987654',
        email: 'khan.family@email.com',
        classApplied: 'Nursery',
        previousSchool: '',
        applicationDate: '2025-01-04',
        status: 'under-review'
    },
    'ADM003': {
        id: 'ADM003',
        studentName: 'Mohammad Hassan',
        dateOfBirth: '2019-08-10',
        gender: 'Male',
        bloodGroup: 'O+',
        nationality: 'Bangladeshi',
        religion: 'Islam',
        fatherName: 'Ibrahim Hassan',
        fatherOccupation: 'Government Officer',
        motherName: 'Fatema Hassan',
        motherOccupation: 'Housewife',
        address: '789 Green Road, Sylhet',
        city: 'Sylhet',
        state: 'Sylhet Division',
        postalCode: '3100',
        phone: '+880 1912-456789',
        email: 'hassan.family@email.com',
        classApplied: 'KG I',
        previousSchool: 'Rainbow Kindergarten',
        applicationDate: '2025-01-03',
        status: 'approved'
    }
};

function viewApplication(applicationId) {
    currentApplicationId = applicationId;
    const application = admissionData[applicationId];
    
    if (!application) {
        alert('Application not found');
        return;
    }

    const modalBody = document.getElementById('applicationDetails');
    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
            <div>
                <h5 style="color: var(--primary-color); margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Student Information</h5>
                <p><strong>Name:</strong> ${application.studentName}</p>
                <p><strong>Date of Birth:</strong> ${application.dateOfBirth}</p>
                <p><strong>Gender:</strong> ${application.gender}</p>
                <p><strong>Blood Group:</strong> ${application.bloodGroup}</p>
                <p><strong>Nationality:</strong> ${application.nationality}</p>
                <p><strong>Religion:</strong> ${application.religion}</p>
                
                <h5 style="color: var(--primary-color); margin: 20px 0 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Academic Information</h5>
                <p><strong>Class Applied:</strong> ${application.classApplied}</p>
                <p><strong>Previous School:</strong> ${application.previousSchool || 'N/A'}</p>
                <p><strong>Application Date:</strong> ${application.applicationDate}</p>
            </div>
            <div>
                <h5 style="color: var(--primary-color); margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Parent Information</h5>
                <p><strong>Father's Name:</strong> ${application.fatherName}</p>
                <p><strong>Father's Occupation:</strong> ${application.fatherOccupation}</p>
                <p><strong>Mother's Name:</strong> ${application.motherName}</p>
                <p><strong>Mother's Occupation:</strong> ${application.motherOccupation}</p>
                
                <h5 style="color: var(--primary-color); margin: 20px 0 15px; border-bottom: 1px solid #eee; padding-bottom: 5px;">Contact Information</h5>
                <p><strong>Address:</strong> ${application.address}</p>
                <p><strong>City:</strong> ${application.city}</p>
                <p><strong>State:</strong> ${application.state}</p>
                <p><strong>Postal Code:</strong> ${application.postalCode}</p>
                <p><strong>Phone:</strong> ${application.phone}</p>
                <p><strong>Email:</strong> ${application.email}</p>
            </div>
        </div>
    `;

    document.getElementById('applicationModal').classList.add('active');
}

function updateStatus(applicationId, newStatus) {
    if (confirm(`Are you sure you want to ${newStatus} this application?`)) {
        // Find the row with the matching application ID
        const rows = document.querySelectorAll('#admissionsTableBody tr');
        let targetRow = null;
        
        rows.forEach(row => {
            if (row.cells[0].textContent === applicationId) {
                targetRow = row;
            }
        });
        
        if (targetRow) {
            const statusCell = targetRow.cells[5];
            const statusBadge = statusCell.querySelector('.status-badge');
            
            // Remove old status classes
            statusBadge.classList.remove('status-pending', 'status-approved', 'status-rejected', 'status-under-review');
            
            // Add new status class and text
            statusBadge.classList.add(`status-${newStatus}`);
            statusBadge.textContent = newStatus.charAt(0).toUpperCase() + newStatus.slice(1).replace('-', ' ');
            
            // Update action buttons
            updateActionButtons(targetRow, newStatus);
        }
        
        // Update data
        if (admissionData[applicationId]) {
            admissionData[applicationId].status = newStatus;
        }
        
        // Show notification
        showNotification(`Application ${applicationId} has been ${newStatus}!`, 'success');
    }
}

function updateActionButtons(row, status) {
    const actionsCell = row.cells[6];
    const actionButtons = actionsCell.querySelector('.action-buttons');
    const applicationId = row.cells[0].textContent;
    
    let buttonsHTML = `
        <button class="btn-sm btn-view" onclick="viewApplication('${applicationId}')">
            <i class="fas fa-eye"></i> View
        </button>
    `;
    
    if (status !== 'approved') {
        buttonsHTML += `
            <button class="btn-sm btn-approve" onclick="updateStatus('${applicationId}', 'approved')">
                <i class="fas fa-check"></i> Approve
            </button>
        `;
    }
    
    if (status !== 'rejected') {
        buttonsHTML += `
            <button class="btn-sm btn-reject" onclick="updateStatus('${applicationId}', 'rejected')">
                <i class="fas fa-times"></i> Reject
            </button>
        `;
    }
    
    actionButtons.innerHTML = buttonsHTML;
}

function approveFromModal() {
    if (currentApplicationId) {
        updateStatus(currentApplicationId, 'approved');
        document.getElementById('applicationModal').classList.remove('active');
    }
}

function rejectFromModal() {
    if (currentApplicationId) {
        updateStatus(currentApplicationId, 'rejected');
        document.getElementById('applicationModal').classList.remove('active');
    }
}

function applyFilters() {
    const statusFilter = document.getElementById('statusFilter').value;
    const classFilter = document.getElementById('classFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    
    const rows = document.querySelectorAll('#admissionsTableBody tr');
    
    rows.forEach(row => {
        let showRow = true;
        
        // Status filter
        if (statusFilter) {
            const statusBadge = row.querySelector('.status-badge');
            if (!statusBadge.classList.contains(`status-${statusFilter}`)) {
                showRow = false;
            }
        }
        
        // Class filter
        if (classFilter && showRow) {
            const classCell = row.cells[2].textContent;
            if (!classCell.toLowerCase().includes(classFilter)) {
                showRow = false;
            }
        }
        
        // Date filter
        if (dateFilter && showRow) {
            const dateCell = row.cells[4].textContent;
            if (dateCell !== dateFilter) {
                showRow = false;
            }
        }
        
        row.style.display = showRow ? '' : 'none';
    });
}

function exportData() {
    // Simple CSV export functionality
    let csvContent = "Application ID,Student Name,Class Applied,Parent Contact,Application Date,Status\n";
    
    const rows = document.querySelectorAll('#admissionsTableBody tr');
    rows.forEach(row => {
        if (row.style.display !== 'none') {
            const cells = row.cells;
            const statusText = cells[5].querySelector('.status-badge').textContent.trim();
            csvContent += `${cells[0].textContent},${cells[1].textContent},${cells[2].textContent},${cells[3].textContent},${cells[4].textContent},${statusText}\n`;
        }
    });
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'admissions_data.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function showNotification(message, type) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;

    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);

    // Auto hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);

    // Close button handler
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    });
}
