import { Film,NewFilm } from "../types";
import { Router } from "express";
import { isNewFilm } from "../utils/type-guards";

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

router.get("/", (req, res) => {
  // 1. ⚠️ SUPER IMPORTANT : On fait une COPIE de la liste originale.
  // On ne touche JAMAIS à la variable globale 'films' pour du filtrage temporaire.
  let result = [...films];

  // Récupérer les paramètres
  const titleStart = req.query['title-start'];
  const orderBy = req.query['order-by'];

  // 2. Étape de Filtrage (Indépendante)
  if (titleStart && typeof titleStart === 'string') {
    result = result.filter(film =>
      film.title.toLowerCase().startsWith(titleStart.toLowerCase())
    );
  }

  // 3. Étape de Tri (Indépendante et après le filtrage)
  if (orderBy && typeof orderBy === 'string') {
    result.sort((a, b) => {
      if (orderBy === 'title') return a.title.localeCompare(b.title);
      if (orderBy === 'duration') return a.duration - b.duration;
      return 0;
    });
  }

  // 4. On renvoie le RÉSULTAT (la copie modifiée), pas l'original
  return res.json(result);
});

router.get("/:id", (req, res) => {
  const filmId = parseInt(req.params.id);
  const film = films.find(f => f.id === filmId);
  if (!film) {
    return res.status(404).json({ message: "Film not found" });
  }
  return res.json(film);
});

router.post("/", (req, res) => {
  const body: unknown = req.body;
  if (!isNewFilm(body)) {
    return res.sendStatus(400);
  }
  

 // 1. On "cast" le body maintenant qu'on sait qu'il est valide
  const { title, director, duration, budget, description, imageUrl } = body as NewFilm;

  // 2. Calcul de l'ID sécurisé (avec reduce, pas length !)
  const nextId =
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

  // 3. Création du VRAI objet Film (avec son ID)
  const newFilm: Film = {
    id: nextId,
    title,
    director,
    duration,
    budget,
    description,
    imageUrl,
  };

  // 4. Ajout à la liste et réponse
  films.push(newFilm);
  return res.status(201).json(newFilm);
});



export default router;





