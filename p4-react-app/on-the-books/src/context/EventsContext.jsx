import { createContext, useReducer, useEffect } from "react";
import { eventsReducer } from "../reducer";
import { fakeEvents } from "../data/fakeData";

export const EventsContext = createContext(null);

// P5 SEAM: localStorage is the stand-in persistence layer.
// Swap getItem/setItem here for real backend fetch/save calls.
function init() {
  try {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : fakeEvents;
  } catch {
    return fakeEvents;
  }
}

export function EventsProvider({ children }) {
  const [state, dispatch] = useReducer(eventsReducer, undefined, init);

  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(state));
  }, [state]);

  return (
    <EventsContext.Provider value={{ state, dispatch }}>
      {children}
    </EventsContext.Provider>
  );
}