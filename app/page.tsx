import Link from "@/components/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { asset } from "@/lib/site";
import { Kicker, Marquee, News, ProCallout } from "@/components/editorial";
import { Agenda } from "@/components/agenda";
import { PopScene } from "@/components/pop-scene";
import { CastGallery } from "@/components/cast-gallery";
import { Community } from "@/components/community";
import { parisToday } from "@/content/events";
export default function Home() { return <>
  <section className="pop-hero" aria-labelledby="hero-heading"><div className="pop-hero-main wrap">
    <div className="pop-hero-copy"><Kicker>La Compagnie Monstre présente</Kicker><h1 id="hero-heading"><span className="sr-only">Paillettes & Pavés</span><img className="hero-wordmark" src={asset("/images/pop/logo-pink.webp")} alt="" width="1400" height="475" fetchPriority="high"/></h1><p className="pop-hero-title">Le cabaret qui<br/>fait du <em>bruit.</em></p><p className="pop-hero-description">Marionnettes, agitation politique<br/>& éducation populaire.</p><div className="pop-hero-actions"><Link className="button button-dark" href="/agenda">Les dates & les invité·es <ArrowUpRight size={20}/></Link><Link className="text-link" href="/spectacle">Le show <ArrowUpRight size={18}/></Link></div></div>
    <PopScene/>
  </div><div className="hero-footnote wrap"><span>UN CABARET VIVANT. DES ESPRITS LIBRES.</span><a href="#rendez-vous">Entrez dans la danse <ArrowDown size={17}/></a></div></section>
  <Marquee/>
  <div id="rendez-vous" className="pop-agenda"><Agenda initialDate={parisToday()} home/><div className="wrap agenda-guests"><span>Des artistes, des voix, des idées.</span><Link className="text-link" href="/invites">Rencontrer les invité·es <ArrowUpRight size={18}/></Link></div></div>
  <News/>
  <section id="le-projet" className="pop-manifesto"><div className="wrap pop-manifesto-inner"><div className="pop-duo" data-reveal><img src={asset("/images/pop/zaza-marcel.webp")} alt="Marcel et Zaza, le duo de marionnettes en rose" width="1242" height="1600" loading="lazy"/><span>Pas leur langue<br/>dans leur poche.</span></div><div className="pop-manifesto-copy" data-reveal><Kicker>Le projet Paillettes & Pavés</Kicker><h2 className="display">Pas sages.<br/>Bien <em>vivant·es.</em></h2><p className="lead">De la mousse, mais pas<br/>que dans la tête.</p><p>Marcel Piniol, Zaza et leur bande décryptent l’actualité avec humour et second degré. Sur scène : des artistes, des invité·es, de la musique et une furieuse envie de faire collectif.</p><p>On vient pour rire. On reste pour comprendre.<br/>Et on repart avec l’envie de se retrouver.</p><Link href="/compagnie" className="text-link">L’histoire & le collectif <ArrowUpRight size={19}/></Link></div></div></section>
  <CastGallery/>
  <section className="pop-live"><div className="pop-live-image"><img src={asset("/images/cabaret.webp")} alt="Les marionnettes sur le castelet éclairé, pendant le cabaret" width="848" height="478" loading="lazy"/></div><div className="pop-live-copy"><Kicker>Le show · 1 h 30 de spectacle vivant</Kicker><h2 className="display">La politique<br/>entre<br/><em>en scène.</em></h2><p>Ça chante, ça râle, ça rit.<br/>Et ça se rencontre, pour de vrai.</p><Link className="text-link" href="/spectacle">Découvrir le show <ArrowUpRight size={20}/></Link></div></section>
  <section className="pop-quote"><div className="wrap"><Kicker>Notre façon de tenir debout</Kicker><p>Mieux vaut<br/><em>en rire</em><br/>qu’en crever !</p><img src={asset("/images/pop/sardines.webp")} alt="" width="1117" height="1600" loading="lazy"/></div></section>
  <Community/>
  <section className="pop-connections wrap section-space"><div><Kicker>Faire circuler les idées</Kicker><h2 className="display">Ça continue<br/><em>hors scène.</em></h2></div><div><p>Les partenaires, les rencontres et les voix qui font vivre le projet au-delà du cabaret.</p><Link className="text-link" href="/ressources">Explorer les liens du collectif <ArrowUpRight size={20}/></Link></div></section><ProCallout/>
</>; }
