import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal, RevealText } from "@/components/site/Reveal";
import { SplitPin } from "@/components/site/SplitPin";

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

const principles = [
  ["Ship the demo.", "Working software beats the deck."],
  ["Subtract first.", "Every feature has a tax. Most fail the audit."],
  ["Move in weeks.", "Quarters kill momentum. We work in two-week scenes."],
  ["Outlive the brief.", "Build for the team that takes it over."],
];

function About() {
  return (
    <main className="bg-ink">
      {/* Intro */}
      <section className="px-6 pb-20 pt-40 md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="01" label="about / studio" />
          <h1
            className="display mt-10 text-bone"
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", lineHeight: 0.88 }}
          >
            <RevealText text="A small studio" />
            <br />
            <span className="text-bone/40">
              <RevealText text="with a long memory." />
            </span>
          </h1>

          <div className="mt-24 grid gap-16 md:grid-cols-12">
            <div className="md:col-span-5">
              <Reveal>
                <p className="mono text-[10px] uppercase tracking-[0.3em] text-ember">
                  [ Manifesto ]
                </p>
              </Reveal>
            </div>
            <div className="md:col-span-7 space-y-6 text-lg text-bone/80 md:text-2xl">
              <Reveal>
                <p>
                  WeDo helps businesses grow through technology — websites, mobile applications,
                  and intelligent automations that simplify operations.
                </p>
              </Reveal>
              <Reveal delay={0.1}>
                <p>
                  We're not a generalist agency and we're not freelancers. We're a tight crew
                  that scopes ruthlessly, designs with conviction, and ships in two-week scenes.
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities — Trionn split-pin */}
      <SplitPin
        label="◆ OUR CAPABILITIES"
        caption="✦ DIFFERENT DISCIPLINES. ONE STANDARD OF CRAFT."
        centerpiece={
          <div className="relative h-[70vh] w-[70vh] max-w-[80vw] max-h-[80vw]">
            <div
              className="absolute inset-0 rounded-[3rem] opacity-90"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, rgba(255,170,90,0.35), transparent 55%), radial-gradient(circle at 70% 70%, rgba(255,120,60,0.25), transparent 60%), #111",
                filter: "blur(0.5px)",
              }}
            />
            <div className="absolute inset-8 rounded-[2.5rem] border border-bone/10" />
            <div className="absolute inset-16 rounded-[2rem] border border-bone/5" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="display text-bone/15"
                style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}
              >
                ◯
              </span>
            </div>
          </div>
        }
        panels={[
          {
            side: "left",
            eyebrow: "[ 01 ] AI & Automation",
            title: "Intelligent\nAutomation",
            body: "AI-powered pipelines that enhance products, automate workflows, and unlock smarter digital experiences.",
          },
          {
            side: "right",
            eyebrow: "[ 02 ] Web Design",
            title: "Website &\nMobile Design",
            body: "High-quality web and app experiences designed to attract users and keep them coming back.",
          },
          {
            side: "left",
            eyebrow: "[ 03 ] Engineering",
            title: "Web\nDevelopment",
            body: "Custom web development delivered with a product-focused, design-conscious approach.",
          },
          {
            side: "right",
            eyebrow: "[ 04 ] CMS",
            title: "WordPress\n& Headless",
            body: "Performance-first builds focused on clarity and experiences that convert visitors into loyal users.",
          },
        ]}
      />

      {/* Principles — light invert */}
      <section className="bg-bone px-6 py-32 text-ink md:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionLabel index="03" label="principles" />
          <ul className="mt-12">
            {principles.map(([t, d], i) => (
              <li key={t} className="border-t border-ink/15">
                <Reveal delay={i * 0.05}>
                  <div className="grid items-baseline gap-6 py-10 md:grid-cols-12">
                    <span className="mono col-span-1 text-[10px] uppercase tracking-widest text-ember">
                      [ {String(i).padStart(2, "0")} ]
                    </span>
                    <h3
                      className="display col-span-5 text-ink"
                      style={{ fontSize: "clamp(2rem, 4vw, 4rem)", lineHeight: 0.95 }}
                    >
                      {t}
                    </h3>
                    <p className="col-span-6 text-ink/60 md:text-lg">{d}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
