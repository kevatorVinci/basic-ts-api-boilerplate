import express from "express";

import usersRouter from "./routes/users";
import pizzaRouter from "./routes/pizzas";
import drinkRouter from "./routes/drinks";

const app = express();

app.use((_req, _res, next) => {
    console.log(
      "Time:",
      new Date().toLocaleString("fr-FR", { timeZone: "Europe/Brussels" })
    );
    next();
  });



app.use(express.json());
app.use(express.urlencoded({ extended: false }));



app.use("/users", usersRouter);
app.use("/pizzas", pizzaRouter);
app.use("/drinks", drinkRouter);


  
app.use("/drinks",drinkRouter);


  
export default app;
