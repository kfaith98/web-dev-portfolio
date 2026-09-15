import Event from '../models/Event.js';

const verifyEventOwnership = async (req, res, next) => {
  try {
    const { eventId } = req.params;

    const event = await Event.findOne({
      _id: eventId,
      ownerId: req.user._id,
      isActive: true,
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    req.event = event;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyEventOwnership;