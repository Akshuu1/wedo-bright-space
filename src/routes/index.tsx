import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";
import hero from "@/assets/hero-chrome-w.jpg";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { Marquee } from "@/components/site/Marquee";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "WeDo Studio — Design. Develop. Automate." },
      { name: "description", content: "We build modern, high-performance websites, custom mobile apps and intelligent automations." },
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
  const [variant, setVariant] = useState<1 | 2 | 3>(1);
  const featured = projects.slice(0, 3);

  return (
    <main className="relative">
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[680px] w-full overflow-hidden">
        {variant === 1 && (
          <motion.img
            key="v1"
            src={hero}
            alt="WeDo chrome W sculpture"
            width={1920}
            height={1280}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        {variant === 2 && (
          <div className="absolute inset-0 grid place-items-center bg-ink">
            <video
              autoPlay muted loop playsInline poster={hero}
              className="h-full w-full object-cover opacity-90"
            >
              <source src="" />
            </video>
            <div className="pointer-events-none absolute bottom-6 left-6 mono text-[10px] uppercase tracking-widest text-bone/40">
              [ video slot — drop a .mp4 in src/assets and wire it ]
            </div>
          </div>
        )}
        {variant === 3 && <CanvasHero />}

        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-ink" />
        <div className="absolute inset-0 mx-auto flex max-w-7xl flex-col justify-between px-6 pb-12 pt-28 md:px-10 md:pb-20 md:pt-32">
          <div className="flex items-start justify-between">
            <SectionLabel index="00" label="index.html" />
            <div className="mono hidden text-right text-[10px] uppercase tracking-widest text-bone/50 md:block">
              <p>WeDo Creative Studio</p>
              <p className="text-ember">Digital / Motion / Interface</p>
            </div>
          </div>

          <div>
            <p className="mono text-[10px] uppercase tracking-widest text-bone/60">( New Format · 2026 )</p>
            <h1 className="serif mt-4 text-[18vw] leading-[0.85] text-bone md:text-[12vw] lg:text-[10rem]">
              <RevealText text="We design," />
              <br />
              <RevealText text="develop &" />
              <br />
              <span className="text-ember"><RevealText text="automate." /></span>
            </h1>
          </div>
        </div>

        {/* Hero switcher */}
        <div className="absolute bottom-6 right-6 z-20 border border-bone/20 bg-ink/70 p-3 backdrop-blur-sm">
          <p className="mono mb-2 text-[9px] uppercase tracking-widest text-bone/50">Hero variant</p>
          <div className="flex gap-1">
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                onClick={() => setVariant(n as 1 | 2 | 3)}
                className={`mono h-8 w-8 border text-[10px] ${variant === n ? "border-ember bg-ember text-ink" : "border-bone/30 text-bone hover:border-bone"}`}
                aria-label={`Hero variant ${n}`}
              >
                0{n}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <SectionLabel index="01" label="What we do" />
        <div className="mt-12 grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="mono text-[10px] uppercase tracking-widest text-ember">( Studio · Brand Direction )</p>
              <h2 className="serif mt-6 text-5xl leading-[1.05] text-bone md:text-7xl">
                Strategy, design and engineering. <span className="text-bone/40">Lightning-fast, lean, and sensibly priced.</span>
              </h2>
            </Reveal>
          </div>
          <ul className="md:col-span-7">
            {services.map((s, i) => (
              <li key={s} className="hairline">
                <Reveal delay={i * 0.05}>
                  <div className="group flex items-baseline justify-between py-6 transition-colors hover:text-ember">
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
                <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    width={1280} height={960}
                    className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>
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

      <Marquee items={["Design", "Develop", "Automate", "Ship", "Maintain"]} />

      {/* MANIFESTO */}
      <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
        <SectionLabel index="03" label="Manifesto" />
        <Reveal>
          <p className="serif mt-12 max-w-5xl text-3xl leading-[1.2] text-bone md:text-6xl">
            <span className="text-ember">"</span>Software should feel inevitable —
            like the credits already rolled on the problem.
            We make products that ship on time and outlive the brief.
            <span className="text-ember">"</span>
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
          <p className="mono text-[10px] uppercase tracking-widest text-ember">( Start a project )</p>
          <Link to="/contact" className="serif mt-6 block text-5xl leading-none text-bone hover:text-ember md:text-[10rem]">
            hello@wedo.studio →
          </Link>
        </div>
      </section>
    </main>
  );
}

function CanvasHero() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink">
      <div
        className="absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 60% at 30% 40%, rgba(232,162,75,0.25), transparent 60%), radial-gradient(40% 40% at 70% 70%, rgba(120,140,200,0.18), transparent 60%), #0A0A0A",
        }}
      />
      <div className="absolute inset-0" style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 14px)",
      }} />
      {[...Array(28)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-bone/10"
          style={{
            width: 6 + (i % 5) * 8,
            height: 6 + (i % 5) * 8,
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
          }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}
