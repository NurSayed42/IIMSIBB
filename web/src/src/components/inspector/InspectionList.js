// src/components/inspector/InspectionsListPage.js - COMPLETELY UPDATED
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getMyAssignedInspections, getNewInspections } from '../../services/inspectionService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import InspectionCard from '../common/InspectionCard';
import LoadingSpinner from '../common/LoadingSpinner';

const InspectionsListPage = () => {
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
  }, []);

  useEffect(() => {
    filterInspections();
  }, [inspections, statusFilter]);

  const fetchMyInspections = async () => {
    try {
      setLoading(true);
      console.log('🔄 [COMPONENT] Fetching MY assigned inspections...');
      
      // ✅ USE THE NEW FUNCTION THAT FILTERS FOR CURRENT INSPECTOR
      const myInspections = await getMyAssignedInspections();
      
      console.log('📥 [COMPONENT] My inspections loaded:', myInspections.length);
      
      // ✅ FINAL SAFETY CHECK: Ensure all inspections are assigned to current user
      const verifiedInspections = myInspections.filter(inspection => {
        const isMine = inspection.assigned_inspector === user?.id;
        if (!isMine) {
          console.error('🚨 [COMPONENT] Foreign inspection detected:', inspection);
        }
        return isMine;
      });

      if (verifiedInspections.length !== myInspections.length) {
        console.warn(`⚠️ [COMPONENT] Filtered out ${myInspections.length - verifiedInspections.length} foreign inspections`);
      }

      setInspections(verifiedInspections);
      
      if (verifiedInspections.length > 0) {
        showSuccess(`Loaded ${verifiedInspections.length} inspections assigned to you`);
      } else {
        showSuccess('No inspections assigned to you at the moment');
      }

    } catch (error) {
      console.error('❌ [COMPONENT] Error fetching inspections:', error);
      showError('Failed to fetch your inspections');
      setInspections([]);
    } finally {
      setLoading(false);
    }
  };

  const filterInspections = () => {
    if (!inspections.length) {
      setFilteredInspections([]);
      return;
    }

    console.log(`🔍 [COMPONENT] Filtering ${inspections.length} inspections by status: ${statusFilter}`);
    
    let filtered = inspections;

    // Status-based filtering
    if (statusFilter !== 'all') {
      filtered = inspections.filter(inspection => {
        const status = inspection.status?.toLowerCase();
        const filter = statusFilter.toLowerCase();
        
        return status === filter || 
               (filter === 'pending' && status === 'assigned') ||
               (filter === 'assigned' && status === 'pending');
      });
    }

    console.log(`✅ [COMPONENT] Filtered ${filtered.length} inspections for status: ${statusFilter}`);
    setFilteredInspections(filtered);
  };

  const handleStartInspection = (inspection) => {
    console.log('🚀 [COMPONENT] Starting inspection:', inspection.id);
    navigate(`/inspector/inspection/create`, { 
      state: { 
        inspectionData: inspection,
        isEditMode: false 
      } 
    });
  };

  const handleViewDetails = (inspectionId) => {
    console.log('👀 [COMPONENT] Viewing details for inspection:', inspectionId);
    navigate(`/admin/inspections/${inspectionId}`);
  };

  const getStatusTitle = () => {
    const titles = {
      all: 'My Assigned Inspections',
      pending: 'My Pending Inspections',
      assigned: 'My Assigned Inspections', 
      in_progress: 'My In Progress Inspections',
      completed: 'My Completed Inspections',
      approved: 'My Approved Inspections',
      rejected: 'My Rejected Inspections'
    };
    return titles[statusFilter] || 'My Inspections';
  };

  const getStatusCounts = () => {
    const counts = {
      all: inspections.length,
      pending: inspections.filter(i => 
        i.status?.toLowerCase() === 'pending' || i.status?.toLowerCase() === 'assigned'
      ).length,
      in_progress: inspections.filter(i => 
        i.status?.toLowerCase() === 'in_progress' || i.status?.toLowerCase() === 'in progress'
      ).length,
      completed: inspections.filter(i => 
        i.status?.toLowerCase() === 'completed'
      ).length,
      approved: inspections.filter(i => 
        i.status?.toLowerCase() === 'approved'
      ).length,
      rejected: inspections.filter(i => 
        i.status?.toLowerCase() === 'rejected'
      ).length,
    };
    return counts;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
        <span className="ml-3 text-gray-600">Loading your inspections...</span>
      </div>
    );
  }

  const statusCounts = getStatusCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <button 
                onClick={() => navigate('/inspector/dashboard')}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Dashboard
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{getStatusTitle()}</h1>
                <p className="text-sm text-gray-600">
                  Inspector: <span className="font-semibold">{user?.user_name}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Total assigned: {statusCounts.all} inspections
                </p>
              </div>
            </div>
            <button
              onClick={fetchMyInspections}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              🔄 Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8 overflow-x-auto">
            {[
              { key: 'all', label: 'All', count: statusCounts.all },
              { key: 'pending', label: 'Pending', count: statusCounts.pending },
              { key: 'in_progress', label: 'In Progress', count: statusCounts.in_progress },
              { key: 'completed', label: 'Completed', count: statusCounts.completed },
              { key: 'approved', label: 'Approved', count: statusCounts.approved },
              { key: 'rejected', label: 'Rejected', count: statusCounts.rejected },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => navigate(`/inspector/inspections?status=${tab.key}`)}
                className={`flex-shrink-0 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  statusFilter === tab.key
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span className={`ml-2 py-0.5 px-2 text-xs rounded-full ${
                  statusFilter === tab.key
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Inspections List */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            {filteredInspections.length > 0 ? (
              <div className="divide-y divide-gray-200">
                {filteredInspections.map((inspection) => (
                  <InspectionCard
                    key={inspection.id}
                    inspection={inspection}
                    showStartButton={inspection.status === 'pending' || inspection.status === 'assigned'}
                    showViewButton={true}
                    onStart={() => handleStartInspection(inspection)}
                    onView={() => handleViewDetails(inspection.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="px-4 py-12 text-center">
                <div className="text-gray-400 mb-4">
                  <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No {statusFilter !== 'all' ? statusFilter : ''} Inspections Assigned to You
                </h3>
                <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
                  {statusFilter === 'all' 
                    ? "You don't have any inspections assigned to you at the moment."
                    : `You don't have any ${statusFilter} inspections assigned to you.`
                  }
                </p>
                <button
                  onClick={fetchMyInspections}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  Check for New Assignments
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectionsListPage;