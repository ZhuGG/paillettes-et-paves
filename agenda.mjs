// One local editorial file, with public dates filtered again in the browser.
export function parisDay(now=new Date()){
 return new Intl.DateTimeFormat('sv-SE',{timeZone:'Europe/Paris',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
}
export function validDate(value){if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const date=new Date(value+'T12:00:00Z');return Number.isFinite(date.valueOf())&&date.toISOString().slice(0,10)===value;}
export function upcomingEvents(data,today=parisDay()){
 return (Array.isArray(data?.events)?data.events:[]).filter(e=>e.published===true&&e.draft!==true&&validDate(e.date)&&e.date>=today).sort((a,b)=>a.date.localeCompare(b.date));
}
export function eventDate(event,{short=false}={}){
 return new Intl.DateTimeFormat('fr-FR',{timeZone:'Europe/Paris',weekday:short?undefined:'long',day:'numeric',month:short?'short':'long',year:'numeric'}).format(new Date(event.date+'T12:00:00Z'));
}
export function safeEventUrl(value){try{const u=new URL(value);return u.protocol==='https:'?u.href:null;}catch{return null;}}
export function nextInvite(data,today=parisDay()){
 const next=upcomingEvents(data,today)[0];return next?`${eventDate(next)} · ${next.venue} · ${next.city}`:'Les prochains rendez-vous se préparent.';
}
