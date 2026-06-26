export default function EventModal({ onClose }) {
  return (
    <div>
      <div>
        <h2>Add Event</h2>
        <button type="button" onClick={onClose}>×</button>
        <form>
          <label>Name</label>
          <input type="text" placeholder="EPI 40th Anniversary" />
          <br />
          <label>Date</label>
          <input type="date" />
          <br />
          <label>Location</label>
          <input type="text" placeholder="Casa Buenas, Newport" />
        </form>
        <button type="button">Save</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </div>
  );
}
