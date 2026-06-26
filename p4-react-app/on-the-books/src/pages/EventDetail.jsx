import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fakeEvents } from "../data/fakeData";
import SupplierCard from "../components/SupplierCard";
import SupplierModal from "../components/SupplierModal";

function EventDetail() {
  const { id } = useParams();
  const event = fakeEvents[0];

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>Event Detail — id: {id}</h1>
      <Link to="/">← Back to events</Link>
      <br />
      <button onClick={() => setIsOpen(true)}>Add Supplier</button>
      <div style={{ display: "grid", gap: 12 }}>
        {event.suppliers.map((supplier) => (
          <SupplierCard key={supplier.id} supplier={supplier} />
        ))}
      </div>
      {isOpen && <SupplierModal onClose={() => setIsOpen(false)} />}
    </div>
  );
}

export default EventDetail;