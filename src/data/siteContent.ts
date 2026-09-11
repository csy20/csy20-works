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
    | "docker"
    | "rust";
  category: "languages" | "backend" | "ml" | "platform";
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
  handle: "csy20",
  role: "Backend · Applied ML",
  strapline: "Python · Rust · TypeScript",
  heroDescription:
    "Backend services and applied ML — streaming ASR → MT → TTS over WebRTC, code-mixed Whisper on ONNX, and queue-based media workers.",
  availability: "Seeking SDE-1 / Backend / Applied ML roles.",
};

export const proof = [
  {
    label: "Speech",
    value: "23.6%",
    detail:
      "Silero-VAD cut end-to-end ASR → MT → TTS latency. 2505 ms mean / 2580 ms p50.",
  },
  {
    label: "ASR",
    value: "LoRA",
    detail:
      "Fine-tuned Whisper for Hindi–English code-mix, then ONNX int8 in a Rust runtime.",
  },
  {
    label: "Shipped",
    value: "Play",
    detail:
      "Bytewise is live on Google Play — 788+ DSA / system-design lessons, offline-first.",
  },
] as const;

export const portraits: Record<PortraitId, Portrait> = {
  twitter: {
    id: "twitter",
    src: "/portrait-twitter.jpg",
    label: "X",
    alt: "Illustrated portrait of Chitresh Yadav",
  },
};

export const techStack: StackItem[] = [
  { name: "Python", icon: "python", category: "languages" },
  { name: "Rust", icon: "rust", category: "languages" },
  { name: "TypeScript", icon: "typescript", category: "languages" },
  { name: "SQL", icon: "javascript", category: "languages" },
  { name: "Dart", icon: "dart", category: "languages" },
  { name: "FastAPI", icon: "python", category: "backend" },
  { name: "Express.js", icon: "express", category: "backend" },
  { name: "WebRTC", icon: "javascript", category: "backend" },
  { name: "Redis", icon: "mongodb", category: "backend" },
  { name: "PostgreSQL", icon: "mongodb", category: "backend" },
  { name: "Whisper", icon: "python", category: "ml" },
  { name: "LoRA / PEFT", icon: "python", category: "ml" },
  { name: "ONNX Runtime", icon: "python", category: "ml" },
  { name: "IndicTrans2", icon: "python", category: "ml" },
  { name: "Docker", icon: "docker", category: "platform" },
  { name: "GitHub Actions", icon: "docker", category: "platform" },
  { name: "GCP", icon: "firebase", category: "platform" },
  { name: "Linux", icon: "ubuntu", category: "platform" },
];

export const projects: Project[] = [
  {
    title: "Speech Relay",
    eyebrow: "Realtime speech-to-speech",
    description:
      "Streaming ASR → MT → TTS over WebRTC (EN→HI). Instrumented 2505 ms mean / 2580 ms p50 end-to-end, then cut latency 23.6% with Silero-VAD. One shared ASR stream fans out to N listeners (1.56× at 2). ONNX fp16/int8 for ASR/TTS plus a WER/CER eval harness.",
    tags: [
      "Python",
      "faster-whisper",
      "IndicTrans2",
      "WebRTC",
      "ONNX",
      "asyncio",
    ],
    featured: true,
    spotlight: "2505 ms mean E2E",
    releaseNote:
      "Silero-VAD replaced fixed-window flushing. Quantized models ran up to 11.25% faster.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/speech-relay",
        tone: "clay",
      },
    ],
  },
  {
    title: "Bytewise",
    eyebrow: "Learning app",
    description:
      "Production Flutter app on Google Play: 788+ DSA / system-design lessons with an offline-first in-memory + SQLite cache (Riverpod, Drift).",
    tags: ["Flutter", "Dart", "Riverpod", "Drift / SQLite", "Play Store"],
    featured: true,
    logo: "/bytewise-logo.png",
    spotlight: "Live on Google Play",
    releaseNote:
      "Shipping proof — store listing, release signing, and a real installable app, not a demo.",
    links: [
      {
        label: "Play Store",
        href: "https://play.google.com/store/apps/details?id=com.csy20.bytewise",
        tone: "mint",
      },
    ],
  },
  {
    title: "Speech Relay Rust",
    eyebrow: "Code-mixed ASR + ONNX serving",
    description:
      "Data pipeline over MUCS Hindi–English speech (16 kHz, Devanagari + Latin filter, train/val/test). Fine-tuned Whisper with LoRA on decoder attention so it handles mid-utterance language switches. Serving path: merge LoRA, export encoder/decoder to ONNX, int8 quantize, infer from a Rust ort service outside Python.",
    tags: ["Python", "Whisper", "LoRA / PEFT", "ONNX", "Rust"],
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
    eyebrow: "Distributed media pipeline",
    description:
      "Five-container system: React client → Express REST gateway → Redis job queue → Python workers (Whisper transcription + BART summarization) → PostgreSQL metadata + MinIO. Async job polling and S3-compatible uploads up to 500 MB so workers scale independently of the API.",
    tags: [
      "Express",
      "Python",
      "Redis",
      "PostgreSQL",
      "MinIO",
      "Docker Compose",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/mediapipe-ai",
        tone: "clay",
      },
    ],
  },
  {
    title: "Router Agent",
    eyebrow: "Token-efficient LLM router",
    description:
      "AMD Developer Hackathon ACT II: classifies tasks (math, NER, summarization, code, QA) with zero-token heuristics, then escalates to a local 1.5B LLM or at most one paid API call. OpenTelemetry traces into SigNoz; shipped as a Docker service with schema validation.",
    tags: ["Python", "Ollama", "OpenTelemetry", "Docker", "Hackathon"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/csy20/router-agent",
        tone: "clay",
      },
    ],
  },
  {
    title: "Nen",
    eyebrow: "Published on Play Store",
    description:
      "Offline music player for the files already on your phone. Local playback only — no streaming, no ads, no account. ExoPlayer decode, lock-screen controls, and a now-playing meter from the track envelope.",
    tags: ["Flutter", "Dart", "ExoPlayer", "Play Store"],
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
    detail: "Notes and work in public.",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@chitresh-y3q",
    icon: "youtube",
    detail: "Talks and recordings.",
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

export const colophon = "Instrument Serif · Space Grotesk · 2026";
