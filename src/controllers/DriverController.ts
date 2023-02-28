import { Request, Response } from 'express';
import IDriver from '../interfaces/IDriver';
import DriverService from '../services/DriverService';

class DriverController {
    async register(req: Request, res: Response) {
        const driver: IDriver = req.body;

        const result = await DriverService.register(driver);

        return res
            .status(201)
            .json({ msg: 'Successfully registered driver', result });
    }

    async update(req: Request, res: Response) {
        const driver: IDriver = req.body;
        const { id } = req.params;

        const result = await DriverService.update(id, driver);

        return res
            .status(200)
            .json({ msg: 'Successfully updated driver', result });
    }

    async delete(req: Request, res: Response) {
        const { id } = req.params;

        await DriverService.delete(id);

        return res.status(200).json({ msg: 'Successfully deleted driver' });
    }

    async findById(req: Request, res: Response) {
        const { id } = req.params;

        const result = await DriverService.findById(id);

        return res.status(200).json({ msg: result });
    }

    async findAll(req: Request, res: Response) {
        const result = await DriverService.find();
        return res.status(200).json({ msg: result });
    }
}

export default new DriverController();
