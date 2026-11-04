'use strict';
document.addEventListener('DOMContentLoaded',()=>{
 const home=document.getElementById('brewWelcome');if(!home)return;home.classList.add('landing-v3');
 const hero=document.createElement('div');hero.className='evo-landing-hero';
 const fins=Array.from({length:24},(_,i)=>'<path d="M-2 -43 L-5 -84 L-2 -103 L2 -106 L3 -82 L2 -43Z" transform="rotate('+i*15+')"/>').join('');
 hero.innerHTML='<div class="evo-landing-copy"><span class="foundation-kicker">KODE · FB45 × EVO</span><h2>More from<br>your coffee<span>.</span></h2><p>The EVO brewing system.<br>Designed for the FB45.</p><span class="evo-landing-purpose">Respect the coffee. Realise its potential.</span></div><svg class="evo-landing-vessel" viewBox="0 0 300 300" role="img" aria-label="Stylised top view of the FB45: radial receptors around its flat central base"><defs><radialGradient id="evoVesselDepth"><stop offset="0" stop-color="#254d51"/><stop offset="1" stop-color="#102d32"/></radialGradient></defs><g transform="translate(150 150)"><circle r="134" fill="#173f46"/><circle r="126" fill="#f3f0e6" stroke="#6d8d8b" stroke-width="2"/><circle r="119" fill="url(#evoVesselDepth)"/><circle r="109" fill="none" stroke="#72918b" stroke-width="1"/><g fill="#e1e4d6">'+fins+'</g><circle r="42" fill="#173f46" stroke="#97ada1" stroke-width="1.5"/><circle r="34" fill="none" stroke="#557879" stroke-width="1"/><path d="M-15 0H15M0 -15V15" stroke="#91a59b" stroke-width="1"/></g></svg>';
 const cards=home.querySelector('.method-cards');home.prepend(hero);
 for(const el of Array.from(home.children)){if(el.matches('h2,.foundation-kicker,.method-hero-lead,.evo-home-promise'))el.remove();}
 for(const [id,title,copy] of [['foundationMethod','Foundation','Choose your dose. Brew to your strength.'],['dilutionMethod','Dilution','Start stronger. Add water. Find your finish.']]){
  const article=document.getElementById(id);article.querySelector('h3').textContent=title;article.querySelectorAll(':scope>p').forEach(p=>p.textContent=copy);
  const dots=document.createElement('div');dots.className='landing-strengths';dots.setAttribute('aria-hidden','true');dots.innerHTML='<span>FIND YOUR STRENGTH</span>'+['#e1c8a2','#c29c72','#96613e','#70452f','#4e301f'].map(c=>'<i style="background:'+c+'"></i>').join('');article.querySelector('h3').after(dots);
 }
 document.getElementById('startMaking').textContent='Choose Foundation →';document.getElementById('beginDilutionMethod').textContent='Explore Dilution →';
});
