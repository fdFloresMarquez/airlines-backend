import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Airline } from "../entities/Airline";
import { Flight } from "../entities/Flight";

export const createFlight = async (req: Request, res: Response) => {
  try {
    const {
      year,
      month,
      day,
      day_of_week,
      flight_number,
      tail_number,
      origin_airport,
      destination_airport,
      scheduled_departure,
    } = req.body;
    const flight = new Flight();

    const airline = await Airline.findOneBy({ iata_code: req.body.airline });

    if(airline){
      // flight.airline = airline;
      flight.tail_number = tail_number;
      // flight.origin_airport = origin_airport;
      // flight.destination_airport = destination_airport;
  
      // Number values
      flight.year = parseInt(year);
      flight.month = parseInt(month);
      flight.day = parseInt(day);
      flight.day_of_week = parseInt(day_of_week);
      flight.flight_number = parseInt(flight_number);
      flight.scheduled_departure = parseInt(scheduled_departure);
  
      await AppDataSource.manager.save(flight);

      airline.flights = [flight]
      await AppDataSource.manager.save(airline);
  
      return res.json(airline);
    } else {
      throw new Error('Airline does not exist!')
    }

  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
