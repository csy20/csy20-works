import { useTheme } from './useTheme'

type ThemeToggleProps = {
  compact?: boolean
}

export function ThemeToggle({ compact = false }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const nextTheme = theme === 'dark' ? 'light' : 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${nextTheme} theme`}
      className={
        compact
          ? 'dock-icon-button flex h-10 w-10 flex-none items-center justify-center rounded-full'
          : 'button-shell button-secondary inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium'
      }
    >
      <span className="button-icon">{theme === 'dark' ? <SunIcon /> : <MoonIcon />}</span>
      {!compact ? (
        <span className="hidden sm:inline">{theme === 'dark' ? 'Light theme' : 'Dark theme'}</span>
      ) : null}
    </button>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M12 3v1.75M12 19.25V21M21 12h-1.75M4.75 12H3M18.364 5.636l-1.238 1.238M6.874 17.126l-1.238 1.238M18.364 18.364l-1.238-1.238M6.874 6.874 5.636 5.636M15.25 12a3.25 3.25 0 1 1-6.5 0 3.25 3.25 0 0 1 6.5 0Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
      <path
        d="M20.25 15.25A8.5 8.5 0 0 1 8.75 3.75a8.5 8.5 0 1 0 11.5 11.5Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
