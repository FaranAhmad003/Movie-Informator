import data from "../../../public/data.json";
import styles from "../../../styles/MovieDetail.module.css";
import Link from "next/link";

export async function getStaticPaths() {
  const paths = data.movies.map((movie) => ({
    params: { id: movie.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const movie = data.movies.find((m) => m.id === params.id);
  const genre = data.genres.find((g) => g.id === movie.genreId);
  const director = data.directors.find((d) => d.id === movie.directorId);

  return {
    props: {
      movie,
      genreName: genre?.name || "Unknown",
      directorName: director?.name || "Unknown",
    },
  };
}

export default function MovieDetail({ movie, genreName, directorName }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        {movie.title} ({movie.releaseYear})
      </h1>
      <p className={styles.detail}>
        <span className={styles.label}>Description:</span> {movie.description}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Genre:</span> {genreName}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Director:</span>{" "}
        <Link href={`/movies/${movie.id}/director`}>{directorName}</Link>
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Rating:</span> ⭐ {movie.rating}
      </p>

      <Link href="/" className={styles.backButton}>
        ← Back to Home
      </Link>
    </div>
  );
}
