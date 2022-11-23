import { Router } from "express";
import {
  createFlight,
  //   getFlights,
  //   updateFlight,
  //   deleteFlight,
  //   getFlightById,
} from "../controllers/flights.controllers";

const router = Router();

router.post("/flights", createFlight);

export default router;
