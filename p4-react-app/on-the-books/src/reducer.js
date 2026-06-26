export function eventsReducer(state, action) {
  switch (action.type) {
    case "ADD_EVENT": {
      const newEvent = {
        id: crypto.randomUUID(),
        name: action.name,
        date: action.date,
        location: action.location,
        suppliers: [],
      };
      return [...state, newEvent];
    }
    case "EDIT_EVENT": {
      return state.map((event) =>
        event.id === action.id
          ? {
              ...event,
              name: action.name,
              date: action.date,
              location: action.location,
            }
          : event,
      );
    }
    case "DELETE_EVENT": {
      return state.filter((event) => event.id !== action.id);
    }

    default:
      return state;
  }
}