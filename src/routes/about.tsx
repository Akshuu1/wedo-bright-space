import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import wedoLogo from "@/assets/wedo-logo.png.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WeDo Studio" },
      { name: "description", content: "A small, opinionated digital studio. We design, build and automate for founders and modern brands." },
      { property: "og:title", content: "About — WeDo Studio" },
      { property: "og:description", content: "A small, opinionated digital studio." },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({ "@context": "https://schema.org", "@type": "AboutPage", name: "About — WeDo Studio", url: "/about" }),
      },
    ],
  }),
  component: About,
});

const capabilities = [
  { n: "01", t: "Purpose First", d: "Every decision begins with solving a real business problem — not chasing a trend.", tags: ["Strategy", "Clarity", "Intent"], accent: "ember" },
  { n: "02", t: "Craftsmanship", d: "Attention to detail is what separates ordinary work from unforgettable experiences.", tags: ["Type", "Motion", "Code"], accent: "zap" },
  { n: "03", t: "Innovation", d: "We embrace AI, modern tooling and creative thinking to stay ahead of the curve.", tags: ["AI", "3D", "Modern"], accent: "ember" },
  { n: "04", t: "Partnership", d: "Transparent timelines, honest scopes, no surprises. Your success becomes ours.", tags: ["Trust", "Long-term", "Care"], accent: "zap" },
];

const principles = [
  ["Strategy before design.", "Understand the business first, then draw a single pixel."],
  ["Performance before animation.", "Beautiful is worthless if it doesn't load."],
  ["Business goals before trends.", "We build timeless experiences, not seasonal ones."],
  ["Partnership over projects.", "Long-term relationships over one-time deliveries."],
];

const stats = [
  { k: "20+", u: "projects delivered" },
  { k: "100%", u: "fully responsive" },
  { k: "A+", u: "performance grade" },
  { k: "∞", u: "creative range" },
];

function About() {
  return (
    <main className="bg-ink text-bone">
      <Hero />
      <TickerStrip />
      <Manifesto />
      <Capabilities />
      <StatsStrip />
      <Principles />
      <TailCTA />
    </main>
  );
}

/* --------------------------------- HUD --------------------------------- */
function Timecode() {
  const [t, setT] = useState("00:00:00");
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000);
      const hh = String(Math.floor(s / 3600)).padStart(2, "0");
      const mm = String(Math.floor((s / 60) % 60)).padStart(2, "0");
      const ss = String(s % 60).padStart(2, "0");
      setT(`${hh}:${mm}:${ss}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="mono tabular-nums text-[10px] tracking-[0.28em] text-bone/60">REC {t}</span>;
}

/* ------------------------------ HERO ------------------------------ */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const o = useTransform(scrollYProgress, [0, 0.9], [1, 0]);
  const logoRot = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  return (
    <section
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
      }}
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-6 pb-10 pt-32 md:px-12 md:pt-40"
    >
      {/* aurora blobs */}
      <motion.div
        className="pointer-events-none absolute h-[720px] w-[720px] rounded-full opacity-40 blur-3xl"
        style={{
          left: useTransform(sx, (v) => `calc(${v}% - 360px)`),
          top: useTransform(sy, (v) => `calc(${v}% - 360px)`),
          background: "radial-gradient(closest-side, #ff4a1c 0%, transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute right-[-10%] top-[10%] h-[520px] w-[520px] rounded-full opacity-25 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #f6ea3a 0%, transparent 70%)" }}
      />

      {/* scan line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ember/40"
        style={{ animation: "scan-line 8s linear infinite" }}
      />

      {/* orbiting logo */}
      <motion.img
        src={wedoLogo.url}
        alt=""
        aria-hidden
        style={{ rotate: logoRot }}
        className="pointer-events-none absolute right-[-6rem] top-24 hidden h-[420px] w-[420px] opacity-[0.08] md:block"
      />

      {/* top HUD */}
      <div className="relative z-10 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="pill">
            <span className="h-1.5 w-1.5 rounded-full bg-ember" style={{ animation: "blink 1.6s infinite" }} />
            Studio 01 · Live
          </span>
          <span className="mono hidden text-[10px] uppercase tracking-[0.28em] text-bone/45 md:inline">
            ⏵ chapter · about
          </span>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Timecode />
          <span className="mono text-[10px] uppercase tracking-[0.28em] text-bone/45">
            EST 2022 · Remote · GMT ± 6
          </span>
        </div>
      </div>

      {/* headline */}
      <motion.div style={{ y, opacity: o }} className="relative z-10">
        <span className="pill mb-6 border-ember bg-ember/10 text-ember">✦ Independent digital studio</span>
        <h1 className="display leading-[0.82] tracking-[-0.055em]" style={{ fontSize: "clamp(3rem, 12vw, 14rem)" }}>
          Strategy, design
          <br />
          <span className="text-outline">and code —</span>
          <br />
          <span className="text-gradient">one seamless studio.</span>
        </h1>
        <p className="mono mt-6 max-w-md text-[11px] uppercase tracking-[0.24em] text-bone/55">
          No unnecessary complexity. No bloated solutions.
          <span className="text-bone"> Thoughtful digital products built for real people.</span>
        </p>

        <div className="mt-8 flex flex-wrap gap-2">
          {["✧ design", "✦ build", "◐ automate", "◇ grow"].map((t) => (
            <span key={t} className="pill">{t}</span>
          ))}
        </div>
      </motion.div>

      {/* bottom rail */}
      <div className="relative z-10 flex items-end justify-between border-t-2 border-bone pt-5">
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/60">↓ scroll · manifesto</p>
        <p className="mono text-[10px] uppercase tracking-[0.3em] text-bone/60">wedo · studio ® mmxxvi</p>
      </div>
    </section>
  );
}

/* ------------------------------ TICKER ------------------------------ */
function TickerStrip() {
  const items = ["◐ Design that ships", "✦ Motion with intent", "✧ AI in the seams", "★ Built to last", "✦ Founder-first", "◇ Boringly reliable"];
  const doubled = [...items, ...items];
  return (
    <div className="ticker-strip">
      <div className="marquee-track py-4">
        {doubled.map((s, i) => (
          <span key={i} className="mono flex items-center gap-8 px-8 text-[13px] font-bold uppercase tracking-[0.22em]">
            {s}
            <span className="opacity-40">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* --------------------------- MANIFESTO ---------------------------- */
function Manifesto() {
  const words = "Our mission is to help businesses grow through meaningful digital experiences that inspire trust, increase conversions and create lasting impressions — combining strategy, design and technology into one seamless process.".split(" ");
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.4"] });

  return (
    <section ref={ref} className="relative border-y-2 border-bone bg-chalk px-6 py-32 md:px-12 md:py-48">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-12">
        <div className="md:col-span-3">
          <span className="pill-solid mb-4">✎ Manifesto</span>
          <p className="mono mt-3 text-[10px] uppercase tracking-[0.28em] text-bone/50">— read slowly.</p>
          <div className="mt-8 hidden h-32 w-32 rotate-[-8deg] md:block">
            <div className="brut-box-accent flex h-full w-full items-center justify-center">
              <span className="display text-6xl text-ember">01</span>
            </div>
          </div>
        </div>
        <p className="display md:col-span-9" style={{ fontSize: "clamp(1.8rem, 4vw, 3.6rem)", lineHeight: 1.05, letterSpacing: "-0.03em", textTransform: "none" }}>
          {words.map((w, i) => {
            const start = i / words.length;
            const end = start + 1 / words.length;
            const Word = () => {
              const opacity = useTransform(scrollYProgress, [start, end], [0.12, 1]);
              return (
                <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
                  {w}
                </motion.span>
              );
            };
            return <Word key={i} />;
          })}
        </p>
      </div>
    </section>
  );
}

/* -------------------------- CAPABILITIES -------------------------- */
function Capabilities() {
  return (
    <section className="relative border-b-2 border-bone px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <span className="pill mb-4">[ 02 / our values ]</span>
            <h2 className="display mt-4" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
              What we <span className="text-outline">stand for.</span>
            </h2>
          </div>
          <p className="mono hidden max-w-[22ch] text-right text-[10px] uppercase tracking-[0.28em] text-bone/55 md:block">
            four values · one standard of craft
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {capabilities.map((c, i) => (
            <CapCard key={c.n} c={c} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CapCard({ c, i }: { c: (typeof capabilities)[number]; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isAccent = c.accent === "ember";
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        e.currentTarget.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      }}
      className={`spotlight group relative overflow-hidden border-2 border-bone bg-ink p-8 transition hover:-translate-y-1 md:p-10 ${
        isAccent ? "hover:shadow-[10px_10px_0_0_#ff4a1c]" : "hover:shadow-[10px_10px_0_0_#f6ea3a]"
      }`}
    >
      <div className="mono flex items-baseline justify-between text-[10px] uppercase tracking-[0.32em] text-bone/60">
        <span>[ {c.n} / 04 ]</span>
        <span className={isAccent ? "text-ember" : ""}>◐ discipline</span>
      </div>
      <h3
        className="display mt-6 transition-colors group-hover:text-ember"
        style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
      >
        {c.t}
      </h3>
      <p className="mt-4 max-w-md text-bone/70">{c.d}</p>
      <div className="mono mt-8 flex flex-wrap gap-2 text-[10px] uppercase tracking-[0.24em]">
        {c.tags.map((t) => (
          <span key={t} className="border-2 border-bone bg-chalk px-3 py-1 text-bone">{t}</span>
        ))}
      </div>
      {/* corner sticker */}
      <span
        className={`absolute right-4 top-4 flex h-10 w-10 rotate-12 items-center justify-center rounded-full border-2 border-bone text-[10px] font-bold ${
          isAccent ? "bg-ember" : "bg-zap"
        }`}
      >
        ✦
      </span>
    </motion.div>
  );
}

/* ---------------------------- STATS ------------------------------ */
function StatsStrip() {
  return (
    <section className="border-b-2 border-bone bg-bone px-6 py-16 text-ink md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex items-center justify-between">
          <span className="mono text-[10px] uppercase tracking-[0.32em] text-ember">[ 03 / receipts ]</span>
          <span className="mono text-[10px] uppercase tracking-[0.28em] text-ink/45">2022 → today</span>
        </div>
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.k}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="border-l-2 border-ink/20 pl-4"
            >
              <p className="display text-gradient" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.06em", lineHeight: 1 }}>
                {s.k}
              </p>
              <p className="mono mt-2 text-[10px] uppercase tracking-[0.28em] text-ink/55">{s.u}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- PRINCIPLES --------------------------- */
function Principles() {
  return (
    <section className="relative px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto max-w-7xl">
        <span className="pill mb-4">[ 04 / what makes us different ]</span>
        <h2 className="display mt-4" style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", letterSpacing: "-0.04em", lineHeight: 0.9 }}>
          We don&rsquo;t chase <span className="text-outline">trends.</span>
        </h2>

        <ul className="mt-14 border-t-2 border-bone">
          {principles.map(([t, d], i) => (
            <li key={t} className="border-b-2 border-bone">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="group grid items-baseline gap-6 py-8 transition-colors hover:bg-ember/5 md:grid-cols-12 md:py-12"
              >
                <span className="mono col-span-2 text-[10px] uppercase tracking-widest text-ember">
                  [ {String(i).padStart(2, "0")} ]
                </span>
                <h3
                  className="display col-span-5 transition-transform group-hover:translate-x-3"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 3.5rem)", lineHeight: 0.95, letterSpacing: "-0.03em" }}
                >
                  {t}
                </h3>
                <p className="col-span-5 text-bone/60 md:text-lg">{d}</p>
              </motion.div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------- TAIL CTA ---------------------------- */
function TailCTA() {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden border-t-2 border-bone px-6 py-24 text-center">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(closest-side, #ff4a1c, transparent 70%)" }}
      />
      <div className="relative">
        <span className="pill mb-6">[ next chapter ]</span>
        <Link
          to="/work"
          className="display mt-6 block hover:text-ember"
          style={{ fontSize: "clamp(2.5rem, 9vw, 9rem)", letterSpacing: "-0.05em", lineHeight: 0.9 }}
          data-cursor="view"
        >
          Let&rsquo;s create something <span className="text-gradient">extraordinary →</span>
        </Link>
      </div>
    </section>
  );
}
