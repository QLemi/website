const SPREADSHEET_ID = "1JTlwfzWxDwMjtnwlIt7qcy8GTAncDLdwENMwjUeCzMI";
const SHEET_NAME = "Games";
const HEADERS = ["id","createdAt","updatedAt","status","hostKey","guestKey","mode","deckSize","hostName","guestName","hostCharacter","guestCharacter","guestReady","deck","currentTurn","question","questionBy","answer","turnAnswered","eliminated","winner","expiresAt","stats","wrongGuesses","voiceChat","roundStartedAt","questionNumber"];
const TTL = 12 * 60 * 60 * 1000;
const ROSTER = [{"id":"killer:the-trapper","name":"The Trapper","kind":"killer"},{"id":"killer:the-wraith","name":"The Wraith","kind":"killer"},{"id":"killer:the-hillbilly","name":"The Hillbilly","kind":"killer"},{"id":"killer:the-nurse","name":"The Nurse","kind":"killer"},{"id":"killer:the-shape","name":"The Shape","kind":"killer"},{"id":"killer:the-hag","name":"The Hag","kind":"killer"},{"id":"killer:the-doctor","name":"The Doctor","kind":"killer"},{"id":"killer:the-huntress","name":"The Huntress","kind":"killer"},{"id":"killer:the-cannibal","name":"The Cannibal","kind":"killer"},{"id":"killer:the-nightmare","name":"The Nightmare","kind":"killer"},{"id":"killer:the-pig","name":"The Pig","kind":"killer"},{"id":"killer:the-clown","name":"The Clown","kind":"killer"},{"id":"killer:the-spirit","name":"The Spirit","kind":"killer"},{"id":"killer:the-legion","name":"The Legion","kind":"killer"},{"id":"killer:the-plague","name":"The Plague","kind":"killer"},{"id":"killer:the-ghost-face","name":"The Ghost Face","kind":"killer"},{"id":"killer:the-demogorgon","name":"The Demogorgon","kind":"killer"},{"id":"killer:the-oni","name":"The Oni","kind":"killer"},{"id":"killer:the-deathslinger","name":"The Deathslinger","kind":"killer"},{"id":"killer:the-executioner","name":"The Executioner","kind":"killer"},{"id":"killer:the-blight","name":"The Blight","kind":"killer"},{"id":"killer:the-twins","name":"The Twins","kind":"killer"},{"id":"killer:the-trickster","name":"The Trickster","kind":"killer"},{"id":"killer:the-nemesis","name":"The Nemesis","kind":"killer"},{"id":"killer:the-cenobite","name":"The Cenobite","kind":"killer"},{"id":"killer:the-artist","name":"The Artist","kind":"killer"},{"id":"killer:the-onryo","name":"The Onryo","kind":"killer"},{"id":"killer:the-dredge","name":"The Dredge","kind":"killer"},{"id":"killer:the-mastermind","name":"The Mastermind","kind":"killer"},{"id":"killer:the-knight","name":"The Knight","kind":"killer"},{"id":"killer:the-skull-merchant","name":"The Skull Merchant","kind":"killer"},{"id":"killer:the-singularity","name":"The Singularity","kind":"killer"},{"id":"killer:the-xenomorph","name":"The Xenomorph","kind":"killer"},{"id":"killer:the-good-guy","name":"The Good Guy","kind":"killer"},{"id":"killer:the-unknown","name":"The Unknown","kind":"killer"},{"id":"killer:the-lich","name":"The Lich","kind":"killer"},{"id":"killer:the-dark-lord","name":"The Dark Lord","kind":"killer"},{"id":"killer:the-houndmaster","name":"The Houndmaster","kind":"killer"},{"id":"killer:the-ghoul","name":"The Ghoul","kind":"killer"},{"id":"killer:the-animatronic","name":"The Animatronic","kind":"killer"},{"id":"killer:the-krasue","name":"The Krasue","kind":"killer"},{"id":"killer:the-first","name":"The First","kind":"killer"},{"id":"killer:the-slasher","name":"The Slasher","kind":"killer"},{"id":"killer:the-judgment","name":"The Judgment","kind":"killer"},{"id":"survivor:dwight-fairfield","name":"Dwight Fairfield","kind":"survivor"},{"id":"survivor:meg-thomas","name":"Meg Thomas","kind":"survivor"},{"id":"survivor:claudette-morel","name":"Claudette Morel","kind":"survivor"},{"id":"survivor:jake-park","name":"Jake Park","kind":"survivor"},{"id":"survivor:nea-karlsson","name":"Nea Karlsson","kind":"survivor"},{"id":"survivor:laurie-strode","name":"Laurie Strode","kind":"survivor"},{"id":"survivor:ace-visconti","name":"Ace Visconti","kind":"survivor"},{"id":"survivor:bill-overbeck","name":"Bill Overbeck","kind":"survivor"},{"id":"survivor:feng-min","name":"Feng Min","kind":"survivor"},{"id":"survivor:david-king","name":"David King","kind":"survivor"},{"id":"survivor:quentin-smith","name":"Quentin Smith","kind":"survivor"},{"id":"survivor:david-tapp","name":"David Tapp","kind":"survivor"},{"id":"survivor:kate-denson","name":"Kate Denson","kind":"survivor"},{"id":"survivor:adam-francis","name":"Adam Francis","kind":"survivor"},{"id":"survivor:jeff-johansen","name":"Jeff Johansen","kind":"survivor"},{"id":"survivor:jane-romero","name":"Jane Romero","kind":"survivor"},{"id":"survivor:ash-williams","name":"Ash Williams","kind":"survivor"},{"id":"survivor:nancy-wheeler","name":"Nancy Wheeler","kind":"survivor"},{"id":"survivor:steve-harrington","name":"Steve Harrington","kind":"survivor"},{"id":"survivor:yui-kimura","name":"Yui Kimura","kind":"survivor"},{"id":"survivor:zarina-kassir","name":"Zarina Kassir","kind":"survivor"},{"id":"survivor:cheryl-mason","name":"Cheryl Mason","kind":"survivor"},{"id":"survivor:felix-richter","name":"Felix Richter","kind":"survivor"},{"id":"survivor:elodie-rakoto","name":"Élodie Rakoto","kind":"survivor"},{"id":"survivor:yun-jin-lee","name":"Yun-Jin Lee","kind":"survivor"},{"id":"survivor:jill-valentine","name":"Jill Valentine","kind":"survivor"},{"id":"survivor:leon-scott-kennedy","name":"Leon Scott Kennedy","kind":"survivor"},{"id":"survivor:mikaela-reid","name":"Mikaela Reid","kind":"survivor"},{"id":"survivor:jonah-vasquez","name":"Jonah Vasquez","kind":"survivor"},{"id":"survivor:yoichi-asakawa","name":"Yoichi Asakawa","kind":"survivor"},{"id":"survivor:haddie-kaur","name":"Haddie Kaur","kind":"survivor"},{"id":"survivor:ada-wong","name":"Ada Wong","kind":"survivor"},{"id":"survivor:rebecca-chambers","name":"Rebecca Chambers","kind":"survivor"},{"id":"survivor:vittorio-toscano","name":"Vittorio Toscano","kind":"survivor"},{"id":"survivor:thalita-lyra","name":"Thalita Lyra","kind":"survivor"},{"id":"survivor:renato-lyra","name":"Renato Lyra","kind":"survivor"},{"id":"survivor:gabriel-soma","name":"Gabriel Soma","kind":"survivor"},{"id":"survivor:nicolas-cage","name":"Nicolas Cage","kind":"survivor"},{"id":"survivor:ellen-ripley","name":"Ellen Ripley","kind":"survivor"},{"id":"survivor:alan-wake","name":"Alan Wake","kind":"survivor"},{"id":"survivor:sable-ward","name":"Sable Ward","kind":"survivor"},{"id":"survivor:aestri-yazar","name":"Aestri Yazar","kind":"survivor"},{"id":"survivor:baermar-uraz","name":"Baermar Uraz","kind":"survivor"},{"id":"survivor:lara-croft","name":"Lara Croft","kind":"survivor"},{"id":"survivor:trevor-belmont","name":"Trevor Belmont","kind":"survivor"},{"id":"survivor:taurie-cain","name":"Taurie Cain","kind":"survivor"},{"id":"survivor:orela-rose","name":"Orela Rose","kind":"survivor"},{"id":"survivor:rick-grimes","name":"Rick Grimes","kind":"survivor"},{"id":"survivor:michonne-grimes","name":"Michonne Grimes","kind":"survivor"},{"id":"survivor:vee-boonyasak","name":"Vee Boonyasak","kind":"survivor"},{"id":"survivor:dustin-henderson","name":"Dustin Henderson","kind":"survivor"},{"id":"survivor:eleven","name":"Eleven","kind":"survivor"},{"id":"survivor:kwon-tae-young","name":"Kwon Tae-young","kind":"survivor"},{"id":"survivor:shane-wiigwaas","name":"Shane Wiigwaas","kind":"survivor"},{"id":"survivor:aurora-stardotter","name":"Aurora Stardotter","kind":"survivor"}];

function doGet(e) {
  const p = (e && e.parameter) || {};
  if (!["preview","state"].includes(String(p.action || ""))) return jsonOutput_({ok:false,error:"This read-only endpoint only accepts room status requests."},p.callback);
  try { return jsonOutput_(route_(p),p.callback); }
  catch (err) { return jsonOutput_({ok:false,error:err.message || "Server error."},p.callback); }
}
function doPost(e) {
  let p;
  try { p = JSON.parse(e && e.postData && e.postData.contents || "{}"); }
  catch (_) { return ContentService.createTextOutput(JSON.stringify({ok:false,error:"Invalid request body."})).setMimeType(ContentService.MimeType.JSON); }
  try { return ContentService.createTextOutput(JSON.stringify(route_(p))).setMimeType(ContentService.MimeType.JSON); }
  catch (err) { return ContentService.createTextOutput(JSON.stringify({ok:false,error:err.message || "Server error."})).setMimeType(ContentService.MimeType.JSON); }
}
function jsonOutput_(result, callback) {
  const json = JSON.stringify(result).replace(/</g, "\\u003c");
  const cb = String(callback || "");
  const valid = /^[A-Za-z_$][0-9A-Za-z_$]*$/.test(cb);
  return ContentService.createTextOutput(valid ? cb + "(" + json + ");" : json)
    .setMimeType(valid ? ContentService.MimeType.JAVASCRIPT : ContentService.MimeType.JSON);
}

function route_(p) {
  switch (String(p.action || "")) {
    case "create": return create_(p);
    case "preview": return preview_(p);
    case "join": return join_(p);
    case "state": return state_(p);
    case "start": case "kick": case "voiceChat": case "ask": case "answer":
    case "guess": case "rematch": case "leave": return mutate_(p, p.action);
    default: throw new Error("Unknown action.");
  }
}
function ss_(){return SpreadsheetApp.openById(SPREADSHEET_ID);}
function sheet_(){
  const ss=ss_(); let sh=ss.getSheetByName(SHEET_NAME);
  if(!sh) sh=ss.insertSheet(SHEET_NAME);
  if(sh.getLastRow()===0) sh.getRange(1,1,1,HEADERS.length).setValues([HEADERS]);
  else {
    const current=sh.getRange(1,1,1,Math.max(1,sh.getLastColumn())).getValues()[0];
    HEADERS.forEach((header,i)=>{if(!current.includes(header))sh.getRange(1,sh.getLastColumn()+1).setValue(header);});
  }
  return sh;
}
function locked_(fn){const l=LockService.getScriptLock();l.waitLock(10000);try{return fn();}finally{l.releaseLock();}}
function decode_(row,n){const g={};HEADERS.forEach((k,i)=>g[k]=row[i]);g.row=n;g.deck=parse_(g.deck,[]);g.voiceChat=String(g.voiceChat)==="true";g.roundStartedAt=Number(g.roundStartedAt)||0;g.questionNumber=Math.max(0,Number(g.questionNumber)||0);return g;}
function expired_(g){return Number(g.updatedAt)+TTL<Date.now();}
function parse_(v,f){try{return v?JSON.parse(v):f;}catch(_){return f;}}
function find_(id){
  const sh=ss_().getSheetByName(SHEET_NAME);if(!sh)return null;const last=sh.getLastRow();if(last<2)return null;
  const ids=sh.getRange(2,1,last-1,1).getDisplayValues();
  for(let i=0;i<ids.length;i++)if(ids[i][0]===id)return decode_(sh.getRange(i+2,1,1,HEADERS.length).getValues()[0],i+2);
  return null;
}
function save_(g){
  const sh=sheet_();g.updatedAt=Date.now();
  sh.getRange(g.row,1,1,HEADERS.length).setValues([HEADERS.map(k=>["createdAt","guestReady","questionBy","turnAnswered","eliminated","winner","expiresAt","stats","wrongGuesses"].includes(k)?"":k==="deck"?JSON.stringify(g.deck||[]):k==="voiceChat"?Boolean(g.voiceChat):g[k]==null?"":g[k])]);
}
function clear_(g){sheet_().getRange(g.row,1,1,HEADERS.length).clearContent();}
function purge_(){
  const sh=sheet_(),last=sh.getLastRow();if(last<2)return;
  const rows=sh.getRange(2,1,last-1,HEADERS.length).getValues(),updatedIndex=HEADERS.indexOf("updatedAt");
  rows.forEach((r,i)=>{if(r[0]&&Number(r[updatedIndex])+TTL<Date.now())sh.getRange(i+2,1,1,HEADERS.length).clearContent();});
}
function freeRow_(){
  const sh=sheet_(),last=Math.max(1,sh.getLastRow());if(last<2)return 2;
  const ids=sh.getRange(2,1,last-1,1).getDisplayValues(),i=ids.findIndex(x=>!x[0]);return i<0?last+1:i+2;
}
function key_(n){const a="ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";let s="";for(let i=0;i<n;i++)s+=a[Math.floor(Math.random()*a.length)];return s;}
function id_(){return key_(9).toUpperCase();}
function roomId_(v){const s=String(v||"").toUpperCase();if(!/^[A-Z2-9]{9}$/.test(s))throw new Error("Invalid room link.");return s;}
function name_(v){const s=String(v||"").replace(/[<>]/g,"").trim().slice(0,20);if(!s)throw new Error("Enter a nickname.");return s;}
function char_(id,mode){const c=ROSTER.find(x=>x.id===id);if(!c||(mode!=="mixed"&&c.kind!==(mode==="killers"?"killer":"survivor")))throw new Error("Character is not available in this room.");return c;}
function shuffle_(list){const a=list.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

function create_(p){return locked_(()=>{
  purge_();const mode=String(p.mode||"mixed");if(!["mixed","killers","survivors"].includes(mode))throw new Error("Choose a valid character pool.");
  const size=Math.max(8,Math.min(32,Number(p.deckSize)||20)),character=char_(String(p.hostCharacter||""),mode),pool=ROSTER.filter(x=>mode==="mixed"||x.kind===(mode==="killers"?"killer":"survivor"));
  if(pool.length<size)throw new Error("Not enough characters for that board size.");
  const id=roomId_(p.id),hostKey=keyValue_(p.ticket),existing=find_(id);
  if(existing){if(existing.hostKey===hostKey)return {ok:true};throw new Error("That room code is already in use. Create the room again.");}
  const t=Date.now(),g={row:freeRow_(),id,updatedAt:t,status:"waiting",hostKey,guestKey:"",mode,deckSize:size,hostName:name_(p.hostName),guestName:"",hostCharacter:character.id,guestCharacter:"",deck:[],currentTurn:"",question:"",answer:"",voiceChat:false,roundStartedAt:0,questionNumber:0};
  save_(g);return {ok:true};
});}
function preview_(p){const g=find_(roomId_(p.id));if(!g||expired_(g))throw new Error("Room not found or expired.");return {ok:true,state:public_(g,"")};}
function join_(p){return locked_(()=>{
  purge_();const g=find_(roomId_(p.id));if(!g||g.status!=="waiting")throw new Error("This room is no longer open.");
  if(g.guestKey)throw new Error("Someone joined first. This room is full.");
  const ticket=keyValue_(p.ticket);
  if(g.guestKey){if(g.guestKey===ticket)return {ok:true};throw new Error("Someone joined first. This room is full.");}
  const c=char_(String(p.guestCharacter||""),g.mode);g.guestKey=ticket;g.guestName=name_(p.guestName);g.guestCharacter=c.id;save_(g);
  return {ok:true};
});}
function require_(p){
  const g=find_(roomId_(p.id));if(!g||expired_(g))throw new Error("Room not found or expired.");
  const seat=String(p.seat||"");if(!["host","guest"].includes(seat))throw new Error("Invalid seat.");
  const expected=seat==="host"?g.hostKey:g.guestKey;if(!expected||String(p.ticket||"")!==expected)throw new Error("Room key is invalid. Rejoin using your original link.");return g;
}
function state_(p){const g=require_(p);return {ok:true,state:public_(g,String(p.seat))};}
function public_(g,seat){
  const host=seat==="host",opponent=g.status==="finished"?(host?g.guestCharacter:g.hostCharacter):"";
  return {id:g.id,status:g.status,mode:g.mode,modeLabel:g.mode==="mixed"?"Mixed pool":g.mode==="killers"?"Killers only":"Survivors only",deckSize:Number(g.deckSize),hostName:g.hostName,guestName:g.guestName,hostReady:Boolean(g.hostKey&&g.hostCharacter),guestReady:Boolean(g.guestKey&&g.guestCharacter),deck:g.deck,currentTurn:g.currentTurn,question:g.question,questionBy:g.question?otherSeat_(g.currentTurn):"",answer:g.answer,turnAnswered:Boolean(g.answer),questionNumber:Number(g.questionNumber)||0,voiceChat:Boolean(g.voiceChat),roundStartedAt:Number(g.roundStartedAt)||0,opponentCharacter:opponent,winner:g.status==="finished"?g.currentTurn:""};
}
function otherSeat_(seat){return seat==="host"?"guest":"host";}
function keyValue_(value){const key=String(value||"");if(!/^[A-Za-z0-9]{40}$/.test(key))throw new Error("Invalid room key.");return key;}
function buildDeck_(g){
  const pool=ROSTER.filter(x=>g.mode==="mixed"||x.kind===(g.mode==="killers"?"killer":"survivor")),ids=new Set([g.hostCharacter,g.guestCharacter]);
  return shuffle_([ROSTER.find(x=>x.id===g.hostCharacter),ROSTER.find(x=>x.id===g.guestCharacter),...shuffle_(pool.filter(x=>!ids.has(x.id))).slice(0,Math.max(0,g.deckSize-ids.size))]);
}
function mutate_(p,action){return locked_(()=>{
  const g=require_(p),seat=String(p.seat),other=seat==="host"?"guest":"host";
  if(action==="start"){if(seat!=="host"||g.status!=="waiting"||!g.guestKey||!g.guestCharacter)throw new Error("Wait for the other player to join and choose their character.");g.deck=buildDeck_(g);g.status="playing";g.currentTurn=Math.random()<.5?"host":"guest";g.question="";g.answer="";g.questionNumber=0;g.roundStartedAt=Date.now();}
  else if(action==="kick"){if(seat!=="host"||g.status!=="waiting"||!g.guestKey)throw new Error("No waiting player to remove.");g.guestKey="";g.guestName="";g.guestCharacter="";g.voiceChat=false;}
  else if(action==="voiceChat"){if(seat!=="host"||g.status!=="waiting"||!g.guestKey||!g.guestCharacter)throw new Error("Voice chat can only be changed before the game starts.");g.voiceChat=Boolean(p.enabled);}
  else if(action==="ask"){if(g.status!=="playing"||g.currentTurn!==seat||(g.question&&!g.answer))throw new Error("It is not your turn to ask.");g.question=String(p.question||"").trim().slice(0,180);if(!g.question)throw new Error("Write a question first.");if(g.voiceChat&&g.question!=="Question #"+(g.questionNumber+1))throw new Error("Voice chat questions use the numbered prompt.");g.questionNumber++;g.answer="";g.currentTurn=other;}
  else if(action==="answer"){if(g.status!=="playing"||g.currentTurn!==seat||!g.question||g.answer)throw new Error("No question is waiting for your answer.");if(!["Yes","No"].includes(String(p.answer)))throw new Error("Choose Yes or No.");g.answer=String(p.answer);}
  else if(action==="guess"){if(g.status!=="playing"||g.currentTurn!==seat||(g.question&&!g.answer))throw new Error("You can guess only when it is your turn to act.");const c=char_(String(p.characterId||""),g.mode);if(!g.deck.some(x=>x.id===c.id))throw new Error("Choose a character on this board.");const correct=c.id===(seat==="host"?g.guestCharacter:g.hostCharacter);if(correct)g.status="finished";else{g.currentTurn=other;g.question="";g.answer="";}}
  else if(action==="rematch"){if(g.status!=="finished")throw new Error("The round is not finished.");g.deck=buildDeck_(g);g.status="playing";g.currentTurn=Math.random()<.5?"host":"guest";g.question="";g.answer="";g.questionNumber=0;g.roundStartedAt=Date.now();}
  else if(action==="leave"){clear_(g);return {ok:true,removed:true};}
  save_(g);return {ok:true,state:public_(g,seat)};
});}

