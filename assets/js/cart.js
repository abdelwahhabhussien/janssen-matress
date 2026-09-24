(function(){
  const key='janssen_cart';
  const API_URL='https://script.google.com/macros/s/AKfycbw4b8TyQlShSQJ72xL_dPoklH7gp65D2yQBRV9Jt5BMLfW76d9yDwTeLM2LeXHJQp0Jdg/exec';
  const products=window.JANSSEN_PRODUCTS||[];
  const root=document.getElementById('cartItems');
  const recommendationRoot=document.getElementById('cartRecommendation');
  // Change this ID whenever you want to control the featured upsell product.
  const RECOMMENDATION_PRODUCT_ID='extra-gold';
  const money=n=>new Intl.NumberFormat('ar-EG').format(Number(n)||0)+' جنيه';
  const get=()=>JSON.parse(localStorage.getItem(key)||'[]');
  const save=c=>{localStorage.setItem(key,JSON.stringify(c));render();updateCount();};
  const updateCount=()=>document.querySelectorAll('.cart-count').forEach(x=>x.textContent=get().reduce((n,i)=>n+Number(i.qty||0),0));
  function currentTotal(){return get().reduce((t,i)=>t+(Number(i.price)||0)*(Number(i.qty)||0),0);}
  function selectedPayment(){return document.querySelector('input[name="payment"]:checked')?.value||'Cash on Delivery';}

  function normalizePhone(value){
    let v=String(value||'').trim().replace(/[\s\-()]/g,'');
    const arabic={'٠':'0','١':'1','٢':'2','٣':'3','٤':'4','٥':'5','٦':'6','٧':'7','٨':'8','٩':'9'};
    v=v.replace(/[٠-٩]/g,c=>arabic[c]);
    if(v.startsWith('+20')) v='0'+v.slice(3);
    if(v.startsWith('20')&&v.length===12) v='0'+v.slice(2);
    return v.replace(/\D/g,'').slice(0,11);
  }
  function validPhone(v){return /^(010|011|012|015)\d{8}$/.test(v);}

  function productImageUrl(p){
    if(!p?.image) return '';
    const u=String(p.image);
    if(/^https?:\/\//i.test(u)||u.startsWith('../')||u.startsWith('./')||u.startsWith('/')) return u;
    return '../'+u;
  }

  function renderRecommendation(cart){
    if(!recommendationRoot) return;
    if(!cart.length){ recommendationRoot.innerHTML=''; return; }

    let p=products.find(x=>x.id===RECOMMENDATION_PRODUCT_ID && !cart.some(i=>i.id===x.id));
    if(!p) p=products.find(x=>!cart.some(i=>i.id===x.id));
    if(!p){ recommendationRoot.innerHTML=''; return; }

    const width=String(p.sizes?.[0]||'');
    const length=String(p.lengths?.[0]||'');
    const price=Number(p.pricesByWidth?.[width]??p.price)||0;
    recommendationRoot.innerHTML=`<section class="cart-recommendation" aria-label="اقتراح إضافي">
      <div class="recommendation-copy"><span class="section-kicker">اقتراح لك</span><h2>قد يناسبك أيضًا</h2><p>ممكن تضيف المنتج ده لطلبك قبل تأكيد الشراء.</p></div>
      <div class="recommendation-card">
        <img src="${productImageUrl(p)}" alt="${p.name}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${p.fallbackImage?.startsWith('assets/')?'../'+p.fallbackImage:(p.fallbackImage||'../assets/images/mattress-placeholder.svg')}'">
        <div class="recommendation-info"><h3>${p.name}</h3><span>عرض ${width} سم • متاح كل المقاسات</span><strong>${money(price)}</strong></div>
        <div class="recommendation-actions">
          <button type="button" class="btn btn-primary" data-recommend-add>إضافة للسلة</button>
          <button type="button" class="recommendation-dismiss" data-recommend-dismiss>لا، شكرًا</button>
        </div>
      </div>
    </section>`;

    recommendationRoot.querySelector('[data-recommend-dismiss]')?.addEventListener('click',()=>{
      recommendationRoot.innerHTML='';
    });
    recommendationRoot.querySelector('[data-recommend-add]')?.addEventListener('click',()=>{
      const c=get();
      const key=p.id+'-'+width+'-'+length;
      const existing=c.find(i=>i.key===key);
      if(existing) existing.qty++;
      else c.push({key,id:p.id,name:p.name,width,length,price,qty:1});
      save(c);
      recommendationRoot.innerHTML=`<div class="recommendation-added">✓ تمت إضافة <strong>${p.name}</strong> إلى السلة.</div>`;
      setTimeout(()=>renderRecommendation(get()),1200);
    });
  }

  function render(){
    const cart=get();
    if(!cart.length){
      root.innerHTML='<div class="empty-cart"><h2>السلة فاضية</h2><p>اختار مرتبة ومقاس من الكتالوج وأضفها للسلة.</p><a class="btn btn-primary" href="./products.html">شوف المراتب</a></div>';
      document.getElementById('cartTotal').textContent='0 جنيه';
      renderRecommendation([]);
      return;
    }
    let total=0;
    root.innerHTML='<div class="cart-list">'+cart.map((i,idx)=>{const p=products.find(x=>x.id===i.id);const sub=(Number(i.price)||0)*(Number(i.qty)||0);total+=sub;return `<div class="cart-item"><img src="${productImageUrl(p)}" alt="${i.name||p?.name||''}" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src='${p?.fallbackImage?.startsWith('assets/')?'../'+p.fallbackImage:(p?.fallbackImage||'../assets/images/mattress-placeholder.svg')}'"><div><h3>${i.name||p?.name||''}</h3><div class="cart-meta">العرض: ${i.width} سم × الطول: ${i.length} سم<br>سعر الوحدة: ${money(i.price)}</div><div class="cart-price">${money(sub)}</div></div><div class="cart-side"><div class="qty"><button type="button" data-minus="${idx}">−</button><span>${i.qty}</span><button type="button" data-plus="${idx}">+</button></div><button type="button" class="remove" data-remove="${idx}">حذف</button></div></div>`}).join('')+'</div>';
    document.getElementById('cartTotal').textContent=money(total);
    document.getElementById('transferAmount').textContent=money(total);
    root.querySelectorAll('[data-minus]').forEach(b=>b.onclick=()=>{const c=get(),i=+b.dataset.minus;c[i].qty=Math.max(1,Number(c[i].qty)-1);save(c);syncPayment();});
    root.querySelectorAll('[data-plus]').forEach(b=>b.onclick=()=>{const c=get(),i=+b.dataset.plus;c[i].qty=Number(c[i].qty)+1;save(c);syncPayment();});
    root.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{const c=get();c.splice(+b.dataset.remove,1);save(c);syncPayment();});
    renderRecommendation(cart);
  }

  function syncPayment(){
    const isTransfer=selectedPayment()!=='Cash on Delivery';
    const box=document.getElementById('transferInfo');
    box.hidden=!isTransfer;
    document.getElementById('paymentScreenshot').required=isTransfer;
    document.getElementById('transferAmount').textContent=money(currentTotal());
  }

  async function compressImage(file){
    if(!file)return null;
    const dataUrl=await new Promise((resolve,reject)=>{const r=new FileReader();r.onload=()=>resolve(r.result);r.onerror=reject;r.readAsDataURL(file);});
    const img=await new Promise((resolve,reject)=>{const i=new Image();i.onload=()=>resolve(i);i.onerror=reject;i.src=dataUrl;});
    const max=1400, scale=Math.min(1,max/Math.max(img.width,img.height));
    const canvas=document.createElement('canvas');canvas.width=Math.max(1,Math.round(img.width*scale));canvas.height=Math.max(1,Math.round(img.height*scale));
    const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0,canvas.width,canvas.height);
    return {data:canvas.toDataURL('image/jpeg',0.78),name:'payment-proof.jpg'};
  }

  // Generate the Order ID in the browser so checkout does not depend on a
  // cross-origin JSONP request. The same ID is sent to Apps Script and shown
  // to the customer, so the Sheet and confirmation page always match.
  function reserveOrderId(){
    // Generate the exact ID that is sent to Apps Script and shown to the customer.
    // Use timestamp + random suffix to avoid collisions across devices.
    const now=Date.now().toString();
    const random=Math.floor(100+Math.random()*900).toString();
    return 'JAN-'+now+random;
  }

  const phoneInput=document.getElementById('customerPhone');
  phoneInput?.addEventListener('input',()=>{phoneInput.value=normalizePhone(phoneInput.value);phoneInput.setCustomValidity(validPhone(phoneInput.value)?'':'رقم الهاتف لازم يكون رقم مصري صحيح من 11 رقم ويبدأ بـ 010 أو 011 أو 012 أو 015.');});

  document.querySelectorAll('input[name="payment"]').forEach(r=>r.addEventListener('change',syncPayment));
  document.getElementById('copyPaymentNumber')?.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('01014158303');const b=document.getElementById('copyPaymentNumber');const old=b.textContent;b.textContent='تم النسخ ✓';setTimeout(()=>b.textContent=old,1200);}catch(e){}});

  document.getElementById('sendOrder').onclick=async()=>{
    const cart=get();
    if(!cart.length){alert('السلة فاضية');return;}
    const name=document.getElementById('customerName').value.trim();
    const phone=normalizePhone(document.getElementById('customerPhone').value);
    const address=document.getElementById('customerAddress').value.trim();
    const notes=document.getElementById('customerNotes').value.trim();
    const payment=selectedPayment();
    const file=document.getElementById('paymentScreenshot').files[0];
    const phoneField=document.getElementById('customerPhone');
    phoneField.value=phone;

    if(!name||!address){alert('اكتب الاسم والعنوان أولاً');return;}
    if(!validPhone(phone)){
      phoneField.setCustomValidity('رقم الهاتف لازم يكون رقم مصري صحيح من 11 رقم ويبدأ بـ 010 أو 011 أو 012 أو 015.');
      phoneField.reportValidity();
      return;
    }
    if(payment!=='Cash on Delivery'&&!file){alert('ارفع Screenshot للتحويل قبل إرسال الطلب');return;}

    const btn=document.getElementById('sendOrder');
    const status=document.getElementById('submitStatus');
    btn.disabled=true;btn.textContent='جاري إرسال الطلب...';status.textContent='جاري إنشاء رقم الطلب وحفظ البيانات...';

    try{
      const orderId=reserveOrderId();
      const screenshot=payment==='Cash on Delivery'?null:await compressImage(file);
      const payload={customer:name,phone,address,notes,payment,orderId,items:cart.map(i=>({product:i.name,width:i.width,length:i.length,qty:Number(i.qty),total:(Number(i.price)||0)*Number(i.qty)})),total:currentTotal()};
      const form=new URLSearchParams();
      form.set('customer',payload.customer);form.set('phone',payload.phone);form.set('address',payload.address);form.set('notes',payload.notes);form.set('payment',payload.payment);form.set('orderId',payload.orderId);form.set('items',JSON.stringify(payload.items));form.set('total',String(payload.total));
      if(screenshot){form.set('screenshotData',screenshot.data);form.set('screenshotName',screenshot.name);}
      await fetch(API_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:form.toString()});

      localStorage.removeItem(key);updateCount();
      document.getElementById('successOrderId').textContent=orderId;
      document.getElementById('orderSuccess').hidden=false;
      document.getElementById('checkoutArea').hidden=true;
      window.scrollTo({top:0,behavior:'smooth'});
    }catch(err){
      console.error(err);status.textContent='حصلت مشكلة أثناء الإرسال. حاول مرة أخرى.';btn.disabled=false;btn.textContent='تأكيد وإرسال الطلب';alert(err.message||'حصلت مشكلة أثناء إرسال الطلب.');
    }
  };

  render();updateCount();syncPayment();
})();
