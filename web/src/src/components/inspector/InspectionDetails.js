// src/components/inspector/InspectionDetails.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getInspectionById } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';
import LoadingSpinner from '../common/LoadingSpinner';

const InspectionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError } = useNotification();
  
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');

  useEffect(() => {
    fetchInspectionDetails();
  }, [id]);

  const fetchInspectionDetails = async () => {
    try {
      setLoading(true);
      const data = await getInspectionById(id);
      setInspection(data);
      console.log('📋 Inspection details loaded:', data);
    } catch (error) {
      console.error('❌ Error fetching inspection details:', error);
      showError('Failed to load inspection details');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return dateString;
    }
  };

  // Format financial values
  const formatCurrency = (value) => {
    if (!value) return '৳ 0.00';
    const num = parseFloat(value) || 0;
    return `৳ ${num.toLocaleString('en-BD', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Render field value with fallback
  const renderField = (value, fallback = 'N/A') => {
    if (value === null || value === undefined || value === '') return fallback;
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    return value;
  };

  // Render checklist items
  const renderChecklistValue = (value) => {
    if (value === true) return '✅ Yes';
    if (value === false) return '❌ No';
    if (value === null) return '➖ N/A';
    return '❓ Not Specified';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
        <span className="ml-3 text-gray-600">Loading inspection details...</span>
      </div>
    );
  }

  if (!inspection) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Inspection not found</h2>
        <p className="text-gray-600 mt-2">The requested inspection could not be loaded.</p>
        <button
          onClick={() => navigate('/inspector/inspections')}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700"
        >
          Back to Inspections
        </button>
      </div>
    );
  }

  const sections = [
    { id: 'overview', title: 'Overview' },
    { id: 'A', title: 'A. Company Information' },
    { id: 'B', title: 'B. Owner Information' },
    { id: 'C', title: 'C. Partners/Directors' },
    { id: 'D', title: 'D. Purpose' },
    { id: 'E', title: 'E. Proposed Facilities' },
    { id: 'F', title: 'F. Present Outstanding' },
    { id: 'G', title: 'G. Business Analysis' },
    { id: 'H', title: 'H. Property & Assets' },
    { id: 'I', title: 'I. Working Capital' },
    { id: 'J', title: 'J. Godown Particulars' },
    { id: 'K', title: 'K. Checklist' },
    { id: 'L', title: 'L. Media & Documents' },
    { id: 'location', title: 'Location Tracking' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Inspection Details</h1>
              <p className="mt-2 text-sm text-gray-600">
                Inspection ID: {inspection.id} • Created: {formatDate(inspection.created_at)}
              </p>
            </div>
            <button
              onClick={() => navigate('/inspector/inspections')}
              className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Back to List
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
            inspection.status === 'approved' ? 'bg-green-100 text-green-800' :
            inspection.status === 'rejected' ? 'bg-red-100 text-red-800' :
            inspection.status === 'completed' ? 'bg-blue-100 text-blue-800' :
            inspection.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {inspection.status?.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Navigation */}
        <div className="bg-white shadow rounded-lg mb-6">
          <nav className="flex overflow-x-auto">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-shrink-0 px-4 py-3 border-b-2 font-medium text-sm ${
                  activeSection === section.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="bg-white shadow rounded-lg">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Inspection Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Basic Information</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-600">Client Name</dt>
                      <dd className="text-sm font-medium">{renderField(inspection.client_name)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Industry</dt>
                      <dd className="text-sm font-medium">{renderField(inspection.industry_name)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Branch</dt>
                      <dd className="text-sm font-medium">{renderField(inspection.branch_name)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Location Data</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-600">Total Points</dt>
                      <dd className="text-sm font-medium">{inspection.total_location_points || 0}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Tracking Start</dt>
                      <dd className="text-sm font-medium">{formatDate(inspection.location_start_time)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Tracking End</dt>
                      <dd className="text-sm font-medium">{formatDate(inspection.location_end_time)}</dd>
                    </div>
                  </dl>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-2">Media & Documents</h3>
                  <dl className="space-y-2">
                    <div>
                      <dt className="text-sm text-gray-600">Photos</dt>
                      <dd className="text-sm font-medium">{inspection.site_photos?.length || 0}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Videos</dt>
                      <dd className="text-sm font-medium">{inspection.site_video?.length || 0}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Documents</dt>
                      <dd className="text-sm font-medium">{inspection.uploaded_documents?.length || 0}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {/* Quick Financial Summary */}
              {inspection.total_assets && (
                <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-3">Financial Summary</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <dt className="text-sm text-blue-700">Total Assets</dt>
                      <dd className="text-lg font-bold text-blue-900">{formatCurrency(inspection.total_assets)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-blue-700">Total Liabilities</dt>
                      <dd className="text-lg font-bold text-blue-900">{formatCurrency(inspection.total_liabilities)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-blue-700">Net Worth</dt>
                      <dd className="text-lg font-bold text-blue-900">{formatCurrency(inspection.net_worth)}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-blue-700">Grand Total</dt>
                      <dd className="text-lg font-bold text-blue-900">{formatCurrency(inspection.grand_total)}</dd>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Section A: Company Information */}
          {activeSection === 'A' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section A: Company's Client's Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name of the Client</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.client_name)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Group Name</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.group_name)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Industry Name</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.industry_name)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nature of Business</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.nature_of_business)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Legal Status</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.legal_status)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date of Establishment</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.date_of_establishment)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Office Address</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.office_address)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Showroom Address</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.showroom_address)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Factory Address</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.factory_address)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Phone/Mobile</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.phone_number)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Account Number</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.account_number)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">TIN Number</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.tin_number)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section B: Owner Information */}
          {activeSection === 'B' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section B: Owner Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Owner Name & Status</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.owner_name)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Age</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.owner_age)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Father's Name</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.father_name)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Mother's Name</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.mother_name)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Spouse's Name</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.spouse_name)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Academic Qualification</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.academic_qualification)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Children Information</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.children_info)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Successor</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.business_successor)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Residential Address</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.residential_address)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Permanent Address</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.permanent_address)}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section C: Partners/Directors */}
          {activeSection === 'C' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section C: List of Partners / Directors</h2>
              {inspection.partners_directors?.length > 0 ? (
                <div className="space-y-6">
                  {inspection.partners_directors.map((partner, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Partner/Director {index + 1}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(partner.name)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Age</label>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(partner.age)}</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Academic Qualification</label>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(partner.qualification)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Share (%)</label>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(partner.share)}</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Status</label>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(partner.status)}</p>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium text-gray-700">Relationship</label>
                          <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(partner.relationship)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No partners/directors information available</p>
              )}
            </div>
          )}

          {/* Section D: Purpose */}
          {activeSection === 'D' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section D: Purpose of Investment / Facilities</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Purpose of Investment</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{renderField(inspection.purpose_investment)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Purpose of Bank Guarantee</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{renderField(inspection.purpose_bank_guarantee)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Period of Investment</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.period_investment)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Section E: Proposed Facilities */}
          {activeSection === 'E' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section E: Details of proposed Facilities/Investment</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Facility Type</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.facility_type)}</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount (Tk)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Existing Limit</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(inspection.existing_limit)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Limit Applied by Client</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(inspection.applied_limit)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Limit Recommended by Branch</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(inspection.recommended_limit)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rate of Return Profit Sharing Ratio</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bank (%)</label>
                      <p className="mt-1 text-sm text-gray-900 bg-white p-2 rounded">{renderField(inspection.bank_percentage)}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Client (%)</label>
                      <p className="mt-1 text-sm text-gray-900 bg-white p-2 rounded">{renderField(inspection.client_percentage)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section F: Present Outstanding */}
          {activeSection === 'F' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section F: Break up of Present Outstanding</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Outstanding Type</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.outstanding_type)}</p>
                </div>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">Limit</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{formatCurrency(inspection.limit_amount)}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          Outstanding
                          <div className="mt-2 space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Net</span>
                              <span>{formatCurrency(inspection.net_outstanding)}</span>
                            </div>
                            <div className="flex justify-between text-xs">
                              <span className="text-gray-500">Gross</span>
                              <span>{formatCurrency(inspection.gross_outstanding)}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section G: Business Analysis */}
          {activeSection === 'G' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section G: Business Industry / Analysis</h2>
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Market Situation</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.market_situation)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Client's Position</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.client_position)}</p>
                  </div>
                </div>

                {/* Competitors */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Main Competitors</h3>
                  {inspection.competitors?.length > 0 ? (
                    <div className="space-y-4">
                      {inspection.competitors.map((competitor, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <h4 className="font-medium text-gray-900 mb-3">Competitor {index + 1}</h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Name</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(competitor.name)}</p>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Address</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(competitor.address)}</p>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Market Share</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(competitor.market_share)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No competitors information available</p>
                  )}
                </div>

                {/* Business Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Business Reputation</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.business_reputation)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Production Type</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.production_type)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.product_name)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Production Capacity</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.production_capacity)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Actual Production</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.actual_production)}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Profitability Observation</label>
                  <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-3 rounded">{renderField(inspection.profitability_observation)}</p>
                </div>

                {/* Labor Force */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Labor Force</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Male</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Female</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Skilled</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unskilled</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Officer/Staff</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.male_officer)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.female_officer)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.skilled_officer)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.unskilled_officer)}</td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 text-sm font-medium text-gray-900">Labor/Worker</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.male_worker)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.female_worker)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.skilled_worker)}</td>
                          <td className="px-4 py-3 text-sm text-gray-900">{renderField(inspection.unskilled_worker)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Key Employees */}
                {inspection.key_employees?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Key Employees</h3>
                    <div className="space-y-4">
                      {inspection.key_employees.map((employee, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Name</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(employee.name)}</p>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Designation</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(employee.designation)}</p>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Age</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(employee.age)}</p>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Qualification</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(employee.qualification)}</p>
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-500">Experience</label>
                              <p className="mt-1 text-sm text-gray-900">{renderField(employee.experience)}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Section H: Property & Assets */}
          {activeSection === 'H' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section H: Property & Assets</h2>
              <div className="space-y-6">
                {/* Current Assets */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Assets</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Cash & Bank Balance', value: inspection.cash_balance },
                      { label: 'Stock in trade & investment/finished goods', value: inspection.stock_trade_finished },
                      { label: 'Stock in trade & investment/financial goods', value: inspection.stock_trade_financial },
                      { label: 'Accounts receivable (Sundry Debtors)', value: inspection.accounts_receivable },
                      { label: 'Advance Deposit & Pre-payment', value: inspection.advance_deposit },
                      { label: 'Other current assets', value: inspection.other_current_assets }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-900">Sub-Total (a)</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(inspection.current_assets_subtotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Fixed Assets */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Fixed Assets</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Land, Building & other immovable assets', value: inspection.land_building },
                      { label: 'Plant, Machinery & furniture & fixture', value: inspection.plant_machinery },
                      { label: 'Other assets', value: inspection.other_assets }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-900">Sub-Total (b)</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(inspection.fixed_assets_subtotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Total Assets */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-900">A. Grand Total (a+b)</span>
                    <span className="font-bold text-xl text-blue-900">{formatCurrency(inspection.total_assets)}</span>
                  </div>
                </div>

                {/* Current Liabilities */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Liabilities</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-medium text-gray-900 mb-2">Investment from Bank/Financial Institutions</h4>
                      <div className="space-y-2 ml-4">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-700">a) IBBL</span>
                          <span className="text-sm font-medium text-gray-900">{formatCurrency(inspection.ibbl_investment)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-700">b) Others</span>
                          <span className="text-sm font-medium text-gray-900">{formatCurrency(inspection.other_banks_investment)}</span>
                        </div>
                      </div>
                    </div>
                    {[
                      { label: 'Borrowing from other sources', value: inspection.borrowing_sources },
                      { label: 'Accounts Payable (Sundry Creditors)', value: inspection.accounts_payable },
                      { label: 'Others', value: inspection.other_current_liabilities }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-900">Sub-Total (a)</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(inspection.current_liabilities_subtotal)}</span>
                    </div>
                  </div>
                </div>

                {/* Other Liabilities */}
                <div className="space-y-3">
                  {[
                    { label: 'Long Term Liability', value: inspection.long_term_liabilities },
                    { label: 'Other non-current liabilities', value: inspection.other_non_current_liabilities }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center py-2">
                      <span className="text-sm text-gray-700">{item.label}</span>
                      <span className="text-sm font-medium text-gray-900">{formatCurrency(item.value)}</span>
                    </div>
                  ))}
                </div>

                {/* Total Liabilities */}
                <div className="p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">B. Total Liabilities (a+b+c)</span>
                    <span className="font-bold">{formatCurrency(inspection.total_liabilities)}</span>
                  </div>
                </div>

                {/* Owner's Equity */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Owner's Equity</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Paid up capital / owner\'s Capital Balance', value: inspection.paid_up_capital },
                      { label: 'Resources', value: inspection.resources },
                      { label: 'Retained Earning / Net Profit', value: inspection.retained_earning }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100">
                        <span className="text-sm text-gray-700">{item.label}</span>
                        <span className="text-sm font-medium text-gray-900">{formatCurrency(item.value)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="text-sm font-medium text-gray-900">C. Total Equity (d+e+f)</span>
                      <span className="text-sm font-bold text-gray-900">{formatCurrency(inspection.total_equity)}</span>
                    </div>
                  </div>
                </div>

                {/* Grand Total & Net Worth */}
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-green-900">Grand Total (a+b+c+d+e+f)</span>
                      <span className="font-bold text-xl text-green-900">{formatCurrency(inspection.grand_total)}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-orange-900">NET WORTH (Total Assets - Total Liabilities)</span>
                      <span className="font-bold text-xl text-orange-900">{formatCurrency(inspection.net_worth)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section I: Working Capital Assessment */}
          {activeSection === 'I' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section I: Working Capital Assessment</h2>
              {inspection.working_capital_items?.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-gray-200">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                        <th className="border border-gray-200 px-2 py-1 text-center text-sm font-medium text-gray-700">Unit</th>
                        <th className="border border-gray-200 px-2 py-1 text-center text-sm font-medium text-gray-700">Rate</th>
                        <th className="border border-gray-200 px-2 py-1 text-center text-sm font-medium text-gray-700">Amount</th>
                        <th className="border border-gray-200 px-2 py-1 text-center text-sm font-medium text-gray-700">Tied up Days</th>
                        <th className="border border-gray-200 px-2 py-1 text-center text-sm font-medium text-gray-700">Amount d\\e</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inspection.working_capital_items.map((item, index) => (
                        <tr key={index}>
                          <td className="border border-gray-200 px-4 py-2 text-sm">{item.name}</td>
                          <td className="border border-gray-200 px-2 py-1 text-center">{renderField(item.unit)}</td>
                          <td className="border border-gray-200 px-2 py-1 text-center">{renderField(item.rate)}</td>
                          <td className="border border-gray-200 px-2 py-1 text-center">{formatCurrency(item.amount)}</td>
                          <td className="border border-gray-200 px-2 py-1 text-center">{renderField(item.tied_up_days)}</td>
                          <td className="border border-gray-200 px-2 py-1 text-center">{formatCurrency(item.amount_dxe)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No working capital assessment data available</p>
              )}
            </div>
          )}

          {/* Section J: Godown Particulars */}
          {activeSection === 'J' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section J: Godown Particulars</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.godown_location)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Capacity</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.godown_capacity)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Space</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.godown_space)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Nature</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.godown_nature)}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Owner</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.godown_owner)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Distance from Branch</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.distance_from_branch)}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Items to Store</label>
                    <p className="mt-1 text-sm text-gray-900 bg-gray-50 p-2 rounded">{renderField(inspection.items_to_store)}</p>
                  </div>
                </div>
              </div>

              {/* Godown Facilities */}
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Godown Facilities</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: 'Warehouse License obtained', value: inspection.warehouse_license },
                    { label: 'Godown guard round the clock', value: inspection.godown_guard },
                    { label: 'Damp proof and safe', value: inspection.damp_proof },
                    { label: 'Easy access for officials', value: inspection.easy_access },
                    { label: 'Letter of disclaimer obtained', value: inspection.letter_disclaimer },
                    { label: 'Insurance Policy obtained', value: inspection.insurance_policy },
                    { label: 'Godown hired by Bank', value: inspection.godown_hired }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className={`inline-block w-3 h-3 rounded-full mr-3 ${
                        item.value ? 'bg-green-500' : 'bg-red-500'
                      }`}></span>
                      <span className="text-sm text-gray-700">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Section K: Checklist */}
          {activeSection === 'K' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section K: Checklist</h2>
              {inspection.checklist_items && Object.keys(inspection.checklist_items).length > 0 ? (
                <div className="space-y-4">
                  {Object.entries(inspection.checklist_items).map(([key, value]) => (
                    <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                      <span className="text-sm font-medium text-gray-700 flex-1">{key}</span>
                      <span className="text-sm font-medium">{renderChecklistValue(value)}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No checklist data available</p>
              )}
            </div>
          )}

          {/* Section L: Media & Documents */}
          {activeSection === 'L' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section L: Media & Documents</h2>
              <div className="space-y-8">
                {/* Photos */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Site Photos ({inspection.site_photos?.length || 0})</h3>
                  {inspection.site_photos?.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {inspection.site_photos.map((photo, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={photo.url || '/placeholder-image.jpg'}
                            alt={photo.name || `Site photo ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <span className="text-white text-sm text-center px-2">{photo.name}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No photos available</p>
                  )}
                </div>

                {/* Videos */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Site Videos ({inspection.site_video?.length || 0})</h3>
                  {inspection.site_video?.length > 0 ? (
                    <div className="space-y-4">
                      {inspection.site_video.map((video, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <video
                            src={video.url}
                            controls
                            className="w-full rounded-lg"
                          />
                          <p className="mt-2 text-sm text-gray-600">{video.name}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No videos available</p>
                  )}
                </div>

                {/* Documents */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Supporting Documents ({inspection.uploaded_documents?.length || 0})</h3>
                  {inspection.uploaded_documents?.length > 0 ? (
                    <div className="space-y-3">
                      {inspection.uploaded_documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">Uploaded: {formatDate(doc.upload_date)}</p>
                            </div>
                          </div>
                          <a
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            View
                          </a>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No documents available</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Location Tracking */}
          {activeSection === 'location' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Location Tracking Data</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-medium text-blue-900 mb-2">Summary</h3>
                    <dl className="space-y-2">
                      <div>
                        <dt className="text-sm text-blue-700">Total Points</dt>
                        <dd className="text-2xl font-bold text-blue-900">{inspection.total_location_points || 0}</dd>
                      </div>
                      <div>
                        <dt className="text-sm text-blue-700">Tracking Duration</dt>
                        <dd className="text-sm text-blue-900">
                          {inspection.location_start_time && inspection.location_end_time 
                            ? `${Math.round((new Date(inspection.location_end_time) - new Date(inspection.location_start_time)) / (1000 * 60))} minutes`
                            : 'N/A'
                          }
                        </dd>
                      </div>
                    </dl>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-medium text-green-900 mb-2">Start Location</h3>
                    {inspection.location_points?.length > 0 ? (
                      <dl className="space-y-1">
                        <div>
                          <dt className="text-xs text-green-700">Latitude</dt>
                          <dd className="text-sm font-medium text-green-900">{inspection.location_points[0]?.latitude?.toFixed(6)}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-green-700">Longitude</dt>
                          <dd className="text-sm font-medium text-green-900">{inspection.location_points[0]?.longitude?.toFixed(6)}</dd>
                        </div>
                        <div>
                          <dt className="text-xs text-green-700">Time</dt>
                          <dd className="text-sm text-green-900">{formatDate(inspection.location_points[0]?.timestamp)}</dd>
                        </div>
                      </dl>
                    ) : (
                      <p className="text-green-700">No start location data</p>
                    )}
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h3 className="font-medium text-purple-900 mb-2">End Location</h3>
                    {inspection.location_points?.length > 0 ? (
                      <dl className="space-y-1">
                        <div>
                          <dt className="text-xs text-purple-700">Latitude</dt>
                          <dd className="text-sm font-medium text-purple-900">
                            {inspection.location_points[inspection.location_points.length - 1]?.latitude?.toFixed(6)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-purple-700">Longitude</dt>
                          <dd className="text-sm font-medium text-purple-900">
                            {inspection.location_points[inspection.location_points.length - 1]?.longitude?.toFixed(6)}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-xs text-purple-700">Time</dt>
                          <dd className="text-sm text-purple-900">
                            {formatDate(inspection.location_points[inspection.location_points.length - 1]?.timestamp)}
                          </dd>
                        </div>
                      </dl>
                    ) : (
                      <p className="text-purple-700">No end location data</p>
                    )}
                  </div>
                </div>

                {/* Location Points Table */}
                {inspection.location_points?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">All Location Points</h3>
                    <div className="overflow-x-auto">
                      <table className="min-w-full border border-gray-200">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500">Latitude</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500">Longitude</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500">Accuracy</th>
                            <th className="border border-gray-200 px-4 py-2 text-left text-xs font-medium text-gray-500">Timestamp</th>
                          </tr>
                        </thead>
                        <tbody>
                          {inspection.location_points.slice(0, 10).map((point, index) => (
                            <tr key={index}>
                              <td className="border border-gray-200 px-4 py-2 text-sm">{index + 1}</td>
                              <td className="border border-gray-200 px-4 py-2 text-sm">{point.latitude?.toFixed(6)}</td>
                              <td className="border border-gray-200 px-4 py-2 text-sm">{point.longitude?.toFixed(6)}</td>
                              <td className="border border-gray-200 px-4 py-2 text-sm">{point.accuracy ? `${point.accuracy}m` : 'N/A'}</td>
                              <td className="border border-gray-200 px-4 py-2 text-sm">{formatDate(point.timestamp)}</td>
                            </tr>
                          ))}
                          {inspection.location_points.length > 10 && (
                            <tr>
                              <td colSpan="5" className="border border-gray-200 px-4 py-2 text-sm text-center text-gray-500">
                                ... and {inspection.location_points.length - 10} more points
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InspectionDetails;