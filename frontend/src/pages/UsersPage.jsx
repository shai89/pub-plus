import React, { useEffect, useState, useCallback } from 'react';
import StatusBadge from '../components/StatusBadge';
import StatusSelector from '../components/StatusSelector';
import UserFilter from '../components/UserFilter';
import { fetchMyStatus, updateMyStatus, fetchTeamStatuses } from '../utils/statusApi';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [myStatus, setMyStatus] = useState(null);
  const [nameFilter, setNameFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const loadData = useCallback(async () => {
    try {
      const [myData, teamData] = await Promise.all([
        fetchMyStatus(),
        fetchTeamStatuses(),
      ]);
      setMyStatus(myData);
      setUsers(teamData);
    } catch (err) {
      console.error('Failed to load user data', err);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleStatusChange = async (newStatus) => {
    try {
      await updateMyStatus(newStatus);
      await loadData();
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.username?.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (!statusFilter || user.value === statusFilter.toUpperCase())
    );
  });

  const myUserId = myStatus?.id;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold text-indigo-700 mb-4">Team Status</h2>

      {myStatus && (
        <div className="mb-6">
          <p className="text-lg font-semibold text-gray-700 mb-2">
            Hello {myStatus.username}, you are on {myStatus.value.toLowerCase()}.
          </p>
          <div className="w-64">
            <StatusSelector value={myStatus.value} onChange={handleStatusChange} />
          </div>
        </div>
      )}

      <UserFilter
        nameFilter={nameFilter}
        statusFilter={statusFilter}
        onNameChange={setNameFilter}
        onStatusChange={setStatusFilter}
      />

      <div className="bg-white rounded-xl shadow p-4 mt-4">
        {filteredUsers.length === 0 ? (
          <p className="text-gray-500 text-center">No results</p>
        ) : (
          filteredUsers.map((user) => (
            <div key={user.id} className="flex justify-between items-center py-2 border-b">
              <span>{user.username}</span>
              <StatusBadge status={user.value} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
