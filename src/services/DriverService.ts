import { Driver } from '../models/entity/Driver';
import IDriver from '../interfaces/IDriver';
import AppDataSource from '../models/data-source/data-source';
import IFilterDriver from '../interfaces/IFilterDriver';

export default class DriverService {
    private readonly driverRepository = AppDataSource.getRepository('Drivers');

    async register(driver: IDriver): Promise<Driver> {
        const newDriver = this.driverRepository.create(driver);

        await this.driverRepository.save(newDriver);

        return newDriver as Driver;
    }

    async update(id: string, driver: IDriver): Promise<Driver> {
        const driverToUpgrade = await this.findById(id);

        if (!driverToUpgrade) {
            throw new Error('Driver does not exists. Try again');
        }

        driverToUpgrade.name = driver.name;

        await this.driverRepository.save(driverToUpgrade);
        return driverToUpgrade;
    }

    async delete(id: string): Promise<void> {
        const driverToDelete = await this.findById(id);

        if (!driverToDelete) {
            throw new Error('Driver does not exists. Try again');
        }

        await this.driverRepository.remove(driverToDelete);
    }

    async findById(id: string): Promise<Driver> {
        const driver = await this.driverRepository.findOneBy({ id });

        if (!driver) {
            throw new Error('Driver does not exists. Try again');
        }

        return driver as Driver;
    }

    async find(filter: IFilterDriver): Promise<Driver[] | string> {
        const { name } = filter;

        if (name) {
            const driver = await this.driverRepository.find({
                where: {
                    name,
                },
            });
            return driver as Driver[];
        }
        const drivers = await this.driverRepository.find();

        return drivers.length !== 0
            ? (drivers as Driver[])
            : 'There are no registered drivers on our platform';
    }
}
