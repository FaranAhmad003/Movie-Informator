import Link from "next/link";
import data from "../../public/data.json";

export default function DirectorsPage({ directors }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Directors & Their Movies</h1>

      <div style={styles.grid}>
        {directors.map((director) => (
          <div key={director.id} style={styles.card}>
            <h2 style={styles.name}>{director.name}</h2>
            <p style={styles.bio}>{director.biography}</p>
            
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    return {
      props: {
        directors: data.directors || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error loading directors:", error);
    return {
      props: {
        directors: [],
      },
      revalidate: 10,
    };
  }
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "3rem 2rem",
    fontFamily: "'Segoe UI', sans-serif",
    backgroundColor: "var(--background)",
    color: "var(--text)",
  },
  heading: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "var(--text)",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "var(--card-bg)",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px var(--card-shadow)",
    color: "var(--text)",
  },
  name: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    color: "var(--text)",
  },
  bio: {
    fontSize: "1rem",
    color: "var(--text)",
    marginBottom: "1rem",
  },
  viewMoreLink: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    backgroundColor: "var(--header-bg)",
    color: "var(--text)",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "all 0.2s ease-in-out",
  },
};
