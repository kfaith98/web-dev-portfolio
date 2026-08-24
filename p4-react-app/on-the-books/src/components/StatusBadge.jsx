import { STATUS_STYLES, FALLBACK } from "../data/constants";

export default function StatusBadge({ status }) {
  const palette = STATUS_STYLES[status] ?? FALLBACK;
  return (
    <span
      style={{
        ...palette,
        padding: "2px 10px",
        borderRadius: "9999px",
        fontSize: "0.75rem",
        fontWeight: 600,
        textTransform: "capitalize", // displays "Booked"; stored value stays "booked"
        display: "inline-block",
      }}
    >
      {status}
    </span>
  );
}