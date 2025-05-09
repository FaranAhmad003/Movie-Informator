import data from "../../../../public/data.json";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { id } = req.query;

    // Find the director
    const director = data.directors.find((d) => d.id === id);
    if (!director) {
      return res.status(404).json({ message: "Director not found" });
    }

    // Find all movies directed by this director
    const movies = data.movies
      .filter((movie) => movie.directorId === id)
      .map((movie) => {
        const genre = data.genres.find((g) => g.id === movie.genreId);
        return {
          ...movie,
          genreName: genre?.name || "Unknown",
        };
      });

    return res.status(200).json({
      director: director,
      movies: movies,
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
