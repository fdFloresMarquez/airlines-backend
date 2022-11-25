export interface DataAirline {
  iata_code: string;
  airline: string;
}

export interface DataAirport {
  iata_code: string;
  airport: string;
  city: string;
  state: string;
  country: string;
  latitude: string;
  longitude: string;
}

export interface DataFlight {
  year: string;
  month: string;
  day: string;
  day_of_week: string;
  airline: string;
  flight_number: string;
  tail_number: string;
  origin_airport: string;
  destination_airport: string;
  scheduled_departure: string;
  departure_time: string;
  departure_delay: string;
  taxi_out: string;
  wheels_off: string;
  scheduled_time: string;
  elapsed_time: string;
  air_time: string;
  distance: string;
  wheels_on: string;
  taxi_in: string;
  scheduled_arrival: string;
  arrival_time: string;
  arrival_delay: string;
  diverted: string;
  cancelled: string;
  cancellation_reason: string;
  air_system_delay: string;
  security_delay: string;
  airline_delay: string;
  late_aircraft_delay: string;
  weather_delay: string;
}
