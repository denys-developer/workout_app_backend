import { Router } from 'express';
import passport from 'passport';

import { AuthController } from '@/controllers';

const router = Router();

router.post('/refresh-token', AuthController.refreshToken);
router.post('/sign-up', AuthController.signUp);
router.post('/sign-in', AuthController.signIn);

/// Google auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  AuthController.googleAuthCallback,
);

export default router;
