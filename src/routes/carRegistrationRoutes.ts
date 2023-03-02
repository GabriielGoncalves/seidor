import { Router } from 'express';
import {
    idValidator,
    putValidatorCar,
    validatorCar,
} from '../middlewares/expressValidator';
import CarController from '../controllers/carController';

const carRegistrationRouter = Router();

carRegistrationRouter.post(
    '/car/register',
    validatorCar,
    new CarController().register,
);
carRegistrationRouter.put(
    '/car/update/:id',
    putValidatorCar,
    new CarController().update,
);
carRegistrationRouter.delete(
    '/car/delete/:id',
    idValidator,
    new CarController().delete,
);
carRegistrationRouter.get(
    '/car/:id',
    idValidator,
    new CarController().findById,
);
carRegistrationRouter.get('/cars', new CarController().find);

export default carRegistrationRouter;
