"use client";
import {useEffect} from "react";
import {usePathname} from "next/navigation";
export function Motion(){const pathname=usePathname();useEffect(()=>{
const nodes=document.querySelectorAll<HTMLElement>("[data-reveal]");
const reveal=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("is-visible");reveal.unobserve(e.target);}}),{threshold:.08});
nodes.forEach(n=>{n.classList.add("reveal-ready");reveal.observe(n);});
const stages=document.querySelectorAll<HTMLElement>(".assembled-scene,.marquee");
const visibility=new IntersectionObserver(entries=>entries.forEach(e=>{(e.target as HTMLElement).dataset.inView=String(e.isIntersecting);}));
stages.forEach(n=>visibility.observe(n));
let frame=0;const progress=()=>{frame=0;const h=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.style.setProperty("--reading-progress",String(h>0?window.scrollY/h:0));};const scroll=()=>{if(!frame)frame=requestAnimationFrame(progress);};progress();window.addEventListener("scroll",scroll,{passive:true});
return()=>{reveal.disconnect();visibility.disconnect();nodes.forEach(n=>n.classList.remove("reveal-ready"));window.removeEventListener("scroll",scroll);cancelAnimationFrame(frame);};
},[pathname]);return null;}
