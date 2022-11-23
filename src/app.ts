import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { airlinesRoutes, airportsRoutes, flightsRoutes } from "./routes/";

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.use(airlinesRoutes);
app.use(airportsRoutes);
app.use(flightsRoutes);

export default app;
