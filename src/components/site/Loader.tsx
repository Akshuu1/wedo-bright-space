import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Trionn-style top loader.
 * - First load: full-screen black with a large eased counter (0 → 100),
 *   then the curtain slides up and out.
 * - Route changes: a thin top progress bar with the same eased easing.
 */
export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 2200;
    // expo-out — matches Trionn's slow-to-fast-to-settle feel
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(Math.round(ease(p) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setDone(true), 250);
        setTimeout(() => setHidden(true), 1400);
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
          className="pointer-events-none fixed inset-0 z-[120] flex flex-col bg-ink"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
        >
          {/* top hairline progress */}
          <div className="relative h-px w-full bg-bone/10">
            <div
              className="h-full origin-left bg-ember"
              style={{
                transform: `scaleX(${pct / 100})`,
                transition: "transform 120ms linear",
              }}
            />
          </div>

          {/* meta + counter */}
          <div className="flex flex-1 items-end justify-between px-6 pb-10 md:px-12 md:pb-16">
            <div className="mono text-[10px] uppercase tracking-[0.28em] text-bone/55">
              <p>WeDo Studio</p>
              <p className="mt-1 text-bone/35">Loading the format · MMXXVI</p>
            </div>
            <div className="text-right">
              <p
                className="display text-bone leading-[0.85]"
                style={{
                  fontSize: "clamp(7rem, 22vw, 16rem)",
                  letterSpacing: "-0.06em",
                }}
              >
                {String(pct).padStart(3, "0")}
              </p>
              <p className="mono mt-3 text-[10px] uppercase tracking-[0.28em] text-bone/40">
                <span className="text-ember">/ 100</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Thin top progress bar that runs during client-side route changes
 * with the same expo-out easing as the boot loader.
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
