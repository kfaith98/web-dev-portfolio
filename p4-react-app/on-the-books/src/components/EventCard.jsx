import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <Link
      to={`/events/${event.id}`}
      style={{ textDecoration: "none", color: "inherit" }}
    >
      <div
        style={{
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          padding: "16px 20px",
          background: "#fff",
        }}
      >
        <h3 style={{ margin: "0 0 6px" }}>{event.name}</h3>
        <p style={{ margin: 0, color: "#6B7280", fontSize: "0.9rem" }}>
          {event.date} · {event.location}
        </p>
        <p style={{ margin: "8px 0 0", color: "#6B7280", fontSize: "0.85rem" }}>
          {event.suppliers.length} suppliers
        </p>
      </div>
    </Link>
  );
}