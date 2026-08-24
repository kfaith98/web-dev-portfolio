import express from 'express';
import authUser from '../middleware/authMiddleware.js';

import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
} from '../controllers/supplierController.js';

const router = express.Router();
router.use(authUser);

router.route('/').post(createSupplier).get(getSuppliers);
router.route('/:id').get(getSupplierById).put(updateSupplier);

export default router;
