'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const app=document.getElementById('kob-app');
 const welcome=document.getElementById('brewWelcome');
 if(!app||!welcome)return;
 const addPhoneCopy=(selector,copy)=>{const full=welcome.querySelector(selector);if(!full)return;full.classList.add('desktop-route-copy');const short=document.createElement('p');short.className='phone-route-copy';short.textContent=copy;full.after(short);};
 addPhoneCopy('#foundationMethod>p','Choose your size and strength. Brew and enjoy.');
 addPhoneCopy('#dilutionMethod>p','Brew strong, then add water to reach your strength.');
 const purpose=welcome.querySelector('.kode-purpose');
 if(purpose){const details=document.createElement('details');details.className='phone-purpose';const summary=document.createElement('summary');summary.textContent='Why EVO? More from your coffee.';details.append(summary,purpose);welcome.append(details);const phone=matchMedia('(max-width:600px)');const sync=()=>{details.open=!phone.matches;};sync();phone.addEventListener('change',sync);}
});
