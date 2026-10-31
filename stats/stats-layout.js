const nav=document.querySelector('.preview-nav');
const openMenu=document.querySelector('.menu-open');
const closeMenu=document.querySelector('.nav-close');
const backdrop=document.querySelector('.nav-backdrop');
const pin=document.querySelector('.nav-pin');
function setMenu(open){document.body.classList.toggle('nav-open',open);openMenu.setAttribute('aria-expanded',String(open));backdrop.hidden=!open;if(open)closeMenu.focus();else openMenu.focus()}
openMenu.addEventListener('click',()=>setMenu(true));
closeMenu.addEventListener('click',()=>setMenu(false));
backdrop.addEventListener('click',()=>setMenu(false));
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&document.body.classList.contains('nav-open'))setMenu(false)});
pin.addEventListener('click',()=>{const pinned=document.body.classList.toggle('nav-pinned');pin.setAttribute('aria-pressed',String(pinned));pin.setAttribute('aria-label',pinned?'Unpin navigation':'Pin navigation');if(!pinned&&matchMedia('(hover:hover)').matches)pin.blur()});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{if(matchMedia('(hover:hover)').matches)link.blur()}));
const corners=['top left','top right','bottom left','bottom right'];
document.querySelectorAll('.explorer-panel,.totals-panel,.combined-section,.role-overview').forEach(panel=>{const first=Math.floor(Math.random()*4),opposite=3-first,rest=[0,1,2,3].filter(i=>i!==first&&i!==opposite).sort(()=>Math.random()-.5),order=[first,opposite,...rest];let count=1;for(const chance of [.5,.2,.05]){if(Math.random()>=chance)break;count++}const weights={1:[.15,.35],2:[.35,.45],3:[.6,.3],4:[.8,.18]}[count],roll=Math.random();panel.classList.add('accent-panel');panel.dataset.snake=roll<weights[0]?'short':roll<weights[0]+weights[1]?'medium':'long';panel.style.setProperty('--corners',order.slice(0,count).map(i=>`radial-gradient(ellipse ${panel.matches('.explorer-panel,.totals-panel') ? '520px 260px' : '180px 90px'} at ${corners[i]},#df3e50 0%,#df3e50dd 30%,transparent 90%) border-box`).join(','));panel.style.setProperty('--delay',(-Math.random()*9)+'s');const edge=document.createElement('span');edge.className='panel-edge';edge.setAttribute('aria-hidden','true');panel.append(edge)});


const searchPanels=new Map([['character-search','.explorer-panel'],['detail-search','.explorer-panel'],['totals-search','.totals-panel']]);
document.addEventListener('focusin',event=>{const selector=searchPanels.get(event.target.id);if(!selector)return;const panel=event.target.closest(selector);if(panel&&!panel.style.minHeight)panel.style.minHeight=Math.ceil(panel.getBoundingClientRect().height)+'px'});
document.addEventListener('input',event=>{const selector=searchPanels.get(event.target.id);if(!selector)return;const panel=event.target.closest(selector);if(!panel)return;if(!event.target.value){panel.style.minHeight='';requestAnimationFrame(()=>{if(document.activeElement===event.target)panel.style.minHeight=Math.ceil(panel.getBoundingClientRect().height)+'px'})}},true);
document.addEventListener('focusout',event=>{const selector=searchPanels.get(event.target.id);if(!selector||event.target.value)return;const panel=event.target.closest(selector);if(panel)panel.style.minHeight=''});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>entry.target.classList.toggle('animation-paused',!entry.isIntersecting)));document.querySelectorAll('.explorer-panel,.totals-panel,.combined-section,.role-overview').forEach(panel=>observer.observe(panel))}
