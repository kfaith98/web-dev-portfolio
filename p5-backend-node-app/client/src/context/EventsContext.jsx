import { createContext, useReducer, useEffect } from 'react';
import { eventsReducer } from '../reducer';
import { getEvents } from '../api';

export const EventsContext = createContext(null);

function init() {
  return [];
}

export function EventsProvider({ children }) {
  const [state, dispatch] = useReducer(eventsReducer, undefined, init);

  useEffect(() => {
    async function loadEvents() {
      try {
        const events = await getEvents();
        dispatch({ type: 'SET_EVENTS', events });
      } catch (err) {
        console.error(err);
      }
    }
    loadEvents();
  }, []);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
}
