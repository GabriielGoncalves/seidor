import { Router } from 'express';
import rentACarController from '../controllers/rentACarController';

const carRentRouter = Router();

carRentRouter.post('/rent/start/:driver/:car', rentACarController.rentACar);
carRentRouter.put('/rent/finalize/:driver/:car', rentACarController.teste); // guardar data de finalização
carRentRouter.get('/rents', rentACarController.listAllRents);

export default carRentRouter;
