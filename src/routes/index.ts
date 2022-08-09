import { Router } from 'express';
import auth from './auth';
import account from './account';

const routes = Router();

routes.use('/', auth);
routes.use('/settings', account);

export { routes };
