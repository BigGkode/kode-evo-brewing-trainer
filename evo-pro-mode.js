'use strict';
document.addEventListener('DOMContentLoaded', () => {
 const $ = id => document.getElementById(id);
 const app = $('kob-app'), play = $('simPlay'), restart = $('simRestart'), clock = $('simClock');
 if (!app || !play || !restart || !clock) return;
 const toolbar = app.querySelector('.foundation-toolbar');
 const panel = document.createElement('section');
 panel.id = 'kodeProMode';
 panel.setAttribute('aria-label', 'EVO Pro brewing');
 panel.innerHTML = '<label class="kode-pro-switch"><input id="kodeProEnabled" type="checkbox"> EVO Pro · guided hands-free brewing</label><div id="kodeProControls" hidden><p id="kodeProStatus" role="status" aria-live="polite">Choose your recipe, then start.</p><div class="kode-pro-buttons"><button type="button" id="kodeProStart">Start Brew</button><button type="button" id="kodeProPause" disabled>Pause</button><button type="button" id="kodeProStop" disabled>Stop</button></div><small>Automatic timed stages, spoken instructions and chimes. No microphone or voice activation.</small></div>';
 toolbar.after(panel);
 const css = document.createElement('style');
 css.textContent = '#kob-app #kodeProMode{padding:12px 16px;margin:8px 0 14px;border:1px solid #ccd6cd;border-radius:9px;background:#fffdf7;color:#173f46}#kob-app .kode-pro-switch{font-weight:700;display:flex;align-items:center;gap:10px}#kob-app #kodeProControls{margin-top:10px}#kob-app #kodeProStatus{margin:4px 0 10px;font-size:15px}#kob-app .kode-pro-buttons{display:flex;gap:8px;flex-wrap:wrap}#kob-app .kode-pro-buttons button{min-height:44px;padding:9px 16px;border-radius:7px;border:1px solid #173f46;background:#fff;color:#173f46;font-weight:700}#kob-app #kodeProStart{background:#173f46;color:white}#kob-app .kode-pro-buttons button:disabled{opacity:.45}#kob-app #kodeProMode small{display:block;margin-top:9px;color:#536b65}#kob-app.kode-pro-active .playback-controls{display:none}';
 document.head.append(css);
 const enabled = $('kodeProEnabled'), controls = $('kodeProControls'), start = $('kodeProStart'), pause = $('kodeProPause'), stop = $('kodeProStop'), status = $('kodeProStatus');
 let active = false, paused = false, lastPhase = '', lastTime = 0, lastRunning = false, audio = null, audioEnabled = false;
 function sound() {
  if (!audioEnabled) return;
  try { audio ||= new (window.AudioContext || window.webkitAudioContext)(); if (audio.state === 'suspended') audio.resume(); const oscillator = audio.createOscillator(), gain = audio.createGain(), now = audio.currentTime; oscillator.type = 'sine'; oscillator.frequency.setValueAtTime(880,now); gain.gain.setValueAtTime(.0001,now); gain.gain.exponentialRampToValueAtTime(.11,now+.015); gain.gain.exponentialRampToValueAtTime(.0001,now+.22); oscillator.connect(gain); gain.connect(audio.destination); oscillator.start(now); oscillator.stop(now+.23); } catch (_) {}
 }
 function say(message) {
  sound();
  if (!('speechSynthesis' in window)) return;
  try { window.speechSynthesis.cancel(); const utterance = new SpeechSynthesisUtterance(message); utterance.lang = 'en-GB'; utterance.rate = .95; window.speechSynthesis.speak(utterance); } catch (_) {}
 }
 function silence() { try { window.speechSynthesis?.cancel(); } catch (_) {} }
 function phaseName(phase, time, state) {
  if (state.complete) return ['complete','Brew complete. Remove the brewer and enjoy.'];
  if (phase === 'bloom') return ['bloom','Begin the bloom pour. Follow the recipe weight and pour rate.'];
  if (phase === 'pour') return ['pour-'+Math.floor(time/10),'Begin the next pour. Follow the target weight.'];
  if (phase === 'pause') return ['rest','Pause pouring. Let the coffee bloom or settle.'];
  if (phase === 'draw') return ['draw','Pouring finished. Allow the coffee to draw down.'];
  return [phase, 'Continue the brew.'];
 }
 function buttons() { start.disabled = active; pause.disabled = !active; stop.disabled = !active; pause.textContent = paused ? 'Resume' : 'Pause'; }
 function reset() { active=false;paused=false;lastPhase='';lastTime=0;lastRunning=false;silence();app.classList.remove('kode-pro-active');status.textContent='Choose your recipe, then start.';buttons(); }
 enabled.addEventListener('change',()=>{controls.hidden=!enabled.checked;if(!enabled.checked) { if(active) restart.click();reset(); }});
 start.onclick=()=>{
  if (!enabled.checked) return;
  audioEnabled=true;
  // Existing simulation owns the recipe timing and animation.
  restart.click(); active=true;paused=false;lastPhase='';lastTime=0;lastRunning=false;app.classList.add('kode-pro-active');buttons();
  play.click();
  const state=window.kodeBrewState;
  if (!state?.running) {reset();status.textContent='Select a recipe and complete preparation before starting Pro Mode.';return;}
  status.textContent='Brewing · follow the spoken instructions';say('Start brew. Begin the bloom pour.');
 };
 pause.onclick=()=>{
  if (!active) return;
  if (!paused) {if(window.kodeBrewState?.running)play.click();paused=true;silence();status.textContent='Paused';}
  else {paused=false;if(!window.kodeBrewState?.running)play.click();status.textContent='Brewing · resumed';say('Resume brewing.');}
  buttons();
 };
 stop.onclick=()=>{restart.click();reset();status.textContent='Brew stopped.';};
 function update(){
  if (!active || paused) return;
  const state=window.kodeBrewState;
  if (!state || !state.hasStarted) return;
  const t=Number(state.time)||0;
  if (state.complete) {status.textContent='Brew complete';say('Brew complete. Remove the brewer and enjoy.');active=false;app.classList.remove('kode-pro-active');buttons();return;}
  // In the standard trainer a following pour can wait for another press.
  // Pro mode resumes that handoff automatically, without manual Next.
  if (!state.running && lastRunning && t>=lastTime && t>0) {play.click();}
  const [key,message]=phaseName(state.phase,t,state);
  // Stage changes, rather than elapsed seconds, trigger instructions.
  if (key!==lastPhase) {lastPhase=key;status.textContent=message;if(t>0.5)say(message);}
  lastTime=t;lastRunning=!!window.kodeBrewState?.running;
 }
 const observer=new MutationObserver(update);
 observer.observe(clock,{childList:true,characterData:true,subtree:true});
 buttons();
});
