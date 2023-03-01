import { Response, Request } from 'express';
import IFilterCar from '../interfaces/IFilterCar';
import ICar from '../interfaces/ICar';
import CarService from '../services/CarService';

export default class CarController {
    async register(req: Request, res: Response) {
        const car: ICar = req.body;

        const service = new CarService();

        const result = await service.register(car);

        return res.status(201).json(result);
    }

    async update(req: Request, res: Response) {
        const car: ICar = req.body;
        const { id } = req.params;

        const service = new CarService();

        const result = await service.update(id, car);

        return res
            .status(200)
            .json({ msg: 'Car information updated successfully', result });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const service = new CarService();

        await service.delete(id);

        return res.status(200).json({ msg: 'Successfully deleted car' });
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;

        const service = new CarService();

        const result = await service.findById(id);

        return res.status(200).json({ msg: result });
    }

    async find(req: Request, res: Response) {
        const filters: IFilterCar = req.query;

        const service = new CarService();

        const result = await service.findAll(filters);

        return res.status(200).json({ msg: result });
    }
}
