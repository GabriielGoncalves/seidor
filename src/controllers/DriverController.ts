import { Request, Response } from 'express';
import { Driver } from 'src/models/entity/Driver';
import IDriver from '../interfaces/IDriver';
import Database from '../models/database';

class DriverController {
    constructor() {}

    async registerDriver(req: Request, res: Response) {
        try {
            const driver: IDriver = req.body;

            const driverToRegister = new Driver();
            driverToRegister.name = driver.name;

            const db = Database.createDb();

            const result = await db.registerDriver(driverToRegister);

            return res
                .status(201)
                .json({ msg: 'Successfully registered driver', result });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateDriver(req: Request, res: Response) {
        try {
            const driver: IDriver = req.body;
            const { id } = req.params;

            const db = Database.createDb();

            const result = await db.updateDriver(driver, id);

            if (!result) {
                return res.status(404).json({
                    msg: 'Unable to find resource with given identifier. Try again',
                });
            }
            return res
                .status(200)
                .json({ msg: 'Successfully updated driver', result });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async deleteDriver(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = Database.createDb();

            const result = await db.deleteDriver(id);

            if (!result) {
                return res.status(404).json({
                    msg: 'Unable to find resource with given identifier. Try again',
                });
            }

            return res.status(200).json({ msg: 'Successfully deleted driver' });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findDriverById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const db = Database.createDb();

            const result = await db.findDriver(id);

            if (!result) {
                return res.status(404).json({
                    msg: 'Unable to find resource with given identifier. Try again',
                });
            }

            return res.status(201).json({ msg: result });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findDrivers(req: Request, res: Response) {
        try {
            const db = Database.createDb();

            const result = await db.findDrivers();

            if (result.length < 1) {
                return res
                    .status(200)
                    .json({ msg: 'No drivers are registered on our platform' });
            }

            return res.status(200).json({ msg: result });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default new DriverController();
