import { createContext, useReducer, useEffect, useState } from 'react';
import { eventsReducer } from '../reducer';
import { getEvents, getArrangements } from '../api';

export const EventsContext = createContext(null);

function init() {
  return [];
}

export function EventsProvider({ children }) {
  const [state, dispatch] = useReducer(eventsReducer, undefined, init);
  const [eventsLoading, setEventsLoading] = useState(true);
  const [eventsError, setEventsError] = useState(null);

  async function loadEvents() {
    try {
      const events = await getEvents();

      const arrangementLists = await Promise.all(
        events.map((e) => getArrangements(e._id)),
      );

      const withCounts = events.map((event, i) => ({
        ...event,
        suppliers: arrangementLists[i],
      }));

      dispatch({ type: 'SET_EVENTS', events: withCounts });
      setEventsError(null);
    } catch (err) {
      console.error(err);
      setEventsError(err.message);
    } finally {
      setEventsLoading(false);
    }
  }

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <EventsContext.Provider
      value={{
        state,
        dispatch,
        eventsLoading,
        eventsError,
        reloadEvents: loadEvents,
      }}
    >
      {children}
    </EventsContext.Provider>
  );
}
