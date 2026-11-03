'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const $=id=>document.getElementById(id),app=$('kob-app'),choice=$('foundationChoice'),cups=choice.querySelector('.foundation-cups');
 const names=['Tea-like','Delicate','Bright','Classic','Rich','Intense'],colours=['#edf3ee','#dce9e5','#b4ceca','#80a8a7','#426f74','#173f46'];
 const plan=$('recipeDilutionPlan'),select=$('planDilutionStrength');
 const receptorMarkup='<svg xmlns="http://www.w3.org/2000/svg" viewBox="-84 -84 168 168" aria-hidden="true" focusable="false">'+Array.from({length:12},(_,j)=>'<path d="M-3 -22 L-4 -42 L-9 -51 L-8 -72 L-2 -68 L1 -48 L3 -24 Z" transform="rotate('+j*30+')" fill="currentColor"/>').join('')+'<circle r="12" fill="none" stroke="currentColor" stroke-width="3"/></svg>';

 cups.classList.add('station-choices');
 cups.querySelectorAll('button').forEach(b=>{b.querySelector('svg')?.remove();const dot=document.createElement('i');dot.className='route-station';dot.setAttribute('aria-hidden','true');dot.innerHTML=receptorMarkup;b.prepend(dot);b.style.setProperty('--station-brown',colours[+b.dataset.foundationStrength]);b.style.setProperty('--receptor-ink',+b.dataset.foundationStrength>=4?'#fffdf7':'#173f46');b.classList.toggle('dark-strength',+b.dataset.foundationStrength>=4);});
 const track=document.createElement('div');track.id='dilutionStationTrack';track.className='destination-rail';track.setAttribute('role','group');track.setAttribute('aria-label','Choose your dilution destination');
 names.forEach((name,i)=>{const b=document.createElement('button');b.type='button';b.dataset.station=i;b.style.setProperty('--station-brown',colours[i]);b.style.setProperty('--receptor-ink',i>=4?'#fffdf7':'#173f46');b.innerHTML='<i class="route-station" aria-hidden="true">'+receptorMarkup+'</i><strong>'+name+'</strong><small></small>';b.onclick=()=>{select.value=String(i);select.dispatchEvent(new Event('change',{bubbles:true}));update();};track.append(b);});
 const result=document.createElement('p');result.className='track-journey';
 const explanation=document.createElement('p');explanation.className='route-taste-note';explanation.textContent='A similar strength. A different flavour journey. Your starting brew shapes the result: Intense → Bright may taste and feel different from Classic → Bright. Explore your route and let taste guide you.';
 $('planDilutionFields').prepend(result,track);track.after(explanation);select.parentElement.classList.add('track-select-fallback');
 const setText=(node,text)=>{if(node.textContent!==text)node.textContent=text;};
 function update(){
 const dilution=window.kodeBrewPath==='dilution',source=+$('trainerStrength').value,target=+select.value,heading=choice.querySelector('.choice-heading');
 app.classList.toggle('dilution-route-selected',dilution);
 const routeColours=['#7c827a','#669d98','#398b8d','#286e79','#205461','#173f46'];track.style.setProperty('--recipe-track',routeColours[source]||'#173f46');result.style.setProperty('--recipe-track',routeColours[source]||'#173f46');
 setText(heading.querySelector('h2'),dilution?'Brew strong. Make it yours.':'Brew to your strength.');
 setText(heading.querySelector('p'),dilution?'Choose your starting brew, then follow its track to a lighter finish.':'Choose your size and strength. One direct route to your cup.');
 setText($('brewRouteName'),dilution?'EVO 2 · Dilution':'EVO 1 · Foundation');
 cups.setAttribute('aria-label',dilution?'Choose your starting brew':'Choose your strength');
 const headingAbove=cups.previousElementSibling;if(headingAbove&&/^2\s*[·.]/.test(headingAbove.textContent))setText(headingAbove,dilution?'2 · Choose your starting brew':'2 · Choose your strength');
 plan.hidden=!dilution;
 setText(result,source>0?names[source]+' track · choose your finish':'Choose a starting brew to reveal its track');
 track.hidden=source<1;
 track.querySelectorAll('button').forEach(b=>{const i=+b.dataset.station;b.disabled=i>=source;b.setAttribute('aria-pressed',String(i===target&&i<source));b.classList.toggle('on-route',i>=target&&i<=source);b.classList.toggle('starting-station',i===source);setText(b.querySelector('small'),i===source?'Starting brew':i>source?'Unavailable':i===target?'Your finish':'');});
 }
 document.addEventListener('kode-path-change',update);choice.addEventListener('click',()=>queueMicrotask(update));select.addEventListener('change',update);
 new MutationObserver(update).observe(select,{childList:true});new MutationObserver(update).observe(choice.querySelector('.choice-heading'),{childList:true,subtree:true});update();
});
