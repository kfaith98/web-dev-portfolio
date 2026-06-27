import { useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { EventsContext } from "../context/EventsContext";
import SupplierCard from "../components/SupplierCard";
import SupplierModal from "../components/SupplierModal";

function EventDetail() {
  const { id } = useParams();
  const { state } = useContext(EventsContext);
  const [isOpen, setIsOpen] = useState(false);

  const event = state.find((e) => e.id === id);

  if (!event) {
    return "Event not found.";
  }

  return (
    <div>
      <h1>Event Detail — id: {id}</h1>
      <Link to="/">← Back to events</Link>
      <br />
      <button onClick={() => setIsOpen(true)}>Add Supplier</button>
      <div style={{ display: "grid", gap: 12 }}>
        {event.suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} eventId={event.id} />
        ))}
      </div>
      {isOpen && <SupplierModal eventId={event.id} onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default EventDetail;