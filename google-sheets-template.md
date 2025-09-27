# School ERP - Google Sheets Template

## Complete Google Sheets Setup Guide

### 1. Create Your Google Spreadsheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click "Create" → "Blank spreadsheet"
3. Name it: "School ERP - Complete Data Management"

### 2. Create the Following Sheets (Tabs)

#### Sheet 1: Students
**Columns (A-P):**
- A: Student ID
- B: First Name
- C: Last Name
- D: Email
- E: Phone
- F: Class/Grade
- G: Status (Active/Inactive)
- H: Date of Birth
- I: Gender
- J: Address
- K: Parent Name
- L: Parent Phone
- M: Parent Email
- N: Admission Date
- O: Blood Group
- P: Date Added

#### Sheet 2: Teachers
**Columns (A-L):**
- A: Teacher ID
- B: First Name
- C: Last Name
- D: Email
- E: Phone
- F: Subject
- G: Status (Active/Inactive)
- H: Qualification
- I: Experience (Years)
- J: Salary
- K: Join Date
- L: Date Added

#### Sheet 3: Classes
**Columns (A-J):**
- A: Class ID
- B: Class Name
- C: Grade
- D: Section
- E: Class Teacher
- F: Room Number
- G: Capacity
- H: Current Students
- I: Status
- J: Academic Year

#### Sheet 4: Attendance
**Columns (A-I):**
- A: Date
- B: Student ID
- C: Student Name
- D: Class
- E: Status (Present/Absent/Late)
- F: Time In
- G: Time Out
- H: Notes
- I: Marked By

#### Sheet 5: Fees
**Columns (A-L):**
- A: Student ID
- B: Student Name
- C: Class
- D: Fee Type
- E: Total Amount
- F: Paid Amount
- G: Due Amount
- H: Status (Paid/Pending/Overdue)
- I: Due Date
- J: Payment Date
- K: Payment Method
- L: Academic Year

#### Sheet 6: Admissions
**Columns (A-T):**
- A: Application ID
- B: Student Name
- C: Date of Birth
- D: Gender
- E: Class Applied
- F: Father Name
- G: Mother Name
- H: Phone
- I: Email
- J: Address
- K: Previous School
- L: Status (Pending/Approved/Rejected)
- M: Application Date
- N: Blood Group
- O: Nationality
- P: Religion
- Q: Father Occupation
- R: Mother Occupation
- S: Documents Submitted
- T: Interview Date

#### Sheet 7: Results
**Columns (A-M):**
- A: Student ID
- B: Student Name
- C: Class
- D: Subject
- E: Exam Type
- F: Total Marks
- G: Obtained Marks
- H: Grade
- I: Percentage
- J: Status (Pass/Fail)
- K: Exam Date
- L: Academic Year
- M: Semester

#### Sheet 8: Announcements
**Columns (A-H):**
- A: Announcement ID
- B: Title
- C: Content
- D: Category
- E: Target Audience
- F: Priority
- G: Date Created
- H: Created By

#### Sheet 9: Dashboard Summary
**Key Metrics:**
- A1: Total Students
- A2: Active Students
- A3: Total Teachers
- A4: Active Teachers
- A5: Total Classes
- A6: Today's Attendance Rate
- A7: Pending Fees Amount
- A8: New Admissions This Month

### 3. Sample Data Headers

Copy and paste these headers into your respective sheets:

**Students Sheet (Row 1):**
```
Student ID	First Name	Last Name	Email	Phone	Class	Status	DOB	Gender	Address	Parent Name	Parent Phone	Parent Email	Admission Date	Blood Group	Date Added
```

**Teachers Sheet (Row 1):**
```
Teacher ID	First Name	Last Name	Email	Phone	Subject	Status	Qualification	Experience	Salary	Join Date	Date Added
```

**Classes Sheet (Row 1):**
```
Class ID	Class Name	Grade	Section	Class Teacher	Room Number	Capacity	Current Students	Status	Academic Year
```

**Attendance Sheet (Row 1):**
```
Date	Student ID	Student Name	Class	Status	Time In	Time Out	Notes	Marked By
```

**Fees Sheet (Row 1):**
```
Student ID	Student Name	Class	Fee Type	Total Amount	Paid Amount	Due Amount	Status	Due Date	Payment Date	Payment Method	Academic Year
```

### 4. Get Your Spreadsheet ID

1. Open your created Google Sheet
2. Look at the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
3. Copy the SPREADSHEET_ID part
4. This is what you'll use in the School ERP configuration

### 5. Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google Sheets API:
   - Go to "APIs & Services" → "Library"
   - Search for "Google Sheets API"
   - Click "Enable"
4. Create API Key:
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the API key
5. Configure API Key restrictions (recommended):
   - Click on your API key
   - Under "Application restrictions" → "HTTP referrers"
   - Add your domain (e.g., `localhost:8000/*` for local testing)

### 6. Configure in School ERP

1. Open your School ERP dashboard
2. Go to "Google Sheets" in the sidebar
3. Enter your API Key and Spreadsheet ID
4. Test the connection
5. Click "Setup Sheets" to create all required sheets automatically
6. Enable auto-sync for automatic data backup

### 7. Data Flow

Once configured, your School ERP will:
- Automatically sync student data when you add/edit students
- Sync teacher information when modified
- Update attendance records daily
- Sync fee payments and due amounts
- Backup all data every 5 minutes (if auto-sync enabled)

### 8. Benefits

✅ **Real-time backup** of all school data
✅ **Collaborative access** - multiple staff can view data
✅ **Easy reporting** - use Google Sheets charts and pivot tables
✅ **Data export** - download as Excel, PDF, etc.
✅ **Mobile access** - view data on phones/tablets
✅ **Version history** - track all changes automatically
✅ **Integration** - connect with other Google Workspace tools

### 9. Security Notes

- Keep your API key secure and don't share it
- Use HTTP referrer restrictions on your API key
- Regularly review who has access to your Google Sheet
- Consider using Google Workspace for additional security features

### 10. Troubleshooting

**Common Issues:**
- **"API key not valid"** → Check if Sheets API is enabled
- **"Permission denied"** → Verify spreadsheet sharing settings
- **"Quota exceeded"** → You've hit daily API limits (rare)
- **"Sheet not found"** → Check spreadsheet ID is correct

**Support:**
- Test connection in the Google Sheets configuration panel
- Check browser console for detailed error messages
- Ensure your spreadsheet is accessible (not private)
