import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Example user state
  const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

  const logout = useCallback(() => {
    setUser(null); // Clear user state or handle logout logic
    enqueueSnackbar('You have been logged out due to inactivity.', { variant: 'info' });
    navigate("/logout")
  }, [enqueueSnackbar]);

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, 3600000); // 1 hour in milliseconds
      //timer = setTimeout(logout, 10000);
    

    };

    const handleActivity = () => resetTimer();

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    resetTimer(); // Start the timer

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthLogout = () => {
  return useContext(AuthContext);
};
