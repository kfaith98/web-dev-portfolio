export const CATEGORIES = [
    "Venue", 
    "Catering/F&B", 
    "Styling & Décor", 
    "Technical Production", 
    "Experiential Activations", 
    "Entertainment/Talent", 
    "Photography & Videography", 
    "Fabrication & Signage", 
    "Registration & Guest Management", 
    "Event Merchandise & Souvenirs",
    "Logistics", 
    "Others"
];

export const STATUSES = [
    "booked",
    "contacted", 
    "quoted",  
    "declined"
];

export const STATUS_STYLES = {
  contacted: { background: "#DBEAFE", color: "#1E40AF" }, // blue  — early, just reached out
  quoted:    { background: "#FEF3C7", color: "#92400E" }, // amber — in progress, awaiting decision
  booked:    { background: "#DCFCE7", color: "#166534" }, // green — locked in
  declined:  { background: "#FEE2E2", color: "#991B1B" }, // red   — not happening
};

export const FALLBACK = { background: "#F3F4F6", color: "#374151" }; // neutral gray