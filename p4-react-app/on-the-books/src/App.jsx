import { Routes, Route } from 'react-router-dom'
import EventsList from './pages/EventsList'
import EventDetail from './pages/EventDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<EventsList />} />
      <Route path="/events/:id" element={<EventDetail />} />
    </Routes>
  )
}

export default App