import { Router } from 'express';
import { CreateUser } from '../services/create-user';

const router = Router();

router.post('/sign-up', CreateUser.execute);

export default router;
