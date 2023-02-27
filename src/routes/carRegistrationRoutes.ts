import { Router } from 'express';
import { validator } from '../middlewares/expressValidator';
import CarController from '../controllers/carController';

const carRegistrationRouter = Router();

carRegistrationRouter.post('/registration', validator, CarController.register);
carRegistrationRouter.put('/update/:id', CarController.updateCar);
carRegistrationRouter.delete('/remove/:id', CarController.deleteCar);
carRegistrationRouter.get('/car/:id', CarController.findCarById);
carRegistrationRouter.get('/car', CarController.listCars);

export default carRegistrationRouter;
