// src/components/inspector/InspectionsList.js - CORRECTED VERSION
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getMyAssignedInspections } from '../../services/inspectionService'; // Use the new function
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import InspectionCard from '../common/InspectionCard';
import LoadingSpinner from '../common/LoadingSpinner';

const InspectionsList = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [searchParams] = useSearchParams();
  const statusFilter = searchParams.get('status') || 'all';
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();

  useEffect(() => {
    fetchMyInspections();
  }, [statusFilter]); // Add statusFilter as dependency

  const fetchMyInspections = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching my assigned inspections...');
      
      // Use the new function that automatically filters by current user
      const myInspections = await getMyAssignedInspections(statusFilter);
      
      console.log(`✅ Loaded ${myInspections.length} inspections for user ${user?.id}`);
      setInspections(myInspections);
      setFilteredInspections(myInspections); // Already filtered by the service
      
      if (myInspections.length > 0) {
        showSuccess(`Loaded ${myInspections.length} inspections assigned to you`);
      } else {
        showSuccess('No inspections assigned to you at the moment');
      }

    } catch (error) {
      console.error('❌ Error fetching my inspections:', error);
      showError('Failed to fetch your inspections');
      setInspections([]);
      setFilteredInspections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartInspection = (inspection) => {
    navigate(`/inspector/inspection/create`, { 
      state: { 
        inspectionData: inspection,
        isEditMode: false 
      } 
    });
  };

  const handleViewDetails = (inspectionId) => {
    navigate(`/inspector/inspections/${inspectionId}`);
  };

  const getStatusTitle = () => {
    const titles = {
      all: 'My Assigned Inspections',
      pending: 'My Pending Inspections',
      in_progress: 'My In Progress Inspections',
      completed: 'My Completed Inspections',
      approved: 'My Approved Inspections',
      rejected: 'My Rejected Inspections'
    };
    return titles[statusFilter] || 'My Inspections';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
        <span className="ml-3 text-gray-600">Loading your inspections...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{getStatusTitle()}</h1>
              <p className="text-sm text-gray-600">
                Inspector: <span className="font-semibold">{user?.user_name}</span> 
                {user?.branch_name && ` • ${user.branch_name}`}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => navigate('/inspector/dashboard')}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                ← Back to Dashboard
              </button>
              <button
                onClick={fetchMyInspections}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {['all', 'pending', 'in_progress', 'completed', 'approved', 'rejected'].map((status) => (
              <button
                key={status}
                onClick={() => navigate(`/inspector/my-inspections?status=${status}`)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  statusFilter === status
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {status.replace('_', ' ').toUpperCase()}
                <span className={`ml-2 py-0.5 px-2 text-xs rounded-full ${
                  statusFilter === status
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {inspections.filter(inspection => 
                    status === 'all' ? true : 
                    inspection.status?.toLowerCase().includes(status)
                  ).length}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Inspections List */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          {filteredInspections.length > 0 ? (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {filteredInspections.map((inspection) => (
                  <li key={inspection.id}>
                    <InspectionCard
                      inspection={inspection}
                      showStartButton={inspection.status === 'pending'}
                      showViewButton={true}
                      onStart={() => handleStartInspection(inspection)}
                      onView={() => handleViewDetails(inspection.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Inspections Found</h3>
              <p className="text-sm text-gray-500 mb-4">
                {statusFilter === 'all' 
                  ? "You don't have any inspections assigned to you."
                  : `You don't have any ${statusFilter} inspections.`
                }
              </p>
              <button
                onClick={fetchMyInspections}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Check Again
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionsList;