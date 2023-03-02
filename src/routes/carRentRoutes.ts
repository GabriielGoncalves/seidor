import { Router } from 'express';
import { idValidator } from '../middlewares/expressValidator';
import rentACarController from '../controllers/rentACarController';

const carRentRouter = Router();

carRentRouter.post(
    '/rent/start/:driverId/:carId',
    idValidator,
    rentACarController.rentACar,
);
carRentRouter.put(
    '/rent/finalize/:rentId',
    idValidator,
    rentACarController.finalizeRent,
); // guardar data de finalização
carRentRouter.get('/rents', rentACarController.listAllRents);

export default carRentRouter;
