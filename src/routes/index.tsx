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
      { title: "WeDo — We don't build websites. We build businesses people remember." },
      {
        name: "description",
        content:
          "WeDo is a creative digital studio designing high-performance websites, AI-powered products and digital experiences that help ambitious brands grow faster.",
      },
      { property: "og:title", content: "WeDo — Digital experiences that grow businesses." },
      { property: "og:description", content: "Websites, AI products and digital experiences for ambitious brands." },
      { property: "og:url", content: "/" },
      { name: "twitter:title", content: "WeDo Studio" },
      { name: "twitter:description", content: "Websites, AI products and digital experiences for ambitious brands." },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Home,
});

function Home() {
  return (
    <main className="relative bg-ink">
      <Hero />
      <KeyFacts />
      <Marquee items={["Impact", "Inspire", "Innovate", "Iterate"]} variant="ember" />
      <Manifest />
      <Marquee items={["Web", "Mobile", "AI", "Automation", "Brand", "Motion"]} variant="outline" speed={0.85} />
      <CasesScroll />
      <LightInversion />
      <Marquee
        items={["Available Q3 · 2026", "Booking Q4 · 2026", "Remote first", "GMT ± 6"]}
        variant="mono"
        speed={1.2}
      />
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

  const lensBg = useTransform(
    [sx, sy],
    ([x, y]) =>
      `radial-gradient(160px 160px at ${(x as number) * 100}% ${(y as number) * 100}%, oklch(1 0 0 / 0.18), transparent 70%)`,
  );

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yShift = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden pt-20 md:pt-24"
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

      {/* central content — tighter on mobile */}
      <motion.div
        style={{ y: yShift, opacity }}
        className="relative z-[2] mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-5 pb-10 pt-3 md:px-10 md:pb-24 md:pt-[16vh]"
      >
        <h1
          className="display max-w-[14ch] text-[15vw] md:text-[9.2vw] lg:text-[8.2rem]"
          style={{ letterSpacing: "-0.045em", lineHeight: "0.92", color: "#f4f1ea" }}
        >
          We don&rsquo;t build
          <br />
          <span style={{ color: "#f4f1ea", opacity: 0.95 }}>websites —</span>
          <br />
          <span className="text-gradient">we build memory</span>
        </h1>

        <div className="mt-10 flex flex-col items-start gap-6 md:mt-14 md:flex-row md:items-end md:justify-between md:gap-8">
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
            A creative digital studio building high-performance websites, AI-powered products and experiences that turn
            visitors into customers.
          </p>
        </div>
      </motion.div>

      {/* centered scroll cue — desktop only to avoid mobile overlap */}
      <div className="pointer-events-none absolute inset-x-0 bottom-6 z-[2] hidden flex-col items-center gap-2 md:bottom-8 md:flex">
        <span className="mono text-[10px] uppercase tracking-[0.4em] text-[#f4f1ea]/50">Scroll</span>
        <span className="text-[#f4f1ea]/40" style={{ animation: "blink 1.8s ease-in-out infinite" }}>
          ↓
        </span>
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
    { k: "20", suffix: "+", l: "Projects delivered", note: "and counting" },
    { k: "100", suffix: "%", l: "Fully responsive", note: "every breakpoint" },
    { k: "A+", suffix: "", l: "Performance", note: "Lighthouse tuned" },
    { k: "∞", suffix: "", l: "Creative range", note: "no template feel" },
  ];
  return (
    <section className="relative border-y border-bone/10 bg-ink px-6 py-24 md:px-10 md:py-32">
      {/* ambient ember wash */}
      <div
        className="pointer-events-none absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(closest-side, oklch(0.74 0.17 55 / 0.5), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <SectionLabel index="02" label="Key facts" />
          <p className="mono hidden text-[10px] uppercase tracking-[0.3em] text-bone/40 md:flex md:items-center md:gap-2">
            <span
              className="block h-1.5 w-1.5 rounded-full bg-ember"
              style={{ animation: "blink 2s ease-in-out infinite" }}
            />
            Live · updated {new Date().getFullYear()}
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-14 md:grid-cols-4 md:gap-x-10">
          {stats.map((s, i) => (
            <Reveal key={s.l} delay={i * 0.08}>
              <div className="group/stat relative">
                <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember/80">
                  {String(i + 1).padStart(2, "0")} /
                </p>
                <p
                  className="display mt-3 flex items-baseline text-6xl text-bone md:text-7xl lg:text-8xl"
                  style={{ letterSpacing: "-0.06em" }}
                >
                  <span className="transition-transform duration-500 group-hover/stat:-translate-y-1">{s.k}</span>
                  {s.suffix && <span className="ml-0.5 text-3xl text-ember md:text-4xl">{s.suffix}</span>}
                </p>
                <div className="mt-4 h-px w-10 bg-bone/25 transition-all duration-500 group-hover/stat:w-24 group-hover/stat:bg-ember" />
                <p className="mono mt-3 text-[10px] uppercase tracking-[0.25em] text-bone/60">{s.l}</p>
                <p className="mono mt-1 text-[10px] uppercase tracking-[0.25em] text-bone/30">({s.note})</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- MANIFEST ------------------------------- */

function Manifest() {
  const tenets = [
    {
      k: "Strategy first",
      v: "Every decision starts with a real business problem.",
      icon: "◐",
      variant: "ink" as const,
    },
    {
      k: "Craft always",
      v: "Type, motion and code held to the same bar.",
      icon: "✦",
      variant: "ember" as const,
    },
    {
      k: "Built for growth",
      v: "Performance, clarity and results — not just pretty screens.",
      icon: "◆",
      variant: "ink" as const,
    },
  ];

  return (
    <section className="relative mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-40">
      <SectionLabel index="03" label="Approach" />
      <Reveal>
        <p
          className="display mt-8 max-w-[18ch] text-[9vw] text-bone sm:text-6xl md:mt-10 md:text-[4.5rem] lg:text-[5.5rem]"
          style={{ letterSpacing: "-0.04em", lineHeight: "1.02", overflowWrap: "break-word" }}
        >
          Designed with purpose&nbsp;
          <span className="text-gradient">built for growth</span>
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-3 md:gap-6">
        {tenets.map((b, i) => {
          const isEmber = b.variant === "ember";
          const bg = isEmber ? "#B5566B" : "#0a0a0a";
          const fg = "#f4f1ea";
          const accent = isEmber ? "#f6ea3a" : "#B5566B";
          return (
            <Reveal key={b.k} delay={i * 0.08}>
              <div
                className="group/tenet relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-[28px] p-6 transition-all duration-500 hover:-translate-y-1 md:min-h-[340px] md:p-8"
                style={{ background: bg, color: fg, boxShadow: "0 20px 60px -30px rgba(0,0,0,0.4)" }}
              >
                {/* soft gradient blob accent */}
                <div
                  className="pointer-events-none absolute -right-24 -bottom-24 h-64 w-64 rounded-full opacity-40 blur-3xl transition-transform duration-700 group-hover/tenet:scale-125"
                  style={{ background: accent }}
                />
                {/* thin top hairline */}
                <div
                  className="pointer-events-none absolute inset-x-6 top-0 h-px opacity-30 md:inset-x-8"
                  style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }}
                />
                <div className="relative flex items-center justify-between">
                  <p className="mono text-[10px] uppercase tracking-[0.3em]" style={{ color: accent }}>
                    0{i + 1} / Tenet
                  </p>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-transform duration-700 group-hover/tenet:rotate-180"
                    style={{ borderColor: `${fg}40`, color: fg }}
                  >
                    {b.icon}
                  </span>
                </div>
                <div className="relative mt-10 min-w-0">
                  <h3
                    className="display text-3xl leading-[0.95] md:text-[2rem] lg:text-[2.5rem] xl:text-5xl"
                    style={{ letterSpacing: "-0.04em", color: fg, overflowWrap: "break-word" }}
                  >
                    {b.k}.
                  </h3>
                  <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: fg, opacity: 0.65 }}>
                    {b.v}
                  </p>
                </div>
              </div>
            </Reveal>
          );
        })}
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
    <section ref={ref} className="relative h-[360vh]" style={{ background: "#0a0a0a", color: "#f4f1ea" }}>
      {/* soft ember ambient */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 h-[600px] w-[600px] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #B5566B, transparent 70%)" }}
      />
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-24 md:pt-28">
        <div className="relative px-5 md:px-10">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <SectionLabel index="04" label="Selected work" />
            <Link
              to="/work"
              className="mono hidden border-b border-ink/40 pb-1 text-[10px] uppercase tracking-[0.3em] text-ink hover:border-ember md:inline-block"
            >
              All cases →
            </Link>
          </div>
          <h2
            className="display mt-6 text-[13vw] text-ink md:text-[6rem]"
            style={{ letterSpacing: "-0.045em", lineHeight: 0.95 }}
          >
            A selection <span className="text-gradient">in motion</span>
          </h2>
        </div>

        <motion.div style={{ x }} className="mt-10 flex flex-1 items-center gap-6 pl-[6vw] pr-[6vw]">
          {projects.map((p, i) => (
            <article
              key={p.slug}
              className="relative h-[62vh] w-[80vw] shrink-0 overflow-hidden rounded-3xl border border-ink/15 md:w-[46vw]"
            >
              <Link to="/work/$slug" params={{ slug: p.slug }} className="group/card block h-full">
                <ProjectArt index={i} title={p.title} palette={p.palette} className="h-full w-full" />
                {/* readability scrims */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-0 h-32"
                  style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.55), transparent)" }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-56"
                  style={{ background: "linear-gradient(0deg, rgba(0,0,0,0.75), transparent)" }}
                />
                <div className="absolute inset-x-0 top-0 flex items-start justify-between p-5">
                  <p className="mono text-[10px] uppercase tracking-[0.25em] text-ink/85">
                    {String(i + 1).padStart(2, "0")} · {p.year}
                  </p>
                  <p className="mono text-right text-[10px] uppercase tracking-[0.25em] text-ink/85">
                    {p.tags.join(" / ")}
                  </p>
                </div>
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="mono text-[10px] uppercase tracking-[0.25em] text-ember">{p.client}</p>
                    <h3
                      className="display mt-2 text-4xl text-ink md:text-5xl"
                      style={{ letterSpacing: "-0.04em", textShadow: "0 2px 20px rgba(0,0,0,0.35)" }}
                    >
                      {p.title}.
                    </h3>
                  </div>
                  <span className="mono inline-flex items-center gap-2 rounded-full border border-ink/40 bg-black/30 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-ink backdrop-blur-sm transition group-hover/card:border-ember group-hover/card:bg-ember group-hover/card:text-bone">
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
  const disciplines = [
    {
      n: "01",
      k: "Website design & development",
      short: "Web build",
      v: "Beautiful, responsive, scalable — built with modern stacks for performance and reliability.",
      tags: ["Design", "Build", "Next"],
      bg: "#0a0a0a",
      fg: "#f4f1ea",
      accent: "#B5566B",
    },
    {
      n: "02",
      k: "Branding & identity",
      short: "Brand",
      v: "Logos, colour, typography and visual systems that make brands instantly recognisable.",
      tags: ["Identity", "Type", "System"],
      bg: "#B5566B",
      fg: "#f4f1ea",
      accent: "#f6ea3a",
    },
    {
      n: "03",
      k: "AI solutions & automation",
      short: "AI + Ops",
      v: "Chatbots, workflow automation and intelligent systems that quietly retire manual work.",
      tags: ["LLM", "Ops", "Agents"],
      bg: "#f4f1ea",
      fg: "#0a0a0a",
      accent: "#B5566B",
    },
    {
      n: "04",
      k: "UI/UX & digital growth",
      short: "UX + Growth",
      v: "Interfaces people enjoy — with SEO, analytics and optimisation that keep growing.",
      tags: ["UX", "SEO", "Analytics"],
      bg: "#0a0a0a",
      fg: "#f4f1ea",
      accent: "#f6ea3a",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-chalk px-5 py-24 text-bone md:px-10 md:py-40">
      {/* soft ember wash */}
      <div
        className="pointer-events-none absolute -left-40 top-40 h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #B5566B, transparent 70%)" }}
      />
      <div
        className="pointer-events-none absolute -right-40 bottom-20 h-[420px] w-[420px] rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #f6ea3a, transparent 70%)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6">
          <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/50">Capabilities</p>
          <p className="mono hidden text-[10px] uppercase tracking-[0.3em] text-bone/40 md:block">
            04 disciplines · 01 studio
          </p>
        </div>

        <h2
          className="display mt-6 max-w-[16ch] text-[11vw] text-bone md:mt-8 md:text-[6rem]"
          style={{ letterSpacing: "-0.045em", lineHeight: "1" }}
        >
          One studio
          <br />
          <span className="text-gradient">Four disciplines</span>
        </h2>

        {/* Bento grid — 2026 GenZ, mobile-first */}
        <div className="mt-10 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-6 md:gap-5">
          {disciplines.map((s, i) => {
            // sizing: 01 big, 02 small, 03 small, 04 big  (on md)
            const span =
              i === 0
                ? "md:col-span-4"
                : i === 1
                  ? "md:col-span-2"
                  : i === 2
                    ? "md:col-span-2"
                    : "md:col-span-4";
            return (
              <motion.article
                key={s.n}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className={`group/card relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] p-6 transition-transform duration-500 hover:-translate-y-1 md:min-h-[320px] md:p-8 ${span}`}
                style={{ background: s.bg, color: s.fg, boxShadow: "0 30px 80px -40px rgba(0,0,0,0.5)" }}
              >
                <div
                  className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-60 blur-3xl transition-transform duration-700 group-hover/card:scale-125"
                  style={{ background: s.accent }}
                />
                <div className="relative flex items-start justify-between">
                  <span className="mono text-[10px] uppercase tracking-[0.3em]" style={{ opacity: 0.7 }}>
                    {s.n} · {s.short}
                  </span>
                  <span
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition-transform duration-500 group-hover/card:rotate-45"
                    style={{ borderColor: `${s.fg}40`, color: s.fg }}
                  >
                    →
                  </span>
                </div>
                <div className="relative mt-10 min-w-0">
                  <h3
                    className="display text-3xl leading-[0.95] sm:text-4xl md:text-3xl lg:text-[2.5rem] xl:text-5xl"
                    style={{ letterSpacing: "-0.04em", color: s.fg, overflowWrap: "break-word" }}
                  >
                    {s.k}.
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed" style={{ opacity: 0.85 }}>
                    {s.v}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="mono rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.2em]"
                        style={{ borderColor: `${s.fg}30`, color: s.fg }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
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
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">Start a project</p>
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
          Ready to build
          <br />
          <span className="text-bone/35">something people</span>
          <br />
          <span className="text-gradient">won&rsquo;t forget?</span>
        </h2>

        <div className="mt-10 grid gap-8 border-t border-bone/10 pt-8 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
          <Magnetic strength={0.1}>
            <Link
              to="/contact"
              className="group inline-flex items-center gap-4 rounded-full border border-bone/25 bg-bone/[0.03] px-6 py-4 text-bone backdrop-blur transition hover:border-ember hover:bg-ember hover:text-ink md:px-8 md:py-5"
              data-cursor="view"
            >
              <span className="mono text-[10px] uppercase tracking-[0.3em]">team.wedo06@gmail.com</span>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-current transition group-hover:rotate-45">
                →
              </span>
            </Link>
          </Magnetic>

          <div className="flex flex-col gap-1 text-right">
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">New projects · Q3 — Q4 2026</p>
            <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/40">Remote first · GMT ± 6</p>
          </div>
        </div>
      </div>
    </section>
  );
}
