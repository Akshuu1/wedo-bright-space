import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ProjectArt } from "@/components/site/ProjectArt";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — WeDo" },
      {
        name: "description",
        content:
          "Selected projects: websites, mobile apps and automations built for founders and modern brands, 2024 — 2026.",
      },
      { property: "og:title", content: "Work — WeDo" },
      { property: "og:description", content: "Selected projects, 2024 — 2026." },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Work — WeDo",
          url: "/work",
        }),
      },
    ],
  }),
  component: Work,
});

const disciplines = ["All", "Web", "Mobile", "AI", "Motion"];

function Work() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleO = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const [filter, setFilter] = useState("All");

  return (
    <main className="bg-ink text-bone">
      {/* ============== HERO ============== */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-32 md:px-12 md:pt-40"
      >
        {/* aurora */}
        <div
          className="pointer-events-none absolute -left-40 top-20 h-[600px] w-[600px] rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #B5566B, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute right-[-15%] bottom-10 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #f6ea3a, transparent 70%)" }}
        />

        {/* film strip on side */}
        <div className="pointer-events-none absolute left-2 top-1/4 hidden flex-col gap-2 md:flex">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-3 w-4 border border-bone/40" />
          ))}
        </div>

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="pill">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" style={{ animation: "blink 1.6s infinite" }} />
              Selected work
            </span>
          </div>
          <span className="mono text-right text-[10px] uppercase tracking-[0.28em] text-bone/50">
            {String(projects.length).padStart(2, "0")} projects
          </span>
        </div>

        <motion.div style={{ y: titleY, opacity: titleO }} className="relative z-10">
          <span className="pill mb-6 border-ember bg-ember/10 text-ember">◐ Selected projects · 2024 — 2026</span>
          <h1 className="display leading-[0.8] tracking-[-0.06em]" style={{ fontSize: "clamp(3rem, 13vw, 16rem)" }}>
            Selected
            <span className="align-super text-ember" style={{ fontSize: "0.18em" }}>
              ®
            </span>
            <br />
            <span className="text-outline">Projects</span>
          </h1>
          <p className="mono mt-6 max-w-md text-[11px] uppercase tracking-[0.24em] text-bone/60">
            Not another website — every project solves a real business problem
            <span className="text-bone"> · hover to preview, click to read</span>
          </p>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center gap-2 border-t-2 border-bone pt-5">
          <p className="mono text-[10px] uppercase tracking-[0.4em] text-bone/60">Scroll</p>
          <span className="text-bone/40" style={{ animation: "blink 1.8s ease-in-out infinite" }}>
            ↓
          </span>
        </div>
      </section>

      {/* ============== TICKER ============== */}
      <div className="ticker-strip">
        <div className="marquee-track py-4">
          {[...Array(2)].flatMap((_, r) =>
            projects.map((p, i) => (
              <span
                key={`${r}-${i}`}
                className="mono flex items-center gap-8 px-8 text-[13px] font-bold uppercase tracking-[0.22em]"
              >
                ★ {p.client}
                <span className="opacity-40">·</span>
                <span className="opacity-80">{p.year}</span>
                <span className="opacity-40">/</span>
              </span>
            )),
          )}
        </div>
      </div>

      {/* ============== FILTER RAIL ============== */}
      <section className="border-b-2 border-bone bg-chalk px-6 py-6 md:px-12">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {disciplines.map((d) => (
              <button
                key={d}
                onClick={() => setFilter(d)}
                className={`mono border-2 border-bone px-4 py-2 text-[11px] uppercase tracking-[0.22em] transition ${
                  filter === d ? "bg-bone text-ink" : "bg-ink text-bone hover:bg-zap"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <span className="mono text-[10px] uppercase tracking-[0.28em] text-bone/60">
            filter · showing {filter.toLowerCase()}
          </span>
        </div>
      </section>

      {/* ============== HOVER-PREVIEW INDEX ============== */}
      <ProjectIndex filter={filter} />

      {/* ============== MARQUEE ============== */}
      <div className="border-y-2 border-bone bg-bone py-10 text-ink">
        <div className="marquee-track">
          {[...projects, ...projects].map((p, i) => (
            <span
              key={i}
              className="display flex items-center gap-16 pr-16 text-ink"
              style={{ fontSize: "clamp(3rem, 9vw, 8rem)", letterSpacing: "-0.05em", lineHeight: 1 }}
            >
              {p.title}
              <span className="text-ember">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ============== TAIL CTA ============== */}
      <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-24 text-center">
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #B5566B, transparent 70%)" }}
        />
        <div className="relative">
          <span className="pill mb-6">[ end of archive ]</span>
          <Link
            to="/contact"
            className="display mt-6 block hover:text-ember"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
            data-cursor="view"
          >
            Have an idea?
            <br />
            <span className="text-gradient">Let&rsquo;s build it →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Hover-preview index ---------------- */

function ProjectIndex({ filter }: { filter: string }) {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [clock, setClock] = useState("");

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date();
      setClock(
        `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`,
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const filtered = projects.filter(
    (p) => filter === "All" || p.tags.some((t) => t.toLowerCase().includes(filter.toLowerCase())),
  );

  return (
    <section
      className="relative px-6 py-24 md:px-12 md:py-32"
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-4">
          <div className="flex items-center gap-3">
            <span className="pill">index · {String(filtered.length).padStart(2, "0")}</span>
            <span className="mono hidden text-[10px] uppercase tracking-[0.28em] text-bone/50 md:inline">
              hover to preview · click to open
            </span>
          </div>
          <span className="mono tabular-nums text-[10px] uppercase tracking-[0.32em] text-bone/50">
            local · {clock}
          </span>
        </div>

        <ul className="border-t-2 border-bone">
          {filtered.map((p, i) => (
            <li
              key={p.slug}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((v) => (v === i ? null : v))}
              className="group relative border-b-2 border-bone transition-colors hover:bg-ember/5"
            >
              {(() => {
                const inner = (
                  <>
                    <span className="mono text-[11px] uppercase tracking-[0.3em] text-bone/50 transition group-hover:text-ember">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <motion.h3
                      className="display truncate text-bone transition"
                      style={{ fontSize: "clamp(2rem, 6.5vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
                      whileHover={{ x: 14 }}
                      transition={{ type: "spring", stiffness: 220, damping: 22 }}
                    >
                      <span className="transition group-hover:text-ember">{p.title}</span>
                    </motion.h3>

                    <div className="mono hidden text-[11px] uppercase tracking-[0.28em] text-bone/60 md:block">
                      <div>{p.client}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {p.tags.map((t) => (
                          <span key={t} className="border border-bone/40 px-2 py-0.5 text-[10px]">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <span className="mono text-right text-[10px] uppercase tracking-[0.3em] text-bone/50 group-hover:text-ember">
                      {p.year}
                      <span className="ml-3 inline-block transition group-hover:translate-x-1">
                        {p.url ? "↗" : "→"}
                      </span>
                    </span>
                  </>
                );
                const cls =
                  "grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-6 transition md:grid-cols-[3.5rem_minmax(0,3fr)_minmax(0,2fr)_auto] md:gap-8 md:py-10";
                return p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer noopener" data-cursor="view" className={cls}>
                    {inner}
                  </a>
                ) : (
                  <Link to="/work/$slug" params={{ slug: p.slug }} data-cursor="view" className={cls}>
                    {inner}
                  </Link>
                );
              })()}

              {/* mobile meta */}
              <div className="mono flex justify-between pb-4 text-[10px] uppercase tracking-[0.28em] text-bone/50 md:hidden">
                <span>{p.client}</span>
                <span>{p.tags.join(" · ")}</span>
              </div>
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <p className="mono py-12 text-center text-[11px] uppercase tracking-[0.28em] text-bone/40">
            no projects match — try another filter
          </p>
        )}
      </div>

      {/* Cursor-tracked preview (desktop only) */}
      <AnimatePresence>
        {active !== null && filtered[active] && (
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.9, y: 20, rotate: -3 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotate: -2 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotate: -3 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-10 hidden h-[340px] w-[440px] -translate-x-1/2 -translate-y-1/2 overflow-hidden border-2 border-bone shadow-[10px_10px_0_0_#B5566B] md:block"
            style={{ left: pos.x, top: pos.y }}
          >
            <ProjectArt
              index={active}
              title={filtered[active].title}
              palette={filtered[active].palette}
              className="h-full w-full"
            />
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t-2 border-bone bg-ink/95 px-3 py-2">
              <span className="mono text-[9px] uppercase tracking-[0.28em] text-bone">
                ▶ preview · {filtered[active].client}
              </span>
              <span className="mono text-[9px] uppercase tracking-[0.28em] text-ember">open →</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
