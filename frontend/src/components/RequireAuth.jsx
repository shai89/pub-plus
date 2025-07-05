import React from 'react';
import { Navigate } from 'react-router-dom';
import { getValidAccessToken } from '../utils/auth';

export default function RequireAuth({ children }) {
  const token = getValidAccessToken();

  if (!token) {
    // No token or token expired → redirect to login
    return <Navigate to="/login" replace />;
  }

  // Token is valid → render protected content
  return children;
}
