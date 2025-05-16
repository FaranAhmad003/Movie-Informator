import data from "../../../public/data.json";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Get all movies and enrich them with genre and director names
    const movies = data.movies.map((movie) => {
      const genre = data.genres.find((g) => g.id === movie.genreId);
      const director = data.directors.find((d) => d.id === movie.directorId);

      return {
        ...movie,
        genreName: genre?.name || "Unknown",
        directorName: director?.name || "Unknown",
      };
    });

    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
