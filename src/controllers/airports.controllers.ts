import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Airport } from "../entities/Airport";
import { addPropertiesToAirport } from "../utils";

export const createAirport = async (req: Request, res: Response) => {
  try {
    const { iata_code } = req.body;

    const findAirport = await Airport.findBy({ iata_code: iata_code });

    if (findAirport.length < 1) {
      const newAirport = new Airport();

      const airport = addPropertiesToAirport(newAirport, req.body);

      const airportRepository = AppDataSource.getRepository(Airport);
      await airportRepository.save(airport);

      return res.json(airport);
    } else {
      return res.status(403).json({ message: "Airport alredy exists!" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAirports = async (req: Request, res: Response) => {
  try {
    const airports = await Airport.find({});

    return res.json(airports);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateAirport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const airport = await Airport.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!airport)
      return res.status(404).json({ message: "Airline does not exist" });

    await Airport.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteAirport = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const airport = await Airport.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!airport)
      return res.status(404).json({ message: "Airport does not exist" });

    await Airport.delete({ id: parseInt(id) });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAirportById = async (req: Request, res: Response) => {
  try {
    const airport = await Airport.findOne({
      where: {
        id: parseInt(req.params.id),
      },
      relations: {
        arrival_flights: true,
        departures_flights: true,
      },
    });

    if (!airport)
      return res.status(404).json({ message: "Airport does not exist" });

    return res.json(airport);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
