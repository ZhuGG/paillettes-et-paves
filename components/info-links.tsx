import { ArrowUpRight } from "lucide-react";
export const mediaResources=[
{name:"Basta!",description:"Un autre regard sur les questions sociales et écologiques.",url:"https://basta.media/"},
{name:"Rapports de force",description:"Suivre l’actualité des mouvements sociaux.",url:"https://rapportsdeforce.fr/"}];
export const criticalResources=[
{name:"Acrimed",description:"Observer et questionner le traitement de l’information.",url:"https://www.acrimed.org/"},
{name:"Médias français : qui possède quoi ?",description:"La carte du Monde diplomatique et d’Acrimed pour explorer les liens entre médias et propriétaires.",url:"https://www.monde-diplomatique.fr/cartes/PPA"}];
export function InfoLinks({compact=false}:{compact?:boolean}){return <div className="info-links">{[{title:"Des médias indépendants",items:mediaResources},{title:"Qui fabrique l’info ?",items:criticalResources}].map(g=><article key={g.title} data-reveal><h3>{g.title}</h3>{g.items.map(r=><div className="info-resource" key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.name}<ArrowUpRight size={19}/><span className="sr-only"> — nouvel onglet</span></a>{!compact&&<p>{r.description}</p>}</div>)}</article>)}</div>;}
