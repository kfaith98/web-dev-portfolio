export function eventsReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENTS': {
      return action.events;
    }
    case 'ADD_EVENT': {
      return [...state, action.event];
    }
    case 'EDIT_EVENT': {
      return state.map((event) =>
        event._id === action.id
          ? {
              ...event,
              ...action.event,
            }
          : event,
      );
    }
    case 'DELETE_EVENT': {
      return state.filter((event) => event._id !== action.id);
    }

    default:
      return state;
  }
}
