const nav = document.querySelector('.preview-nav');
const openMenu = document.querySelector('.menu-open');
const closeMenu = document.querySelector('.nav-close');
const backdrop = document.querySelector('.nav-backdrop');
const pin = document.querySelector('.nav-pin');
const mobile = matchMedia('(max-width: 760px)');
const mainRegions = document.querySelectorAll('body > header, body > main');
const topPanel = document.querySelector('.streak-top-panel');
const panelCorners = ['top left', 'top right', 'bottom left', 'bottom right'];
const firstCorner = Math.floor(Math.random() * panelCorners.length);
const oppositeCorner = 3 - firstCorner;
const remainingCorners = panelCorners.filter((_, index) => index !== firstCorner && index !== oppositeCorner);
if (Math.random() < .5) remainingCorners.reverse();
const cornerOrder = [panelCorners[firstCorner], panelCorners[oppositeCorner], ...remainingCorners];
let cornerCount = 1;
for (const chance of [.5, .2, .05]) {
  if (Math.random() >= chance) break;
  cornerCount++;
}
const cornerGradients = cornerOrder.slice(0, cornerCount).map(corner =>
  `radial-gradient(ellipse 300px 115px at ${corner}, #df3e50, #df3e5060 48%, transparent 100%)`);
topPanel.style.setProperty('--streak-panel-corners', cornerGradients.join(', '));
const [shortChance, mediumChance] = [[.15, .35], [.35, .45], [.6, .3], [.8, .18]][cornerCount - 1];
const lengthRoll = Math.random();
const traceLength = lengthRoll < shortChance ? 55 : lengthRoll < shortChance + mediumChance ? 95 : 135;
topPanel.style.setProperty('--streak-trace-length', traceLength + 'deg');
topPanel.style.setProperty('--streak-trace-delay', -Math.random() * 9 + 's');

function setMenu(open) {
  const isOpen = mobile.matches && open;
  document.body.classList.toggle('nav-open', isOpen);
  openMenu.setAttribute('aria-expanded', String(isOpen));
  nav.inert = mobile.matches && !isOpen;
  backdrop.hidden = !isOpen;
  mainRegions.forEach(region => { region.inert = isOpen; });
  openMenu.inert = isOpen;
  document.querySelector('.dbd-site-skip').inert = isOpen;
  document.getElementById('back-to-top').inert = isOpen;
}

function dismissMenu() {
  setMenu(false);
  openMenu.focus();
}

setMenu(false);
mobile.addEventListener('change', () => {
  const focusWasInNav = nav.contains(document.activeElement);
  setMenu(false);
  if (mobile.matches && focusWasInNav) openMenu.focus();
});
openMenu.addEventListener('click', () => {
  setMenu(true);
  closeMenu.focus();
});
closeMenu.addEventListener('click', dismissMenu);
backdrop.addEventListener('click', dismissMenu);
document.addEventListener('keydown', event => {
  if (!document.body.classList.contains('nav-open')) return;
  if (event.key === 'Escape') dismissMenu();
  if (event.key !== 'Tab') return;
  const links = nav.querySelectorAll('a[href], .nav-close');
  const first = links[0];
  const last = links[links.length - 1];
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
});
const mouseNavigation = matchMedia('(hover: hover)');
pin.addEventListener('click', event => {
  const pinned = document.body.classList.toggle('nav-pinned');
  pin.setAttribute('aria-pressed', String(pinned));
  pin.setAttribute('aria-label', pinned ? 'Unpin navigation' : 'Pin navigation');
  if (!pinned && mouseNavigation.matches && event.detail > 0) pin.blur();
});
nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', event => {
    if (mouseNavigation.matches && event.detail > 0) link.blur();
  });
});

const profileMenu = document.querySelector('.streak-profiles');
const profileSummary = profileMenu.querySelector('summary');
const profileList = profileMenu.querySelector('.streak-profile-list');
if (STREAKI_CONFIG.PROFILE_LABEL) document.title = `${STREAKI_CONFIG.PROFILE_LABEL} | Dead by Daylight Streaks`;
profileMenu.querySelector('.streak-profile-current').textContent = STREAKI_CONFIG.PROFILE_LABEL || 'Choose';
STREAKI_PROFILES.forEach(profile => {
  const isCurrent = profile.page === STREAKI_CONFIG.page;
  const item = document.createElement(isCurrent ? 'span' : 'a');
  item.textContent = profile.PROFILE_LABEL;
  if (isCurrent) item.setAttribute('aria-current', 'page');
  else item.href = profile.page;
  profileList.append(item);
});
profileMenu.hidden = STREAKI_PROFILES.length < 2;
document.addEventListener('click', event => {
  if (!profileMenu.contains(event.target)) profileMenu.open = false;
});
profileMenu.addEventListener('focusout', event => {
  if (!profileMenu.contains(event.relatedTarget)) profileMenu.open = false;
});
profileMenu.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || !profileMenu.open) return;
  event.preventDefault();
  profileMenu.open = false;
  profileSummary.focus();
});

const winconInput = document.getElementById('wincon-filter-input');
const winconOptions = document.getElementById('wincon-custom-options');
const winconSource = document.getElementById('wincon-filter-options');
const winconFeedback = document.getElementById('wincon-filter-feedback');
let winconIndex = -1;

function closeWincon() {
  winconOptions.hidden = true;
  winconInput.setAttribute('aria-expanded', 'false');
  winconInput.removeAttribute('aria-activedescendant');
  winconIndex = -1;
}

function showWincon() {
  const query = winconInput.value.trim().toLowerCase();
  const values = [...winconSource.options].map(option => option.value)
    .filter(value => value.toLowerCase().includes(query));
  closeWincon();
  winconOptions.replaceChildren();
  if (!values.length) return;
  values.forEach((value, index) => {
    const item = document.createElement('div');
    item.id = 'wincon-option-' + index;
    item.setAttribute('role', 'option');
    item.setAttribute('aria-selected', 'false');
    item.textContent = value;
    item.addEventListener('pointerdown', event => event.preventDefault());
    item.addEventListener('click', () => chooseWincon(item));
    winconOptions.append(item);
  });
  winconOptions.hidden = false;
  winconInput.setAttribute('aria-expanded', 'true');
}

function chooseWincon(item) {
  winconInput.focus();
  winconInput.value = item.textContent;
  winconFeedback.hidden = true;
  closeWincon();
}

winconInput.addEventListener('focus', showWincon);
winconInput.addEventListener('input', () => {
  winconFeedback.hidden = true;
  showWincon();
});
winconInput.addEventListener('focusout', closeWincon);
winconInput.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !winconOptions.hidden) {
    event.preventDefault();
    closeWincon();
    return;
  }
  if (event.key === 'Enter' && winconIndex >= 0) {
    event.preventDefault();
    event.stopImmediatePropagation();
    chooseWincon(winconOptions.children[winconIndex]);
    return;
  }
  if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
  if (winconOptions.hidden) showWincon();
  const items = [...winconOptions.children];
  if (winconOptions.hidden || !items.length) return;
  event.preventDefault();
  const direction = event.key === 'ArrowDown' ? 1 : -1;
  const previousIndex = winconIndex < 0 && direction < 0 ? 0 : winconIndex;
  winconIndex = (previousIndex + direction + items.length) % items.length;
  items.forEach((item, index) => item.setAttribute('aria-selected', String(index === winconIndex)));
  winconInput.setAttribute('aria-activedescendant', items[winconIndex].id);
  items[winconIndex].scrollIntoView({ block: 'nearest' });
});
