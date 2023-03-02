import { Request, Response } from 'express';
import RentACarService from '../services/RentACarService';
class RentACar {
    constructor() {}

    async rentACar(req: Request, res: Response) {
        const { driverId, carId } = req.params;
        const description: string = req.body.description;

        const service = new RentACarService();

        const result = await service.register(driverId, carId, description);

        return res.status(201).json({
            msg: 'Rental registration completed successfully',
            result,
        });
    }

    async listAllRents(req: Request, res: Response) {
        const service = new RentACarService();

        const result = await service.find();
        return res.status(200).json({
            msg: result,
        });
    }

    async finalizeRent(req: Request, res: Response) {
        const service = new RentACarService();
        const { id } = req.params;

        const result = await service.update(id);

        return res
            .status(200)
            .json({ msg: 'Successful finished rental', result });
    }
}

export default new RentACar();
