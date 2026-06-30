import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";

const items = [
  { to: "/", label: "Home", zh: "首頁" },
  { to: "/about", label: "About", zh: "關於" },
  { to: "/work", label: "Work", zh: "作品" },
  { to: "/labs", label: "Labs", zh: "實驗" },
  { to: "/story", label: "Story", zh: "故事" },
  { to: "/contact", label: "Contact", zh: "聯繫" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 md:px-10">
      <Link to="/" className="mono text-[11px] uppercase tracking-[0.25em] text-bone">
        <span className="text-ember">[ </span>WE&nbsp;·&nbsp;DO<span className="text-ember"> ]</span>
      </Link>
      <div className="mono hidden text-[10px] uppercase tracking-[0.3em] text-bone/60 md:block">
        Design / Develop / Automate · 2026
      </div>
      <button
        onClick={() => setOpen((o) => !o)}
        className="mono flex items-center gap-3 text-[11px] uppercase tracking-[0.25em] text-bone"
        aria-label="Toggle menu"
      >
        <span className="hidden sm:inline">{open ? "Close" : "Menu"}</span>
        <span className="relative block h-3 w-6">
          <span className={`absolute left-0 top-1 block h-px w-6 bg-bone transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`} />
          <span className={`absolute left-0 top-2 block h-px w-6 bg-bone transition-transform ${open ? "-translate-y-[1px] -rotate-45" : ""}`} />
        </span>
      </button>

      {/* Fullscreen menu */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-500 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        style={{ background: "var(--ink)" }}
      >
        <nav className="grain mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:px-10">
          <ul className="space-y-2 md:space-y-1">
            {items.map((it, i) => {
              const active = path === it.to;
              return (
                <li key={it.to} className="hairline group/it">
                  <Link
                    to={it.to}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-3 md:py-5"
                  >
                    <span className="flex items-baseline gap-6">
                      <span className="mono text-[10px] uppercase tracking-widest text-bone/40">
                        ( {String(i).padStart(2, "0")} )
                      </span>
                      <span className={`serif text-5xl leading-none transition-colors md:text-7xl lg:text-8xl ${active ? "text-ember" : "text-bone group-hover/it:text-ember"}`}>
                        {it.label}
                      </span>
                    </span>
                    <span className="mono text-xs text-bone/40">{it.zh}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="mt-12 flex flex-wrap items-end justify-between gap-6 border-t border-bone/10 pt-6">
            <a href="mailto:hello@wedo.studio" className="serif text-2xl text-bone hover:text-ember md:text-4xl">hello@wedo.studio</a>
            <span className="mono text-[10px] uppercase tracking-widest text-bone/40">WeDo Studio · 2026 ©</span>
          </div>
        </nav>
      </div>
    </header>
  );
}
