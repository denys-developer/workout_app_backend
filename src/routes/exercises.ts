import { Router } from 'express';

import { ExercisesController } from '@/controllers';

const router = Router();

router.get('/', ExercisesController.getAll);
router.get('/:id', ExercisesController.getById);

export default router;
