import { Router } from 'express';
import { CreatePasswordController } from '../controllers/password/create-password-controller';
import { DeletePasswordController } from '../controllers/password/delete-password-controller';
import { GeneratePasswordController } from '../controllers/password/generate-password-controller';
import { ListPasswordByTagController } from '../controllers/password/list-password-by-tag-controller';
import { ListPasswordController } from '../controllers/password/list-password-controller';
import { UpdatePasswordController } from '../controllers/password/update-password-controller';
import { CheckUserExists } from '../middlewares/check-user-exists';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated';

const router = Router();

router.use(CheckUserExists.handle);
router.use(EnsureAuthenticated.handle);

router.get('/generate/:id', GeneratePasswordController.execute);
router.post('/:id', CreatePasswordController.execute);
router.get('/:id', ListPasswordController.execute);
router.get('/:id/:tag', ListPasswordByTagController.execute);
router.put('/:id/:password', UpdatePasswordController.execute);
router.delete('/:id/:password', DeletePasswordController.execute);

export default router;
