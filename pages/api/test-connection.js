import { query } from "../../lib/db";

export default async function handler(req, res) {
  try {
    // Try to execute a simple query
    const result = await query("SELECT 1 as test");
    res.status(200).json({
      message: "Database connection successful",
      result: result,
    });
  } catch (error) {
    console.error("Database connection error:", error);
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
}
