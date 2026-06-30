import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal, RevealText } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — WeDo Studio" },
      { name: "description", content: "A small, opinionated digital studio. We design, build and automate." },
      { property: "og:title", content: "About — WeDo Studio" },
      { property: "og:description", content: "A small, opinionated digital studio." },
    ],
  }),
  component: About,
});

const capabilities = [
  ["Strategy", "Positioning, roadmaps, scope sculpting."],
  ["Brand", "Identity systems, type, motion language."],
  ["Web", "Marketing sites, commerce, headless CMS."],
  ["Mobile", "iOS, Android, React Native."],
  ["3D & Motion", "WebGL, real-time scenes, scroll choreography."],
  ["Automation", "AI pipelines, integrations, internal tools."],
];

const principles = [
  ["Ship the demo.", "Working software beats the deck."],
  ["Subtract first.", "Every feature has a tax. Most fail the audit."],
  ["Move in weeks.", "Quarters kill momentum. We work in two-week scenes."],
  ["Outlive the brief.", "Build for the team that takes it over."],
];

function About() {
  return (
    <main className="px-6 pb-24 pt-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="01" label="about.html" />
        <h1 className="serif mt-10 text-6xl leading-[0.95] text-bone md:text-[12rem]">
          <RevealText text="A small studio" />
          <br />
          <span className="text-bone/40"><RevealText text="with a long memory." /></span>
        </h1>

        <div className="mt-24 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Reveal>
              <p className="mono text-[10px] uppercase tracking-widest text-ember">[ Manifesto ]</p>
            </Reveal>
          </div>
          <div className="md:col-span-7 space-y-6 text-lg text-bone/80 md:text-2xl">
            <Reveal><p>WeDo is a digital solutions company helping businesses grow through technology — websites, mobile applications, and intelligent automations that simplify operations.</p></Reveal>
            <Reveal delay={0.1}><p>We're not a generalist agency and we're not freelancers. We're a tight crew that scopes ruthlessly, designs with conviction, and ships in two-week scenes.</p></Reveal>
            <Reveal delay={0.2}><p>Whether you're a startup proving an idea or an established business modernizing the stack, we deliver scalable solutions tailored to your needs.</p></Reveal>
          </div>
        </div>

        <section className="mt-32">
          <SectionLabel index="02" label="Capabilities" />
          <div className="mt-12 grid gap-px bg-bone/10 md:grid-cols-3">
            {capabilities.map(([t, d], i) => (
              <Reveal key={t} delay={i * 0.04}>
                <div className="bg-ink p-8">
                  <p className="mono text-[10px] uppercase tracking-widest text-bone/40">0{i + 1}</p>
                  <h3 className="serif mt-4 text-3xl text-bone">{t}</h3>
                  <p className="mt-3 text-sm text-bone/60">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <SectionLabel index="03" label="Principles" />
          <ul className="mt-12">
            {principles.map(([t, d], i) => (
              <li key={t} className="hairline">
                <Reveal delay={i * 0.05}>
                  <div className="grid items-baseline gap-6 py-8 md:grid-cols-12">
                    <span className="mono col-span-1 text-[10px] uppercase tracking-widest text-ember">[ {String(i).padStart(2, "0")} ]</span>
                    <h3 className="serif col-span-5 text-3xl text-bone md:text-5xl">{t}</h3>
                    <p className="col-span-6 text-bone/60">{d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
