'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const app=document.getElementById('kob-app');
 const welcome=document.getElementById('brewWelcome');
 if(!app||!welcome)return;
 const foundationLabel=welcome.querySelector('#foundationMethod>.method-number'),dilutionLabel=welcome.querySelector('#dilutionMethod>.method-number');
 if(foundationLabel)foundationLabel.textContent='EVO 1 · Foundation';
 if(dilutionLabel)dilutionLabel.textContent='EVO 2 · Dilution';
 const setup=document.getElementById('methodAbout'),settings=document.getElementById('userSettings');
 if(setup&&settings){settings.querySelector('label').before(setup);setup.classList.add('settings-setup-entry');setup.onclick=()=>{settings.close();document.getElementById('methodSetup').showModal();};}
 document.getElementById('learnDilutionMethod')?.classList.add('primary');
 const addPhoneCopy=(selector,copy)=>{const full=welcome.querySelector(selector);if(!full)return;full.classList.add('desktop-route-copy');const short=document.createElement('p');short.className='phone-route-copy';short.textContent=copy;full.after(short);};
 addPhoneCopy('#foundationMethod>p','Choose your size and strength. Brew and enjoy.');
 addPhoneCopy('#dilutionMethod>p','Brew strong, then add water to reach your strength.');
 const purpose=welcome.querySelector('.kode-purpose');
 if(purpose){const details=document.createElement('details');details.className='phone-purpose';const summary=document.createElement('summary');summary.textContent='Why EVO? More from your coffee.';details.append(summary,purpose);welcome.append(details);const phone=matchMedia('(max-width:600px)');const sync=()=>{details.open=!phone.matches;};sync();phone.addEventListener('change',sync);}
});

document.addEventListener('DOMContentLoaded',()=>{const app=document.getElementById('kob-app');let queued=false;const sync=()=>{queued=false;const hidden=id=>document.getElementById(id)?.hidden!==false;const active=innerWidth<=600&&!app.classList.contains('welcome-screen')&&!app.classList.contains('inplace-dilution')&&!app.classList.contains('diluting')&&['foundationChoice','foundationPrep','fb45Introduction','dilutionEntry'].every(hidden)&&!hidden('brewerSim');app.classList.toggle('phone-brew-active',active);};const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(sync)}};new MutationObserver(schedule).observe(app,{subtree:true,attributes:true,attributeFilter:['hidden','class']});addEventListener('resize',schedule);sync();});

document.addEventListener('DOMContentLoaded',()=>{const title=document.querySelector('#brewWelcome>h2');if(title){const wide=title.textContent,phone=matchMedia('(max-width:600px)');const sync=()=>{title.textContent=phone.matches?'Unlock your coffee.':wide;};sync();phone.addEventListener('change',sync);}});
