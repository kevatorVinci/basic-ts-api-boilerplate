
interface Film{
  id: number;
  title: string;
  director: string;
  duration: number;
  budget?: number;
  description?: string;
  imageUrl?: string;
}

interface Livre{
  id:string;
  content:string;
  level:string;
}
type NewLivre=Omit<Livre,"id">;



// On crée un type pour la création (tout pareil, sauf l'id)
type NewFilm = Omit<Film, "id">;


export type {Film,NewFilm,Livre,NewLivre};
