# MCA Alumni Portal

🎓 A modern, professional web portal for MCA alumni data management with live data integration from Google Forms and Sheets.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/alumni-portal)

## ✨ Features

- 🔄 **Auto-Refresh**: Data automatically refreshes every 5 minutes
- 🔍 **Smart Search**: Real-time search by name or company
- 📊 **Advanced Filters**: Filter by batch year and company
- 📈 **Live Statistics**: Total alumni, companies, and filtered counts
- 📱 **Fully Responsive**: Works on desktop, tablet, and mobile
- 🎨 **Minimalistic UI**: Clean, professional design
- ⚡ **Fast Performance**: Optimized for speed
- 🔗 **Direct Integration**: LinkedIn profile links

## 🚀 Live Demo

[View Live Demo](https://your-alumni-portal.vercel.app)

---

## 📋 Overview
This application collects alumni data through Google Forms and displays it in a professional web portal with filtering capabilities.

---

## 🚀 Step-by-Step Setup Guide

### **Step 1: Create Google Form**

1. Go to [Google Forms](https://docs.google.com/forms)
2. Create a new form with these fields:
   - **Name** (Short answer)
   - **Email** (Email field)
   - **Current Working Company** (Short answer)
   - **Batch Year** (Short answer or Dropdown)
   - **LinkedIn Profile** (Short answer)

3. Click **Responses** tab → Click the Google Sheets icon to create a linked spreadsheet
4. Note the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`

---

### **Step 2: Enable Google Sheets API**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google Sheets API**:
   - Go to **APIs & Services** → **Library**
   - Search for "Google Sheets API"
   - Click **Enable**

4. Create API credentials:
   - Go to **APIs & Services** → **Credentials**
   - Click **+ CREATE CREDENTIALS** → **API Key**
   - Copy your API key
   - (Optional) Restrict the key to only Google Sheets API and your domain

---

### **Step 3: Configure the Application**

1. Open `config.js` in your project
2. Replace the placeholder values:

```javascript
const CONFIG = {
    API_KEY: 'YOUR_ACTUAL_API_KEY_HERE',
    SHEET_ID: 'YOUR_SHEET_ID_HERE',
    SHEET_NAME: 'Form Responses 1',  // Keep this as is (default name)
    // ... rest of config
};
```

3. Make your Google Sheet **publicly accessible**:
   - Open your Google Sheet
   - Click **Share** button
   - Change to "Anyone with the link can view"
   - Save

---

### **Step 4: Run the Application**

#### **Option A: Using Live Server (Recommended)**

1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select **"Open with Live Server"**

#### **Option B: Using Python**

```bash
# Navigate to project directory
cd d:\MCA\AlumniLinkedInMCA-project\Alumnigform

# Python 3
python -m http.server 8000
```

Then open: `http://localhost:8000`

#### **Option C: Direct File Opening**

Simply double-click `index.html` (may have CORS issues with some browsers)

---

## 🎯 Features

### **Filtering Options**
- 🔍 **Search**: Search by name, email, or company
- 📅 **Batch Year Filter**: Filter alumni by graduation year
- 🏢 **Company Filter**: Filter by current employer
- 🔄 **Reset**: Clear all filters

### **Statistics Dashboard**
- Total number of alumni
- Number of unique companies
- Currently displayed alumni count

### **Alumni Cards**
- Profile avatar with initials
- Name and batch year
- Current company
- Email address
- Direct links to LinkedIn profiles
- Email functionality

---

## 📁 Project Structure

```
Alumnigform/
│
├── index.html          # Main HTML file
├── styles.css          # Styling (minimalistic & professional)
├── app.js             # Application logic
├── config.js          # Configuration file (API keys, Sheet ID)
└── README.md          # This file
```

---

## 🔧 Customization

### **Change Column Mapping**

If your Google Form has different column orders, update `config.js`:

```javascript
COLUMNS: {
    TIMESTAMP: 0,  // Column A
    NAME: 1,       // Column B - Adjust as needed
    EMAIL: 2,      // Column C - Adjust as needed
    COMPANY: 3,    // Column D - Adjust as needed
    BATCH_YEAR: 4, // Column E - Adjust as needed
    LINKEDIN: 5    // Column F - Adjust as needed
}
```

### **Change Colors**

Edit CSS variables in `styles.css`:

```css
:root {
    --primary-color: #2563eb;      /* Main blue color */
    --secondary-color: #1e40af;    /* Darker blue */
    /* ... other colors */
}
```

---

## 🐛 Troubleshooting

### **Error: "Failed to load data"**

1. ✅ Check if API_KEY and SHEET_ID are correctly set in `config.js`
2. ✅ Verify Google Sheet is publicly accessible
3. ✅ Ensure Google Sheets API is enabled
4. ✅ Open browser console (F12) to see detailed error messages

### **Data not showing**

1. ✅ Check if form responses exist in the Google Sheet
2. ✅ Verify sheet name matches `SHEET_NAME` in config
3. ✅ Check column mapping in `config.js`

### **CORS Errors**

- Use a local server (Live Server or Python) instead of opening HTML directly

---

## 🌐 Deployment Options

### **GitHub Pages** (Free)

1. Create a GitHub repository
2. Push your code
3. Go to Settings → Pages
4. Select branch and save
5. Access via: `https://username.github.io/repository-name`

### **Netlify** (Free)

1. Go to [Netlify](https://www.netlify.com/)
2. Drag and drop your project folder
3. Site will be live instantly

### **Vercel** (Free)

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel` in project directory
3. Follow prompts

---

## 📊 Google Form Template

**Suggested Questions:**

1. **Name*** (Required)
   - Type: Short answer
   
2. **Email Address*** (Required)
   - Type: Email
   - Validation: Email format
   
3. **Current Working Company*** (Required)
   - Type: Short answer
   
4. **Batch Year*** (Required)
   - Type: Dropdown
   - Options: 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025
   
5. **LinkedIn Profile URL** (Optional)
   - Type: Short answer
   - Help text: "e.g., https://linkedin.com/in/yourprofile"

---

## 🔐 Security Best Practices

1. **API Key Restrictions**:
   - Restrict API key to specific domains
   - Limit to Google Sheets API only
   
2. **Sheet Permissions**:
   - Keep sheet as "view only" for public
   - Only form responses should modify data
   
3. **Data Privacy**:
   - Inform alumni their data will be publicly visible
   - Get consent before collecting data

---

## 📱 Responsive Design

The portal is fully responsive and works on:
- 💻 Desktop computers
- 📱 Tablets
- 📱 Mobile phones

---

## 🆘 Support

If you encounter issues:

1. Check browser console for errors (Press F12)
2. Verify all configuration steps
3. Ensure Google Sheet has data
4. Test API key using [Google's API Explorer](https://developers.google.com/sheets/api/reference/rest)

---

## 📝 License

This project is free to use and modify for educational purposes.

---

## 🎓 Created for MCA Alumni Network

**Last Updated:** January 7, 2026

**Version:** 1.0.0
