'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),app=$('kob-app');
 const config=window.kodeStageConfig={stage:1,temperatureEnabled:false,bloomTemperature:80,pourTemperature:96,vacuumScope:'bloom',kettleSetup:'single'};
 try{const saved=JSON.parse(localStorage.getItem('kode-evo-temperature-settings')||'null');if(saved){config.kettleSetup=saved.kettleSetup==='dual'?'dual':'single';config.bloomTemperature=Math.max(75,Math.min(80,Math.round(Number(saved.bloomTemperature)||80)));config.pourTemperature=Math.max(60,Math.min(100,Math.round(Number(saved.pourTemperature)||96)));}}catch{}
 const setText=(id,text)=>{if($(id).textContent!==text)$(id).textContent=text;};
 const section=document.createElement('section');section.id='advancedStageSettings';section.hidden=true;
 section.innerHTML='<div class="stage-settings-copy"><span class="foundation-kicker" id="advancedStageKicker"></span><h2 id="advancedStageTitle"></h2><p id="advancedStageDescription"></p><button type="button" id="stageReviewFoundation">Review Foundation</button></div><div class="stage-settings-controls"><fieldset id="stageTemperatureFields"><legend>Two temperatures. One familiar technique.</legend><label>Kettle setup <select id="stageKettleSetup"><option value="single">Single kettle — heat during bloom rest</option><option value="dual">Two kettles — prepare both temperatures</option></select></label><label>First pour <span><input id="stageBloomTemperature" type="number" min="75" max="80" step="1" value="80"> °C</span></label><label>Following pour <span><input id="stagePourTemperature" type="number" min="60" max="100" step="1" value="96"> °C</span></label><p id="stageKettleGuidance">Use 75–80°C for the first pour, then raise the kettle to the following-pour temperature during the bloom rest. Keep only the water needed plus your kettle’s safe minimum allowance. The established EVO water quantities, timing, retention and dilution calculations remain unchanged.</p></fieldset><fieldset id="stageVacuumFields"><legend>Choose your receiving setup</legend><label><input type="radio" name="vacuumScope" value="bloom" checked> Bloom over the flask, then move to your cup</label><label><input type="radio" name="vacuumScope" value="whole"> Keep the whole brew over the flask</label><div id="stageVacuumDiagram"></div><details><summary>About this illustration</summary><p>This guides the flask-to-cup sequence. It does not model vacuum pressure.</p></details></fieldset></div>';
 $('foundationChoice').querySelector('.choice-bottom').before(section);
 const cue=document.createElement('div');cue.id='advancedStageCue';cue.setAttribute('role','status');cue.hidden=true;$('brewerCanvas').parentElement.prepend(cue);
 function diagram(){const flask='<path d="M52 10H86V41L108 94Q112 108 96 108H42Q26 108 30 94L52 41Z" fill="#e7eeea" stroke="#173f46" stroke-width="2"/><path d="M39 83H99L104 96Q107 103 94 103H44Q31 103 34 96Z" fill="#91613e"/>';const cup='<path d="M181 65H237V91Q237 111 209 111Q181 111 181 91Z" fill="#c9a77f" stroke="#173f46" stroke-width="2"/><path d="M237 73Q267 74 237 96" fill="none" stroke="#173f46" stroke-width="2"/>';return '<svg viewBox="0 0 290 148" role="img" aria-label="'+(config.vacuumScope==='bloom'?'Bloom over the flask, then following pour over a cup':'Both pours over the flask')+'">'+flask+(config.vacuumScope==='bloom'?'<path d="M122 65H164M157 58L165 65L157 72" fill="none" stroke="#b9362c" stroke-width="2"/>'+cup:'<text x="145" y="65">Both pours</text>')+'<text x="69" y="135" text-anchor="middle">Flask</text>'+(config.vacuumScope==='bloom'?'<text x="210" y="135" text-anchor="middle">Following pour</text>':'')+'</svg>';}
 function stageCue(stage,scope,state,bloomTemp,pourTemp){
  if(state.complete)return stage===4?'Vacuum sequence complete':'Temperature brew complete';
  if(stage===4&&scope==='whole')return 'Receiving vessel · vacuum-trap flask';
  if(state.phase==='draw')return stage===4?'Final drawdown · leave the cup in place':'Final drawdown · let the brew finish';
  if(stage===4){if(state.time<state.firstPourEnd)return 'Bloom · over the vacuum-trap flask';if(state.time<state.nextPourStart)return 'Before the next pour · move the FB45 to your cup';return 'Following pour · over your cup';}
  if(state.time<state.firstPourEnd)return 'First pour · '+bloomTemp+'°C';if(state.time<state.nextPourStart)return (config.kettleSetup==='single'?'Bloom rest · heat kettle to ':'Bloom rest · prepare second kettle at ')+pourTemp+'°C';return 'Following-pour water · '+pourTemp+'°C';
 }
 window.kodeStageCue=stageCue;
 function update(){
  const stage=config.stage,advanced=stage>=3,choosing=!$('foundationChoice').hidden,inline=app.classList.contains('inplace-dilution'),landing=app.classList.contains('dilution-entry'),state=window.kodeBrewState||{time:0,complete:false,phase:'bloom',firstPourEnd:10,nextPourStart:70};
  section.hidden=!advanced||!choosing||landing||app.classList.contains('adv');app.classList.toggle('advanced-stage',advanced);app.dataset.evoStage=String(stage);
  $('stageTemperatureFields').hidden=!config.temperatureEnabled;$('stageVacuumFields').hidden=stage!==4;
  setText('advancedStageKicker','3 · YOUR '+(stage===3?'TEMPERATURES':'SETUP'));
  setText('advancedStageTitle',stage===3?'Choose your kettle setup and temperatures.':'Add the vacuum-trap setup.');
  setText('advancedStageDescription',stage===3?'First pour at 75–80°C, then a hotter following pour. All EVO recipe calculations stay the same.':'Keep the Foundation technique and choose where each pour is collected.');
  setText('stageKettleGuidance',config.kettleSetup==='single'?'After the 75–80°C first pour, heat the same kettle to the following-pour temperature during bloom rest. Avoid excess water, but always respect the kettle’s safe minimum fill. If not ready, wait for the correct temperature. EVO recipe calculations remain unchanged.':'Prepare one kettle at 75–80°C and the other at the following-pour temperature. Switch at the next pour. EVO recipe calculations remain unchanged.');
  const art=diagram();if(stage===4&&$('stageVacuumDiagram').innerHTML!==art)$('stageVacuumDiagram').innerHTML=art;
  cue.hidden=!advanced||choosing||!$('foundationPrep').hidden||inline||landing||app.classList.contains('adv');
  setText('advancedStageCue',stageCue(stage,config.vacuumScope,state,config.bloomTemperature,config.pourTemperature));
  if(!inline){const temperature=config.temperatureEnabled?config.bloomTemperature+'°C bloom · '+config.pourTemperature+'°C following pour':(state.temp||94)+'°C';setText('focusTemp',temperature);if(advanced&&!choosing){const summary=$('foundationSummaryText'),prefix=summary.textContent.replace(/ · [^·]*°C[\s\S]*$/,'');setText('foundationSummaryText',prefix+' · '+temperature);}}
  const offer=$('dilutionAfterBrew');if(advanced&&offer)offer.hidden=!state.complete;
 }
 window.updateKodeStageReadout=update;
 window.updateKodeStageSettings=stage=>{config.stage=stage;config.temperatureEnabled=stage>=3&&(window.kodeBrewAdditions?!!window.kodeBrewAdditions.temperature:true);update();};
 $('stageReviewFoundation').onclick=()=>$('reviewFoundation').click();
 $('stageKettleSetup').value=config.kettleSetup;$('stageBloomTemperature').value=config.bloomTemperature;$('stagePourTemperature').value=config.pourTemperature;
 const persistTemps=()=>{try{localStorage.setItem('kode-evo-temperature-settings',JSON.stringify({kettleSetup:config.kettleSetup,bloomTemperature:config.bloomTemperature,pourTemperature:config.pourTemperature}))}catch{}};
 $('stageKettleSetup').addEventListener('change',()=>{config.kettleSetup=$('stageKettleSetup').value;persistTemps();update();});
 for(const [id,key] of [['stageBloomTemperature','bloomTemperature'],['stagePourTemperature','pourTemperature']])$(id).addEventListener('change',()=>{const min=key==='bloomTemperature'?75:60,max=key==='bloomTemperature'?80:100;config[key]=Math.max(min,Math.min(max,Math.round(Number($(id).value)||config[key])));$(id).value=config[key];persistTemps();update();});
 section.querySelectorAll('[name="vacuumScope"]').forEach(input=>input.onchange=()=>{config.vacuumScope=input.value;update();});
 new MutationObserver(update).observe($('simClock'),{childList:true});new MutationObserver(update).observe($('foundationChoice'),{attributes:true,attributeFilter:['hidden']});new MutationObserver(update).observe($('foundationPrep'),{attributes:true,attributeFilter:['hidden']});
 update();
});
