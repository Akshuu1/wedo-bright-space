export type Metric = { k: string; l: string };
export type Gallery = { palette: [string, string]; caption: string };

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  brief: string;
  palette: [string, string];
  role: string;
  problem: string;
  solution: string;
  metrics: Metric[];
  gallery: Gallery[];
  stack: string[];
  url?: string;
  shot?: string;
};

export const projectShots: Record<string, string> = {
  "epic-events": "/assets/shots/epic.png",
  tekzar: "/assets/shots/tekzar.png",
  stylee: "/assets/shots/stylee.png",
  galleria: "/assets/shots/galleria.png",
  lumiere: "/assets/shots/lumiere.png",
  "nobout-cafe": "/assets/shots/nobout.png",
};



export const projects: Project[] = [
  {
    slug: "epic-events",
    title: "Epic Events",
    client: "Epic Events & Promotion",
    year: "2026",
    tags: ["Web", "Events", "Brand"],
    brief:
      "A cinematic events and promotion website that turns weddings, corporate galas and private celebrations into a single storytelling experience",
    palette: ["#B5566B", "#f6ea3a"],
    role: "Design, Build",
    problem:
      "Founder Ranbir Singh was booking premium events off word-of-mouth alone — the old site felt like a template and never showed the scale or craft behind 12+ years of work across India",
    solution:
      "An editorial hero, curated gallery with signature moments and a start-planning flow that treats every inquiry like a brief — built to convert high-intent enquiries from the first scroll",
    metrics: [
      { k: "12+ yrs", l: "Industry expertise showcased" },
      { k: "3 verticals", l: "Weddings · Corporate · Private" },
      { k: "98", l: "Lighthouse performance" },
      { k: "1 site", l: "One brand, one voice" },
    ],
    gallery: [
      { palette: ["#B5566B", "#f6ea3a"], caption: "Hero · vision to reality" },
      { palette: ["#f6ea3a", "#0a0a0a"], caption: "Gallery · signature moments" },
      { palette: ["#0a0a0a", "#B5566B"], caption: "Start planning · brief flow" },
    ],
    stack: ["React", "Vite", "Motion"],
    url: "https://events-seven-plum.vercel.app/",
  },
  {
    slug: "tekzar",
    title: "Tekzar",
    client: "Tekzar — Excellence Made Affordable",
    year: "2026",
    tags: ["Web", "B2B", "Commerce"],
    brief:
      "A B2B agriculture equipment website powering Kerala & Tamil Nadu — built for farmers, dealers and warranty-backed buying",
    palette: ["#f97316", "#22c55e"],
    role: "Strategy, Design, Build",
    problem:
      "Dealers and farmers were browsing PDFs, and trust signals like warranty, dealer count and product range were scattered across brochures — losing enquiries at the top of the funnel",
    solution:
      "A field-tough hero, clear product architecture and dealer / warranty proof surfaced above the fold — plus a become-a-dealer track that opens a second, higher-margin channel",
    metrics: [
      { k: "1L+", l: "Farmers reached" },
      { k: "200+", l: "Dealers in network" },
      { k: "100%", l: "Warranty on all products" },
      { k: "2 states", l: "Kerala + Tamil Nadu" },
    ],
    gallery: [
      { palette: ["#f97316", "#22c55e"], caption: "Hero · built for tough fields" },
      { palette: ["#22c55e", "#0a0a0a"], caption: "Products · full range" },
      { palette: ["#0a0a0a", "#f97316"], caption: "Dealers · become a partner" },
    ],
    stack: ["React", "Vite", "Tailwind"],
    url: "https://tekzar.vercel.app/",
  },
  {
    slug: "stylee",
    title: "Styleé",
    client: "Styleé — Fashion",
    year: "2026",
    tags: ["Web", "Fashion", "Editorial"],
    brief:
      "An editorial fashion platform where trends are curated with vision, rooted in research and crafted for designers, stylists and dreamers",
    palette: ["#c6f24a", "#0a0a0a"],
    role: "Art Direction, Design, Build",
    problem:
      "Fashion discovery online looks the same everywhere — a wall of products with no point of view — so trend-aware buyers scroll past and never come back",
    solution:
      "An editorial magazine layout with a curated approach section, saved-look wishlist and login-gated knowledge feed — designed to feel like a print title, priced like a startup",
    metrics: [
      { k: "3 pillars", l: "Vision · Research · Craft" },
      { k: "Login", l: "Personalised feed" },
      { k: "97", l: "Lighthouse performance" },
      { k: "1 voice", l: "Editorial, not generic" },
    ],
    gallery: [
      { palette: ["#c6f24a", "#0a0a0a"], caption: "Approach · curated with vision" },
      { palette: ["#0a0a0a", "#c6f24a"], caption: "Trends · editorial feed" },
      { palette: ["#c6f24a", "#B5566B"], caption: "Knowledge · designer library" },
    ],
    stack: ["React", "Vite", "Motion"],
    url: "https://stylee-gamma.vercel.app/",
  },
  {
    slug: "galleria",
    title: "Galleria",
    client: "Galleria — Art Gallery",
    year: "2026",
    tags: ["Web", "Art", "Motion"],
    brief:
      "A curatorial archive for a contemporary art gallery — a noir-focus grid that treats every work as an artefact in the registry",
    palette: ["#0a0a0a", "#f4f1ea"],
    role: "Art Direction, Motion, Build",
    problem:
      "A serious gallery needed a serious online presence — most gallery sites feel like WordPress listings and don't hold a collector's attention past the first scroll",
    solution:
      "A cinematic tilted grid, noir-focus interaction and archive registry typography that make the site feel like walking through the space itself — with room to grow into show pages and collector CRM",
    metrics: [
      { k: "Cinematic", l: "Noir-focus grid" },
      { k: "Registry", l: "Archive typography" },
      { k: "0", l: "Templates used" },
      { k: "1 gallery", l: "One curatorial voice" },
    ],
    gallery: [
      { palette: ["#0a0a0a", "#f4f1ea"], caption: "Archive · curatorial grid" },
      { palette: ["#f4f1ea", "#0a0a0a"], caption: "Focus · noir mode" },
      { palette: ["#0a0a0a", "#B5566B"], caption: "Registry · type system" },
    ],
    stack: ["React", "Vite", "Motion"],
    url: "https://galleria-tau.vercel.app/",
  },
  {
    slug: "lumiere",
    title: "Lumière",
    client: "Lumière — Interior Design",
    year: "2026",
    tags: ["Web", "Interior", "Studio"],
    brief:
      "A refined interior design studio website — warm materials, editorial pacing and a projects-first architecture that lets the spaces speak",
    palette: ["#c9a84c", "#1a1a1a"],
    role: "Design, Build",
    problem:
      "Interior studios live and die by their portfolio, but most sites bury the work under sliders and stock imagery — reducing beautiful rooms to thumbnails",
    solution:
      "A full-bleed projects grid, considered typography and a slow, cinematic scroll that lets each room hold the viewer — with an enquiry flow tuned to high-ticket residential briefs",
    metrics: [
      { k: "Editorial", l: "Slow, considered pacing" },
      { k: "Projects-first", l: "Work above chrome" },
      { k: "98", l: "Lighthouse performance" },
      { k: "1 studio", l: "One clear voice" },
    ],
    gallery: [
      { palette: ["#c9a84c", "#1a1a1a"], caption: "Hero · warm materials" },
      { palette: ["#1a1a1a", "#c9a84c"], caption: "Projects · full-bleed grid" },
      { palette: ["#c9a84c", "#B5566B"], caption: "Studio · quiet enquiry" },
    ],
    stack: ["React", "Vite", "Motion"],
    url: "https://interior-design-five-khaki.vercel.app/",
  },
  {
    slug: "nobout-cafe",
    title: "Nobout Café",
    client: "Nobout — Café Menu",
    year: "2026",
    tags: ["Web", "Menu", "Hospitality"],
    brief:
      "A QR-first digital menu for Nobout Café — fast, tactile and updatable in real time by the owner, no reprints",
    palette: ["#e85d3a", "#f4f1ea"],
    role: "Product, Design, Build",
    problem:
      "The café was reprinting paper menus every time a price or dish changed, and guests had no way to see photos, tags or allergens before ordering",
    solution:
      "A QR menu that loads in under a second on 4G, groups dishes by section with photos and tags, and lets the owner edit items from a phone — no laminator required",
    metrics: [
      { k: "< 1s", l: "First menu paint on 4G" },
      { k: "Live", l: "Owner edits in real time" },
      { k: "0", l: "Reprints" },
      { k: "1 café", l: "Rolled out to Nobout" },
    ],
    gallery: [
      { palette: ["#e85d3a", "#f4f1ea"], caption: "Guest · QR menu" },
      { palette: ["#f4f1ea", "#e85d3a"], caption: "Sections · dishes & tags" },
      { palette: ["#e85d3a", "#0a0a0a"], caption: "Owner · live edits" },
    ],
    stack: ["React", "Vite", "Supabase"],
    url: "https://sample-menu-livid.vercel.app/",
  },
];
