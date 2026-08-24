import Supplier from '../models/Supplier.js';

export const createSupplier = async (req, res, next) => {
  try {
    // allowlisting (or mass-assignment protection) - name the fields you accept instead of trusting the client/user
    const { name, category, contact } = req.body;
    const supplier = await Supplier.create({ name, category, contact });

    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
};

export const getSuppliers = async (req, res, next) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };

    if (category) {
      filter.category = category;
    }

    const suppliers = await Supplier.find(filter);

    res.status(200).json(suppliers);
  } catch (error) {
    next(error);
  }
};

export const getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findOne({ _id: id, isActive: true });

    if (!supplier) {
      return res.status(404).json({
        message: 'Supplier not found',
      });
    }

    res.status(200).json(supplier);
  } catch (error) {
    next(error);
  }
};

export const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, category, contact, isActive } = req.body;
    const updates = { name, category, contact, isActive };
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedSupplier) {
      return res.status(404).json({
        message: 'Supplier not found',
      });
    }

    res.status(200).json(updatedSupplier);
  } catch (error) {
    next(error);
  }
};
