import styles from '../styles/MovieCard.module.css';

export default function MovieCard({ title, description, year, rating, genre, director }) {
  return (
    <div className={styles.card}>
      <h2>{title} <span className={styles.year}>({year})</span></h2>
      <p><strong>🎬 Genre:</strong> {genre}</p>
      <p><strong>🎞️ Director:</strong> {director}</p>
      <p>{description}</p>
      <p><strong>⭐ Rating:</strong> {rating}</p>
    </div>
  );
}
