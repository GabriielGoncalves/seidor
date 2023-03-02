import { Router } from 'express';
import { idValidator, rentIdValidator } from '../middlewares/expressValidator';
import rentACarController from '../controllers/rentACarController';

const carRentRouter = Router();

carRentRouter.post(
    '/rent/start/:driverId/:carId',
    rentIdValidator,
    rentACarController.rentACar,
);
carRentRouter.put(
    '/rent/finalize/:id',
    idValidator,
    rentACarController.finalizeRent,
);
carRentRouter.get('/rents', rentACarController.listAllRents);

export default carRentRouter;
