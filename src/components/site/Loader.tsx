import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Editorial split-column loader — no 3D, pure typographic drama             */
/* -------------------------------------------------------------------------- */

const WORDS = ["DESIGN", "DEVELOP", "AUTOMATE"];

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [wordIdx, setWordIdx] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setPct(100);
      setDone(true);
      const id = window.setTimeout(() => setHidden(true), 200);
      return () => window.clearTimeout(id);
    }

    let raf = 0;
    const start = performance.now();
    const DURATION = 1600;
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / DURATION);
      setPct(ease(p) * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => setDone(true), 160);
        window.setTimeout(() => setHidden(true), 1200);
      }
    };
    raf = requestAnimationFrame(tick);

    const wordTimer = window.setInterval(() => {
      setWordIdx((i) => (i + 1) % WORDS.length);
    }, 420);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(wordTimer);
    };
  }, []);

  if (hidden) return null;
  const shown = Math.min(100, Math.floor(pct));
  const progress = pct / 100;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] overflow-hidden bg-ink text-bone"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* Two curtain panels that split apart on exit */}
          <motion.div
            className="absolute inset-y-0 left-0 w-1/2 bg-ink"
            exit={{ x: "-100%" }}
            transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />
          <motion.div
            className="absolute inset-y-0 right-0 w-1/2 bg-ink"
            exit={{ x: "100%" }}
            transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          />

          {/* Grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.08] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
            }}
          />

          {/* Ember ambient wash */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(255,87,34,0.14), transparent 70%)",
            }}
          />

          {/* Faint grid lines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #f4f1ea 1px, transparent 1px), linear-gradient(to bottom, #f4f1ea 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />

          {/* Top row — brand + status */}
          <motion.div
            className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mono text-[10px] uppercase tracking-[0.34em] text-bone/60">
              W<span className="text-ember">e</span>Do ® Studio
            </span>
            <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-bone/50">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              Booting Session — MMXXVI
            </span>
          </motion.div>

          {/* Center — enormous kinetic word */}
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6">
            <div className="mono mb-6 text-[10px] uppercase tracking-[0.4em] text-bone/40">
              Now Loading
            </div>

            <div className="relative flex h-[1.1em] items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={WORDS[wordIdx]}
                  className="display text-bone"
                  initial={{ y: "110%", opacity: 0, filter: "blur(12px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: "-110%", opacity: 0, filter: "blur(12px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  style={{
                    fontSize: "clamp(3.5rem, 14vw, 12rem)",
                    letterSpacing: "-0.06em",
                    lineHeight: 1,
                    textAlign: "center",
                  }}
                >
                  {WORDS[wordIdx].split("").map((ch, i) => (
                    <span
                      key={i}
                      className={i === WORDS[wordIdx].length - 1 ? "text-ember" : ""}
                    >
                      {ch}
                    </span>
                  ))}
                </motion.h1>
              </AnimatePresence>
            </div>

            {/* under-caption */}
            <motion.div
              className="mono mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-bone/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <span>Studio · Est. 2024</span>
              <span className="h-px w-8 bg-bone/25" />
              <span>Bengaluru → Everywhere</span>
            </motion.div>
          </div>

          {/* Bottom — counter + progress */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 md:px-12 md:pb-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          >
            <div className="flex items-end justify-between gap-6">
              <span className="mono text-[10px] uppercase tracking-[0.34em] text-bone/50">
                {shown < 30
                  ? "Compiling assets"
                  : shown < 60
                    ? "Assembling scenes"
                    : shown < 95
                      ? "Rendering surface"
                      : "Ready"}
              </span>

              <p
                className="display tabular-nums leading-none text-bone"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  letterSpacing: "-0.05em",
                }}
              >
                {String(shown).padStart(3, "0")}
                <span className="text-ember">%</span>
              </p>
            </div>

            <div className="mt-5 h-px w-full overflow-hidden bg-bone/12">
              <div
                className="h-full origin-left bg-ember"
                style={{
                  transform: `scaleX(${progress})`,
                  transition: "transform 120ms cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: "0 0 14px rgba(255,87,34,0.7)",
                }}
              />
            </div>

            {/* corner ticks */}
            <div className="mono mt-3 flex items-center justify-between text-[9px] uppercase tracking-[0.32em] text-bone/30">
              <span>◍ 00</span>
              <span>Frame · {String(Math.floor(progress * 240)).padStart(3, "0")}</span>
              <span>100 ◍</span>
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
          boxShadow: "0 0 12px rgba(255,87,34,0.7)",
        }}
      />
    </div>
  );
}
