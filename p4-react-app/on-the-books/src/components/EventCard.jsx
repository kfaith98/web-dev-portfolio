import { useState, useContext } from "react";
import EventModal from "./EventModal";
import { EventsContext } from "../context/EventsContext";
import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { dispatch } = useContext(EventsContext);

  const handleSaved = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Delete this event?")) {
      dispatch({ type: "DELETE_EVENT", id: event.id });
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <>
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
          <p
            style={{ margin: "8px 0 0", color: "#6B7280", fontSize: "0.85rem" }}
          >
            {event.suppliers.length} suppliers
          </p>
          <button type="button" onClick={handleEdit}>
            Edit
          </button>
          <button type="button" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </Link>
      {isEditing && (
        <EventModal event={event} onClose={() => setIsEditing(false)} onSaved={handleSaved}/>
      )}
      {showToast && <div>Saved ✓</div>} 
    </>
  );
}