// src/components/branch_admin/InspectionDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBranchAdminInspectionById, updateBranchAdminInspectionStatus } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';

const InspectionDetailsPage = () => {
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [showDecisionModal, setShowDecisionModal] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchInspectionDetails();
  }, [id]);

  const fetchInspectionDetails = async () => {
    try {
      setLoading(true);
      const data = await getBranchAdminInspectionById(id);
      setInspection(data);
    } catch (error) {
      console.error('❌ Error fetching inspection:', error);
      showError('Failed to fetch inspection details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      setUpdatingStatus(true);
      await updateBranchAdminInspectionStatus(id, newStatus);
      showSuccess(`Inspection ${newStatus.toLowerCase()} successfully!`);
      setShowDecisionModal(false);
      fetchInspectionDetails(); // Refresh data
    } catch (error) {
      console.error('❌ Error updating status:', error);
      showError('Failed to update inspection status');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800',
      'Completed': 'bg-purple-100 text-purple-800',
      'Approved': 'bg-green-100 text-green-800',
      'Rejected': 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const canMakeDecision = () => {
    return inspection && (inspection.status === 'Completed' || inspection.status === 'Pending');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading inspection details...</span>
      </div>
    );
  }

  if (!inspection) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Inspection not found</h3>
        <p className="text-gray-500 mb-4">The inspection you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/branch-admin/inspections')}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Back to Inspections
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {inspection.client_name || 'Unnamed Inspection'}
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              Inspection ID: {inspection.id} | Branch: {inspection.branch_name}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/branch-admin/inspections')}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Back to List
            </button>
            {canMakeDecision() && (
              <button
                onClick={() => setShowDecisionModal(true)}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
              >
                Make Decision
              </button>
            )}
          </div>
        </div>

        {/* Status Badge */}
        <div className="mt-4">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inspection.status)}`}>
            Status: {inspection.status}
          </span>
        </div>
      </div>

      {/* Inspection Details */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Inspection Details</h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Basic Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Client Name</dt>
                  <dd className="text-sm text-gray-900">{inspection.client_name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Industry</dt>
                  <dd className="text-sm text-gray-900">{inspection.industry_name || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Inspector</dt>
                  <dd className="text-sm text-gray-900">{inspection.inspector || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Created</dt>
                  <dd className="text-sm text-gray-900">
                    {inspection.created_at ? new Date(inspection.created_at).toLocaleString() : 'N/A'}
                  </dd>
                </div>
              </dl>
            </div>

            {/* Client Information */}
            <div>
              <h3 className="text-md font-medium text-gray-900 mb-4">Client Information</h3>
              <dl className="space-y-3">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Phone</dt>
                  <dd className="text-sm text-gray-900">{inspection.phone_number || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Address</dt>
                  <dd className="text-sm text-gray-900">{inspection.office_address || 'N/A'}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Business Type</dt>
                  <dd className="text-sm text-gray-900">{inspection.nature_of_business || 'N/A'}</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Additional sections can be added here for more details */}
        </div>
      </div>

      {/* Decision Modal */}
      {showDecisionModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3 text-center">
              <h3 className="text-lg font-medium text-gray-900">Make Decision</h3>
              <div className="mt-2 px-7 py-3">
                <p className="text-sm text-gray-500">
                  Please review the inspection details carefully before making your decision.
                </p>
              </div>
              <div className="flex justify-center space-x-4 mt-4">
                <button
                  onClick={() => handleStatusUpdate('Approved')}
                  disabled={updatingStatus}
                  className="px-4 py-2 bg-green-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300 disabled:opacity-50"
                >
                  {updatingStatus ? 'Approving...' : 'Approve'}
                </button>
                <button
                  onClick={() => handleStatusUpdate('Rejected')}
                  disabled={updatingStatus}
                  className="px-4 py-2 bg-red-600 text-white text-base font-medium rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:opacity-50"
                >
                  {updatingStatus ? 'Rejecting...' : 'Reject'}
                </button>
                <button
                  onClick={() => setShowDecisionModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-700 text-base font-medium rounded-md shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionDetailsPage;