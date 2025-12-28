// src/components/admin/InspectorsList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';
import { getAdminInspectors } from '../../services/inspectionService';

const InspectorsList = () => {
  const [inspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInspectors();
  }, []);

  const fetchInspectors = async () => {
    try {
      setLoading(true);
      console.log('🔄 Starting to fetch inspectors...');
      const data = await getAdminInspectors();
      console.log('📊 Inspectors data received:', data);
      setInspectors(data);
    } catch (error) {
      console.error('❌ Error in fetchInspectors:', error);
      showError('Failed to fetch inspectors. Please try again.');
      // Fallback to empty array
      setInspectors([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredInspectors = inspectors.filter(inspector =>
    inspector.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspector.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspector.branch_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspector.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditInspector = (inspectorId) => {
    navigate(`/admin/edit-inspector/${inspectorId}`);
  };

  const handleViewInspector = (inspectorId) => {
    navigate(`/admin/inspector-details/${inspectorId}`);
  };

  const handleRefresh = () => {
    fetchInspectors();
  };

  const handleCreateInspector = () => {
    navigate('/admin/create-inspector');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading inspectors...</span>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0 lg:px-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">All Inspectors</h1>
            <p className="mt-1 text-sm text-gray-600">
              Manage and view all inspectors across branches
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={handleRefresh}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Refresh
            </button>
            <button
              onClick={handleCreateInspector}
              className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search inspectors by name, email, branch, or employee ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Inspectors Grid */}
      {filteredInspectors.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            {searchTerm ? 'No inspectors found' : 'No inspectors available'}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm ? 'Try adjusting your search terms.' : 'Get started by creating a new inspector.'}
          </p>
          <div className="mt-6">
            <button
              onClick={handleCreateInspector}
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add New Inspector
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredInspectors.map((inspector) => (
              <div key={inspector.id} className="bg-white shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow duration-200">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-lg">
                          {inspector.user_name?.charAt(0).toUpperCase() || 'U'}
                        </span>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {inspector.user_name || 'Unknown User'}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {inspector.employee_id || 'No ID'}
                        </p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      inspector.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {inspector.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>

                  {/* Details */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {inspector.email || 'No email'}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      {inspector.branch_name || 'No branch assigned'}
                    </div>
                    {inspector.date_joined && (
                      <div className="flex items-center text-sm text-gray-600">
                        <svg className="flex-shrink-0 mr-2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Joined {new Date(inspector.date_joined).toLocaleDateString()}
                      </div>
                    )}
                  </div>

                  {/* Actions */}

                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="bg-white shadow rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{inspectors.length}</div>
                <div className="text-sm text-blue-600">Total Inspectors</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {[...new Set(inspectors.map(i => i.branch_name).filter(Boolean))].length}
                </div>
                <div className="text-sm text-green-600">Branches Covered</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {inspectors.filter(i => i.is_active).length}
                </div>
                <div className="text-sm text-purple-600">Active Inspectors</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {inspectors.length > 0 ? Math.round((inspectors.filter(i => i.is_active).length / inspectors.length) * 100) : 0}%
                </div>
                <div className="text-sm text-orange-600">Activation Rate</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default InspectorsList;