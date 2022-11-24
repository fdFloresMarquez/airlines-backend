import { Router } from "express";
import {
  createFlight,
    getFlights,
    updateFlight,
    deleteFlight,
    getFlightById,
} from "../controllers/flights.controllers";

const router = Router();

router.post("/flights", createFlight);

router.get("/flights", getFlights);

router.put("/flights/:id", updateFlight);

router.delete("/flights/:id", deleteFlight);

router.get("/flights/:id", getFlightById);

export default router;
