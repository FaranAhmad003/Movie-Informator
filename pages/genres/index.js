import Link from "next/link";

export default function GenresPage({ genres }) {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>🎭 Browse Genres</h1>

      <div style={gridStyle}>
        {genres.map((genre) => (
          <Link key={genre.id} href={`/genres/${genre.id}`} style={cardStyle}>
            <strong style={genreText}>{genre.name}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    // Fetch genres from the API endpoint
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/genres`
    );
    const genres = await response.json();

    return {
      props: {
        genres: genres || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching genres:", error);
    return {
      props: {
        genres: [],
      },
      revalidate: 10,
    };
  }
}

const containerStyle = {
  minHeight: "100vh",
  padding: "4rem 2rem",
  fontFamily: "'Segoe UI', sans-serif",
  backgroundColor: "#f9f9f9",
  color: "#222",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

const headingStyle = {
  fontSize: "2.5rem",
  marginBottom: "2rem",
  textAlign: "center",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
  gap: "1.5rem",
  width: "100%",
  maxWidth: "600px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "1rem",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textAlign: "center",
  textDecoration: "none",
  color: "black",
  transition: "transform 0.2s",
};

const genreText = {
  fontSize: "1.2rem",
};
