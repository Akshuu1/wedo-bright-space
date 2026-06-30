import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SectionLabel } from "@/components/site/SectionLabel";
import { RevealText } from "@/components/site/Reveal";
import { ProjectArt } from "@/components/site/ProjectArt";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — WeDo Studio" },
      { name: "description", content: "Selected projects: websites, apps and automations." },
      { property: "og:title", content: "Work — WeDo Studio" },
      { property: "og:description", content: "Selected projects." },
    ],
  }),
  component: Work,
});

const filters = ["All", "Web", "Mobile", "3D", "Brand", "Automation", "AI"];

function Work() {
  const [active, setActive] = useState("All");
  const [hover, setHover] = useState<number | null>(null);
  const list = active === "All" ? projects : projects.filter((p) => p.tags.includes(active));

  return (
    <main className="px-6 pb-24 pt-40 md:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionLabel index="02" label="work.html" />
        <h1 className="serif mt-10 text-6xl leading-[0.95] text-bone md:text-[10rem]">
          <RevealText text="Selected" />
          <br />
          <span className="serif italic text-gradient"><RevealText text="cases." /></span>
        </h1>

        <div className="mt-16 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`mono border px-4 py-2 text-[10px] uppercase tracking-widest transition-colors ${active === f ? "border-violet bg-violet text-bone" : "border-bone/20 text-bone hover:border-bone"}`}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-12">
          {list.map((p, i) => (
            <li
              key={p.slug}
              className="hairline relative"
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
            >
              <Link to="/work/$slug" params={{ slug: p.slug }} data-cursor="view" className="group grid items-baseline gap-6 py-8 md:grid-cols-12">
                <span className="mono col-span-1 text-[10px] uppercase tracking-widest text-bone/40">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="serif col-span-5 text-4xl text-bone transition-colors group-hover:text-gradient md:text-6xl">{p.title}</h3>
                <span className="mono col-span-3 text-xs text-bone/60">{p.client}</span>
                <span className="mono col-span-2 text-xs text-bone/60">{p.tags.join(" · ")}</span>
                <span className="mono col-span-1 text-right text-xs text-bone/60">{p.year}</span>
              </Link>
              {hover === i && (
                <div className="pointer-events-none fixed right-10 top-1/2 z-30 hidden h-72 w-96 -translate-y-1/2 shadow-2xl md:block animate-fade-in">
                  <ProjectArt index={i} title={p.title} palette={p.palette} className="h-full w-full" />
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
