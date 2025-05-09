import Link from "next/link";

const helpContent = {
  faqs: {
    title: "Frequently Asked Questions",
    content: "Here are some common questions and answers...",
  },
  contact: {
    title: "Contact Us",
    content: "Feel free to reach out to us at contact@example.com.",
  },
  privacy: {
    title: "Privacy Policy",
    content: "We respect your privacy and protect your data responsibly.",
  },
};

export default function HelpPage({ slug }) {
  if (!slug || slug.length === 0) {
    return (
      <div style={containerStyle}>
        <h1 style={mainHeading}>Help Center</h1>
        <p style={subText}>How can we assist you today?</p>
        <ul style={listStyle}>
          <li>
            <Link href="/help/faqs" style={linkStyle}>
              FAQs
            </Link>
          </li>
          <li>
            <Link href="/help/contact" style={linkStyle}>
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/help/privacy" style={linkStyle}>
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
    );
  }

  const pageKey = slug[0];
  const page = helpContent[pageKey];

  if (!page) {
    return (
      <div style={containerStyle}>
        <h1 style={errorHeading}>404 - Page Not Found</h1>
        <p style={subText}>The help topic you're looking for does not exist.</p>
        
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <h1 style={pageHeading}>{page.title}</h1>
      <p style={pageContent}>{page.content}</p>
      <Link href="/" style={backLinkStyle}>
        ← Back to Home
      </Link>
    </div>
  );
}

// 💅 Improved inline styles
const containerStyle = {
  minHeight: "100vh",
  padding: "4rem 2rem",
  backgroundColor: "#f9f9f9",
  fontFamily: "'Segoe UI', sans-serif",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  color: "#222",
};

const mainHeading = {
  fontSize: "2.5rem",
  marginBottom: "1rem",
  textAlign: "center",
};

const pageHeading = {
  fontSize: "2rem",
  marginBottom: "1rem",
  textAlign: "center",
};

const errorHeading = {
  fontSize: "2rem",
  marginBottom: "1rem",
  color: "red",
  textAlign: "center",
};

const subText = {
  fontSize: "1.2rem",
  marginBottom: "2rem",
  textAlign: "center",
};

const pageContent = {
  fontSize: "1.1rem",
  marginBottom: "2rem",
  maxWidth: "700px",
  textAlign: "center",
};

const listStyle = {
  listStyleType: "none",
  padding: 0,
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  alignItems: "center",
};

const linkStyle = {
  fontSize: "1.2rem",
  color: "blue",
  textDecoration: "underline",
  transition: "color 0.3s",
};

const backLinkStyle = {
  marginTop: "2rem",
  fontSize: "1rem",
  color: "blue",
  textDecoration: "underline",
};
