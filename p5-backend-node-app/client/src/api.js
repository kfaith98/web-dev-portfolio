const BASE_URL = import.meta.env.VITE_API_URL;

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

export async function getEvents() {
  const res = await request('/events');
  return Array.isArray(res) ? res : (res.data ?? []);
}

export async function getArrangements(eventId) {
  const res = await request(`/events/${eventId}/arrangements`);
  return Array.isArray(res) ? res : (res.data ?? []);
}

export async function createEvent(eventData) {
  const res = await request('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  });
  return res.data ?? res;
}