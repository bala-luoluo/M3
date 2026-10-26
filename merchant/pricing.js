(()=>{
const panel=document.createElement('section');panel.className='pricing-page';panel.hidden=true;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){const plans=PlanStore.read().filter(p=>p.status==='启用').sort((a,b)=>a.sort-b.sort);
panel.innerHTML=`<h2>防护套餐体系</h2><p class="pricing-subtitle">请根据您APP的具体需求选择适合的套餐</p><div class="pricing-grid">${plans.map((p,i)=>{const items=[`防护周期：${p.days===0?'永久':p.days+'天'}`,`流量包(${p.trafficDays}天)：${p.traffic?('赠送'+p.traffic+' GB'):'不赠送流量'}，可选套餐外付费`,'可推送APK到业务场景，自行分发下载',`渠道包：默认${p.channels}个`,...p.features.split('\n').filter(Boolean),p.description].filter(Boolean);return `<article class="pricing-card"><h3>${esc(p.name)}</h3><div class="pricing-price">${(p.price/100).toFixed(2)} <small>U</small><img src="assets/message-circle-more.svg" alt="">${p.recommended?'<span>推荐</span>':''}</div><div class="pricing-features"><h4>套餐选项</h4><ul>${items.map(t=>`<li>${esc(t)}</li>`).join('')}</ul></div><div class="pricing-actions"><button class="btn primary" data-pricing-doc="${i}">接入文档</button><button class="btn pricing-open" data-pricing-open="${i}">开通防护</button></div></article>`}).join('')||'<p>暂无可用套餐，请联系管理员。</p>'}</div><p class="pricing-note">套餐由本地后台配置，初始 0 U 为待配置演示值。开通按钮进入本地 APP 创建演示。</p>`;
panel.querySelectorAll('[data-pricing-open]').forEach(b=>b.onclick=()=>{document.querySelector('aside [data-page="APP列表"]').click();document.getElementById('upload').click()});panel.querySelectorAll('[data-pricing-doc]').forEach(b=>b.onclick=()=>toast(plans[Number(b.dataset.pricingDoc)].name+'：接入文档内容尚未提供，待补充'));
}
document.querySelector('main').append(panel);
function show(p){render();document.querySelectorAll('main>section').forEach(s=>s.hidden=s!==panel);document.querySelectorAll('[data-page]').forEach(b=>b.classList.toggle('active',b.dataset.page===p));history.replaceState(null,'','#/preview/'+encodeURIComponent(p))}
document.addEventListener('click',e=>{const b=e.target.closest('[data-page]');if(!b)return;if(['价格&文档','防护套餐'].includes(b.dataset.page)){e.preventDefault();e.stopImmediatePropagation();show(b.dataset.page)}else panel.hidden=true},true);
window.addEventListener('storage',e=>{if(e.key===PlanStore.key)render()});window.addEventListener('focus',()=>{if(!panel.hidden)render()});
let p;try{p=decodeURIComponent(location.hash.split('/preview/')[1]||'')}catch{}if(['价格&文档','防护套餐'].includes(p))show(p);
})();
