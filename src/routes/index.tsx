import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import logo from "@/assets/wedo-logo.png.asset.json";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { ProjectArt } from "@/components/site/ProjectArt";
import { Hero3D } from "@/components/site/Hero3D";
import { Magnetic } from "@/components/site/Magnetic";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeDo Studio — Design. Develop. Automate." },
      { name: "description", content: "WeDo is a digital studio building cinematic websites, mobile apps and intelligent automations." },
      { property: "og:title", content: "WeDo Studio" },
      { property: "og:description", content: "Cinematic websites, apps and automations." },
    ],
  }),
  component: Home,
});

const services = [
  { k: "Websites", v: "Editorial · Headless · WebGL", n: "01" },
  { k: "Mobile Apps", v: "iOS · Android · React Native", n: "02" },
  { k: "AI & Automation", v: "Pipelines · Agents · Tooling", n: "03" },
  { k: "3D & Motion", v: "Real-time scenes · Scroll", n: "04" },
  { k: "Payments", v: "Stripe · Adyen · Regional", n: "05" },
  { k: "Maintenance", v: "SLA · Perf · Security", n: "06" },
];

function Home() {
  return (
    <main className="relative">
      <Hero />

      <Marquee items={["Design", "Develop", "Automate", "Ship", "Maintain", "Scale"]} />

      <BentoServices />

      <HorizontalCases />

      <Manifesto />

      <ContactStrip />
    </main>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[110svh] min-h-[720px] w-full overflow-hidden bg-ink">
      {/* 3D canvas */}
      <Hero3D />

      {/* vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_50%,transparent_30%,#0a0a12_85%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink" />

      {/* HUD */}
      <motion.div
        style={{ y, opacity }}
        className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32"
      >
        <div className="flex items-start justify-between">
          <SectionLabel index="00" label="index.live" />
          <div className="mono hidden text-right text-[10px] uppercase tracking-widest text-bone/60 md:block">
            <p className="flex items-center justify-end gap-2">
              <span className="block h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
              SYS · ONLINE
            </p>
            <p className="text-gradient">v2026.06 — patch.7</p>
          </div>
        </div>

        {/* center mark */}
        <div className="pointer-events-none flex items-center justify-center">
          <img
            src={logo.url}
            alt="WeDo"
            width={520}
            height={320}
            className="w-[60vw] max-w-[420px] opacity-90 mix-blend-screen drop-shadow-[0_0_60px_rgba(139,92,246,0.55)]"
          />
        </div>

        <div className="pointer-events-none">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="mono text-[10px] uppercase tracking-widest text-bone/60">( New Format · MMXXVI )</p>
              <h1 className="serif mt-3 text-[14vw] leading-[0.84] text-bone md:text-[10vw] lg:text-[9rem]">
                <RevealText text="we design," />
                <br />
                <span className="serif italic">
                  <RevealText text="develop &" />
                </span>
                <br />
                <span className="text-gradient serif italic">
                  <RevealText text="automate." />
                </span>
              </h1>
            </div>
            <p className="mono hidden max-w-xs text-right text-[11px] leading-relaxed text-bone/50 md:block">
              A digital studio shipping websites, mobile apps and intelligent automations for teams that ship.
            </p>
          </div>
        </div>
      </motion.div>

      {/* scroll hint */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3">
        <span className="mono text-[9px] uppercase tracking-widest text-bone/60">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-bone/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2"
            style={{ background: "linear-gradient(180deg,#8b5cf6,#4f8cff)" }}
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}

function BentoServices() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <div className="flex items-end justify-between">
        <SectionLabel index="01" label="capability stack" />
        <p className="mono hidden text-[10px] uppercase tracking-widest text-bone/40 md:block">grid · 6×3 · bento</p>
      </div>

      <Reveal>
        <h2 className="serif mt-10 max-w-5xl text-5xl leading-[1.02] text-bone md:text-7xl">
          We build the parts of the internet other studios{" "}
          <span className="serif italic text-gradient">refuse to.</span>
        </h2>
      </Reveal>

      <div className="mt-16 grid auto-rows-[180px] gap-3 md:grid-cols-6">
        {/* big feature */}
        <Reveal className="md:col-span-4 md:row-span-2">
          <div className="group relative h-full overflow-hidden rounded-2xl border border-bone/10 bg-gunmetal/40 p-8 backdrop-blur-sm">
            <div
              className="absolute -right-20 -top-20 h-72 w-72 rounded-full opacity-50 blur-3xl transition-transform duration-700 group-hover:scale-125"
              style={{ background: "#8b5cf6" }}
            />
            <div
              className="absolute -bottom-24 -left-10 h-64 w-64 rounded-full opacity-40 blur-3xl"
              style={{ background: "#4f8cff" }}
            />
            <div className="relative flex h-full flex-col justify-between">
              <p className="mono text-[10px] uppercase tracking-widest text-bone/60">[ flagship · 01 ]</p>
              <div>
                <h3 className="serif text-5xl leading-[1.02] text-bone md:text-7xl">
                  Cinematic <span className="serif italic text-gradient">websites.</span>
                </h3>
                <p className="mt-4 max-w-md text-bone/60">
                  Editorial type, WebGL scenes, scroll choreography. Built lean on modern stacks.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {services.slice(0, 2).map((s, i) => (
          <Reveal key={s.k} delay={i * 0.05} className="md:col-span-2">
            <Card s={s} />
          </Reveal>
        ))}

        {services.slice(2).map((s, i) => (
          <Reveal key={s.k} delay={i * 0.05} className="md:col-span-2">
            <Card s={s} />
          </Reveal>
        ))}

        {/* status tile */}
        <Reveal className="md:col-span-2 md:row-span-1">
          <div className="flex h-full flex-col justify-between rounded-2xl border border-bone/10 bg-ink p-6">
            <p className="mono text-[10px] uppercase tracking-widest text-emerald-400">[ live ]</p>
            <div>
              <p className="serif text-3xl text-bone">2 slots</p>
              <p className="mono text-[10px] uppercase tracking-widest text-bone/50">open · Q3 2026</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Card({ s }: { s: { k: string; v: string; n: string } }) {
  return (
    <div className="group relative h-full overflow-hidden rounded-2xl border border-bone/10 bg-gunmetal/30 p-6 transition-colors hover:border-violet/40">
      <div className="flex items-start justify-between">
        <span className="mono text-[10px] uppercase tracking-widest text-bone/40">{s.n}</span>
        <span className="mono text-[10px] uppercase tracking-widest text-bone/40 opacity-0 transition-opacity group-hover:opacity-100">→</span>
      </div>
      <div className="mt-auto pt-10">
        <h3 className="serif text-2xl text-bone md:text-3xl">{s.k}</h3>
        <p className="mono mt-2 text-[10px] uppercase tracking-widest text-bone/50">{s.v}</p>
      </div>
    </div>
  );
}

function HorizontalCases() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-75%"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -8]);
  const rotateNeg = useTransform(rotate, (v) => -v);

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="px-6 pt-28 md:px-10">
          <div className="mx-auto flex max-w-7xl items-end justify-between">
            <SectionLabel index="02" label="selected.work" />
            <Link to="/work" className="mono hidden border border-bone/30 px-4 py-2 text-[10px] uppercase tracking-widest hover:bg-bone hover:text-ink md:block">
              All cases →
            </Link>
          </div>
          <h2 className="serif mt-6 text-5xl leading-none text-bone md:text-8xl">
            <span className="serif italic text-gradient">cases</span> &nbsp;in motion.
          </h2>
        </div>

        <motion.div style={{ x }} className="mt-12 flex flex-1 items-center gap-8 pl-[8vw] pr-[8vw]">
          {projects.map((p, i) => (
            <motion.article
              key={p.slug}
              style={{ rotate: i % 2 ? rotate : useTransform(rotate, (v) => -v) }}
              className="relative h-[58vh] w-[78vw] shrink-0 overflow-hidden rounded-3xl border border-bone/10 md:w-[48vw]"
            >
              <Link to="/work/$slug" params={{ slug: p.slug }} data-cursor="view" className="block h-full">
                <ProjectArt index={i} title={p.title} palette={p.palette} className="h-full w-full" />
                <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6">
                  <div>
                    <p className="mono text-[10px] uppercase tracking-widest text-bone/60">
                      {p.client} · {p.year}
                    </p>
                    <h3 className="serif mt-1 text-4xl text-bone md:text-6xl">{p.title}</h3>
                  </div>
                  <p className="mono text-[10px] uppercase tracking-widest text-bone/60">
                    {p.tags.join(" / ")}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <SectionLabel index="03" label="manifesto" />
      <Reveal>
        <p className="serif mt-12 max-w-5xl text-3xl leading-[1.15] text-bone md:text-6xl">
          <span className="text-gradient">"</span>
          Software should feel inevitable — like the credits already rolled on the problem.
          We make products that ship on time and{" "}
          <span className="serif italic text-gradient">outlive the brief.</span>
          <span className="text-gradient">"</span>
        </p>
      </Reveal>
      <div className="mt-12 flex justify-end">
        <Magnetic>
          <Link
            to="/story"
            data-cursor="view"
            className="mono inline-block border border-bone/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink"
          >
            Watch the story →
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}

function ContactStrip() {
  return (
    <section className="relative overflow-hidden border-y border-bone/10 px-6 py-32 md:px-10">
      <div
        className="absolute -left-20 top-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "#8b5cf6", animation: "orb-float 18s ease-in-out infinite" }}
      />
      <div
        className="absolute -right-20 bottom-0 h-96 w-96 rounded-full opacity-30 blur-3xl"
        style={{ background: "#4f8cff", animation: "orb-float 22s ease-in-out infinite reverse" }}
      />
      <div className="relative mx-auto max-w-7xl">
        <p className="mono text-[10px] uppercase tracking-widest text-violet">( Start a project )</p>
        <Magnetic strength={0.15}>
          <Link
            to="/contact"
            className="serif italic mt-6 block text-5xl leading-none text-bone transition-colors hover:text-gradient md:text-[10rem]"
          >
            hello@wedo.studio →
          </Link>
        </Magnetic>
      </div>
    </section>
  );
}
