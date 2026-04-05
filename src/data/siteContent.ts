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
  role: "Building with React, React Native, and Flutter",
  strapline: "React • React Native • Flutter • FastAPI",
  heroTitle: "I build apps that feel right — fast, smooth, and done properly.",
  heroSummary:
    "I work across web and mobile, mostly with React, Next.js, React Native, and Flutter. I care about how things feel to use, not just how they look in a screenshot.",
  heroDescription:
    "Everything here is real work — APIs that actually run, animations that don't stutter, and apps that got finished instead of staying half-built.",
  aboutPrimary:
    "I'm a full-stack developer who gets way too into smooth animations, clean data flows, and making things feel native on every device.",
  aboutSecondary:
    "I like taking rough ideas and turning them into real systems — REST APIs, proper data models, and features people actually use.",
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
    eyebrow: "Job search app",
    description:
      "A job search app I built to make browsing and filtering listings actually painless. Ended up learning a lot about search UX.",
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
    eyebrow: "Published on Play Store",
    description:
      "A Flutter app I actually shipped to the Play Store — not just a demo, but a real release with proper versioning, store listing, and all that.",
    tags: ["Flutter", "Dart", "Android", "Play Store"],
    featured: true,
    spotlight: "Live on Google Play",
    releaseNote:
      "This one matters to me because it's not sitting in a repo somewhere. People can install it. That forced me to deal with things like release signing, store guidelines, and writing a proper listing.",
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
    eyebrow: "Live API feed",
    description:
      "A news reader that pulls from a live API, with category tabs and a layout that makes scanning headlines quick.",
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
    eyebrow: "Location + API",
    description:
      "Grabs your location, hits a weather API, and shows you a clean forecast. Simple, but the Material design turned out nice.",
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
    eyebrow: "Dev tool",
    description:
      "A quick tool to look up any GitHub user — see their stats, repos, and recent activity all on one screen.",
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
    detail: "Where all my code lives.",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/csy20/",
    icon: "linkedin",
    detail: "Connect with me here.",
  },
  {
    label: "X",
    href: "https://x.com/the__csy20",
    icon: "x",
    detail: "Random thoughts and stuff I'm working on.",
  },
  {
    label: "Email",
    href: "mailto:chitreshy20@gmail.com",
    icon: "email",
    detail: "Best way to reach me directly.",
  },
];

export const resumeUrl =
  "https://drive.google.com/uc?export=download&id=1vApe158f-0X5fXjQX5DuUNLJzdGFIiCK";
