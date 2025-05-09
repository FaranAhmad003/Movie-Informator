import Link from "next/link";

export default function HelpHome() {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "4rem 2rem",
        backgroundColor: "#f9f9f9",
        fontFamily: "'Segoe UI', sans-serif",
        color: "#222",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Help Center</h1>
      <p style={{ marginBottom: "2rem", fontSize: "1.2rem" }}>
        How can we assist you today?
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "1.5rem",
          width: "100%",
          maxWidth: "800px",
        }}>
        <Link href="/help/faqs" style={cardStyle}>
          <div>
            <h2 style={cardTitle}>FAQs →</h2>
            <p style={cardText}>Find answers to common questions.</p>
          </div>
        </Link>

        <Link href="/help/contact" style={cardStyle}>
          <div>
            <h2 style={cardTitle}>Contact Us →</h2>
            <p style={cardText}>Reach out to our support team.</p>
          </div>
        </Link>

        <Link href="/help/privacy" style={cardStyle}>
          <div>
            <h2 style={cardTitle}>Privacy Policy →</h2>
            <p style={cardText}>Understand how we protect your data.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
const cardStyle = {
  display: "block",
  padding: "1.5rem",
  backgroundColor: "white",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textDecoration: "none",
  color: "inherit",
  transition: "transform 0.2s, box-shadow 0.2s",
};

const cardTitle = {
  fontSize: "1.5rem",
  marginBottom: "0.5rem",
};

const cardText = {
  fontSize: "1rem",
  color: "#666",
};

const cardHover = `
  a:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  }
`;

if (typeof window !== "undefined") {
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(cardHover, styleSheet.cssRules.length);
}
