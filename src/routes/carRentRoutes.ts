import { Router } from 'express';
import rentACarController from '../controllers/rentACarController';

const carRentRouter = Router();

carRentRouter.post('/rent/start/:driverId/:carId', rentACarController.rentACar);
carRentRouter.put('/rent/finalize/:rentId', rentACarController.finalizeRent); // guardar data de finalização
carRentRouter.get('/rents', rentACarController.listAllRents);

export default carRentRouter;
