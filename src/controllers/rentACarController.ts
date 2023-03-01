import { Request, Response } from 'express';
import RentACarService from '../services/RentACarService';
class RentACar {
    constructor() {}

    async rentACar(req: Request, res: Response) {
        const { driverId, carId } = req.params;
        const description: string = req.body.description;

        const service = new RentACarService();

        await service.register(driverId, carId, description);

        return res.status(201).json({
            msg: 'Rental registration completed successfully',
        });
    }

    async listAllRents(req: Request, res: Response) {
        const service = new RentACarService();

        const result = await service.find();
        return res.status(200).json({
            msg: result,
        });
    }

    teste() {}
}

export default new RentACar();
