import type { Metadata } from "next";
import Link from "@/components/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { articles } from "@/content/articles";
import { asset } from "@/lib/site";
export function generateStaticParams(){return articles.map(a=>({slug:a.slug}));}
export const dynamicParams=false;
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params; const a=articles.find(a=>a.slug===slug);return {title:a?.title??"Article introuvable",description:a?.excerpt};}
export default async function Article({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const a=articles.find(a=>a.slug===slug);if(!a)notFound();const other=articles.find(b=>b.slug!==slug)!;return <article><div className="wrap article-top"><Link className="text-link" href="/actualites"><ArrowLeft size={18}/> Le journal du cabaret</Link><p className="kicker">{a.category} <span>· {a.reading} de lecture</span></p><h1 className="display">{a.title}</h1><p className="article-deck">{a.excerpt}</p></div><div className="wrap article-cover"><img src={asset("/images/"+a.image+".webp")} alt={a.alt} width="848" height="478"/></div><div className="article-body">{a.body.trim().split(/\n\s*\n/).map((block,i)=>block.startsWith("## ")?<h2 key={i}>{block.slice(3)}</h2>:<p key={i}>{block}</p>)}<div className="article-actions"><Link className="button button-dark" href="/agenda">Voir les rendez-vous <ArrowRight size={18}/></Link><Link className="text-link" href="/contact">Contacter la compagnie</Link></div><aside className="next-article"><p className="kicker">À lire aussi</p><Link href={"/actualites/"+other.slug}>{other.title} <ArrowRight/></Link></aside></div></article>;}
