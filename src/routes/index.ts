import { Router } from 'express';
import auth from './auth';
import account from './account';
import tag from './tag';

const routes = Router();

routes.use('/', auth);
routes.use('/settings', account);
routes.use('/tags', tag);

export { routes };
