type Props = {
  index: number;
  title: string;
  palette: [string, string];
  className?: string;
};

/**
 * Pure-CSS cinematic poster for a project — no raster, no AI imagery.
 * Two-color radial wash + giant numeral + grain + tracker lines.
 */
export function ProjectArt({ index, title, palette, className = "" }: Props) {
  const [a, b] = palette;
  const n = String(index + 1).padStart(2, "0");
  return (
    <div
      className={`relative isolate overflow-hidden bg-ink ${className}`}
      style={{
        backgroundImage: `radial-gradient(120% 90% at 15% 20%, ${a}55, transparent 55%),
                           radial-gradient(120% 90% at 85% 90%, ${b}55, transparent 55%),
                           linear-gradient(180deg, oklch(0.10 0.02 270), oklch(0.08 0.02 270))`,
      }}
    >
      {/* drifting orb */}
      <div
        className="absolute -left-[15%] top-[10%] aspect-square w-[55%] rounded-full blur-3xl"
        style={{ background: a, opacity: 0.35, animation: "orb-float 14s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-[10%] bottom-[5%] aspect-square w-[45%] rounded-full blur-3xl"
        style={{ background: b, opacity: 0.30, animation: "orb-float 18s ease-in-out infinite reverse" }}
      />

      {/* grid lines */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* numeral */}
      <span
        className="serif pointer-events-none absolute -bottom-[6%] -right-[2%] text-[28vw] italic leading-none text-bone/15 md:text-[18rem]"
        style={{ fontWeight: 300 }}
      >
        {n}
      </span>

      {/* corner ticks */}
      <div className="absolute left-5 top-5 mono text-[10px] uppercase tracking-widest text-bone/60">
        ◉ {title}
      </div>
      <div className="absolute bottom-5 left-5 mono text-[10px] uppercase tracking-widest text-bone/40">
        ⟵ scroll · case_{n}
      </div>

      {/* film grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20 mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </div>
  );
}
