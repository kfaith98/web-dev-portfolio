import express from 'express';
import arrangementRoutes from './arrangementRoutes.js';

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.route('/').post(createEvent).get(getEvents);
router.route('/:id').get(getEventById).put(updateEvent);

router.use('/:eventId/arrangements', arrangementRoutes);

export default router;
