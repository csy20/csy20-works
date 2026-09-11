export const config = {
  githubUsername: import.meta.env["VITE_GITHUB_USERNAME"] ?? "csy20",
  email: import.meta.env["VITE_EMAIL"] ?? "chitreshy20@gmail.com",
  resumeUrl: import.meta.env["VITE_RESUME_URL"] ?? "/csy20_resume.pdf",
  themeStorageKey: import.meta.env["VITE_THEME_STORAGE_KEY"] ?? "csy20-theme",
} as const;
