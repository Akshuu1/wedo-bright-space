import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * WeDo boot loader — editorial counter with a soft curtain lift.
 * Timings tuned for both mobile and desktop; respects reduced-motion.
 */
export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (reduced) {
      setPct(100);
      setDone(true);
      const id = window.setTimeout(() => setHidden(true), 300);
      return () => window.clearTimeout(id);
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = isMobile ? 1600 : 2000;
    // expo-out — slow finish, elegant settle
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(ease(p) * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => setDone(true), 260);
        window.setTimeout(() => setHidden(true), 1600);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;
  const shown = Math.min(100, Math.floor(pct));

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] overflow-hidden bg-ink text-bone"
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* Ambient ember glow — subtle depth */}
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(60% 45% at 50% 55%, rgba(255,140,60,0.10), transparent 70%)",
            }}
          />
          {/* Soft noise for texture */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />

          {/* Top meta */}
          <motion.div
            className="absolute inset-x-0 top-0 flex items-start justify-between px-6 pt-6 md:px-10 md:pt-8"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-bone/55">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              WeDo® — Index MMXXVI
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.34em] text-bone/40">
              {shown < 33
                ? "Resolving"
                : shown < 66
                  ? "Composing"
                  : shown < 99
                    ? "Rendering"
                    : "Ready"}
            </span>
          </motion.div>

          {/* Center — giant tabular counter */}
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="flex flex-col items-center">
              <motion.p
                className="display tabular-nums text-bone"
                style={{
                  fontSize: "clamp(6rem, 22vw, 22rem)",
                  letterSpacing: "-0.07em",
                  lineHeight: 0.85,
                }}
                initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                {String(shown).padStart(2, "0")}
                <span className="text-ember">.</span>
              </motion.p>
              <motion.span
                className="mono mt-5 text-[10px] uppercase tracking-[0.42em] text-bone/45"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                Loading experience
              </motion.span>
            </div>
          </div>

          {/* Bottom — wordmark + hairline progress */}
          <motion.div
            className="absolute inset-x-0 bottom-0 px-6 pb-6 md:px-10 md:pb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="flex items-end justify-between">
              <p
                className="display text-bone"
                style={{
                  fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                }}
              >
                W<span className="text-ember">e</span>Do
              </p>
              <p className="mono tabular-nums text-[10px] uppercase tracking-[0.32em] text-bone/50">
                <span className="text-bone">{String(shown).padStart(3, "0")}</span>
                <span className="mx-1 text-bone/25">/</span>
                <span>100</span>
              </p>
            </div>
            <div className="mt-4 h-px w-full overflow-hidden bg-bone/12">
              <div
                className="h-full origin-left bg-ember"
                style={{
                  transform: `scaleX(${pct / 100})`,
                  transition: "transform 120ms cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: "0 0 14px rgba(255,140,60,0.55)",
                }}
              />
            </div>
          </motion.div>
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
