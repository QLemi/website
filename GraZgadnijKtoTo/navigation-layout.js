const nav=document.querySelector('.preview-nav');
const opener=document.querySelector('.menu-open');
const closer=document.querySelector('.nav-close');
const backdrop=document.querySelector('.nav-backdrop');
const pin=document.querySelector('.nav-pin');
function setMenu(open){document.body.classList.toggle('nav-open',open);opener.setAttribute('aria-expanded',String(open));backdrop.hidden=!open;if(open)closer.focus();else opener.focus()}
opener.addEventListener('click',()=>setMenu(true));closer.addEventListener('click',()=>setMenu(false));backdrop.addEventListener('click',()=>setMenu(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('nav-open'))setMenu(false)});
pin.addEventListener('click',()=>{const pinned=document.body.classList.toggle('nav-pinned');pin.setAttribute('aria-pressed',String(pinned));pin.setAttribute('aria-label',pinned?'Unpin navigation':'Pin navigation');if(!pinned&&matchMedia('(hover:hover)').matches)pin.blur()});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{if(matchMedia('(hover:hover)').matches)link.blur()}));

