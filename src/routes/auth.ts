import { Router } from 'express';

import { UserController } from '@/controllers';

const router = Router();

router.post('/sign-up', UserController.signUp);
router.post('/sign-in', UserController.signIn);
router.get('/refresh', UserController.refresh);

export default router;
