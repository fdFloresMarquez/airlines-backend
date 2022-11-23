import { Router } from "express";
import {
  createAirline,
  getAirlines,
  updateAirline,
} from "../controllers/airlines.controllers";

const router = Router();

router.post("/airlines", createAirline);

router.get("/airlines", getAirlines);

router.put("/airlines/:id", updateAirline);

export default router;
