import express from 'express';

import {
  createArrangement,
  getArrangements,
  getArrangementById,
  updateArrangement,
  deleteArrangement
} from '../controllers/arrangementController.js';

const router = express.Router({ mergeParams: true });

router.route('/').post(createArrangement).get(getArrangements);
router.route('/:id').get(getArrangementById).put(updateArrangement).delete(deleteArrangement);

export default router;
