// src/components/common/InspectionCard.js - IMPROVED VERSION
import React from 'react';

const InspectionCard = ({ inspection, showStartButton = false, onStart }) => {
  // ✅ NORMALIZE DATA FROM BOTH MODELS
  const normalizedInspection = {
    id: inspection.id,
    client_name: inspection.client_name,
    industry_name: inspection.industry_name,
    phone_number: inspection.phone_number,
    branch_name: inspection.branch_name,
    project: inspection.project || 'No Project', // NewInspection has project
    status: inspection.status,
    assigned_inspector: inspection.assigned_inspector || inspection.inspector,
    created_at: inspection.created_at,
    is_new_inspection: !!inspection.project // Flag to identify NewInspection
  };

  const getStatusColor = (status) => {
    const statusMap = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'in_progress': 'bg-blue-100 text-blue-800',
      'completed': 'bg-green-100 text-green-800',
      'approved': 'bg-emerald-100 text-emerald-800',
      'rejected': 'bg-red-100 text-red-800',
      'Pending': 'bg-yellow-100 text-yellow-800',
      'In Progress': 'bg-blue-100 text-blue-800', 
      'Completed': 'bg-green-100 text-green-800',
      'Approved': 'bg-emerald-100 text-emerald-800',
      'Rejected': 'bg-red-100 text-red-800'
    };
    return statusMap[status] || 'bg-gray-100 text-gray-800';
  };

  const getStatusText = (status) => {
    const statusMap = {
      'pending': 'Pending',
      'in_progress': 'In Progress',
      'completed': 'Completed',
      'approved': 'Approved',
      'rejected': 'Rejected',
      'Pending': 'Pending',
      'In Progress': 'In Progress',
      'Completed': 'Completed', 
      'Approved': 'Approved',
      'Rejected': 'Rejected'
    };
    return statusMap[status] || status;
  };

  console.log('📄 InspectionCard Normalized Data:', normalizedInspection);

  return (
    <div className="px-4 py-4 sm:px-6 hover:bg-gray-50 border-b border-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">
                {normalizedInspection.client_name?.charAt(0) || 'I'}
              </span>
            </div>
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              <h4 className="text-lg font-semibold text-gray-900">
                {normalizedInspection.project}
              </h4>
              <span className={`ml-3 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(normalizedInspection.status)}`}>
                {getStatusText(normalizedInspection.status)}
                {normalizedInspection.is_new_inspection && (
                  <span className="ml-1 text-xs">(New)</span>
                )}
              </span>
            </div>
            <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-2 text-sm text-gray-600">
              <div className="flex items-center">
                <span className="font-medium">Client:</span>
                <span className="ml-2">{normalizedInspection.client_name || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">Industry:</span>
                <span className="ml-2">{normalizedInspection.industry_name || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium">Phone:</span>
                <span className="ml-2">{normalizedInspection.phone_number || 'N/A'}</span>
              </div>
            </div>
            <div className="mt-1 text-xs text-gray-500">
              ID: {normalizedInspection.id} | Branch: {normalizedInspection.branch_name || 'N/A'}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end space-y-2">
          <div className="text-right text-sm text-gray-500">
            <div>Created: {new Date(normalizedInspection.created_at).toLocaleDateString()}</div>
          </div>
          
          {showStartButton && (
            <button
              onClick={() => onStart(normalizedInspection)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Start Inspection
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionCard;