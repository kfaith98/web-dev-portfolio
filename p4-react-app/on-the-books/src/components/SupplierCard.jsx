import { useState, useContext } from "react";
import { EventsContext } from "../context/EventsContext";
import SupplierModal from "./SupplierModal";
import StatusBadge from "./StatusBadge";
import { STATUSES } from "../data/constants";
import styles from "../css/SupplierCard.module.css";

export default function SupplierCard({ supplier, eventId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { dispatch } = useContext(EventsContext);

  const handleSaved = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleDelete = () => {
    if (window.confirm("Delete this supplier?")) {
      dispatch({
        type: "DELETE_SUPPLIER",
        eventId: eventId,
        supplierId: supplier.id,
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return (
    <div className={styles["supplier-card"]}>
      <h3 style={{ margin: "0 0 6px" }}>{supplier.name}</h3>
      <p style={{ margin: 0, color: "#6B7280", fontSize: "0.9rem" }}>
        {supplier.category} · {supplier.contact} · {supplier.budget}
      </p>
      <p style={{ margin: "8px 0 0", color: "#6B7280", fontSize: "0.85rem" }}>
        {supplier.notes}
      </p>
      <StatusBadge status={supplier.status} />
      <label style={{ fontSize: "0.8rem", color: "#6B7280" }}>
        Change:{" "}
        <select
          name="status"
          value={supplier.status}
          onChange={(e) =>
            dispatch({
              type: "UPDATE_STATUS",
              eventId,
              supplierId: supplier.id,
              status: e.target.value,
            })
          }
        >
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div className={styles["card-actions"]}>
        <button type="button" onClick={handleEdit}>
          Edit
        </button>
        <button type="button" onClick={handleDelete} className={"btn-danger"}>
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
      {showToast && <div>Saved ✓</div>}
    </div>
  );
}
