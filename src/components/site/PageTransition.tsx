import { AnimatePresence, motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

/**
 * Trionn-style route transition:
 *  - A black panel sweeps up across the viewport (in from bottom, out the top),
 *  - The incoming page fades + lifts in beneath it,
 *  - Scroll resets to top on route change.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.35,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path + "-curtain"}
          className="pointer-events-none fixed inset-0 z-[95] bg-ink"
          initial={{ y: "100%" }}
          animate={{ y: "-100%" }}
          transition={{
            duration: 1.1,
            ease: [0.85, 0, 0.15, 1],
            times: [0, 1],
          }}
        >
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 px-6 text-center">
            <p
              className="display text-bone/90"
              style={{
                fontSize: "clamp(3rem, 9vw, 8rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
              }}
            >
              WeDo
            </p>
            <p className="mono mt-3 text-[10px] uppercase tracking-[0.3em] text-ember">
              {path === "/" ? "Home" : path.replace("/", "").replace(/\//g, " · ")}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
