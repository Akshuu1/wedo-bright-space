import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SectionLabel } from "@/components/site/SectionLabel";
import { Reveal } from "@/components/site/Reveal";
import { ProjectArt } from "@/components/site/ProjectArt";
import { projects } from "@/lib/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData, params }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.project.title} — WeDo` },
          { name: "description", content: loaderData.project.brief },
          { property: "og:title", content: `${loaderData.project.title} — WeDo` },
          { property: "og:description", content: loaderData.project.brief },
          { property: "og:url", content: `/work/${params.slug}` },
          { property: "og:type", content: "article" },
        ]
      : [],
    links: loaderData ? [{ rel: "canonical", href: `/work/${params.slug}` }] : [],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              name: loaderData.project.title,
              description: loaderData.project.brief,
              creator: { "@type": "Organization", name: "WeDo Studio" },
              dateCreated: loaderData.project.year,
              url: `/work/${params.slug}`,
            }),
          },
        ]
      : [],
  }),
  component: Case,
  notFoundComponent: () => (
    <div className="grid min-h-screen place-items-center px-6 text-center">
      <div>
        <p className="mono text-[10px] uppercase tracking-widest text-violet">[ Case not found ]</p>
        <h1 className="serif mt-4 text-6xl text-bone">No such project.</h1>
        <Link to="/work" className="mono mt-8 inline-block border border-bone/30 px-6 py-3 text-xs uppercase tracking-widest hover:bg-chalk hover:text-bone">All work</Link>
      </div>
    </div>
  ),
});

function Case() {
  const { project } = Route.useLoaderData();
  const idx = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(idx + 1) % projects.length];

  return (
    <main className="pt-32">
      <header className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionLabel index={String(idx + 1).padStart(2, "0")} label={`case · ${project.client}`} />
        <h1 className="serif mt-10 text-5xl leading-[0.95] text-bone md:text-[10rem]">{project.title}</h1>
        <div className="mt-10 grid gap-6 border-y border-bone/10 py-6 md:grid-cols-4">
          {[
            ["Client", project.client],
            ["Year", project.year],
            ["Scope", project.tags.join(" · ")],
            ["Role", "Strategy, Design, Build"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="mono text-[10px] uppercase tracking-widest text-bone/40">{k}</p>
              <p className="mt-2 text-bone">{v}</p>
            </div>
          ))}
        </div>
      </header>

      <div className="mt-16 px-6 md:px-10">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <ProjectArt index={idx} title={project.title} palette={project.palette} className="aspect-video w-full" />
          </Reveal>
        </div>
      </div>

      <section className="mx-auto mt-24 grid max-w-7xl gap-16 px-6 md:grid-cols-12 md:px-10">
        <div className="md:col-span-4">
          <p className="mono text-[10px] uppercase tracking-widest text-violet">[ Brief ]</p>
        </div>
        <div className="md:col-span-8">
          <p className="serif text-3xl leading-[1.2] text-bone md:text-5xl">{project.brief}</p>
        </div>
      </section>

      <section className="mx-auto mt-24 grid max-w-7xl gap-6 px-6 md:grid-cols-2 md:px-10">
        {[0, 1].map((i) => (
          <Reveal key={i} delay={i * 0.1}>
            <ProjectArt
              index={idx + i}
              title={project.title}
              palette={i === 0 ? project.palette : [project.palette[1], project.palette[0]]}
              className="aspect-[4/3] w-full"
            />
          </Reveal>
        ))}
      </section>

      <section className="mx-auto mt-32 max-w-7xl px-6 md:px-10">
        <Link
          to="/work/$slug"
          params={{ slug: next.slug }}
          data-cursor="view"
          className="group block border-t border-bone/10 pt-10"
        >
          <p className="mono text-[10px] uppercase tracking-widest text-bone/40">Next case →</p>
          <h2 className="serif mt-4 text-5xl text-bone transition-colors group-hover:text-gradient md:text-8xl">{next.title}</h2>
        </Link>
      </section>
    </main>
  );
}
