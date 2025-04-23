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
  if (!movie) {
    return { notFound: true };
  }

  const director = data.directors.find((d) => d.id === movie.directorId);

  return {
    props: {
      director: director || null,
      movieTitle: movie.title,
      movieId: movie.id,
    },
  };
}

export default function DirectorInfo({ director, movieTitle, movieId }) {
  if (!director) return <p>Director info not found.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Director of "{movieTitle}"</h1>
      <p className={styles.detail}>
        <span className={styles.label}>Name:</span> {director.name}
      </p>
      <p className={styles.detail}>
        <span className={styles.label}>Bio:</span> {director.bio || "N/A"}
      </p>

      
    </div>
  );
}
