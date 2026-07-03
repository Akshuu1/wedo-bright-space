import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useRouterState } from "@tanstack/react-router";

/* -------------------------------------------------------------------------- */
/*  Kinetic Type Loader — driven by router loading state                      */
/* -------------------------------------------------------------------------- */

const WORDS = ["THINK", "DRAFT", "SHIP", "WEDO"];
const MIN_VISIBLE_MS = 420; // avoid flicker on instant routes
const INITIAL_BOOT_MS = 1400; // first paint boot on cold load

const STRIPS = [
  { bg: "#f4f1ea", fg: "#0a0a0a" },
  { bg: "#B5566B", fg: "#f4f1ea" },
  { bg: "#0a0a0a", fg: "#f6ea3a" },
  { bg: "#f6ea3a", fg: "#0a0a0a" },
  { bg: "#0a0a0a", fg: "#f4f1ea" },
];

export function Loader() {
  const isRouterLoading = useRouterState({
    select: (s) => s.isLoading || s.isTransitioning,
  });

  const [visible, setVisible] = useState(true); // shows on first mount
  const [pct, setPct] = useState(0);
  const [wordIdx, setWordIdx] = useState(0);

  const shownAtRef = useRef<number>(typeof performance !== "undefined" ? performance.now() : 0);
  const hideTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  // Progress simulator — climbs to ~92% while active, then completes to 100%.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!visible) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    if (reduced) {
      setPct(100);
      return;
    }

    const start = performance.now();
    // Slightly longer ramp on the initial boot for a proper reveal.
    const ramp = visible && shownAtRef.current === start ? INITIAL_BOOT_MS : 900;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / ramp);
      // ease-out to 92%
      const eased = 1 - Math.pow(1 - p, 3);
      setPct(eased * 92);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [visible]);

  // Rotate the ribbon word.
  useEffect(() => {
    if (!visible) return;
    const id = window.setInterval(() => setWordIdx((i) => (i + 1) % WORDS.length), 520);
    return () => window.clearInterval(id);
  }, [visible]);

  // React to router loading: show immediately, hide after min-visible + route settle.
  useEffect(() => {
    if (isRouterLoading) {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
      shownAtRef.current = performance.now();
      setVisible(true);
      setPct(0);
      return;
    }

    // Router idle — finish progress and hide after min visible.
    if (visible) {
      const elapsed = performance.now() - shownAtRef.current;
      const remaining = Math.max(0, MIN_VISIBLE_MS - elapsed);
      setPct(100);
      hideTimerRef.current = window.setTimeout(() => setVisible(false), remaining + 240);
    }
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRouterLoading]);

  const shown = Math.min(100, Math.floor(pct));
  const progress = pct / 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[120] overflow-hidden bg-ink"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          {/* Stacked color strips */}
          <div className="absolute inset-0 flex flex-col">
            {STRIPS.map((s, i) => (
              <motion.div
                key={i}
                className="relative flex-1 overflow-hidden"
                style={{ background: s.bg, color: s.fg }}
                initial={{ x: i % 2 === 0 ? "-100%" : "100%" }}
                animate={{ x: 0 }}
                exit={{ y: "-100%" }}
                transition={{
                  duration: 0.7,
                  ease: [0.76, 0, 0.24, 1],
                  delay: i * 0.04,
                }}
              >
                <StripRibbon word={WORDS[(wordIdx + i) % WORDS.length]} reverse={i % 2 === 1} fg={s.fg} />
              </motion.div>
            ))}
          </div>

          {/* Center emblem */}
          <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-[min(56vw,20rem)] w-[min(56vw,20rem)] items-center justify-center rounded-full border border-bone/20 bg-ink/70"
              style={{
                boxShadow: "0 20px 60px -20px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(244,241,234,0.06)",
              }}
            >
              {/* progress arc */}
              <svg className="absolute inset-0" viewBox="0 0 200 200">
                <circle cx="100" cy="100" r="92" fill="none" stroke="rgba(244,241,234,0.12)" strokeWidth="0.6" />
                <circle
                  cx="100"
                  cy="100"
                  r="82"
                  fill="none"
                  stroke="#f6ea3a"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeDasharray={`${(progress * 2 * Math.PI * 82).toFixed(2)} 1000`}
                  transform="rotate(-90 100 100)"
                  style={{
                    transition: "stroke-dasharray 160ms linear",
                    filter: "drop-shadow(0 0 6px rgba(246,234,58,0.55))",
                  }}
                />
              </svg>

              {/* Big W mark with vertical clip-path fill */}
              <div className="relative flex flex-col items-center gap-2">
                <div className="relative leading-none">
                  <span
                    className="display block leading-none text-bone/20"
                    style={{ fontSize: "clamp(5rem, 15vw, 10rem)", letterSpacing: "-0.08em" }}
                  >
                    W
                  </span>
                  <span
                    className="display absolute inset-0 leading-none"
                    style={{
                      fontSize: "clamp(5rem, 15vw, 10rem)",
                      letterSpacing: "-0.08em",
                      color: "#f6ea3a",
                      clipPath: `inset(${100 - shown}% 0 0 0)`,
                      transition: "clip-path 160ms linear",
                      textShadow: "0 0 24px rgba(246,234,58,0.3)",
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
            <span className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.32em] text-bone">
              <span className="relative inline-flex h-1.5 w-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
                <span className="relative h-1.5 w-1.5 rounded-full bg-ember" />
              </span>
              Loading route
            </span>
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone">
              WeDo® / MMXXVI
            </span>
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between px-5 pb-5 md:px-10 md:pb-8">
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone">
              {shown < 33 ? "◐ Fetching" : shown < 66 ? "◑ Composing" : shown < 95 ? "◒ Aligning" : "◓ Ready"}
            </span>
            <span className="mono tabular-nums text-[10px] uppercase tracking-[0.32em] text-bone">
              R01 · TAKE {String(wordIdx + 1).padStart(2, "0")}
            </span>
          </div>

          <style>{`
            @keyframes ribbon { from { transform: translate3d(0,0,0); } to { transform: translate3d(-50%,0,0); } }
            @keyframes ribbonReverse { from { transform: translate3d(-50%,0,0); } to { transform: translate3d(0,0,0); } }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StripRibbon({ word, reverse, fg }: { word: string; reverse: boolean; fg: string }) {
  const items = Array.from({ length: 10 }, () => word);
  return (
    <div className="flex h-full items-center whitespace-nowrap">
      <div
        className="flex shrink-0 items-center gap-8 pr-8"
        style={{
          animation: `${reverse ? "ribbonReverse" : "ribbon"} 22s linear infinite`,
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
 * Thin top progress bar — kept for API compatibility. Rendered inert since
 * Loader now owns route-change feedback.
 */
export function RouteProgress(_: { active: boolean }) {
  return null;
}
