import path from "node:path";
import { Livre,NewLivre}from "../types";
import { serialize,parse } from "../utils/json";
import { v4 as uuidv4 } from 'uuid'; //

const livredDB=path.join(__dirname,"../data/livres.json");

const defaultLivres:Livre[]= [
  {
    "id": "e838979d-9538-4444-9372-9e96e9f5e123",
    "content": "Hello world!",
    "level": "easy"
  },
  {
    "id": "a1902834-0298-4390-9123-012938491023",
    "content": "TypeScript est un sur-ensemble typé de JavaScript.",
    "level": "medium"
  },
  {
    "id": "f9812309-1234-5678-9012-345678901234",
    "content": "L'asynchronisme en Node.js permet de gérer de nombreuses requêtes simultanément sans bloquer le thread principal.",
    "level": "hard"
  }
];

export function getAllLivre(level?:string) : Livre[]{
    let filmListe=parse(livredDB,defaultLivres);

    if(level){
        filmListe=filmListe.filter((film)=>film.level ===level)

        
    }

return filmListe;
}
export function getIDLivre(id:string):Livre | undefined{
    const livreListe=parse(livredDB,defaultLivres);
    return livreListe.find((film)=>film.id===id);
}

export function createdLivre(film:NewLivre):Livre{
    const livreListe=parse(livredDB,defaultLivres);

    const newFilmF :Livre= {
        id: uuidv4(), 
    ...film, // content, level...
    }
    livreListe.push(newFilmF);
    serialize(livredDB,livreListe);
    return newFilmF;


}

export function deleteLivre(id: string): Livre | undefined {
  const livreListe = parse(livredDB, defaultLivres);

  // 1. On cherche l'INDEX (la position dans le tableau : 0, 1, 2...)
  // On compare l'id du livre (string) avec l'id reçu (string)
  const index = livreListe.findIndex((livre) => livre.id === id);

  // 2. Si findIndex renvoie -1, c'est que ça n'existe pas
  if (index === -1) {
    return undefined;
  }

  // 3. On sauvegarde l'objet avant de le supprimer (pour le return à la fin)
  const deletedLivre = livreListe[index];

  // 4. On utilise l'INDEX pour couper (splice veut un nombre !)
  livreListe.splice(index, 1);

  serialize(livredDB, livreListe);
  
  return deletedLivre;
}



export function updateLivre(id:string,body:Partial<NewLivre> ):Livre|undefined{
    const livreListe = parse(livredDB, defaultLivres);
    const index = livreListe.findIndex((livre) => livre.id === id);

    if (index === -1) {
        return undefined;
    }

  const  updatedLivreF={...livreListe[index],...body};

  livreListe[index]=updatedLivreF;

 serialize(livredDB, livreListe);
 return updatedLivreF;





}

