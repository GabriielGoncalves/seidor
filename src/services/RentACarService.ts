import { RentACar } from '../models/entity/RentACar';
import AppDataSource from '../models/data-source/data-source';
import CarService from './CarService';
import DriverService from './DriverService';

export default class RentACarService {
    private readonly rentACarRepository = AppDataSource.getRepository('Rent');
    private readonly carService = new CarService();
    private readonly driverService = new DriverService();

    async register(
        driverId: string,
        carId: string,
        description: string,
    ): Promise<RentACar> {
        const rentByDriver = await this.findRentByDriver(driverId);
        const rentByCar = await this.findRentByCar(carId);
        const getCar = await this.carService.findById(carId);
        const getDriver = await this.driverService.findById(driverId);

        if (rentByDriver?.active) {
            if (rentByDriver?.driver.id === getDriver.id) {
                throw new Error(
                    'Oops. The driver cannot rent another car at this time. End your contract and try again.',
                );
            }
        }

        if (rentByCar?.active) {
            if (rentByCar?.car.id === getCar.id) {
                throw new Error(
                    'Oops. The desired car is already rented. We are sorry',
                );
            }
        }

        const newRent = this.rentACarRepository.create({
            description,
            driver: getDriver,
            car: getCar,
        });

        const register = await this.rentACarRepository.save(newRent);
        return register as RentACar;
    }

    public async findRentByDriver(idDriver: string): Promise<RentACar | null> {
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

        return rent ? (rent as RentACar) : null;
    }

    public async findRentByCar(idCar: string): Promise<RentACar | null> {
        const rent = await this.rentACarRepository.findOne({
            where: {
                car: {
                    id: idCar,
                },
            },
            relations: {
                car: true,
                driver: true,
            },
        });

        return rent ? (rent as RentACar) : null;
    }

    async find(): Promise<RentACar[] | string> {
        const rents = await this.rentACarRepository.find({
            relations: {
                car: true,
                driver: true,
            },
        });

        return rents.length === 0
            ? 'There are no rentals'
            : (rents as RentACar[]);
    }

    async update(rentId: string): Promise<RentACar> {
        const rent = (await this.rentACarRepository.findOne({
            where: {
                id: rentId,
            },
            relations: {
                car: true,
                driver: true,
            },
        })) as RentACar;

        if (rent?.active === false) {
            throw new Error(
                'It was not possible to finish the rent, because it is not active',
            );
        }

        rent.endRent = `${new Date().toISOString()}`;
        rent.active = false;

        await this.rentACarRepository.save(rent);
        return rent as RentACar;
    }
}
