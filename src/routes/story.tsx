import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "motion/react";
import { useRef } from "react";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Story — A WeDo Feature" },
      { name: "description", content: "The WeDo story, told as a five-act feature. Scroll to play." },
      { property: "og:title", content: "Story — A WeDo Feature" },
      { property: "og:description", content: "Five acts. One studio. Scroll to play." },
      { property: "og:url", content: "/story" },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: "/story" }],
  }),
  component: Story,
});

/* Palette reminder for this page:
   bg-bone = #0a0a0a (dark)  |  text-ink  = #f4f1ea (light)
   bg-ink  = #f4f1ea (light) |  text-bone = #0a0a0a (dark)
*/

function Story() {
  const rootRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start start", "end end"] });
  const tc = useSpring(scrollYProgress, { stiffness: 90, damping: 20 });

  return (
    <main ref={rootRef} className="relative bg-bone text-ink">
      <Letterbox />
      <div
        className="pointer-events-none fixed inset-0 z-[45] mix-blend-screen"
        style={{
          background: "radial-gradient(60% 40% at 50% 30%, rgba(255,74,28,0.14), transparent 70%)",
          animation: "projector-flicker 4s infinite",
        }}
      />
      <div
        className="pointer-events-none fixed left-0 right-0 z-[46] h-[2px] bg-ember/60 blur-[1px]"
        style={{ animation: "scan-line 6s linear infinite" }}
      />
      <TimecodeHUD progress={tc} />

      <ColdOpen />
      <TickerBar />
      <ActI />
      <ActII />
      <ActIII />
      <ActIV />
      <Credits />
    </main>
  );
}

function Letterbox() {
  return null;
}


function TimecodeHUD({ progress }: { progress: MotionValue<number> }) {
  const min = useTransform(progress, (v: number) => String(Math.floor(v * 8)).padStart(2, "0"));
  const sec = useTransform(progress, (v: number) => String(Math.floor((v * 480) % 60)).padStart(2, "0"));
  const fr = useTransform(progress, (v: number) => String(Math.floor((v * 12000) % 24)).padStart(2, "0"));

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-[49] flex items-center justify-between px-6 pt-3 md:px-10">
      <div className="mono flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-ink">
        <span className="block h-1.5 w-1.5 rounded-full bg-ember" style={{ animation: "blink 1.4s ease-in-out infinite" }} />
        REC · WeDo/Feature/01
      </div>
      <div className="mono flex items-baseline gap-1 text-[10px] uppercase tracking-[0.3em] text-ink">
        <span>TC</span>
        <motion.span>{min}</motion.span>:<motion.span>{sec}</motion.span>:<motion.span>{fr}</motion.span>
      </div>
    </div>
  );
}

/* ---------------- Cold Open (dark) ---------------- */
function ColdOpen() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.9], [1, 0]);

  return (
    <section ref={ref} className="relative flex min-h-[110svh] w-full items-center justify-center overflow-hidden bg-bone text-ink">
      <div className="aurora absolute inset-0" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.08]" viewBox="0 0 100 100" preserveAspectRatio="none">
        {Array.from({ length: 20 }).map((_, i) => (
          <line key={i} x1={i * 5} y1="0" x2={i * 5} y2="100" stroke="#f4f1ea" strokeWidth="0.05" />
        ))}
      </svg>

      <motion.div style={{ y, scale, opacity }} className="relative z-10 mx-auto max-w-[1600px] px-6 text-center md:px-10">
        <p className="mono text-[10px] uppercase tracking-[0.4em] text-ember">◉ A WeDo Studio Feature — MMXXVI</p>
        <h1
          className="display mt-8 text-ink"
          style={{ fontSize: "clamp(2.75rem, 12vw, 12rem)", lineHeight: 0.85, letterSpacing: "-0.05em" }}
        >
          EVERY GREAT <span className="text-outline" style={{ WebkitTextStrokeColor: "#f4f1ea" }}>PRODUCT</span>
          <br />
          STARTS WITH A <span className="text-gradient">CONVERSATION</span>
        </h1>
        <p className="mx-auto mt-8 max-w-xl text-sm leading-relaxed text-ink/60 md:text-base">
          WeDo wasn&rsquo;t created to become another web agency. It started with one belief —
          businesses deserve digital experiences that actually help them grow. Scroll to play.
        </p>
      </motion.div>

      <div className="absolute bottom-[10vh] left-6 z-10 md:left-10">
        <div className="border-2 border-ink bg-bone p-3 text-ink" style={{ boxShadow: "8px 8px 0 0 #ff4a1c" }}>
          <p className="mono text-[9px] uppercase tracking-[0.3em] text-ink/60">SCENE 01 · TAKE 01</p>
          <p className="mono text-[9px] uppercase tracking-[0.3em] text-ember">ROLL A · DIR. WEDO</p>
        </div>
      </div>
      <div className="mono absolute bottom-[10vh] right-6 z-10 text-right text-[9px] uppercase tracking-[0.3em] text-ink/60 md:right-10">
        <p>Aspect · 2.39:1</p>
        <p>Format · WEB/WEBGL</p>
      </div>
    </section>
  );
}

function TickerBar() {
  const items = ["The Making of WeDo", "◉", "Directed by the studio", "◉", "Original score by the ship log", "◉", "Cast: designers, engineers, automators", "◉"];
  return (
    <div className="ticker-strip relative py-4">
      <div className="marquee-track">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center gap-8 px-8">
            {items.map((t, i) => (
              <span key={i} className="display whitespace-nowrap text-2xl uppercase text-bone md:text-4xl">{t}</span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- ACT I — Light interlude ---------------- */
function ActI() {
  return (
    <section className="relative bg-ink px-6 py-40 text-bone md:px-10 md:py-56">
      <div className="mx-auto max-w-[1500px]">
        <SceneSlate act="I" title="The Belief" runtime="00:14" dark={false} />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20% 0px" }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-16 max-w-[18ch] text-bone"
          style={{ fontSize: "clamp(2.5rem, 8vw, 8rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}
        >
          Too many websites looked identical. <span className="text-gradient">So we decided to do things differently.</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 max-w-xl border-l-2 border-bone pl-6 text-lg leading-relaxed text-bone/70"
        >
          Too many brands were invisible. Too many businesses invested money without seeing results.
          Every project starts by understanding people <em>before</em> writing code — because
          technology alone doesn&rsquo;t create impact. Understanding does.
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------- ACT II — Dark cast ---------------- */
function ActII() {
  const crew = [
    { role: "Attention", name: "Good design attracts.", line: "First impressions decide whether people stay.", accent: "#ff4a1c" },
    { role: "Trust", name: "Great design builds.", line: "Trust is earned in typography, motion and pace.", accent: "#f6ea3a" },
    { role: "Growth", name: "Experiences convert.", line: "Exceptional experiences turn visitors into customers.", accent: "#ff4a1c" },
    { role: "Legacy", name: "Businesses remember.", line: "The best work outlasts the launch date.", accent: "#f6ea3a" },
  ];
  return (
    <section className="relative overflow-hidden bg-bone px-6 py-40 text-ink md:px-10 md:py-56">
      <div className="aurora absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-[1500px]">
        <SceneSlate act="II" title="What We Believe" runtime="02:41" dark />
        <div className="mt-20 grid gap-6 md:grid-cols-2">
          {crew.map((c, i) => (
            <motion.article
              key={c.name}
              initial={{ opacity: 0, y: 80, rotate: i % 2 ? 1 : -1 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-15% 0px" }}
              transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative overflow-hidden border-2 border-ink bg-bone p-8 md:p-10"
              style={{ boxShadow: `10px 10px 0 0 ${c.accent}` }}
            >
              <div className="flex items-start justify-between">
                <p className="mono text-[10px] uppercase tracking-[0.3em]" style={{ color: c.accent }}>
                  [ Cast · {String(i + 1).padStart(2, "0")} ]
                </p>
                <p className="mono text-[10px] uppercase tracking-[0.3em] text-ink/40">{c.role}</p>
              </div>
              <h3
                className="display mt-10 text-ink"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)", lineHeight: 0.9, letterSpacing: "-0.04em" }}
              >
                {c.name}
              </h3>
              <p className="mt-4 text-ink/60">{c.line}</p>
              <div
                className="pointer-events-none absolute -bottom-6 -right-6 h-32 w-32 rounded-full opacity-80"
                style={{ background: `radial-gradient(circle, ${c.accent}, transparent 70%)`, filter: "blur(20px)" }}
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ACT III — Filmstrip on light ---------------- */
function ActIII() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["5%", "-82%"]);

  const scenes = [
    { n: "01", k: "Discover", d: "Understanding your business, audience and goals." },
    { n: "02", k: "Design", d: "Wireframes, visual identity and user experience." },
    { n: "03", k: "Develop", d: "Responsive, scalable and optimised products." },
    { n: "04", k: "Launch", d: "Testing, deploying and helping the business grow." },
    { n: "05", k: "Evolve", d: "Measure, sharpen, iterate — long after go-live." },
  ];

  return (
    <section ref={ref} className="relative h-[420vh] bg-ink text-bone">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="absolute left-6 top-[16vh] z-10 md:left-10">
          <SceneSlate act="III" title="The Process" runtime="07:12" />
        </div>

        <div className="pointer-events-none absolute inset-x-0 top-[22vh] flex justify-between px-6 md:px-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="block h-3 w-3 rounded-sm border border-bone/60 bg-bone/10" />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-[22vh] flex justify-between px-6 md:px-10">
          {Array.from({ length: 24 }).map((_, i) => (
            <span key={i} className="block h-3 w-3 rounded-sm border border-bone/60 bg-bone/10" />
          ))}
        </div>

        <motion.div style={{ x }} className="flex gap-6 pl-[8vw] pr-[8vw]">
          {scenes.map((s, i) => (
            <article
              key={s.n}
              className="relative flex h-[58vh] w-[80vw] shrink-0 flex-col justify-between overflow-hidden border-2 border-bone bg-bone text-ink md:w-[55vw]"
              style={{ boxShadow: "12px 12px 0 0 #ff4a1c" }}
            >
              <div className="absolute inset-0 opacity-90">
                <div
                  className="absolute inset-0"
                  style={{
                    background: i % 2
                      ? "linear-gradient(135deg, #050505 0%, #1a0a05 60%, #ff4a1c 130%)"
                      : "linear-gradient(135deg, #050505 0%, #201a05 60%, #f6ea3a 140%)",
                  }}
                />
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay"
                  style={{ backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")" }}
                />
              </div>

              <div className="relative flex items-baseline justify-between p-6">
                <span className="mono text-[10px] uppercase tracking-[0.3em] text-ember">SCENE {s.n}</span>
                <span className="mono text-[10px] uppercase tracking-[0.3em] text-ink/50">TAKE 0{i + 1}</span>
              </div>

              <div className="relative p-8 md:p-12">
                <h3
                  className="display text-ink"
                  style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 0.85, letterSpacing: "-0.05em" }}
                >
                  {s.k}.
                </h3>
                <p className="mt-6 max-w-md text-ink/70">{s.d}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------- ACT IV — Intermission (ember bath) ---------------- */
function ActIV() {
  return (
    <section className="relative overflow-hidden bg-ember px-6 py-40 text-bone md:px-10 md:py-56">
      <div className="mx-auto max-w-[1500px] text-center">
        <p className="mono text-[10px] uppercase tracking-[0.4em] text-bone/70">◉ The Future</p>
        <motion.h2
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          whileInView={{ opacity: 1, letterSpacing: "-0.05em" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-8 text-bone"
          style={{ fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 0.9 }}
        >
          MORE THAN <br />WEBSITES.
        </motion.h2>

        <p className="mono mt-10 max-w-xl mx-auto text-[10px] uppercase tracking-[0.3em] text-bone/70">
          We&rsquo;re building intelligent digital products powered by AI, automation and thoughtful design. The future belongs to businesses that move fast — we&rsquo;re here to help them get there.
        </p>
      </div>
    </section>
  );
}

/* ---------------- ACT V — Rolling Credits (dark) ---------------- */
function Credits() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["25%", "-45%"]);

  const roles = [
    ["Directed by", "The WeDo Studio"],
    ["Written by", "Clients who ship"],
    ["Design", "Type · Colour · Motion"],
    ["Engineering", "Web · Mobile · Edge"],
    ["AI & Automation", "Agents · Pipelines · Tooling"],
    ["Brand & Identity", "Systems that outlast briefs"],
    ["3D & WebGL", "Real-time scenes"],
    ["Payments", "Stripe · Adyen · Regional"],
    ["Maintenance", "SLA · Perf · Security"],
    ["Craft services", "Coffee, mostly"],
    ["Original score", "The hum of the ship log"],
    ["Made in", "MMXXVI · Remote · GMT ± 6"],
  ];

  return (
    <section ref={ref} className="relative min-h-[140vh] overflow-hidden bg-bone text-ink">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <p className="mono absolute top-24 text-[10px] uppercase tracking-[0.4em] text-ember">
          ◉ ACT V · Roll credits
        </p>

        <motion.div style={{ y }} className="w-full max-w-3xl px-6 text-center">
          <h2
            className="display text-ink"
            style={{ fontSize: "clamp(3rem, 10vw, 10rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}
          >
            The Making <br />of <span className="text-gradient">WeDo</span>
          </h2>
          <p className="mono mt-8 text-[10px] uppercase tracking-[0.3em] text-ink/50">
            A picture in perpetual production
          </p>
          <div className="mt-16 space-y-8">
            {roles.map(([k, v]) => (
              <div key={k} className="grid grid-cols-2 items-baseline gap-6">
                <p className="mono text-right text-[11px] uppercase tracking-[0.25em] text-ink/50">{k}</p>
                <p className="text-left text-lg text-ink md:text-2xl">{v}</p>
              </div>
            ))}
            <div className="pt-12">
              <p className="mono text-[10px] uppercase tracking-[0.3em] text-ink/40">[ End card ]</p>
              <Link
                to="/contact"
                className="display mt-6 inline-block text-ink hover:text-gradient"
                style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.05em" }}
              >
                Roll credits →
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SceneSlate({ act, title, runtime, dark = false }: { act: string; title: string; runtime: string; dark?: boolean }) {
  return (
    <div className={`inline-flex items-center gap-3 border-2 px-4 py-2 ${dark ? "border-ink text-ink" : "border-bone text-bone"}`}>
      <span className="mono text-[10px] uppercase tracking-[0.3em] text-ember">ACT {act}</span>
      <span className={`h-3 w-px ${dark ? "bg-ink/40" : "bg-bone/40"}`} />
      <span className="mono text-[10px] uppercase tracking-[0.3em]">{title}</span>
      <span className={`h-3 w-px ${dark ? "bg-ink/40" : "bg-bone/40"}`} />
      <span className="mono text-[10px] uppercase tracking-[0.3em] opacity-60">RT {runtime}</span>
    </div>
  );
}
