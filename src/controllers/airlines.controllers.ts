import { Request, Response } from "express";
import { Airline } from "../entities/Airline";

export const createAirline = async (req: Request, res: Response) => {
  try {
    const { iata_code, airline } = req.body;
    const airlineEntity = new Airline();

    airlineEntity.iata_code = iata_code;
    airlineEntity.airline = airline;

    await airlineEntity.save();

    return res.json(airlineEntity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAirlines = async (req: Request, res: Response) => {
  try {
    const airlines = await Airline.find();

    return res.json(airlines);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const updateAirline = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const airlineEntity = await Airline.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!airlineEntity)
      return res.status(404).json({ message: "User does not exist" });

    await Airline.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
