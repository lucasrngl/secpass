import { Router } from 'express';
import { UpdateUserController } from '../controllers/user/update-user-controller';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated';
import { DeleteUserController } from '../controllers/user/delete-user-controller';
import { CheckUserExists } from '../middlewares/check-user-exists';

const router = Router();

router.use(CheckUserExists.handle);
router.use(EnsureAuthenticated.handle);

router.put('/:id', UpdateUserController.execute);

router.delete('/:id', DeleteUserController.execute);

export default router;
