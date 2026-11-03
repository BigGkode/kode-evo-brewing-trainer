'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),app=$('kob-app');let queued=false;
 const note=app.querySelector('.route-taste-note');
 if(note){const details=document.createElement('details');details.className='route-explanation';const summary=document.createElement('summary');summary.textContent='About this flavour route';note.before(details);details.append(summary,note);}
 function fit(){queued=false;const desktop=innerWidth>600;
  const active=desktop&&!app.classList.contains('welcome-screen')&&['foundationChoice','foundationPrep','fb45Introduction','dilutionEntry'].every(id=>$(id)?.hidden!==false)&&!$('brewerSim').hidden;
  if(app.classList.contains('audit-workspace')!==active)app.classList.toggle('audit-workspace',active);
  if(!active)return;
  const stage=$('brewerCanvas').parentElement,top=stage.getBoundingClientRect().top+scrollY,playback=stage.parentElement;
  let below=12;for(const el of playback.children){if(el!==stage&&getComputedStyle(el).display!=='none'&&!el.hidden)below+=el.getBoundingClientRect().height+6;}
  const room=Math.max(270,Math.floor(innerHeight-top-below-12));const value=room+'px';if(app.style.getPropertyValue('--audit-stage-room')!==value)app.style.setProperty('--audit-stage-room',value);
 }
 const schedule=()=>{if(!queued){queued=true;requestAnimationFrame(fit)}};
 new MutationObserver(schedule).observe(app,{subtree:true,attributes:true,attributeFilter:['hidden','class','open']});
 addEventListener('resize',schedule);app.addEventListener('click',schedule);app.addEventListener('toggle',schedule,true);document.fonts?.ready.then(schedule);fit();
});
