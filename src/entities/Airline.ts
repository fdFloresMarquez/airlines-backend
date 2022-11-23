import { Column, Entity, BaseEntity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Flight } from "./Flight";

@Entity()
export class Airline extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @PrimaryColumn({ unique: true, length: 2 })
  iata_code: string;

  @Column({ unique: true})
  airline: string;

  @OneToMany(() => Flight, (flight) => flight.airline, { onDelete: "CASCADE" })
  flights: Flight[];
}
