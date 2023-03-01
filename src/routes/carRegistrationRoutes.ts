import { Router } from 'express';
import { putValidator, validator } from '../middlewares/expressValidator';
import CarController from '../controllers/carController';

const carRegistrationRouter = Router();

carRegistrationRouter.post(
    '/car/register',
    validator,
    new CarController().register,
);
carRegistrationRouter.put(
    '/car/update/:id',
    putValidator,
    new CarController().update,
);
carRegistrationRouter.delete('/car/delete/:id', new CarController().delete);
carRegistrationRouter.get('/car/:id', new CarController().findById);
carRegistrationRouter.get('/cars', new CarController().find);

export default carRegistrationRouter;
