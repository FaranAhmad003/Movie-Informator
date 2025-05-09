import data from "../../../public/data.json";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;
    const movie = data.movies.find((m) => m.id === id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

  
    const genre = data.genres.find((g) => g.id === movie.genreId);
    const director = data.directors.find((d) => d.id === movie.directorId);

    const movieDetails = {
      ...movie,
      genreName: genre?.name || "Unknown",
      directorName: director?.name || "Unknown",
      director: director || null, 
      genre: genre || null, 
    };

    return res.status(200).json(movieDetails);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
