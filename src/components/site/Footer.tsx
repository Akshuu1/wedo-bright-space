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

export function Footer() {
  const clock = useClock();

  return (
    <footer className="relative mt-32 overflow-hidden border-t border-bone/10 bg-ink text-bone">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-40 h-80 bg-[radial-gradient(60%_60%_at_50%_100%,rgba(255,107,0,0.25),transparent_70%)]"
      />

      {/* CTA band */}
      <div className="relative mx-auto max-w-7xl px-6 pt-20 md:px-10">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
          Let's build something worth remembering
        </p>
        <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
          <Link
            to="/contact"
            className="serif group inline-flex items-baseline gap-4 text-5xl leading-[0.95] text-bone hover:text-ember md:text-8xl"
          >
            <span className="italic">Start</span>
            <span>a project</span>
            <motion.span
              aria-hidden
              className="inline-block text-ember"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              →
            </motion.span>
          </Link>
          <a
            href="mailto:team.wedo06@gmail.com"
            className="mono rounded-full border border-bone/20 px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-bone/80 transition hover:border-ember hover:bg-ember hover:text-ink"
          >
            team.wedo06@gmail.com
          </a>
        </div>
      </div>

      {/* Kinetic marquee */}
      <div className="relative mt-16 border-y border-bone/10 py-6">
        <motion.div
          className="serif flex whitespace-nowrap text-6xl italic text-bone/90 md:text-8xl"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 pr-10">
              <span>Design</span>
              <span className="text-ember">✺</span>
              <span>Develop</span>
              <span className="text-ember">✺</span>
              <span>Automate</span>
              <span className="text-ember">✺</span>
              <span>Repeat</span>
              <span className="text-ember">✺</span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Columns */}
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-12 md:px-10">
        <div className="md:col-span-5">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">Studio</p>
          <p className="mt-4 max-w-md text-bone/80">
            WeDo is a digital studio building websites, apps and intelligent automations for
            teams that care about craft. Lean, fast, and sensibly priced.
          </p>
          <div className="mono mt-6 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-bone/50">
            <span className="inline-flex items-center gap-2 rounded-full border border-bone/15 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
              Booking Q3 · 2026
            </span>
            <span className="rounded-full border border-bone/15 px-3 py-1">Remote · Worldwide</span>
          </div>
        </div>

        <div className="md:col-span-3">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">Index</p>
          <ul className="mt-4 space-y-2">
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
                  className="group inline-flex items-center gap-2 text-bone/90 hover:text-ember"
                >
                  <span className="h-px w-0 bg-ember transition-all duration-300 group-hover:w-6" />
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-bone/90">
            {[
              ["Instagram", "https://instagram.com"],
              ["LinkedIn", "https://linkedin.com"],
              ["Dribbble", "https://dribbble.com"],
              ["Read.cv", "https://read.cv"],
            ].map(([label, href]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 hover:text-ember"
                >
                  {label}
                  <span className="mono text-[10px] text-bone/30 transition group-hover:text-ember">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Meta bar */}
      <div className="relative mx-auto flex max-w-7xl flex-col gap-3 border-t border-bone/10 px-6 py-6 mono text-[10px] uppercase tracking-[0.3em] text-bone/40 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex flex-wrap items-center gap-4">
          <span>WeDo Studio © 2026</span>
          <span className="hidden h-3 w-px bg-bone/15 md:inline-block" />
          <span className="inline-flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" />
            {clock || "— — : — — : — —"}
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <span>v1.0 — built with intent</span>
          <a href="#top" className="hover:text-ember">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
