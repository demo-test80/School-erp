// Google Sheets Integration for School ERP
class GoogleSheetsManager {
    constructor() {
        this.apiKey = ''; // Will be set by admin
        this.spreadsheetId = ''; // Will be set by admin
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Load configuration from localStorage
        this.loadConfig();
        
        // Load Google Sheets API
        this.loadGoogleSheetsAPI();
    }

    loadConfig() {
        const config = localStorage.getItem('googleSheetsConfig');
        if (config) {
            const parsedConfig = JSON.parse(config);
            this.apiKey = parsedConfig.apiKey || '';
            this.spreadsheetId = parsedConfig.spreadsheetId || '';
        }
    }

    saveConfig(apiKey, spreadsheetId) {
        const config = {
            apiKey: apiKey,
            spreadsheetId: spreadsheetId
        };
        localStorage.setItem('googleSheetsConfig', JSON.stringify(config));
        this.apiKey = apiKey;
        this.spreadsheetId = spreadsheetId;
        this.isInitialized = true;
    }

    loadGoogleSheetsAPI() {
        if (typeof gapi !== 'undefined') {
            this.initializeAPI();
            return;
        }

        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
            this.initializeAPI();
        };
        document.head.appendChild(script);
    }

    initializeAPI() {
        if (!this.apiKey) {
            console.log('Google Sheets API key not configured');
            return;
        }

        gapi.load('client', () => {
            gapi.client.init({
                apiKey: this.apiKey,
                discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4']
            }).then(() => {
                this.isInitialized = true;
                console.log('Google Sheets API initialized successfully');
            }).catch(error => {
                console.error('Error initializing Google Sheets API:', error);
            });
        });
    }

    // Students Management
    async syncStudentsToSheet(students) {
        if (!this.isInitialized) {
            throw new Error('Google Sheets API not initialized');
        }

        const values = [
            ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Class', 'Status', 'Date Added']
        ];

        students.forEach(student => {
            values.push([
                student.id,
                student.firstName,
                student.lastName,
                student.email,
                student.phone,
                student.class,
                student.status,
                new Date().toISOString().split('T')[0]
            ]);
        });

        try {
            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'Students!A1',
                valueInputOption: 'RAW',
                resource: {
                    values: values
                }
            });
            
            console.log('Students synced to Google Sheets successfully');
            return response;
        } catch (error) {
            console.error('Error syncing students to Google Sheets:', error);
            throw error;
        }
    }

    async getStudentsFromSheet() {
        if (!this.isInitialized) {
            throw new Error('Google Sheets API not initialized');
        }

        try {
            const response = await gapi.client.sheets.spreadsheets.values.get({
                spreadsheetId: this.spreadsheetId,
                range: 'Students!A2:H'
            });

            const rows = response.result.values || [];
            const students = rows.map(row => ({
                id: row[0] || '',
                firstName: row[1] || '',
                lastName: row[2] || '',
                email: row[3] || '',
                phone: row[4] || '',
                class: row[5] || '',
                status: row[6] || 'active',
                dateAdded: row[7] || ''
            }));

            return students;
        } catch (error) {
            console.error('Error getting students from Google Sheets:', error);
            throw error;
        }
    }

    // Teachers Management
    async syncTeachersToSheet(teachers) {
        if (!this.isInitialized) {
            throw new Error('Google Sheets API not initialized');
        }

        const values = [
            ['ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Subject', 'Status', 'Date Added']
        ];

        teachers.forEach(teacher => {
            values.push([
                teacher.id,
                teacher.firstName,
                teacher.lastName,
                teacher.email,
                teacher.phone,
                teacher.subject,
                teacher.status,
                new Date().toISOString().split('T')[0]
            ]);
        });

        try {
            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'Teachers!A1',
                valueInputOption: 'RAW',
                resource: {
                    values: values
                }
            });
            
            console.log('Teachers synced to Google Sheets successfully');
            return response;
        } catch (error) {
            console.error('Error syncing teachers to Google Sheets:', error);
            throw error;
        }
    }

    // Attendance Management
    async syncAttendanceToSheet(attendanceData) {
        if (!this.isInitialized) {
            throw new Error('Google Sheets API not initialized');
        }

        const values = [
            ['Date', 'Student ID', 'Student Name', 'Class', 'Status', 'Time In', 'Time Out', 'Notes']
        ];

        attendanceData.forEach(record => {
            values.push([
                record.date,
                record.studentId,
                record.studentName,
                record.className,
                record.status,
                record.timeIn || '',
                record.timeOut || '',
                record.notes || ''
            ]);
        });

        try {
            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'Attendance!A1',
                valueInputOption: 'RAW',
                resource: {
                    values: values
                }
            });
            
            console.log('Attendance synced to Google Sheets successfully');
            return response;
        } catch (error) {
            console.error('Error syncing attendance to Google Sheets:', error);
            throw error;
        }
    }

    // Fees Management
    async syncFeesToSheet(feesData) {
        if (!this.isInitialized) {
            throw new Error('Google Sheets API not initialized');
        }

        const values = [
            ['Student ID', 'Student Name', 'Class', 'Fee Type', 'Total Amount', 'Paid Amount', 'Due Amount', 'Status', 'Due Date']
        ];

        feesData.forEach(fee => {
            values.push([
                fee.studentId,
                fee.studentName,
                fee.className,
                fee.feeType,
                fee.totalAmount,
                fee.paidAmount,
                fee.dueAmount,
                fee.status,
                fee.dueDate
            ]);
        });

        try {
            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'Fees!A1',
                valueInputOption: 'RAW',
                resource: {
                    values: values
                }
            });
            
            console.log('Fees synced to Google Sheets successfully');
            return response;
        } catch (error) {
            console.error('Error syncing fees to Google Sheets:', error);
            throw error;
        }
    }

    // Classes Management
    async syncClassesToSheet(classesData) {
        if (!this.isInitialized) {
            throw new Error('Google Sheets API not initialized');
        }

        const values = [
            ['ID', 'Class Name', 'Grade', 'Section', 'Teacher', 'Room', 'Capacity', 'Current Students', 'Status']
        ];

        classesData.forEach(classItem => {
            values.push([
                classItem.id,
                classItem.className,
                classItem.grade,
                classItem.section,
                classItem.classTeacher,
                classItem.room,
                classItem.capacity,
                classItem.currentStudents,
                classItem.status
            ]);
        });

        try {
            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'Classes!A1',
                valueInputOption: 'RAW',
                resource: {
                    values: values
                }
            });
            
            console.log('Classes synced to Google Sheets successfully');
            return response;
        } catch (error) {
            console.error('Error syncing classes to Google Sheets:', error);
            throw error;
        }
    }

    // Utility Methods
    async createSheetIfNotExists(sheetName) {
        try {
            const response = await gapi.client.sheets.spreadsheets.get({
                spreadsheetId: this.spreadsheetId
            });

            const sheets = response.result.sheets || [];
            const sheetExists = sheets.some(sheet => sheet.properties.title === sheetName);

            if (!sheetExists) {
                await gapi.client.sheets.spreadsheets.batchUpdate({
                    spreadsheetId: this.spreadsheetId,
                    resource: {
                        requests: [{
                            addSheet: {
                                properties: {
                                    title: sheetName
                                }
                            }
                        }]
                    }
                });
                console.log(`Sheet "${sheetName}" created successfully`);
            }
        } catch (error) {
            console.error(`Error creating sheet "${sheetName}":`, error);
            throw error;
        }
    }

    async setupAllSheets() {
        const sheetsConfig = [
            {
                name: 'Students',
                headers: ['Student ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Class', 'Status', 'DOB', 'Gender', 'Address', 'Parent Name', 'Parent Phone', 'Parent Email', 'Admission Date', 'Blood Group', 'Date Added']
            },
            {
                name: 'Teachers', 
                headers: ['Teacher ID', 'First Name', 'Last Name', 'Email', 'Phone', 'Subject', 'Status', 'Qualification', 'Experience', 'Salary', 'Join Date', 'Date Added']
            },
            {
                name: 'Classes',
                headers: ['Class ID', 'Class Name', 'Grade', 'Section', 'Class Teacher', 'Room Number', 'Capacity', 'Current Students', 'Status', 'Academic Year']
            },
            {
                name: 'Attendance',
                headers: ['Date', 'Student ID', 'Student Name', 'Class', 'Status', 'Time In', 'Time Out', 'Notes', 'Marked By']
            },
            {
                name: 'Fees',
                headers: ['Student ID', 'Student Name', 'Class', 'Fee Type', 'Total Amount', 'Paid Amount', 'Due Amount', 'Status', 'Due Date', 'Payment Date', 'Payment Method', 'Academic Year']
            },
            {
                name: 'Admissions',
                headers: ['Application ID', 'Student Name', 'DOB', 'Gender', 'Class Applied', 'Father Name', 'Mother Name', 'Phone', 'Email', 'Address', 'Previous School', 'Status', 'Application Date', 'Blood Group', 'Nationality', 'Religion', 'Father Occupation', 'Mother Occupation', 'Documents', 'Interview Date']
            },
            {
                name: 'Results',
                headers: ['Student ID', 'Student Name', 'Class', 'Subject', 'Exam Type', 'Total Marks', 'Obtained Marks', 'Grade', 'Percentage', 'Status', 'Exam Date', 'Academic Year', 'Semester']
            },
            {
                name: 'Announcements',
                headers: ['Announcement ID', 'Title', 'Content', 'Category', 'Target Audience', 'Priority', 'Date Created', 'Created By']
            },
            {
                name: 'Dashboard Summary',
                headers: ['Metric', 'Value', 'Last Updated']
            }
        ];
        
        for (const sheetConfig of sheetsConfig) {
            await this.createSheetIfNotExists(sheetConfig.name);
            await this.setupSheetHeaders(sheetConfig.name, sheetConfig.headers);
        }
        
        // Setup dashboard summary with initial data
        await this.setupDashboardSummary();
    }

    async setupSheetHeaders(sheetName, headers) {
        try {
            const response = await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: `${sheetName}!A1`,
                valueInputOption: 'RAW',
                resource: {
                    values: [headers]
                }
            });
            
            // Format headers (bold, background color)
            await gapi.client.sheets.spreadsheets.batchUpdate({
                spreadsheetId: this.spreadsheetId,
                resource: {
                    requests: [{
                        repeatCell: {
                            range: {
                                sheetId: await this.getSheetId(sheetName),
                                startRowIndex: 0,
                                endRowIndex: 1,
                                startColumnIndex: 0,
                                endColumnIndex: headers.length
                            },
                            cell: {
                                userEnteredFormat: {
                                    backgroundColor: {
                                        red: 0.2,
                                        green: 0.4,
                                        blue: 0.8
                                    },
                                    textFormat: {
                                        foregroundColor: {
                                            red: 1.0,
                                            green: 1.0,
                                            blue: 1.0
                                        },
                                        bold: true
                                    }
                                }
                            },
                            fields: 'userEnteredFormat(backgroundColor,textFormat)'
                        }
                    }]
                }
            });
            
            console.log(`Headers set up for ${sheetName}`);
        } catch (error) {
            console.error(`Error setting up headers for ${sheetName}:`, error);
        }
    }

    async getSheetId(sheetName) {
        try {
            const response = await gapi.client.sheets.spreadsheets.get({
                spreadsheetId: this.spreadsheetId
            });
            
            const sheet = response.result.sheets.find(s => s.properties.title === sheetName);
            return sheet ? sheet.properties.sheetId : 0;
        } catch (error) {
            console.error('Error getting sheet ID:', error);
            return 0;
        }
    }

    async setupDashboardSummary() {
        const summaryData = [
            ['Metric', 'Value', 'Last Updated'],
            ['Total Students', '=COUNTA(Students!A:A)-1', 'NOW()'],
            ['Active Students', '=COUNTIF(Students!G:G,"Active")', 'NOW()'],
            ['Total Teachers', '=COUNTA(Teachers!A:A)-1', 'NOW()'],
            ['Active Teachers', '=COUNTIF(Teachers!G:G,"Active")', 'NOW()'],
            ['Total Classes', '=COUNTA(Classes!A:A)-1', 'NOW()'],
            ['Pending Fees', '=SUMIF(Fees!H:H,"Pending",Fees!G:G)', 'NOW()'],
            ['Overdue Fees', '=SUMIF(Fees!H:H,"Overdue",Fees!G:G)', 'NOW()'],
            ['Today\'s Attendance Rate', '=COUNTIF(Attendance!E:E,"Present")/COUNTA(Attendance!E:E)*100&"%"', 'NOW()'],
            ['New Admissions This Month', '=COUNTIFS(Admissions!M:M,">="&EOMONTH(TODAY(),-1)+1,Admissions!M:M,"<="&EOMONTH(TODAY(),0))', 'NOW()']
        ];

        try {
            await gapi.client.sheets.spreadsheets.values.update({
                spreadsheetId: this.spreadsheetId,
                range: 'Dashboard Summary!A1',
                valueInputOption: 'USER_ENTERED',
                resource: {
                    values: summaryData
                }
            });
            console.log('Dashboard summary set up successfully');
        } catch (error) {
            console.error('Error setting up dashboard summary:', error);
        }
    }

    // Auto-sync functionality
    enableAutoSync(interval = 300000) { // 5 minutes default
        if (this.autoSyncInterval) {
            clearInterval(this.autoSyncInterval);
        }

        this.autoSyncInterval = setInterval(() => {
            this.performAutoSync();
        }, interval);
    }

    disableAutoSync() {
        if (this.autoSyncInterval) {
            clearInterval(this.autoSyncInterval);
            this.autoSyncInterval = null;
        }
    }

    async performAutoSync() {
        try {
            // Get data from local storage or current page data
            const students = JSON.parse(localStorage.getItem('studentsData') || '[]');
            const teachers = JSON.parse(localStorage.getItem('teachersData') || '[]');
            const attendance = JSON.parse(localStorage.getItem('attendanceData') || '[]');
            const fees = JSON.parse(localStorage.getItem('feesData') || '[]');
            const classes = JSON.parse(localStorage.getItem('classesData') || '[]');

            // Sync all data
            if (students.length > 0) await this.syncStudentsToSheet(students);
            if (teachers.length > 0) await this.syncTeachersToSheet(teachers);
            if (attendance.length > 0) await this.syncAttendanceToSheet(attendance);
            if (fees.length > 0) await this.syncFeesToSheet(fees);
            if (classes.length > 0) await this.syncClassesToSheet(classes);

            console.log('Auto-sync completed successfully');
            this.showNotification('Data synced to Google Sheets successfully', 'success');
        } catch (error) {
            console.error('Auto-sync failed:', error);
            this.showNotification('Auto-sync failed: ' + error.message, 'error');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize Google Sheets Manager
const googleSheetsManager = new GoogleSheetsManager();

// Export for use in other files
window.googleSheetsManager = googleSheetsManager;
