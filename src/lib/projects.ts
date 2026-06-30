export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  brief: string;
  palette: [string, string];
};

export const projects: Project[] = [
  {
    slug: "molten-commerce",
    title: "Molten Commerce",
    client: "Aurum Goods",
    year: "2026",
    tags: ["Web", "Brand", "3D"],
    brief:
      "A storefront that feels like a film opening — kinetic product reveals, scroll choreography, sub-second checkout.",
    palette: ["#8b5cf6", "#4f8cff"],
  },
  {
    slug: "obsidian-pocket",
    title: "Obsidian Pocket",
    client: "Lumen Mobile",
    year: "2025",
    tags: ["Mobile", "Product"],
    brief:
      "A finance app rebuilt around a single gesture. Native iOS + Android, shared design system, 4-week ship.",
    palette: ["#4f8cff", "#22d3ee"],
  },
  {
    slug: "ribbon-protocol",
    title: "Ribbon Protocol",
    client: "Knotwork DAO",
    year: "2025",
    tags: ["Web", "3D"],
    brief:
      "Brand identity and marketing site for a coordination protocol. WebGL ribbon-knot logo, editorial type system.",
    palette: ["#a855f7", "#ec4899"],
  },
  {
    slug: "atlas-automations",
    title: "Atlas Automations",
    client: "Field & Co.",
    year: "2024",
    tags: ["Automation", "AI"],
    brief:
      "Replaced eleven manual workflows with one intelligent pipeline. Saved 142 hours per month in the first quarter.",
    palette: ["#6366f1", "#8b5cf6"],
  },
];
