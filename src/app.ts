import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import airlinesRoutes from './routes/airlines.routes'

const app: Express = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json())

app.use(airlinesRoutes)

export default app;
