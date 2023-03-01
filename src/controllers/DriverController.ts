import { Request, Response } from 'express';
import IFilterDriver from '../interfaces/IFilterDriver';
import IDriver from '../interfaces/IDriver';
import DriverService from '../services/DriverService';

export default class DriverController {
    async register(req: Request, res: Response) {
        const driver: IDriver = req.body;

        const service = new DriverService();

        const result = await service.register(driver);

        return res
            .status(201)
            .json({ msg: 'Successfully registered driver', result });
    }

    async update(req: Request, res: Response) {
        const driver: IDriver = req.body;
        const { id } = req.params;

        const service = new DriverService();

        const result = await service.update(id, driver);

        return res
            .status(200)
            .json({ msg: 'Successfully updated driver', result });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const service = new DriverService();

        await service.delete(id);

        return res.status(200).json({ msg: 'Successfully deleted driver' });
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;

        const service = new DriverService();

        const result = await service.findById(id);

        return res.status(200).json({ msg: result });
    }

    async findAll(req: Request, res: Response) {
        const filter: IFilterDriver = req.query;

        const service = new DriverService();

        const result = await service.find(filter);

        return res.status(200).json({ msg: result });
    }
}
