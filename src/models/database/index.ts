import ICar from 'src/interfaces/ICar';
import IDriver from '../../interfaces/IDriver';
import AppDataSource from '../data-source/data-source';
import { Car } from '../entity/Car';
import { Driver } from '../entity/Driver';

const carRepository = AppDataSource.getRepository(Car);
const driverRepository = AppDataSource.getRepository(Driver);

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
            const result = await carRepository.save(car);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async deleteCar(id: string): Promise<Car | null> {
        try {
            const carToDelete = await this.findCar(id);

            if (!carToDelete) {
                return null;
            }
            const result = await carRepository.remove(carToDelete);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findCars(): Promise<Car[]> {
        try {
            const result = await carRepository.find();
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findCar(id: string): Promise<Car | null> {
        try {
            const result = await carRepository.findOneBy({
                id,
            });
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateCar(car: ICar, id: string): Promise<Car | null> {
        try {
            const carToUpgrade = await this.findCar(id);
            if (carToUpgrade) {
                carToUpgrade.cor = car.cor;
                carToUpgrade.marca = car.marca;
                carToUpgrade.placa = car.placa;

                const result = await carRepository.save(carToUpgrade);
                return result;
            }
            return null;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async registerDriver(driver: Driver): Promise<Driver> {
        try {
            const result = await driverRepository.save(driver);
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async deleteDriver(id: string): Promise<Driver | null> {
        try {
            const result = await this.findDriver(id);

            if (result) {
                await driverRepository.remove(result);
                return result;
            }
            return null;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findDriver(id: string): Promise<Driver | null> {
        try {
            const result = await driverRepository.findOneBy({
                id,
            });
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateDriver(driver: IDriver, id: string): Promise<Driver | null> {
        try {
            const driverToUpgrade = await this.findDriver(id);

            if (driverToUpgrade) {
                driverToUpgrade.name = driver.name;
                const result = await driverRepository.save(driverToUpgrade);
                return result;
            }

            return null;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findDrivers(): Promise<Driver[]> {
        try {
            const result = await driverRepository.find();
            return result;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}
