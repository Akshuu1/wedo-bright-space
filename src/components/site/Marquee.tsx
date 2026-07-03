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
  const row = [...items, ...items, ...items, ...items];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  // subtle scroll-linked drift on top of the CSS marquee loop
  const drift = useTransform(scrollYProgress, [0, 1], ["0%", "-6%"]);

  const isEmber = variant === "ember";
  const isOutline = variant === "outline";
  const isMono = variant === "mono";

  return (
    <div
      ref={ref}
      className={[
        "group/marquee relative overflow-hidden border-y py-8 md:py-12",
        isEmber ? "border-ember/20 bg-ember text-ink" : "border-bone/10 bg-ink text-bone",
      ].join(" ")}
    >
      {/* edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 md:w-40"
        style={{
          background: isEmber
            ? "linear-gradient(90deg, oklch(0.74 0.17 55) 0%, transparent 100%)"
            : "linear-gradient(90deg, #0a0a0a 0%, transparent 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 md:w-40"
        style={{
          background: isEmber
            ? "linear-gradient(270deg, oklch(0.74 0.17 55) 0%, transparent 100%)"
            : "linear-gradient(270deg, #0a0a0a 0%, transparent 100%)",
        }}
      />

      <motion.div
        style={{ x: drift, animationDuration: `${40 / speed}s` }}
        className="marquee-track items-center gap-8 md:gap-14"
      >
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 md:gap-14">
            <span
              className={[
                "display whitespace-nowrap uppercase transition-transform duration-500",
                isMono
                  ? "mono text-[7vw] tracking-[-0.02em] md:text-[3.4rem]"
                  : "text-[11vw] md:text-[7.5rem]",
                isOutline ? "text-transparent" : "",
                isEmber ? "text-ink" : "text-bone",
                "group-hover/marquee:[text-shadow:0_0_40px_rgba(181,86,107,0.35)]",
              ].join(" ")}
              style={{
                letterSpacing: "-0.055em",
                WebkitTextStroke: isOutline ? "1px currentColor" : undefined,
              }}
            >
              {t}
            </span>
            <Sep isEmber={isEmber} idx={i} />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function Sep({ isEmber, idx }: { isEmber: boolean; idx: number }) {
  // rotate through a few glyphs so the ticker doesn't feel repetitive
  const glyphs = ["✦", "◆", "＋", "◐"];
  const g = glyphs[idx % glyphs.length];
  return (
    <span
      className={[
        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-lg md:h-10 md:w-10 md:text-xl",
        isEmber ? "border-ink/30 text-ink" : "border-bone/25 text-ember",
      ].join(" ")}
      style={{ animation: "spin 12s linear infinite" }}
    >
      {g}
    </span>
  );
}
