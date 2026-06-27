import { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";

export default function EventModal({ onClose, event, onSaved }) {
  const [name, setName] = useState(event?.name ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const { dispatch } = useContext(EventsContext);

  const handleSave = () => {
    if (event) {
      dispatch({ type: "EDIT_EVENT", id: event.id, event: { name, date, location } });
      onSaved?.();
    } else {
      dispatch({ type: "ADD_EVENT", event: { name, date, location } });
    }
    onClose();
  };

  return (
    <div>
      <div>
        <h2>{event ? "Edit Event" : "Add Event"}</h2>
        <button type="button" onClick={onClose}>
          ×
        </button>

        <label>Name</label>
        <input
          type="text"
          placeholder="EPI 40th Anniversary"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <br />
        <label>Location</label>
        <input
          type="text"
          placeholder="Casa Buenas, Newport"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="button" onClick={handleSave} disabled={!name.trim()}>
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
