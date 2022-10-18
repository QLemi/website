var wybranaa="";
document.querySelector("#szara").addEventListener('change',()=>{
    wybranaa="s";
    
})
document.querySelector("#zolta").addEventListener('change',()=>{
    wybranaa="z";
   
})
document.querySelector("#zielona").addEventListener('change',()=>{
    wybranaa="zi";
   
})
document.querySelector("#fioletowa").addEventListener('change',()=>{
    wybranaa="f";

})


var ile=0;
var addony=new Array(0,0,0,0,0,0,0,0,0);

document.querySelector('#Butterfly-Tape').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Butterfly-Tape').checked){
            addony[0]=1;
        }else{
            document.querySelector('#Butterfly-Tape').checked=false;
            addony[0]=0;
        }
    }else{
        document.querySelector('#Butterfly-Tape').checked=false;
        addony[0]=0;
    }
})
document.querySelector('#Bandages').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Bandages').checked){
            addony[1]=1;
        }else{
            document.querySelector('#Bandages').checked=false;
            addony[1]=0;
        }
    }else{
        document.querySelector('#Bandages').checked=false;
        addony[1]=0;
    }
})
document.querySelector('#Self-Adherent-Wrap').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Self-Adherent-Wrap').checked){
            addony[2]=1;
        }else{
            document.querySelector('#Self-Adherent-Wrap').checked=false;
            addony[2]=0;
        }
    }else{
        document.querySelector('#Self-Adherent-Wrap').checked=false;
        addony[2]=0;
    }
})

document.querySelector('#Needle').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Needle').checked){
            addony[3]=1;
        }else{
            document.querySelector('#Needle').checked=false;
            addony[3]=0;
        }
    }else{
        document.querySelector('#Needle').checked=false;
        addony[3]=0;
    }
})
document.querySelector('#Medical-Scissors').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Medical-Scissors').checked){
            addony[4]=1;
        }else{
            document.querySelector('#Medical-Scissors').checked=false;
            addony[4]=0;
        }
    }else{
        document.querySelector('#Medical-Scissors').checked=false;
        addony[4]=0;
    }
})
document.querySelector('#Gauze-Roll').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Gauze-Roll').checked){
            addony[5]=1;
        }else{
            document.querySelector('#Gauze-Roll').checked=false;
            addony[5]=0;
        }
    }else{
        document.querySelector('#Gauze-Roll').checked=false;
        addony[5]=0;
    }
})
document.querySelector('#Surgical-Suture').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Surgical-Suture').checked){
            addony[6]=1;
        }else{
            document.querySelector('#Surgical-Suture').checked=false;
            addony[6]=0;
        }
    }else{
        document.querySelector('#Surgical-Suture').checked=false;
        addony[6]=0;
    }
})
document.querySelector('#Gel-Dressings').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Gel-Dressings').checked){
            addony[7]=1;
        }else{
            document.querySelector('#Gel-Dressings').checked=false;
            addony[7]=0;
        }
    }else{
        document.querySelector('#Gel-Dressings').checked=false;
        addony[7]=0;
    }
})
document.querySelector('#Abdominal-Dressing').addEventListener('change',()=>{
    var sum=0;
    for (var i = 0; i < 9; i++) {
        sum += addony[i];
    }
    if(sum<2){
        if(document.querySelector('#Abdominal-Dressing').checked){
            addony[8]=1;
        }else{
            document.querySelector('#Abdominal-Dressing').checked=false;
            addony[8]=0;
        }
    }else{
        document.querySelector('#Abdominal-Dressing').checked=false;
        addony[8]=0;
    }
})

var botanika=0;
var street=0;
document.querySelector('#botanyKnowledge').addEventListener('change',()=>{
    if(document.querySelector('#botanyKnowledge').checked){
        botanika=1;
    }else{
        botanika=0;
    }
})
document.querySelector('#streetwise').addEventListener('change',()=>{
    if(document.querySelector('#streetwise').checked){
        street=1;
    }else{
        street=0;
    }
})
var ladunki=0;
setInterval(function () {
    var czasl=0;
    document.querySelector("#wynika").innerHTML = "";
    if(wybranaa=='s'){
        ladunki=16;
    }else if(wybranaa=='z'){
        ladunki=24;
    }else if(wybranaa=='zi'){
        ladunki=16;
    }else if(wybranaa=='f'){
        ladunki=32;
    }else{
        document.querySelector("#wynika").innerHTML = "Nie wybrano apteczki";
        return 0;
    }
    if(addony[0]==1){
        
    }
    if(addony[1]==1){
        ladunki+=8;
    }
    if(addony[2]==1){
        ladunki+=8;
    }
    if(addony[3]==1){
        
    }
    if(addony[4]==1){
        
    }
    if(addony[5]==1){
        ladunki+=8;
    }
    if(addony[6]==1){
        
    }
    if(addony[7]==1){
        ladunki+=8;
    }
    if(addony[8]==1){
        ladunki-=8;
    }
    if(botanika==1){
        ladunki=ladunki*0.8;
    }
    if(street==1){
        ladunki=ladunki*1.25;
    }
    
    
    ilelecz=Math.trunc(ladunki/16);
    
    document.querySelector("#wynika").innerHTML = "Apteczka posiada: "+ladunki+" ładunki/ów. Wystarczy ona na "+ilelecz+" leczenie. Czas leczenia to: "+czasl+"s ";

},100);
