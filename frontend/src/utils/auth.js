// 📁 src/utils/auth.js

// Constants
const MS_IN_SECOND = 1000;
const EXPIRY_BUFFER_MINUTES = 1; // Token is considered expired if less than 5 minutes left
const EXPIRY_BUFFER_MS = EXPIRY_BUFFER_MINUTES * 60 * MS_IN_SECOND;

/**
 * Parse a JWT token and return its payload (decoded base64)
 */
export function parseJwt(token) {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (err) {
    console.error('Invalid JWT:', err);
    return null;
  }
}

/**
 * Check if a JWT token is expired or close to expiring
 */
export function isTokenExpired(token) {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return true;

  const expiryTimeMs = payload.exp * MS_IN_SECOND;
  const now = Date.now();

  return expiryTimeMs - now < EXPIRY_BUFFER_MS;
}

/**
 * Get access token from localStorage and validate it
 */
export function getValidAccessToken() {
  const token = localStorage.getItem('accessToken');
  if (!token || isTokenExpired(token)) {
    return null;
  }
  return token;
}
