import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { name, date, venue, budget } = req.body;
    const event = await Event.create({
      name,
      date,
      venue,
      budget,
      ownerId: req.user._id,
    });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ ownerId: req.user._id, isActive: true });

    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({
      _id: id,
      ownerId: req.user._id,
      isActive: true,
    });

    if (!event) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const allowed = ['name', 'date', 'venue', 'budget', 'isActive'];
    const updates = {};

    for (const key of allowed) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: id, ownerId: req.user._id },
      updates,
      { new: true, runValidators: true },
    );

    if (!updatedEvent) {
      return res.status(404).json({
        message: 'Event not found',
      });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};
