import React, { useEffect, useState } from 'react';
import MyStatusSection from '../components/MyStatusSection';
import EmployeeFilter from '../components/EmployeeFilter';
import EmployeeList from '../components/EmployeeList';
import { fetchMyStatus, updateMyStatus, fetchTeamStatuses } from '../utils/statusApi';

export default function TeamStatusPage() {
  const [myStatus, setMyStatus] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const loadData = async () => {
    try {
      const [myData, teamData] = await Promise.all([
        fetchMyStatus(),
        fetchTeamStatuses()
      ]);
      setMyStatus(myData);
      setEmployees(teamData);
      console.log('myData from API:', myData);
      console.log('teamData from API:', teamData);

    } catch (err) {
      console.error('Failed to load data', err);
    }
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const updated = await updateMyStatus(newStatus);
      setMyStatus(updated);
      await loadData(); // ריענון הרשימה אחרי שינוי
    } catch (err) {
      console.error('Update failed', err);
    }
  };

  useEffect(() => {
    loadData();

  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Team Status</h2>

      <MyStatusSection myStatus={myStatus} onStatusChange={handleStatusChange} />

      <EmployeeFilter
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        onNameChange={setNameFilter}
        onStatusChange={setStatusFilter}
      />

      <EmployeeList
        employees={employees}
        nameFilter={nameFilter}
        statusFilter={statusFilter}
      />
    </div>
  );
}
