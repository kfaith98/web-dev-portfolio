import express from 'express';
import authUser from '../middleware/authMiddleware.js';

import { getRecommendations } from '../controllers/recommendationController.js';

const router = express.Router({ mergeParams: true });
router.use(authUser);

router.route('/').post(getRecommendations);

export default router;
