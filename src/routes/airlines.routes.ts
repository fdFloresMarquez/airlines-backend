import { Router } from "express";
import {
  createAirline,
  getAirlines,
  updateAirline,
  deleteAirline,
  getAirlineById,
} from "../controllers/airlines.controllers";

const router = Router();

router.post("/airlines", createAirline);

router.get("/airlines", getAirlines);

router.put("/airlines/:id", updateAirline);

router.delete("/airlines/:id", deleteAirline);

router.get("/airlines/:id", getAirlineById);

export default router;
