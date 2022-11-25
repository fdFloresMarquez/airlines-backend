import { AppDataSource } from "../db";
import { Airline, Airport, Flight } from "../entities";
import { DataAirline, DataAirport, DataFlight } from "../types";

import * as fs from "fs";
import * as path from "path";
import * as csvParser from "fast-csv";

// TODO: Refactor all seeds

const seedAirlines = async (): Promise<void> => {
  try {
    await AppDataSource.createQueryBuilder().delete().from(Airline).execute();

    await fs
      .createReadStream(path.resolve(__dirname, "assets", "airlines.csv"))
      .pipe(
        csvParser.parse({
          headers: (headers) => headers.map((h) => h?.toLowerCase()),
        })
      )
      .on("data", async (data: DataAirline) => {
        const airline = new Airline();
        airline.iata_code = data.iata_code;
        airline.airline = data.airline;
        await airline.save();
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

    await fs
      .createReadStream(path.resolve(__dirname, "assets", "airports.csv"))
      .pipe(
        csvParser.parse({
          headers: (headers) => headers.map((h) => h?.toLowerCase()),
        })
      )
      .on("data", async (data: DataAirport) => {
        const airport = new Airport();
        airport.iata_code = data.iata_code;
        airport.airport = data.airport;
        airport.city = data.city;
        airport.state = data.state;
        airport.country = data.country;
        airport.latitude = parseFloat(data.latitude);
        airport.longitude = parseFloat(data.longitude);
        await airport.save();
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

    await fs
      .createReadStream(path.resolve(__dirname, "assets", "flights.csv"))
      .pipe(
        csvParser.parse({
          headers: (headers) => headers.map((h) => h?.toLowerCase()),
          maxRows: 150,
        })
      )
      .on("data", async (data: DataFlight) => {
        const flight = new Flight();

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
          //Entities
          flight.airline = airline;
          flight.origin_airport = origin;
          flight.destination_airport = destination;

          // Primitive Values
          flight.tail_number = data.tail_number;
          flight.year = parseInt(data.year) || 0;
          flight.month = parseInt(data.month) || 0;
          flight.day = parseInt(data.day) || 0;
          flight.day_of_week = parseInt(data.day_of_week) || 0;
          flight.flight_number = parseInt(data.flight_number) || 0;
          flight.scheduled_departure = parseInt(data.scheduled_departure) || 0;
          flight.departure_time = parseInt(data.departure_time) || 0;
          flight.departure_delay = parseInt(data.departure_delay) || 0;
          flight.taxi_out = parseInt(data.taxi_out) || 0;
          flight.wheels_off = parseInt(data.wheels_off) || 0;
          flight.scheduled_time = parseInt(data.scheduled_time) || 0;
          flight.elapsed_time = parseInt(data.elapsed_time) || 0;
          flight.air_time = parseInt(data.air_time) || 0;
          flight.distance = parseInt(data.distance) || 0;
          flight.wheels_on = parseInt(data.wheels_on) || 0;
          flight.taxi_in = parseInt(data.taxi_in) || 0;
          flight.scheduled_arrival = parseInt(data.scheduled_arrival) || 0;
          flight.arrival_time = parseInt(data.arrival_time) || 0;
          flight.arrival_delay = parseInt(data.arrival_delay) || 0;
          flight.diverted = parseInt(data.diverted) || 0;
          flight.cancelled = parseInt(data.cancelled) || 0;
          flight.cancellation_reason = parseInt(data.cancellation_reason) || 0;
          flight.air_system_delay = parseInt(data.air_system_delay) || 0;
          flight.security_delay = parseInt(data.security_delay) || 0;
          flight.airline_delay = parseInt(data.airline_delay) || 0;
          flight.late_aircraft_delay = parseInt(data.late_aircraft_delay) || 0;
          flight.weather_delay = parseInt(data.weather_delay) || 0;
        }

        await flight.save();
      })
      .on("end", (rowCount: number) =>
        console.log(`${rowCount} Flights Seeded`)
      );
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

const seedDb = async () => {
  await AppDataSource.initialize();
  console.log("Database Connected");

  await seedAirlines();
  await seedAirports();
  await seedFlights();
};

seedDb();
