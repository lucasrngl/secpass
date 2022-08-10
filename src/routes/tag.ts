import { Router } from 'express';
import { CreateTagController } from '../controllers/tag/create-tag-controller';
import { DeleteTagController } from '../controllers/tag/delete-tag-controller';
import { ListTagController } from '../controllers/tag/list-tag-controller';
import { UpdateTagController } from '../controllers/tag/update-tag-controller';
import { CheckUserExists } from '../middlewares/check-user-exists';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated';

const router = Router();

router.use(CheckUserExists.handle);
router.use(EnsureAuthenticated.handle);

router.post('/:id', CreateTagController.execute);

router.get('/:id', ListTagController.execute);

router.put('/:id/:tag', UpdateTagController.execute);

router.delete('/:id/:tag', DeleteTagController.execute);

export default router;
