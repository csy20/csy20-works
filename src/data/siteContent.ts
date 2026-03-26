export type ProjectLinkTone = 'ink' | 'clay' | 'mint'

export type ProjectLink = {
  label: string
  href: string
  tone: ProjectLinkTone
}

export type Project = {
  title: string
  eyebrow: string
  description: string
  tags: string[]
  links: ProjectLink[]
  featured?: boolean
  spotlight?: string
  releaseNote?: string
}

export type StackItem = {
  name: string
  detail: string
}

export type SocialIcon = 'github' | 'linkedin' | 'x' | 'email'

export type SocialLink = {
  label: string
  href: string
  icon: SocialIcon
  detail: string
}

export const profile = {
  name: 'Chitresh Yadav',
  handle: '~csy',
  role: 'Flutter developer crafting polished mobile products',
  strapline: 'Flutter • Dart • Firebase',
  heroTitle: 'Building mobile products that feel calm, fast, and finished.',
  heroSummary:
    'I build production-ready Flutter apps with a strong bias for UX polish, performance, and maintainable delivery.',
  heroDescription:
    'This new csy20.works keeps the story from the older portfolio, but rebuilds it as a lean static front-end with a clearer visual voice and sharper project presentation.',
  aboutPrimary:
    'I am a Flutter developer who obsesses over smooth animations, maintainable state management, and interfaces that feel native on every device.',
  aboutSecondary:
    'My sweet spot is taking rough product ideas, shaping them into coherent UI systems, and shipping experiences that feel reliable under real usage rather than only inside demos.',
}

export const heroHighlights = [
  {
    label: 'Primary stack',
    value: 'Flutter + Dart',
  },
  {
    label: 'Shipping focus',
    value: 'Play Store-ready apps',
  },
  {
    label: 'Current edge',
    value: 'PWA + AI-assisted workflows',
  },
] as const

export const workflow = [
  'Design-system driven UI with a sharp eye for spacing, hierarchy, and motion.',
  'State management experience across Riverpod, Provider, and BLoC.',
  'A build process that values strong typing, automation, and stable delivery.',
]

export const currentInterests = [
  'Background isolates and Flutter performance tuning.',
  'Reusable clean architecture for faster feature delivery.',
  'Web and PWA experiences that complement native mobile builds.',
]

export const techStack: StackItem[] = [
  {
    name: 'Flutter',
    detail: 'Cross-platform product delivery with polished interaction work.',
  },
  {
    name: 'Dart',
    detail: 'Typed app architecture, async-heavy flows, and maintainable features.',
  },
  {
    name: 'Firebase',
    detail: 'Auth, storage, analytics, and fast product iteration loops.',
  },
  {
    name: 'MongoDB',
    detail: 'Flexible data modelling for practical backend integrations.',
  },
  {
    name: 'GitHub',
    detail: 'Versioned workflows, learning repos, and clean iteration history.',
  },
  {
    name: 'Ubuntu',
    detail: 'My day-to-day build environment for coding, tooling, and deployment.',
  },
]

export const projects: Project[] = [
  {
    title: 'Jobjaldi',
    eyebrow: 'Job discovery platform',
    description:
      'A job discovery platform built for modern job seekers with streamlined browsing, filtering, and application flow.',
    tags: ['Flutter', 'Dart', 'Job Board'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/csy20/jobjaldi',
        tone: 'clay',
      },
    ],
  },
  {
    title: 'Bytewise',
    eyebrow: 'Play Store release',
    description:
      'A Flutter app shipped to the Google Play Store with a user-facing product surface and production-style release flow.',
    tags: ['Flutter', 'Dart', 'Android', 'Play Store'],
    featured: true,
    spotlight: 'Live on Google Play',
    releaseNote:
      'This is the clearest proof that the work is not just a concept screen. It shipped as a public app with release discipline, store readiness, and a real delivery bar.',
    links: [
      {
        label: 'Play Store',
        href: 'https://play.google.com/store/apps/details?id=com.csy20.bytewise',
        tone: 'mint',
      },
    ],
  },
  {
    title: 'News App',
    eyebrow: 'Realtime content experience',
    description:
      'A news experience built on top of a live API with category filters and a fast-scanning content layout.',
    tags: ['Flutter', 'API Integration', 'Realtime'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/csy20/day21',
        tone: 'clay',
      },
    ],
  },
  {
    title: 'Weather App',
    eyebrow: 'Location-aware utility',
    description:
      'A forecast app with live location data, timely weather feedback, and a clean Material-inspired interface.',
    tags: ['Flutter', 'Weather API', 'Location'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/csy20/proj23',
        tone: 'clay',
      },
    ],
  },
  {
    title: 'GitHub View',
    eyebrow: 'Developer tooling UI',
    description:
      'A GitHub profile lookup tool for quickly inspecting user stats, repositories, and activity from a single screen.',
    tags: ['Flutter', 'GitHub API', 'User Profiles'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/csy20/proj23',
        tone: 'clay',
      },
    ],
  },
]

export const socialLinks: SocialLink[] = [
  {
    label: 'GitHub',
    href: 'https://github.com/csy20',
    icon: 'github',
    detail: 'Open source work and learning repos.',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/csy20/',
    icon: 'linkedin',
    detail: 'Career profile and collaboration touchpoint.',
  },
  {
    label: 'X',
    href: 'https://x.com/the__csy20',
    icon: 'x',
    detail: 'Thoughts, experiments, and public build notes.',
  },
  {
    label: 'Email',
    href: 'mailto:chitreshy20@gmail.com',
    icon: 'email',
    detail: 'Best route for project inquiries and direct contact.',
  },
]

export const resumeUrl =
  'https://drive.google.com/file/d/1PK4MIdvpAt95H9aLlDd684GszWYS0i1l/view?usp=sharing'
