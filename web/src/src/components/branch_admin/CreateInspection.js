// // src/components/branch_admin/CreateInspection.js
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { createNewInspection } from '../../services/inspectionService';
// import { useAuth } from '../../context/AuthContext';
// import { useNotification } from '../../context/NotificationContext';
// import { INSPECTION_STATUS } from '../../utils/constants';

// const CreateInspection = () => {
//   const [formData, setFormData] = useState({
//     project: '',
//     client_name: '',
//     industry_name: '',
//     phone_number: '',
//     assigned_inspector: '',
//     branch_name: '',
//     status: INSPECTION_STATUS.PENDING
//   });
//   const [inspectors, setInspectors] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { showSuccess, showError } = useNotification();

//   React.useEffect(() => {
//     // Set branch name from current user
//     setFormData(prev => ({ ...prev, branch_name: user?.branch_name || '' }));
    
//     // Fetch inspectors for this branch
//     fetchInspectors();
//   }, [user]);

//   const fetchInspectors = async () => {
//     try {
//       // This would be an API call to get inspectors for the branch
//       // For now, using mock data
//       const mockInspectors = [
//         { id: 1, user_name: 'Inspector One', email: 'inspector1@example.com' },
//         { id: 2, user_name: 'Inspector Two', email: 'inspector2@example.com' },
//       ];
//       setInspectors(mockInspectors);
//     } catch (error) {
//       showError('Failed to fetch inspectors');
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await createNewInspection(formData);
//       showSuccess('Inspection created successfully');
//       navigate('/branch-admin/inspections');
//     } catch (error) {
//       showError('Failed to create inspection');
//       console.error('Error creating inspection:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="px-4 py-6 sm:px-0 lg:px-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Create New Inspection</h1>
//         <p className="mt-1 text-sm text-gray-600">
//           Fill in the details to create a new inspection assignment
//         </p>
//       </div>

//       <div className="bg-white shadow sm:rounded-lg">
//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div className="px-4 py-5 sm:p-6">
//             <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//               <div>
//                 <label htmlFor="project" className="block text-sm font-medium text-gray-700">
//                   Project Name
//                 </label>
//                 <input
//                   type="text"
//                   name="project"
//                   id="project"
//                   required
//                   value={formData.project}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
//                   Client Name
//                 </label>
//                 <input
//                   type="text"
//                   name="client_name"
//                   id="client_name"
//                   required
//                   value={formData.client_name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="industry_name" className="block text-sm font-medium text-gray-700">
//                   Industry Name
//                 </label>
//                 <input
//                   type="text"
//                   name="industry_name"
//                   id="industry_name"
//                   required
//                   value={formData.industry_name}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phone_number"
//                   id="phone_number"
//                   required
//                   value={formData.phone_number}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
//                 />
//               </div>

//               <div>
//                 <label htmlFor="assigned_inspector" className="block text-sm font-medium text-gray-700">
//                   Assign Inspector
//                 </label>
//                 <select
//                   name="assigned_inspector"
//                   id="assigned_inspector"
//                   required
//                   value={formData.assigned_inspector}
//                   onChange={handleChange}
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
//                 >
//                   <option value="">Select an inspector</option>
//                   {inspectors.map(inspector => (
//                     <option key={inspector.id} value={inspector.id}>
//                       {inspector.user_name} - {inspector.email}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">
//                   Branch Name
//                 </label>
//                 <input
//                   type="text"
//                   name="branch_name"
//                   id="branch_name"
//                   required
//                   value={formData.branch_name}
//                   onChange={handleChange}
//                   readOnly
//                   className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100 sm:text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
//             <button
//               type="button"
//               onClick={() => navigate('/branch-admin/inspections')}
//               className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               disabled={loading}
//               className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
//             >
//               {loading ? 'Creating...' : 'Create Inspection'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateInspection;








// src/components/branch_admin/CreateInspection.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  createNewInspection, 
  getBranchInspectors 
} from '../../services/inspectionService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import { INSPECTION_STATUS } from '../../utils/constants';

const CreateInspection = () => {
  const [formData, setFormData] = useState({
    project: '',
    client_name: '',
    industry_name: '',
    phone_number: '',
    assigned_inspector: '',
    branch_name: '',
    status: INSPECTION_STATUS.PENDING
  });
  const [inspectors, setInspectors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingInspectors, setFetchingInspectors] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    // Set branch name from current user
    if (user?.branch_name) {
      setFormData(prev => ({ ...prev, branch_name: user.branch_name }));
      fetchInspectors(user.branch_name);
    }
  }, [user]);

  const fetchInspectors = async (branchName) => {
    try {
      setFetchingInspectors(true);
      console.log('🔄 Fetching inspectors for branch:', branchName);
      
      // Call API to get inspectors for this specific branch
      const branchInspectors = await getBranchInspectors(branchName);
      console.log('✅ Inspectors loaded:', branchInspectors);
      
      // Format inspectors for dropdown
      const formattedInspectors = Array.isArray(branchInspectors) 
        ? branchInspectors 
        : [];
      
      setInspectors(formattedInspectors);
    } catch (error) {
      console.error('❌ Error fetching inspectors:', error);
      showError(`Failed to fetch inspectors: ${error.message}`);
      setInspectors([]);
    } finally {
      setFetchingInspectors(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Simple phone number validation
  const handlePhoneChange = (e) => {
    let value = e.target.value;
    
    // Remove all non-digit characters
    const digitsOnly = value.replace(/\D/g, '');
    
    // Only allow numbers and limit to 11 digits
    if (digitsOnly.length <= 11) {
      setFormData(prev => ({ ...prev, phone_number: digitsOnly }));
    }
  };

  // Validate phone number
  const isValidPhoneNumber = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    return digitsOnly.length === 11 && /^01[3-9]\d{8}$/.test(digitsOnly);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.project?.trim()) {
      showError('Please enter project name');
      return;
    }

    if (!formData.client_name?.trim()) {
      showError('Please enter client name');
      return;
    }

    if (!formData.industry_name?.trim()) {
      showError('Please enter industry name');
      return;
    }

    if (!formData.phone_number?.trim()) {
      showError('Please enter phone number');
      return;
    }

    // Phone number validation - must be 11 digits and valid Bangladeshi number
    const phoneDigits = formData.phone_number.replace(/\D/g, '');
    if (phoneDigits.length !== 11) {
      showError('Phone number must be exactly 11 digits');
      return;
    }

    if (!/^01[3-9]\d{8}$/.test(phoneDigits)) {
      showError('Please enter a valid Bangladeshi phone number (01XXXXXXXXX)');
      return;
    }

    if (!formData.assigned_inspector) {
      showError('Please select an inspector');
      return;
    }

    if (!formData.branch_name?.trim()) {
      showError('Branch name is required');
      return;
    }

    setLoading(true);

    try {
      console.log('📤 Creating inspection with data:', formData);
      
      // Prepare data for API
      const inspectionData = {
        project: formData.project.trim(),
        client_name: formData.client_name.trim(),
        industry_name: formData.industry_name.trim(),
        phone_number: formData.phone_number, // Send as digits only
        assigned_inspector: formData.assigned_inspector,
        branch_name: formData.branch_name,
        status: formData.status
      };

      console.log('📝 Final inspection data:', inspectionData);
      
      const result = await createNewInspection(inspectionData);
      console.log('✅ Inspection created successfully:', result);
      
      showSuccess('Inspection created and assigned successfully!');
      
      // Redirect to inspections list
      navigate('/branch-admin/inspections');
    } catch (error) {
      console.error('❌ Error creating inspection:', error);
      
      // Show detailed error message
      if (error.response?.data) {
        const errorData = error.response.data;
        if (typeof errorData === 'object') {
          const errorMessages = Object.values(errorData).flat();
          showError(`Failed to create inspection: ${errorMessages.join(', ')}`);
        } else {
          showError(`Failed to create inspection: ${errorData}`);
        }
      } else {
        showError('Failed to create inspection. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Format phone number for display (add spaces for readability)
  const formatPhoneDisplay = (phone) => {
    const digitsOnly = phone.replace(/\D/g, '');
    if (digitsOnly.length === 11) {
      return `${digitsOnly.slice(0, 3)} ${digitsOnly.slice(3, 7)} ${digitsOnly.slice(7)}`;
    }
    return digitsOnly;
  };

  return (
    <div className="px-4 py-6 sm:px-0 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create New Inspection</h1>
        <p className="mt-1 text-sm text-gray-600">
          Fill in the details to create a new inspection assignment
        </p>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="px-4 py-5 sm:p-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {/* Project Name */}
              <div>
                <label htmlFor="project" className="block text-sm font-medium text-gray-700">
                  Project Name *
                </label>
                <input
                  type="text"
                  name="project"
                  id="project"
                  required
                  value={formData.project}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter project name"
                  maxLength={100}
                />
              </div>

              {/* Client Name */}
              <div>
                <label htmlFor="client_name" className="block text-sm font-medium text-gray-700">
                  Client Name *
                </label>
                <input
                  type="text"
                  name="client_name"
                  id="client_name"
                  required
                  value={formData.client_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter client name"
                  maxLength={100}
                />
              </div>

              {/* Industry Name */}
              <div>
                <label htmlFor="industry_name" className="block text-sm font-medium text-gray-700">
                  Industry Name *
                </label>
                <input
                  type="text"
                  name="industry_name"
                  id="industry_name"
                  required
                  value={formData.industry_name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="Enter industry name"
                  maxLength={100}
                />
              </div>

              {/* Phone Number */}
              <div>
                <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  id="phone_number"
                  required
                  value={formatPhoneDisplay(formData.phone_number)}
                  onChange={handlePhoneChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  placeholder="01X XXX XXXX"
                  maxLength={13} // 11 digits + 2 spaces
                />
                <p className="mt-1 text-xs text-gray-500">
                  Enter 11-digit Bangladeshi number (01XXXXXXXXX)
                </p>
                {formData.phone_number && !isValidPhoneNumber(formData.phone_number) && (
                  <p className="mt-1 text-xs text-red-500">
                    Please enter a valid 11-digit Bangladeshi phone number
                  </p>
                )}
              </div>

              {/* Assigned Inspector */}
              <div>
                <label htmlFor="assigned_inspector" className="block text-sm font-medium text-gray-700">
                  Assign Inspector *
                </label>
                <select
                  name="assigned_inspector"
                  id="assigned_inspector"
                  required
                  value={formData.assigned_inspector}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:ring-green-500 focus:border-green-500 sm:text-sm"
                  disabled={fetchingInspectors}
                >
                  <option value="">Select an inspector</option>
                  {inspectors.map(inspector => (
                    <option key={inspector.id} value={inspector.id}>
                      {inspector.user_name || inspector.name || `Inspector ${inspector.id}`} 
                      {inspector.email ? ` - ${inspector.email}` : ''}
                    </option>
                  ))}
                </select>
                {fetchingInspectors && (
                  <p className="mt-1 text-sm text-blue-500 flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-blue-500" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Loading inspectors...
                  </p>
                )}
                {!fetchingInspectors && inspectors.length === 0 && (
                  <p className="mt-1 text-sm text-amber-600">
                    No inspectors available for this branch. Please contact administrator.
                  </p>
                )}
                {!fetchingInspectors && inspectors.length > 0 && (
                  <p className="mt-1 text-sm text-green-600">
                    {inspectors.length} inspector(s) available
                  </p>
                )}
              </div>

              {/* Branch Name (Read-only) */}
              <div>
                <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">
                  Branch Name
                </label>
                <input
                  type="text"
                  name="branch_name"
                  id="branch_name"
                  required
                  value={formData.branch_name}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 bg-gray-100 sm:text-sm"
                />
                <p className="mt-1 text-sm text-gray-500">
                  This inspection will be assigned to {formData.branch_name} branch
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <h3 className="text-sm font-medium text-blue-800 mb-2">Inspection Assignment Flow</h3>
              <ul className="text-sm text-blue-700 space-y-1">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Inspection will be created with status: <strong>Pending</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Assigned inspector will receive this inspection in their dashboard</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Inspector can then start the inspection process</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>You can track progress from the inspections list</span>
                </li>
              </ul>
            </div>

            {/* Form Validation Summary */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-700 mb-2">Validation Checklist</h4>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className={formData.project?.trim() ? 'text-green-600' : 'text-gray-500'}>
                  {formData.project?.trim() ? '✓' : '○'} Project name provided
                </li>
                <li className={formData.client_name?.trim() ? 'text-green-600' : 'text-gray-500'}>
                  {formData.client_name?.trim() ? '✓' : '○'} Client name provided
                </li>
                <li className={formData.industry_name?.trim() ? 'text-green-600' : 'text-gray-500'}>
                  {formData.industry_name?.trim() ? '✓' : '○'} Industry name provided
                </li>
                <li className={isValidPhoneNumber(formData.phone_number) ? 'text-green-600' : 'text-gray-500'}>
                  {isValidPhoneNumber(formData.phone_number) ? '✓' : '○'} Valid phone number
                </li>
                <li className={formData.assigned_inspector ? 'text-green-600' : 'text-gray-500'}>
                  {formData.assigned_inspector ? '✓' : '○'} Inspector selected
                </li>
                <li className={formData.branch_name?.trim() ? 'text-green-600' : 'text-gray-500'}>
                  {formData.branch_name?.trim() ? '✓' : '○'} Branch assigned
                </li>
              </ul>
            </div>
          </div>

          {/* Form Actions */}
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
            <button
              type="button"
              onClick={() => navigate('/branch-admin/inspections')}
              className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || fetchingInspectors || inspectors.length === 0 || !isValidPhoneNumber(formData.phone_number)}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creating...
                </>
              ) : (
                'Create & Assign Inspection'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInspection;