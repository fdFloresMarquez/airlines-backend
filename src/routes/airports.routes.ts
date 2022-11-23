import { Router } from "express";
import {
  createAirport,
  getAirports,
  updateAirport,
  deleteAirport,
  getAirportById,
} from "../controllers/airports.controllers";

const router = Router();

router.post("/airports", createAirport);

router.get("/airports", getAirports);

router.put("/airports/:id", updateAirport);

router.delete("/airports/:id", deleteAirport);

router.get("/airports/:id", getAirportById);

export default router;
