function doPost(e) {
  try {
    // Open your spreadsheet
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Parse incoming JSON data
    var data = JSON.parse(e.postData.contents);
    
    // Get current timestamp
    var timestamp = new Date();
    
    // Append new row with data
    sheet.appendRow([
      timestamp,
      data.max6675_temp,
      data.custom_adc,
      data.custom_vout,
      data.custom_resistance,
      data.env_temp,
      data.env_humidity
    ]);
    
    // Return success response
    return ContentService.createTextOutput(
      JSON.stringify({status: "success", row: sheet.getLastRow()})
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch(error) {
    // Return error response
    return ContentService.createTextOutput(
      JSON.stringify({status: "error", message: error.toString()})
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("ESP32 Logger is running!");
}
