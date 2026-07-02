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

const stickers = [
  { label: "★ Booking Q3 ’26", rot: -6, bg: "bg-ember", fg: "text-ink" },
  { label: "no bloat", rot: 4, bg: "bg-bone", fg: "text-ink" },
  { label: "ship fast ✦", rot: -3, bg: "bg-yellow-300", fg: "text-ink" },
  { label: "remote · worldwide", rot: 5, bg: "bg-bone/10 border border-bone/30", fg: "text-bone" },
  { label: "made with intent", rot: -4, bg: "bg-bone", fg: "text-ink" },
  { label: "vibes: high", rot: 7, bg: "bg-ember", fg: "text-ink" },
];

export function Footer() {
  const clock = useClock();

  return (
    <footer className="relative mt-32 overflow-hidden bg-ink text-bone">
      {/* Grain + glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-96 bg-[radial-gradient(50%_60%_at_50%_100%,rgba(255,107,0,0.28),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* Marquee ticker */}
      <div className="relative border-b border-bone/10 bg-ember py-3 text-ink">
        <motion.div
          className="flex whitespace-nowrap mono text-[11px] font-bold uppercase tracking-[0.25em]"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0 items-center gap-6 pr-6">
              {[
                "★ open for Q3 · 2026",
                "websites",
                "★",
                "apps",
                "★",
                "automations",
                "★",
                "ship in weeks not quarters",
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

      {/* CTA hero */}
      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:px-10">
        <div className="flex flex-wrap items-center gap-3">
          <span className="mono rounded-full border border-bone/20 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-bone/70">
            ▸ let's talk
          </span>
          <span className="mono inline-flex items-center gap-2 rounded-full bg-bone/5 px-3 py-1 text-[10px] uppercase tracking-[0.3em] text-bone/60">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            replies in &lt; 24h
          </span>
        </div>

        <Link to="/contact" className="serif group mt-6 block leading-[0.85] tracking-tight">
          <span className="block text-[18vw] md:text-[14vw] italic text-bone transition-colors group-hover:text-ember">
            say
            <span className="mx-4 inline-block -translate-y-2 rotate-[-6deg] rounded-2xl bg-ember px-6 py-2 text-[0.55em] not-italic text-ink shadow-[6px_6px_0_0_#F5F1E8]">
              hi
            </span>
            <span aria-hidden>👋</span>
          </span>
          <span className="mono mt-4 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-bone/70 group-hover:text-ember">
            <span className="h-px w-8 bg-current" />
            start a project
            <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
              →
            </motion.span>
          </span>
        </Link>

        {/* Sticker row */}
        <div className="mt-10 flex flex-wrap gap-3">
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
      </div>

      {/* Columns */}
      <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-20 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">// the studio</p>
          <p className="serif mt-4 text-2xl leading-[1.15] text-bone md:text-3xl">
            we build <span className="italic">sites</span>, <span className="italic">apps</span> &{" "}
            <span className="italic">automations</span> for teams that actually care about the details.
          </p>
          <a
            href="mailto:team.wedo06@gmail.com"
            className="group mt-6 inline-flex items-center gap-3 rounded-full border border-bone/20 bg-bone/5 px-4 py-2 text-sm text-bone backdrop-blur transition hover:border-ember hover:bg-ember hover:text-ink"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-ember text-ink group-hover:bg-ink group-hover:text-ember">
              ✉
            </span>
            team.wedo06@gmail.com
          </a>
        </div>

        <div className="md:col-span-3">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">// index</p>
          <ul className="mt-4 space-y-1.5">
            {[
              ["/", "Home"],
              ["/about", "About"],
              ["/work", "Work"],
              ["/story", "Story"],
              ["/contact", "Contact"],
            ].map(([to, label]) => (
              <li key={to}>
                <Link
                  to={to}
                  className="group relative inline-flex items-center gap-2 serif text-2xl italic text-bone/90 hover:text-ember"
                >
                  <span className="text-[10px] not-italic mono text-bone/30 group-hover:text-ember">↳</span>
                  <span className="relative">
                    {label}
                    <span className="absolute -bottom-0.5 left-0 h-0.5 w-0 bg-ember transition-all duration-300 group-hover:w-full" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">// elsewhere</p>
          <ul className="mt-4 grid grid-cols-2 gap-2">
            {[
              ["Instagram", "https://instagram.com", "IG"],
              ["LinkedIn", "https://linkedin.com", "IN"],
              ["Dribbble", "https://dribbble.com", "DR"],
              ["Read.cv", "https://read.cv", "CV"],
            ].map(([label, href, tag]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between rounded-xl border border-bone/15 bg-bone/[0.03] px-3 py-2.5 text-sm text-bone transition hover:-translate-y-0.5 hover:border-ember hover:bg-ember hover:text-ink"
                >
                  <span className="flex items-center gap-2">
                    <span className="mono text-[9px] font-bold tracking-widest text-bone/40 group-hover:text-ink/60">
                      {tag}
                    </span>
                    {label}
                  </span>
                  <span className="mono text-[10px] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Giant outline wordmark */}
      <div className="relative -mb-6 select-none px-4">
        <p
          className="serif text-center italic leading-[0.8] tracking-tight text-transparent"
          style={{
            fontSize: "clamp(6rem, 26vw, 22rem)",
            WebkitTextStroke: "1.5px rgba(245,241,232,0.35)",
          }}
        >
          wedo
          <span className="text-ember" style={{ WebkitTextStroke: "0" }}>
            .
          </span>
        </p>
      </div>

      {/* Meta bar */}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-bone/10 px-6 py-6 mono text-[10px] uppercase tracking-[0.3em] text-bone/50 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <span>© 2026 wedo studio</span>
          <span className="hidden h-3 w-px bg-bone/15 md:inline-block" />
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
            {clock || "— — : — — : — —"}
          </span>
        </div>
      </div>
    </footer>
  );
}
