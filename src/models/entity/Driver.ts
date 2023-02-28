import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { RentACar } from './RentACar';

@Entity('Drivers')
export class Driver {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text' })
    name: string;

    @OneToOne(() => RentACar)
    rent: RentACar;
}
