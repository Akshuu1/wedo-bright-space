import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { ProjectArt } from "@/components/site/ProjectArt";
import { Magnetic } from "@/components/site/Magnetic";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeDo Studio — Designed to ship, built to last." },
      { name: "description", content: "WeDo is an independent digital studio building websites, mobile apps and intelligent automations for teams that ship." },
      { property: "og:title", content: "WeDo Studio" },
      { property: "og:description", content: "Websites, products and automations designed to mean something." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative bg-ink">
      <Hero />
      <KeyFacts />
      <Marquee items={["Impact", "Inspire", "Innovate", "Iterate"]} />
      <Manifest />
      <CasesScroll />
      <LightInversion />
      <ContactStrip />
    </main>
  );
}

/* -------------------------------- HERO -------------------------------- */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const lensX = useMotionValue(0.42);
  const lensY = useMotionValue(0.55);
  const sx = useSpring(lensX, { stiffness: 60, damping: 18 });
  const sy = useSpring(lensY, { stiffness: 60, damping: 18 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      lensX.set(e.clientX / window.innerWidth);
      lensY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [lensX, lensY]);

  const lensBg = useTransform([sx, sy], ([x, y]) =>
    `radial-gradient(160px 160px at ${(x as number) * 100}% ${(y as number) * 100}%, oklch(1 0 0 / 0.18), transparent 70%)`
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] w-full overflow-hidden pt-24 md:pt-28"
      style={{ background: "#0a0a0a", color: "#f4f1ea" }}
    >
      {/* faint geometric wireframes */}
      <Wireframes />

      {/* sweeping ember streak */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-[-20%] top-[55%] h-[2px] w-[80vw] origin-left rotate-[-18deg] ember-streak opacity-80 blur-[1px]"
          style={{ animation: "sweep 6s ease-in-out infinite alternate" }}
        />
        <div
          className="absolute right-[-10%] top-[65%] h-[1px] w-[40vw] -rotate-[20deg] ember-streak opacity-50"
          style={{ animation: "sweep 8s ease-in-out infinite alternate-reverse" }}
        />
      </div>

      {/* lens cursor light */}
      <motion.div className="pointer-events-none absolute inset-0 z-[1]" style={{ background: lensBg }} />

      {/* HUD top markers */}
      <div className="pointer-events-none absolute inset-x-0 top-24 z-[2] mx-auto flex max-w-7xl items-center justify-between px-6 md:top-28 md:px-10">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-[#f4f1ea]/50">[ 01 / Index ]</p>
        <p className="mono hidden text-[10px] uppercase tracking-[0.3em] text-[#f4f1ea]/50 md:flex md:items-center md:gap-2">
          <span className="block h-1.5 w-1.5 rounded-full bg-ember" style={{ animation: "blink 2s ease-in-out infinite" }} />
          Studio · Online
        </p>
      </div>

      {/* central content */}
      <motion.div
        style={{ y: yShift, opacity }}
        className="relative z-[2] mx-auto flex max-w-[1500px] flex-col px-6 pt-[18vh] md:px-10"
      >
        <h1
          className="display max-w-[14ch] text-[14vw] md:text-[9.2vw] lg:text-[8.2rem]"
          style={{ letterSpacing: "-0.055em", lineHeight: "0.9", color: "#f4f1ea" }}
        >
          Designed
          <br />
          <span style={{ color: "#f4f1ea", opacity: 0.95 }}>to ship —</span>
          <br />
          <span className="text-gradient">built to last.</span>
        </h1>

        <div className="mt-10 flex flex-col items-start gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
          <Magnetic strength={0.25}>
            <Link
              to="/contact"
              className="mono group inline-flex items-center gap-3 border-b border-[#f4f1ea]/40 pb-2 text-[11px] uppercase tracking-[0.3em] text-[#f4f1ea] hover:border-ember"
            >
              <span className="block h-1.5 w-1.5 rounded-full bg-ember transition-transform group-hover:scale-150" />
              Start a project
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </Magnetic>

          <p className="max-w-sm text-sm leading-relaxed text-[#f4f1ea]/55 md:text-right">
            Websites, mobile apps, AI &amp; automations built for teams that need
            to move — lean, sensibly priced, shipped on time.
          </p>
        </div>
      </motion.div>

      {/* bottom microcopy */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[2] mx-auto flex max-w-7xl items-end justify-between px-6 md:bottom-8 md:px-10">
        <div className="mono text-[10px] uppercase tracking-[0.3em] text-[#f4f1ea]/40">
          <p>Scroll to enter</p>
          <p className="mt-1 text-[#f4f1ea]/30">↓ ↓ ↓</p>
        </div>
        <div className="mono text-right text-[10px] uppercase tracking-[0.3em] text-[#f4f1ea]/40">
          <p>Move cursor</p>
          <p className="mt-1 text-[#f4f1ea]/30">to reveal the lens</p>
        </div>
      </div>
    </section>
  );
}


function LensWord({ text }: { text: string }) {
  return (
    <span className="relative inline-block">
      <span className="text-bone">{text}</span>
      <span
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
        style={{
          WebkitMaskImage: "linear-gradient(90deg, transparent 0%, #000 35%, #000 65%, transparent 100%)",
          maskImage: "linear-gradient(90deg, transparent 0%, #000 35%, #000 65%, transparent 100%)",
          animation: "lens 6s ease-in-out infinite",
        }}
      >
        <span className="block text-ember opacity-90" style={{ filter: "blur(4px)" }}>
          {text}
        </span>
      </span>
    </span>
  );
}

function Wireframes() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.18]"
      viewBox="0 0 1200 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ animation: "drift 14s ease-in-out infinite" }}
    >
      <defs>
        <linearGradient id="wf" x1="0" x2="1">
          <stop offset="0" stopColor="oklch(0.74 0.17 55 / 0.6)" />
          <stop offset="1" stopColor="oklch(0.55 0.18 35 / 0)" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#wf)" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <rect
            key={i}
            x={420 + i * 30}
            y={300 + i * 22}
            width="380"
            height="240"
            rx="36"
            transform={`rotate(${-18 + i * 2} 600 420)`}
          />
        ))}
      </g>
      <g fill="oklch(0.95 0.12 85 / 0.6)">
        <circle cx="320" cy="270" r="1.6" />
        <circle cx="900" cy="180" r="1.4" />
        <circle cx="1080" cy="600" r="2" />
        <circle cx="220" cy="700" r="1.4" />
      </g>
    </svg>
  );
}

/* ------------------------------- KEY FACTS ------------------------------- */

function KeyFacts() {
  const stats = [
    { k: "48", l: "Products shipped" },
    { k: "12", l: "Countries served" },
    { k: "7yr", l: "Median client tenure" },
    { k: "100%", l: "Independent &amp; founder-owned" },
  ];
  return (
    <section className="border-y border-bone/10 px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="02" label="Key facts" />
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.k} delay={i * 0.06}>
              <p
                className="display text-6xl text-bone md:text-7xl"
                style={{ letterSpacing: "-0.05em" }}
              >
                {s.k}
              </p>
              <p
                className="mono mt-3 text-[10px] uppercase tracking-[0.25em] text-bone/50"
                dangerouslySetInnerHTML={{ __html: s.l }}
              />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- MANIFEST ------------------------------- */

function Manifest() {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-32 md:px-10 md:py-40">
      <SectionLabel index="03" label="Approach" />
      <Reveal>
        <p
          className="display mt-10 max-w-[20ch] text-5xl text-bone md:text-[5.5rem]"
          style={{ letterSpacing: "-0.045em", lineHeight: "1.02" }}
        >
          We treat software like a&nbsp;
          <span className="text-gradient">measured craft</span>
          &nbsp;— focused vision, calm execution, no theatre.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-8 border-t border-bone/10 pt-10 md:grid-cols-3">
        {[
          { k: "Clarity first", v: "Tight scopes. Plain language. No deck-ware." },
          { k: "Craft always", v: "Type, motion and code held to the same bar." },
          { k: "Built to scale", v: "Lean stacks that survive the second team." },
        ].map((b, i) => (
          <Reveal key={b.k} delay={i * 0.08}>
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">
              0{i + 1}
            </p>
            <h3 className="mt-3 text-xl text-bone">{b.k}.</h3>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-bone/55">{b.v}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ----------------------------- CASES SCROLL ----------------------------- */

function CasesScroll() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["6%", "-72%"]);

  return (
    <section ref={ref} className="relative h-[360vh] bg-ink">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24 md:pt-28">
        <div className="px-6 md:px-10">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <SectionLabel index="04" label="Selected work" />
            <Link
              to="/work"
              className="mono hidden border-b border-bone/40 pb-1 text-[10px] uppercase tracking-[0.3em] hover:border-ember md:inline-block"
            >
              All cases →
            </Link>
          </div>
          <h2
            className="display mt-6 text-5xl text-bone md:text-[6rem]"
            style={{ letterSpacing: "-0.05em" }}
          >
            A selection, <span className="text-gradient">in motion.</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="mt-10 flex flex-1 items-center gap-6 pl-[6vw] pr-[6vw]">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className="relative h-[62vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-bone/10 md:w-[46vw]"
            >
              <Link to="/work/$slug" params={{ slug: p.slug }} className="block h-full">
                <ProjectArt index={i} title={p.title} palette={p.palette} className="h-full w-full" />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                  <p className="mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
                    {String(i + 1).padStart(2, "0")} · {p.year}
                  </p>
                  <p className="mono text-right text-[10px] uppercase tracking-[0.25em] text-bone/70">
                    {p.tags.join(" / ")}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="mono text-[10px] uppercase tracking-[0.25em] text-bone/70">
                      {p.client}
                    </p>
                    <h3
                      className="display mt-2 text-4xl text-bone md:text-5xl"
                      style={{ letterSpacing: "-0.04em" }}
                    >
                      {p.title}.
                    </h3>
                  </div>
                  <span className="mono text-[10px] uppercase tracking-[0.25em] text-bone/60">
                    View →
                  </span>
                </div>
              </Link>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- LIGHT INVERSION --------------------------- */

function LightInversion() {
  return (
    <section className="relative overflow-hidden bg-chalk px-6 py-32 text-bone md:px-10 md:py-40">
      <div className="mx-auto max-w-7xl">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/50">[ 05 ] Capabilities</p>
        <h2
          className="display mt-8 max-w-[16ch] text-5xl text-bone md:text-[6rem]"
          style={{ letterSpacing: "-0.05em", lineHeight: "1" }}
        >
          One studio.<br />
          <span style={{
            background: "linear-gradient(95deg, oklch(0.55 0.18 35), oklch(0.74 0.17 55))",
            WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent",
          }}>Four disciplines.</span>
        </h2>

        <ul className="mt-16 divide-y divide-bone/10 border-y border-bone/10">
          {[
            { n: "01", k: "Web design & development", v: "Editorial sites, e-commerce, headless CMS, WebGL." },
            { n: "02", k: "Mobile applications", v: "iOS, Android, React Native — built around a single gesture." },
            { n: "03", k: "AI & automation", v: "Agents, internal tooling, pipelines that retire manual work." },
            { n: "04", k: "Brand & motion", v: "Identity systems, motion direction, type & art direction." },
          ].map((s, i) => (
            <li key={s.n} className="group/row grid grid-cols-12 items-center gap-4 py-7 transition-colors hover:bg-ink/[0.04]">
              <span className="mono col-span-2 text-[10px] uppercase tracking-[0.25em] text-bone/50 md:col-span-1">
                {s.n}
              </span>
              <h3
                className="display col-span-10 text-3xl text-bone md:col-span-6 md:text-5xl"
                style={{ letterSpacing: "-0.04em" }}
              >
                {s.k}
              </h3>
              <p className="col-span-12 text-sm text-bone/60 md:col-span-4 md:text-right">
                {s.v}
              </p>
              <span className="mono col-span-12 text-[10px] uppercase tracking-[0.25em] text-bone/40 md:col-span-1 md:text-right">
                →
              </span>
              {/* unused index to silence lint */}
              <span className="hidden" aria-hidden>{i}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------- CONTACT STRIP ----------------------------- */

function ContactStrip() {
  return (
    <section className="relative overflow-hidden border-t border-bone/10 bg-ink px-6 py-24 md:px-10 md:py-36">
      {/* soft ember glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.17 55 / 0.55), transparent 70%)" }}
      />
      {/* index line */}
      <div className="relative mx-auto flex max-w-7xl items-center justify-between">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">[ 06 ] Start a project</p>
        <p className="mono hidden text-[10px] uppercase tracking-[0.3em] text-bone/40 md:block">
          ✦ available · booking Q3 — Q4 2026
        </p>
      </div>

      {/* headline block — mobile safe */}
      <div className="relative mx-auto mt-10 max-w-7xl">
        <h2
          className="display text-bone"
          style={{ fontSize: "clamp(3rem, 12vw, 12rem)", letterSpacing: "-0.06em", lineHeight: 0.88 }}
        >
          Let&rsquo;s build
          <br />
          <span className="text-bone/35">something</span>
          <br />
          <span className="text-gradient">unforgettable.</span>
        </h2>

        <div className="mt-10 grid gap-8 border-t border-bone/10 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <Magnetic strength={0.1}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-bone/25 bg-bone/[0.03] px-6 py-4 text-bone backdrop-blur transition hover:border-ember hover:bg-ember hover:text-ink md:px-8 md:py-5"
              data-cursor="view"
            >
              <span className="mono text-[10px] uppercase tracking-[0.3em]">hello@wedo.studio</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current transition group-hover:rotate-45">
                →
              </span>
            </Link>
          </Magnetic>

          <div className="flex flex-col gap-1 text-right">
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
              New projects · Q3 — Q4 2026
            </p>
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">
              Remote first · GMT ± 6
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

