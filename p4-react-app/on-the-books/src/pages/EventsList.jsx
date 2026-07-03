import { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import styles from "../css/EventsList.module.css";

function EventsList() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useContext(EventsContext);

  return (
    <div>
      <div className={styles["event-title"]}>
        <h1>Events</h1>
        <button onClick={() => setIsOpen(true)} className={"btn-primary"}>
          Add Event
        </button>

        {state.length === 0 ? (
          <div className="empty-state">
            <p>No events yet. Add one to get started.</p>
          </div>
        ) : (
          <div className={styles["event-card"]}>
            {state.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
      {isOpen && <EventModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default EventsList;
