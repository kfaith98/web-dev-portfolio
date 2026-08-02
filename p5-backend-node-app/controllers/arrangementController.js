import Arrangement from '../models/Arrangement.js';

export const createArrangement = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { supplierId, budget, status, notes } = req.body;
    const arrangement = await Arrangement.create({
      eventId,
      supplierId,
      budget,
      status,
      notes,
    });

    res.status(201).json(arrangement);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getArrangements = async (req, res) => {
  try {
    const { eventId } = req.params;
    const arrangements = await Arrangement.find({ eventId: eventId }).populate(
      'supplierId',
    );

    res.status(200).json(arrangements);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getArrangementById = async (req, res) => {
  try {
    const { id } = req.params;
    const arrangement = await Arrangement.findOne({ _id: id }).populate(
      'supplierId',
    );

    if (!arrangement) {
      return res.status(404).json({
        message: 'Arrangement not found',
      });
    }

    res.status(200).json(arrangement);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const updateArrangement = async (req, res) => {
  try {
    const { id } = req.params;
    const { supplierId, budget, status, notes } = req.body;
    const updates = { supplierId, budget, status, notes };
    const updatedArrangement = await Arrangement.findByIdAndUpdate(
      id,
      updates,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedArrangement) {
      return res.status(404).json({
        message: 'Arrangement not found',
      });
    }

    res.status(200).json(updatedArrangement);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const deleteArrangement = async (req, res) => {
  try {
    const deletedArrangement = await Arrangement.findByIdAndDelete(
      req.params.id,
    );

    if (!deletedArrangement) {
      return res.status(404).json({
        message: 'Arrangement not found',
      });
    }

    res.status(200).json({
      message: 'Arrangement deleted successfully',
      arrangement: deletedArrangement,
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
