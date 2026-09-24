import type { Metadata } from "next";
import "./globals.css";
import "./pop.css";
import "./motion-pop.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/editorial";
import { Motion } from "@/components/motion";
import { asset } from "@/lib/site";
export const dynamic = "force-static";
export const metadata: Metadata = {
  metadataBase: new URL("https://zhugg.github.io/paillettes-et-paves/"),
  title: { default: "Paillettes & Pavés — Cabaret marionnettique", template: "%s · Paillettes & Pavés" },
  description: "Un cabaret marionnettique d’agitation politique et d’éducation populaire. Des marionnettes, de la musique et une furieuse envie de faire collectif.",
  robots: { index: false, follow: false },
  icons: { icon: asset("/favicon.svg") },
};
export default function RootLayout({children}:Readonly<{children:React.ReactNode}>) {
  return <html lang="fr"><head><link rel="preload" href={asset("/fonts/Aileron-Black.otf")} as="font" type="font/otf" crossOrigin="anonymous"/></head><body><a className="skip-link" href="#contenu">Aller au contenu</a><Header/><main id="contenu">{children}</main><Footer/><Motion/></body></html>;
}
