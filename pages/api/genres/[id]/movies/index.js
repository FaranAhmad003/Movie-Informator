import data from "../../../../../public/data.json";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    // First check if the genre exists
    const genre = data.genres.find((g) => g.id === id);
    if (!genre) {
      return res.status(404).json({ message: "Genre not found" });
    }

    // Find all movies that belong to this genre
    const movies = data.movies
      .filter((movie) => movie.genreId === id)
      .map((movie) => {
        const director = data.directors.find((d) => d.id === movie.directorId);
        return {
          ...movie,
          directorName: director?.name || "Unknown",
        };
      });

    return res.status(200).json({
      genre: genre,
      movies: movies,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
