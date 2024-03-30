import { Router } from 'express';
import authRoutes from './authRoutes.js';
import boardroutes from './boardroutes.js';
const router = Router();

router.use('/auth', authRoutes);
router.use('/user', boardroutes);

export default router;
