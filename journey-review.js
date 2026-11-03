'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const by=id=>document.getElementById(id),app=by('kob-app');
 const journey=document.createElement('nav');journey.id='brewJourney';journey.setAttribute('aria-label','Your brewing journey');
 journey.innerHTML='<ol><li data-step="choose">Choose</li><li data-step="prepare">Prepare <small>optional</small></li><li data-step="brew">Brew</li><li data-step="enjoy">Enjoy <small>or dilute</small></li></ol><p id="journeyInstruction"></p>';
 by('foundationSummary').before(journey);
 const menu=app.querySelector('.evo-stage-menu');menu.hidden=true;
 const foundation=document.createElement('button');foundation.id='foundationHome';foundation.textContent='Foundation';foundation.className='foundation-home';menu.before(foundation);
 foundation.onclick=()=>{app.querySelector('[data-evo="1"]').click();syncAdditions();};
 by('learnMode').textContent='Guide me · preparation →';by('learnMode').setAttribute('aria-label','Guide me through preparation');
 by('recipeShowPreparation').textContent='Preparation help →';
 const custom=document.createElement('details');custom.id='brewCustomise';
 custom.innerHTML='<summary><strong>Customise your brew</strong><span id="customiseSummary">Optional additions</span></summary><p>Build on Foundation. Keep either addition off for the standard brew.</p><div class="brew-addition-options"><label><input type="checkbox" id="additionTemperature"><span><b>Two temperatures</b><small>Different water temperatures for bloom and following pour.</small></span></label><label><input type="checkbox" id="additionVacuum"><span><b>Vacuum setup</b><small>Collect the bloom or whole brew over your flask.</small></span></label></div>';
 const advanced=by('advancedStageSettings');advanced.before(custom);custom.append(advanced);
 const utilities=document.createElement('div');utilities.id='foundationUtilities';utilities.innerHTML='<div><strong>Already have brewed coffee?</strong><span>Go straight to dilution using a KODE recipe or your own measurements.</span></div><button type="button" id="openExistingDilution">Dilution calculator →</button>';
 by('foundationChoice').querySelector('.choice-heading').after(utilities);by('openExistingDilution').onclick=()=>app.querySelector('[data-evo="2"]').click();
 function syncAdditions(){const options=window.kodeBrewAdditions||{temperature:false,vacuum:false};by('additionTemperature').checked=!!options.temperature;by('additionVacuum').checked=!!options.vacuum;const selected=[options.temperature?'Two temperatures':'',options.vacuum?'Vacuum setup':''].filter(Boolean);const caption=selected.length?selected.join(' + '):'Optional additions';if(by('customiseSummary').textContent!==caption)by('customiseSummary').textContent=caption;}
 function changeAdditions(){window.setKodeBrewAdditions({temperature:by('additionTemperature').checked,vacuum:by('additionVacuum').checked});syncAdditions();window.refreshKodeRecipeReview?.();}
 by('additionTemperature').onchange=changeAdditions;by('additionVacuum').onchange=changeAdditions;
 syncAdditions();
 const text=(el,value)=>{if(el.textContent!==value)el.textContent=value;};
 function update(){
  syncAdditions();
  const dilution=app.classList.contains('inplace-dilution')||app.classList.contains('diluting');
  const choosing=!by('foundationChoice').hidden,preparing=!by('foundationPrep').hidden;
  const complete=by('simPhase').textContent==='Brew complete'||by('simPhase').textContent==='Dilution complete';
  const step=dilution||complete?'enjoy':choosing?'choose':preparing?'prepare':'brew';
  journey.hidden=app.classList.contains('adv')||!by('fb45Introduction').hidden||!by('dilutionEntry').hidden;
  journey.querySelectorAll('[data-step]').forEach(item=>{if(item.dataset.step===step){if(item.getAttribute('aria-current')!=='step')item.setAttribute('aria-current','step');}else item.removeAttribute('aria-current');});
  const message=step==='choose'?'Choose your recipe. Preparation help is available whenever you need it.':step==='prepare'?'Take each step at your pace. Brewing starts only when you press Start first pour.':step==='enjoy'?(dilution?'Adjust your finished cup. Dilution water is added after brewing.':'Your brew is ready. Enjoy it as brewed, or add water for a lighter cup.'):'Follow the illustration and your own scale. Show guidance for help during the brew.';
  text(by('journeyInstruction'),message);
 }
 const observer=new MutationObserver(update);
 for(const id of ['foundationChoice','foundationPrep','fb45Introduction','dilutionEntry'])observer.observe(by(id),{attributes:true,attributeFilter:['hidden']});
 observer.observe(app,{attributes:true,attributeFilter:['class']});observer.observe(by('simPhase'),{childList:true});update();
});
