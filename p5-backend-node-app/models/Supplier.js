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

// export const CATEGORIES = [
//   "Venue",
//   "Catering/F&B",
//   "Styling & Décor",
//   "Technical Production",
//   "Experiential Activations",
//   "Entertainment/Talent",
//   "Photography & Videography",
//   "Fabrication & Signage",
//   "Registration & Guest Management",
//   "Event Merchandise & Souvenirs",
//   "Logistics",
//   "Others",
// ];

// export const STATUSES = ["booked", "contacted", "quoted", "declined"];

// export const STATUS_STYLES = {
//   contacted: { background: "#DBEAFE", color: "#1E40AF" }, // blue  — early, just reached out
//   quoted: { background: "#FEF3C7", color: "#92400E" }, // amber — in progress, awaiting decision
//   booked: { background: "#DCFCE7", color: "#166534" }, // green — locked in
//   declined: { background: "#FEE2E2", color: "#991B1B" }, // red   — not happening
// };

// export const FALLBACK = { background: "#F3F4F6", color: "#374151" }; // neutral gray

// export const formatPeso = (n) =>
//   new Intl.NumberFormat("en-PH", {
//     style: "currency",
//     currency: "PHP",
//     maximumFractionDigits: 0,
//   }).format(n);

// export const formatDate = (iso) =>
//   new Date(iso).toLocaleDateString("en-PH", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
