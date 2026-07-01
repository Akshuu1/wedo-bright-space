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
    slug: "tekzar",
    title: "Tekzar",
    client: "Tekzar Industrial",
    year: "2026",
    tags: ["Web", "Product", "Commerce"],
    brief:
      "An industrial equipment ordering platform designed to simplify product discovery and purchasing — a full catalog experience built for speed, clarity and scale.",
    palette: ["#ff5722", "#ffb020"],
  },
  {
    slug: "digital-menu",
    title: "Digital Menu Platform",
    client: "Hospitality Group",
    year: "2026",
    tags: ["Web", "Mobile", "AI"],
    brief:
      "A modern QR-powered menu experience for restaurants and cafés — interactive browsing, live feedback, admin dashboard and analytics baked in.",
    palette: ["#f6ea3a", "#ff4a1c"],
  },
  {
    slug: "portfolio-experience",
    title: "Portfolio Experience",
    client: "Independent Creative",
    year: "2025",
    tags: ["Web", "Motion", "3D"],
    brief:
      "An immersive personal portfolio combining smooth animations, storytelling and premium interactions. Built for performance, designed for impact.",
    palette: ["#8b5cf6", "#22d3ee"],
  },
  {
    slug: "atlas-automations",
    title: "Atlas Automations",
    client: "Field & Co.",
    year: "2025",
    tags: ["AI", "Automation"],
    brief:
      "Replaced eleven manual workflows with one intelligent pipeline. Saved 142 hours per month in the first quarter.",
    palette: ["#6366f1", "#8b5cf6"],
  },
];
