const BASE_URL = import.meta.env.VITE_API_URL;

export function clearSession() {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
}

// Free Render instances sleep when idle; ping the health route so it starts booting early
export function wakeServer() {
  fetch(new URL(BASE_URL).origin).catch(() => {});
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',

    ...(token && { Authorization: `Bearer ${token}` }),

    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  // 204 has no body; anything non-JSON shouldn't be parsed either
  const isJson = res.headers.get('content-type')?.includes('application/json');

  const data = isJson ? await res.json() : null;

  // Expired or invalid token: drop it and send the user back to login.
  // Only when a token was sent, so a wrong password at login still shows its error.
  if (res.status === 401 && token) {
    clearSession();
    window.location.assign('/');
    throw new Error('Your session expired. Please log in again.');
  }

  if (!res.ok) {
    throw new Error(data?.message || 'Request failed');
  }

  return data;
}

// --- endpoint functions ---
export async function login(username, password) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
  });
}

export async function createEvent(eventData) {
  const res = await request('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
  return res.data ?? res;
}

export async function getEvents() {
  const res = await request('/events');
  return Array.isArray(res) ? res : (res.data ?? []);
}

export async function updateEvent(eventId, updates) {
  const res = await request(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
  return res.data ?? res;
}

export async function deleteEvent(eventId) {
  const res = await request(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify({ isActive: false }),
  });
  return res.data ?? res;
}

export async function createSupplier(supplierData) {
  const res = await request('/suppliers', {
    method: 'POST',
    body: JSON.stringify(supplierData),
  });
  return res.data ?? res;
}

export async function createArrangement(eventId, arrangementData) {
  const res = await request(`/events/${eventId}/arrangements`, {
    method: 'POST',
    body: JSON.stringify(arrangementData),
  });
  return res.data ?? res;
}

export async function getArrangements(eventId) {
  const res = await request(`/events/${eventId}/arrangements`);
  return Array.isArray(res) ? res : (res.data ?? []);
}

export async function updateArrangement(eventId, arrangementId, updates) {
  const res = await request(
    `/events/${eventId}/arrangements/${arrangementId}`,
    {
      method: 'PUT',
      body: JSON.stringify(updates),
    },
  );
  return res.data ?? res;
}

export async function deleteArrangement(eventId, arrangementId) {
  const res = await request(
    `/events/${eventId}/arrangements/${arrangementId}`,
    {
      method: 'DELETE',
    },
  );
  return res.data ?? res;
}

export async function getRecommendations(eventId) {
  const res = await request(`/events/${eventId}/recommendations`, {
    method: 'POST',
  });
  return res.data ?? res;
}
