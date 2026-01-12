/**
 * This file contains type guards for typescript
 * @param value
 * @returns
 */

// import { NewPizza } from "../types";
import { NewFilm } from "../types";

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

// /**
//  * Check if the body is a new pizza
//  * @param body
//  * @returns boolean
//  */
// const isNewPizza = (body: unknown): body is NewPizza => {
//   if (
//     !body ||
//     typeof body !== "object" ||
//     !("title" in body) ||
//     !("content" in body) ||
//     body.title !== "string" ||
//     body.content !== "string" ||
//     !body.title.trim() ||
//     !body.content.trim()
//   ) {
//     return false;
//   }

//   return true;
// };

// Cette fonction a un retour spécial : "body is NewFilm"
// C'est une promesse qu'on fait au compilateur TS.
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

export { isString, isNumber, isNewFilm };
