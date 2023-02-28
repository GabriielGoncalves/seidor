import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cars')
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('text')
    licensePlate: string;

    @Column('text')
    color: string;

    @Column('text')
    brand: string;
}
