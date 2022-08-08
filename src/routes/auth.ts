import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';
import { CreateUserController } from '../controllers/create-user-controller';
import { RefreshTokenController } from '../controllers/refresh-token-controller';

const router = Router();

router.post('/sign-up', CreateUserController.execute);

router.post('/sign-in', AuthenticateUserController.execute);

router.post('/refresh-token', RefreshTokenController.execute);

export default router;
