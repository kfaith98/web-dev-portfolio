import mongoose from 'mongoose';

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    category: {
      type: String,
      enum: [
        'Venue',
        'Catering/F&B',
        'Styling & Décor',
        'Technical Production',
        'Experiential Activations',
        'Entertainment/Talent',
        'Photography & Videography',
        'Fabrication & Signage',
        'Registration & Guest Management',
        'Event Merchandise & Souvenirs',
        'Logistics',
        'Others',
      ],
      required: true,
    },
    contact: {
      type: String,
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const Supplier = mongoose.model('Supplier', supplierSchema);

export default Supplier;