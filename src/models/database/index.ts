import ICar from 'src/interfaces/ICar';
import AppDataSource from '../data-source/data-source';
import { Car } from '../entity/Car';
const CarRepository = AppDataSource.getRepository(Car);

export default class Database {
    private static db: Database;
    private constructor() {}

    static createDb() {
        if (Database.db) {
            return Database.db;
        }
        Database.db = new Database();
        return Database.db;
    }

    async registerCar(car: Car): Promise<Car> {
        try {
            const result = await CarRepository.save(car);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async deleteCar(id: string): Promise<Car | null> {
        try {
            const carToDelete = await CarRepository.findOneBy({
                id,
            });

            if (!carToDelete) {
                return null;
            }
            const result = await CarRepository.remove(carToDelete);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findCars(): Promise<Car[]> {
        try {
            const result = await CarRepository.find();
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findCar(id: string): Promise<Car | null> {
        try {
            const result = await CarRepository.findOneBy({
                id,
            });
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateCar(car: ICar, carToUpgrade: Car): Promise<Car> {
        try {
            carToUpgrade.cor = car.cor;
            carToUpgrade.marca = car.marca;
            carToUpgrade.placa = car.placa;

            const result = await CarRepository.save(carToUpgrade);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
