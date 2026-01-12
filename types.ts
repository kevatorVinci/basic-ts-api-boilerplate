
interface Film{
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
}


// On crée un type pour la création (tout pareil, sauf l'id)
type NewFilm = Omit<Film, "id">;


export type {Film,NewFilm};
