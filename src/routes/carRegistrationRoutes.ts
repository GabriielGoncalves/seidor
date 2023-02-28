import { Router } from 'express';
import { validator } from '../middlewares/expressValidator';
import CarController from '../controllers/carController';

const carRegistrationRouter = Router();

carRegistrationRouter.post('/car/register', validator, CarController.register);
carRegistrationRouter.put('/car/update/:id', CarController.update);
carRegistrationRouter.delete('/car/delete/:id', CarController.delete);
carRegistrationRouter.get('/car/:id', CarController.findById);
carRegistrationRouter.get('/cars', CarController.find);

export default carRegistrationRouter;
