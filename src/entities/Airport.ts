import { Column, Entity, BaseEntity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "./Flight";

@Entity()
export class Airport extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn({ unique: true, length: 3 })
  iata_code: string;

  @Column()
  airport: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column({ type: "float" })
  latitude: number;

  @Column({ type: "float" })
  longitude: number;

  @OneToMany(() => Flight, (flight) => flight.origin_airport, {
    onDelete: "CASCADE",
  })
  departures_flights: Flight[];

  @OneToMany(() => Flight, (flight) => flight.destination_airport, {
    onDelete: "CASCADE",
  })
  arrival_flights: Flight[];
}
