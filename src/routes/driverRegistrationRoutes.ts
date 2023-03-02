import { Router } from 'express';
import {
    idValidator,
    putValidatorDriver,
    validatorDriver,
} from '../middlewares/expressValidator';
import DriverController from '../controllers/DriverController';

const driverRegistrationRouter = Router();

driverRegistrationRouter.post(
    '/driver/register',
    validatorDriver,
    new DriverController().register,
);
driverRegistrationRouter.put(
    '/driver/update/:id',
    putValidatorDriver,
    idValidator,
    new DriverController().update,
);
driverRegistrationRouter.delete(
    '/driver/delete/:id',
    idValidator,
    new DriverController().delete,
);
driverRegistrationRouter.get(
    '/driver/:id',
    idValidator,
    new DriverController().findById,
);
driverRegistrationRouter.get('/drivers', new DriverController().findAll);

export default driverRegistrationRouter;
