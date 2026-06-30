import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export type SplitPanel = {
  side: "left" | "right";
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  meta?: ReactNode;
};

/**
 * Trionn-style split-pinned scroll section.
 * A centered visual stays pinned while panels rise alternately
 * from the left and right edges as the section scrolls.
 */
export function SplitPin({
  centerpiece,
  panels,
  label,
  caption,
}: {
  centerpiece: ReactNode;
  panels: SplitPanel[];
  label?: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Each panel gets a slice of the scroll timeline
  const slice = 1 / Math.max(panels.length, 1);

  return (
    <section
      ref={ref}
      className="relative bg-ink text-bone"
      style={{ height: `${(panels.length + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Centerpiece */}
        <motion.div
          style={{
            scale: useTransform(scrollYProgress, [0, 1], [1.05, 0.92]),
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0.6, 1, 1, 0.5]),
          }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {centerpiece}
        </motion.div>

        {/* Top label */}
        {label && (
          <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-center">
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone/60">
              {label}
            </span>
          </div>
        )}

        {/* Panels */}
        {panels.map((p, i) => {
          const start = i * slice;
          const end = start + slice;
          return <Panel key={i} panel={p} progress={scrollYProgress} start={start} end={end} />;
        })}

        {/* Bottom caption */}
        {caption && (
          <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2">
            <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone/60">
              {caption}
            </span>
          </div>
        )}
      </div>
    </section>
  );
}

function Panel({
  panel,
  progress,
  start,
  end,
}: {
  panel: SplitPanel;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const inStart = start;
  const inEnd = start + (end - start) * 0.35;
  const outStart = end - (end - start) * 0.25;
  const outEnd = end;

  const y = useTransform(progress, [inStart, inEnd, outStart, outEnd], ["60%", "0%", "0%", "-30%"]);
  const opacity = useTransform(progress, [inStart, inEnd, outStart, outEnd], [0, 1, 1, 0]);

  const align = panel.side === "left" ? "left-0 md:left-12" : "right-0 md:right-12";
  const textAlign = panel.side === "left" ? "text-left" : "text-right md:text-right";

  return (
    <motion.div
      style={{ y, opacity }}
      className={`absolute bottom-16 ${align} max-w-[44%] md:max-w-[34%] ${textAlign} will-change-transform`}
    >
      {panel.eyebrow && (
        <p className="mono mb-3 text-[10px] uppercase tracking-[0.32em] text-ember">
          {panel.eyebrow}
        </p>
      )}
      <h3
        className="display text-bone"
        style={{ fontSize: "clamp(1.8rem, 3.2vw, 3.4rem)", lineHeight: 0.95 }}
      >
        {panel.title}
      </h3>
      {panel.body && (
        <p className="mt-4 max-w-sm text-sm text-bone/65 md:text-base">{panel.body}</p>
      )}
      {panel.meta && (
        <p className="mono mt-5 text-[10px] uppercase tracking-[0.3em] text-bone/45">
          {panel.meta}
        </p>
      )}
    </motion.div>
  );
}
