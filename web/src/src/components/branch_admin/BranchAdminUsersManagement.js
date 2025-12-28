// src/components/branch_admin/BranchAdminUsersManagement.js - UPDATED VERSION
import React, { useState, useEffect } from 'react';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

const BranchAdminUsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(null);
  const { showSuccess, showError } = useNotification();
  const { user: currentUser } = useAuth();

  // Fetch users for branch admin's branch only
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('access_token');
      console.log('🔍 Fetching branch users...');
      
      const response = await fetch('http://localhost:8000/api/branch-admin/users/', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      console.log('📡 Fetch branch users response status:', response.status);

      if (response.ok) {
        const data = await response.json();
        console.log('✅ Branch users data received:', data);
        setUsers(data);
      } else {
        const errorText = await response.text();
        console.error('❌ Failed to fetch branch users. Response:', errorText);
        
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
      console.error('🚨 Error fetching branch users:', error);
      showError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Update user active status - NEW FUNCTION
  const updateUserStatus = async (userId, newStatus) => {
    setUpdating(userId);
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`http://localhost:8000/api/branch-admin/users/${userId}/update-status/`, {
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
        showSuccess(data.message || `User ${newStatus ? 'activated' : 'deactivated'} successfully`);
        
        // Update local state
        const updatedUsers = users.map(user => 
          user.id === userId ? { ...user, is_active: newStatus } : user
        );
        setUsers(updatedUsers);

      } else {
        const errorData = await response.json();
        showError(errorData.error || 'Failed to update user status');
      }
    } catch (error) {
      console.error('🚨 Error updating user status:', error);
      showError('Error updating user status');
    } finally {
      setUpdating(null);
    }
  };

  // Toggle user status
  const toggleUserStatus = async (user) => {
    if (user.id === currentUser?.id) {
      showError('You cannot change your own status');
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
      'branch_admin': 'Branch Admin', 
      'inspector': 'Inspector',
      'admin': 'Admin'
    };
    return roleNames[role] || role;
  };

  // Role badge colors
  const getRoleBadgeColor = (role) => {
    const colors = {
      'branch_admin': 'bg-blue-100 text-blue-800',
      'inspector': 'bg-green-100 text-green-800',
      'admin': 'bg-red-100 text-red-800'
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  // Check if user is current user
  const isCurrentUser = (userId) => {
    return currentUser && currentUser.id === userId;
  };

  // Check if action is allowed for user
  const canModifyUser = (user) => {
    if (!user) return false;
    if (user.id === currentUser?.id) return false; // Cannot modify self
    if (user.role === 'admin') return false; // Cannot modify admin
    return true;
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
          <h1 className="text-3xl font-bold text-gray-900">Branch User Management</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage users in your branch ({currentUser?.branch_name || 'N/A'})
          </p>
          <p className="mt-1 text-xs text-gray-500">
            You can activate/deactivate users in your branch (Role changes are not allowed)
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Branch Users ({users.length})
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              All users assigned to your branch - View Only
            </p>
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
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
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
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.employee_id || 'N/A'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoleBadgeColor(user.role)}`}>
                        {getRoleDisplayName(user.role)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.is_active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {canModifyUser(user) ? (
                        <button
                          onClick={() => toggleUserStatus(user)}
                          disabled={updating === user.id}
                          className={`inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded ${
                            user.is_active 
                              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          } disabled:opacity-50`}
                        >
                          {updating === user.id ? (
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-current mr-1"></div>
                          ) : null}
                          {user.is_active ? 'Deactivate' : 'Activate'}
                        </button>
                      ) : (
                        <span className="text-xs text-gray-500">Not allowed</span>
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
              <h3 className="text-lg font-medium text-gray-900">No users found in your branch</h3>
              <p className="mt-2 text-sm text-gray-500">
                There are no users assigned to your branch yet.
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
              <dt className="text-sm font-medium text-gray-500 truncate">Inspectors</dt>
              <dd className="mt-1 text-3xl font-semibold text-blue-600">
                {users.filter(u => u.role === 'inspector').length}
              </dd>
            </div>
          </div>
        </div>

        {/* Information Card */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Branch Admin Permissions</h3>
              <div className="mt-2 text-sm text-blue-700">
                <ul className="list-disc list-inside space-y-1">
                  <li>You can only view users from your own branch</li>
                  <li>You can <strong>activate/deactivate</strong> users (except yourself)</li>
                  <li>You <strong>cannot change user roles</strong> (Inspector/Branch Admin)</li>
                  <li>You cannot modify <strong>Admin</strong> users</li>
                  <li>Role changes require <strong>Super Admin</strong> permission</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchAdminUsersManagement;