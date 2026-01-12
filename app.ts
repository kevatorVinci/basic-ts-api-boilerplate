import express, { ErrorRequestHandler } from "express";


import filmRouter from "./routes/films";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// --- 1. L'objet de stockage ---
const stats: Record<string, number> = {};

// --- 2. Le Middleware Intelligent ---
app.use((req, _res, next) => {
    // On crée une clé unique (ex: "GET /films" ou "POST /films")
    const currentKey = `${req.method} ${req.path}`;

    // Si la clé n'existe pas encore, on l'initialise à 0
    if (!stats[currentKey]) {
        stats[currentKey] = 0;
    }

    // On incrémente
    stats[currentKey]++;

    // On affiche tout le rapport
    console.log("Request counter :");
    for (const key in stats) {
        console.log(`- ${key} : ${stats[key]}`);
    }

    next();
});

app.use("/films", filmRouter);

// 3. Définir le gestionnaire d'erreurs (TOUT À LA FIN, juste avant l'export)
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err.stack);
  return res.status(500).send("Something broke!");
};

app.use(errorHandler);

export default app;
