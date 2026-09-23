(function(){
  'use strict';
  const WHATSAPP='201014158303';
  const $=s=>document.querySelector(s);
  const menuBtn=$('[data-menu]'), mobileMenu=$('.mobile-menu'), closeMenu=$('[data-close-menu]');
  if(menuBtn&&mobileMenu) menuBtn.addEventListener('click',()=>mobileMenu.classList.add('open'));
  if(closeMenu&&mobileMenu) closeMenu.addEventListener('click',()=>mobileMenu.classList.remove('open'));
  mobileMenu?.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobileMenu.classList.remove('open')));
  const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

  const scene=$('#mattressScene'), object=$('#hero3dObject');
  if(scene&&object){
    let dragging=false,lastX=0,lastY=0,rotY=-12,rotX=7;
    const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
    const apply=()=>{object.style.transform=`perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.04)`};
    object.classList.add('auto-orbit');
    scene.addEventListener('pointerdown',e=>{
      if(e.target.closest('#heroReset'))return;
      dragging=true;lastX=e.clientX;lastY=e.clientY;
      object.classList.remove('auto-orbit');object.classList.add('user-controlled');
      scene.setPointerCapture?.(e.pointerId);scene.classList.add('dragging');
    });
    scene.addEventListener('pointermove',e=>{
      if(!dragging)return;
      const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;
      rotY+=dx*.75;rotX=clamp(rotX-dy*.55,-58,58);apply();
    });
    const end=()=>{dragging=false;scene.classList.remove('dragging')};
    scene.addEventListener('pointerup',end);scene.addEventListener('pointercancel',end);scene.addEventListener('lostpointercapture',end);
    scene.addEventListener('wheel',e=>{e.preventDefault();object.classList.remove('auto-orbit');object.classList.add('user-controlled');rotY+=e.deltaX*.25+e.deltaY*.12;rotX=clamp(rotX-e.deltaY*.04,-58,58);apply()},{passive:false});
    const reset=$('#heroReset');
    if(reset){
      reset.addEventListener('pointerdown',e=>e.stopPropagation());
      reset.addEventListener('click',e=>{
        e.preventDefault();e.stopPropagation();rotY=-12;rotX=7;object.style.transform='';object.classList.remove('user-controlled');object.classList.add('auto-orbit');
      });
    }
  }
  async function loadHomeReviews(){
    const box=document.querySelector('#homeReviewsList'); if(!box||!window.JANSSEN_REVIEWS)return;
    const reviews=await window.JANSSEN_REVIEWS.approved();
    if(!reviews.length){box.innerHTML='<div class="home-review-empty">لسه مفيش مراجعات منشورة. كن أول واحد يشارك تجربته.</div>';return;}
    box.innerHTML=reviews.slice(0,6).map(r=>`<article class="home-review-card"><div class="stars">${'★'.repeat(Math.max(1,Math.min(5,Number(r.rating||5))))}</div><strong>${r.name||'عميل'}</strong><span>${r.product||''}</span><p>${r.text||''}</p>${r.photoUrl?`<a class="review-photo-link" href="#"><img data-review-photo data-image="${window.JANSSEN_REVIEWS.imageUrl(r.photoUrl)}" data-open="${window.JANSSEN_REVIEWS.imageOpenUrl(r.photoUrl)}" data-fallback="${window.JANSSEN_REVIEWS.imageFallbackUrl(r.photoUrl)}" src="${window.JANSSEN_REVIEWS.imageUrl(r.photoUrl)}" alt="صورة من مراجعة عميل" loading="lazy"></a>`:''}</article>`).join('');
    window.JANSSEN_REVIEWS.attachImageClick(box);
  }
  loadHomeReviews();
  function updateCartCount(){const cart=JSON.parse(localStorage.getItem('janssen_cart')||'[]');document.querySelectorAll('.cart-count').forEach(el=>el.textContent=cart.reduce((n,i)=>n+i.qty,0));}
  updateCartCount();
  document.querySelectorAll('[data-whatsapp]').forEach(btn=>btn.addEventListener('click',e=>{e.preventDefault();window.open('https://wa.me/'+WHATSAPP+'?text='+encodeURIComponent('مرحبًا، أريد الاستفسار عن مراتب يانسن.'),'_blank')}));
})();