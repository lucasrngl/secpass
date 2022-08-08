import { Router } from 'express';
import { AuthenticateUserController } from '../controllers/authenticate-user-controller';
import { CreateUserController } from '../controllers/create-user-controller';
import { RefreshTokenController } from '../controllers/refresh-token-controller';
import { ValidateAuthenticationUserArguments } from '../middlewares/argument-validation/validate-authentication-user-arguments';
import { ValidateCreateUserArguments } from '../middlewares/argument-validation/validate-create-user-arguments';
import { ValidateRefreshTokenArguments } from '../middlewares/argument-validation/validate-refresh-token-arguments';

const router = Router();

router.post(
  '/sign-up',
  ValidateCreateUserArguments.handle,
  CreateUserController.execute
);

router.post(
  '/sign-in',
  ValidateAuthenticationUserArguments.handle,
  AuthenticateUserController.execute
);

router.post(
  '/refresh-token',
  ValidateRefreshTokenArguments.handle,
  RefreshTokenController.execute
);

export default router;
