import { Router } from 'express';
import { UpdateUserController } from '../controllers/update-user-controller';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated';
import { ValidateUpdateUserArguments } from '../middlewares/argument-validation/validate-update-user-arguments';

const router = Router();

router.put(
  '/settings/:id',
  ValidateUpdateUserArguments.handle,
  EnsureAuthenticated.handle,
  UpdateUserController.execute
);

export default router;
