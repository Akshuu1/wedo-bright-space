import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
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
          style={{ fontSize: "clamp(4rem, 16vw, 18rem)", lineHeight: 0.85 }}
        >
          Selected<br />
          <span className="text-ember italic" style={{ fontFamily: "var(--font-editorial)", fontWeight: 300 }}>
            work.
          </span>
        </h1>
        <div className="mt-10 flex items-end justify-between border-t border-bone/10 pt-6">
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-bone/50">
            {String(projects.length).padStart(2, "0")} cases · 2024 — 2026
          </p>
          <p className="mono text-[10px] uppercase tracking-[0.28em] text-bone/40">
            scroll ↓
          </p>
        </div>
      </section>

      {/* Stacked sticky cards — Trionn-style reveal from bottom */}
      <section className="relative">
        {projects.map((p, i) => (
          <StickyCase key={p.slug} project={p} index={i} total={projects.length} />
        ))}
      </section>

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

function StickyCase({
  project,
  index,
  total,
}: {
  project: (typeof projects)[number];
  index: number;
  total: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  // Track this card's wrapper. As its top approaches the viewport top,
  // the card slides up from 100% (fully below the fold) to 0% (covering).
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start start"],
  });
  // Track scroll-out so we can subtly scale + dim the card as the next
  // one rises over it (creates the depth-stack feel).
  const { scrollYProgress: outProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  // First card is already on-screen; later cards slide up from the bottom.
  const yFrom = index === 0 ? "0%" : "100%";
  const y = useTransform(scrollYProgress, [0, 1], [yFrom, "0%"]);
  const scale = useTransform(outProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(outProgress, [0, 1], [1, 0.55]);

  return (
    <div ref={ref} className="relative h-[200vh]">
      <motion.article
        style={{ y, scale, opacity, zIndex: 10 + index }}
        className="sticky top-0 flex h-screen w-full items-stretch overflow-hidden rounded-t-[2.5rem] bg-ink shadow-[0_-40px_120px_-40px_rgba(0,0,0,0.7)] will-change-transform"
      >

        <Link
          to="/work/$slug"
          params={{ slug: project.slug }}
          data-cursor="view"
          className="group relative grid h-full w-full grid-cols-1 md:grid-cols-12"
        >
          {/* Left meta */}
          <div className="relative z-10 flex flex-col justify-between p-8 md:col-span-5 md:p-14">
            <div className="flex items-center justify-between">
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-bone/50">
                {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-ember">
                {project.year}
              </span>
            </div>

            <div>
              <p className="mono text-[10px] uppercase tracking-[0.28em] text-bone/40">
                {project.client}
              </p>
              <h2
                className="display mt-4 text-bone transition-colors group-hover:text-ember"
                style={{ fontSize: "clamp(3rem, 7vw, 7rem)", lineHeight: 0.9 }}
              >
                {project.title}
              </h2>
              <p className="mt-6 max-w-md text-bone/70 md:text-lg">
                {project.brief}
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span
                    key={t}
                    className="mono border border-bone/20 px-3 py-1 text-[10px] uppercase tracking-widest text-bone/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
                ◉ case_{String(index + 1).padStart(2, "0")}
              </span>
              <span className="mono inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-bone/70 transition-colors group-hover:text-ember">
                View case <span aria-hidden>↗</span>
              </span>
            </div>
          </div>

          {/* Right art */}
          <div className="relative md:col-span-7">
            <ProjectArt
              index={index}
              title={project.title}
              palette={project.palette}
              className="h-full w-full"
            />
            <ParallaxBadge progress={scrollYProgress} index={index} />

          </div>
        </Link>
      </motion.article>
    </div>
  );
}

function ParallaxBadge({ progress, index }: { progress: MotionValue<number>; index: number }) {
  const y = useTransform(progress, [0, 1], ["20%", "-20%"]);
  return (
    <motion.div
      style={{ y }}
      className="pointer-events-none absolute bottom-10 right-10 hidden md:block"
    >
      <span
        className="serif italic text-bone/30"
        style={{ fontSize: "10rem", lineHeight: 0.85 }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </motion.div>
  );
}
