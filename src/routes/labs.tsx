import { createFileRoute } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal, RevealText } from "@/components/site/Reveal";

export const Route = createFileRoute("/labs")({
  head: () => ({
    meta: [
      { title: "Labs — WeDo Studio" },
      { name: "description", content: "Experiments, prototypes and R&D." },
      { property: "og:title", content: "Labs — WeDo Studio" },
      { property: "og:description", content: "Experiments, prototypes and R&D." },
    ],
  }),
  component: Labs,
});

const experiments = [
  { n: "001", t: "Generative Logo Mill", d: "An evolutionary system that breeds 10,000 logos overnight and ranks survivors." },
  { n: "002", t: "Voice → Component", d: "Sketch a UI by talking. Live React output, edits via revision dialogue." },
  { n: "003", t: "Scroll Cinema Engine", d: "A timeline-based scroll choreographer. We use it across every site we ship." },
  { n: "004", t: "Invoice Reflex", d: "Receipts in, reconciled ledger out. Tested on 14 months of small-business chaos." },
  { n: "005", t: "Mirror Cursor", d: "A cursor that learns your gestures and predicts the next click within 80ms." },
  { n: "006", t: "Auto-Brief", d: "Drop a Loom. Get a scoped, costed brief. Surprisingly close to ours." },
];

function Labs() {
  return (
    <main className="px-6 pb-24 pt-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="04" label="labs.html" />
        <h1 className="serif mt-10 text-6xl leading-[0.95] text-bone md:text-[10rem]">
          <RevealText text="Things we" />
          <br />
          <span className="italic text-bone/50"><RevealText text="break on purpose." /></span>
        </h1>

        <p className="mt-10 max-w-2xl text-lg text-bone/70 md:text-xl">
          A rotating shelf of experiments. Some become products. Some die loud.
          All of them teach us something the client work cannot.
        </p>

        <div className="mt-20 grid gap-px bg-bone/10 md:grid-cols-2">
          {experiments.map((e, i) => (
            <Reveal key={e.n} delay={(i % 3) * 0.05}>
              <article className="group flex h-full flex-col justify-between bg-ink p-8 transition-colors hover:bg-muted md:p-10">
                <div className="flex items-baseline justify-between">
                  <span className="mono text-[10px] uppercase tracking-widest text-ember">[ {e.n} ]</span>
                  <span className="mono text-[10px] uppercase tracking-widest text-bone/40">Experiment</span>
                </div>
                <div className="mt-16">
                  <h3 className="serif text-4xl text-bone transition-colors group-hover:text-ember md:text-6xl">{e.t}</h3>
                  <p className="mt-4 max-w-md text-bone/60">{e.d}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </main>
  );
}
