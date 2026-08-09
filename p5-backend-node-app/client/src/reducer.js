export function eventsReducer(state, action) {
  switch (action.type) {
    case 'SET_EVENTS': {
      return action.events;
    }
    case 'ADD_EVENT': {
      const newEvent = {
        id: crypto.randomUUID(),
        ...action.event,
        suppliers: [],
      };
      return [...state, newEvent];
    }
    case 'EDIT_EVENT': {
      return state.map((event) =>
        event.id === action.id
          ? {
              ...event,
              ...action.event,
            }
          : event,
      );
    }
    case 'DELETE_EVENT': {
      return state.filter((event) => event.id !== action.id);
    }
    case 'ADD_SUPPLIER': {
      const newEventSupplier = { id: crypto.randomUUID(), ...action.supplier };
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              suppliers: [...event.suppliers, newEventSupplier],
            }
          : event,
      );
    }
    case 'EDIT_SUPPLIER': {
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              suppliers: event.suppliers.map((supplier) =>
                supplier.id === action.supplierId
                  ? {
                      ...supplier,
                      ...action.supplier,
                    }
                  : supplier,
              ),
            }
          : event,
      );
    }
    case 'DELETE_SUPPLIER': {
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              suppliers: event.suppliers.filter(
                (supplier) => supplier.id !== action.supplierId,
              ),
            }
          : event,
      );
    }
    case 'UPDATE_STATUS': {
      return state.map((event) =>
        event.id === action.eventId
          ? {
              ...event,
              suppliers: event.suppliers.map((supplier) =>
                supplier.id === action.supplierId
                  ? {
                      ...supplier,
                      status: action.status,
                    }
                  : supplier,
              ),
            }
          : event,
      );
    }

    default:
      return state;
  }
}
