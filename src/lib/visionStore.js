const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const TOKEN_KEY = 'oracle_admin_api_token';

export const DEFAULT_VISION = {
  heading: 'A Message From Our Founder',
  body: 'We believe legal guidance should be clear, considered and genuinely centered on the client.',
  createdAt: null,
  id: null,
};

function authHeaders() {
  const token = window.sessionStorage.getItem(TOKEN_KEY);
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || 'Request failed.');
  return data;
}

export function getToken() {
  return window.sessionStorage.getItem(TOKEN_KEY);
}

export async function loginAdmin(password) {
  const data = await request('/admin/login', {
    method: 'POST',
    body: JSON.stringify({ password }),
  });
  window.sessionStorage.setItem(TOKEN_KEY, data.token);
  return data;
}


export async function changeAdminPassword(currentPassword, newPassword) {
  return request('/admin/change-password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}
export async function logoutAdmin() {
  try { await request('/admin/logout', { method: 'POST' }); } finally {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }
}

export async function getVisionMessages() {
  return request('/vision/messages', { method: 'GET' });
}

export async function addVisionMessage({ heading, body }) {
  return request('/vision/messages', {
    method: 'POST',
    body: JSON.stringify({ heading, body }),
  });
}

export async function deleteVisionMessage(id) {
  await request(`/vision/messages/${id}`, { method: 'DELETE' });
}

export async function clearVisionMessages() {
  await request('/vision/messages', { method: 'DELETE' });
}

// Kept for compatibility with older imports.
export async function getVision() {
  const messages = await getVisionMessages();
  return messages[0] || DEFAULT_VISION;
}
