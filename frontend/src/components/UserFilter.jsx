import React from 'react';

function UserFilter({ nameFilter, statusFilter, onNameChange, onStatusChange }) {
  return (
    <div className="flex gap-4 items-center mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        value={nameFilter}
        onChange={(e) => onNameChange(e.target.value)}
        className="border p-2 rounded w-60"
      />
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="">All statuses</option>
        <option value="WORKING">Working</option>
        <option value="REMOTE">Remote</option>
        <option value="VACATION">Vacation</option>
        <option value="BUSINESS_TRIP">Business Trip</option>
      </select>
    </div>
  );
}

export default UserFilter;
