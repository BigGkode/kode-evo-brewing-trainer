'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const app=document.getElementById('kob-app'),main=app.querySelector('main');let queued=false;
 function set(name,value){if(app.style.getPropertyValue(name)!==value)app.style.setProperty(name,value);}
 function fit(){queued=false;const viewport=window.visualViewport?.height||window.innerHeight,width=app.getBoundingClientRect().width,header=app.querySelector('header').getBoundingClientRect().height;app.classList.remove('fit-screen');app.classList.toggle('fit-tight',viewport<780);app.classList.toggle('fit-compact',viewport<660);set('--view-height',Math.floor(viewport)+'px');set('--available-main',Math.max(380,Math.floor(viewport-header))+'px');
  const prep=document.getElementById('foundationPrep'),intro=document.getElementById('fb45Introduction');for(const el of [prep,intro]){if(!el||el.hidden)continue;const top=el.getBoundingClientRect().top;const available=Math.max(270,Math.floor(viewport-top-14));const name=el===prep?'--prep-room':'--intro-room';set(name,available+'px');}
 }
 function schedule(){if(!queued){queued=true;requestAnimationFrame(fit);}}
 window.addEventListener('resize',schedule);window.visualViewport?.addEventListener('resize',schedule);app.addEventListener('click',schedule);app.addEventListener('toggle',schedule,true);
 const observer=new MutationObserver(schedule);observer.observe(app,{attributes:true,attributeFilter:['class']});for(const id of ['foundationChoice','foundationPrep','foundationSummary','fb45Introduction','dilutionEntry','dilutionPlan','dilutionFinish']){const el=document.getElementById(id);if(el)observer.observe(el,{attributes:true,attributeFilter:['hidden']});}
 new ResizeObserver(schedule).observe(app.querySelector('header'));document.fonts?.ready.then(schedule);fit();
});
