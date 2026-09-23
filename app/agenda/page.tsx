import type { Metadata } from "next";
import { PageIntro, ProCallout } from "@/components/editorial";
import { Agenda } from "@/components/agenda";
import { parisToday } from "@/content/events";
export const metadata:Metadata={title:"Agenda",description:"Les prochaines représentations de Paillettes & Pavés : dates, lieux et informations pratiques."};
export default function Page(){return <><PageIntro kicker="Agenda · Saison 2026–2027" title="ON SORT." accent="ON SE RETROUVE."><p>Le cabaret prend tout son sens quand on est ensemble.<br />Choisissez un rendez-vous, le lieu vous donne la suite.</p></PageIntro><Agenda initialDate={parisToday()}/><ProCallout/></>;}
