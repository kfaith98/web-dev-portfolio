import { Link } from 'react-router-dom'

function EventsList() {
  return (
    <div>
      <h1>Events</h1>
      <Link to="/events/1">Go to event 1 →</Link>
    </div>
  )
}

export default EventsList