import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Airline } from "./entities/Airline";
import { Airport } from "./entities/Airport";
import { Flight } from "./entities/Flight";

dotenv.config();
const dbPassword = process.env.DB_PASSWORD;

// Create database with respective
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: dbPassword,
  port: 5432,
  database: "airlinesdb",
  entities: [Airline, Airport, Flight],
  logging: true,
  synchronize: true,
});
