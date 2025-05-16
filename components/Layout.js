import ThemeToggle from "./ThemeToggle";

export default function Layout({ children }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--background)",
        color: "var(--text)",
      }}>
      <header
        style={{
          padding: "1rem 2rem",
          backgroundColor: "var(--header-bg)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 4px var(--card-shadow)",
        }}>
        <h1 style={{ margin: 0 }}>🎬 Movie Explorer</h1>
        <ThemeToggle />
      </header>
      <main style={{ padding: "2rem" }}>{children}</main>
    </div>
  );
}
