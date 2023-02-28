import ICar from '../interfaces/ICar';
import AppDataSource from '../models/data-source/data-source';
import { Car } from '../models/entity/Car';

class CarService {
    private readonly carRepository = AppDataSource.getRepository(Car);
    async register(car: ICar): Promise<Car> {
        const newCar = this.carRepository.create(car);

        await this.carRepository.save(newCar);
        return newCar;
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
        carToUpgrade.cor = car.cor;
        carToUpgrade.marca = car.marca;
        carToUpgrade.placa = car.placa;

        await this.carRepository.save(carToUpgrade);
        return carToUpgrade;
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

        return car;
    }

    async findAll(): Promise<Car[] | string> {
        const car = await this.carRepository.find();

        return car.length === 0
            ? 'There are no registered cars on our platform'
            : car;
    }
}

export default new CarService();
