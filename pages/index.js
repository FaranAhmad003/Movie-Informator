import Link from "next/link";
import MovieCard from "../components/MovieCard";
import styles from "../styles/Home.module.css";

export default function Home({ movies, genres, directors }) {
  const getGenreName = (id) =>
    genres.find((g) => g.id === id)?.name || "Unknown Genre";

  const getDirectorName = (id) =>
    directors.find((d) => d.id === id)?.name || "Unknown Director";

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎥 Movie Explorer</h1>

      <button
        className={styles.browseButton}
        onClick={() => (window.location.href = "/genres")}>
        Browse Genres
      </button>
      <button
        className={styles.browseButton}
        onClick={() => (window.location.href = "/directors")}>
        Directors
      </button>

      {!movies ? (
        <p className={styles.loading}>Loading movies...</p>
      ) : (
        <div className={styles.grid}>
          {movies.map((movie) => (
            <Link
              key={movie.id}
              href={`/movies/${movie.id}`}
              style={{ textDecoration: "none", color: "inherit" }}>
              <MovieCard
                title={movie.title}
                description={movie.description}
                year={movie.releaseYear}
                rating={movie.rating}
                genre={getGenreName(movie.genreId)}
                director={getDirectorName(movie.directorId)}
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticProps() {
  const data = await import("../public/data.json"); 

  return {
    props: {
      movies: data.movies,
      genres: data.genres,
      directors: data.directors,
    },
    revalidate: 10,
  };
}
