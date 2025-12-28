// import React, { createContext, useContext, useState } from 'react';
// import { login as loginService, logout as logoutService, getCurrentUser, isAuthenticated } from '../services/auth';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(getCurrentUser());
//   const [loading, setLoading] = useState(false);

//   const login = async (email, password, role) => {
//     setLoading(true);
//     const result = await loginService(email, password, role);
//     if (result.success) setUser(result.user);
//     setLoading(false);
//     return result;
//   };

//   const logout = () => {
//     logoutService();
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };











// // src/context/AuthContext.js - UPDATED
// import React, { createContext, useContext, useState } from 'react';

// const AuthContext = createContext();

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(() => {
//     // Get user from localStorage on initial load
//     const storedUser = localStorage.getItem('user');
//     return storedUser ? JSON.parse(storedUser) : null;
//   });
//   const [loading, setLoading] = useState(false);

//   const login = async (employee_id, branch_name, password) => {
//     setLoading(true);
//     try {
//       const response = await fetch('http://localhost:8000/api/auth/login/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ employee_id, branch_name, password })
//       });

//       const data = await response.json();

//       if (response.ok && data.success) {
//         // Save tokens and user data
//         localStorage.setItem('access_token', data.access);
//         localStorage.setItem('refresh_token', data.refresh);
//         localStorage.setItem('user', JSON.stringify(data.user));
//         setUser(data.user);
        
//         return { success: true, user: data.user };
//       } else {
//         return { success: false, error: data.error || 'Login failed' };
//       }
//     } catch (error) {
//       return { success: false, error: 'Login failed. Please try again.' };
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = () => {
//     localStorage.removeItem('access_token');
//     localStorage.removeItem('refresh_token');
//     localStorage.removeItem('user');
//     setUser(null);
//   };

//   const isAuthenticated = () => {
//     return !!localStorage.getItem('access_token');
//   };

//   return (
//     <AuthContext.Provider value={{ 
//       user, 
//       login, 
//       logout, 
//       loading, 
//       isAuthenticated 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// src/context/AuthContext.js - UPDATED WITH updateUserData FUNCTION
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get user from localStorage on initial load
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (employee_id, branch_name, password) => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ employee_id, branch_name, password })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save tokens and user data
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        setUser(data.user);
        
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || 'Login failed' };
      }
    } catch (error) {
      return { success: false, error: 'Login failed. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  // NEW FUNCTION: Update user data (for role changes)
  const updateUserData = (newUserData) => {
    localStorage.setItem('user', JSON.stringify(newUserData));
    setUser(newUserData);
  };

  // NEW FUNCTION: Refresh user data from backend
  const refreshUserData = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch('http://localhost:8000/api/current-user/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        updateUserData(userData);
        return userData;
      }
    } catch (error) {
      console.error('Error refreshing user data:', error);
    }
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      isAuthenticated,
      updateUserData, // NEW: For immediate updates
      refreshUserData // NEW: For fetching latest data from backend
    }}>
      {children}
    </AuthContext.Provider>
  );
};