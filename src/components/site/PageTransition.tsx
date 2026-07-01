import { AnimatePresence, motion } from "motion/react";
import { useRouterState } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [path]);

  const label =
    path === "/" ? "Index" : path.replace(/^\//, "").replace(/\//g, " · ");

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path}
          initial={{ opacity: 0, x: 60, scale: 0.99 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -40, scale: 0.99 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={path + "-curtain"}
          className="pointer-events-none fixed inset-0 z-[95]"
          initial={{ x: "-101%" }}
          animate={{ x: "101%" }}
          exit={{ x: "101%" }}
          transition={{ duration: 1.05, ease: [0.85, 0, 0.15, 1] }}
        >
          <div className="absolute inset-0 bg-ink" />
          <div className="absolute inset-0 flex items-center justify-center bg-ink">
            <div className="flex items-baseline gap-6 px-6 text-center">
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-ember">◉ Loading</span>
              <p
                className="display text-bone"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
              >
                {label}
              </p>
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">→ WeDo</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </>
  );
}
