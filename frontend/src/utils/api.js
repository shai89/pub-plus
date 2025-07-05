// 📁 src/utils/api.js
export async function apiRequest(endpoint, options = {}) {
  const BASE_URL = 'http://localhost:8000';
  const token = localStorage.getItem('accessToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers,
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData?.detail || 'API Error');
    }

    return await response.json();
  } catch (err) {
    console.error(`API Error [${endpoint}]`, err);
    throw err;
  }
}
