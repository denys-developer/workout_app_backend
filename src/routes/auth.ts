import { Router } from 'express';
import passport from 'passport';

import { AuthController } from '@/controllers';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The auth managing API
 * /refresh-token:
 *   post:
 *     summary: Refresh auth token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: Get access token
 */

router.post('/refresh-token', AuthController.refreshToken);

/**
 * @swagger
 * /sign-up:
 *   post:
 *     summary: Sign up
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               email:
 *                  type: string
 *     responses:
 *       200:
 *         description: Get access token
 */
router.post('/sign-up', AuthController.signUp);
/**
 * @swagger
 * /sign-in:
 *   post:
 *     summary: Sign in
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *               emil:
 *                 type: string
 *     responses:
 *       200:
 *         description: Get access token
 */
router.post('/sign-in', AuthController.signIn);

/// Google auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  AuthController.googleAuthCallback,
);

export default router;
