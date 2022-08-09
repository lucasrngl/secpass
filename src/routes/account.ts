import { Router } from 'express';
import { UpdateUserController } from '../controllers/update-user-controller';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated';
import { ValidateUpdateUserArguments } from '../middlewares/argument-validation/validate-update-user-arguments';
import { DeleteUserController } from '../controllers/delete-user-controller';

const router = Router();

router.put(
  '/:id',
  ValidateUpdateUserArguments.handle,
  EnsureAuthenticated.handle,
  UpdateUserController.execute
);

router.delete('/:id', EnsureAuthenticated.handle, DeleteUserController.execute);

export default router;
