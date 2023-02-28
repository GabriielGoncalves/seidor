import {
    Entity,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn,
    Column,
    CreateDateColumn,
} from 'typeorm';
import { Driver } from './Driver';
import { Car } from './Car';

@Entity('Rent')
export class RentACar {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn()
    startRent: string;

    @Column({ default: '' })
    endRent: string;

    @Column('text')
    description: string;

    @OneToOne(() => Driver)
    @JoinColumn()
    driver: Driver;

    @OneToOne(() => Car)
    @JoinColumn()
    car: Car;
}
