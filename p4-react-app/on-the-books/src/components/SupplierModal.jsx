import { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import { CATEGORIES, STATUSES } from "../data/constants";

export default function SupplierModal({ eventId, onClose, supplier, onSaved }) {
  const [name, setName] = useState(supplier?.name ?? "");
  const [category, setCategory] = useState(supplier?.category ?? "");
  const [budget, setBudget] = useState(supplier?.budget ?? "");
  const [contact, setContact] = useState(supplier?.contact ?? "");
  const [status, setStatus] = useState(supplier?.status ?? "contacted");
  const [notes, setNotes] = useState(supplier?.notes ?? "");

  const { dispatch } = useContext(EventsContext);

  const handleSave = () => {
    if (supplier) {
      dispatch({
        type: "EDIT_SUPPLIER",
        eventId,
        supplierId: supplier.id,
        supplier: { name, category, budget, contact, status, notes },
      });
      onSaved?.();
    } else {
      dispatch({
        type: "ADD_SUPPLIER",
        eventId,
        supplier: { name, category, budget, contact, status, notes },
      });
    }
    onClose();
  };

  return (
    <div>
      <div>
        <h2>{supplier ? "Edit Supplier" : "Add Supplier"}</h2>
        <button type="button" onClick={onClose}>
          ×
        </button>

        <label>Name</label>
        <input
          type="text"
          placeholder="DREAM Production"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Category</label>
        <select
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select category…</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <br />
        <label>Quote/Budget</label>
        <input
          type="text"
          placeholder="₱50,000"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
        />
        <br />
        <label>Contact</label>
        <input
          type="text"
          placeholder="Juan Dela Cruz"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <br />
        <label>Status</label>
        <select
          name="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <br />
        <label>Notes</label>
        <textarea
          placeholder="Sent menu request, no reply yet."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>

        <button
          type="button"
          onClick={handleSave}
          disabled={!name.trim() || !category}
        >
          Save
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
