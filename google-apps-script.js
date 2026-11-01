/**
 * HƯỚNG DẪN CÀI ĐẶT TRÊN GOOGLE SHEET (MAI QUỐC HIỆP):
 * 1. Mở file Google Sheet của bạn -> trên thanh menu chọn: Tiện ích mở rộng (Extensions) -> Apps Script.
 * 2. Xóa hết code mặc định trong file Code.gs và dán toàn bộ đoạn code bên dưới vào.
 * 3. Bấm biểu tượng Lưu (Ctrl + S).
 * 4. Bấm nút "Triển khai" (Deploy) ở góc trên bên phải -> Chọn "Tùy chọn triển khai mới" (New deployment).
 * 5. Ở mục "Chọn loại" (Select type - hình bánh răng), chọn "Ứng dụng web" (Web app).
 * 6. Cấu hình:
 *    - Thực thi dưới dạng (Execute as): Tôi (Me)
 *    - Ai có quyền truy cập (Who has access): Bất kỳ ai (Anyone)  <-- QUAN TRỌNG!
 * 7. Bấm "Triển khai" (Deploy) -> Cấp quyền truy cập.
 * 8. Copy đường dẫn "URL ứng dụng web" (Web app URL, có đuôi /exec) và dán vào file `config.js` ở mục `googleSheetWebAppUrl`.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(["Thời gian", "Tên khách", "Tham dự", "Lời chúc"]);
      sheet.getRange(1, 1, 1, 4).setFontWeight("bold");
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    }

    var timestamp = data.timestamp || new Date().toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    var guestName = data.guest_name || "";
    var attendance = data.attendance || "";
    var message = data.message || "";

    sheet.appendRow([timestamp, guestName, attendance, message]);

    return ContentService.createTextOutput(
      JSON.stringify({ status: "ok", message: "Saved to Google Sheet" })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ status: "error", message: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ status: "ok", message: "Graduation RSVP Webhook (Mai Quoc Hiep) is active." })
  ).setMimeType(ContentService.MimeType.JSON);
}
