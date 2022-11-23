import { Column, Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Airline extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  iata_code: string;

  @Column()
  airline: string;
}
