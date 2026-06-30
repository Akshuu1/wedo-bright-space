export type Project = {
  slug: string;
  title: string;
  client: string;
  year: string;
  tags: string[];
  brief: string;
  image: string;
};

import work1 from "@/assets/work-1.jpg";
import work2 from "@/assets/work-2.jpg";
import work3 from "@/assets/work-3.jpg";
import work4 from "@/assets/work-4.jpg";

export const projects: Project[] = [
  {
    slug: "molten-commerce",
    title: "Molten Commerce",
    client: "Aurum Goods",
    year: "2026",
    tags: ["Web", "Brand", "3D"],
    brief: "A storefront that feels like a film opening — molten chrome scenes, scroll-driven product reveals, sub-second checkout.",
    image: work1,
  },
  {
    slug: "obsidian-pocket",
    title: "Obsidian Pocket",
    client: "Lumen Mobile",
    year: "2025",
    tags: ["Mobile", "Product"],
    brief: "A finance app rebuilt around a single gesture. Native iOS + Android, shared design system, 4-week ship.",
    image: work2,
  },
  {
    slug: "ribbon-protocol",
    title: "Ribbon Protocol",
    client: "Knotwork DAO",
    year: "2025",
    tags: ["Web", "3D"],
    brief: "Brand identity and marketing site for a coordination protocol. WebGL ribbon-knot logo, editorial type system.",
    image: work3,
  },
  {
    slug: "atlas-automations",
    title: "Atlas Automations",
    client: "Field & Co.",
    year: "2024",
    tags: ["Automation", "AI"],
    brief: "Replaced eleven manual workflows with one intelligent pipeline. Saved 142 hours per month within the first quarter.",
    image: work4,
  },
];
