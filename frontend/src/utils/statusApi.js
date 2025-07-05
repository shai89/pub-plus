import { apiRequest } from './api';

export const fetchMyStatus = async () => {
  return await apiRequest('/api/my-status/');
};

export const updateMyStatus = async (status) => {
  return await apiRequest('/api/my-status/', {
    method: 'PUT',
    body: JSON.stringify({ status }),
  });
};

export const fetchTeamStatuses = async () => {
  const data = await apiRequest('/api/team-statuses/');
  if (!Array.isArray(data)) {
    console.error('Expected array for team statuses, got:', typeof data, data);
    return [];
  }
  return data;
};
