import Link from "next/link";

export default function DirectorsPage({ directors }) {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Directors & Their Movies</h1>

      <div style={styles.grid}>
        {directors.map((director) => (
          <div key={director.id} style={styles.card}>
            <h2 style={styles.name}>{director.name}</h2>
            <p style={styles.bio}>{director.biography}</p>
            <Link
              href={`/directors/${director.id}`}
              style={styles.viewMoreLink}>
              View Movies →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/directors`
    );
    const directors = await response.json();

    return {
      props: {
        directors: directors || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching directors:", error);
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
    backgroundColor: "#f9f9f9",
    color: "#000",
  },
  heading: {
    fontSize: "2.5rem",
    textAlign: "center",
    marginBottom: "2rem",
    color: "#000",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    color: "#000",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  name: {
    fontSize: "1.5rem",
    margin: "0",
    color: "#000",
  },
  bio: {
    fontSize: "1rem",
    color: "#666",
    margin: "0",
    flexGrow: 1,
  },
  viewMoreLink: {
    color: "#0070f3",
    textDecoration: "none",
    fontSize: "1rem",
    fontWeight: "500",
    alignSelf: "flex-start",
    transition: "color 0.2s",
  },
};
