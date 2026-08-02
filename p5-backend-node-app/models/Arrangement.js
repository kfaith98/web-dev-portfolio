import mongoose from 'mongoose';

const arrangementSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    supplierId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Supplier',
      required: true,
    },
    budget: {
      type: Number,
    },
    status: {
      type: String,
      enum: ['booked', 'contacted', 'quoted', 'declined'],
      required: true,
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const Arrangement = mongoose.model('Arrangement', arrangementSchema);

export default Arrangement;