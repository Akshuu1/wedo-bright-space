import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { ProjectArt } from "@/components/site/ProjectArt";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — WeDo Studio" },
      { name: "description", content: "Selected projects: websites, apps and automations built for founders and modern brands." },
      { property: "og:title", content: "Work — WeDo Studio" },
      { property: "og:description", content: "Selected projects, 2024 — 2026." },
    ],
  }),
  component: Work,
});

function Work() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const titleO = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <main className="bg-ink text-bone">
      {/* ============== HERO ============== */}
      <section ref={heroRef} className="relative flex min-h-screen flex-col justify-between px-6 pb-10 pt-32 md:px-12 md:pt-40">
        <div className="flex items-start justify-between">
          <p className="mono text-[10px] uppercase tracking-[0.32em] text-ember">
            [ 02 / archive ]
          </p>
          <p className="mono max-w-[14ch] text-right text-[10px] uppercase tracking-[0.28em] text-bone/45">
            {String(projects.length).padStart(2, "0")} selected cases · 2024 — 2026
          </p>
        </div>

        <motion.div style={{ y: titleY, opacity: titleO }} className="relative">
          <h1
            className="display leading-[0.82] tracking-[-0.06em]"
            style={{ fontSize: "clamp(3rem, 13vw, 16rem)" }}
          >
            Work
            <span className="align-super text-ember" style={{ fontSize: "0.18em" }}>
              ®
            </span>
          </h1>
          <p className="mono mt-4 max-w-md text-[11px] uppercase tracking-[0.24em] text-bone/55">
            A living archive of interfaces, motion systems and quiet automations —
            <span className="text-bone"> hover the index to preview.</span>
          </p>
        </motion.div>

        <div className="flex items-end justify-between border-t border-bone/10 pt-5">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">scroll to index ↓</p>
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
            wedo · studio ® 2026
          </p>
        </div>
      </section>

      {/* ============== HOVER-PREVIEW INDEX ============== */}
      <ProjectIndex />

      {/* ============== MARQUEE ============== */}
      <div className="border-y border-bone/10 py-8">
        <div className="flex gap-16 whitespace-nowrap [animation:marquee_45s_linear_infinite]">
          {[...projects, ...projects, ...projects].map((p, i) => (
            <span
              key={i}
              className="display flex items-center gap-16 text-bone/25"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 1 }}
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
          className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, oklch(0.74 0.17 55 / 0.6), transparent 70%)" }}
        />
        <div className="relative">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">[ end of archive ]</p>
          <Link
            to="/contact"
            className="display mt-6 block hover:text-ember"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
            data-cursor="view"
          >
            Have a brief?
            <br />
            <span className="text-gradient">Let&rsquo;s talk →</span>
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------------- Hover-preview index (Trionn-style) ---------------- */

function ProjectIndex() {
  const [active, setActive] = useState<number | null>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

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
          <p className="mono text-[10px] uppercase tracking-[0.32em] text-bone/60">
            index · selected {String(projects.length).padStart(2, "0")}
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.32em] text-bone/40">
            client / year / discipline
          </p>
        </div>

        <ul className="border-t border-bone/15">
          {projects.map((p, i) => (
            <li
              key={p.slug}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive((v) => (v === i ? null : v))}
              className="group relative border-b border-bone/15"
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                data-cursor="view"
                className="grid grid-cols-[2.5rem_minmax(0,1fr)_auto] items-center gap-4 py-6 transition md:grid-cols-[3rem_minmax(0,3fr)_minmax(0,2fr)_auto] md:gap-8 md:py-10"
              >
                <span className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40 transition group-hover:text-ember">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <motion.h3
                  className="display truncate text-bone transition"
                  style={{ fontSize: "clamp(2rem, 6.5vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
                  whileHover={{ x: 12 }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                >
                  <span className="transition group-hover:text-ember">{p.title}</span>
                </motion.h3>

                <div className="mono hidden text-[11px] uppercase tracking-[0.28em] text-bone/55 md:block">
                  <div>{p.client}</div>
                  <div className="text-bone/35">{p.tags.join(" · ")}</div>
                </div>

                <span className="mono text-right text-[10px] uppercase tracking-[0.3em] text-bone/40 group-hover:text-ember">
                  {p.year}
                  <span className="ml-3 inline-block transition group-hover:translate-x-1">→</span>
                </span>
              </Link>

              {/* mobile meta */}
              <div className="mono flex justify-between pb-4 text-[10px] uppercase tracking-[0.28em] text-bone/40 md:hidden">
                <span>{p.client}</span>
                <span>{p.tags.join(" · ")}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Cursor-tracked preview (desktop only) */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute z-10 hidden h-[320px] w-[420px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] md:block"
            style={{ left: pos.x, top: pos.y }}
          >
            <ProjectArt
              index={active}
              title={projects[active].title}
              palette={projects[active].palette}
              className="h-full w-full"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
