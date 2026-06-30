import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { SectionLabel } from "@/components/site/SectionLabel";
import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const Route = createFileRoute("/story")({
  head: () => ({
    meta: [
      { title: "Story — WeDo Studio" },
      { name: "description", content: "WeDo's origin, told in five acts. Scroll for the picture." },
      { property: "og:title", content: "The Story of WeDo" },
      { property: "og:description", content: "Five acts. Scroll for the picture." },
    ],
  }),
  component: Story,
});

const scenes = [
  { n: "01", k: "Discover", d: "Listen, audit, scope. Cut what won't ship." },
  { n: "02", k: "Design", d: "Type, motion, surface. A single visual thesis." },
  { n: "03", k: "Develop", d: "Real code from day one. No throwaway demos." },
  { n: "04", k: "Automate", d: "Wire the boring parts to themselves." },
  { n: "05", k: "Ship", d: "Soft launch, measure, sharpen. Then go loud." },
];

const credits = [
  ["Strategy", "Roadmaps, audits, scope sculpting"],
  ["Brand", "Identity, type, motion language"],
  ["Web", "Marketing sites, commerce, headless CMS"],
  ["Mobile", "iOS, Android, React Native"],
  ["3D & WebGL", "Real-time scenes, scroll choreography"],
  ["Automation", "Workflows, AI pipelines, internal tools"],
  ["Payments", "Stripe, Adyen, regional gateways"],
  ["Maintenance", "SLA support, performance, security"],
];

function Story() {
  return (
    <main className="pt-32">
      {/* Act I — Cold Open */}
      <section className="mx-auto flex min-h-[80vh] max-w-7xl flex-col justify-center px-6 md:px-10">
        <SectionLabel index="I" label="Cold Open" />
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="serif mt-12 max-w-5xl text-4xl leading-[1.1] text-bone md:text-7xl"
        >
          In 2024, a small team asked: <span className="text-bone/40">what if shipping software felt like making a film?</span>
        </motion.h1>
      </section>

      {/* Act II — The Crew */}
      <CrewAct />

      {/* Act III — The Craft (horizontal scroll) */}
      <CraftAct />

      {/* Act IV — The Work (parallax stack) */}
      <WorkStack />

      {/* Act V — The Promise (credits roll) */}
      <section className="px-6 py-32 md:px-10">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="V" label="The Promise" />
          <p className="serif mt-12 max-w-4xl text-4xl leading-[1.1] text-bone md:text-7xl">
            We make products that ship on time and <span className="text-ember">outlive the brief.</span>
          </p>

          <div className="mt-24 grid gap-px bg-bone/10 md:grid-cols-2">
            {credits.map(([k, v], i) => (
              <motion.div
                key={k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.04 }}
                className="flex items-baseline justify-between bg-ink p-6"
              >
                <span className="mono text-xs uppercase tracking-widest text-bone/40">{k}</span>
                <span className="serif text-xl text-bone md:text-2xl">{v}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 border-t border-bone/10 pt-12 text-center">
            <p className="mono text-[10px] uppercase tracking-widest text-bone/40">[ End card ]</p>
            <Link to="/contact" className="serif mt-6 inline-block text-5xl text-bone hover:text-ember md:text-9xl">
              Roll credits →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function CrewAct() {
  return (
    <section className="mx-auto grid max-w-7xl gap-12 px-6 py-32 md:grid-cols-2 md:px-10">
      <SectionLabel index="II" label="The Crew" />
      <div />
      {[
        { name: "Design Lead", line: "Type, color, restraint." },
        { name: "Engineering Lead", line: "Performance budget, always." },
        { name: "Motion Director", line: "Choreography between sections." },
        { name: "Automations Lead", line: "Glue between every tool." },
      ].map((p, i) => (
        <motion.div
          key={p.name}
          initial={{ x: i % 2 ? 60 : -60, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          viewport={{ once: true, margin: "-15% 0px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-bone/10 pt-6"
        >
          <p className="mono text-[10px] uppercase tracking-widest text-ember">[ Cast {String(i + 1).padStart(2, "0")} ]</p>
          <h3 className="serif mt-4 text-5xl text-bone md:text-7xl">{p.name}</h3>
          <p className="mt-3 text-bone/60">{p.line}</p>
        </motion.div>
      ))}
    </section>
  );
}

function CraftAct() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"]);

  return (
    <section ref={ref} className="relative h-[400vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="absolute left-6 top-32 z-10 md:left-10">
          <SectionLabel index="III" label="The Craft" />
        </div>
        <motion.div style={{ x }} className="flex gap-8 pl-[10vw] pr-[10vw]">
          {scenes.map((s) => (
            <article key={s.n} className="flex h-[60vh] w-[80vw] flex-col justify-between border border-bone/10 bg-muted/30 p-10 md:w-[55vw]">
              <div className="flex items-baseline justify-between">
                <span className="mono text-xs uppercase tracking-widest text-ember">SCENE {s.n}</span>
                <span className="mono text-xs uppercase tracking-widest text-bone/40">TAKE 01</span>
              </div>
              <div>
                <h3 className="serif text-7xl leading-none text-bone md:text-[10rem]">{s.k}</h3>
                <p className="mt-6 max-w-md text-bone/60">{s.d}</p>
              </div>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function WorkStack() {
  const stills = [work1, work2, work3, work4];
  return (
    <section className="mx-auto max-w-7xl px-6 py-32 md:px-10">
      <SectionLabel index="IV" label="The Work" />
      <div className="mt-12 space-y-[-12vh]">
        {stills.map((src, i) => (
          <motion.div
            key={i}
            initial={{ y: 80, opacity: 0, scale: 0.95 }}
            whileInView={{ y: 0, opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-20% 0px" }}
            transition={{ duration: 1, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginLeft: `${i * 6}%`, width: `${100 - i * 12}%` }}
            className="sticky top-32 overflow-hidden border border-bone/10"
          >
            <img src={src} alt="" loading="lazy" className="aspect-video w-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
