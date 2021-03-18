import { Router } from 'express';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';
import checkCredentials from './middlewares/checkCredentials';
import RecoveryController from './controllers/RecoveryController';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/auth', AuthController.store);
routes.post('/recovery', RecoveryController.store);
routes.put('/recovery', RecoveryController.update);

routes.get('/users', checkCredentials, UserController.show);
routes.put('/users', checkCredentials, UserController.update);
routes.delete('/users', checkCredentials, UserController.deleted);

export default routes;
