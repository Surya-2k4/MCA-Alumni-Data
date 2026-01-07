// Configuration file for Google Sheets API

const CONFIG = {
    // Replace with your Google Sheets API Key
    // Get it from: https://console.cloud.google.com/apis/credentials
    API_KEY: 'AIzaSyCQ_nnL2a6SIa-_BhCKy1ap_O5gouRYP_Q',
    
    // Replace with your Google Sheet ID
    // Extract from your Google Sheets URL: https://docs.google.com/spreadsheets/d/SHEET_ID/edit
    SHEET_ID: '18z09TO-a_HJz6UWF84nvuG7zR000JeRVGpipxqctPA8',
    
    // The name of the sheet tab (default is "Form Responses 1" for Google Forms)
    SHEET_NAME: 'Data',
    
    // Column mapping (adjusted for your form structure)
    // Your form columns: Name, Working Company, Batch, LinkedIn Profile URL
    COLUMNS: {
        TIMESTAMP: 0,  // Column A (auto-added by Google Forms)
        NAME: 1,       // Column B - Name
        COMPANY: 2,    // Column C - Working Company
        BATCH_YEAR: 3, // Column D - Batch
        LINKEDIN: 4    // Column E - LinkedIn Profile URL
    }
};
