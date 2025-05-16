import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "none",
        backgroundColor: isDarkMode ? "#4a5568" : "#e2e8f0",
        color: isDarkMode ? "#fff" : "#000",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        transition: "all 0.2s ease-in-out",
      }}>
      <span>{isDarkMode ? "🌞 Light" : "🌙 Dark"}</span>
    </button>
  );
}
