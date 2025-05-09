import useSWR from "swr";
import Link from "next/link";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DirectorsPage() {
  const { data, error } = useSWR("/data.json", fetcher);

  if (error) return <p style={styles.error}>Failed to load directors.</p>;
  if (!data) return <p style={styles.loading}>Loading directors...</p>;

  const { directors, movies } = data;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎬 Directors & Their Movies</h1>

      <div style={styles.grid}>
        {directors.map((director) => {
          const directedMovies = movies.filter(
            (movie) => movie.directorId === director.id
          );

          return (
            <div key={director.id} style={styles.card}>
              <h2 style={styles.name}>{director.name}</h2>
              <p style={styles.bio}>{director.biography}</p>
              <h3 style={styles.subheading}>🎥 Movies:</h3>
              {directedMovies.length === 0 ? (
                <p style={styles.noMovies}>No movies listed</p>
              ) : (
                <ul style={styles.movieList}>
                  {directedMovies.map((movie) => (
                    <li key={movie.id}>
                      <Link href={`/movies/${movie.id}`} style={styles.link}>
                        {movie.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
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
  error: {
    textAlign: "center",
    color: "red",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#000",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "2rem",
  },
  card: {
    backgroundColor: "#fff",
    padding: "1.5rem",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    color: "#000",
  },
  name: {
    fontSize: "1.5rem",
    marginBottom: "0.5rem",
    color: "#000",
  },
  bio: {
    fontSize: "1rem",
    color: "#000",
    marginBottom: "1rem",
  },
  subheading: {
    fontSize: "1.2rem",
    marginTop: "1rem",
    marginBottom: "0.5rem",
    color: "#000",
  },
  noMovies: {
    fontStyle: "italic",
    color: "#888",
  },
  movieList: {
    listStyle: "disc",
    paddingLeft: "1.2rem",
    color: "#000",
  },
  link: {
    color: "#000",
    textDecoration: "none",
  },
};
