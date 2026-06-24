import { useParams, Link } from 'react-router-dom'

function EventDetail() {
  const { id } = useParams()
  return (
    <div>
      <h1>Event Detail — id: {id}</h1>
      <Link to="/">← Back to events</Link>
    </div>
  )
}

export default EventDetail