import { useState, useContext } from "react";
import EventModal from "./EventModal";
import { EventsContext } from "../context/EventsContext";
import { Link } from "react-router-dom";
import styles from "../css/EventCard.module.css";

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
        <div className={styles["event-card"]}>
          <h3>{event.name}</h3>
          <p>
            {event.date} · {event.location}
          </p>
          <p>{event.suppliers.length} suppliers</p>
          <div className={styles["card-actions"]}>
            <button type="button" onClick={handleEdit}>
              Edit
            </button>
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      </Link>
      {isEditing && (
        <EventModal
          event={event}
          onClose={() => setIsEditing(false)}
          onSaved={handleSaved}
        />
      )}
      {showToast && <div className={"toast"}>Saved ✓</div>}
    </>
  );
}
