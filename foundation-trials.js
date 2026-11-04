'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),app=$('kob-app');
 const welcome=$('brewWelcome');welcome.classList.add('clean-landing','unified-home');
 const intro=document.createElement('div');intro.className='home-introduction';const words=document.createElement('div');words.className='home-introduction-copy';words.append(welcome.querySelector('h2'),welcome.querySelector('.method-hero-lead'),welcome.querySelector('.evo-home-promise'));const actions=document.createElement('div');actions.className='home-discovery-actions';const discover=$('welcomeDiscover');discover.classList.add('landing-discover');const why=document.createElement('button');why.type='button';why.textContent='Why EVO?';why.id='homeWhyEvo';actions.append(discover);const headingRow=document.createElement('div');headingRow.className='home-title-row';const heading=words.querySelector('h2');heading.before(headingRow);headingRow.append(heading,why);words.append(actions);intro.append(words);welcome.prepend(intro);
 const evoMark='<svg class="evo-wordmark" viewBox="0 0 128 42" role="img" aria-label="EVO"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square" stroke-linejoin="miter"><path d="M30 4H4V38H30M4 21H26M44 4L60 38L76 4"/><circle cx="105" cy="21" r="17"/></g></svg>';
 const receptor=$('foundationChoice').querySelector('.route-station svg')?.outerHTML||'';const title=words.querySelector('h2');title.innerHTML='<span>Meet</span> '+evoMark+'<span class="evo-full-stop">.</span>';title.setAttribute('aria-label','Meet EVO.');
 for(const [id,name] of [['foundationMethod','EVO 1 · Foundation'],['dilutionMethod','EVO 2 · Dilution']]){const label=$(id).querySelector('.method-number');label.classList.add('simple-path-label');label.textContent=name;}
 const about=document.createElement('dialog');about.id='homePurposeDialog';const closeForm=document.createElement('form');closeForm.method='dialog';const close=document.createElement('button');close.textContent='Close ×';closeForm.append(close);about.append(closeForm);const story=welcome.querySelector('.kode-purpose');if(story)about.append(story);app.append(about);why.onclick=()=>about.showModal();
 
 for(const [id,copy] of [['foundationMethod','Choose your size and strength. Brew and enjoy.'],['dilutionMethod','Brew strong, then add water to find your strength.']])welcome.querySelectorAll('#'+id+'>p').forEach(p=>p.textContent=copy);
 const help=document.createElement('button');help.type='button';help.id='foundationTrialHelp';help.textContent='Show me how →';help.onclick=()=>{window.kodeBrewPath='foundation';$('startLearning').click();};$('foundationChoice').querySelector('.choice-heading').append(help);
 const home=$('methodHome'),originalHome=home.onclick;
 home.onclick=originalHome;
 const back=$('backToWelcome'),originalBack=back.onclick;back.onclick=originalBack;
 window.syncKodeTrialMode=()=>{
  const enabled=!!window.kodeDilutionEnabled;app.classList.toggle('foundation-trial',!enabled);
  const promise=$('brewWelcome').querySelector('.evo-home-promise');if(promise)promise.textContent='More from your coffee. Less wasted.';
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
