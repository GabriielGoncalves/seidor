import { Response, Request } from 'express';
import { Car } from '../models/entity/Car';
import Database from '../models/database';
import ICar from '../interfaces/ICar';

class CarController {
    // private createCar(car: ICar): Car {
    //     const newCar = new Car();
    //     newCar.marca = car.marca;
    //     newCar.cor = car.cor;
    //     newCar.placa = car.placa;
    //     return newCar;
    // }

    async register(req: Request, res: Response) {
        try {
            const db = Database.createDb();
            const car: ICar = req.body;

            const carToRegister = new Car();
            carToRegister.marca = car.marca;
            carToRegister.cor = car.cor;
            carToRegister.placa = car.placa;

            const result = await db.registerCar(carToRegister);
            return res.status(201).json({
                msg: `successfully registered car`,
                result,
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async updateCar(req: Request, res: Response) {
        try {
            const db = Database.createDb();

            const car: ICar = req.body;
            const { id } = req.params;

            const carToUpgrade = await db.findCar(id);
            if (!carToUpgrade) {
                return res.status(400).json({
                    msg: 'Unable to find resource with given identifier. Try again',
                });
            }

            const result = await db.updateCar(car, carToUpgrade);

            return res
                .status(200)
                .json({ msg: 'Car information updated successfully' });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async deleteCar(req: Request, res: Response) {
        try {
            const db = Database.createDb();

            const { id } = req.params;

            const result = await db.deleteCar(id);
            if (!result) {
                return res.status(400).json({
                    msg: 'Unable to find resource with given identifier. Try again',
                });
            }

            return res.status(200).json({ msg: 'Successfully deleted car' });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async findCarById(req: Request, res: Response) {
        try {
            const db = Database.createDb();

            const { id } = req.params;
            const result = await db.findCar(id);
            if (!result) {
                return res.status(400).json({
                    msg: 'Unable to find resource with given identifier. Try again',
                });
            }

            return res.status(200).json({ msg: result });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

    async listCars(req: Request, res: Response) {
        try {
            const db = Database.createDb();

            const result = await db.findCars();
            if (result.length < 1) {
                return res
                    .status(200)
                    .json({ msg: 'No cars are registered on our platform' });
            }

            return res.status(400).json({ msg: result });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}

export default new CarController();
