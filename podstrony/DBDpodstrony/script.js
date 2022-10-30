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
var addony=new Array(0,0,0,0,0,0,0,0,0,0,0,0,0,0);


function zaznaczone(id,numertablicy){
    var sum=0;
    for (var i = 0; i < 14; i++) {
        sum += addony[i];
    }
    
    if(sum<2){
        if(document.querySelector(id).checked){
            addony[numertablicy]=1;
        }else{
            document.querySelector(id).checked=false;
            addony[numertablicy]=0;
        }
    }else{
        document.querySelector(id).checked=false;
        addony[numertablicy]=0;
    }
}
{
document.querySelector('#Rubber-Gloves').addEventListener('change',()=>{
    zaznaczone('#Rubber-Gloves',0);
})
document.querySelector('#Butterfly-Tape').addEventListener('change',()=>{
    zaznaczone('#Butterfly-Tape',1);
})
document.querySelector('#Bandages').addEventListener('change',()=>{
    zaznaczone('#Bandages',2);
})
document.querySelector('#Sponge').addEventListener('change',()=>{
    zaznaczone('#Sponge',3);
})
document.querySelector('#Self-Adherent-Wrap').addEventListener('change',()=>{
    zaznaczone('#Self-Adherent-Wrap',4);
})
document.querySelector('#Needle').addEventListener('change',()=>{
    zaznaczone('#Needle',5);
})
document.querySelector('#Medical-Scissors').addEventListener('change',()=>{
    zaznaczone('#Medical-Scissors',6);
})
document.querySelector('#Gauze-Roll').addEventListener('change',()=>{
    zaznaczone('#Gauze-Roll',7);
})
document.querySelector('#Surgical-Suture').addEventListener('change',()=>{
    zaznaczone('#Surgical-Suture',8); 
})
document.querySelector('#Gel-Dressings').addEventListener('change',()=>{
    zaznaczone('#Gel-Dressings',9);
})
document.querySelector('#Abdominal-Dressing').addEventListener('change',()=>{
    zaznaczone('#Abdominal-Dressing',10);
})
document.querySelector('#Anti-Haemorrhagic-Syringe').addEventListener('change',()=>{
    zaznaczone('#Anti-Haemorrhagic-Syringe',11);
})
document.querySelector('#Styptic-Agent').addEventListener('change',()=>{
    zaznaczone('#Styptic-Agent',12);
})
document.querySelector('#Refined-Serum').addEventListener('change',()=>{
    zaznaczone('#Refined-Serum',13);
})
}
var botanika=0;
var street=0;
var boon=0;
var desperate=0;
var resilience=0;
var leader=0;
var bnew=0;


document.querySelector('#d1').addEventListener('change',()=>{
    document.querySelector('#Desperate-Measures').checked=true;
    desperate=1;
    
})
document.querySelector('#d2').addEventListener('change',()=>{
    document.querySelector('#Desperate-Measures').checked=true;
    desperate=1;
})
document.querySelector('#d3').addEventListener('change',()=>{
    document.querySelector('#Desperate-Measures').checked=true;
    desperate=1;
})
document.querySelector('#d4').addEventListener('change',()=>{
    document.querySelector('#Desperate-Measures').checked=true;
    desperate=1;
})



document.querySelector('#s1').addEventListener('change',()=>{
    document.querySelector('#streetwise').checked=true;
    street=1;
    
})
document.querySelector('#s2').addEventListener('change',()=>{
    document.querySelector('#streetwise').checked=true;
    street=1;
})
document.querySelector('#s3').addEventListener('change',()=>{
    document.querySelector('#streetwise').checked=true;
    street=1;
})
document.querySelector('#s4').addEventListener('change',()=>{
    document.querySelector('#streetwise').checked=true;
    street=1;
})



document.querySelector('#botanyKnowledge').addEventListener('change',()=>{
    if(document.querySelector('#botanyKnowledge').checked){
        botanika=1;
    }else{
        botanika=0;
    }
})
document.querySelector('#resilience').addEventListener('change',()=>{
    if(document.querySelector('#resilience').checked){
        resilience=1;
    }else{
        resilience=0;
    }
})
document.querySelector('#leader').addEventListener('change',()=>{
    if(document.querySelector('#leader').checked){
        leader=1;
    }else{
        leader=0;
    }
})
document.querySelector('#better-than-new').addEventListener('change',()=>{
    if(document.querySelector('#better-than-new').checked){
        bnew=1;
    }else{
        bnew=0;
    }
})

document.querySelector('#boon').addEventListener('change',()=>{
    if(document.querySelector('#boon').checked){
        boon=1;
    }else{
        boon=0;
    }
})
// STREETWISE %
document.querySelector('#streetwise').addEventListener('change',()=>{
    if(document.querySelector('#streetwise').checked){
        street=1.1;
        document.querySelector('#s1').checked=true;
    }else{
        street=0;
        for(i=1;i<5;i++)
        document.querySelector('#s'+i).checked=false;
    }
})
document.querySelector('#s1').addEventListener('change',() =>{
    street=1.1;
})
document.querySelector('#s2').addEventListener('change',() =>{
    street=1.2;
})
document.querySelector('#s3').addEventListener('change',() =>{
    street=1.3;
})
document.querySelector('#s4').addEventListener('change',() =>{
    street=1.4;
})

// DESPERATE MEASURES %
document.querySelector('#Desperate-Measures').addEventListener('change',()=>{
    if(document.querySelector('#Desperate-Measures').checked){
        desperate=1.1;
        document.querySelector('#d1').checked=true;
    }else{
        desperate=0;
        for(i=1;i<5;i++)
        document.querySelector('#d'+i).checked=false;
    }
})
document.querySelector('#d1').addEventListener('change',() =>{
    desperate=1.1;
})
document.querySelector('#d2').addEventListener('change',() =>{
    desperate=1.2;
})
document.querySelector('#d3').addEventListener('change',() =>{
    desperate=1.3;
})
document.querySelector('#d4').addEventListener('change',() =>{
    desperate=1.4;
})




var ladunki=0;
setInterval(function () {
    var czasl=0;
    var czasla=0;
    var bonusp=5;
    var bonusBP=150;
    var skillch=0;
    document.querySelector("#wynika").innerHTML = "";
    if(wybranaa=='s'){
        ladunki=16;
        czasl=1;
        czasla=1.25;
        document.querySelector("#wynika").innerHTML = "Szara apteczka posiada <span class='zmiennak'>16 </span>ładunków<br>";
    }else if(wybranaa=='z'){
        ladunki=24;
        czasl=1;
        czasla=1.35;
        document.querySelector("#wynika").innerHTML = "Żółta apteczka posiada <span class='zmiennak'>24 </span>ładunki<br>";
    }else if(wybranaa=='zi'){
        ladunki=16;
        czasl=1.5;
        czasla=1.5;
        document.querySelector("#wynika").innerHTML = "Zielona apteczka posiada <span class='zmiennak'>16</span> ładunków<br>";
    }else if(wybranaa=='f'){
        ladunki=32;
        czasl=1;
        czasla=1.5;
        document.querySelector("#wynika").innerHTML = "Fioletowa apteczka posiada <span class='zmiennak'>32</span> ładunki<br>";
    }else{
        document.querySelector("#wynika").innerHTML = "Nie wybrano apteczki";
        return 0;
    }
    // Sprawdzanie addonów 
    if(addony[0]==1){
        bonusp+=3;
    }
    if(addony[1]==1){
        czasl+=0.05;
    }
    if(addony[2]==1){
        ladunki+=8;   
    }
    if(addony[3]==1){
        bonusp+=5;
    }
    if(addony[4]==1){
        ladunki+=8;
        czasl+=0.05;
        czasla+=0.05;
    }
    if(addony[5]==1){
        czasl+=0.15;
        czasla+=0.15;
        bonusBP+=150;
        skillch+=10;
    }
    if(addony[6]==1){
        czasl+=0.15;
        czasla+=0.15;
    }
    if(addony[7]==1){
        ladunki+=12;
    }
    if(addony[8]==1){
        czasl+=0.15;
        czasla+=0.15;
        bonusBP+=225;
        skillch+=15;
    }
    if(addony[9]==1){
        ladunki+=16
    }
    if(addony[10]==1){
        czasl+=0.25;
        czasla+=0.25;
        ladunki-=8;
    }
    var addonE="";
    if(addony[12]==1){
        addonE+="Dodatkowo można wstrzyknąć Scyptic Agent dające <span class='zmiennak'>Endurance </span><br> na <span class='zmiennak'>8</span> sekund i usuwa ono apteczkę<br>";
    }
    var addonS="";
    if(addony[13]==1){
        addonS+="Dodatkowo można wstrzyknąć Blighted Serum dające <span class='zmiennak'>+5% </span>speed<br> na <span class='zmiennak'>16</span> sekund i usuwa ono apteczkę<br>";
    }


    if(botanika==1){
        ladunki=ladunki*0.8;
        czasl+=0.5;
        czasla+=0.5;
    }
    if(resilience==1){
        czasl+=0.09;
        czasla+=0.09;
    }
    //desperate
    switch(desperate){
        case 1.1:
            czasl+=0.14;
            czasla+=0.14;
            break;
        case 1.2:
            czasl+=0.28;
            czasla+=0.28;
            break;
        case 1.3:
            czasl+=0.42;
            czasla+=0.42;
            break;
        case 1.4:
            czasl+=0.56;
            czasla+=0.56;
            break;
        default:

    }
    if(leader==1){
        czasl+=0.25;
        czasla+=0.25;
    }
    switch(street){
        case 1.1:
            ladunki*=1.25;
            break;
        case 1.2:
            ladunki*=1.4375;
            break;
        case 1.3:
            ladunki*=1.578125;
            break;
        case 1.4:
            ladunki*=1.68359375;
            break;
        default:

    }
    if(bnew==1){
        czasl+=0.16;
        czasla+=0.16;
    }
    if(boon==1){
        czasl+=0.5;
        czasla+=0.5;
    }
    var addonSTRZ="";
    if(addony[11]==1){
        addonSTRZ="Dodatkowo można wstrzyknąć Anti-Haemorrhagic Syringe która usuwa<br> apteczkę i leczy pasywnie jeden health state w przeciągu <span class='zmiennak'>"+ (16/czasl).toFixed(2)+"</span>s<br>";
    }
    
    document.querySelector("#wynika").innerHTML +=
    "Z wybranymi addonami ma ich: <span class='zmiennak'>"+ladunki.toFixed(0)+"</span><br>"+ 
    "Prędkość samoopatrywania to: <span class='zmiennak'>"+czasl.toFixed(2)+"</span> ładunku na sekundę<br>"+
    "Prędkość leczenia altruistycznego to: <span class='zmiennak'>"+czasla.toFixed(2)+"</span> ładunku na sekundę<br>"+
    "Czas leczenia siebie to: <span class='zmiennak'>"+(16/czasl).toFixed(2)+"</span>s<br>"+
    "Czas leczenia altruistycznego to: <span class='zmiennak'>"+(16/czasla).toFixed(2)+"</span>s<br>"+
    "Wystarczy ona na <span class='zmiennak'>"+(ladunki/16).toFixed(2)+"</span> leczenie/a.<br>"+
    "Bonusowy progress za Great Skill Check: <span class='zmiennak'>"+bonusp +"</span>%<br>"+
    "BP za Great Skill Check: <span class='zmiennak'>"+bonusBP +"</span><br>"+
    "Szansa na Skill Checka przy samoopatrywaniu: <span class='zmiennak'>"+(skillch+12.5)+"</span>%<br>"+
    "Szansa na Skill Checka przy leczeniu altruistycznym: <span class='zmiennak'>"+(skillch+15)+"</span>%<br>"+
    
    
    addonE+addonS+addonSTRZ
    ;

},100);
