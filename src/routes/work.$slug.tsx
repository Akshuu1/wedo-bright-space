import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/site/Reveal";
import { ProjectArt } from "@/components/site/ProjectArt";
import { projects, type Gallery, type Metric } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — WeDo Case Study` },
          { name: "description", content: loaderData.project.brief },
          { property: "og:title", content: `${loaderData.project.title} — WeDo` },
          { property: "og:description", content: loaderData.project.brief },
          { property: "og:url", content: `/work/${params.slug}` },
          { property: "og:type", content: "article" },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/work/${params.slug}` }] : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: loaderData.project.title,
              description: loaderData.project.brief,
              creator: { "@type": "Organization", name: "WeDo" },
              dateCreated: loaderData.project.year,
              url: `/work/${params.slug}`,
            }),
          },
        ]
      : [],
  }),
  component: Case,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center bg-ink px-6 text-center text-bone">
      <div>
        <p className="mono text-[10px] uppercase tracking-widest text-ember">[ Case not found ]</p>
        <h1 className="display mt-4 text-6xl">No such project</h1>
        <Link
          to="/work"
          className="mono mt-8 inline-block border-2 border-bone px-6 py-3 text-xs uppercase tracking-widest hover:bg-ember hover:text-ink"
        >
          ← All work
        </Link>
      </div>
    </div>
  ),
});

function Case() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const o = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <main className="bg-ink text-bone">
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-32 md:px-12 md:pt-40"
      >
        <div
          className="pointer-events-none absolute -left-40 top-20 h-[620px] w-[620px] rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${project.palette[0]}, transparent 70%)` }}
        />
        <div
          className="pointer-events-none absolute bottom-0 right-[-10%] h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${project.palette[1]}, transparent 70%)` }}
        />

        <div className="relative z-10 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="pill">
              <span className="h-1.5 w-1.5 rounded-full bg-ember" style={{ animation: "blink 1.6s infinite" }} />
              Case · {String(idx + 1).padStart(2, "0")} of {String(projects.length).padStart(2, "0")}
            </span>
            <span className="mono hidden text-[10px] uppercase tracking-[0.28em] text-bone/50 md:inline">
              ⏵ {project.client}
            </span>
          </div>
          <Link
            to="/work"
            className="mono border-b border-bone/40 pb-1 text-[10px] uppercase tracking-[0.3em] hover:border-ember hover:text-ember"
          >
            ← All work
          </Link>
        </div>

        <motion.div style={{ y, opacity: o }} className="relative z-10">
          <span className="pill mb-6 border-ember bg-ember/10 text-ember">◐ {project.tags.join(" · ")}</span>
          <h1 className="display leading-[0.82] tracking-[-0.055em]" style={{ fontSize: "clamp(2.9rem, 12vw, 13rem)" }}>
            {project.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-bone/70 md:text-2xl">{project.brief}</p>
        </motion.div>

        <div className="relative z-10 mt-10 grid gap-6 border-t-2 border-bone pt-6 md:grid-cols-4">
          {[
            ["Client", project.client],
            ["Year", project.year],
            ["Scope", project.tags.join(" · ")],
            ["Role", project.role],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/45">[ {k} ]</p>
              <p className="mt-2 text-bone">{v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= COVER ================= */}
      <section className="px-6 md:px-12">
        <Reveal>
          <div className="mx-auto max-w-[1600px] overflow-hidden border-2 border-bone shadow-[16px_16px_0_0_#B5566B]">
            <ProjectArt index={idx} title={project.title} palette={project.palette} className="aspect-video w-full" />
          </div>
        </Reveal>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="mx-auto mt-32 grid max-w-7xl gap-10 px-6 md:grid-cols-12 md:px-12">
        <div className="md:col-span-4">
          <span className="pill">01 · Problem</span>
          <p className="mono mt-6 text-[10px] uppercase tracking-[0.3em] text-bone/45">Where we started</p>
        </div>
        <Reveal className="md:col-span-8">
          <p
            className="display text-bone"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              textTransform: "none",
            }}
          >
            {project.problem}
          </p>
        </Reveal>
      </section>

      {/* ================= SOLUTION ================= */}
      <section className="mt-32 border-y-2 border-bone bg-chalk px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="pill-solid">02 · Solution</span>
            <p className="mono mt-6 text-[10px] uppercase tracking-[0.3em] text-bone/50">What we built</p>
            <div className="mt-8 flex flex-wrap gap-2">
              {project.stack.map((s: string) => (
                <span
                  key={s}
                  className="mono border-2 border-bone bg-ink px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-bone"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <Reveal className="md:col-span-8">
            <p
              className="display text-bone"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 3.25rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                textTransform: "none",
              }}
            >
              {project.solution}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================= METRICS ================= */}
      <section className="bg-bone px-6 py-20 text-ink md:px-12 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="mono text-[10px] uppercase tracking-[0.3em] text-ember">03 · Metrics</span>
              <h2
                className="display mt-4"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                Receipts, not{" "}
                <span className="text-outline" style={{ WebkitTextStrokeColor: "#0a0a0a" }}>
                  promises
                </span>
              </h2>
            </div>
            <p className="mono hidden text-[10px] uppercase tracking-[0.28em] text-ink/50 md:block">
              measured post-launch
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {project.metrics.map((m: Metric, i: number) => (
              <motion.div
                key={m.l}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border-l-2 border-ink/20 pl-4"
              >
                <p
                  className="display text-gradient"
                  style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.06em", lineHeight: 1 }}
                >
                  {m.k}
                </p>
                <p className="mono mt-2 text-[10px] uppercase tracking-[0.28em] text-ink/60">{m.l}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="pill">04 · Gallery</span>
              <h2
                className="display mt-4"
                style={{ fontSize: "clamp(2rem, 5vw, 4rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
              >
                Selected <span className="text-gradient">frames</span>
              </h2>
            </div>
            <p className="mono hidden text-[10px] uppercase tracking-[0.28em] text-bone/50 md:block">
              {String(project.gallery.length).padStart(2, "0")} of {String(project.gallery.length).padStart(2, "0")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-6">
            {project.gallery.map((g: Gallery, i: number) => (
              <Reveal key={i} delay={i * 0.08} className={i === 0 ? "md:col-span-6" : "md:col-span-3"}>
                <figure className="group relative overflow-hidden border-2 border-bone">
                  <ProjectArt
                    index={idx + i}
                    title={project.title}
                    palette={g.palette}
                    className={i === 0 ? "aspect-[21/9] w-full" : "aspect-[4/3] w-full"}
                  />
                  <figcaption className="mono absolute inset-x-0 bottom-0 flex items-center justify-between border-t-2 border-bone bg-ink/90 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-bone">
                    <span>{g.caption}</span>
                    <span className="text-ember">·{String(i + 1).padStart(2, "0")}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================= NEXT CASE ================= */}
      <section className="relative overflow-hidden border-t-2 border-bone bg-ink px-6 py-24 md:px-12 md:py-32">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
          style={{ background: `radial-gradient(closest-side, ${next.palette[0]}, transparent 70%)` }}
        />
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          data-cursor="view"
          className="group relative mx-auto block max-w-7xl"
        >
          <div className="mono flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-bone/50">
            <span>[ Next case → ]</span>
            <span>
              {next.year} · {next.client}
            </span>
          </div>
          <h2
            className="display mt-6 text-bone transition-colors group-hover:text-ember"
            style={{ fontSize: "clamp(2.9rem, 12vw, 12rem)", letterSpacing: "-0.055em", lineHeight: 0.9 }}
          >
            {next.title} <span className="text-gradient">→</span>
          </h2>
        </Link>
      </section>
    </main>
  );
}
