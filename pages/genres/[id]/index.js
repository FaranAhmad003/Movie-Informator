import Link from "next/link";

export default function GenreMoviesPage({ genre, movies }) {
  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>🎭 {genre.name} Movies</h1>

      <div style={gridStyle}>
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`} style={cardStyle}>
            <h3 style={movieTitleStyle}>{movie.title}</h3>
            <p style={movieYearStyle}>{movie.releaseYear}</p>
            <p style={movieDirectorStyle}>Director: {movie.directorName}</p>
            <p style={movieRatingStyle}>⭐ {movie.rating}</p>
          </Link>
        ))}
      </div>

      <Link href="/genres" style={backButtonStyle}>
        ← Back to Genres
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}/api/genres`
    );
    const genres = await response.json();

    const paths = genres.map((genre) => ({
      params: { id: genre.id },
    }));

    return {
      paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.error("Error generating paths:", error);
    return {
      paths: [],
      fallback: "blocking",
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/genres/${params.id}/movies`
    );
    const data = await response.json();

    if (!data.genre) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        genre: data.genre,
        movies: data.movies || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching genre movies:", error);
    return {
      notFound: true,
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
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "1.5rem",
  width: "100%",
  maxWidth: "1200px",
};

const cardStyle = {
  backgroundColor: "white",
  padding: "1.5rem",
  borderRadius: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  textDecoration: "none",
  color: "black",
  transition: "transform 0.2s",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const movieTitleStyle = {
  fontSize: "1.4rem",
  margin: "0",
  color: "#1a1a1a",
};

const movieYearStyle = {
  fontSize: "1rem",
  color: "#666",
  margin: "0",
};

const movieDirectorStyle = {
  fontSize: "1rem",
  color: "#444",
  margin: "0",
};

const movieRatingStyle = {
  fontSize: "1.1rem",
  color: "#f39c12",
  margin: "0",
  marginTop: "0.5rem",
};

const backButtonStyle = {
  marginTop: "2rem",
  padding: "0.8rem 1.5rem",
  backgroundColor: "#333",
  color: "white",
  textDecoration: "none",
  borderRadius: "5px",
  transition: "background-color 0.2s",
};
