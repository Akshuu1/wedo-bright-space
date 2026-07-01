import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const items = [
  { to: "/", label: "Home", zh: "首頁" },
  { to: "/about", label: "About", zh: "關於" },
  { to: "/work", label: "Work", zh: "作品" },
  { to: "/story", label: "Story", zh: "故事" },
  { to: "/contact", label: "Contact", zh: "聯繫" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    setOpen(false);
  }, [path]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[80] flex items-center justify-between px-5 pt-5 md:px-8 md:pt-6">
        <Link to="/" className="group flex items-center gap-2">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            className="transition-transform duration-500 group-hover:rotate-180"
          >
            <path d="M3 18 L12 4 L21 18 L17 18 L12 10 L7 18 Z" fill="currentColor" className="text-bone" />
            <path d="M9 18 L12 13 L15 18 Z" fill="currentColor" className="text-ember" />
          </svg>
          <span className="mono text-[11px] font-medium uppercase tracking-[0.22em] text-bone">
            WeDo<sup className="ml-0.5 text-[7px] text-bone/50">®</sup>
          </span>
        </Link>

        {/* status pill — visible desktop only, sits far from menu */}
        <div className="pointer-events-none absolute left-1/2 top-5 hidden -translate-x-1/2 md:top-6 md:block">
          <span className="mono inline-flex items-center gap-2 rounded-full border border-bone/15 bg-ink/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.28em] text-bone/60 backdrop-blur">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-ping rounded-full bg-ember/70" />
              <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-ember" />
            </span>
            available · 2026
          </span>
        </div>
      </header>

      {/* Menu toggle — alone on the right, above overlay */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="pill fixed right-5 top-5 z-[110] md:right-8 md:top-6"
        aria-label="Toggle menu"
        style={open ? { background: "#f4f1ea", color: "#0a0a0a", borderColor: "#0a0a0a" } : undefined}
      >
        <span>{open ? "Close" : "Menu"}</span>
        <span className="relative block h-2.5 w-4">
          <span
            className={`absolute left-0 top-0 block h-px w-4 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`}
          />
          <span
            className={`absolute left-0 top-[5px] block h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`}
          />
          <span
            className={`absolute left-0 top-[10px] block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[5px] -rotate-45" : ""}`}
          />
        </span>
      </button>

      {/* Fullscreen menu — sibling of header so it's a top-level stacking context */}
      <div
        className={`fixed inset-0 z-[100] transition-opacity duration-500 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "#0a0a0a", color: "#f4f1ea" }}
      >
        <nav className="mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
          <p className="mono mb-10 text-[10px] uppercase tracking-[0.3em] text-[#f4f1ea]/50">[ Index · 06 ]</p>
          <ul className="space-y-1">
            {items.map((it, i) => {
              const active = path === it.to;
              return (
                <li key={it.to} className="border-t border-[#f4f1ea]/10 group/it">
                  <Link
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-4 md:py-6"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="mono text-[10px] uppercase tracking-widest text-[#f4f1ea]/40">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`display text-5xl leading-[0.9] transition-colors md:text-7xl lg:text-8xl ${active ? "text-gradient" : "text-[#f4f1ea] group-hover/it:text-gradient"}`}
                      >
                        {it.label}
                      </span>
                    </span>
                    <span className="mono text-xs text-[#f4f1ea]/40">{it.zh}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-[#f4f1ea]/10 pt-6">
            <a
              href="mailto:team.wedo06@gmail.com"
              className="display text-2xl text-[#f4f1ea] hover:text-gradient md:text-4xl"
            >
              team.wedo06@gmail.com →
            </a>
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-[#f4f1ea]/40">
              MMXXVI · We design, develop &amp; automate
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
