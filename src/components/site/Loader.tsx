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
          className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Top half — slides up on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 overflow-hidden bg-ink"
            initial={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
          >
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-6 pb-6 md:px-12 md:pb-10">
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-bone/55">
                <p>WeDo® Studio</p>
                <p className="mt-1 text-bone/30">Index · MMXXVI</p>
              </div>
              <div className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                <span className="text-ember">{String(pct).padStart(3, "0")}</span> / 100
              </div>
            </div>
          </motion.div>

          {/* Bottom half — slides down on exit */}
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 overflow-hidden bg-ink"
            initial={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 1.1, ease: [0.85, 0, 0.15, 1] }}
          >
            <div className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6 md:px-12 md:pt-10">
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                ◉ Booting · v2.6
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                {pct < 33 ? "Resolving" : pct < 66 ? "Composing" : pct < 99 ? "Rendering" : "Ready"}
              </span>
            </div>
          </motion.div>

          {/* Center seam / wordmark */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              initial={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.15, opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.85, 0, 0.15, 1] }}
              className="relative"
            >
              <p
                className="display text-bone"
                style={{
                  fontSize: "clamp(5rem, 18vw, 18rem)",
                  letterSpacing: "-0.06em",
                  lineHeight: 0.85,
                }}
              >
                W<span className="text-ember">e</span>Do
              </p>
              <div className="mt-2 h-px w-full overflow-hidden bg-bone/15">
                <div
                  className="h-full origin-left bg-ember"
                  style={{
                    transform: `scaleX(${pct / 100})`,
                    transition: "transform 90ms linear",
                  }}
                />
              </div>
            </motion.div>
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
