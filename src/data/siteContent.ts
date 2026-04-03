export type ProjectLinkTone = "ink" | "clay" | "mint";

export type ProjectLink = {
  label: string;
  href: string;
  tone: ProjectLinkTone;
};

export type Project = {
  title: string;
  eyebrow: string;
  description: string;
  tags: string[];
  links: ProjectLink[];
  featured?: boolean;
  spotlight?: string;
  releaseNote?: string;
};

export type StackItem = {
  name: string;
  icon:
    | "html"
    | "css"
    | "javascript"
    | "typescript"
    | "jsx"
    | "tsx"
    | "nextjs"
    | "react"
    | "reactnative"
    | "mongodb"
    | "express"
    | "ubuntu"
    | "flutter"
    | "go"
    | "firebase"
    | "supabase"
    | "dart"
    | "tailwindcss"
    | "python";
  category: "frontend" | "backend" | "mobile" | "platform";
};

export type SocialIcon = "github" | "linkedin" | "x" | "email";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIcon;
  detail: string;
};

export const profile = {
  name: "Chitresh Yadav",
  handle: "~csy",
  role: "React, React Native + Flutter developer shipping polished products",
  strapline: "React • React Native • Flutter • FastAPI",
  heroTitle: "Building mobile products that feel calm, fast, and finished.",
  heroSummary:
    "I build production-ready apps across web and mobile: React and Next.js for the frontend, React Native and Flutter for polished mobile delivery, and backend work that stays practical.",
  heroDescription:
    "This portfolio stays focused on full-stack delivery: clean APIs, React Native and Flutter experiences with real product feel, and systems built to ship without visual clutter.",
  aboutPrimary:
    "I’m a MERN + Flutter developer who obsesses over smooth animations, maintainable data flows, and interfaces that feel native on every device.",
  aboutSecondary:
    "My sweet spot is turning rough ideas into scalable systems: REST APIs, MongoDB-backed data models, and AI features built for real usage—not just demo moments.",
};

export const techStack: StackItem[] = [
  {
    name: "HTML",
    icon: "html",
    category: "frontend",
  },
  {
    name: "CSS",
    icon: "css",
    category: "frontend",
  },
  {
    name: "JavaScript",
    icon: "javascript",
    category: "frontend",
  },
  {
    name: "TypeScript",
    icon: "typescript",
    category: "frontend",
  },
  {
    name: "JSX",
    icon: "jsx",
    category: "frontend",
  },
  {
    name: "TSX",
    icon: "tsx",
    category: "frontend",
  },
  {
    name: "Next.js",
    icon: "nextjs",
    category: "frontend",
  },
  {
    name: "React",
    icon: "react",
    category: "frontend",
  },
  {
    name: "Tailwind CSS",
    icon: "tailwindcss",
    category: "frontend",
  },
  {
    name: "Express",
    icon: "express",
    category: "backend",
  },
  {
    name: "MongoDB",
    icon: "mongodb",
    category: "backend",
  },
  {
    name: "Firebase",
    icon: "firebase",
    category: "backend",
  },
  {
    name: "Supabase",
    icon: "supabase",
    category: "backend",
  },
  {
    name: "Go",
    icon: "go",
    category: "backend",
  },
  {
    name: "Python",
    icon: "python",
    category: "backend",
  },
  {
    name: "React Native",
    icon: "reactnative",
    category: "mobile",
  },
  {
    name: "Flutter",
    icon: "flutter",
    category: "mobile",
  },
  {
    name: "Dart",
    icon: "dart",
    category: "mobile",
  },
  {
    name: "Ubuntu",
    icon: "ubuntu",
    category: "platform",
  },
];

export const projects: Project[] = [
  {
    title: "Jobjaldi",
    eyebrow: "Job discovery platform",
    description:
      "A job discovery platform built for modern job seekers with streamlined browsing, filtering, and application flow.",
    tags: ["Flutter", "Dart", "Job Board"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/jobjaldi",
        tone: "clay",
      },
    ],
  },
  {
    title: "Bytewise",
    eyebrow: "Play Store release",
    description:
      "A Flutter app shipped to the Google Play Store with a user-facing product surface and production-style release flow.",
    tags: ["Flutter", "Dart", "Android", "Play Store"],
    featured: true,
    spotlight: "Live on Google Play",
    releaseNote:
      "This is the clearest proof that the work is not just a concept screen. It shipped as a public app with release discipline, store readiness, and a real delivery bar.",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.csy20.bytewise",
        tone: "mint",
      },
    ],
  },
  {
    title: "News App",
    eyebrow: "Realtime content experience",
    description:
      "A news experience built on top of a live API with category filters and a fast-scanning content layout.",
    tags: ["Flutter", "API Integration", "Realtime"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/day21",
        tone: "clay",
      },
    ],
  },
  {
    title: "Weather App",
    eyebrow: "Location-aware utility",
    description:
      "A forecast app with live location data, timely weather feedback, and a clean Material-inspired interface.",
    tags: ["Flutter", "Weather API", "Location"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/proj23",
        tone: "clay",
      },
    ],
  },
  {
    title: "GitHub View",
    eyebrow: "Developer tooling UI",
    description:
      "A GitHub profile lookup tool for quickly inspecting user stats, repositories, and activity from a single screen.",
    tags: ["Flutter", "GitHub API", "User Profiles"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/proj23",
        tone: "clay",
      },
    ],
  },
];

export const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/csy20",
    icon: "github",
    detail: "Open source work and learning repos.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/csy20/",
    icon: "linkedin",
    detail: "Career profile and collaboration touchpoint.",
  },
  {
    label: "X",
    href: "https://x.com/the__csy20",
    icon: "x",
    detail: "Thoughts, experiments, and public build notes.",
  },
  {
    label: "Email",
    href: "mailto:chitreshy20@gmail.com",
    icon: "email",
    detail: "Best route for project inquiries and direct contact.",
  },
];

export const resumeUrl =
  "https://drive.google.com/uc?export=download&id=1vApe158f-0X5fXjQX5DuUNLJzdGFIiCK";
