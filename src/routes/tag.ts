import { Router } from 'express';
import { CreateTagController } from '../controllers/tag/create-tag-controller';
import { EnsureAuthenticated } from '../middlewares/ensure-authenticated';

const router = Router();

router.post('/:id', EnsureAuthenticated.handle, CreateTagController.execute);

export default router;
