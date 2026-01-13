import { Router } from "express";
import { NewFilm } from "../types";
// On importe les validateurs (Type Guards)
import { isNewFilm, isupdateFilm } from "../utils/type-guards"; // Assure-toi du nom dans type-guards.ts
// On importe le Service (Le Cuisinier)
import {
  createOneFilm,
  deleteOneFilm,
  readAllFilms,
  readOneFilm,
  updateOneFilm,
} from "../services/films";

const router = Router();

// GET /films
router.get("/", (req, res) => {
  // On passe juste les paramètres au service, il se débrouille !
  const titleStart = req.query["title-start"] as string;
  const orderBy = req.query["order-by"] as string;

  const films = readAllFilms(titleStart, orderBy);
  return res.json(films);
});

// GET /films/:id
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const film = readOneFilm(id);

  if (!film) {
    return res.status(404).json({ message: "Film not found" });
  }
  return res.json(film);
});

// POST /films
router.post("/", (req, res) => {
  const body: unknown = req.body;

  if (!isNewFilm(body)) {
    return res.sendStatus(400);
  }

  const newFilm = createOneFilm(body as NewFilm);
  return res.status(201).json(newFilm);
});

// DELETE /films/:id
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const deletedFilm = deleteOneFilm(id);

  if (!deletedFilm) {
    return res.status(404).json({ message: "Film not found" });
  }
  return res.sendStatus(204);
});

// PUT /films/:id (Remplacement total)
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;

  // PUT exige que TOUT soit présent, donc on utilise isNewFilm
  if (!isNewFilm(body)) {
    return res.sendStatus(400);
  }

  // On appelle la fonction d'update avec toutes les données
  const updatedFilm = updateOneFilm(id, body as NewFilm);

  if (!updatedFilm) {
    return res.status(404).json({ message: "Film not found" });
  }
  return res.json(updatedFilm);
});

// PATCH /films/:id (Mise à jour partielle)
router.patch("/:id", (req, res) => {
  const id = Number(req.params.id);
  const body: unknown = req.body;

  // PATCH accepte des bouts de données, on utilise le validateur partiel
  if (!isupdateFilm(body)) { // (C'est ton isupdateFilm)
    return res.sendStatus(400);
  }

  const updatedFilm = updateOneFilm(id, body);

  if (!updatedFilm) {
    return res.status(404).json({ message: "Film not found" });
  }
  return res.json(updatedFilm);
});

export default router;