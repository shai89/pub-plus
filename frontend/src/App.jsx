// 📁 src/App.jsx
import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import UsersPage from './pages/UsersPage';
import NotFoundPage from './pages/NotFoundPage';
import Navbar from './components/Navbar';
import RequireAuth from './components/RequireAuth';
import useAutoLogout from './hooks/useAutoLogout';

function App() {
  useAutoLogout();
  const location = useLocation();
  const hideNavbar = location.pathname === '/login';

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/users" element={
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        } />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
