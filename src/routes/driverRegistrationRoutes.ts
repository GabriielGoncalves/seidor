import { Router } from 'express';
import DriverController from '../controllers/DriverController';

const driverRegistrationRouter = Router();

driverRegistrationRouter.post('/driver/register', DriverController.register);
driverRegistrationRouter.put('/driver/update/:id', DriverController.update);
driverRegistrationRouter.delete('/driver/delete/:id', DriverController.delete);
driverRegistrationRouter.get('/driver/:id', DriverController.findById);
driverRegistrationRouter.get('/drivers', DriverController.findAll);

export default driverRegistrationRouter;
