import type { Metadata } from "next";
import Link from "@/components/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Kicker } from "@/components/editorial";
import { partners } from "@/content/company";
export const metadata: Metadata = {title:"Les liens du collectif",description:"Partenaires, rencontres et prolongements du projet Paillettes & Pavés."};
export default function Resources(){return <>
  <PageIntro art="sardines" kicker="Les liens du collectif" title="ON NE JOUE" accent="PAS EN SOLO."><p>Les lieux qui nous accueillent, les idées que l’on partage et les rencontres qui prolongent le spectacle.</p></PageIntro>
  <section className="wrap resource-grid">
    <article className="resource-block"><Kicker>Les partenaires</Kicker><h2>Celles et ceux qui<br/>rendent la rencontre possible.</h2><ul className="resource-list">{partners.map(name=><li key={name}>{name}</li>)}</ul><a className="text-link" href="https://www.lesrancy.fr/evenements/paillettes-et-paves/" target="_blank" rel="noopener noreferrer">Le cabaret aux Rancy <ArrowUpRight size={18}/><span className="sr-only"> — nouvel onglet</span></a></article>
    <article className="resource-block"><Kicker>Rencontres · En préparation</Kicker><h2>Les idées sortent<br/>du castelet.</h2><p>Des conférences et tables rondes autour de l’éducation populaire, en collaboration avec l’Université populaire de Villeurbanne.</p><Link className="text-link" href="/spectacle">Les nouveaux formats <ArrowUpRight size={18}/></Link></article>
    <article className="resource-block"><Kicker>Concerts · En préparation</Kicker><h2>Faire de la place<br/>à la musique.</h2><p>Des soirées festives avec les artistes du cabaret et des invité·es surprise. Les rendez-vous seront annoncés dans l’agenda.</p><Link className="text-link" href="/invites">Les artistes du cabaret <ArrowUpRight size={18}/></Link></article>
    <article className="resource-block"><Kicker>Collectifs & lieux militants</Kicker><h2>Et si on faisait<br/>quelque chose ensemble ?</h2><p>Une rencontre, un lieu à faire vivre, un projet à partager : le collectif commence par une conversation.</p><Link className="text-link" href="/contact">Prendre contact <ArrowUpRight size={18}/></Link></article>
  </section>
</>;}
