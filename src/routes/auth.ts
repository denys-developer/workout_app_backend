import { Router } from 'express';
import passport from 'passport';

import { UserController } from '@/controllers';

const router = Router();

router.get('/get-active', UserController.getActive);
router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);

/// Google auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  UserController.googleAuthCallback,
);

export default router;
