import { CATEGORIES, STATUSES } from "../data/constants";

export default function SupplierModal({ onClose }) {
  return (
    <div>
      <div>
        <h2>Add Supplier</h2>
        <button type="button" onClick={onClose}>×</button>
        <form>
          <label>Name</label>
          <input type="text" placeholder="DREAM Production" />
          <br />
          <label>Category</label>
          <select name="category">
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <br />
          <label>Quote/Budget</label>
          <input type="text" placeholder="₱50,000" />
          <br />
          <label>Contact</label>
          <input type="text" placeholder="Juan Dela Cruz" />
          <br />
          <label>Status</label>
          <select name="status">
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
          <br />
          <label>Notes</label>
          <textarea placeholder="Sent menu request, no reply yet."></textarea>
        </form>
        <button type="button">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}