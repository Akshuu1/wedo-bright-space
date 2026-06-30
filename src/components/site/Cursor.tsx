import { useEffect, useRef } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx, ry = my;
    let raf = 0;

    const move = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      if (dot.current) dot.current.style.transform = `translate3d(${mx}px,${my}px,0) translate(-50%,-50%)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%)`;
      raf = requestAnimationFrame(tick);
    };

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const link = t.closest("a,button,[data-cursor='view']");
      if (!ring.current) return;
      if (link?.getAttribute("data-cursor") === "view") {
        ring.current.dataset.state = "view";
      } else if (link) {
        ring.current.dataset.state = "hover";
      } else {
        ring.current.dataset.state = "idle";
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] hidden md:block" style={{ mixBlendMode: "difference" }}>
      <div ref={dot} className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-chalk" />
      <div
        ref={ring}
        data-state="idle"
        className="fixed left-0 top-0 flex h-9 w-9 items-center justify-center rounded-full border border-bone/70 mono text-[9px] uppercase tracking-widest text-bone transition-[width,height,background,color] duration-300 data-[state=hover]:h-14 data-[state=hover]:w-14 data-[state=view]:h-20 data-[state=view]:w-20 data-[state=view]:bg-chalk data-[state=view]:text-bone"
      >
        <span className="opacity-0 data-[show=true]:opacity-100" data-show={false} />
        <span className="hidden [[data-state=view]_&]:inline">View</span>
      </div>
    </div>
  );
}
