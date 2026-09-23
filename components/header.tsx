"use client";
import Link from "@/components/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Pause, Play, X } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { nav } from "@/lib/site";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setPaused(media.matches); document.documentElement.dataset.motion = media.matches ? "off" : "on"; };
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  function toggle() { const value = !paused; setPaused(value); document.documentElement.dataset.motion = value ? "off" : "on"; }
  return <header className="site-header"><div className="header-inner">
    <Link href="/" className="brand" aria-label="Paillettes et Pavés — accueil">PAILLETTES<span><b>&</b> PAVÉS<span className="brand-dot">.</span></span></Link>
    <nav className="desktop-nav" aria-label="Navigation principale">{nav.map(n => <Link key={n.href} href={n.href} aria-current={pathname.startsWith(n.href) ? "page" : undefined}>{n.label}</Link>)}</nav>
    <div className="header-actions"><Link className="contact-link" href="/contact">On se parle ? <span aria-hidden="true">↗</span></Link><button type="button" className="motion-toggle" onClick={toggle} aria-label={paused ? "Activer les animations" : "Mettre en pause les animations"} title={paused ? "Activer les animations" : "Mettre en pause les animations"} aria-pressed={paused}>{paused ? <Play size={16} /> : <Pause size={16} />}</button>
    <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className="mobile-toggle" aria-label="Ouvrir le menu"><Menu size={26} /></button></SheetTrigger><SheetContent className="mobile-panel" showCloseButton={false}><SheetTitle className="menu-title">ENTREZ EN SCÈNE.</SheetTitle><SheetDescription className="sr-only">Navigation du site Paillettes et Pavés</SheetDescription><SheetClose className="menu-close" aria-label="Fermer le menu"><X /></SheetClose><nav aria-label="Navigation mobile"><Link href="/" onClick={() => setOpen(false)}>Accueil</Link>{nav.map(n => <Link key={n.href} href={n.href} onClick={() => setOpen(false)} aria-current={pathname.startsWith(n.href) ? "page" : undefined}>{n.label}</Link>)}<Link href="/contact" onClick={() => setOpen(false)}>Contact</Link></nav><p>Des marionnettes.<br />Des idées. Du collectif.</p></SheetContent></Sheet>
    </div></div></header>;
}
