import { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import styles from "../css/EventsList.module.css";

function EventsList() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useContext(EventsContext);
  const sortedEvents = [...state].sort((a, b) => a.date.localeCompare(b.date));

  return (
    <div>
      <div className={styles["event-container"]}>
        <div className={styles["events-header"]}>
          <h1>My Events</h1>
          <button
            onClick={() => setIsOpen(true)}
            className={`btn-primary ${styles["add-event"]}`}
          >
            Add Event
          </button>
        </div>

        {state.length === 0 ? (
          <div className="empty-state">
            <p>No events yet. Add one to get started.</p>
          </div>
        ) : (
          <div className={styles["event-card"]}>
            {sortedEvents.map((event) => (
              <EventCard key={event._id} event={event} />
            ))}
          </div>
        )}
      </div>
      {isOpen && <EventModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default EventsList;
