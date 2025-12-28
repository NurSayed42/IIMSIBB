// src/components/admin/UsersManagement.js - UPDATED WITH STATUS TOGGLE
import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(null);
  const { showSuccess, showError } = useNotification();
  const { user: currentUser, updateUserData } = useAuth();

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('🔍 Fetching users with token:', token ? 'Exists' : 'Missing');
      
      const response = await fetch('http://localhost:8000/api/admin/users/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Fetch users response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Users data received:', data);
        setUsers(data);
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to fetch users. Response:', errorText);
        
        if (response.status === 401) {
          showError('Authentication failed. Please login again.');
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          localStorage.removeItem('user');
          window.location.href = '/login';
        } else if (response.status === 403) {
          showError('You do not have permission to access this page.');
        } else {
          showError('Failed to fetch users. Please try again.');
        }
      }
    } catch (error) {
      console.error('🚨 Error fetching users:', error);
      showError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Update user role
  const updateUserRole = async (userId, newRole) => {
    setUpdating(userId);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/admin/users/${userId}/update-role/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role: newRole }),
      });

      console.log('📡 Update role response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        showSuccess(`User role updated to ${newRole}`);
        
        // Update local state
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, role: newRole } : user
        );
        setUsers(updatedUsers);

        // If current user's role was changed, update their data immediately
        if (currentUser && currentUser.id === userId) {
          const updatedCurrentUser = { ...currentUser, role: newRole };
          updateUserData(updatedCurrentUser);
          showSuccess(`Your role has been updated to ${newRole}. Please refresh the page to see changes.`);
        }

      } else {
        const errorData = await response.json();
        showError(errorData.error || 'Failed to update role');
      }
    } catch (error) {
      console.error('🚨 Error updating user role:', error);
      showError('Error updating user role');
    } finally {
      setUpdating(null);
    }
  };

  // Update user active status - NEW FUNCTION
  const updateUserStatus = async (userId, newStatus) => {
    setStatusUpdating(userId);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/admin/users/${userId}/update-status/`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: newStatus }),
      });

      console.log('📡 Update status response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        showSuccess(`User status updated to ${newStatus ? 'Active' : 'Inactive'}`);
        
        // Update local state
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, is_active: newStatus } : user
        );
        setUsers(updatedUsers);

      } else {
        const errorData = await response.json();
        showError(errorData.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('🚨 Error updating user status:', error);
      showError('Error updating user status');
    } finally {
      setStatusUpdating(null);
    }
  };

  // Toggle user status - NEW FUNCTION
  const toggleUserStatus = async (user) => {
    if (user.id === currentUser.id) {
      showError('You cannot deactivate yourself');
      return;
    }
    
    const newStatus = !user.is_active;
    await updateUserStatus(user.id, newStatus);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Role display names
  const getRoleDisplayName = (role) => {
    const roleNames = {
      'admin': 'Admin',
      'branch_admin': 'Branch Admin', 
      'inspector': 'Inspector'
    };
    return roleNames[role] || role;
  };

  // Role badge colors
  const getRoleBadgeColor = (role) => {
    const colors = {
      'admin': 'bg-red-100 text-red-800',
      'branch_admin': 'bg-blue-100 text-blue-800',
      'inspector': 'bg-green-100 text-green-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  // Check if user is current user
  const isCurrentUser = (userId) => {
    return currentUser && currentUser.id === userId;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all users and their roles in the system
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              All Users ({users.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee ID
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Branch
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Change Role
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id} className={`hover:bg-gray-50 ${isCurrentUser(user.id) ? 'bg-yellow-50' : ''}`}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary rounded-full flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {user.user_name ? user.user_name.charAt(0).toUpperCase() : 'U'}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 flex items-center">
                            {user.user_name || 'N/A'}
                            {isCurrentUser(user.id) && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                You
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-gray-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.employee_id || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.branch_name || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {getRoleDisplayName(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        disabled={updating === user.id || isCurrentUser(user.id)}
                        className={`block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm rounded-md ${
                          updating === user.id ? 'opacity-50' : ''
                        } ${
                          isCurrentUser(user.id) ? 'bg-gray-100 cursor-not-allowed' : ''
                        }`}
                      >
                        <option value="inspector">Inspector</option>
                        <option value="branch_admin">Branch Admin</option>
                        <option value="admin">Admin</option>
                      </select>
                      {updating === user.id && (
                        <div className="mt-1">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary mx-auto"></div>
                        </div>
                      )}
                      {isCurrentUser(user.id) && (
                        <div className="mt-1 text-xs text-gray-500">Cannot change own role</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => toggleUserStatus(user)}
                        disabled={statusUpdating === user.id || isCurrentUser(user.id)}
                        className={`inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md ${
                          user.is_active 
                            ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        } ${
                          statusUpdating === user.id ? 'opacity-50' : ''
                        } ${
                          isCurrentUser(user.id) ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : ''
                        }`}
                      >
                        {statusUpdating === user.id ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                            Updating...
                          </>
                        ) : (
                          user.is_active ? 'Deactivate' : 'Activate'
                        )}
                      </button>
                      {isCurrentUser(user.id) && (
                        <div className="mt-1 text-xs text-gray-500">Cannot deactivate yourself</div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {users.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">👥</div>
              <h3 className="text-lg font-medium text-gray-900">No users found</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no users in the system yet.
              </p>
            </div>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
              <dd className="mt-1 text-3xl font-semibold text-gray-900">{users.length}</dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
              <dd className="mt-1 text-3xl font-semibold text-green-600">
                {users.filter(u => u.is_active).length}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Inactive Users</dt>
              <dd className="mt-1 text-3xl font-semibold text-red-600">
                {users.filter(u => !u.is_active).length}
              </dd>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <dt className="text-sm font-medium text-gray-500 truncate">Admins</dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-600">
                {users.filter(u => u.role === 'admin').length}
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;