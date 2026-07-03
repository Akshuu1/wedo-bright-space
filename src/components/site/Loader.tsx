import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Kinetic Type Loader — stacked color strips, marquee word, clip reveal     */
/* -------------------------------------------------------------------------- */

const WORDS = ["THINK", "DRAFT", "SHIP", "WEDO"];

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
    const DURATION = 2100;
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / DURATION);
      setPct(ease(p) * 100);
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => setDone(true), 220);
        window.setTimeout(() => setHidden(true), 1500);
      }
    };
    raf = requestAnimationFrame(tick);

    const wordTimer = window.setInterval(() => {
      setWordIdx((i) => (i + 1) % WORDS.length);
    }, 480);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(wordTimer);
    };
  }, []);

  if (hidden) return null;
  const shown = Math.min(100, Math.floor(pct));
  const progress = pct / 100;

  // 5 horizontal strips forming the stage
  const strips = [
    { bg: "#f4f1ea", fg: "#0a0a0a" }, // bone
    { bg: "#B5566B", fg: "#f4f1ea" }, // ember
    { bg: "#0a0a0a", fg: "#f6ea3a" }, // ink / zap text
    { bg: "#f6ea3a", fg: "#0a0a0a" }, // zap
    { bg: "#0a0a0a", fg: "#f4f1ea" }, // ink
  ];

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* Stacked color strips — slide in from alternating sides, then wipe up on exit */}
          <div className="absolute inset-0 flex flex-col">
            {strips.map((s, i) => (
              <motion.div
                key={i}
                className="relative flex-1 overflow-hidden"
                style={{ background: s.bg, color: s.fg }}
                initial={{ x: i % 2 === 0 ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ y: "-100%" }}
                transition={{
                  duration: 0.9,
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.06,
                }}
              >
                {/* moving word ribbon per strip */}
                <StripRibbon
                  word={WORDS[(wordIdx + i) % WORDS.length]}
                  reverse={i % 2 === 1}
                  fg={s.fg}
                />
              </motion.div>
            ))}
          </div>

          {/* Center emblem: giant W with clip-path progress fill */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.15 }}
              transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[min(60vw,22rem)] w-[min(60vw,22rem)] items-center justify-center rounded-full border border-bone/20 bg-ink/60 backdrop-blur-xl"
              style={{
                boxShadow:
                  "0 30px 80px -20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(244,241,234,0.06)",
              }}
            >
              {/* rotating ring of ticks */}
              <svg
                className="absolute inset-0"
                viewBox="0 0 200 200"
                style={{
                  animation: "loaderSpin 22s linear infinite",
                }}
              >
                {Array.from({ length: 48 }).map((_, i) => {
                  const a = (i / 48) * Math.PI * 2 - Math.PI / 2;
                  const inner = i % 4 === 0 ? 88 : 92;
                  const outer = 96;
                  const x1 = 100 + Math.cos(a) * inner;
                  const y1 = 100 + Math.sin(a) * inner;
                  const x2 = 100 + Math.cos(a) * outer;
                  const y2 = 100 + Math.sin(a) * outer;
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i % 4 === 0 ? "#B5566B" : "rgba(244,241,234,0.3)"}
                      strokeWidth={i % 4 === 0 ? 0.9 : 0.5}
                    />
                  );
                })}
              </svg>

              {/* progress arc */}
              <svg className="absolute inset-0" viewBox="0 0 200 200">
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke="#f6ea3a"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress * 2 * Math.PI * 82).toFixed(2)} 1000`}
                  transform="rotate(-90 100 100)"
                  style={{ filter: "drop-shadow(0 0 6px rgba(246,234,58,0.7))" }}
                />
              </svg>

              {/* Big W mark with vertical clip-path fill */}
              <div className="relative flex flex-col items-center gap-2">
                <div className="relative">
                  <span
                    className="display block text-bone/20 leading-none"
                    style={{ fontSize: "clamp(6rem, 18vw, 12rem)", letterSpacing: "-0.08em" }}
                  >
                    W
                  </span>
                  <span
                    className="display absolute inset-0 leading-none"
                    style={{
                      fontSize: "clamp(6rem, 18vw, 12rem)",
                      letterSpacing: "-0.08em",
                      color: "#f6ea3a",
                      clipPath: `inset(${100 - shown}% 0 0 0)`,
                      transition: "clip-path 120ms linear",
                      textShadow: "0 0 30px rgba(246,234,58,0.35)",
                    }}
                  >
                    W
                  </span>
                </div>

                <div className="mono tabular-nums text-[11px] uppercase tracking-[0.4em] text-bone/70">
                  {String(shown).padStart(3, "0")}%
                </div>
              </div>
            </motion.div>
          </div>

          {/* Corner meta */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 pt-5 md:px-10 md:pt-8">
            <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-bone mix-blend-difference">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              Booting studio
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone mix-blend-difference">
              WeDo® / MMXXVI
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-5 pb-5 md:px-10 md:pb-8">
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone mix-blend-difference">
              {shown < 33 ? "◐ Warming press" : shown < 66 ? "◑ Inking blocks" : shown < 95 ? "◒ Aligning grid" : "◓ Ready"}
            </span>
            <span className="mono tabular-nums text-[10px] uppercase tracking-[0.32em] text-bone mix-blend-difference">
              R01 · TAKE {String(wordIdx + 1).padStart(2, "0")}
            </span>
          </div>

          <style>{`
            @keyframes loaderSpin { to { transform: rotate(360deg); } }
            @keyframes ribbon { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            @keyframes ribbonReverse { from { transform: translateX(-50%); } to { transform: translateX(0); } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StripRibbon({ word, reverse, fg }: { word: string; reverse: boolean; fg: string }) {
  // duplicate the word to make a seamless loop
  const items = Array.from({ length: 14 }, () => word);
  return (
    <div className="flex h-full items-center whitespace-nowrap">
      <div
        className="flex shrink-0 items-center gap-8 pr-8"
        style={{
          animation: `${reverse ? "ribbonReverse" : "ribbon"} 18s linear infinite`,
          willChange: "transform",
        }}
      >
        {[...items, ...items].map((w, i) => (
          <span
            key={i}
            className="display leading-none"
            style={{
              fontSize: "clamp(2.4rem, 8vw, 6rem)",
              letterSpacing: "-0.04em",
              WebkitTextStroke: i % 3 === 1 ? `1px ${fg}` : undefined,
              color: i % 3 === 1 ? "transparent" : fg,
            }}
          >
            {w} <span style={{ opacity: 0.4 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
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
          boxShadow: "0 0 12px rgba(181,86,107,0.7)",
        }}
      />
    </div>
  );
}
