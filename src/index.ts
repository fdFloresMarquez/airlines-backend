import "reflect-metadata";
import app from "./app";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { AppDataSource } from "./db";

dotenv.config();
const port = process.env.PORT;

// initialize whole app
async function main() {
  //initialize connection with database
  try {
    await AppDataSource.initialize();
    console.log("Database Connected");
    app.get("/", (req: Request, res: Response) => {
      res.send("Express + TypeScript Server");
    });

    app.listen(port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${port}`
      );
    });
  } catch (error) {
    console.error(error);
  }
}

main();
