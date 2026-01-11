import { Film } from "../types";
import { Router } from "express";

const router = Router();

const films: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
    imageUrl: "https://example.com/inception.jpg"
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63
    // Note : description et imageUrl sont absents ici, c'est autorisé car optionnels !
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    imageUrl: "https://example.com/interstellar.jpg"
  }
];

router.get("/", (_req, res) => {
  return res.json(films);
});

export default router;

