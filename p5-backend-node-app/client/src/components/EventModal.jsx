import { useState, useContext } from 'react';
import { EventsContext } from '../context/EventsContext';
import { createEvent, updateEvent } from '../api';
import styles from '../css/EventModal.module.css';

export default function EventModal({ onClose, event, onSaved }) {
  const [name, setName] = useState(event?.name ?? '');
  const [date, setDate] = useState(event?.date?.slice(0, 10) ?? '');
  const [venue, setVenue] = useState(event?.venue ?? '');
  const [error, setError] = useState('');
  const { dispatch } = useContext(EventsContext);

  const handleSave = async () => {
    if (event) {
      try {
        await updateEvent(event._id, { name, date, venue });
        dispatch({
          type: 'EDIT_EVENT',
          id: event._id,
          event: { name, date, venue },
        });
        onSaved?.();
        onClose();
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        const saved = await createEvent({ name, date, venue });
        dispatch({ type: 'ADD_EVENT', event: saved });
        onClose();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-panel']}>
        <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="button" onClick={onClose} className={styles['close-btn']}>
          ×
        </button>

        <div className={styles['event-fields']}>
          <label htmlFor="event-name">Name</label>
          <input
            id="event-name"
            type="text"
            placeholder="EPI 40th Anniversary"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles['event-fields']}>
          <label htmlFor="event-date">Date</label>
          <input
            id="event-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles['event-fields']}>
          <label htmlFor="event-venue">Venue</label>
          <input
            id="event-location"
            type="text"
            placeholder="Casa Buenas, Newport"
            value={venue}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div className={styles['action-btns']}>
          <button
            type="button"
            onClick={handleSave}
            disabled={!name.trim()}
            className={'btn-primary'}
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
