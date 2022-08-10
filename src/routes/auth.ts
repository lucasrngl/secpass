import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/user/authenticate-user-controller';
import { CreateUserController } from '../controllers/user/create-user-controller';
import { RefreshTokenController } from '../controllers/refresh-token-controller';

const router = Router();

router.post('/sign-up', CreateUserController.execute);

router.post('/sign-in', AuthenticateUserController.execute);

router.post('/refresh-token/:id', RefreshTokenController.execute);

export default router;
