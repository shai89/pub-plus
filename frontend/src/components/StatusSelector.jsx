import React from 'react';

const statusOptions = [
  { label: 'Working', value: 'WORKING' },
  { label: 'Working Remotely', value: 'REMOTE' },
  { label: 'Vacation', value: 'VACATION' },
  { label: 'Business Trip', value: 'BUSINESS_TRIP' }
];

function StatusSelector({ value, onChange }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="mt-2 p-2 border border-gray-300 rounded"
    >
      {statusOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default StatusSelector;
