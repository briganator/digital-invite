(async()=>{
const $=s=>document.querySelector(s),q=new URLSearchParams(location.search),B=document.body,H=document.documentElement;
const c=await (await fetch('config.json')).json();
const RM=matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc=s=>String(s).replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
H.dataset.theme=q.get('theme')||c.theme||'blush';H.dataset.seal=q.get('seal')||c.sealColor||'burgundy';
const [a,b]=c.names;$('.n1').textContent=a;$('.n2').textContent=b;
$('.pk-names').innerHTML=esc(a)+'<br>&amp; '+esc(b);$('.pk-date').textContent=c.dateDisplay;
$('#tagline').textContent=c.tagline;$('#date').textContent=c.dateDisplay;$('#mono').textContent=c.monogram.join(' · ');
$('#vname').textContent=c.venue.name;$('#vaddr').textContent=c.venue.address;
$('#map').href=c.venue.mapUrl||'https://maps.google.com/?q='+encodeURIComponent(c.venue.name+' '+c.venue.address);
$('#sched').innerHTML=c.schedule.map(s=>`<li><b>${esc(s.time)}</b><span>${esc(s.item)}</span></li>`).join('');
$('#deadline').textContent=c.rsvp.deadline;
const to=(q.get('to')||'').trim().slice(0,60);
if(to){$('#to').textContent='For '+to;$('#to').hidden=false;$('#greet').textContent='Dear '+to+',';$('#greet').hidden=false;$('#rsvp [name=name]').value=to;document.title=to+', you\u2019re invited'}
// countdown
if(c.countdown!==false){const t=new Date(c.startISO),f=()=>{const d=Math.ceil((t-new Date())/864e5);$('#countdown').textContent=d>1?`${d} days to go`+(/PLACEHOLDER/.test(c.dateDisplay)?' (placeholder date)':''):d===1?'Tomorrow!':d===0?'Today!':''};f();setInterval(f,36e5)}
// tilt (closed envelope only, subtle)
const tilt=(x,y)=>{if(RM||B.classList.contains('opening'))return;H.style.setProperty('--ry',(x*3).toFixed(2)+'deg');H.style.setProperty('--rx',(-y*3).toFixed(2)+'deg')};
const T=$('#tilt');T.style.setProperty('--rx','0deg');
addEventListener('pointermove',e=>{if(e.pointerType==='mouse')tilt(e.clientX/innerWidth-.5,e.clientY/innerHeight-.5);T.style.setProperty('--rx',H.style.getPropertyValue('--rx'));T.style.setProperty('--ry',H.style.getPropertyValue('--ry'))});
addEventListener('deviceorientation',e=>{if(e.gamma==null)return;tilt(Math.max(-1,Math.min(1,e.gamma/30)),Math.max(-1,Math.min(1,(e.beta-45)/30)));T.style.setProperty('--rx',H.style.getPropertyValue('--rx'));T.style.setProperty('--ry',H.style.getPropertyValue('--ry'))});
// dust
const cv=$('#dust'),cx=cv.getContext('2d');
function burst(){if(RM||c.particles==='none')return;const r=devicePixelRatio||1;cv.width=innerWidth*r;cv.height=innerHeight*r;cx.scale(r,r);
 const ox=innerWidth/2,oy=innerHeight*.58,gold=c.particles!=='petals',P=[];
 for(let i=0;i<(gold?46:18);i++){const an=Math.random()*Math.PI*2,sp=1+Math.random()*(gold?4:2.5);P.push({x:ox,y:oy,vx:Math.cos(an)*sp,vy:Math.sin(an)*sp-1.5,s:gold?1+Math.random()*2.2:5+Math.random()*5,r:Math.random()*6,l:1})}
 const st=performance.now();(function fr(n){const k=(n-st)/1600;cx.clearRect(0,0,innerWidth,innerHeight);if(k>1)return;
  for(const p of P){p.x+=p.vx;p.y+=p.vy;p.vy+=.05;p.vx*=.985;p.r+=.05;cx.globalAlpha=(1-k)*.9;
   if(gold){cx.fillStyle=Math.random()<.2?'#fff6d8':'#d8b56a';cx.beginPath();cx.arc(p.x,p.y,p.s,0,7);cx.fill()}
   else{cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle='#f1c9cf';cx.beginPath();cx.ellipse(0,0,p.s,p.s/2,0,0,7);cx.fill();cx.restore()}}
  requestAnimationFrame(fr)})(st)}
// music
const au=$('#audio'),mb=$('#music');
function fadeIn(){au.volume=0;au.play().then(()=>{let v=0;const i=setInterval(()=>{v=Math.min(.6,v+.03);au.volume=v;if(v>=.6)clearInterval(i)},120);mb.setAttribute('aria-pressed','true')}).catch(()=>{})}
if(c.music){au.src=c.music;mb.hidden=false;mb.onclick=()=>{if(au.paused)fadeIn();else{au.pause();mb.setAttribute('aria-pressed','false')}}}
// open
const seal=$('#seal'),vib=p=>{try{navigator.vibrate&&navigator.vibrate(p)}catch(e){}};
seal.addEventListener('pointerdown',()=>{seal.classList.add('press');vib(12)});
['pointerup','pointerleave','pointercancel'].forEach(e=>seal.addEventListener(e,()=>seal.classList.remove('press')));
let timer;
function open(){if(B.classList.contains('opening'))return;H.style.setProperty('--rx','0deg');H.style.setProperty('--ry','0deg');T.style.transform='none';
 B.classList.add('opening');vib([18,60,28]);setTimeout(burst,120);if(c.music&&c.musicAutoOnOpen)fadeIn();
 timer=setTimeout(()=>{B.classList.add('open');scrollTo(0,0);$('#card').focus({preventScroll:true})},RM?800:5300)}
seal.addEventListener('click',open);
$('#replay').onclick=()=>{clearTimeout(timer);B.classList.remove('open','opening');T.style.transform='';document.querySelectorAll('.rv').forEach(e=>e.classList.remove('in'));
 void B.offsetWidth;scrollTo(0,0);setTimeout(()=>{seal.focus();},50);setTimeout(open,700)};
// reveals
const io=new IntersectionObserver(es=>es.forEach((e,i)=>{if(e.isIntersecting&&B.classList.contains('opening')){setTimeout(()=>e.target.classList.add('in'),i*120);}}),{threshold:.15});
document.querySelectorAll('.rv').forEach(e=>io.observe(e));
new MutationObserver(()=>{if(B.classList.contains('opening'))document.querySelectorAll('.rv').forEach(e=>{io.unobserve(e);io.observe(e)})}).observe(B,{attributes:true,attributeFilter:['class']});
// rsvp
$('#rsvp').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
 localStorage.setItem('rsvp',JSON.stringify({...d,at:new Date().toISOString()}));
 $('#rsvpmsg').textContent='Thank you, '+d.name+'. Your reply is saved'+(c.rsvp.email?'; your email app will open to send it.':' on this device.');
 if(c.rsvp.email)location.href=`mailto:${c.rsvp.email}?subject=${encodeURIComponent('RSVP: '+d.name)}&body=${encodeURIComponent(`${d.name}\n${d.attend}\nParty of ${d.guests}\n${d.note}`)}`};
// ics
const f=s=>s.replace(/[-:]/g,'').slice(0,15);
const ics=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//digital-invite//EN','BEGIN:VEVENT',`UID:${f(c.startISO)}-${a}-${b}@invite`,`DTSTAMP:${f(new Date().toISOString())}Z`,`DTSTART:${f(c.startISO)}`,`DTEND:${f(c.endISO)}`,`SUMMARY:${a} & ${b} Wedding`,`LOCATION:${c.venue.name}\\, ${c.venue.address}`,'END:VEVENT','END:VCALENDAR'].join('\r\n');
$('#ics').href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));$('#ics').download='wedding.ics';
})();
