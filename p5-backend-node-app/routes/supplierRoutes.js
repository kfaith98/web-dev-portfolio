import express from 'express';

import {
  createSupplier,
  getSuppliers,
  getSupplierById,
  updateSupplier,
} from '../controllers/supplierController.js';

const router = express.Router();

router.route('/').post(createSupplier).get(getSuppliers);
router.route('/:id').get(getSupplierById).put(updateSupplier);

export default router;
