'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const by=id=>document.getElementById(id),panel=by('foundationPrep'),copy=panel.querySelector('.prep-copy');
 const header=document.createElement('div');header.className='lesson-heading';header.append(by('prepCount'),by('prepTitle'));
 const body=document.createElement('div');body.className='lesson-body';body.append(by('prepText'),by('prepZoneLesson'),by('waterPractice'));
 const footer=document.createElement('div');footer.className='lesson-footer';footer.setAttribute('role','group');footer.setAttribute('aria-label','Learning slide navigation');footer.append(by('prepDots'),panel.querySelector('.prep-actions'));
 copy.replaceChildren(header,body);panel.append(footer);panel.classList.add('kode-lesson');
 const polished=document.createElement('div');polished.className='lesson-copy-text';by('prepText').after(polished);by('prepText').hidden=true;
 function formatCopy(){const lines=by('prepText').textContent.split('\n').map(x=>x.trim()).filter(Boolean);polished.replaceChildren();let list=null;for(const line of lines){if(line.startsWith('•')){if(!list){list=document.createElement('ul');polished.append(list);}const item=document.createElement('li');item.textContent=line.slice(1).trim();list.append(item);}else{list=null;const paragraph=document.createElement('p');paragraph.textContent=line;polished.append(paragraph);}}}
 new MutationObserver(formatCopy).observe(by('prepText'),{childList:true,characterData:true,subtree:true});formatCopy();
 function fit(){if(panel.hidden)return;const small=window.innerWidth<=600;const available=window.innerHeight-panel.getBoundingClientRect().top-18;panel.style.setProperty('--lesson-height',Math.max(450,Math.min(620,available))+'px');panel.classList.toggle('lesson-small',small);}
 let pending=false;const schedule=()=>{if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;fit()});};
 new MutationObserver(schedule).observe(panel,{attributes:true,attributeFilter:['hidden','data-lesson']});window.addEventListener('resize',schedule);document.fonts?.ready.then(schedule);schedule();
});
