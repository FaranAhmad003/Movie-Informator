import mysql from "mysql2/promise";

if (!process.env.MYSQL_HOST) {
  throw new Error(
    "Please define the MYSQL_HOST environment variable inside .env.local"
  );
}

if (!process.env.MYSQL_USER) {
  throw new Error(
    "Please define the MYSQL_USER environment variable inside .env.local"
  );
}

if (!process.env.MYSQL_PASSWORD) {
  throw new Error(
    "Please define the MYSQL_PASSWORD environment variable inside .env.local"
  );
}

if (!process.env.MYSQL_DATABASE) {
  throw new Error(
    "Please define the MYSQL_DATABASE environment variable inside .env.local"
  );
}

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql, params) {
  try {
    const [results] = await pool.execute(sql, params);
    return results;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
}

export async function initializeDatabase() {
  try {
    // Check if data already exists
    const moviesCount = await query("SELECT COUNT(*) as count FROM movies");
    if (moviesCount[0].count === 0) {
      const data = require("../public/data.json");

      // Insert genres
      if (data.genres && data.genres.length > 0) {
        const genreValues = data.genres.map((genre) => [genre.id, genre.name]);
        await query("INSERT INTO genres (id, name) VALUES ?", [genreValues]);
      }

      // Insert directors
      if (data.directors && data.directors.length > 0) {
        const directorValues = data.directors.map((director) => [
          director.id,
          director.name,
          director.biography,
        ]);
        await query("INSERT INTO directors (id, name, biography) VALUES ?", [
          directorValues,
        ]);
      }


      if (data.movies && data.movies.length > 0) {
        const movieValues = data.movies.map((movie) => [
          movie.id,
          movie.title,
          movie.directorId,
          movie.description,
          movie.releaseYear,
          movie.genreId,
          movie.rating,
        ]);
        await query(
          "INSERT INTO movies (id, title, directorId, description, releaseYear, genreId, rating) VALUES ?",
          [movieValues]
        );
      }
    }
  } catch (error) {
    console.error("Database initialization error:", error);
    throw error;
  }
}
