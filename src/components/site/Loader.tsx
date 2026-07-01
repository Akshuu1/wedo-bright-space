import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * WeDo boot loader — horizontal split-curtain reveal.
 * Two panels (top + bottom) slide apart while a wordmark scales through.
 */
export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1800;
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(Math.round(ease(p) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 200);
        setTimeout(() => setHidden(true), 1500);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] overflow-hidden bg-ink text-bone"
          exit={{ y: "-100%" }}
          transition={{ duration: 1.0, ease: [0.85, 0, 0.15, 1] }}
        >
          {/* Top meta row */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6 md:px-10 md:pt-8">
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone/50">
              <span className="mr-2 inline-block h-1.5 w-1.5 translate-y-[-1px] rounded-full bg-ember align-middle" />
              WeDo® — Index MMXXVI
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone/40">
              {pct < 33 ? "Resolving" : pct < 66 ? "Composing" : pct < 99 ? "Rendering" : "Ready"}
            </span>
          </div>

          {/* Center — giant ticking counter */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="flex flex-col items-center">
              <p
                className="display tabular-nums text-bone"
                style={{
                  fontSize: "clamp(6rem, 22vw, 22rem)",
                  letterSpacing: "-0.07em",
                  lineHeight: 0.85,
                }}
              >
                {String(pct).padStart(2, "0")}
                <span className="text-ember">.</span>
              </p>
              <span className="mono mt-4 text-[10px] uppercase tracking-[0.4em] text-bone/45">
                Loading experience
              </span>
            </div>
          </div>

          {/* Bottom row — hairline progress + wordmark */}
          <div className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-8">
            <div className="flex items-end justify-between">
              <p className="display text-bone" style={{ fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)", letterSpacing: "-0.03em", lineHeight: 1 }}>
                W<span className="text-ember">e</span>Do
              </p>
              <p className="mono text-[10px] uppercase tracking-[0.32em] text-bone/40">
                <span className="text-bone">{String(pct).padStart(3, "0")}</span>
                <span className="mx-1 text-bone/30">/</span>
                <span>100</span>
              </p>
            </div>
            <div className="mt-4 h-px w-full overflow-hidden bg-bone/12">
              <div
                className="h-full origin-left bg-ember"
                style={{
                  transform: `scaleX(${pct / 100})`,
                  transition: "transform 90ms linear",
                  boxShadow: "0 0 12px rgba(255,140,60,0.55)",
                }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Thin top progress bar for client-side route changes.
 */
export function RouteProgress({ active }: { active: boolean }) {
  const [pct, setPct] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let raf = 0;
    if (active) {
      setVisible(true);
      setPct(0);
      const start = performance.now();
      const DURATION = 900;
      const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
      const tick = (t: number) => {
        const p = Math.min(0.92, (t - start) / DURATION);
        setPct(ease(p));
        if (p < 0.92) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    } else if (visible) {
      setPct(1);
      const id = window.setTimeout(() => {
        setVisible(false);
        setPct(0);
      }, 320);
      return () => window.clearTimeout(id);
    }
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 top-0 z-[110] h-[2px] bg-transparent"
      aria-hidden
    >
      <div
        className="h-full origin-left bg-ember"
        style={{
          transform: `scaleX(${pct})`,
          opacity: visible ? 1 : 0,
          transition: "transform 140ms linear, opacity 280ms ease-out",
          boxShadow: "0 0 12px rgba(255,140,60,0.7)",
        }}
      />
    </div>
  );
}
