import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
} from "typeorm";
import { Airline } from "./Airline";
import { Airport } from "./Airport";

@Entity()
export class Flight extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: number;
  @Column()
  month: number;
  @Column()
  day: number;
  @Column()
  day_of_week: number;

  @ManyToOne(() => Airline, (airline) => airline.flights, {
    onDelete: "CASCADE",
  })
  airline: Airline;

  @Column()
  flight_number: number;
  @Column()
  tail_number: string;

  @ManyToOne(() => Airport, (airport) => airport.departures_flights, {
    onDelete: "CASCADE",
  })
  origin_airport: Airport;
  @ManyToOne(() => Airport, (airport) => airport.arrival_flights, {
    onDelete: "CASCADE",
  })
  destination_airport: Airport;

  @Column()
  scheduled_departure: number;
  @Column({ nullable: true })
  departure_time: number;
  @Column({ nullable: true })
  departure_delay: number;
  @Column({ nullable: true })
  taxi_out: number;
  @Column({ nullable: true })
  wheels_off: number;
  @Column({ nullable: true })
  scheduled_time: number;
  @Column({ nullable: true })
  elapsed_time: number;
  @Column({ nullable: true })
  air_time: number;
  @Column({ nullable: true })
  distance: number;
  @Column({ nullable: true })
  wheels_on: number;
  @Column({ nullable: true })
  taxi_in: number;
  @Column({ nullable: true })
  scheduled_arrival: number;
  @Column({ nullable: true })
  arrival_time: number;
  @Column({ nullable: true })
  arrival_delay: number;
  @Column({ nullable: true })
  diverted: number;
  @Column({ nullable: true })
  cancelled: number;
  @Column({ nullable: true })
  cancellation_reason: number;
  @Column({ nullable: true })
  air_system_delay: number;
  @Column({ nullable: true })
  security_delay: number;
  @Column({ nullable: true })
  airline_delay: number;
  @Column({ nullable: true })
  late_aircraft_delay: number;
  @Column({ nullable: true })
  weather_delay: number;
}
