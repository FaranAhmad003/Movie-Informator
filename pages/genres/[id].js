import Link from "next/link";
import MovieCard from "../../components/MovieCard";
import styles from "../../styles/Home.module.css";

export default function GenreDetail({ genre, movies }) {
  if (!genre) {
    return <p style={{ padding: "2rem", color: "red" }}>Genre not found.</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎬 {genre.name} Movies</h1>

      {movies.length === 0 ? (
        <p>No movies found in this genre.</p>
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
                genre={genre.name}
                director="Click to see"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export async function getStaticPaths() {
  const data = await import("../../public/data.json");

  const paths = data.genres.map((genre) => ({
    params: { id: genre.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const data = await import("../../public/data.json");
  const genre = data.genres.find((g) => g.id === params.id);

  if (!genre) return { notFound: true };

  const filteredMovies = data.movies
    .filter((movie) => movie.genreId === genre.id)
    .map((movie) => {
      const director = data.directors.find((d) => d.id === movie.directorId);
      return { ...movie, directorName: director?.name || "Unknown" };
    });

  return {
    props: {
      genre,
      movies: filteredMovies,
    },
    revalidate: 10,
  };
}
