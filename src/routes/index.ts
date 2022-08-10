import { Router } from 'express';
import auth from './auth';
import account from './account';
import tag from './tag';
import password from './password';

const routes = Router();

routes.use('/', auth);
routes.use('/settings', account);
routes.use('/tags', tag);
routes.use('/passwords', password);

export { routes };
