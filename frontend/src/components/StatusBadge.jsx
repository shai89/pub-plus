// 📁 src/components/StatusBadge.jsx
import React from 'react';

const statusColors = {
  working: 'bg-green-100 text-green-800',
  remote: 'bg-blue-100 text-blue-800',
  vacation: 'bg-gray-200 text-gray-600',
  business: 'bg-yellow-100 text-yellow-800',
};

function StatusBadge({ status }) {
  const statusKey = status.toLowerCase().replace(/\s/g, '');
  const color = statusColors[statusKey] || 'bg-gray-100 text-gray-800';

  return (
    <span className={`text-sm px-2 py-1 rounded ${color}`}>{status}</span>
  );
}

export default StatusBadge;
