import { Router } from 'express';
import multer from 'multer';

import { UserController } from '@/controllers';
import { verifyTokenMiddleware } from '@/middlewares';

const router = Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The users managing API
 * /get-active:
 *   get:
 *     summary: Active user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get active user
 */
router.get('/get-active', verifyTokenMiddleware, UserController.getActive);
/**
 * @swagger
 * /:
 *   put:
 *     summary: Update active user
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Get exercise by id
 */
router.put('/', [verifyTokenMiddleware, upload.single('picture')], UserController.updateUser);

export default router;
