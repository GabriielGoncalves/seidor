import { Response, Request } from 'express';
import ICar from '../interfaces/ICar';
import CarService from '../services/CarService';

class CarController {
    async register(req: Request, res: Response) {
        const car: ICar = req.body;
        const result = await CarService.register(car);

        return res.status(201).json(result);
    }

    async update(req: Request, res: Response) {
        const car: ICar = req.body;
        const { id } = req.params;

        const result = await CarService.update(id, car);

        return res
            .status(200)
            .json({ msg: 'Car information updated successfully', result });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        await CarService.delete(id);

        return res.status(200).json({ msg: 'Successfully deleted car' });
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;
        const result = await CarService.findById(id);

        return res.status(200).json({ msg: result });
    }

    async find(req: Request, res: Response) {
        const result = await CarService.findAll();

        return res.status(200).json({ msg: result });
    }
}

export default new CarController();
