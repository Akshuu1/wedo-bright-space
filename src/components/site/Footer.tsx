import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function useClock() {
  const [now, setNow] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const t = d.toLocaleTimeString("en-GB", { hour12: false, timeZone: "Asia/Kolkata" });
      setNow(`${t} IST`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

const socials = [
  ["Instagram", "https://instagram.com", "IG"],
  ["LinkedIn", "https://linkedin.com", "IN"],
  ["Dribbble", "https://dribbble.com", "DR"],
  ["Read.cv", "https://read.cv", "CV"],
] as const;

const stickers = [
  { label: "★ Booking Q3 ’26", rot: -6, bg: "bg-ember", fg: "text-bone" },
  { label: "no bloat", rot: 4, bg: "bg-zap", fg: "text-bone" },
  { label: "ship fast ✦", rot: -3, bg: "bg-bone", fg: "text-ink" },
  { label: "remote · worldwide", rot: 5, bg: "bg-bone/10 border border-ink/30", fg: "text-ink" },
  { label: "made with intent", rot: -4, bg: "bg-bone", fg: "text-ink" },
  { label: "vibes: high", rot: 7, bg: "bg-ember", fg: "text-bone" },
];

export function Footer() {
  const clock = useClock();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-bone text-ink">
      {/* ember ticker */}
      <div className="relative border-y border-ink/10 bg-ember py-2 text-bone">
        <motion.div
          className="mono flex whitespace-nowrap text-[10px] font-bold uppercase tracking-[0.25em]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0 items-center gap-5 pr-5">
              {[
                "open for Q3 · 2026",
                "★",
                "websites",
                "★",
                "apps",
                "★",
                "automations",
                "★",
                "ship in weeks",
                "★",
                "say hi → team.wedo06@gmail.com",
                "★",
              ].map((t, j) => (
                <span key={j}>{t}</span>
              ))}
            </span>
          ))}
        </motion.div>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        {/* CTA */}
        <div className="py-10 md:py-14">
          <span className="mono text-[10px] uppercase tracking-[0.3em] text-ember">// start a project</span>
          <div className="mt-4 flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
            <h2
              className="display text-[13vw] leading-[0.85] tracking-tight text-ink md:text-[6.5vw]"
              style={{ letterSpacing: "-0.05em" }}
            >
              Let&rsquo;s build the
              <br />
              <span className="text-ember">next big thing</span>
            </h2>
            <a
              href="mailto:team.wedo06@gmail.com"
              className="pill group inline-flex shrink-0 items-center gap-2"
            >
              <span className="h-2 w-2 rounded-full bg-ember transition-transform group-hover:scale-150" />
              team.wedo06@gmail.com
            </a>
          </div>
        </div>

        {/* Social cards */}
        <div className="border-t border-ink/10 py-6">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">Elsewhere</p>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {socials.map(([label, href, tag]) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-xl border border-ink/15 bg-ink/5 px-3 py-2.5 text-sm text-ink transition hover:-translate-y-0.5 hover:border-ember hover:bg-ember hover:text-bone"
              >
                <span className="flex items-center gap-2">
                  <span className="mono text-[9px] font-bold tracking-widest text-ink/40 group-hover:text-bone/60">
                    {tag}
                  </span>
                  {label}
                </span>
                <span className="mono text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Sticker row */}
        <div className="flex flex-wrap gap-2 border-t border-ink/10 py-6">
          {stickers.map((s) => (
            <motion.span
              key={s.label}
              initial={{ rotate: s.rot }}
              whileHover={{ rotate: 0, scale: 1.06 }}
              transition={{ type: "spring", stiffness: 220, damping: 14 }}
              className={`mono cursor-default rounded-xl px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] shadow-[3px_3px_0_0_rgba(0,0,0,0.4)] ${s.bg} ${s.fg}`}
            >
              {s.label}
            </motion.span>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-ink/10 px-1 py-5 md:flex-row">
          <div className="flex items-center gap-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-ink">
              <path d="M3 18 L12 4 L21 18 L17 18 L12 10 L7 18 Z" fill="currentColor" />
              <path d="M9 18 L12 13 L15 18 Z" fill="currentColor" className="text-ember" />
            </svg>
            <span className="mono text-[10px] uppercase tracking-[0.3em] text-ink/50">© 2026 WeDo</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="mono inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink/50">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              {clock || "— — : — — : — —"}
            </span>
            <button
              onClick={scrollTop}
              className="mono inline-flex items-center gap-2 rounded-full border border-ink/15 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ink/70 transition hover:border-ember hover:text-ember"
            >
              Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
