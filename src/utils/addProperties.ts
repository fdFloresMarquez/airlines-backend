import { Airline, Airport, Flight } from "../entities";
import {
  DataAirline,
  FlightRelations,
} from "../types";

export const addPropertiesToAirline = (
  airline: Airline,
  data: DataAirline
): Airline => {
  airline.iata_code = data.iata_code;
  airline.airline = data.airline;

  return airline;
};

export const addPropertiesToAirport = (
  airport: Airport,
  data: any,
  isCsv: boolean = false
): Airport => {
  // String Values
  airport.iata_code = data.iata_code;
  airport.airport = data.airport;
  airport.city = data.city;
  airport.state = data.state;
  airport.country = data.country;

  //numericValues
  if (isCsv) {
    airport.latitude = parseFloat(data.latitude);
    airport.longitude = parseFloat(data.longitude);
    return airport;
  }
  airport.latitude = data.latitude;
  airport.longitude = data.longitude;

  return airport;
};

export const addPropertiesToFlight = (
  flight: Flight,
  relations: FlightRelations,
  data: any,
  isCsv: boolean = false
): Flight => {
  //Entities
  flight.airline = relations.airline;
  flight.origin_airport = relations.origin;
  flight.destination_airport = relations.destination;

  // String values
  flight.tail_number = data.tail_number;

  // Numeric Values
  if (isCsv) {
    const newFlight = addNumericValuesFromStrings(flight, data);
    return newFlight;
  }

  const newFlight = addNumericValues(flight, data);

  return newFlight;
};

const addNumericValues = (flight: Flight, data: any) => {
  flight.year = data.year;
  flight.month = data.month;
  flight.day = data.day;
  flight.day_of_week = data.day_of_week;
  flight.flight_number = data.flight_number;
  flight.scheduled_departure = data.scheduled_departure;
  flight.departure_time = data.departure_time;
  flight.departure_delay = data.departure_delay;
  flight.taxi_out = data.taxi_out;
  flight.wheels_off = data.wheels_off;
  flight.scheduled_time = data.scheduled_time;
  flight.elapsed_time = data.elapsed_time;
  flight.air_time = data.air_time;
  flight.distance = data.distance;
  flight.wheels_on = data.wheels_on;
  flight.taxi_in = data.taxi_in;
  flight.scheduled_arrival = data.scheduled_arrival;
  flight.arrival_time = data.arrival_time;
  flight.arrival_delay = data.arrival_delay;
  flight.diverted = data.diverted;
  flight.cancelled = data.cancelled;
  flight.cancellation_reason = data.cancellation_reason;
  flight.air_system_delay = data.air_system_delay;
  flight.security_delay = data.security_delay;
  flight.airline_delay = data.airline_delay;
  flight.late_aircraft_delay = data.late_aircraft_delay;
  flight.weather_delay = data.weather_delay;

  return flight;
};

const addNumericValuesFromStrings = (flight: Flight, data: any) => {
  flight.year = parseInt(data.year) || 0;
  flight.month = parseInt(data.month) || 0;
  flight.day = parseInt(data.day) || 0;
  flight.day_of_week = parseInt(data.day_of_week) || 0;
  flight.flight_number = parseInt(data.flight_number) || 0;
  flight.scheduled_departure = parseInt(data.scheduled_departure) || 0;
  flight.departure_time = parseInt(data.departure_time) || 0;
  flight.departure_delay = parseInt(data.departure_delay) || 0;
  flight.taxi_out = parseInt(data.taxi_out) || 0;
  flight.wheels_off = parseInt(data.wheels_off) || 0;
  flight.scheduled_time = parseInt(data.scheduled_time) || 0;
  flight.elapsed_time = parseInt(data.elapsed_time) || 0;
  flight.air_time = parseInt(data.air_time) || 0;
  flight.distance = parseInt(data.distance) || 0;
  flight.wheels_on = parseInt(data.wheels_on) || 0;
  flight.taxi_in = parseInt(data.taxi_in) || 0;
  flight.scheduled_arrival = parseInt(data.scheduled_arrival) || 0;
  flight.arrival_time = parseInt(data.arrival_time) || 0;
  flight.arrival_delay = parseInt(data.arrival_delay) || 0;
  flight.diverted = parseInt(data.diverted) || 0;
  flight.cancelled = parseInt(data.cancelled) || 0;
  flight.cancellation_reason = parseInt(data.cancellation_reason) || 0;
  flight.air_system_delay = parseInt(data.air_system_delay) || 0;
  flight.security_delay = parseInt(data.security_delay) || 0;
  flight.airline_delay = parseInt(data.airline_delay) || 0;
  flight.late_aircraft_delay = parseInt(data.late_aircraft_delay) || 0;
  flight.weather_delay = parseInt(data.weather_delay) || 0;

  return flight;
};
