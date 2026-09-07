import { config } from "../config";

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
  logo?: string;
  spotlight?: string;
  releaseNote?: string;
};

export type PortraitId = "twitter";

export type Portrait = {
  id: PortraitId;
  src: string;
  label: string;
  alt: string;
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
    | "python"
    | "docker";
  category: "frontend" | "backend" | "mobile" | "platform";
};

export type SocialIcon =
  | "github"
  | "linkedin"
  | "x"
  | "email"
  | "youtube"
  | "instagram";

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
  heroDescription:
    "Everything here is real work — APIs that actually run, animations that don't stutter, and apps that got finished instead of staying half-built.",
};

export const portraits: Record<PortraitId, Portrait> = {
  twitter: {
    id: "twitter",
    src: "/portrait-twitter.jpg",
    label: "X",
    alt: "Illustrated portrait of Chitresh Yadav",
  },
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
  {
    name: "Docker",
    icon: "docker",
    category: "platform",
  },
];

export const projects: Project[] = [
  {
    title: "Nen",
    eyebrow: "Published on Play Store",
    description:
      "Offline music player for the files already on your phone. Local playback only — no streaming, no ads, no account. ExoPlayer decode, lock-screen controls, and a now-playing meter from the track envelope.",
    tags: ["Flutter", "Dart", "ExoPlayer", "Play Store"],
    featured: true,
    logo: "/nen-logo.png",
    spotlight: "Live on Google Play",
    releaseNote:
      "Public on Play, MIT licensed. The listing is live — not early access.",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=dev.csy20.nen",
        tone: "mint",
      },
      {
        label: "GitHub",
        href: "https://github.com/csy20/nen",
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
    logo: "/bytewise-logo.png",
    spotlight: "Live on Google Play",
    releaseNote:
      "This one matters because people can install it. That forced release signing, store guidelines, and a proper listing.",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.csy20.bytewise",
        tone: "mint",
      },
    ],
  },
  {
    title: "Speech Relay",
    eyebrow: "Realtime speech",
    description:
      "Streaming speech-to-speech translation over WebRTC: ASR → MT → TTS with Silero VAD, fan-out, ONNX, and an eval harness.",
    tags: ["Python", "WebRTC", "Whisper", "ONNX", "ASR"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/speech-relay",
        tone: "clay",
      },
    ],
  },
  {
    title: "Speech Relay Rust",
    eyebrow: "Indic ASR",
    description:
      "Fine-tuned Hindi–English code-mixed Whisper (LoRA) with a Rust ONNX inference runtime.",
    tags: ["Python", "Rust", "Whisper", "LoRA", "ONNX"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/speech-relay-rust",
        tone: "clay",
      },
    ],
  },
  {
    title: "MediaPipe AI",
    eyebrow: "AI pipeline",
    description:
      "Distributed media pipeline: Whisper transcription and BART summarization behind a Redis queue, React UI, Express, PostgreSQL, MinIO — all on Docker Compose.",
    tags: ["React", "Express", "Python", "PostgreSQL", "Docker"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/mediapipe-ai",
        tone: "clay",
      },
    ],
  },
  {
    title: "02 OS",
    eyebrow: "Custom distro",
    description:
      "A custom Arch Linux ISO with its own branding, installer profile, and live image pipeline.",
    tags: ["Arch", "Shell", "ISO", "Linux"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/02_OS",
        tone: "clay",
      },
    ],
  },
  {
    title: "Warrant",
    eyebrow: "MCP agent",
    description:
      "TrueForge change-control agent: real MCP tools, sandboxed analysis, and human approval before irreversible production changes.",
    tags: ["MCP", "Hackathon", "Agents"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/warrant",
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
    label: "X (the__csy20)",
    href: "https://x.com/the__csy20",
    icon: "x",
    detail: "Random thoughts and stuff I'm working on.",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@chitresh-y3q",
    icon: "youtube",
    detail: "Videos and other stuff I'm posting.",
  },
  {
    label: "Instagram (csy20)",
    href: "https://www.instagram.com/the__csy20/",
    icon: "instagram",
    detail: "Personal feed and updates.",
  },
  {
    label: "Email",
    href: `mailto:${config.email}`,
    icon: "email",
    detail: "Best way to reach me directly.",
  },
];

export const resumeUrl = config.resumeUrl;
