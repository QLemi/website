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
const winconInput=document.getElementById('wincon-filter-input');
const winconOptions=document.getElementById('wincon-custom-options');
const winconSource=document.getElementById('wincon-filter-options');
let winconIndex=-1;
function closeWincon(){winconOptions.hidden=true;winconInput.setAttribute('aria-expanded','false');winconInput.removeAttribute('aria-activedescendant');winconIndex=-1}
function showWincon(){const query=winconInput.value.trim().toLocaleLowerCase();const values=[...winconSource.options].map(option=>option.value).filter(value=>value.toLocaleLowerCase().includes(query));winconOptions.replaceChildren();winconIndex=-1;if(!values.length){closeWincon();return}values.forEach((value,index)=>{const item=document.createElement('div');item.id='wincon-option-'+index;item.setAttribute('role','option');item.textContent=value;item.addEventListener('mousedown',event=>event.preventDefault());item.addEventListener('click',()=>{winconInput.value=value;closeWincon();winconInput.focus()});winconOptions.append(item)});winconOptions.hidden=false;winconInput.setAttribute('aria-expanded','true')}
winconInput.addEventListener('focus',showWincon);winconInput.addEventListener('input',showWincon);
winconInput.addEventListener('keydown',event=>{const items=[...winconOptions.querySelectorAll('[role=option]')];if(event.key==='Escape'&&!winconOptions.hidden){event.preventDefault();event.stopPropagation();closeWincon()}else if((event.key==='ArrowDown'||event.key==='ArrowUp')&&items.length){event.preventDefault();winconIndex=(winconIndex+(event.key==='ArrowDown'?1:-1)+items.length)%items.length;items.forEach((item,index)=>item.setAttribute('aria-selected',String(index===winconIndex)));winconInput.setAttribute('aria-activedescendant',items[winconIndex].id);items[winconIndex].scrollIntoView({block:'nearest'})}else if(event.key==='Enter'&&winconIndex>=0){event.preventDefault();event.stopImmediatePropagation();winconInput.value=items[winconIndex].textContent;closeWincon()}},true);
document.addEventListener('click',event=>{if(!event.target.closest('.wincon-filter-entry'))closeWincon()});
document.getElementById('wincon-filter-add').addEventListener('click',closeWincon);
