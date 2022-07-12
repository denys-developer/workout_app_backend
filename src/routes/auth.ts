import { Router } from 'express';
import { signUp } from '../controlers';

const router = Router();

router.post('/sign-up', async (req, res) => {
  await signUp(req.body);
  res.send('Birds home page');
});

export default router;
