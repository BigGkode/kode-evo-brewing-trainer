'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),app=$('kob-app');
 const config=window.kodeStageConfig={stage:1,temperatureEnabled:false,bloomTemperature:80,pourTemperature:96,vacuumScope:'bloom'};
 const setText=(id,text)=>{if($(id).textContent!==text)$(id).textContent=text;};
 const section=document.createElement('section');section.id='advancedStageSettings';section.hidden=true;
 section.innerHTML='<div class="stage-settings-copy"><span class="foundation-kicker" id="advancedStageKicker"></span><h2 id="advancedStageTitle"></h2><p id="advancedStageDescription"></p><button type="button" id="stageReviewFoundation">Review Foundation</button></div><div class="stage-settings-controls"><fieldset id="stageTemperatureFields"><legend>Two temperatures. One familiar technique.</legend><label>Bloom water <span><input id="stageBloomTemperature" type="number" min="60" max="100" step="1" value="80"> °C</span></label><label>Following pour <span><input id="stagePourTemperature" type="number" min="60" max="100" step="1" value="96"> °C</span></label><p>Prepare both water temperatures before starting. These are starting settings for you to explore.</p></fieldset><fieldset id="stageVacuumFields"><legend>Choose your receiving setup</legend><label><input type="radio" name="vacuumScope" value="bloom" checked> Bloom over the flask, then move to your cup</label><label><input type="radio" name="vacuumScope" value="whole"> Keep the whole brew over the flask</label><div id="stageVacuumDiagram"></div><details><summary>About this illustration</summary><p>This guides the flask-to-cup sequence. It does not model vacuum pressure.</p></details></fieldset></div>';
 $('foundationChoice').querySelector('.choice-bottom').before(section);
 const cue=document.createElement('div');cue.id='advancedStageCue';cue.setAttribute('role','status');cue.hidden=true;$('brewerCanvas').parentElement.prepend(cue);
 function diagram(){const flask='<path d="M52 10H86V41L108 94Q112 108 96 108H42Q26 108 30 94L52 41Z" fill="#e7eeea" stroke="#173f46" stroke-width="2"/><path d="M39 83H99L104 96Q107 103 94 103H44Q31 103 34 96Z" fill="#91613e"/>';const cup='<path d="M181 65H237V91Q237 111 209 111Q181 111 181 91Z" fill="#c9a77f" stroke="#173f46" stroke-width="2"/><path d="M237 73Q267 74 237 96" fill="none" stroke="#173f46" stroke-width="2"/>';return '<svg viewBox="0 0 290 148" role="img" aria-label="'+(config.vacuumScope==='bloom'?'Bloom over the flask, then following pour over a cup':'Both pours over the flask')+'">'+flask+(config.vacuumScope==='bloom'?'<path d="M122 65H164M157 58L165 65L157 72" fill="none" stroke="#b9362c" stroke-width="2"/>'+cup:'<text x="145" y="65">Both pours</text>')+'<text x="69" y="135" text-anchor="middle">Flask</text>'+(config.vacuumScope==='bloom'?'<text x="210" y="135" text-anchor="middle">Following pour</text>':'')+'</svg>';}
 function stageCue(stage,scope,state,bloomTemp,pourTemp){
  if(state.complete)return stage===4?'Vacuum sequence complete':'Temperature brew complete';
  if(stage===4&&scope==='whole')return 'Receiving vessel · vacuum-trap flask';
  if(state.phase==='draw')return stage===4?'Final drawdown · leave the cup in place':'Final drawdown · let the brew finish';
  if(stage===4){if(state.time<state.firstPourEnd)return 'Bloom · over the vacuum-trap flask';if(state.time<state.nextPourStart)return 'Before the next pour · move the FB45 to your cup';return 'Following pour · over your cup';}
  if(state.time<state.firstPourEnd)return 'Bloom water · '+bloomTemp+'°C';if(state.time<state.nextPourStart)return 'Next pour · have '+pourTemp+'°C water ready';return 'Following-pour water · '+pourTemp+'°C';
 }
 window.kodeStageCue=stageCue;
 function update(){
  const stage=config.stage,advanced=stage>=3,choosing=!$('foundationChoice').hidden,inline=app.classList.contains('inplace-dilution'),landing=app.classList.contains('dilution-entry'),state=window.kodeBrewState||{time:0,complete:false,phase:'bloom',firstPourEnd:10,nextPourStart:70};
  section.hidden=!advanced||!choosing||landing||app.classList.contains('adv');app.classList.toggle('advanced-stage',advanced);app.dataset.evoStage=String(stage);
  $('stageTemperatureFields').hidden=!config.temperatureEnabled;$('stageVacuumFields').hidden=stage!==4;
  setText('advancedStageKicker','3 · YOUR '+(stage===3?'TEMPERATURES':'SETUP'));
  setText('advancedStageTitle',stage===3?'Set your two temperatures.':'Add the vacuum-trap setup.');
  setText('advancedStageDescription',stage===3?'Prepare the bloom water and following-pour water before you start.':'Keep the Foundation technique and choose where each pour is collected.');
  const art=diagram();if(stage===4&&$('stageVacuumDiagram').innerHTML!==art)$('stageVacuumDiagram').innerHTML=art;
  cue.hidden=!advanced||choosing||!$('foundationPrep').hidden||inline||landing||app.classList.contains('adv');
  setText('advancedStageCue',stageCue(stage,config.vacuumScope,state,config.bloomTemperature,config.pourTemperature));
  if(!inline){const temperature=config.temperatureEnabled?config.bloomTemperature+'°C bloom · '+config.pourTemperature+'°C following pour':(state.temp||94)+'°C';setText('focusTemp',temperature);if(advanced&&!choosing){const summary=$('foundationSummaryText'),prefix=summary.textContent.replace(/ · [^·]*°C[\s\S]*$/,'');setText('foundationSummaryText',prefix+' · '+temperature);}}
  const offer=$('dilutionAfterBrew');if(advanced&&offer)offer.hidden=!state.complete;
 }
 window.updateKodeStageReadout=update;
 window.updateKodeStageSettings=stage=>{config.stage=stage;config.temperatureEnabled=stage>=3&&(window.kodeBrewAdditions?!!window.kodeBrewAdditions.temperature:true);update();};
 $('stageReviewFoundation').onclick=()=>$('reviewFoundation').click();
 for(const [id,key] of [['stageBloomTemperature','bloomTemperature'],['stagePourTemperature','pourTemperature']])$(id).addEventListener('change',()=>{config[key]=Math.max(60,Math.min(100,Math.round(Number($(id).value)||config[key])));$(id).value=config[key];update();});
 section.querySelectorAll('[name="vacuumScope"]').forEach(input=>input.onchange=()=>{config.vacuumScope=input.value;update();});
 new MutationObserver(update).observe($('simClock'),{childList:true});new MutationObserver(update).observe($('foundationChoice'),{attributes:true,attributeFilter:['hidden']});new MutationObserver(update).observe($('foundationPrep'),{attributes:true,attributeFilter:['hidden']});
 update();
});
