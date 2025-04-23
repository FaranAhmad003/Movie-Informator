import { useEffect, useState } from "react";

export default function GenresPage() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => setGenres(data.genres));
  }, []);

  return (
    <div
      style={{
        padding: "2rem",
        fontFamily: "Segoe UI, sans-serif",
        color: "black",
      }}>
      <h1>🎭 Browse Genres</h1>
      {genres.length === 0 ? (
        <p>Loading genres...</p>
      ) : (
        <ul>
          {genres.map((genre) => (
            <li key={genre.id} style={{ margin: "10px 0" }}>
              <strong>{genre.name}</strong>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
