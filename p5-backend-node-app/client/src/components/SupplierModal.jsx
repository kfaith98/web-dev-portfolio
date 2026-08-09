import { useState, useContext } from 'react';
import { EventsContext } from '../context/EventsContext';
import { CATEGORIES, STATUSES } from '../data/constants';
import { updateArrangement } from '../api';
import styles from '../css/SupplierModal.module.css';

export default function SupplierModal({
  eventId,
  onClose,
  supplier,
  onSaved,
  onChanged,
}) {
  const { dispatch } = useContext(EventsContext);

  const [form, setForm] = useState({
    name: supplier?.supplierId?.name ?? '',
    category: supplier?.supplierId?.category ?? '',
    budget: supplier?.budget ?? '',
    contact: supplier?.supplierId?.contact ?? '',
    status: supplier?.status ?? 'contacted',
    notes: supplier?.notes ?? '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const cleanBudget =
      Number(String(form.budget).replace(/[^0-9.]/g, '')) || 0;
    const supplierData = { ...form, budget: cleanBudget };

    if (supplier) {
      try {
        await updateArrangement(eventId, supplier._id, {
          budget: cleanBudget,
          status: form.status,
          notes: form.notes,
        });
        await onChanged();
        onSaved?.();
        onClose();
      } catch (err) {
        alert(err.message);
      }
    } else {
      dispatch({
        type: 'ADD_SUPPLIER',
        eventId,
        supplier: supplierData,
      });
    }
  };

  return (
    <div className={styles['modal-backdrop']}>
      <div className={styles['modal-panel']}>
        <h2>{supplier ? 'Edit Supplier' : 'Add Supplier'}</h2>
        <button type="button" onClick={onClose} className={styles['close-btn']}>
          ×
        </button>

        <div className={styles['supplier-fields']}>
          <label htmlFor="supplier-name">Name</label>
          <input
            id="supplier-name"
            disabled={!!supplier}
            name="name"
            type="text"
            placeholder="DREAM Production"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles['supplier-fields']}>
          <label htmlFor="supplier-category">Category</label>
          <select
            id="supplier-category"
            disabled={!!supplier}
            name="category"
            value={form.category}
            onChange={handleChange}
          >
            <option value="">Select category…</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles['supplier-fields']}>
          <label htmlFor="supplier-budget">Quote/Budget</label>
          <input
            id="supplier-budget"
            name="budget"
            type="text"
            placeholder="₱50,000"
            value={form.budget}
            onChange={handleChange}
          />
        </div>

        <div className={styles['supplier-fields']}>
          <label htmlFor="supplier-contact">Contact</label>
          <input
            id="supplier-contact"
            disabled={!!supplier}
            name="contact"
            type="text"
            placeholder="Juan Dela Cruz"
            value={form.contact}
            onChange={handleChange}
          />
        </div>

        <div className={styles['supplier-fields']}>
          <label htmlFor="supplier-status">Status</label>
          <select
            id="supplier-status"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className={styles['supplier-fields']}>
          <label htmlFor="supplier-notes">Notes</label>
          <textarea
            id="supplier-notes"
            name="notes"
            placeholder="Sent menu request, no reply yet."
            value={form.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles['action-btns']}>
          <button
            type="button"
            onClick={handleSave}
            disabled={!form.name.trim() || !form.category}
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
