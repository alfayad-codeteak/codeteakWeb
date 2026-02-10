/**
 * Google Apps Script for Contact Form → Google Sheet
 *
 * Setup:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste this entire file as Code.gs (replace default content)
 * 3. Ensure the first row has headers: Timestamp | First Name | Last Name | Email | Message
 * 4. Deploy: Deploy → New deployment → Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL and add it to your .env.local as GOOGLE_APPS_SCRIPT_WEBHOOK_URL
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var body = e.postData ? JSON.parse(e.postData.contents) : {};

    var firstName = body.firstName || '';
    var lastName = body.lastName || '';
    var email = body.email || '';
    var message = body.message || '';
    var timestamp = body.timestamp || new Date().toISOString();

    sheet.appendRow([timestamp, firstName, lastName, email, message]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Row added.' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/** Optional: test from the script editor (Run → doGet) to add a sample row */
function doGet(e) {
  return doPost({
    postData: {
      contents: JSON.stringify({
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        message: 'Sample message from Apps Script test',
        timestamp: new Date().toISOString()
      })
    }
  });
}
