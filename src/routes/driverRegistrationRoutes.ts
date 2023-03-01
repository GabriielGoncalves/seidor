import { Router } from 'express';
import { validatorDriver } from '../middlewares/expressValidator';
import DriverController from '../controllers/DriverController';

const driverRegistrationRouter = Router();

driverRegistrationRouter.post(
    '/driver/register',
    validatorDriver,
    new DriverController().register,
);
driverRegistrationRouter.put(
    '/driver/update/:id',
    new DriverController().update,
);
driverRegistrationRouter.delete(
    '/driver/delete/:id',
    new DriverController().delete,
);
driverRegistrationRouter.get('/driver/:id', new DriverController().findById);
driverRegistrationRouter.get('/drivers', new DriverController().findAll);

export default driverRegistrationRouter;
