// src/components/admin/CreateBranchAdmin.js
import React, { useState } from 'react';
import { createBranchAdmin } from '../../services/adminService';
import { useNotification } from '../../context/NotificationContext';

const CreateBranchAdmin = () => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    employee_id: '',
    branch_name: '',
    role: 'branch_admin'
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createBranchAdmin(formData);
      showSuccess('Branch admin created successfully!');
      // Reset form
      setFormData({
        user_name: '',
        email: '',
        password: '',
        employee_id: '',
        branch_name: '',
        role: 'branch_admin'
      });
    } catch (error) {
      showError('Failed to create branch admin');
      console.error('Error creating branch admin:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Create Branch Admin</h2>
            <p className="mt-1 text-sm text-gray-600">
              Add a new branch administrator to the system
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Username */}
              <div>
                <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                  Username *
                </label>
                <input
                  type="text"
                  id="user_name"
                  name="user_name"
                  value={formData.user_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password *
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Employee ID */}
              <div>
                <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
                  Employee ID *
                </label>
                <input
                  type="text"
                  id="employee_id"
                  name="employee_id"
                  value={formData.employee_id}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>

              {/* Branch Name */}
              <div className="sm:col-span-2">
                <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">
                  Branch Name *
                </label>
                <input
                  type="text"
                  id="branch_name"
                  name="branch_name"
                  value={formData.branch_name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {loading ? 'Creating...' : 'Create Branch Admin'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBranchAdmin;