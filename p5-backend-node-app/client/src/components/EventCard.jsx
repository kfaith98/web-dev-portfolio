import { useState, useContext } from 'react';
import EventModal from './EventModal';
import { EventsContext } from '../context/EventsContext';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../data/constants';
import { deleteEvent } from '../api';
import styles from '../css/EventCard.module.css';

export default function EventCard({ event }) {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { dispatch } = useContext(EventsContext);

  const handleSaved = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (window.confirm('Delete this event?')) {
      try {
        await deleteEvent(event._id);
        dispatch({ type: 'DELETE_EVENT', id: event._id });
      } catch (err) {
        alert(err.message);
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  return (
    <>
      <div
        className={styles['event-card']}
        onClick={() => navigate(`/events/${event._id}`)}
        style={{ cursor: 'pointer' }}
      >
        <h3>{event.name}</h3>
        <p>
          {formatDate(event.date)} · {event.venue}
        </p>
        <p>{event.suppliers?.length ?? 0} suppliers</p>
        {/* <p>{event.suppliers.length} supplier{event.suppliers.length !== 1 && "s"}</p> */}
        <div className={styles['card-actions']}>
          <button type="button" onClick={handleEdit} className={'btn-edit'}>
            Edit
          </button>
          <button type="button" onClick={handleDelete} className={'btn-danger'}>
            Delete
          </button>
        </div>
      </div>
      {isEditing && (
        <EventModal
          event={event}
          onClose={() => setIsEditing(false)}
          onSaved={handleSaved}
        />
      )}
      {showToast && <div className={'toast'}>Saved ✓</div>}
    </>
  );
}
