// import React from 'react';
// import { Link } from 'react-router-dom';

// const mockUsers = [
//   { id: 1, name: 'Alice Johnson', email: 'alice@example.com' },
//   { id: 2, name: 'Bob Smith', email: 'bob@example.com' },
//   { id: 3, name: 'Charlie Davis', email: 'charlie@example.com' },
// ];

// function UserTable() {
//   return (
//     <div className="overflow-x-auto mt-6">
//       <table className="min-w-full bg-white border rounded-xl shadow">
//         <thead className="bg-indigo-100">
//           <tr>
//             <th className="py-2 px-4 text-left">ID</th>
//             <th className="py-2 px-4 text-left">Name</th>
//             <th className="py-2 px-4 text-left">Email</th>
//             <th className="py-2 px-4 text-left">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {mockUsers.map((user) => (
//             <tr key={user.id} className="border-t hover:bg-gray-50">
//               <td className="py-2 px-4">{user.id}</td>
//               <td className="py-2 px-4">{user.name}</td>
//               <td className="py-2 px-4">{user.email}</td>
//               <td className="py-2 px-4">
//                 <Link
//                   to={`/users/${user.id}`}
//                   className="text-indigo-600 hover:underline"
//                 >
//                   View
//                 </Link>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default UserTable;