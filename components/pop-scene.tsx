"use client";
import type { PointerEvent } from "react";
import { asset } from "@/lib/site";

export function PopScene(){
  function move(event:PointerEvent<HTMLDivElement>){
    if(event.pointerType!=="mouse" || document.documentElement.dataset.motion==="off") return;
    const r=event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mx",`${((event.clientX-r.left)/r.width-.5)*18}px`);
    event.currentTarget.style.setProperty("--my",`${((event.clientY-r.top)/r.height-.5)*14}px`);
  }
  function reset(event:PointerEvent<HTMLDivElement>){event.currentTarget.style.setProperty("--mx","0px");event.currentTarget.style.setProperty("--my","0px");}
  return <div className="pop-hero-stage assembled-scene" onPointerMove={move} onPointerLeave={reset}>
    <span className="scene-backdrop" aria-hidden="true"/>
    <p className="pop-edition">SAISON<br/><strong>26—27</strong></p>
    <div className="scene-parallax">
      <div className="scene-piece scene-left"><img src={asset("/images/pop/yves-jm.webp")} alt="" width="1100" height="1280" fetchPriority="high"/></div>
      <div className="scene-piece scene-right"><img src={asset("/images/pop/trio-hibiscus.webp")} alt="" width="1100" height="1437" fetchPriority="high"/></div>
      <div className="scene-piece scene-front"><img src={asset("/images/pop/marcel.webp")} alt="Marcel, le lapin rose, entouré de la bande du cabaret en illustrations pop" width="1100" height="1520" fetchPriority="high"/></div>
    </div>
    <span className="scene-shout" aria-hidden="true">ÇA VA<br/>CAUSER.</span>
    <span className="pop-stage-label">La mousse prend la parole.</span>
  </div>;
}
