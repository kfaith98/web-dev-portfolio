import StatusBadge from "./StatusBadge";

export default function SupplierCard({ supplier }) {
  return (
    <div
      style={{
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        padding: "16px 20px",
        background: "#fff",
      }}
    >
      <h3 style={{ margin: "0 0 6px" }}>{supplier.name}</h3>
      <p style={{ margin: 0, color: "#6B7280", fontSize: "0.9rem" }}>
        {supplier.category} · {supplier.contact} · {supplier.budget}
      </p>
      <p style={{ margin: "8px 0 0", color: "#6B7280", fontSize: "0.85rem" }}>
        {supplier.notes}
      </p>
      <StatusBadge status={supplier.status} />
    </div>
  );
}