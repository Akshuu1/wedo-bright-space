import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import logo from "@/assets/wedo-logo.png.asset.json";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { ProjectArt } from "@/components/site/ProjectArt";
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
  "Modern & Responsive Websites",
  "Premium 2D & Interactive 3D",
  "Custom Mobile Applications",
  "AI & Business Automations",
  "Payment Gateway Integration",
  "Maintenance & Tech Support",
];

function Home() {
  const featured = projects.slice(0, 3);
  return (
    <main className="relative">
      <Hero />

      {/* TICKER */}
      <Marquee items={["Design", "Develop", "Automate", "Ship", "Maintain", "Scale"]} />

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <SectionLabel index="01" label="What we do" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="mono text-[10px] uppercase tracking-widest text-violet">( Studio · Brand Direction )</p>
              <h2 className="serif mt-6 text-5xl leading-[1.02] text-bone md:text-7xl">
                Strategy, design and engineering.{" "}
                <span className="serif italic text-bone/40">Lightning-fast, lean, sensibly priced.</span>
              </h2>
            </Reveal>
          </div>
          <ul className="md:col-span-7">
            {services.map((s, i) => (
              <li key={s} className="hairline">
                <Reveal delay={i * 0.05}>
                  <div className="group flex items-baseline justify-between py-6 transition-colors hover:text-gradient">
                    <span className="flex items-baseline gap-6">
                      <span className="mono text-[10px] uppercase tracking-widest text-bone/40">0{i + 1}</span>
                      <span className="serif text-3xl md:text-5xl">{s}</span>
                    </span>
                    <span className="mono text-[10px] uppercase tracking-widest text-bone/40 opacity-0 transition-opacity group-hover:opacity-100">→ scope</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FEATURED WORK */}
      <section className="mx-auto max-w-7xl px-6 pb-32 md:px-10">
        <SectionLabel index="02" label="Selected work" />
        <div className="mt-12 grid gap-8 md:grid-cols-12">
          {featured.map((p, i) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              data-cursor="view"
              className={`group block ${i === 0 ? "md:col-span-7" : "md:col-span-5"} ${i === 1 ? "md:translate-y-24" : ""}`}
            >
              <Reveal delay={i * 0.08}>
                <ProjectArt
                  index={i}
                  title={p.title}
                  palette={p.palette}
                  className="aspect-[4/3] transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <p className="mono text-[10px] uppercase tracking-widest text-bone/40">{p.client} · {p.year}</p>
                    <h3 className="serif mt-1 text-3xl text-bone md:text-4xl">{p.title}</h3>
                  </div>
                  <p className="mono text-[10px] uppercase tracking-widest text-bone/40">{p.tags.join(" / ")}</p>
                </div>
              </Reveal>
            </Link>
          ))}
        </div>
        <div className="mt-16 flex justify-end">
          <Link to="/work" className="mono border border-bone/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink">
            All work →
          </Link>
        </div>
      </section>

      {/* MANIFESTO */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <SectionLabel index="03" label="Manifesto" />
        <Reveal>
          <p className="serif mt-12 max-w-5xl text-3xl leading-[1.15] text-bone md:text-6xl">
            <span className="text-gradient">"</span>Software should feel inevitable —
            like the credits already rolled on the problem.
            We make products that ship on time and{" "}
            <span className="serif italic text-gradient">outlive the brief.</span>
            <span className="text-gradient">"</span>
          </p>
        </Reveal>
        <div className="mt-12 flex justify-end">
          <Link to="/story" data-cursor="view" className="mono border border-bone/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-bone hover:text-ink">
            Watch the story →
          </Link>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="border-y border-bone/10 px-6 py-24 md:px-10">
        <div className="mx-auto max-w-7xl">
          <p className="mono text-[10px] uppercase tracking-widest text-violet">( Start a project )</p>
          <Link to="/contact" className="serif italic mt-6 block text-5xl leading-none text-bone hover:text-gradient md:text-[10rem]">
            hello@wedo.studio →
          </Link>
        </div>
      </section>
    </main>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <section ref={ref} className="relative h-[110svh] min-h-[720px] w-full overflow-hidden">
      {/* atmospheric backdrop */}
      <div className="absolute inset-0 bg-ink">
        <div
          className="absolute -left-[20%] top-[10%] aspect-square w-[70%] rounded-full opacity-50 blur-[120px]"
          style={{ background: "#8b5cf6", animation: "orb-float 16s ease-in-out infinite" }}
        />
        <div
          className="absolute -right-[15%] bottom-[5%] aspect-square w-[60%] rounded-full opacity-40 blur-[120px]"
          style={{ background: "#4f8cff", animation: "orb-float 22s ease-in-out infinite reverse" }}
        />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* slow rotating ring behind logo */}
      <motion.div
        style={{ y, scale, opacity }}
        className="absolute inset-0 grid place-items-center"
      >
        <div className="relative">
          <div
            className="absolute inset-0 -m-32 rounded-full border border-bone/10"
            style={{ animation: "slow-spin 60s linear infinite" }}
          />
          <div
            className="absolute inset-0 -m-56 rounded-full border border-bone/[0.06]"
            style={{ animation: "slow-spin 90s linear infinite reverse" }}
          />
          <motion.img
            src={logo.url}
            alt="WeDo — Freelance Web Studio"
            width={1280}
            height={780}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[78vw] max-w-[820px] drop-shadow-[0_0_80px_rgba(139,92,246,0.35)]"
          />
        </div>
      </motion.div>

      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/40 via-transparent to-ink" />

      <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
        <div className="flex items-start justify-between">
          <SectionLabel index="00" label="index.html" />
          <div className="mono hidden text-right text-[10px] uppercase tracking-widest text-bone/50 md:block">
            <p>WeDo · Digital Studio</p>
            <p className="text-gradient">Websites · Apps · Automations</p>
          </div>
        </div>

        <div className="pointer-events-none">
          <p className="mono text-[10px] uppercase tracking-widest text-bone/60">( New Format · MMXXVI )</p>
          <h1 className="serif mt-4 text-[15vw] leading-[0.86] text-bone md:text-[11vw] lg:text-[9.5rem]">
            <RevealText text="We design," />
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
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3">
        <span className="mono text-[9px] uppercase tracking-widest text-bone/50">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-bone/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-1/2 bg-gradient-to-b from-violet to-azure"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </div>
    </section>
  );
}
