"use client";
import { useState, useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { asset } from "@/lib/site";
const portraits=[
  {image:"marcel",name:"Marcel Piniol",line:"Le lapin révolutionnaire.",color:"pink"},
  {image:"zaza-marcel",name:"Marcel & Zaza",line:"Deux voix. Zéro langue de bois.",color:"yellow"},
  {image:"yves-jm",name:"La bande s’en mêle",line:"Des caractères bien trempés.",color:"mint"},
  {image:"sardines",name:"Ça ouvre grand",line:"Les oreilles. Et le débat.",color:"lilac"},
  {image:"quatuor",name:"Jamais en solo",line:"La mousse fait collectif.",color:"pink"},
];
export function CastGallery(){
  const [api,setApi]=useState<CarouselApi>();
  const [selected,setSelected]=useState(0);
  useEffect(()=>{if(!api)return;const update=()=>setSelected(api.selectedScrollSnap());update();api.on("select",update);return()=>{api.off("select",update);};},[api]);
  return <section className="cast-section"><div className="wrap"><div className="section-heading"><div><p className="kicker">Les grandes gueules du cabaret</p><h2 className="display">De sacrés<br/><em>caractères.</em></h2></div><p className="cast-hint">Faites défiler la bande.<br/>Promis, elle ne mord pas.</p></div>
    <Carousel setApi={setApi} opts={{align:"start",loop:true}} className="cast-carousel" aria-label="La bande de marionnettes" tabIndex={0}>
      <CarouselContent className="cast-track">{portraits.map((p,i)=><CarouselItem key={p.image} className="cast-slide" aria-label={`${i+1} sur ${portraits.length} : ${p.name}`}><div className={"cast-portrait cast-"+p.color}><div className="cast-disc"/><img src={asset("/images/pop/"+p.image+".webp")} alt={p.name+", illustration pop"} width="700" height="960" loading="lazy" draggable={false}/></div><div className="cast-caption"><h3>{p.name}</h3><p>{p.line}</p></div></CarouselItem>)}</CarouselContent>
      <div className="cast-toolbar"><p aria-live="polite" aria-atomic="true"><strong>{String(selected+1).padStart(2,"0")}</strong><span> / {String(portraits.length).padStart(2,"0")}</span></p><div><CarouselPrevious className="cast-control" aria-label="Personnage précédent"/><CarouselNext className="cast-control" aria-label="Personnage suivant"/></div></div>
    </Carousel></div></section>;
}
