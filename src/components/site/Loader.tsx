import { useEffect, useState } from "react";

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1700;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 350);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden={done}
      className="pointer-events-none fixed inset-0 z-[100] flex flex-col bg-ink transition-opacity duration-700"
      style={{ opacity: done ? 0 : 1 }}
    >
      {/* top progress bar */}
      <div className="relative h-px w-full bg-bone/10">
        <div
          className="h-full origin-left ember-streak"
          style={{ transform: `scaleX(${pct / 100})`, transition: "transform 120ms linear" }}
        />
      </div>

      <div className="flex flex-1 items-end justify-between px-6 pb-10 md:px-10 md:pb-14">
        <div className="mono text-[10px] uppercase tracking-[0.25em] text-bone/60">
          <p>WeDo Studio</p>
          <p className="mt-1 text-bone/40">Loading the format · MMXXVI</p>
        </div>
        <div className="text-right">
          <p
            className="display text-[18vw] leading-none text-bone md:text-[8rem]"
            style={{ letterSpacing: "-0.06em" }}
          >
            {String(pct).padStart(3, "0")}
          </p>
          <p className="mono mt-2 text-[10px] uppercase tracking-[0.25em] text-bone/40">
            <span className="text-gradient">/100</span>
          </p>
        </div>
      </div>
    </div>
  );
}
