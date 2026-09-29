(function(){
'use strict';
const products=window.STORE_PRODUCTS||[];
const key='store_compare';
const money=n=>new Intl.NumberFormat('ar-EG',{maximumFractionDigits:2}).format(Number(n)||0)+' جنيه';
const get=()=>{try{return JSON.parse(localStorage.getItem(key)||'[]')}catch{return[]}};
const set=a=>localStorage.setItem(key,JSON.stringify(a));
const root=document.getElementById('compareRoot');
const toolbar=document.getElementById('compareToolbar');
const asset=u=>{if(!u)return '';if(/^https?:\/\//i.test(u)||u.startsWith('../')||u.startsWith('./')||u.startsWith('/'))return u;return '../'+u};
const fallback=p=>asset(p.fallbackImage||'assets/images/mattress-placeholder.svg');
function selected(){return get().map(id=>products.find(p=>p.id===id)).filter(Boolean)}
function availableWidths(ps){let widths=null;ps.forEach(p=>{if(p.sizeMode==='width'){const a=(p.sizes||[]).map(String);widths=widths===null?a:widths.filter(x=>a.includes(x));}});return widths&&widths.length?widths:(ps.find(p=>p.sizeMode==='width')?.sizes||[]).map(String)}
function priceFor(p,width){if(p.sizeMode==='width')return Number(p.pricesByWidth?.[width]??p.price)||0;if(p.sizeMode==='full')return Number(p.pricesBySize?.[p.sizes?.[0]]??p.price)||0;return Number(p.price)||0}
function row(label,values,cls=''){return '<div class="compare-row '+cls+'"><div class="compare-label">'+label+'</div>'+values.map(v=>'<div class="compare-cell">'+v+'</div>').join('')+'</div>'}
function render(){
  const ps=selected();
  if(!ps.length){toolbar.innerHTML='';root.innerHTML='<div class="compare-empty"><h2>المقارنة فاضية</h2><p>اختار منتجات من الكتالوج واضغط «قارن» لإضافتها هنا.</p><a class="btn btn-primary" href="./products.html?brand=all">عرض كل المنتجات</a></div>';return;}
  const widths=availableWidths(ps);let chosen=widths[0]||'';
  toolbar.innerHTML='<div class="compare-toolbar-inner"><div><strong>'+ps.length+' منتجات في المقارنة</strong><span>تقدر تقارن حتى 4 منتجات</span></div>'+(widths.length?'<label>العرض للمقارنة <select id="compareWidth">'+widths.map(w=>'<option value="'+w+'">'+w+' سم</option>').join('')+'</select></label>':'')+'<button class="compare-clear" type="button">مسح المقارنة</button></div>';
  const widthEl=document.getElementById('compareWidth');
  if(widthEl)widthEl.onchange=()=>{chosen=widthEl.value;draw()};
  toolbar.querySelector('.compare-clear').onclick=()=>{set([]);render()};
  function draw(){
    const selectedWidth=widthEl?.value||chosen;
    const header=ps.map(p=>'<div class="compare-head-product"><span class="catalog-brand '+(p.brandKey||'')+'">'+(p.brand||'')+'</span><h3>'+p.name+'</h3><img src="'+asset(p.image)+'" alt="'+p.name+'" onerror="this.onerror=null;this.src=\''+fallback(p)+'\'"><button type="button" data-remove="'+p.id+'">إزالة</button></div>').join('');
    const actions=ps.map(p=>'<div class="compare-cell"><a class="btn btn-primary small" href="./product.html?id='+encodeURIComponent(p.id)+'">تفاصيل المنتج</a><button class="compare-remove-btn" data-remove="'+p.id+'">إزالة من المقارنة</button></div>').join('');
    root.innerHTML='<div class="compare-table"><div class="compare-head"><div class="compare-label">المنتج</div>'+header+'</div>'+row('السعر عند العرض المحدد',ps.map(p=>'<strong class="compare-price">'+money(priceFor(p,selectedWidth))+'</strong>'))+row('الشركة',ps.map(p=>p.brand||'—'))+row('الفئة',ps.map(p=>p.subCategory||p.category||'—'))+row('الارتفاع',ps.map(p=>p.height||'—'))+row('العروض المتاحة',ps.map(p=>p.sizeMode==='width'?(p.sizes||[]).join(' / ')+' سم':(p.sizes||[]).join(' ، ')))+row('الأطوال المتاحة',ps.map(p=>p.lengths?.length?(p.lengths.join(' / ')+' سم'):'—'))+row('المواصفات',ps.map(p=>'<div class="compare-specs">'+(p.officialSpecs||'—')+'</div>'))+'<div class="compare-row compare-actions"><div class="compare-label"></div>'+actions+'</div></div>';
    root.querySelectorAll('[data-remove]').forEach(b=>b.onclick=()=>{set(get().filter(id=>id!==b.dataset.remove));render()});
  }
  draw();
}
render();
})();
