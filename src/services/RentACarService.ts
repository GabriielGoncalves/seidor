import { RentACar } from '../models/entity/RentACar';
import AppDataSource from '../models/data-source/data-source';
import CarService from './CarService';
import DriverService from './DriverService';

class RentACarService {
    private readonly rentACarRepository = AppDataSource.getRepository(RentACar);
    private readonly carService = CarService;
    private readonly driverService = DriverService;

    async register(
        driver: string,
        car: string,
        description: string,
    ): Promise<RentACar> {
        const rent = await this.findRentByDriver(driver);
        const getCar = await this.carService.findById(car);
        const getDriver = await this.driverService.findById(driver);

        if (rent?.car.id === getCar.id) {
            throw new Error(
                'Oops. The desired car is already rented. We are sorry',
            );
        }

        if (rent) {
            throw new Error(
                'Oops. The driver cannot rent another car at this time. End your contract and try again.',
            );
        }

        const newRent = this.rentACarRepository.create({
            description,
            driver: getDriver,
            car: getCar,
        });

        const register = await this.rentACarRepository.save(newRent);
        return register;
    }

    private async findRentByDriver(idDriver: string): Promise<RentACar | null> {
        const rent = await this.rentACarRepository.findOne({
            where: {
                driver: {
                    id: idDriver,
                },
            },
            relations: {
                car: true,
                driver: true,
            },
        });

        return rent ? rent : null;
    }

    async find(): Promise<RentACar[] | string> {
        const rents = await this.rentACarRepository.find({
            relations: {
                car: true,
                driver: true,
            },
        });

        return rents.length === 0 ? 'There are no rentals' : rents;
    }
}

export default new RentACarService();
