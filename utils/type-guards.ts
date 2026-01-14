/**
 * This file contains type guards for typescript
 * @param value
 * @returns
 */

// import { NewPizza } from "../types";
import { NewFilm,NewLivre } from "../types";

/**
 * Check if the value is a string and inform typescript of this
 * @param value
 * @returns
 */
const isString = (value: unknown): value is string => {
  return typeof value === "string" || value instanceof String;
};

/* Check if the value is a number and inform typescript of this */
const isNumber = (value: unknown): value is number => {
  return typeof value === "number" && isFinite(value);
};


const isNewFilm = (body: unknown): body is NewFilm => {
  if (
    !body ||
    typeof body !== "object" ||
    !("title" in body) ||
    !("director" in body) ||
    !("duration" in body) ||
    typeof (body as any).title !== "string" ||
    typeof (body as any).director !== "string" ||
    typeof (body as any).duration !== "number" ||
    !(body as any).title.trim() ||
    !(body as any).director.trim() ||
    (body as any).duration <= 0
  ) {
    return false;
  }
  return true;
};

const isupdateFilm = (body: unknown): body is Partial<NewFilm> => {
  // 1. Vérif de base : body doit être un objet
  if (!body || typeof body !== "object") {
    return false;
  }

  // 2. Vérif du TITRE (s'il est là)
  if ("title" in body) {
    // Si ce n'est pas une string OU si c'est vide
    if (typeof (body as any).title !== "string" || !(body as any).title.trim()) {
      return false;
    }
  }

  // 3. Vérif du RÉALISATEUR (s'il est là)
  if ("director" in body) {
    if (typeof (body as any).director !== "string" || !(body as any).director.trim()) {
      return false;
    }
  }

  // 4. Vérif de la DURÉE (si elle est là)
  if ("duration" in body) {
    // Si ce n'est pas un nombre OU si c'est négatif/zéro
    if (typeof (body as any).duration !== "number" || (body as any).duration <= 0) {
      return false;
    }
  }

  // 5. Vérif du BUDGET (si il est là)
  if ("budget" in body) {
    if (typeof (body as any).budget !== "number" || (body as any).budget < 0) {
      return false;
    }
  }

  return true;
};
const acceptedLevels = ["easy", "medium", "hard"];

const isNewLivre = (body: unknown): body is NewLivre => {
  if (
    !body ||
    typeof body !== "object" ||
    !("content" in body) ||
    !("level" in body) ||
    typeof (body as any).content !== "string" ||
    typeof (body as any).level !== "string" ||
    !(body as any).content.trim() ||
    !(body as any).level.trim() ||
    // 👇 NOUVEAU CHECK ICI 👇
    !acceptedLevels.includes((body as any).level)
  ) {
    return false;
  }
  return true;
};

const isUpdateLivre = (body: unknown): body is Partial<NewLivre> => {
  if (!body || typeof body !== "object") {
    return false;
  }

  if ("content" in body) {
    // ⚠️ ATTENTION : J'ai ajouté le '!' devant trim() !
    if (
      typeof (body as any).content !== "string" ||
      !(body as any).content.trim()
    ) {
      return false;
    }
  }

  if ("level" in body) {
    // ⚠️ ATTENTION : J'ai ajouté le '!' devant trim() !
    if (
      typeof (body as any).level !== "string" ||
      !(body as any).level.trim() ||
      // 👇 NOUVEAU CHECK ICI 👇
      !acceptedLevels.includes((body as any).level)
    ) {
      return false;
    }
  }

  return true;
};

export { isString, isNumber, isNewFilm, isupdateFilm,isNewLivre,isUpdateLivre };
