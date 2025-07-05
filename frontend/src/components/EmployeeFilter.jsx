import React from 'react';

export default function EmployeeFilter({ nameFilter, statusFilter, onNameChange, onStatusChange }) {
  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search by name..."
        className="border rounded px-2 py-1"
        value={nameFilter}
        onChange={(e) => onNameChange(e.target.value)}
      />
      <select
        className="border rounded px-2 py-1"
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
      >
        <option value="">All statuses</option>
        <option value="WORKING">Working</option>
        <option value="REMOTE">Working Remotely</option>
        <option value="VACATION">On Vacation</option>
        <option value="BUSINESS_TRIP">Business Trip</option>
      </select>
    </div>
  );
}
