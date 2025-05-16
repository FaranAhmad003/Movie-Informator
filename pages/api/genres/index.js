import data from "../../../public/data.json";

export default function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    return res.status(200).json(data.genres);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}
