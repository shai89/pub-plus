// import React from 'react';

// export default function EmployeeList({ employees = [], nameFilter = '', statusFilter = '' }) {
//   if (!Array.isArray(employees)) {
//     console.error('Invalid employees prop: expected array, got', typeof employees);
//     return <div className="text-red-500 p-2">Error: employee data is invalid</div>;
//   }

//   const filtered = employees.filter((emp) => {
//     const matchesName = emp.name?.toLowerCase().includes(nameFilter.toLowerCase());
//     const matchesStatus = statusFilter === '' || emp.status === statusFilter;
//     return matchesName && matchesStatus;
//   });

//   const formatStatus = (status) => {
//     switch (status) {
//       case 'WORKING': return 'Working';
//       case 'REMOTE': return 'Working Remotely';
//       case 'VACATION': return 'On Vacation';
//       case 'BUSINESS_TRIP': return 'Business Trip';
//       default: return status;
//     }
//   };

//   return (
//     <div className="bg-white border rounded">
//       {filtered.map((emp) => (
//         <div key={emp.id} className="p-2 border-b">
//           {emp.name} ({formatStatus(emp.status)})
//         </div>
//       ))}
//       {filtered.length === 0 && (
//         <div className="p-2 text-gray-500">No results</div>
//       )}
//     </div>
//   );
// }
