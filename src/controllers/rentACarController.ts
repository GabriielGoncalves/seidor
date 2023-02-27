import { Request, Response } from 'express';
import Database from '../models/database';

class RentACar {
    constructor() {}

    async rentACar(req: Request, res: Response) {
        try {
            const { driver, car } = req.params;
            const description: string = req.body.description;

            const db = Database.createDb();
            const result = await db.registerRent(driver, car, description);

            if (!result) {
                return res.status(201).json({
                    msg: 'Rental registration completed successfully',
                });
            }

            return res.status(400).json({
                msg: 'Oops. The desired car is already rented. We are sorry.',
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async listAllRents(req: Request, res: Response) {
        try {
            const db = Database.createDb();
            const result = await db.findRents();

            return res.status(200).json({
                msg: result,
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    teste() {}
}

export default new RentACar();
