interface Pizza {
  id: number;
  title: string;
  content: string;
}

interface PizzaToUpdate {
  title?: string;
  content?: string;
}

interface Drink {
  id: number;
  title: string;
  image: string;
  volume: number;
  price: number;
}

interface film {
  id: number;
  title: string;
  direcror: string;
  duration:number;
  budget:number;
  description:String;
  imageUrl:String;

}




type NewPizza = Omit<Pizza, "id">;

export type { Pizza, NewPizza, PizzaToUpdate, Drink };
