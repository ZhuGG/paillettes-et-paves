"use client";
import { useEffect, useState } from "react";
import Link from "@/components/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { performances, splitPerformances, parisToday, type Performance } from "@/content/events";
const months = ["JAN","FÉV","MARS","AVR","MAI","JUIN","JUIL","AOÛT","SEPT","OCT","NOV","DÉC"];
function EventRow({event, past=false}: {event:Performance; past?:boolean}) {
  const [year, month, day] = event.date.split("-");
  return <article className={"event-row"+(past?" past-event":"")}><time dateTime={event.date} className="event-date"><strong>{day}</strong><span>{months[Number(month)-1]}<small>{year}</small></span></time><div className="event-info"><h3>{event.title}</h3><p>{event.venue} <span>· {event.city}</span></p>{event.time && <p>{event.time}</p>}</div><span className="event-access">{past ? "Passé" : event.access}</span><a className="event-action" href={event.url} target="_blank" rel="noopener noreferrer" aria-label={(past?"Consulter":"Informations sur")+" la représentation du "+new Date(event.date+"T12:00:00").toLocaleDateString("fr-FR")+" aux Rancy — nouvel onglet"}><span>Infos & accès</span><ArrowUpRight size={22}/></a></article>;
}
export function Agenda({initialDate, home=false}: {initialDate:string; home?:boolean}) {
  const [today,setToday] = useState(initialDate);
  useEffect(() => {
    const refresh=()=>setToday(parisToday()); refresh();
    const timer=window.setInterval(refresh,60000); return ()=>window.clearInterval(timer);
  },[]);
  const {upcoming,past}=splitPerformances(performances,today);
  if(home) return <section className="next-date wrap section-space" data-reveal><div className="section-heading"><div><p className="kicker">On se retrouve en vrai</p><h2 className="display">PROCHAIN<br /><span className="pink">RENDEZ-VOUS.</span></h2></div><Link href="/agenda" className="text-link">Tout l’agenda <ArrowRight size={18}/></Link></div>{upcoming[0]?<EventRow event={upcoming[0]}/>:<p className="empty-state">La suite se prépare. Les prochaines dates seront annoncées ici.</p>}</section>;
  return <div className="wrap agenda-content"><section aria-labelledby="upcoming"><div className="agenda-label"><h2 id="upcoming">À venir</h2><span>{upcoming.length} rendez-vous</span></div>{upcoming.length?upcoming.map(e=><EventRow key={e.id} event={e}/>):<p className="empty-state">Les prochaines dates seront annoncées ici. En attendant, retrouvez la vie du cabaret dans les actualités.</p>}<p className="agenda-note">Les horaires et modalités d’accueil sont précisés par chaque lieu. Pour ces rendez-vous, consultez les informations des Rancy.</p></section><section className="archives" aria-labelledby="archives"><div className="agenda-label"><h2 id="archives">Les dates passées</h2><span>Archives de cette saison</span></div>{past.length?past.map(e=><EventRow key={e.id} event={e} past/>):<p>La saison commence en novembre. Les rendez-vous passés se retrouveront ici.</p>}</section></div>;
}
