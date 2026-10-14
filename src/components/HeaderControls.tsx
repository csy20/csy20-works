import { socialLinks } from "../data/siteContent";
import { useTheme } from "./useTheme";
import { Icon } from "./ui/Icon";
import { MoonIcon, SunIcon } from "./ui/ThemeIcons";

export function HeaderControls() {
  const { theme, toggleTheme } = useTheme();
  const github = socialLinks.find((link) => link.icon === "github");
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <div className="header-controls" role="group" aria-label="Quick controls">
      {github && (
        <a
          className="header-control"
          href={github.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile (opens in a new tab)"
        >
          <Icon name="github" size={20} />
          <span className="header-tooltip" aria-hidden="true">
            GitHub
          </span>
        </a>
      )}
      <button
        className="header-control"
        type="button"
        aria-label={`Switch to ${nextTheme} theme`}
        onClick={toggleTheme}
      >
        {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        <span className="header-tooltip" aria-hidden="true">
          {theme === "dark" ? "Light theme" : "Dark theme"}
        </span>
      </button>
    </div>
  );
}
