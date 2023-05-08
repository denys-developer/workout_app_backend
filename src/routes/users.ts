import { Router } from 'express';
import multer from 'multer';

import { UserController } from '@/controllers';

const router = Router();
const upload = multer({ dest: 'uploads/' });

router.get('/get-active', UserController.getActive);
router.put('/:id', upload.single('picture'), UserController.updateUser);

export default router;
