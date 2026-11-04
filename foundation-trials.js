'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),app=$('kob-app');
 const welcome=$('brewWelcome');welcome.classList.add('clean-landing');const discover=$('welcomeDiscover');discover.classList.add('landing-discover');welcome.querySelector('.evo-home-promise').after(discover);
 for(const [id,copy] of [['foundationMethod','Choose your size and strength. Brew and enjoy.'],['dilutionMethod','Brew strong, then add water to find your strength.']])welcome.querySelectorAll('#'+id+'>p').forEach(p=>p.textContent=copy);
 const help=document.createElement('button');help.type='button';help.id='foundationTrialHelp';help.textContent='Show me how →';help.onclick=()=>{window.kodeBrewPath='foundation';$('startLearning').click();};$('foundationChoice').querySelector('.choice-heading').append(help);
 const home=$('methodHome'),originalHome=home.onclick;
 home.onclick=originalHome;
 const back=$('backToWelcome'),originalBack=back.onclick;back.onclick=originalBack;
 window.syncKodeTrialMode=()=>{
  const enabled=!!window.kodeDilutionEnabled;app.classList.toggle('foundation-trial',!enabled);
  const promise=$('brewWelcome').querySelector('.evo-home-promise');if(promise)promise.textContent=enabled?'More flavour from your coffee. Two ways to find your strength.':'More flavour from your coffee. Find the strength you enjoy.';
  if(!enabled){window.kodePlannedDilution=null;window.kodeSavedDilution=null;if(window.kodeBrewPath==='dilution'||app.classList.contains('inplace-dilution'))$('methodFoundation').click();}
  help.hidden=window.kodeShowLearningHome===false;
 };
 const restore=window.restoreKodeDilutionPlan;window.restoreKodeDilutionPlan=plan=>window.kodeDilutionEnabled?restore(plan):false;
 const direct=window.startExistingKodeDilution;window.startExistingKodeDilution=data=>window.kodeDilutionEnabled?direct(data):false;
 // Guard every public dilution entry, including keyboard activation and stale screens.
 for(const id of ['methodDilution','beginDilutionMethod','learnDilutionMethod','openExistingDilution','dilutionAfterBrew','chooseExistingDilution','continueCurrentDilution'])$(id)?.addEventListener('click',event=>{if(!window.kodeDilutionEnabled){event.preventDefault();event.stopImmediatePropagation();}},true);
 $('foundationTrialHelp').hidden=window.kodeShowLearningHome===false;
 $('settingLearning').addEventListener('change',()=>help.hidden=!$('settingLearning').checked);
 window.syncKodeTrialMode();originalHome();
});
