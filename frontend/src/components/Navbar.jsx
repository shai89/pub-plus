import React from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <nav className="bg-white border-b shadow px-6 py-4 flex items-center justify-between">
      <div className="text-xl font-bold text-purple-700">PubPlus Admin</div>
      
      <ul className="flex space-x-6 text-sm text-gray-700">
        <li>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline font-semibold"
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
