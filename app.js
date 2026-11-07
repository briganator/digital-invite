(async()=>{
const c=await (await fetch('config.json')).json(),$=s=>document.querySelector(s);
for(const[k,v]of Object.entries(c.colors))document.documentElement.style.setProperty('--'+k,v);
$('#names').innerHTML=c.names.join(' <br>&amp;<br> ');
$('#tagline').textContent=c.tagline;$('#date').textContent=c.dateDisplay;
$('#vname').textContent=c.venue.name;$('#vaddr').textContent=c.venue.address;
$('#map').href=c.venue.mapUrl||'https://maps.google.com/?q='+encodeURIComponent(c.venue.address);
$('#sched').innerHTML=c.schedule.map(s=>`<li><b>${s.time}</b> — ${s.item}</li>`).join('');
$('#deadline').textContent=c.rsvp.deadline;
$('#seal').onclick=()=>{document.body.classList.add('opening');setTimeout(()=>document.body.classList.add('open'),5200)};
$('#rsvp').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));
 localStorage.setItem('rsvp',JSON.stringify({...d,at:new Date().toISOString()}));
 $('#rsvpmsg').textContent='Thank you! Your RSVP is saved on this device.';
 if(c.rsvp.email)location.href=`mailto:${c.rsvp.email}?subject=${encodeURIComponent('RSVP: '+d.name)}&body=${encodeURIComponent(`${d.name}\n${d.attend}\nGuests: ${d.guests}\n${d.note}`)}`;};
const f=s=>s.replace(/[-:]/g,'').slice(0,15);
const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//digital-invite//EN\r\nBEGIN:VEVENT\r\nUID:${Date.now()}@invite\r\nDTSTAMP:${f(new Date().toISOString())}Z\r\nDTSTART:${f(c.startISO)}\r\nDTEND:${f(c.endISO)}\r\nSUMMARY:${c.names.join(' & ')} Wedding\r\nLOCATION:${c.venue.name}, ${c.venue.address}\r\nEND:VEVENT\r\nEND:VCALENDAR`;
$('#ics').href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));$('#ics').download='wedding.ics';
if(c.music){const a=$('#audio');a.src=c.music;$('#music').hidden=false;$('#music').onclick=()=>a.paused?a.play():a.pause();}
})();
