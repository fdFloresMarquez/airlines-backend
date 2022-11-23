import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Airport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iata_code: string;

  @Column()
  airport: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;
}
