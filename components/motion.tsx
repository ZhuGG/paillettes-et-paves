"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export function Motion() {
  const pathname = usePathname();
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    nodes.forEach(node => { node.classList.add("reveal-ready"); observer.observe(node); });
    let frame=0;
    const progress=()=>{frame=0;const height=document.documentElement.scrollHeight-window.innerHeight;document.documentElement.style.setProperty("--reading-progress",String(height>0?window.scrollY/height:0));};
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(progress);};
    progress();
    window.addEventListener("scroll",onScroll,{passive:true});
    return () => {observer.disconnect();window.removeEventListener("scroll",onScroll);cancelAnimationFrame(frame);};
  }, [pathname]);
  return null;
}
