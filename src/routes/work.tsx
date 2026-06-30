import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { ProjectArt } from "@/components/site/ProjectArt";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — WeDo Studio" },
      { name: "description", content: "Selected projects: websites, apps and automations." },
      { property: "og:title", content: "Work — WeDo Studio" },
      { property: "og:description", content: "Selected projects." },
    ],
  }),
  component: Work,
});

function Work() {
  return (
    <main className="bg-ink">
      {/* Intro */}
      <section className="relative flex min-h-[90vh] flex-col justify-end px-6 pb-20 pt-40 md:px-12 md:pb-28">
        <SectionLabel index="02" label="work / archive" />
        <h1
          className="display mt-10 text-bone"
          style={{ fontSize: "clamp(4rem, 14vw, 16rem)", lineHeight: 0.85 }}
        >
          Selected
          <br />
          <span className="text-bone/40">work.</span>
        </h1>
        <div className="mt-10 flex items-end justify-between border-t border-bone/10 pt-6">
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-bone/50">
            {String(projects.length).padStart(2, "0")} cases · 2024 — 2026
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-bone/40">scroll ↓</p>
        </div>
      </section>

      {/* Trionn-style split-pin cases */}
      {projects.map((p, i) => (
        <CaseSplit key={p.slug} project={p} index={i} total={projects.length} />
      ))}

      {/* Tail */}
      <section className="relative z-[5] flex min-h-[60vh] items-center justify-center bg-ink px-6 text-center">
        <div>
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-ember">[ end of archive ]</p>
          <Link
            to="/contact"
            className="display mt-8 inline-block text-bone hover:text-ember"
            style={{ fontSize: "clamp(3rem, 9vw, 9rem)", letterSpacing: "-0.04em" }}
            data-cursor="view"
          >
            Start a project →
          </Link>
        </div>
      </section>
    </main>
  );
}

function CaseSplit({
  project,
  index,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Left meta rises from below
  const leftY = useTransform(scrollYProgress, [0.1, 0.45], ["60%", "0%"]);
  const leftO = useTransform(scrollYProgress, [0.1, 0.45], [0, 1]);
  // Right detail rises slightly later
  const rightY = useTransform(scrollYProgress, [0.25, 0.6], ["60%", "0%"]);
  const rightO = useTransform(scrollYProgress, [0.25, 0.6], [0, 1]);
  // Center art subtle parallax
  const artY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const artScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1, 0.96]);

  return (
    <section ref={ref} className="relative h-[220vh] bg-ink">
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
        {/* Centered pinned visual */}
        <motion.div
          style={{ y: artY, scale: artScale }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="h-[78vh] w-[58vw] max-w-[1100px] overflow-hidden rounded-[2rem] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)]">
            <ProjectArt
              index={index}
              title={project.title}
              palette={project.palette}
              className="h-full w-full"
            />
          </div>
        </motion.div>

        {/* Top center label */}
        <div className="pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-center">
          <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone/60">
            CASE {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        {/* Left rising panel */}
        <motion.div
          style={{ y: leftY, opacity: leftO }}
          className="absolute bottom-20 left-6 max-w-[36%] md:left-12 will-change-transform"
        >
          <p className="mono mb-3 text-[10px] uppercase tracking-[0.32em] text-ember">
            {project.client} · {project.year}
          </p>
          <h2
            className="display text-bone"
            style={{ fontSize: "clamp(2.2rem, 4.5vw, 5rem)", lineHeight: 0.92 }}
          >
            {project.title}
          </h2>
          <p className="mt-4 max-w-sm text-sm text-bone/70 md:text-base">{project.brief}</p>
        </motion.div>

        {/* Right rising panel */}
        <motion.div
          style={{ y: rightY, opacity: rightO }}
          className="absolute bottom-20 right-6 max-w-[32%] text-right md:right-12 will-change-transform"
        >
          <div className="ml-auto flex flex-wrap justify-end gap-2">
            {project.tags.map((t) => (
              <span
                key={t}
                className="mono border border-bone/25 px-3 py-1 text-[10px] uppercase tracking-widest text-bone/75 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            data-cursor="view"
            className="mono mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-bone hover:text-ember"
          >
            Explore project <span aria-hidden>→</span>
          </Link>
        </motion.div>

        {/* Bottom caption */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2">
          <span className="mono text-[10px] uppercase tracking-[0.32em] text-bone/45">
            ✦ {project.tags[0]?.toLowerCase()} · {project.tags[1]?.toLowerCase()}
          </span>
        </div>
      </div>
    </section>
  );
}
