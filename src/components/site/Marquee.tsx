import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

type Variant = "default" | "ember" | "outline" | "mono";

export function Marquee({
  items,
  variant = "default",
  speed = 1,
}: {
  items: string[];
  variant?: Variant;
  speed?: number;
}) {
  // repeat enough to fill any viewport & make the loop seamless
  const row = [...items, ...items, ...items, ...items, ...items, ...items];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // subtle scroll-linked drift on top of the CSS marquee loop
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  const isEmber = variant === "ember";
  const isOutline = variant === "outline";
  const isMono = variant === "mono";

  // Palette per variant — all use the restrained ink / bone / ember / zap palette.
  const surface = isEmber
    ? { bg: "#B5566B", fg: "#f4f1ea", accent: "#f6ea3a" }
    : isMono
      ? { bg: "#f4f1ea", fg: "#0a0a0a", accent: "#B5566B" }
      : { bg: "#0a0a0a", fg: "#f4f1ea", accent: "#B5566B" };

  return (
    <div
      ref={ref}
      className="group/marquee relative overflow-hidden"
      style={{ background: surface.bg, color: surface.fg }}
    >
      {/* hairline top + bottom */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `${surface.fg}18` }} />
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `${surface.fg}18` }} />

      {/* soft ember wash for ember variant — no ugly blur bars */}
      {isEmber && (
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(60% 120% at 50% 50%, ${surface.accent}30, transparent 70%)`,
          }}
        />
      )}

      <div className={isMono ? "py-4 md:py-6" : "py-7 md:py-10"}>
        <motion.div
          style={{ x: drift, animationDuration: `${(isMono ? 55 : 40) / speed}s` }}
          className="marquee-track items-center"
        >
          {row.map((t, i) => (
            <span key={i} className="flex items-center gap-6 pr-6 md:gap-10 md:pr-10">
              <span
                className={[
                  "whitespace-nowrap uppercase leading-none",
                  isMono
                    ? "mono text-[3.2vw] font-medium tracking-[0.14em] md:text-[15px]"
                    : "display text-[10vw] md:text-[6.5rem] lg:text-[8rem]",
                ].join(" ")}
                style={{
                  letterSpacing: isMono ? undefined : "-0.05em",
                  color: isOutline ? "transparent" : surface.fg,
                  WebkitTextStroke: isOutline ? `1.2px ${surface.fg}` : undefined,
                }}
              >
                {t}
              </span>
              <Sep fg={surface.fg} accent={surface.accent} idx={i} small={isMono} />
            </span>
          ))}
        </motion.div>
      </div>

      {/* subtle edge fades — very narrow so nothing looks blurred */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 md:w-16"
        style={{ background: `linear-gradient(90deg, ${surface.bg}, transparent)` }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 md:w-16"
        style={{ background: `linear-gradient(270deg, ${surface.bg}, transparent)` }}
      />
    </div>
  );
}

function Sep({
  fg,
  accent,
  idx,
  small = false,
}: {
  fg: string;
  accent: string;
  idx: number;
  small?: boolean;
}) {
  const glyphs = ["✦", "◆", "＋", "◐", "●"];
  const g = glyphs[idx % glyphs.length];
  const size = small ? "h-6 w-6 text-[10px]" : "h-9 w-9 text-sm md:h-11 md:w-11 md:text-base";
  return (
    <span
      className={`inline-flex ${size} shrink-0 items-center justify-center rounded-full transition-colors`}
      style={{
        color: accent,
        border: `1px solid ${fg}30`,
        animation: "spin 14s linear infinite",
      }}
    >
      {g}
    </span>
  );
}
