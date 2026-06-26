import { useState } from "react";
import { Link } from "react-router-dom";
import { fakeEvents } from "../data/fakeData";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

function EventsList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 16px" }}>
        <h1>Events</h1>
        <button onClick={() => setIsOpen(true)}>Add Event</button>
        <div style={{ display: "grid", gap: 12 }}>
          {fakeEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
      {isOpen && <EventModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default EventsList;