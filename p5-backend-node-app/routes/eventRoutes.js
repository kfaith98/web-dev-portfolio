import express from 'express';

import {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
} from '../controllers/eventController.js';

const router = express.Router();

router.route('/').post(createEvent).get(getEvents);
router.route('/:id').get(getEventById).put(updateEvent);

export default router;
