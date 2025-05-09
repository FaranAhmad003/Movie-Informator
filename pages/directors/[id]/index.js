import Link from "next/link";

export default function DirectorDetailPage({ director, movies }) {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.heading}>🎬 {director.name}</h1>
        <p style={styles.bio}>{director.biography}</p>
      </div>

      <div style={styles.moviesSection}>
        <h2 style={styles.subheading}>Directed Movies</h2>
        <div style={styles.grid}>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              style={styles.card}>
              <h3 style={styles.movieTitle}>{movie.title}</h3>
              <p style={styles.movieYear}>{movie.releaseYear}</p>
              <p style={styles.movieGenre}>Genre: {movie.genreName}</p>
              <p style={styles.movieRating}>⭐ {movie.rating}</p>
            </Link>
          ))}
        </div>
      </div>

      <Link href="/directors" style={styles.backButton}>
        ← Back to Directors
      </Link>
    </div>
  );
}

export async function getStaticPaths() {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
      }/api/directors`
    );
    const directors = await response.json();

    const paths = directors.map((director) => ({
      params: { id: director.id },
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
      }/api/directors/${params.id}`
    );
    const data = await response.json();

    if (!data.director) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        director: data.director,
        movies: data.movies || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching director details:", error);
    return {
      notFound: true,
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  header: {
    maxWidth: "800px",
    textAlign: "center",
    marginBottom: "3rem",
  },
  heading: {
    fontSize: "2.5rem",
    marginBottom: "1rem",
    color: "#000",
  },
  bio: {
    fontSize: "1.1rem",
    color: "#666",
    lineHeight: "1.6",
  },
  moviesSection: {
    width: "100%",
    maxWidth: "1200px",
  },
  subheading: {
    fontSize: "1.8rem",
    marginBottom: "1.5rem",
    color: "#000",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textDecoration: "none",
    color: "#000",
    transition: "transform 0.2s",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  movieTitle: {
    fontSize: "1.3rem",
    margin: "0",
    color: "#000",
  },
  movieYear: {
    fontSize: "1rem",
    color: "#666",
    margin: "0",
  },
  movieGenre: {
    fontSize: "1rem",
    color: "#444",
    margin: "0",
  },
  movieRating: {
    fontSize: "1.1rem",
    color: "#f39c12",
    margin: "0",
    marginTop: "0.5rem",
  },
  backButton: {
    marginTop: "2rem",
    padding: "0.8rem 1.5rem",
    backgroundColor: "#333",
    color: "white",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.2s",
  },
};
