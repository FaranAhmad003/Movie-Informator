import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MovieCard from "../components/MovieCard";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  const [data, setData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const getGenreName = (id) =>
    data?.genres.find((g) => g.id === id)?.name || "Unknown Genre";

  const getDirectorName = (id) =>
    data?.directors.find((d) => d.id === id)?.name || "Unknown Director";

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>🎥 Movie Explorer</h1>

      <button
        className={styles.browseButton}
        onClick={() => router.push("/genres")}>
        Browse Genres
      </button>

      {!data ? (
        <p className={styles.loading}>Loading movies...</p>
      ) : (
        <div className={styles.grid}>
          {data.movies.map((movie) => (
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
