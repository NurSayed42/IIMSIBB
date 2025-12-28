import api from './api';

export const login = async (email, password, role) => {
  try {
    // Match Flutter API: send email + password + role
    const response = await api.post('/token/', {
      email: email.trim(),
      password,
      role
    });

    const { access, refresh, user } = response.data;

    // Save tokens locally
    localStorage.setItem('access_token', access);
    localStorage.setItem('refresh_token', refresh);
    localStorage.setItem('user', JSON.stringify(user));

    return { success: true, user };
  } catch (error) {
    console.error(error.response?.data || error.message);
    return { 
      success: false, 
      error: error.response?.data?.detail || 'Login failed' 
    };
  }
};

export const logout = () => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user');
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const isAuthenticated = () => !!localStorage.getItem('access_token');
