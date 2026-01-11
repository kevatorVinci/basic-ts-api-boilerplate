import express, { ErrorRequestHandler } from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import drinkRouter from "./routes/drinks"; // 1. Importer le router
import filmRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinkRouter); // 2. Activer la route /drinks
app.use("/films", filmRouter);

// 3. Définir le gestionnaire d'erreurs (TOUT À LA FIN, juste avant l'export)
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};

app.use(errorHandler);

export default app;
