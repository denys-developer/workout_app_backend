import { Router } from 'express';

import { ExercisesController } from '@/controllers';

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Exercises
 *   description: The users managing API
 * /:
 *   get:
 *     summary: Exercises list
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Get active user
 */
router.get('/', ExercisesController.getAll);
/**
 * @swagger
 * /:id:
 *   get:
 *     summary: Exercise by id
 *     tags: [Exercises]
 *     responses:
 *       200:
 *         description: Get exercise by id
 */
router.get('/:id', ExercisesController.getById);

export default router;
