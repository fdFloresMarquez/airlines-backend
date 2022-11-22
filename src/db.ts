import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();
const dbPassword = process.env.DB_PASSWORD

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  username: "postgres",
  password: dbPassword,
  port: 5432,
  database: "airlinesdb",
  entities: [],
  logging: true,
});
