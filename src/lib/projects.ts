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
};

export const projects: Project[] = [
  {
    slug: "tekzar",
    title: "Tekzar",
    client: "Tekzar Industrial",
    year: "2026",
    tags: ["Web", "Product", "Commerce"],
    brief:
      "An industrial equipment ordering platform designed to simplify product discovery and purchasing at scale",
    palette: ["#B5566B", "#ffb020"],
    role: "Strategy, Design, Build",
    problem:
      "Buyers were lost in a 4,000-SKU catalog spread across PDFs and spreadsheets Sales spent hours quoting parts that customers should have been able to configure themselves",
    solution:
      "A single ordering platform with faceted discovery, live specs, saved carts and quote-to-order in one flow Built on a headless catalog so ops can update thousands of parts without touching the front end",
    metrics: [
      { k: "3.4x", l: "Faster part discovery" },
      { k: "62%", l: "Drop in sales-support tickets" },
      { k: "98", l: "Lighthouse performance" },
      { k: "8 wks", l: "From kickoff to launch" },
    ],
    gallery: [
      { palette: ["#B5566B", "#ffb020"], caption: "Catalog · faceted discovery" },
      { palette: ["#ffb020", "#0a0a0a"], caption: "Product · live specifications" },
      { palette: ["#0a0a0a", "#B5566B"], caption: "Checkout · quote to order" },
    ],
    stack: ["Next", "Sanity", "Stripe", "Algolia"],
  },
  {
    slug: "digital-menu",
    title: "Digital Menu Platform",
    client: "Hospitality Group",
    year: "2026",
    tags: ["Web", "Mobile", "AI"],
    brief:
      "A modern QR-powered menu experience for restaurants and cafés with interactive browsing, live feedback and analytics",
    palette: ["#f6ea3a", "#B5566B"],
    role: "Product, Design, Build",
    problem:
      "Paper menus were reprinted weekly, feedback lived in scattered Google reviews and owners had no idea which dishes actually drove revenue",
    solution:
      "A QR menu that updates in real time, collects structured feedback at the table and feeds an owner dashboard with per-item revenue, dwell time and rating trends",
    metrics: [
      { k: "24%", l: "Lift in average ticket" },
      { k: "11k", l: "Feedback events / month" },
      { k: "< 1s", l: "First menu paint on 4G" },
      { k: "9 sites", l: "Rolled out in Q1" },
    ],
    gallery: [
      { palette: ["#f6ea3a", "#B5566B"], caption: "Guest · QR menu" },
      { palette: ["#B5566B", "#0a0a0a"], caption: "Feedback · one tap" },
      { palette: ["#0a0a0a", "#f6ea3a"], caption: "Owner · live analytics" },
    ],
    stack: ["React", "TanStack", "Supabase", "AI"],
  },
  {
    slug: "portfolio-experience",
    title: "Portfolio Experience",
    client: "Independent Creative",
    year: "2025",
    tags: ["Web", "Motion", "3D"],
    brief:
      "An immersive personal portfolio combining smooth animations, storytelling and premium interactions",
    palette: ["#B5566B", "#0a0a0a"],
    role: "Art Direction, Motion, Build",
    problem:
      "A senior creative was losing pitches to studios with far weaker work — because the portfolio itself felt like a template and never showed the craft behind the case studies",
    solution:
      "A scroll-choreographed portfolio with WebGL scene transitions, kinetic type and a case-study layout that reads like a short film Every interaction is tuned to under 16ms",
    metrics: [
      { k: "5x", l: "Increase in inbound leads" },
      { k: "3:12", l: "Median session duration" },
      { k: "97", l: "Lighthouse performance" },
      { k: "0", l: "Templates used" },
    ],
    gallery: [
      { palette: ["#8b5cf6", "#22d3ee"], caption: "Hero · WebGL scene" },
      { palette: ["#22d3ee", "#0a0a0a"], caption: "Case · scroll narrative" },
      { palette: ["#0a0a0a", "#8b5cf6"], caption: "Contact · magnetic CTA" },
    ],
    stack: ["React", "Three", "GSAP", "Lenis"],
  },
  {
    slug: "atlas-automations",
    title: "Atlas Automations",
    client: "Field & Co",
    year: "2025",
    tags: ["AI", "Automation"],
    brief:
      "Replaced eleven manual workflows with one intelligent pipeline that runs the back office overnight",
    palette: ["#6366f1", "#8b5cf6"],
    role: "Systems, AI, Ops",
    problem:
      "The ops team was drowning in copy-paste — invoices, CRM updates, inventory sync and reporting all happening by hand across five tools every single day",
    solution:
      "One event-driven pipeline with AI classification, structured extraction and human-in-the-loop review for edge cases Everything logs to a single dashboard the founders actually read",
    metrics: [
      { k: "142 hrs", l: "Saved per month" },
      { k: "11 → 1", l: "Workflows consolidated" },
      { k: "99.4%", l: "Extraction accuracy" },
      { k: "6 wks", l: "Payback period" },
    ],
    gallery: [
      { palette: ["#6366f1", "#8b5cf6"], caption: "Pipeline · event flow" },
      { palette: ["#8b5cf6", "#0a0a0a"], caption: "Review · human in loop" },
      { palette: ["#0a0a0a", "#6366f1"], caption: "Dashboard · ops signal" },
    ],
    stack: ["Node", "OpenAI", "Postgres", "n8n"],
  },
];
