import { Routes, Route } from "react-router-dom";
import { EventsProvider } from "./context/EventsContext";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";

function App() {
  return (
    <>
      <EventsProvider>
        {
          <Routes>
            <Route path="/" element={<EventsList />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Routes>
        }
      </EventsProvider>
    </>
  );
}

export default App;