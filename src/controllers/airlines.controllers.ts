import { Request, Response } from "express";
import { AppDataSource } from "../db";
import { Airline } from "../entities/Airline";
import { addPropertiesToAirline } from "../utils";

export const createAirline = async (req: Request, res: Response) => {
  try {
    const findAirline = await Airline.findBy({ iata_code: req.body.iata_code });

    if (findAirline.length < 1) {
      const newAirline = new Airline();

      const airline = addPropertiesToAirline(newAirline, req.body)

      const airlineRepository = AppDataSource.getRepository(Airline);
      await airlineRepository.save(airline);

      return res.json(airline);
    } else {
      return res.status(403).json({ message: "Airline alredy exist" });
    }
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAirlines = async (req: Request, res: Response) => {
  try {
    const airlines = await Airline.find({
      relations: {
        flights: true,
      },
    });

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
      return res.status(404).json({ message: "Airline does not exist" });

    await Airline.update({ id: parseInt(id) }, req.body);

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const deleteAirline = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const airlineEntity = await Airline.findOneBy({
      id: parseInt(req.params.id),
    });

    if (!airlineEntity)
      return res.status(404).json({ message: "Airline does not exist" });

    await Airline.delete({ id: parseInt(id) });

    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const getAirlineById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const airlineEntity = await Airline.findOne({
      where: {
        id: parseInt(id),
      },
      relations: {
        flights: true,
      },
    });

    if (!airlineEntity)
      return res.status(404).json({ message: "Airline does not exist" });

    return res.json(airlineEntity);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
