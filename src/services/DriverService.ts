import { Driver } from '../models/entity/Driver';
import IDriver from '../interfaces/IDriver';
import AppDataSource from '../models/data-source/data-source';
import IFilterDriver from '../interfaces/IFilterDriver';

class DriverService {
    private readonly driverRepository = AppDataSource.getRepository(Driver);

    async register(driver: IDriver): Promise<Driver> {
        const newDriver = this.driverRepository.create(driver);

        await this.driverRepository.save(newDriver);

        return newDriver;
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

        return driver;
    }

    async find(filter: IFilterDriver): Promise<Driver[] | string> {
        const { name } = filter;

        if (name) {
            const driver = await this.driverRepository.find({
                where: {
                    name,
                },
            });
            return driver;
        }
        const drivers = await this.driverRepository.find();

        return drivers
            ? drivers
            : 'There are no registered drivers on our platform';
    }
}

export default new DriverService();
