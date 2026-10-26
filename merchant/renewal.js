(()=>{
const dialog=document.createElement('dialog');dialog.className='renewal-dialog';dialog.setAttribute('aria-labelledby','renewal-title');
dialog.innerHTML=`<div class="renewal-head"><strong id="renewal-title">ⓘ 自动续费规则</strong><div><button type="button" data-expand aria-label="最大化自动续费规则">⛶</button><button type="button" data-close aria-label="关闭自动续费规则">×</button></div></div><div class="renewal-body"><p>1、自动续费将于服务到期前3天开始扣款，请保证账户余额充足；</p><p>2、每次续费系统将自动续费套餐30天时长；</p><p>3、流量包将根据到期时间续费当前选项；</p><p>4、如您在扣款前人工续费，则系统按最新到期时间自动进行续费；</p><p>5、系统将于每日22:00:00自动检测。</p></div>`;
document.body.append(dialog);let previous;
document.getElementById('renew').onclick=()=>{previous=document.activeElement;dialog.showModal()};
dialog.querySelector('[data-close]').onclick=()=>dialog.close();
dialog.addEventListener('close',()=>{dialog.classList.remove('expanded');previous?.focus()});
dialog.querySelector('[data-expand]').onclick=()=>{const expanded=dialog.classList.toggle('expanded');dialog.querySelector('[data-expand]').setAttribute('aria-label',expanded?'还原自动续费规则':'最大化自动续费规则')};
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
})();
