import * as fs from "fs";
import * as path from "path";
import * as csvParser from "fast-csv";

import { AppDataSource } from "../db";
import { Airline, Airport, Flight } from "../entities";
import {
  DataAirline,
  DataAirport,
  DataFlight,
  FlightRelations,
} from "../types";
import {
  addPropertiesToAirline,
  addPropertiesToAirport,
  addPropertiesToFlight,
} from "../utils";

const airlinesCsvName = "airlines.csv";
const airportsCsvName = "airports.csv";
const flightsCsvName = "flights.csv";

const seedAirlines = async (): Promise<void> => {
  try {
    await AppDataSource.createQueryBuilder().delete().from(Airline).execute();

    fs.createReadStream(path.resolve(__dirname, "assets", airlinesCsvName))
      .pipe(
        csvParser.parse({
          headers: (headers) => headers.map((h) => h?.toLowerCase()),
        })
      )
      .on("data", async (data: DataAirline) => {
        const newAirline = new Airline();
        const airline = addPropertiesToAirline(newAirline, data);

        const airlineRepository = AppDataSource.getRepository(Airline);
        await airlineRepository.save(airline);
      })
      .on("end", (rowCount: number) =>
        console.log(`${rowCount} Airlines Seeded`)
      );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const seedAirports = async (): Promise<void> => {
  try {
    await AppDataSource.createQueryBuilder().delete().from(Airport).execute();

    fs.createReadStream(path.resolve(__dirname, "assets", airportsCsvName))
      .pipe(
        csvParser.parse({
          headers: (headers) => headers.map((h) => h?.toLowerCase()),
        })
      )
      .on("data", async (data: DataAirport) => {
        const newAirport = new Airport();
        const isCsv = true;
        const airport = addPropertiesToAirport(newAirport, data, isCsv);

        const airportRepository = AppDataSource.getRepository(Airport);
        await airportRepository.save(airport);
      })
      .on("end", (rowCount: number) =>
        console.log(`${rowCount} Airports Seeded`)
      );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const seedFlights = async (): Promise<void> => {
  try {
    await AppDataSource.createQueryBuilder().delete().from(Flight).execute();

    fs.createReadStream(path.resolve(__dirname, "assets", flightsCsvName))
      .pipe(
        csvParser.parse({
          headers: (headers) => headers.map((h) => h?.toLowerCase()),
          maxRows: 150,
        })
      )
      .on("data", async (data: DataFlight) => {
        const airline = await AppDataSource.getRepository(Airline).findOne({
          where: { iata_code: data.airline },
        });

        const origin = await AppDataSource.getRepository(Airport).findOne({
          where: { iata_code: data.origin_airport },
        });

        const destination = await AppDataSource.getRepository(Airport).findOne({
          where: { iata_code: data.destination_airport },
        });

        if (airline && origin && destination) {
          const newFlight = new Flight();

          const relations: FlightRelations = { airline, origin, destination };

          const isCsv = true;

          const flight = addPropertiesToFlight(
            newFlight,
            relations,
            data,
            isCsv
          );

          const flightRepository = AppDataSource.getRepository(Flight);
          await flightRepository.save(flight);
        }
      })
      .on("end", async (rowCount: number) => {
        console.log(`${rowCount} Flights Seeded`);

        //Shut down database connection
        await AppDataSource.destroy();
        console.log("Database disconnected");
      });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const seedDb = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    if (error instanceof Error)
      console.error("Error during Data Source initialization", error);
  }

  await seedAirlines();
  await seedAirports();
  await seedFlights();
};

seedDb();
