import { Router } from 'express';
import DriverController from '../controllers/DriverController';

const driverRegistrationRouter = Router();

driverRegistrationRouter.post(
    '/driver/register',
    DriverController.registerDriver,
);
driverRegistrationRouter.put('/driver/update', DriverController.updateDriver);
driverRegistrationRouter.delete(
    '/driver/delete/:id',
    DriverController.deleteDriver,
);
driverRegistrationRouter.get('/driver/:id', DriverController.findDriverById);
driverRegistrationRouter.get('/drivers', DriverController.findDrivers);

export default driverRegistrationRouter;
