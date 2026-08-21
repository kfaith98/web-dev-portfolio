import express from 'express';
import authUser from '../middleware/authMiddleware.js';
import { getMe, updateMe } from '../controllers/userController.js';

const router = express.Router();
router.use(authUser);

router.get('/me', getMe);
router.put('/me', updateMe);

export default router;
