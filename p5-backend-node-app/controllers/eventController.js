import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  try {
    const { name, date, venue, budget } = req.body;
    const event = await Event.create({ name, date, venue, budget });

    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ isActive: true });

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
    const event = await Event.findOne({ _id: id, isActive: true });

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
    const { name, date, venue, budget, isActive } = req.body;
    const updates = { name, date, venue, budget, isActive };
    const updatedEvent = await Event.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

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
