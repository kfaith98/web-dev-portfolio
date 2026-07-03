import { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import styles from "../css/EventModal.module.css";

export default function EventModal({ onClose, event, onSaved }) {
  const [name, setName] = useState(event?.name ?? "");
  const [date, setDate] = useState(event?.date ?? "");
  const [location, setLocation] = useState(event?.location ?? "");
  const { dispatch } = useContext(EventsContext);

  const handleSave = () => {
    if (event) {
      dispatch({
        type: "EDIT_EVENT",
        id: event.id,
        event: { name, date, location },
      });
      onSaved?.();
    } else {
      dispatch({ type: "ADD_EVENT", event: { name, date, location } });
    }
    onClose();
  };

  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal-panel"]}>
        <h2>{event ? "Edit Event" : "Add Event"}</h2>
        <button type="button" onClick={onClose} className={styles["close-btn"]}>
          ×
        </button>

        <div className={styles["event-fields"]}>
          <label>Name</label>
          <input
            type="text"
            placeholder="EPI 40th Anniversary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles["event-fields"]}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles["event-fields"]}>
          <label>Location</label>
          <input
            type="text"
            placeholder="Casa Buenas, Newport"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className={styles["action-btns"]}>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className={"btn-primary"}
          >
            Save
          </button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
