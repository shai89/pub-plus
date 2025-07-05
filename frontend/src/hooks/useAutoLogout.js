import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getValidAccessToken } from '../utils/auth';

const useAutoLogout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      const token = getValidAccessToken();
      console.log("check");

      if (!token) {
        console.warn('Token expired. Logging out automatically...');
        localStorage.clear(); 
        navigate('/login'); 
      }
    }, 10000); // כל 10 שניות

    return () => clearInterval(interval);
  }, [navigate]);
};

export default useAutoLogout;
