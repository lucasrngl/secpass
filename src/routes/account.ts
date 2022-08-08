import { Router } from 'express';
import { UpdateUserController } from '../controllers/update-user-controller';
import { ValidateUpdateUserArguments } from '../middlewares/validate-update-user-arguments';

const router = Router();

router.put(
  '/settings/:id',
  ValidateUpdateUserArguments.handle,
  UpdateUserController.execute
);

export default router;
