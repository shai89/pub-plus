import React from 'react';

const options = [
  { value: 'WORKING', label: 'Working' },
  { value: 'REMOTE', label: 'Working Remotely' },
  { value: 'VACATION', label: 'On Vacation' },
  { value: 'BUSINESS_TRIP', label: 'Business Trip' },
];

export default function MyStatusSection({ myStatus, onStatusChange }) {
  const handleChange = (e) => {
    onStatusChange(e.target.value);
  };

  return (
    <div className="mb-4">
      <p className="font-semibold">
        Hello {myStatus?.name || 'User'}, you are {myStatus?.status || 'Unknown'}
      </p>
      <label className="block text-sm mb-1">Update My Current Status:</label>
      <select
        className="border rounded p-1"
        value={myStatus?.status || ''}
        onChange={handleChange}
      >
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
