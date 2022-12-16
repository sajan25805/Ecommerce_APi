import express from "express";
import erroHandler from "./middlewares/errorHandler.js";
import eRoutes from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", eRoutes);

app.use(erroHandler);

export default app;
