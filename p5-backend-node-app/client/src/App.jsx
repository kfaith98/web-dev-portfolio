import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { EventsProvider } from './context/EventsContext';
import { clearSession } from './api';
import EventsList from './pages/EventsList';
import EventDetail from './pages/EventDetail';
import Layout from './components/Layout';
import Login from './pages/Login';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  function handleLogout() {
    clearSession();
    setToken(null);
    navigate('/', { replace: true });
  }

  const navigate = useNavigate();

  if (!token) {
    return <Login onLogin={() => setToken(localStorage.getItem('token'))} />;
  }

  return (
    <>
      <EventsProvider>
        <Routes>
          <Route element={<Layout onLogout={handleLogout} />}>
            <Route path="/" element={<EventsList />} />
            <Route path="/events/:id" element={<EventDetail />} />
          </Route>
        </Routes>
      </EventsProvider>
    </>
  );
}

export default App;
