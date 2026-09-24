import type { Metadata } from "next";
import Link from "@/components/link";
import { ArrowUpRight } from "lucide-react";
import { PageIntro, Kicker, ProCallout } from "@/components/editorial";
import { previousArtists, previousSpeakers } from "@/content/company";
export const metadata: Metadata = {title:"Les invité·es",description:"Les artistes et les voix qui font vivre le cabaret Paillettes & Pavés."};
export default function Guests(){return <>
  <PageIntro art="trio-lsd" kicker="Les invité·es du cabaret" title="DES VOIX." accent="PAS UN MONOLOGUE."><p>Sur le même plateau : la musique, les sciences sociales, les luttes et la joie de se rencontrer.</p></PageIntro>
  <section className="guests-section"><div className="wrap section-space"><Kicker>Ils et elles étaient avec nous · Saison 2025–2026</Kicker><div className="guest-grid"><div><h2 className="display">Les paillettes.</h2><p>Musique, drag, rap, chorale et humour.</p><ul>{previousArtists.map(name=><li key={name}>{name}</li>)}</ul></div><div><h2 className="display">Les pavés.</h2><p>Vie associative, sciences sociales et engagements.</p><ul>{previousSpeakers.map(name=><li key={name}>{name}</li>)}</ul></div></div></div></section>
  <section className="wrap pop-connections section-space"><div><Kicker>Saison 2026–2027</Kicker><h2 className="display">Et la suite ?<br/><em>Ensemble.</em></h2></div><div><p>Les prochaines rencontres se préparent. Retrouvez les dates annoncées et les informations de chaque lieu dans l’agenda.</p><Link href="/agenda" className="text-link">Les prochains rendez-vous <ArrowUpRight size={20}/></Link></div></section><ProCallout/>
</>;}
