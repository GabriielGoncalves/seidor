import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Cars')
export class Car {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', nullable: true })
    licensePlate: string;

    @Column({ type: 'text', nullable: true })
    color: string;

    @Column({ type: 'text' })
    brand: string;
}
