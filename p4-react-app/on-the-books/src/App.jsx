import { Routes, Route } from "react-router-dom";
import { EventsProvider } from "./context/EventsContext";
import EventsList from "./pages/EventsList";
import EventDetail from "./pages/EventDetail";
import Layout from "./components/Layout";

function App() {
  return (
    <>
      <EventsProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<EventsList />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Route>
        </Routes>
      </EventsProvider>
    </>
  );
}

export default App;
