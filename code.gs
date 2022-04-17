function doGet(e) {
  let pid = e.parameter.pid;

  let result = {
    'parcel': getParcel(pid),
    'timelines':getTimelines(pid)
  };

  return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
}

function getParcel(pid) {
  let parcels = SpreadsheetApp.getActive().getSheetByName('parcels').getDataRange().getDisplayValues()
    .filter(row => row[0] == pid)
    .map(row => { return { 'pid': row[0], 'from': row[1], 'to': row[2] } });

  return parcels.length > 0 ? parcels[0] : { 'pid': 'ไม่พบข้อมูล', 'from': null, 'to': null };
}

function getTimelines(pid) {
  return SpreadsheetApp.getActive().getSheetByName('timelines').getDataRange().getDisplayValues()
    .filter(row => row[0] == pid)
    .map(row => { return { 'pid': row[0], 'date': row[1], 'time': row[2], 'status': row[3] } });
}