import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/* -------------------------------------------------------------------------- */
/*  Cinema-leader loader — film countdown reticle, sweep hand, iris exit      */
/* -------------------------------------------------------------------------- */

export function Loader() {
  const [pct, setPct] = useState(0);
  const [done, setDone] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [frame, setFrame] = useState(0);

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
    const DURATION = 1900;
    const ease = (p: number) => (p === 1 ? 1 : 1 - Math.pow(2, -10 * p));

    const tick = (t: number) => {
      const elapsed = t - start;
      const p = Math.min(1, elapsed / DURATION);
      setPct(ease(p) * 100);
      setFrame(Math.floor(elapsed / 41.66)); // ~24fps counter
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        window.setTimeout(() => setDone(true), 180);
        window.setTimeout(() => setHidden(true), 1400);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (hidden) return null;
  const shown = Math.min(100, Math.floor(pct));
  const progress = pct / 100;
  const sweep = progress * 360;

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] overflow-hidden bg-ink text-bone"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* iris exit — 8 sliding blades close in from edges */}
          {[
            { s: { top: 0, left: 0, right: 0, height: "50%" }, e: { y: "-100%" } },
            { s: { bottom: 0, left: 0, right: 0, height: "50%" }, e: { y: "100%" } },
          ].map((b, i) => (
            <motion.div
              key={i}
              className="absolute bg-ink"
              style={b.s}
              exit={b.e}
              transition={{ duration: 1.15, ease: [0.83, 0, 0.17, 1], delay: 0.1 }}
            />
          ))}

          {/* grain */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.09] mix-blend-overlay"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.75'/></svg>\")",
            }}
          />

          {/* soft ember vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, rgba(181,86,107,0.12), transparent 70%)",
            }}
          />

          {/* film sprocket rails */}
          <div className="pointer-events-none absolute inset-y-0 left-0 flex flex-col justify-around py-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="ml-3 h-6 w-4 rounded-sm bg-bone/10"
                style={{ opacity: (i + frame) % 3 === 0 ? 0.35 : 0.1 }}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex flex-col justify-around py-4">
            {Array.from({ length: 14 }).map((_, i) => (
              <div
                key={i}
                className="mr-3 h-6 w-4 rounded-sm bg-bone/10"
                style={{ opacity: (i + frame) % 3 === 0 ? 0.35 : 0.1 }}
              />
            ))}
          </div>

          {/* Top meta */}
          <motion.div
            className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-6 md:px-14 md:pt-8"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.34em] text-bone/60">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              REC · Reel 01
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.34em] text-bone/50">
              W<span className="text-ember">e</span>Do — Academy Leader
            </span>
            <span className="mono tabular-nums text-[10px] uppercase tracking-[0.34em] text-bone/50">
              F {String(frame).padStart(4, "0")}
            </span>
          </motion.div>

          {/* Center reticle */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="relative flex h-[min(78vw,32rem)] w-[min(78vw,32rem)] items-center justify-center">
              {/* outer ring */}
              <svg className="absolute inset-0" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="96" fill="none" stroke="rgba(244,241,234,0.14)" strokeWidth="0.4" />
                <circle cx="100" cy="100" r="72" fill="none" stroke="rgba(244,241,234,0.10)" strokeWidth="0.3" strokeDasharray="1 3" />
                {/* progress arc */}
                <circle
                  cx="100"
                  cy="100"
                  r="88"
                  fill="none"
                  stroke="#B5566B"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress * 2 * Math.PI * 88).toFixed(2)} 1000`}
                  transform="rotate(-90 100 100)"
                  style={{ filter: "drop-shadow(0 0 4px rgba(181,86,107,0.7))" }}
                />
                {/* crosshair */}
                <line x1="100" y1="0" x2="100" y2="20" stroke="rgba(244,241,234,0.35)" strokeWidth="0.4" />
                <line x1="100" y1="180" x2="100" y2="200" stroke="rgba(244,241,234,0.35)" strokeWidth="0.4" />
                <line x1="0" y1="100" x2="20" y2="100" stroke="rgba(244,241,234,0.35)" strokeWidth="0.4" />
                <line x1="180" y1="100" x2="200" y2="100" stroke="rgba(244,241,234,0.35)" strokeWidth="0.4" />
                {/* tick marks */}
                {Array.from({ length: 60 }).map((_, i) => {
                  const a = (i / 60) * Math.PI * 2 - Math.PI / 2;
                  const x1 = 100 + Math.cos(a) * 92;
                  const y1 = 100 + Math.sin(a) * 92;
                  const x2 = 100 + Math.cos(a) * (i % 5 === 0 ? 86 : 89);
                  const y2 = 100 + Math.sin(a) * (i % 5 === 0 ? 86 : 89);
                  return (
                    <line
                      key={i}
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={i % 5 === 0 ? "rgba(244,241,234,0.5)" : "rgba(244,241,234,0.2)"}
                      strokeWidth="0.4"
                    />
                  );
                })}
                {/* sweep hand */}
                <g transform={`rotate(${sweep} 100 100)`} style={{ transition: "transform 120ms linear" }}>
                  <line x1="100" y1="100" x2="100" y2="14" stroke="#B5566B" strokeWidth="0.8" strokeLinecap="round" />
                  <circle cx="100" cy="14" r="2" fill="#B5566B" />
                </g>
                {/* center dot */}
                <circle cx="100" cy="100" r="1.5" fill="#B5566B" />
              </svg>

              {/* Giant countdown number */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={shown}
                  initial={{ opacity: 0, scale: 1.4, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.8, filter: "blur(8px)" }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="display leading-none tabular-nums text-bone"
                  style={{
                    fontSize: "clamp(6rem, 22vw, 18rem)",
                    letterSpacing: "-0.08em",
                    textShadow: "0 0 40px rgba(181,86,107,0.25)",
                  }}
                >
                  {String(shown).padStart(2, "0")}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Bottom bay */}
          <motion.div
            className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 md:px-14 md:pb-8"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="flex items-end justify-between gap-4 md:gap-8">
              <div>
                <div className="mono text-[9px] uppercase tracking-[0.34em] text-bone/40">Scene</div>
                <div className="display text-bone" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", letterSpacing: "-0.02em" }}>
                  Boot / Take 01
                </div>
              </div>

              <div className="hidden md:block">
                <div className="mono text-center text-[9px] uppercase tracking-[0.34em] text-bone/40">Status</div>
                <div className="mono text-center text-[11px] uppercase tracking-[0.28em] text-ember">
                  {shown < 30 ? "· Threading" : shown < 65 ? "· Composing" : shown < 95 ? "· Color grading" : "· Cue"}
                </div>
              </div>

              <div className="text-right">
                <div className="mono text-[9px] uppercase tracking-[0.34em] text-bone/40">Timecode</div>
                <div className="display tabular-nums text-bone" style={{ fontSize: "clamp(1.1rem, 2vw, 1.6rem)", letterSpacing: "-0.02em" }}>
                  00:00:{String(Math.floor(progress * 19)).padStart(2, "0")}
                  <span className="text-ember">:</span>
                  {String(frame % 24).padStart(2, "0")}
                </div>
              </div>
            </div>

            <div className="mt-4 h-px w-full overflow-hidden bg-bone/12">
              <div
                className="h-full origin-left bg-ember"
                style={{
                  transform: `scaleX(${progress})`,
                  transition: "transform 120ms cubic-bezier(0.22,1,0.36,1)",
                  boxShadow: "0 0 14px rgba(181,86,107,0.7)",
                }}
              />
            </div>

            <div className="mono mt-2 flex items-center justify-between text-[9px] uppercase tracking-[0.32em] text-bone/30">
              <span>◍ Reel Start</span>
              <span>WeDo® Studio · MMXXVI</span>
              <span>End Cue ◍</span>
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
          boxShadow: "0 0 12px rgba(181,86,107,0.7)",
        }}
      />
    </div>
  );
}
