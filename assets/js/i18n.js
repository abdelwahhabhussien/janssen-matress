(function(){
  'use strict';
  const STORAGE_KEY='janssen_lang';
  const saved=localStorage.getItem(STORAGE_KEY);
  const initial=(saved==='en'||saved==='ar')?saved:'ar';

  const PRODUCT_NAMES={
    'مرتبة بوكيت قطن27':'Pocket Cotton 27 Mattress','مرتبة ألمانى':'German Mattress','مرتبة اكسترا جولد':'Extra Gold Mattress','مرتية ميدى بيدك - ميمورى فوم':'Medi-Pedic – Memory Foam Mattress','27 مرتبة كتراكت':'Cataract 27 Mattress','مرتبة بلوماس':'Plumas Mattress','مرتبة بوكيت قطن30':'Pocket Cotton 30 Mattress','مرتبة سكاندى':'Scandi Mattress','مرتبة سويت دريمز':'Sweet Dreams Mattress','مرتبة روياليتى - ميمورى فوم':'Royalty – Memory Foam Mattress','30 مرتبة كتراكت':'Cataract 30 Mattress','مرتبة ماريوت 22 - بدون سوست':'Marriott 22 – Springless Mattress','مرتبة ماريوت قطن22 - بدون سوست':'Marriott Cotton 22 – Springless Mattress','مرتبة ماريوت17 - بدون سوست':'Marriott 17 – Springless Mattress','مرتبة ماريوت قطن17 - بدون سوست':'Marriott Cotton 17 – Springless Mattress','مرتبة يانسن بيدك - بدون سوست':'Janssen Pedic – Springless Mattress','مرتبة كتراكت بيلوتوب':'Cataract Pillow Top Mattress','مرتبة جورى':'Joury Mattress','مخدة طويلة فايبر':'Long Fiber Pillow','مخدة فايبر - أوشن':'Ocean Fiber Pillow','واقى مرتبة ضد الماء':'Waterproof Mattress Protector','مخدة فندقية - ميكروفايبر (هيفين)':'Hotel Microfiber Pillow (Heaven)','مخدة ميمورى فوم استاندر':'Memory Foam Standard Pillow','مرتبة تطرية فايبر':'Fiber Mattress Topper','مخدة ميمورى فوم كونتور':'Memory Foam Contour Pillow','مرتبة تطرية ميموري فوم – طبقة إضافية لمراتب السرير':'Memory Foam Mattress Topper','مرتبة تطرية فندقية - ميكروفايبر':'Hotel Microfiber Topper','اللحاف الفندقى - ميكروفايبر':'Hotel Microfiber Quilt','لحاف فايبر':'Fiber Quilt','مخدة ميمورى فوم جيل':'Memory Foam Gel Pillow',
    'واقى مرتبة ضد المياة':'Waterproof Mattress Protector','مرتبة فيسكوبيدك — مرتبة طبية ميموري فوم وسوست منفصلة | Englander Egypt':'Visco-Pedic Mattress – Medical Memory Foam & Pocket Springs | Englander Egypt','خدادية ميكروفايبر':'Microfiber Cushion Pillow','خدادية ميمورى فوم استاندر':'Memory Foam Standard Cushion Pillow','مرتبة فيكتوريا — مرتبة سوست منفصلة | Englander Egypt':'Victoria Mattress – Pocket Springs | Englander Egypt','خداية ميمورى فوم كونتور':'Memory Foam Contour Cushion Pillow','مرتبة تطرية ميمورى فوم':'Memory Foam Mattress Topper','مرتبة ليدى — مرتبة طبية سوست متصلة | Englander Egypt':'Lady Mattress – Medical Connected Springs | Englander Egypt','مرتبة هونى مون — مرتبة سوست منفصلة بلاتكس طبيعي | Englander Egypt':'Honey Moon Mattress – Pocket Springs with Natural Latex | Englander Egypt','مرتبة مارفى':'Marfy Mattress','خدادية ميمورى فوم چيل':'Memory Foam Gel Cushion Pillow','مرتبة سيزونال — مرتبة سوست متصلة بطبقة قطن | Englander Egypt':'Seasonal Mattress – Connected Springs with Cotton Layer | Englander Egypt','مرتبة اطفال':'Kids Mattress','مرتبة سيتى':'City Mattress','مرتبة تطرية ميكروفايبر':'Microfiber Mattress Topper','مرتبة كارس — مرتبة طبية سوست متصلة بإسفنج ريبوند | Englander Egypt':'Cars Mattress – Medical Connected Springs with Rebound Foam | Englander Egypt','مرتبة كارس بيلوتوب':'Cars Pillow Top Mattress','مرتبة سوبركلاسيك — مرتبة طبية سوست متصلة | Englander Egypt':'Super Classic Mattress – Medical Connected Springs | Englander Egypt'
  };

  const MAP={
    'الرئيسية':'Home','يانسن':'Janssen','إنجلندر':'Englander','انجلندر':'Englander','عرض الكل':'View All','الكل':'All','المقارنة':'Compare','المراجعات':'Reviews','السلة':'Cart','المراتب':'Mattresses','تواصل معنا':'Contact Us','اتصل بنا':'Call Us','واتساب':'WhatsApp','بحث':'Search','اختيارك أسهل':'An easier choice','الدفع':'Payment','أكتر من طريقة للدفع':'Multiple payment methods','الدفع عند الاستلام':'Cash on Delivery','تأكيد الطلب':'Confirm Order','اطلب على واتساب':'Order on WhatsApp','اختار الشركة':'Choose a brand','اختار الشركة الأول':'Choose a brand first','كل المعلومات في مكان واحد':'Everything in one place','الخدمة المباشرة':'Direct support','خدمة مباشرة':'Direct support','طلب سهل':'Easy ordering','طلبك هيتسجل مباشرة في نظام الطلبات.':'Your order will be recorded directly in our order system.','طرق دفع':'Payment methods','صفحة آراء العملاء':'Customer reviews page','أضف مراجعتك':'Add your review','موديل مراتب':'Mattress model','متاح':'Available','كل المقاسات':'All sizes','مراتب ومنتجات يانسن':'Janssen mattresses & products','مراتب ومنتجات إنجلندر':'Englander mattresses & products','الكل':'All','اختيار المنتج':'Choose a product','اختيار المقاس':'Choose a size','تأكيد الطلب':'Confirm the order','التواصل والتوصيل':'Contact & delivery','مساعدة':'Help','أسئلة بتتكرر':'Frequently asked questions','إجابات سريعة قبل ما تختار وتطلب.':'Quick answers before you choose and order.','تواصل':'Contact','فروعنا في مدينة نصر':'Our branches in Nasr City','الفرع الأول':'Branch 1','الفرع الثاني':'Branch 2','الهاتف':'Phone','موقع الفرع الأول على الخريطة':'Branch 1 on Google Maps','موقع الفرع الثاني على الخريطة':'Branch 2 on Google Maps','راسلنا مباشرة':'Message us directly','الأقسام':'Sections','كل المراتب':'All mattresses','سوست متصلة':'Connected Springs','سوست منفصلة':'Pocket Springs','بدون سوست':'Springless','إكسسوارات':'Accessories','مراتب تطرية':'Mattress Toppers','معلومات':'Information','التوصيل':'Delivery','الاستبدال والاسترجاع':'Returns & Exchanges','الخصوصية':'Privacy','الشروط والأحكام':'Terms & Conditions','الأسئلة الشائعة':'FAQ','آراء العملاء':'Customer Reviews','المراجعات المنشورة':'Published Reviews','تجارب حقيقية من عملائنا':'Real experiences from our customers','شاركنا تجربتك مع المرتبة.':'Share your mattress experience with us.','شارك تجربتك':'Share your experience','اكتب رأيك واختار المرتبة، ولو حابب ارفع صورة من المرتبة أو التجربة.':'Write your review, choose the mattress, and optionally upload a photo.','المرتبة':'Mattress','اسمك':'Your name','التقييم':'Rating','رأيك':'Your review','صورة (اختياري)':'Photo (optional)','إرسال المراجعة':'Submit review','الخصوصية':'Privacy','عن المتجر':'About the store','فروعنا':'Our branches','للاستفسار:':'For inquiries:','السياسات':'Policies','قبل التنفيذ':'Before fulfillment','بعد الاستلام':'After delivery','ملاحظة':'Note','بياناتك عندنا':'Your data with us','بيانات الطلب':'Order information','بيانات المراجعة':'Review data','التواصل':'Contact','الشروط':'Terms','الأسعار':'Prices','الطلبات':'Orders','مقارنة ذكية':'Smart comparison','قارن المنتجات قبل ما تختار':'Compare products before you choose','تقدر تقارن حتى 4 منتجات':'You can compare up to 4 products','مسح المقارنة':'Clear comparison','مسح':'Clear','فتح المقارنة':'Open comparison','مضاف للمقارنة':'Added to comparison','قارن':'Compare','إضافة للمقارنة':'Add to compare','عرض التفاصيل':'View details','التفاصيل والمقاسات':'Details & sizes','يبدأ من':'Starting from','منتج':'product','منتجات':'products','مراجعة':'review','مراجعات':'reviews','مقاسات':'sizes','مقاس واحد':'One size','المقاس':'Size','العرض':'Width','الطول':'Length','الارتفاع':'Height','السعر حسب العرض':'Price by width','السعر حسب المقاس المختار.':'Price is based on the selected size.','السعر الحالي.':'Current price.','السعر الحالي':'Current price','المواصفات الرسمية':'Official specifications','تفاصيل':'Details','كل اللي محتاج تعرفه عن المرتبة':'Everything you need to know about this mattress','النوع':'Type','المقاسات':'Sizes','راجع تفاصيل المرتبة والمقاسات المتاحة.':'Review the mattress details and available sizes.','الدفع كاش عند استلام المرتبة':'Pay cash when the mattress is delivered','تحويل عبر InstaPay':'Transfer via InstaPay','تحويل عبر فودافون كاش':'Transfer via Vodafone Cash','بيانات التحويل':'Transfer details','الرقم:':'Number:','نسخ':'Copy','اسم الحساب:':'Account name:','المبلغ المطلوب:':'Amount due:','ارفع Screenshot للتحويل':'Upload transfer screenshot','الصورة مطلوبة فقط عند اختيار InstaPay أو Vodafone Cash.':'A screenshot is required only when choosing InstaPay or Vodafone Cash.','الإجمالي':'Total','تأكيد وإرسال الطلب':'Confirm & send order','سلة المشتريات':'Shopping Cart','راجع طلبك':'Review your order','اختار المقاس والكمية، ثم أكمل بياناتك وأرسل الطلب مباشرة من الموقع.':'Choose the size and quantity, then complete your details and submit the order directly from the website.','تم إرسال طلبك بنجاح':'Your order was submitted successfully','رقم طلبك هو:':'Your order number is:','احتفظ برقم الطلب ده لمتابعة طلبك.':'Keep this order number for reference.','العودة للرئيسية':'Back to Home','الاسم':'Name','رقم الهاتف':'Phone number','المحافظة':'Governorate','اختار المحافظة':'Choose governorate','القاهرة':'Cairo','الجيزة':'Giza','التوصيل متاح داخل القاهرة والجيزة فقط.':'Delivery is available in Cairo and Giza only.','العنوان بالتفصيل':'Full address','ملاحظات':'Notes','طريقة الدفع':'Payment method','طلبك هيتسجل مباشرة في نظام الطلبات.':'Your order will be recorded directly in our order system.','التوصيل وتأكيد الطلب':'Delivery & order confirmation','التوصيل متاح داخل القاهرة والجيزة فقط. بعد إرسال الطلب، يتم التواصل معك لتأكيد البيانات وتفاصيل التوصيل قبل التنفيذ.':'Delivery is available in Cairo and Giza only. After you submit your order, we will contact you to confirm the details and delivery.','كيف يتم الطلب؟':'How to order?','اختار المرتبة والمقاس.':'Choose the mattress and size.','أضفها للسلة وأكمل بياناتك.':'Add it to the cart and complete your details.','اختار طريقة الدفع.':'Choose the payment method.','سيتم التواصل معك لتأكيد الطلب وتفاصيل التوصيل.':'We will contact you to confirm the order and delivery details.','مهم':'Important','التوصيل متاح للقاهرة والجيزة فقط. تكلفة وموعد التوصيل قد يختلفان حسب العنوان وتفاصيل الطلب، لذلك يتم تأكيدهما مع العميل قبل التنفيذ.':'Delivery is available in Cairo and Giza only. Delivery cost and timing may vary by address and order details, so they are confirmed with the customer before fulfillment.','الخطوة الأولى':'First step','دخول كتالوج يانسن ←':'Open Janssen catalog →','دخول كتالوج إنجلندر ←':'Open Englander catalog →','عرض كل المنتجات':'View all products','عرض الكل ←':'View all →','اختار الشركة، افتح المنتج، حدّد المقاس، وقارن بين الموديلات قبل ما تضيف للسلة.':'Choose a brand, open a product, select the size, and compare models before adding to the cart.','اختار الشركة، ابحث باسم المنتج، أو فلتر حسب النوع والسعر.':'Choose a brand, search by product name, or filter by type and price.','منتج من البراندين':'Products from both brands','كل الأنواع':'All types','الترتيب الافتراضي':'Default order','السعر: من الأقل':'Price: low to high','السعر: من الأعلى':'Price: high to low','الاسم':'Name','التالي':'Next','السابق':'Previous','إغلاق':'Close','متابعة التسوق':'Continue shopping','الذهاب إلى السلة':'Go to cart','تمت إضافة المنتج للسلة':'Product added to cart','المنتج اتضاف بنجاح، تحب تعمل إيه دلوقتي؟':'The product was added successfully. What would you like to do?','المقاس:':'Size:','شكرًا على المراجعة ❤️':'Thank you for your review ❤️','لسه مفيش مراجعات منشورة لهذا المنتج.':'There are no published reviews for this product yet.','جاري إرسال المراجعة…':'Submitting review…','اسم الحساب':'Account name','الصفحة الرئيسية':'Home page','المنتج':'Product','روابط':'Links','مستنيينك':'We are waiting for you','جاري تجهيز':'Preparing','إعادة الوضع':'Reset view','اسحب يمين / شمال / فوق / تحت':'Drag right / left / up / down','إرجاع للوضع الطبيعي':'Reset view','اختيارات متعددة':'Multiple choices','مقاسات وموديلات مختلفة':'Different sizes and models','خدمة مباشرة':'Direct support','تواصل سريع عبر الهاتف وواتساب':'Quick support by phone and WhatsApp','فرع مدينة نصر':'Nasr City branch','طلب سهل':'Easy ordering','من اختيار النوع والمقاس لحد تأكيد الطلب والدفع.':'From choosing the type and size to confirming the order and payment.','مقاسات متعددة':'Multiple sizes','اختار العرض والطول المتاحين لكل موديل.':'Choose the available width and length for each model.','سعر حسب المقاس':'Price by size','السعر بيتحدث مباشرة حسب العرض اللي تختاره.':'The price updates instantly based on the selected width.','3 طرق دفع':'3 payment methods','عند الاستلام أو InstaPay أو Vodafone Cash.':'Cash on delivery, InstaPay, or Vodafone Cash.','راجع قبل ما تختار':'Review before you choose','أضفنا مساحة مستقلة للمراجعات، مع عدد المراجعات الظاهر على صفحات منتجات يانسن الرسمية كمرجع للمنتجات.':'We added a dedicated reviews area, with review counts shown on official Janssen product pages as a reference.','يانسن وإنجلندر':'Janssen & Englander','اختيارك أسهل لما تشوف الصورة كاملة':'An easier choice when you see the full picture','هل الطول 190 أو 195 أو 200 يغير السعر؟':'Does length 190, 195, or 200 change the price?','السعر في الكتالوج بيتحدد حسب العرض، والطول المتاح لا يغير السعر حسب بيانات المنتجات الحالية.':'Catalog prices are based on width; the available length does not change the price according to the current product data.','أقدر أدفع إزاي؟':'How can I pay?','متاح الدفع عند الاستلام، أو InstaPay، أو Vodafone Cash. في الدفع الإلكتروني هتحتاج ترفع صورة إثبات الدفع أثناء الطلب.':'Cash on delivery, InstaPay, or Vodafone Cash are available. For electronic payment, you will need to upload a proof of payment with the order.','لو محتاج أسأل عن مقاس أو موديل؟':'Need to ask about a size or model?','اتصل على 01014158303 أو راسلنا على واتساب.':'Call 01014158303 or message us on WhatsApp.','عندنا فرعين، والتوصيل متاح للقاهرة والجيزة فقط.':'We have two branches, and delivery is available in Cairo and Giza only.','موقعنا معمول لتسهيل اختيار المرتبة والمقاس والسعر، مع طلب مباشر أونلاين أو عبر الهاتف وواتساب.':'Our store is designed to make it easy to choose a mattress, size, and price, with direct online ordering or by phone and WhatsApp.','بنقدملك كتالوج مراتب يانسن المتاح عندنا، مع عرض المقاسات والأسعار حسب العرض، وخيارات الدفع أثناء الطلب.':'We provide the Janssen catalog available in our store, with sizes and prices by width and payment options during checkout.','أي طلب استبدال أو استرجاع يتم بعد مراجعة حالة الطلب والمنتج والتواصل مع العميل.':'Any exchange or return request is handled after reviewing the order and product condition and contacting the customer.','راجع المقاس والمنتج والبيانات جيدًا أثناء الطلب. لو في أي تعديل، تواصل معنا قبل تأكيد الطلب.':'Review the size, product, and details carefully when ordering. If anything needs changing, contact us before confirmation.','للاستفسار عن حالة الاستبدال أو الاسترجاع، تواصل معنا مباشرة على 01014158303 مع رقم الطلب.':'For exchange or return inquiries, contact us directly at 01014158303 with your order number.','التفاصيل النهائية لأي حالة تعتمد على حالة المنتج والطلب وسياسة المتجر وقت التنفيذ.':'The final details for each case depend on the product and order condition and the store policy at the time of fulfillment.','نستخدم البيانات التي تدخلها في الطلب أو المراجعة لتنفيذ الطلب والتواصل معك وإدارة الموقع.':'We use the information you enter in an order or review to fulfill the order, contact you, and manage the website.','قد نحتاج الاسم ورقم الهاتف والعنوان والملاحظات وطريقة الدفع وصورة إثبات الدفع عند استخدام الدفع الإلكتروني.':'We may need your name, phone number, address, notes, payment method, and proof of payment when using electronic payment.','المراجعات والصور المرفوعة تخضع للمراجعة قبل نشرها على الموقع. لا ننشر المراجعة قبل اعتمادها.':'Submitted reviews and photos are reviewed before being published. Reviews are not published before approval.','لأي استفسار بخصوص بياناتك تواصل معنا على 01014158303.':'For questions about your data, contact us at 01014158303.','باستخدام الموقع أو إرسال طلب، فأنت توافق على استخدام البيانات اللازمة لتنفيذ الطلب والتواصل معك.':'By using the website or submitting an order, you agree to the use of the data needed to fulfill the order and contact you.','الأسعار المعروضة هي الأسعار الحالية في الكتالوج، والسعر النهائي للمنتج يتحدد حسب المقاس المختار.':'Displayed prices are the current catalog prices, and the final product price is based on the selected size.','إرسال الطلب لا يعني اكتمال التنفيذ قبل تأكيد البيانات والتفاصيل مع العميل.':'Submitting an order does not mean fulfillment is complete until the details are confirmed with the customer.','المراجعات المرسلة من العملاء تخضع للمراجعة قبل النشر.':'Customer-submitted reviews are reviewed before publication.','قارن حتى 4 منتجات':'Compare up to 4 products','السعر عند العرض المحدد':'Price at selected width','الشركة':'Brand','الفئة':'Category','العروض المتاحة':'Available widths','الأطوال المتاحة':'Available lengths','المواصفات':'Specifications','إزالة':'Remove','افتح منتجين أو أكثر في المقارنة.':'Open two or more products in the comparison.','لا توجد نتائج.':'No results.','مش لاقيين منتج بالمواصفات دي.':'No products match these criteria.','جرّب تغيّر البحث أو الفلاتر.':'Try changing the search or filters.','اختار المحافظة':'Choose governorate','القاهرة':'Cairo','الجيزة':'Giza','الفرع الثاني':'Branch 2','الفرع الأول':'Branch 1','مراتب يانسن مدينة نصر':'Janssen Mattresses Nasr City','راحتك تستحق الاختيار الصح.':'Your comfort deserves the right choice.','© 2026 مراتب يانسن مدينة نصر':'© 2026 Janssen Mattresses Nasr City'
  };

  Object.assign(MAP, {
    'مراتب يانسن وإنجلندر | الراحة تبدأ من هنا':'Janssen & Englander Mattresses | Comfort starts here',
    'يانسن × إنجلندر — مدينة نصر':'Janssen × Englander — Nasr City',
    'نام براحة.':'Sleep comfortably.',
    'اصحى مرتاح.':'Wake up refreshed.',
    'اختار الشركة الأول، وبعدها استعرض الموديلات والمقاسات والأسعار. تقدر كمان تقارن بين أي منتجين قبل الطلب.':'Choose a brand first, then browse models, sizes, and prices. You can also compare any two products before ordering.',
    'اسحب في أي اتجاه • عجلة الماوس للّف':'Drag in any direction • Use the mouse wheel to rotate',
    'إرجاع للوضع الطبيعي':'Reset view',
    'اختيارات متعددة':'Multiple choices',
    'مقاسات وموديلات مختلفة':'Different sizes and models',
    'فرع مدينة نصر':'Nasr City location',
    '71 طريق النصر':'71 El Nasr Road',
    'اختار المرتبة وتواصل معنا':'Choose your mattress and contact us',
    'من اختيار النوع والمقاس لحد تأكيد الطلب والدفع.':'From choosing the type and size to confirming your order and payment.',
    'اختار العرض والطول المتاحين لكل موديل.':'Choose the available width for each model.',
    'سعر حسب المقاس':'Price by size',
    'السعر بيتحدث مباشرة حسب العرض اللي تختاره.':'The price updates instantly based on the selected width.',
    'شوف المراجعات المنشورة وأضف تجربتك بعد الشراء.':'See published reviews and share your experience after purchase.',
    'الخطوة الأولى':'First step',
    'ادخل على كتالوج الشركة اللي عايزها، أو اعرض منتجات يانسن وإنجلندر مع بعض.':'Open the brand catalog you want, or browse Janssen and Englander together.',
    'مراتب ومنتجات يانسن':'Janssen mattresses & products',
    'استعرض كل موديلات يانسن، المقاسات، الأسعار، والمقارنة.':'Browse all Janssen models, sizes, prices, and comparison options.',
    'دخول كتالوج يانسن ←':'Open Janssen catalog →',
    'استعرض كل منتجات إنجلندر والمقاسات والأسعار المتاحة.':'Browse all Englander products, available sizes, and prices.',
    'دخول كتالوج إنجلندر ←':'Open Englander catalog →',
    'عرض كل المنتجات':'View all products',
    'قارن بين يانسن وإنجلندر وشوف كل المنتجات في كتالوج واحد.':'Compare Janssen and Englander and browse all products in one catalog.',
    'عرض الكل ←':'View all →',
    'أكتر من طريقة للدفع':'Multiple payment methods',
    'اختار الطريقة الأنسب لك أثناء إتمام الطلب، وسيظهر لك كل ما تحتاجه لإتمام الدفع.':'Choose the payment method that suits you during checkout, and you will see everything needed to complete payment.',
    'ادفع عند استلام المرتبة.':'Pay when your mattress is delivered.',
    'راجع قبل ما تختار':'Review before you choose',
    'أضفنا مساحة مستقلة للمراجعات، مع عدد المراجعات الظاهر على صفحات منتجات يانسن الرسمية كمرجع للمنتجات.':'We added a dedicated reviews area with review counts shown on official Janssen product pages as a product reference.',
    'اختيارك أسهل لما تشوف الصورة كاملة':'Choosing is easier when you see the full picture',
    'اختار الشركة، افتح المنتج، حدّد المقاس، وقارن بين الموديلات قبل ما تضيف للسلة.':'Choose a brand, open a product, select the size, and compare models before adding to cart.',
    'تصفح المنتجات':'Browse products',
    'هل الطول 190 أو 195 أو 200 يغير السعر؟':'Does length 190, 195, or 200 change the price?',
    'السعر في الكتالوج بيتحدد حسب العرض، والطول المتاح لا يغير السعر حسب بيانات المنتجات الحالية.':'Catalog prices are based on width; the available length does not change the price according to the current product data.',
    'أقدر أدفع إزاي؟':'How can I pay?',
    'متاح الدفع عند الاستلام، أو InstaPay، أو Vodafone Cash. في الدفع الإلكتروني هتحتاج ترفع صورة إثبات الدفع أثناء الطلب.':'Cash on delivery, InstaPay, or Vodafone Cash are available. For electronic payment, upload proof of payment with your order.',
    'لو محتاج أسأل عن مقاس أو موديل؟':'Need to ask about a size or model?',
    'اتصل على 01014158303 أو راسلنا على واتساب.':'Call 01014158303 or message us on WhatsApp.',
    'عنواننا في مدينة نصر، والتوصيل متاح للقاهرة والجيزة فقط.':'Our location is in Nasr City, and delivery is available in Cairo and Giza only.',
    'العنوان':'Address',
    '71 طريق النصر، مدينة نصر، بجوار طيبة مول':'71 El Nasr Road, Nasr City, next to Tiba Mall',
    'فتح الموقع على الخريطة':'Open location on the map',
    'راحتك تستحق الاختيار الصح.':'Your comfort deserves the right choice.',
    'موقعنا معمول لتسهيل اختيار المرتبة والمقاس والسعر، مع طلب مباشر أونلاين أو عبر الهاتف وواتساب.':'Our store makes it easy to choose a mattress, size, and price, with direct online ordering or by phone and WhatsApp.',
    'بنقدملك كتالوج مراتب يانسن المتاح عندنا، مع عرض المقاسات والأسعار حسب العرض، وخيارات الدفع أثناء الطلب.':'We provide the Janssen catalog available at our store, with sizes and prices by width and payment options at checkout.',
    'عنواننا':'Our location',
    '71 طريق النصر، بجوار معرض أبو حتة للسيارات.':'71 El Nasr Road, next to Abu Hatta Car Showroom.',
    'مقارنة المنتجات | يانسن وإنجلندر':'Product Comparison | Janssen & Englander',
    'اختار من 2 إلى 4 منتجات من يانسن أو إنجلندر، وشوف السعر والمقاسات ونوع السوست والارتفاع والمواصفات جنب بعض.':'Choose 2 to 4 Janssen or Englander products and compare price, sizes, spring type, height, and specifications side by side.',
    'يانسن + إنجلندر':'Janssen + Englander',
    'تجارب حقيقية من عملائنا':'Real experiences from our customers',
    'شاركنا تجربتك مع المرتبة.':'Share your mattress experience with us.',
    'اكتب رأيك واختار المرتبة، ولو حابب ارفع صورة من المرتبة أو التجربة.':'Write your review, choose the mattress, and optionally upload a photo.',
    '0 مراجعة':'0 reviews',
    'أضف مراجعتك':'Add your review',
    'التوصيل | مراتب يانسن مدينة نصر':'Delivery | Janssen Mattresses Nasr City',
    'من نحن | مراتب يانسن مدينة نصر':'About Us | Janssen Mattresses Nasr City',
    'مراتب يانسن — مدينة نصر':'Janssen Mattresses — Nasr City',
    'الاستبدال والاسترجاع | مراتب يانسن مدينة نصر':'Returns & Exchanges | Janssen Mattresses Nasr City',
    'أي طلب استبدال أو استرجاع يتم بعد مراجعة حالة الطلب والمنتج والتواصل مع العميل.':'Any exchange or return request is handled after reviewing the order and product condition and contacting the customer.',
    'راجع المقاس والمنتج والبيانات جيدًا أثناء الطلب. لو في أي تعديل، تواصل معنا قبل تأكيد الطلب.':'Review the size, product, and details carefully when ordering. If anything needs changing, contact us before confirmation.',
    'للاستفسار عن حالة الاستبدال أو الاسترجاع، تواصل معنا مباشرة على 01014158303 مع رقم الطلب.':'For exchange or return inquiries, contact us directly at 01014158303 with your order number.',
    'بياناتك عندنا':'Your data with us',
    'كتالوج يانسن وإنجلندر':'Janssen & Englander Catalog',
    'كل المنتجات':'All products',
    'اختار الشركة، ابحث باسم المنتج، أو فلتر حسب النوع والسعر.':'Choose a brand, search by product name, or filter by type and price.',
    'منتج من البراندين':'Products from both brands',
    'كل الأنواع':'All types',
    'الترتيب الافتراضي':'Default order',
    'السعر: من الأقل':'Price: low to high',
    'السعر: من الأعلى':'Price: high to low',
    'الاسم':'Name',
    'مراتب يانسن مدينة نصر — راحتك تستحق الاختيار الصح.':'Janssen Mattresses Nasr City — Your comfort deserves the right choice.',
    'شروط':'Terms',
    'سياسة الخصوصية':'Privacy Policy',
    'الأسئلة الشائعة':'FAQ',
    'فروعنا في مدينة نصر':'Our location in Nasr City',
    'عندنا فرعين، والتوصيل متاح للقاهرة والجيزة فقط.':'Our location is in Nasr City, and delivery is available in Cairo and Giza only.',
    'مدينة نصر':'Nasr City',
    'خلف طيبة مول':'Next to Tiba Mall',
    'موقع الفرع الأول على الخريطة':'Open location on the map',
    'موقع الفرع الثاني على الخريطة':'Open location on the map',
    'الصفحة الرئيسية':'Home page',
    'روابط':'Links',
    'مستنيينك':'We are here for you',
    'موقع الفرع':'Location'
  });

  const FRAGMENTS=[
    ['مرتبة طبيبة','Medical mattress'],['مرتبة طبية','Medical mattress'],['سوست منفصلة','Pocket Springs'],['سوست متصلة','Connected Springs'],['بدون سوست','Springless'],['إكسسوارات النوم','Sleep accessories'],['مراتب تطرية','Mattress Toppers'],['وسائد','Pillows'],['ألحفة','Quilts'],['واقيات مراتب','Mattress Protectors'],['سوستة/م²','springs/m²'],['سوستة','spring'],['سوست','springs'],['طبقة إسفنج','foam layer'],['إسفنج يانسن','Janssen foam'],['إسفنج','foam'],['كثافة','density'],['قطن','cotton'],['لباد قطن','cotton felt'],['الوجهين','both sides'],['وجه واحد','one side'],['تستخدم من الوجهين','double-sided use'],['تستخدم من وجه واحد','one-sided use'],['ميموري فوم','memory foam'],['ريبوند','rebound foam'],['بلاتكس طبيعي','natural latex'],['قماش','fabric'],['المقاسات المتاحة','available sizes'],['المقاس المختار','selected size'],['حسب المقاس','by size'],['حسب العرض','by width'],['السعر','price'],['المنتج اتضاف','Product added'],['صورة مراجعة العميل','Customer review photo'],['صورة من مراجعة عميل','Customer review photo'],['صورة المراجعة','Review photo'],['اسم العميل','Customer name'],['عدد المراجعات','review count'],['الطلب','order'],['طلب','order'],['الكمية','quantity'],['حذف','Delete'],['إضافة','Add'],['تحميل','Upload'],['جاري','Processing'],['من الأعلى','high to low'],['من الأقل','low to high'],['افتراضي','Default'],['عرض التفاصيل','View details'],['المنتجات','products'],['منتجين','products'],['براند','brand'],['البراند','brand'],['سم','cm'],['جنيه','EGP'],['يتغير','changes'],['يغير','changes'],['الطول','Length'],['العرض','Width'],['الارتفاع','Height'],['النوع','Type'],['المقاس','Size'],['المواصفات الرسمية','Official specifications'],['مقاسات','sizes'],['مراجعة','review'],['مراجعات','reviews'],['مقاس واحد','One size'],['يانسن','Janssen'],['إنجلندر','Englander'],['انجلندر','Englander']
  ];
  FRAGMENTS.sort((a,b)=>b[0].length-a[0].length);

  const ATTRS=['placeholder','aria-label','title','alt','content'];
  let lang=initial;
  let observer=null;

  function arToEnDigits(s){return s.replace(/[٠-٩]/g,c=>'٠١٢٣٤٥٦٧٨٩'.indexOf(c));}
  function translateString(value){
    if(lang==='ar') return value;
    if(!value) return value;
    let s=value;
    if(Object.prototype.hasOwnProperty.call(MAP,s)) return MAP[s];
    if(Object.prototype.hasOwnProperty.call(PRODUCT_NAMES,s)) return PRODUCT_NAMES[s];
    for(const [a,b] of Object.entries(PRODUCT_NAMES)) if(s.includes(a)) s=s.split(a).join(b);
    for(const [a,b] of Object.entries(MAP)) if(a.length>2 && s.includes(a)) s=s.split(a).join(b);
    for(const [a,b] of FRAGMENTS) if(s.includes(a)) s=s.split(a).join(b);
    return arToEnDigits(s);
  }

  let isApplying=false;

  function shouldSkipTextNode(n){
    const p=n && n.parentElement;
    return !p || ['SCRIPT','STYLE','NOSCRIPT'].includes(p.tagName) || !String(n.nodeValue||'').trim();
  }

  function translateElement(el){
    if(!el || el.nodeType!==1) return;
    const walker=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);
    const nodes=[];
    while(walker.nextNode()){
      const n=walker.currentNode;
      if(!shouldSkipTextNode(n)) nodes.push(n);
    }
    nodes.forEach(n=>{
      const old=n.nodeValue;
      const next=translateString(old);
      if(next!==old) n.nodeValue=next;
    });

    ATTRS.forEach(attr=>{
      if(el.hasAttribute && el.hasAttribute(attr)){
        const old=el.getAttribute(attr), next=translateString(old);
        if(next!==old) el.setAttribute(attr,next);
      }
    });
    if(el.children){
      Array.from(el.children).forEach(child=>translateElement(child));
    }
  }

  function applyLanguage(){
    if(isApplying) return;
    isApplying=true;
    try{
      document.documentElement.lang=lang;
      document.documentElement.dir=lang==='en'?'ltr':'rtl';
      document.body?.setAttribute('data-language',lang);
      document.body?.classList.toggle('is-english',lang==='en');

      // The page reloads when switching languages, so Arabic is already the source text.
      // In English mode translate the existing document once.
      if(lang==='en'){
        const root=document.body||document;
        const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
        const nodes=[];
        while(walker.nextNode()){
          const n=walker.currentNode;
          if(!shouldSkipTextNode(n)) nodes.push(n);
        }
        nodes.forEach(n=>{
          const old=n.nodeValue;
          const next=translateString(old);
          if(next!==old) n.nodeValue=next;
        });

        document.querySelectorAll('*').forEach(el=>{
          ATTRS.forEach(attr=>{
            if(el.hasAttribute(attr)){
              const old=el.getAttribute(attr), next=translateString(old);
              if(next!==old) el.setAttribute(attr,next);
            }
          });
        });
      }

      const title=document.querySelector('title');
      if(title && lang==='en') document.title=translateString(title.textContent||document.title);

      let switcher=document.querySelector('.lang-switch');
      if(!switcher){
        switcher=document.createElement('button');
        switcher.className='lang-switch';
        switcher.type='button';
        switcher.addEventListener('click',()=>setLanguage(lang==='ar'?'en':'ar'));
        const holder=document.querySelector('.nav-actions')||document.querySelector('.nav-inner')||document.body;
        holder.appendChild(switcher);
      }
      switcher.textContent=lang==='ar'?'English':'العربية';
      switcher.setAttribute('aria-label',lang==='ar'?'Switch to English':'التبديل إلى العربية');
      switcher.title=lang==='ar'?'Switch to English':'التبديل إلى العربية';
    } finally {
      isApplying=false;
    }
  }

  function setLanguage(next){
    lang=next==='en'?'en':'ar';
    localStorage.setItem(STORAGE_KEY,lang);
    location.reload();
  }

  window.STORE_I18N={
    getLanguage:()=>lang,
    setLanguage,
    translate:translateString,
    money:(n)=>{
      const num=Number(n)||0;
      return lang==='en' ? new Intl.NumberFormat('en-US',{maximumFractionDigits:2}).format(num)+' EGP' : new Intl.NumberFormat('ar-EG',{maximumFractionDigits:2}).format(num)+' جنيه';
    },
    productName:(name)=>PRODUCT_NAMES[name]||translateString(name)
  };

  function boot(){
    document.documentElement.lang=lang;
    document.documentElement.dir=lang==='en'?'ltr':'rtl';
    applyLanguage();
    if(observer)observer.disconnect();
    observer=new MutationObserver(records=>{
      if(lang!=='en' || isApplying) return;
      isApplying=true;
      try{
        for(const record of records){
          if(record.type==='characterData'){
            const n=record.target;
            if(!shouldSkipTextNode(n)){
              const old=n.nodeValue;
              const next=translateString(old);
              if(next!==old) n.nodeValue=next;
            }
          }else if(record.type==='childList'){
            record.addedNodes.forEach(node=>{
              if(node.nodeType===1) translateElement(node);
              else if(node.nodeType===3 && !shouldSkipTextNode(node)){
                const old=node.nodeValue;
                const next=translateString(old);
                if(next!==old) node.nodeValue=next;
              }
            });
          }
        }
      } finally {
        isApplying=false;
      }
    });
    observer.observe(document.body,{subtree:true,childList:true,characterData:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot,{once:true}); else boot();
})();
