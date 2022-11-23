import { Request, Response } from "express";
import { Airport } from "../entities/Airport";

export const createAirport = async (req: Request, res: Response) => {
  try {
    const {
      iata_code,
      airport,
      city,
      state,
      country,
      latitude,
      longitude,
    } = req.body;
    const airportEntity = new Airport();

    // String Values
    airportEntity.iata_code = iata_code;
    airportEntity.airport = airport;
    airportEntity.city = city;
    airportEntity.state = state;
    airportEntity.country = country;
    airportEntity.departures_flights = [];
    airportEntity.arrival_flights = [];

    // Numeric values
    airportEntity.latitude = parseFloat(latitude);
    airportEntity.longitude = parseFloat(longitude);

    await airportEntity.save();

    return res.json(airportEntity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAirports = async (req: Request, res: Response) => {
  try {
    const airports = await Airport.find();

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
    const airport = await Airport.findOneBy({
      id: parseInt(req.params.id),
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
