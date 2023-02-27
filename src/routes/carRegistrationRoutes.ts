import { Router } from 'express';
import { validator } from '../middlewares/expressValidator';
import CarController from '../controllers/carController';

const carRegistrationRouter = Router();

carRegistrationRouter.post('/car/register', validator, CarController.register);
carRegistrationRouter.put('/car/update/:id', CarController.updateCar);
carRegistrationRouter.delete('/car/delete/:id', CarController.deleteCar);
carRegistrationRouter.get('/car/:id', CarController.findCarById);
carRegistrationRouter.get('/car', CarController.listCars);

export default carRegistrationRouter;
