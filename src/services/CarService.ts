import IFilterCar from '../interfaces/IFilterCar';
import ICar from '../interfaces/ICar';
import AppDataSource from '../models/data-source/data-source';
import { Car } from '../models/entity/Car';

export default class CarService {
    private readonly carRepository = AppDataSource.getRepository('Cars');
    async register(car: ICar): Promise<Car> {
        const newCar = this.carRepository.create(car);

        await this.carRepository.save(newCar);
        return newCar as Car;
    }

    async update(id: string, car: ICar): Promise<Car> {
        const carToUpgrade = await this.carRepository.findOne({
            where: {
                id,
            },
        });
        if (!carToUpgrade) {
            throw new Error('Car does not exists');
        }
        carToUpgrade.color = car.color;
        carToUpgrade.brand = car.brand;
        carToUpgrade.licensePlate = car.licensePlate;

        await this.carRepository.save(carToUpgrade);
        return carToUpgrade as Car;
    }

    async delete(id: string): Promise<void> {
        const carToUpgrade = await this.carRepository.findOne({
            where: {
                id,
            },
        });

        if (!carToUpgrade) {
            throw new Error('Car does not exists');
        }

        await this.carRepository.remove(carToUpgrade);
    }

    async findById(id: string): Promise<Car> {
        const car = await this.carRepository.findOneBy({
            id,
        });
        if (!car) {
            throw new Error('Car does not exists');
        }

        return car as Car;
    }

    async findAll(filters: IFilterCar): Promise<Car[] | string> {
        const { brand, color } = filters;

        if (!brand && !color) {
            const cars = await this.carRepository.find();
            return cars.length === 0
                ? 'There are no registered cars on our platform'
                : (cars as Car[]);
        } else if (brand && !color) {
            const carsByBrand = await this.carRepository.find({
                where: {
                    brand,
                },
            });
            return carsByBrand as Car[];
        } else if (brand && color) {
            const cars = await this.carRepository.find({
                where: {
                    brand,
                    color,
                },
            });
            return cars as Car[];
        } else {
            const cars = await this.carRepository.find({
                where: {
                    color,
                },
            });
            return cars as Car[];
        }
    }
}
