(function(){
  'use strict';
  const API_URL='https://script.google.com/macros/s/AKfycbw4b8TyQlShSQJ72xL_dPoklH7gp65D2yQBRV9Jt5BMLfW76d9yDwTeLM2LeXHJQp0Jdg/exec';
  const localKey='janssen_reviews';
  const moneyDate=()=>new Date().toLocaleDateString('ar-EG');
  function getLocal(){try{return JSON.parse(localStorage.getItem(localKey)||'[]')}catch{return[]}}
  function extractDriveId(url){
    if(!url)return '';
    const u=String(url);
    const m=u.match(/(?:drive\.google\.com\/(?:file\/d\/|open\?id=|uc\?(?:[^#]*&)?id=)|drive\.usercontent\.google\.com\/(?:download\?|thumbnail\?)[^#]*id=)([A-Za-z0-9_-]+)/i);
    return m ? m[1] : '';
  }
  function imageUrl(url){
    const id=extractDriveId(url);
    // Drive's thumbnail endpoint is much more reliable for public image previews
    // than uc?export=view, especially when the site is hosted on GitHub Pages.
    return id ? 'https://drive.google.com/thumbnail?id='+encodeURIComponent(id)+'&sz=w1200' : String(url||'');
  }
  function imageFallbackUrl(url){
    const id=extractDriveId(url);
    return id ? 'https://lh3.googleusercontent.com/d/'+encodeURIComponent(id)+'=w1200' : String(url||'');
  }
  function imageOpenUrl(url){
    const id=extractDriveId(url);
    return id ? 'https://drive.google.com/file/d/'+id+'/view' : String(url||'');
  }
  function bindImageViewer(){
    if(document.getElementById('reviewImageViewer'))return;
    const wrap=document.createElement('div');
    wrap.id='reviewImageViewer';
    wrap.innerHTML='<div class="review-image-backdrop" data-close-review-image></div><div class="review-image-dialog" role="dialog" aria-modal="true"><button type="button" class="review-image-close" data-close-review-image aria-label="إغلاق">×</button><img id="reviewImageViewerImg" alt="صورة مراجعة العميل"></div>';
    document.body.appendChild(wrap);
    wrap.querySelectorAll('[data-close-review-image]').forEach(x=>x.addEventListener('click',()=>wrap.classList.remove('open')));
    document.addEventListener('keydown',e=>{if(e.key==='Escape')wrap.classList.remove('open')});
  }
  function attachImageClick(root=document){
    bindImageViewer();
    root.querySelectorAll('[data-review-photo]').forEach(img=>{
      if(img.dataset.bound)return;
      img.dataset.bound='1';
      img.style.cursor='zoom-in';
      // If Drive blocks the first thumbnail request, immediately try a second
      // public Google image endpoint so the thumbnail itself does not stay broken.
      img.onerror=()=>{
        const fallback=img.dataset.fallback||'';
        if(fallback && img.src!==fallback){
          img.src=fallback;
        }
      };
      img.addEventListener('click',(e)=>{
        e.preventDefault();
        e.stopPropagation();
        const viewer=document.getElementById('reviewImageViewer');
        const big=document.getElementById('reviewImageViewerImg');
        big.src=img.dataset.image||img.src;
        big.onerror=()=>{
          const fallback=img.dataset.fallback||'';
          if(fallback && big.src!==fallback){big.src=fallback;}
        };
        viewer.classList.add('open');
      });
    });
  }
  function saveLocal(a){localStorage.setItem(localKey,JSON.stringify(a))}
  function compressImage(file,max=1000,quality=.72){return new Promise((resolve,reject)=>{if(!file){resolve(null);return}const r=new FileReader();r.onload=()=>{const img=new Image();img.onload=()=>{const scale=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.width*scale));c.height=Math.max(1,Math.round(img.height*scale));const ctx=c.getContext('2d');ctx.drawImage(img,0,0,c.width,c.height);resolve({data:c.toDataURL('image/jpeg',quality),name:'review-'+Date.now()+'.jpg'});};img.onerror=reject;img.src=r.result};r.onerror=reject;r.readAsDataURL(file)})}
  async function submit(review, file){
    const photo=await compressImage(file);
    const local=getLocal();
    const record={id:'REV-'+Date.now(),productId:review.productId,product:review.product,name:review.name,rating:Number(review.rating||5),text:review.text,date:moneyDate(),photoUrl:'',status:'New'};
    local.unshift(record);saveLocal(local);
    const form=new URLSearchParams();
    form.set('action','review');form.set('productId',review.productId||'');form.set('product',review.product||'');form.set('name',review.name||'');form.set('rating',String(review.rating||5));form.set('text',review.text||'');
    if(photo){form.set('photoData',photo.data);form.set('photoName',photo.name)}
    try{await fetch(API_URL,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:form.toString()});}catch(e){}
    return record;
  }
  async function approved(){
    try{const r=await fetch(API_URL+'?action=reviews',{cache:'no-store'});const j=await r.json();if(j&&j.success&&Array.isArray(j.reviews))return j.reviews;}catch(e){}
    return getLocal().filter(x=>x.status==='Approved');
  }
  window.JANSSEN_REVIEWS={submit,approved,getLocal,imageUrl,imageFallbackUrl,imageOpenUrl,attachImageClick};
})();
