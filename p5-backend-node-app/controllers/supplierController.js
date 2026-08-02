import Supplier from '../models/Supplier.js';

export const createSupplier = async (req, res) => {
  try {
    // allowlisting (or mass-assignment protection) - name the fields you accept instead of trusting the client/user
    const { name, category, contact } = req.body;
    const supplier = await Supplier.create({ name, category, contact });

    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find({ isActive: true });

    res.status(200).json(suppliers);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
