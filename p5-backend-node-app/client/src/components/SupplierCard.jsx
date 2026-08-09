import { useState, useContext } from 'react';
import { EventsContext } from '../context/EventsContext';
import SupplierModal from './SupplierModal';
import StatusBadge from './StatusBadge';
import { STATUSES, formatPeso } from '../data/constants';
import { updateArrangement } from '../api';
import styles from '../css/SupplierCard.module.css';

export default function SupplierCard({ supplier, eventId, onChanged }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { dispatch } = useContext(EventsContext);

  const handleSaved = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleStatusChange = async (e) => {
    try {
      await updateArrangement(eventId, supplier._id, {
        status: e.target.value,
      });

      await onChanged();
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Delete this supplier?')) {
      dispatch({
        type: 'DELETE_SUPPLIER',
        eventId: eventId,
        supplierId: supplier._id,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles['supplier-card']}>
      <h3 className={styles['supplier-name']}>
        {supplier.supplierId.name}
      </h3>

      <p className={styles['details']}>
        {supplier.supplierId.category} · {supplier.supplierId.contact} ·{' '}
        {formatPeso(supplier.budget)}
      </p>

      <p className={styles['notes']}>{supplier.notes}</p>

      <StatusBadge status={supplier.status} />

      <label className={styles['badge-change']}>
        Change:{' '}
        <select
          name="status"
          value={supplier.status}
          onChange={handleStatusChange}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>

      <br />

      <div className={styles['card-actions']}>
        <button
          type="button"
          onClick={handleEdit}
          className="btn-edit"
        >
          Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
          className="btn-danger"
        >
          Delete
        </button>
      </div>

      {isEditing && (
        <SupplierModal
          eventId={eventId}
          supplier={supplier}
          onClose={() => setIsEditing(false)}
          onSaved={handleSaved}
        />
      )}

      {showToast && <div className="toast">Saved ✓</div>}
    </div>
  );
}