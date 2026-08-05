import express from 'express';
import arrangementRoutes from './arrangementRoutes.js';
import recommendationRoutes from './recommendationRoutes.js';
import authUser from '../middleware/authMiddleware.js';

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
} from '../controllers/eventController.js';

const router = express.Router();
router.use(authUser);

router.route('/').post(createEvent).get(getEvents);
router.route('/:id').get(getEventById).put(updateEvent);

router.use('/:eventId/arrangements', arrangementRoutes);
router.use('/:eventId/recommendations', recommendationRoutes);

export default router;
