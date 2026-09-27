const SPREADSHEET_ID = "1q5ojvDWYQXX0yY9WcX5qH2ZIK8-LOL5StnMXwT6ik9o";
const SHEET_NAME = "Sheet1";
const DRIVE_FOLDER_NAME = "Janssen Payment Proofs";
const REVIEW_FOLDER_NAME = "Janssen Review Photos";
const REVIEWS_SHEET_NAME = "Reviews";
const ORDER_COUNTER_KEY = "JANSSEN_LAST_ORDER_NUMBER";

function onOpen() {
  SpreadsheetApp.getUi().createMenu("Janssen")
    .addItem("تهيئة ورقة المراجعات", "setupReviewsSheet")
    .addItem("فتح تعليمات إدارة المراجعات", "showReviewHelp")
    .addToUi();
}

function setupReviewsSheet() {
  const sheet = getReviewsSheet_();
  const statusRange = sheet.getRange("I2:I");
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["New", "Approved", "Rejected", "Deleted"], true)
    .setAllowInvalid(false)
    .build();
  statusRange.setDataValidation(rule);
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, 9);
  SpreadsheetApp.getUi().alert("تم تجهيز ورقة Reviews. غيّر Status إلى Approved للنشر، أو Rejected/Deleted لإخفاء المراجعة.");
}

function showReviewHelp() {
  SpreadsheetApp.getUi().alert(
    "إدارة المراجعات:\n\n" +
    "New = مراجعة جديدة لم تُراجع بعد.\n" +
    "Approved = تظهر على الموقع.\n" +
    "Rejected = لا تظهر.\n" +
    "Deleted = لا تظهر ويمكن الاحتفاظ بالسجل.\n\n" +
    "لو عايز حذفها نهائيًا من السجل: احذف صف المراجعة من ورقة Reviews."
  );
}

function doGet(e) {
  const action = e && e.parameter ? String(e.parameter.action || "") : "";
  if (action === "reserve") {
    const result = reserveOrderId_();
    const callback = e.parameter.callback || "";
    const json = JSON.stringify(result);
    if (callback && /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(callback)) {
      return ContentService.createTextOutput(callback + "(" + json + ");").setMimeType(ContentService.MimeType.JAVASCRIPT);
    }
    return jsonOutput_(result);
  }
  if (action === "reviews") return jsonOutput_({ success: true, reviews: getApprovedReviews_() });
  return jsonOutput_({ success: true, message: "Janssen Orders API is working" });
}

function doPost(e) {
  const data = (e && e.parameter) ? e.parameter : {};
  if (String(data.action || "") === "review") return handleReview_(data);

  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);
    if (!sheet) throw new Error("Sheet not found: " + SHEET_NAME);
    const customer = String(data.customer || "").trim();
    const phone = normalizePhone(data.phone || "");
    const address = String(data.address || "").trim();
    const payment = String(data.payment || "Cash on Delivery").trim();
    const notes = String(data.notes || "").trim();
    if (!customer) throw new Error("Customer name is required.");
    if (!isValidEgyptianPhone(phone)) throw new Error("Invalid Egyptian phone number.");
    if (!address) throw new Error("Address is required.");
    let orderId = String(data.orderId || "").trim().toUpperCase();
    if (!/^JAN-\d{12,20}$/.test(orderId)) throw new Error("Missing or invalid Order ID from website.");
    if (orderIdExists_(sheet, orderId)) throw new Error("Duplicate Order ID: " + orderId);
    let items = data.items || "[]";
    try { items = JSON.parse(items); } catch (err) { items = []; }
    if (!Array.isArray(items)) items = [items];
    if (!items.length) items = [{ product:data.product||"", width:data.width||"", length:data.length||"", qty:data.qty||1, total:data.total||0 }];
    let screenshotUrl = "";
    if (data.screenshotData) screenshotUrl = saveScreenshot(data.screenshotData, data.screenshotName || "payment-proof.jpg", orderId);
    const date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    items.forEach(function(item) {
      sheet.appendRow([orderId, date, customer, phone, address, item.product||"", item.width||"", item.length||"", Number(item.qty||1), Number(item.total||0), payment, screenshotUrl, "New"]);
    });
    SpreadsheetApp.flush();
    return jsonOutput_({ success:true, orderId:orderId, screenshot:screenshotUrl, notes:notes });
  } catch(error) {
    return jsonOutput_({ success:false, error:String(error) });
  } finally { try { lock.releaseLock(); } catch(err) {} }
}

function handleReview_(data) {
  try {
    const name = String(data.name || "").trim();
    const productId = String(data.productId || "").trim();
    const product = String(data.product || "").trim();
    const text = String(data.text || "").trim();
    const rating = Number(data.rating || 0);
    if (!name) throw new Error("اسم العميل مطلوب.");
    if (!productId || !product) throw new Error("المنتج مطلوب.");
    if (!text) throw new Error("نص المراجعة مطلوب.");
    if (rating < 1 || rating > 5) throw new Error("التقييم يجب أن يكون من 1 إلى 5.");

    const sheet = getReviewsSheet_();
    const id = "REV-" + new Date().getTime();
    const date = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyy-MM-dd HH:mm:ss");
    const photoUrl = data.photoData ? saveReviewPhoto_(data.photoData, data.photoName || "review.jpg", id) : "";
    sheet.appendRow([id, date, productId, product, name, rating, text, photoUrl, "New"]);
    SpreadsheetApp.flush();
    return jsonOutput_({ success:true, reviewId:id, status:"New", photoUrl:photoUrl });
  } catch(error) {
    return jsonOutput_({ success:false, error:String(error) });
  }
}

function getReviewsSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(REVIEWS_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(REVIEWS_SHEET_NAME);
    sheet.appendRow(["Review ID","Date","Product ID","Product","Customer Name","Rating","Review","Photo","Status"]);
  }
  return sheet;
}

function getApprovedReviews_() {
  const sheet = getReviewsSheet_();
  const last = sheet.getLastRow();
  if (last < 2) return [];
  return sheet.getRange(2,1,last-1,9).getValues()
    .filter(r => String(r[8] || "").trim().toLowerCase() === "approved")
    .map(r => ({ id:String(r[0]), date:String(r[1]), productId:String(r[2]), product:String(r[3]), name:String(r[4]), rating:Number(r[5]||5), text:String(r[6]), photoUrl:String(r[7]) }));
}

function jsonOutput_(obj) { return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON); }
function orderIdExists_(sheet, orderId) { const lastRow=sheet.getLastRow(); if(lastRow<2)return false; const values=sheet.getRange(2,1,lastRow-1,1).getValues(); const target=String(orderId).trim().toUpperCase(); return values.some(row=>String(row[0]||"").trim().toUpperCase()===target); }
function reserveOrderId_(){const lock=LockService.getScriptLock();lock.waitLock(30000);try{return{success:true,orderId:reserveOrderIdNoLock_()};}finally{lock.releaseLock();}}
function reserveOrderIdNoLock_(){const props=PropertiesService.getScriptProperties();let last=Number(props.getProperty(ORDER_COUNTER_KEY)||0);const sheet=SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);last=Math.max(last,getHighestOrderNumber_(sheet));const next=last+1;props.setProperty(ORDER_COUNTER_KEY,String(next));return "JAN-"+next;}
function getHighestOrderNumber_(sheet){const lastRow=sheet.getLastRow();if(lastRow<2)return 1000;const values=sheet.getRange(2,1,lastRow-1,1).getValues();let highest=1000;values.forEach(row=>{const m=String(row[0]||"").trim().match(/^JAN-(\d+)$/i);if(m)highest=Math.max(highest,parseInt(m[1],10));});return highest;}
function normalizePhone(phone){let value=String(phone).trim().replace(/[\s\-()]/g,"");const arabicNumbers={"٠":"0","١":"1","٢":"2","٣":"3","٤":"4","٥":"5","٦":"6","٧":"7","٨":"8","٩":"9"};value=value.replace(/[٠-٩]/g,c=>arabicNumbers[c]);if(value.startsWith("+20"))value="0"+value.substring(3);if(value.startsWith("20")&&value.length===12)value="0"+value.substring(2);return value.replace(/\D/g,"").slice(0,11);}
function isValidEgyptianPhone(phone){return /^(010|011|012|015)\d{8}$/.test(phone);}
function saveScreenshot(base64Data,fileName,orderId){const folders=DriveApp.getFoldersByName(DRIVE_FOLDER_NAME);const folder=folders.hasNext()?folders.next():DriveApp.createFolder(DRIVE_FOLDER_NAME);const cleaned=String(base64Data).replace(/^data:image\/[\w.+-]+;base64,/,'');const ext=getFileExtension(fileName);const blob=Utilities.newBlob(Utilities.base64Decode(cleaned),getMimeType(ext),orderId+"_payment_proof."+ext);const file=folder.createFile(blob);file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);return "https://drive.google.com/uc?export=view&id=" + file.getId();}
function saveReviewPhoto_(base64Data,fileName,reviewId){const folders=DriveApp.getFoldersByName(REVIEW_FOLDER_NAME);const folder=folders.hasNext()?folders.next():DriveApp.createFolder(REVIEW_FOLDER_NAME);const cleaned=String(base64Data).replace(/^data:image\/[\w.+-]+;base64,/,'');const ext=getFileExtension(fileName);const blob=Utilities.newBlob(Utilities.base64Decode(cleaned),getMimeType(ext),reviewId+"_photo."+ext);const file=folder.createFile(blob);file.setSharing(DriveApp.Access.ANYONE_WITH_LINK,DriveApp.Permission.VIEW);return "https://drive.google.com/uc?export=view&id=" + file.getId();}
function getFileExtension(fileName){const parts=String(fileName).split(".");return parts.length>1?parts.pop().toLowerCase():"jpg";}
function getMimeType(extension){return({jpg:"image/jpeg",jpeg:"image/jpeg",png:"image/png",webp:"image/webp"})[extension]||"image/jpeg";}
