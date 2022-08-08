import { Router } from 'express';
import { CreateUserController } from '../controllers/create-user-controller';

const router = Router();

router.post('/sign-up', CreateUserController.execute);

export default router;
