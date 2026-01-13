import path from "node:path";
import { Film, NewFilm } from "../types";
import { parse, serialize } from "../utils/json";

const jsonDbPath = path.join(__dirname, "/../data/films.json");

const defaultFilms: Film[] = [
  {
    id: 1,
    title: "Inception",
    director: "Christopher Nolan",
    duration: 148,
    budget: 160,
    description: "A thief who steals corporate secrets...",
    imageUrl: "https://example.com/inception.jpg",
  },
  {
    id: 2,
    title: "The Matrix",
    director: "Lana Wachowski, Lilly Wachowski",
    duration: 136,
    budget: 63,
  },
  {
    id: 3,
    title: "Interstellar",
    director: "Christopher Nolan",
    duration: 169,
    imageUrl: "https://example.com/interstellar.jpg",
  },
];

// 🔍 LIRE TOUT (avec Filtres et Tri)
function readAllFilms(titleStart?: string, orderBy?: string): Film[] {
  let films = parse(jsonDbPath, defaultFilms);

  // Filtrage
  if (titleStart) {
    films = films.filter((film) =>
      film.title.toLowerCase().startsWith(titleStart.toLowerCase())
    );
  }

  // Tri
  if (orderBy) {
    films.sort((a, b) => {
      if (orderBy === "title") return a.title.localeCompare(b.title);
      if (orderBy === "duration") return a.duration - b.duration;
      return 0;
    });
  }

  return films;
}

// 🔍 LIRE UN SEUL
function readOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  return films.find((film) => film.id === id);
}

// ➕ CRÉER
function createOneFilm(newFilm: NewFilm): Film {
  const films = parse(jsonDbPath, defaultFilms);

  const nextId =
    films.reduce((maxId, film) => (film.id > maxId ? film.id : maxId), 0) + 1;

  const createdFilm: Film = {
    id: nextId,
    ...newFilm,
  };

  films.push(createdFilm);
  serialize(jsonDbPath, films);

  return createdFilm;
}

// 🗑️ SUPPRIMER
function deleteOneFilm(id: number): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);

  if (index === -1) return undefined;

  const deletedElements = films.splice(index, 1);
  serialize(jsonDbPath, films);

  return deletedElements[0];
}

// ✏️ METTRE À JOUR (Utilisé pour PUT et PATCH)
function updateOneFilm(id: number, updatedFields: Partial<NewFilm>): Film | undefined {
  const films = parse(jsonDbPath, defaultFilms);
  const index = films.findIndex((film) => film.id === id);

  if (index === -1) return undefined;

  // On fusionne l'existant avec les nouvelles données
  const updatedFilm = { ...films[index], ...updatedFields };

  films[index] = updatedFilm;
  serialize(jsonDbPath, films);

  return updatedFilm;
}

export {
  readAllFilms,
  readOneFilm,
  createOneFilm,
  deleteOneFilm,
  updateOneFilm,
};