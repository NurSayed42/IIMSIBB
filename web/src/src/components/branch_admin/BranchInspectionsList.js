// src/components/branch_admin/BranchInspectionsList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  getBranchAdminInspectionsByStatus,
  updateBranchAdminInspectionStatus
} from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';
import { useAuth } from '../../context/AuthContext';

const BranchInspectionsList = () => {
  const [allInspections, setAllInspections] = useState([]);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'all';
  const [searchTerm, setSearchTerm] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const { showError, showSuccess } = useNotification();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchInspections();
  }, [status]);

  useEffect(() => {
    filterInspections();
  }, [searchTerm, allInspections]);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      console.log('🎯 [BRANCH VIEW] Fetching inspections for branch:', user?.branch_name);

      const data = await getBranchAdminInspectionsByStatus(status);
     
      console.log('📥 [BRANCH VIEW] Received inspections:', data.length);
     
      setAllInspections(data);
     
      if (data.length > 0) {
        showSuccess(`Loaded ${data.length} inspections from ${user?.branch_name}`);
      } else {
        showSuccess('No inspections found for your branch');
      }

    } catch (error) {
      console.error('❌ [BRANCH VIEW] Error:', error);
      showError(error.message || 'Failed to load inspections');
      setAllInspections([]);
    } finally {
      setLoading(false);
    }
  };

  const filterInspections = () => {
    let filtered = allInspections;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(i =>
        i.client_name?.toLowerCase().includes(term) ||
        i.industry_name?.toLowerCase().includes(term) ||
        i.inspector?.toLowerCase().includes(term) ||
        i.project?.toLowerCase().includes(term)
      );
    }

    setFilteredInspections(filtered);
  };

  // Handle status update
  const handleStatusUpdate = async (inspectionId, newStatus) => {
    try {
      setUpdatingStatus(inspectionId);
      console.log('🔄 [STATUS UPDATE] Updating inspection:', inspectionId, 'to:', newStatus);

      await updateBranchAdminInspectionStatus(inspectionId, newStatus);
     
      // Update local state
      setAllInspections(prev =>
        prev.map(inspection =>
          inspection.id === inspectionId
            ? { ...inspection, status: newStatus }
            : inspection
        )
      );

      showSuccess(`Status updated to ${newStatus.replace('_', ' ')}`);
     
    } catch (error) {
      console.error('❌ [STATUS UPDATE] Error:', error);
      showError(error.message || 'Failed to update status');
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleInspectionClick = (inspectionId) => {
    console.log('🔍 [BRANCH VIEW] Opening inspection:', inspectionId);
    navigate(`/branch-admin/inspections/${inspectionId}`);
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
      case 'in progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatStatus = (status) => {
    if (!status) return 'UNKNOWN';
    return status.replace('_', ' ').toUpperCase();
  };

  const getAvailableStatusOptions = (currentStatus) => {
    const allStatuses = [
      { value: 'pending', label: 'Pending', color: 'gray' },
      { value: 'in_progress', label: 'In_progress', color: 'yellow' },
      { value: 'completed', label: 'Completed', color: 'blue' },
      { value: 'approved', label: 'Approved', color: 'green' },
      { value: 'rejected', label: 'Rejected', color: 'red' }
    ];

    // Filter out current status
    return allStatuses.filter(status => status.value !== currentStatus);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Branch Inspections</h1>
        <p className="text-sm text-gray-600 mt-1">
          Showing inspections for <b className="text-blue-600">{user?.branch_name}</b> only
        </p>
        <div className="flex items-center gap-4 mt-2 text-xs">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
            Total: {allInspections.length}
          </span>
          <span className="bg-green-100 text-green-800 px-2 py-1 rounded">
            Filtered: {filteredInspections.length}
          </span>
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded">
            Status: {status === 'all' ? 'All' : status}
          </span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by client, industry, inspector, or project..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
       
        <div className="flex gap-2">
          <select
            value={status}
            onChange={(e) => navigate(`/branch-admin/inspections?status=${e.target.value}`)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
         
          <button
            onClick={fetchInspections}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Inspections List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {filteredInspections.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📋</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No inspections found</h3>
            <p className="text-gray-500 mb-4">
              {allInspections.length === 0
                ? `No inspections available for branch "${user?.branch_name}"`
                : 'No inspections match your search criteria'
              }
            </p>
            {allInspections.length === 0 && (
              <button
                onClick={() => navigate('/branch-admin/create-inspection')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Create First Inspection
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredInspections.map((inspection) => (
              <li key={inspection.id} className="hover:bg-gray-50 transition-colors">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => handleInspectionClick(inspection.id)}
                        >
                          {inspection.client_name || 'Unnamed Client'}
                        </h3>
                       
                        <div className="flex items-center gap-2">
                          {/* Status Badge */}
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(inspection.status)}`}>
                            {formatStatus(inspection.status)}
                          </span>
                         
                          {/* Status Dropdown */}
                          <div className="relative">
                            <select
                              value=""
                              onChange={(e) => handleStatusUpdate(inspection.id, e.target.value)}
                              disabled={updatingStatus === inspection.id}
                              className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                            >
                              <option value="">Change Status</option>
                              {getAvailableStatusOptions(inspection.status).map(option => (
                                <option key={option.value} value={option.value}>
                                  Set as {option.label}
                                </option>
                              ))}
                            </select>
                           
                            {updatingStatus === inspection.id && (
                              <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                     
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Industry:</span>
                          <span>{inspection.industry_name || 'N/A'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Inspector:</span>
                          <span>{inspection.inspector || 'Unassigned'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Project:</span>
                          <span>{inspection.project || 'N/A'}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-medium mr-2">Phone:</span>
                          <span>{inspection.phone_number || 'N/A'}</span>
                        </div>
                      </div>
                     
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="flex items-center">
                          <span className="font-medium">Branch:</span>
                          <span className="ml-1 font-semibold text-blue-600">{inspection.branch_name}</span>
                        </span>
                        <span className="mx-3">•</span>
                        <span className="flex items-center">
                          <span className="font-medium">Created:</span>
                          <span className="ml-1">
                            {inspection.created_at
                              ? new Date(inspection.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })
                              : 'N/A'
                            }
                          </span>
                        </span>
                        {inspection.updated_at && (
                          <>
                            <span className="mx-3">•</span>
                            <span className="flex items-center">
                              <span className="font-medium">Updated:</span>
                              <span className="ml-1">
                                {new Date(inspection.updated_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                   
                    <div
                      className="ml-4 flex-shrink-0 cursor-pointer"
                      onClick={() => handleInspectionClick(inspection.id)}
                    >
                      <button className='bg-green-600 py-2 px-3 rounded-md text-white mt-2'>View Details</button>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Quick Actions Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Quick Actions</h3>
            <div className="mt-1 text-sm text-blue-700">
              <p>• Click on client name to view inspection details</p>
              <p>• Use "Change Status" dropdown to update inspection status</p>
              <p>• Only inspections from your branch ({user?.branch_name}) are shown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Debug Info - Development Only */}
      {process.env.NODE_ENV === 'development' && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <details className="text-xs">
            <summary className="cursor-pointer font-medium text-gray-700">Debug Information</summary>
            <div className="mt-2 space-y-1 text-gray-600">
              <div><strong>Current Branch:</strong> {user?.branch_name}</div>
              <div><strong>User Role:</strong> {user?.role}</div>
              <div><strong>Total Inspections:</strong> {allInspections.length}</div>
              <div><strong>Filtered Inspections:</strong> {filteredInspections.length}</div>
              <div><strong>Status Filter:</strong> {status}</div>
              <div><strong>Search Term:</strong> "{searchTerm}"</div>
              <div><strong>API Endpoint:</strong> /branch-admin/inspections/</div>
            </div>
          </details>
        </div>
      )}
    </div>
  );
};

export default BranchInspectionsList;