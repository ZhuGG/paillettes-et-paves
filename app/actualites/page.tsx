import type { Metadata } from "next";
import { PageIntro, News, Marquee } from "@/components/editorial";
export const metadata:Metadata={title:"Actualités",description:"La vie du cabaret Paillettes & Pavés : nouvelle saison, histoire du projet et coulisses."};
export default function Page(){return <><PageIntro art="sardines" kicker="Le journal du cabaret" title="DES NOUVELLES" accent="DU FRONT DE SCÈNE."><p>La vie du spectacle, les histoires du collectif<br />et ce qui se prépare dans les coulisses.</p></PageIntro><News heading={false}/><Marquee text="DES MOTS. DES IDÉES. ET LA SUITE DE L’HISTOIRE."/></>;}
