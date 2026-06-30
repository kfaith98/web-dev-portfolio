import { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import { CATEGORIES, STATUSES } from "../data/constants";
import styles from "../css/SupplierModal.module.css";

export default function SupplierModal({ eventId, onClose, supplier, onSaved }) {
  const { dispatch } = useContext(EventsContext);

  const [form, setForm] = useState({
    name: supplier?.name ?? "",
    category: supplier?.category ?? "",
    budget: supplier?.budget ?? "",
    contact: supplier?.contact ?? "",
    status: supplier?.status ?? "contacted",
    notes: supplier?.notes ?? "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (supplier) {
      dispatch({
        type: "EDIT_SUPPLIER",
        eventId,
        supplierId: supplier.id,
        supplier: form,
      });
      onSaved?.();
    } else {
      dispatch({
        type: "ADD_SUPPLIER",
        eventId,
        supplier: form,
      });
    }
    onClose();
  };

  return (
    <div className={styles["modal-backdrop"]}>
      <div className={styles["modal-panel"]}>
        <h2>{supplier ? "Edit Supplier" : "Add Supplier"}</h2>
        <button type="button" onClick={onClose} className={styles["close-btn"]}>
          ×
        </button>

        <div className={styles["supplier-fields"]}>
          <label>Name</label>
          <input
            name="name"
            type="text"
            placeholder="DREAM Production"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles["supplier-fields"]}>
          <label>Category</label>
          <select name="category" value={form.category} onChange={handleChange}>
            <option value="">Select category…</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["supplier-fields"]}>
          <label>Quote/Budget</label>
          <input
            name="budget"
            type="text"
            placeholder="₱50,000"
            value={form.budget}
            onChange={handleChange}
          />
        </div>

        <div className={styles["supplier-fields"]}>
          <label>Contact</label>
          <input
            name="contact"
            type="text"
            placeholder="Juan Dela Cruz"
            value={form.contact}
            onChange={handleChange}
          />
        </div>

        <div className={styles["supplier-fields"]}>
          <label>Status</label>
          <select name="status" value={form.status} onChange={handleChange}>
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className={styles["supplier-fields"]}>
          <label>Notes</label>
          <textarea
            name="notes"
            placeholder="Sent menu request, no reply yet."
            value={form.notes}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className={styles["action-btns"]}>
          <button
            type="button"
            onClick={handleSave}
            disabled={!form.name.trim() || !form.category}
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
