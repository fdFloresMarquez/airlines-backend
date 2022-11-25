import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Airline } from "../entities/Airline";
import { Airport } from "../entities/Airport";
import { Flight } from "../entities/Flight";
import { FlightRelations } from "../types";
import { addPropertiesToFlight } from "../utils";

export const createFlight = async (req: Request, res: Response) => {
  try {
    const { origin_airport, destination_airport } = req.body;

    const airline = await AppDataSource.getRepository(Airline).findOne({
      where: { iata_code: req.body.airline },
    });

    const origin = await AppDataSource.getRepository(Airport).findOne({
      where: { iata_code: origin_airport },
    });

    const destination = await AppDataSource.getRepository(Airport).findOne({
      where: { iata_code: destination_airport },
    });

    if (airline && origin && destination) {
      const newFlight = new Flight();

      const relations: FlightRelations = { airline, origin, destination };

      const flight = addPropertiesToFlight(newFlight, relations, req.body);

      await AppDataSource.manager.save(flight);

      return res.json(flight);
    } else {
      throw new Error("Airline or Airports do not exist!");
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getFlights = async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find({
      relations: {
        airline: true,
        origin_airport: true,
        destination_airport: true,
      },
    });

    return res.json(flights);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateFlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { airline, origin_airport, destination_airport } = req.body;

    /**  Checks if the user tries to change Airline or Origin.
     *   Only the destination of a Flight should be updated.
     */
    if (airline || origin_airport) {
      return res.status(403).json({
        message: "Cannot change Airline or origin_airport values",
      });
    }

    const flight = await Flight.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!flight)
      return res.status(404).json({ message: "Flight does not exist" });

    const destination = await AppDataSource.getRepository(Airport).findOne({
      where: { iata_code: destination_airport },
    });

    req.body.destination_airport = destination;

    await Flight.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteFlight = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const flight = await Flight.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!flight)
      return res.status(404).json({ message: "Flight does not exist" });

    await Flight.delete({ id: parseInt(id) });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getFlightById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const flight = await Flight.find({
      where: { id: parseInt(id) },
      relations: {
        airline: true,
        origin_airport: true,
        destination_airport: true,
      },
    });

    if (flight.length < 1)
      return res.status(404).json({ message: "Flight does not exist" });

    return res.json(flight);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
