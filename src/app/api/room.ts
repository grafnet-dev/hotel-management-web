
import type { NextApiRequest, NextApiResponse } from "next";
import { methodCall } from "../services/api";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Exemple : récupérer les room types
      const result = await methodCall("hotel.room.type", "api_get_room_types", []);
      return res.status(200).json(result);
    }

    return res.status(405).json({ success: false, message: "Méthode non autorisée" });
  } catch (error: unknown) {
    console.error("❌ API rooms error:", error);
    return res.status(500).json({ success: false, message: error instanceof Error ? error.message : "Erreur serveur" });
  }
}