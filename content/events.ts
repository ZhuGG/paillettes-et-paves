export type Format = "Show" | "Conférence / table ronde" | "Concert" | "Événement";
export type Performance = {id:string;date:string;title:string;venue:string;city:string;access:string;url?:string;time?:string;formats:Format[]};
export const performances:Performance[]=[
{id:"acte-1",date:"2026-10-10",title:"Acte 1 · Grottesque Chaos",venue:"Grrrnd Zero",city:"Vaulx-en-Velin",time:"21 h 45",access:"Modalités auprès du festival",formats:["Show"],url:"https://www.grrrndzero.org/index.php/2817-sam-10-et-dim-11-10-grottesque-chaos-festival"},
...([["2026-11-13","2"],["2026-12-11","3"],["2027-01-15","4"],["2027-03-05","6"],["2027-04-30","9"]]).map(([date,act])=>({id:"acte-"+act,date,title:"Acte "+act+" · Paillettes & Pavés",venue:"MPT – Salle des Rancy",city:"Lyon",access:"Prix libre",formats:["Show"] as Format[],url:"https://www.lesrancy.fr/evenements/paillettes-et-paves/"})),
{id:"acte-3-2",date:"2026-12-12",title:"Acte 3.2 · Paillettes & Pavés",venue:"Blast art · Vaise",city:"Lyon",access:"Horaire et accès à venir",formats:["Show","Concert"]},
...([["2027-04-07","7"],["2027-04-21","8"]]).map(([date,act])=>({id:"acte-"+act,date,title:"Acte "+act+" · Paillettes & Pavés",venue:"Théâtre Le Guignol de Lyon",city:"Lyon",access:"Modalités auprès du théâtre",formats:["Show"] as Format[],url:"https://www.theatreleguignoldelyon.fr/paillettesetpav%C3%A9s-th%C3%A9%C3%A2treleguignoldelyon"})),
];
export const pendingPerformance={title:"Acte 5 · Paillettes & Pavés",venue:"Le Bouy d’en haut · avec le centre culturel Le Bief",city:"Ambert (63)"};
export function splitPerformances(items:Performance[],today:string){const ordered=[...items].sort((a,b)=>a.date.localeCompare(b.date));return {upcoming:ordered.filter(e=>e.date>=today),past:ordered.filter(e=>e.date<today).reverse()};}
export function parisToday(){return new Intl.DateTimeFormat("sv-SE",{timeZone:"Europe/Paris",year:"numeric",month:"2-digit",day:"2-digit"}).format(new Date());}
