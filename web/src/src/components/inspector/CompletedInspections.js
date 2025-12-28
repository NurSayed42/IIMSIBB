/////////////


// // src/components/inspector/InspectionForm.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getNewInspections, updateInspection } from '../../services/inspectionService';
// import { useNotification } from '../../context/NotificationContext';
// import { INSPECTION_STATUS } from '../../utils/constants';

// const InspectionForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { showSuccess, showError } = useNotification();
  
//   const [inspection, setInspection] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [activeSection, setActiveSection] = useState('A');
  
//   // Location Tracking State
//   const [isLocationTracking, setIsLocationTracking] = useState(false);
//   const [locationPoints, setLocationPoints] = useState([]);
//   const [locationStartTime, setLocationStartTime] = useState(null);
//   const [locationEndTime, setLocationEndTime] = useState(null);
//   const [locationIntervalId, setLocationIntervalId] = useState(null); // Add this line


//   // Form Data State - All sections from Flutter app
//   const [formData, setFormData] = useState({
//     // Section A: Company's Client's Information
//     client_name: '',
//     group_name: '',
//     industry_name: '',
//     nature_of_business: '',
//     legal_status: '',
//     date_of_establishment: '',
//     office_address: '',
//     showroom_address: '',
//     factory_address: '',
//     phone_number: '',
//     account_number: '',
//     account_id: '',
//     tin_number: '',
//     date_of_opening: '',
//     vat_reg_number: '',
//     first_investment_date: '',
//     sector_code: '',
//     trade_license: '',
//     economic_purpose_code: '',
//     investment_category: '',
    
//     // Section B: Owner Information
//     owner_name: '',
//     owner_age: '',
//     father_name: '',
//     mother_name: '',
//     spouse_name: '',
//     academic_qualification: '',
//     children_info: '',
//     business_successor: '',
//     residential_address: '',
//     permanent_address: '',
    
//     // Section C: Partners/Directors
//     partners_directors: [{ name: '', age: '', qualification: '', share: '', status: '', relationship: '' }],
    
//     // Section D: Purpose
//     purpose_investment: '',
//     purpose_bank_guarantee: '',
//     period_investment: '',
    
//     // Section E: Proposed Facilities
//     facility_type: '',
//     existing_limit: '',
//     applied_limit: '',
//     recommended_limit: '',
//     bank_percentage: '',
//     client_percentage: '',
    
//     // Section F: Present Outstanding
//     outstanding_type: '',
//     limit_amount: '',
//     net_outstanding: '',
//     gross_outstanding: '',
    
//     // Section G: Business Analysis
//     market_situation: '',
//     client_position: '',
//     competitors: Array(5).fill().map(() => ({ name: '', address: '', market_share: '' })),
//     business_reputation: '',
//     production_type: '',
//     product_name: '',
//     production_capacity: '',
//     actual_production: '',
//     profitability_observation: '',
    
//     // Labor Force
//     male_officer: '',
//     female_officer: '',
//     skilled_officer: '',
//     unskilled_officer: '',
//     male_worker: '',
//     female_worker: '',
//     skilled_worker: '',
//     unskilled_worker: '',
    
//     // Key Employees
//     key_employees: [{ name: '', designation: '', age: '', qualification: '', experience: '' }],
    
//     // Section H: Property & Assets
//     cash_balance: '',
//     stock_trade_finished: '',
//     stock_trade_financial: '',
//     accounts_receivable: '',
//     advance_deposit: '',
//     other_current_assets: '',
//     land_building: '',
//     plant_machinery: '',
//     other_assets: '',
//     ibbl_investment: '',
//     other_banks_investment: '',
//     borrowing_sources: '',
//     accounts_payable: '',
//     other_current_liabilities: '',
//     long_term_liabilities: '',
//     other_non_current_liabilities: '',
//     paid_up_capital: '',
//     retained_earning: '',
//     resources: '',
    
//     // Auto-calculated financial values
//     current_assets_subtotal: 0,
//     fixed_assets_subtotal: 0,
//     total_assets: 0,
//     current_liabilities_subtotal: 0,
//     total_liabilities: 0,
//     total_equity: 0,
//     grand_total: 0,
//     net_worth: 0,
    
//     // Section I: Working Capital Assessment
//     working_capital_items: [
//       { name: 'Raw Materials (imported)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
//       { name: 'Raw Materials (Local)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
//       { name: 'Work in Process', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
//       { name: 'Finished goods', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' }
//     ],
    
//     // Section J: Godown Particulars
//     godown_location: '',
//     godown_capacity: '',
//     godown_space: '',
//     godown_nature: '',
//     godown_owner: '',
//     distance_from_branch: '',
//     items_to_store: '',
//     warehouse_license: false,
//     godown_guard: false,
//     damp_proof: false,
//     easy_access: false,
//     letter_disclaimer: false,
//     insurance_policy: false,
//     godown_hired: false,
    
//     // Section K: Checklist
//     checklist_items: {
//       'Business establishment physically verified': null,
//       'Honesty and integrity ascertained': null,
//       'Confidential Report obtained': null,
//       'CIB report obtained': null,
//       'Items permissible by Islamic Shariah': null,
//       'Items not restricted by Bangladesh Bank': null,
//       'Items permissible by Investment Policy': null,
//       'Market Price verified': null,
//       'Constant market demand': null,
//       'F-167 A duly filled': null,
//       'F-167 B property filled': null,
//       'Application particulars verified': null,
//       'IRC, ERC, VAT copies enclosed': null,
//       'TIN Certificate enclosed': null,
//       'Rental Agreement enclosed': null,
//       'Trade License enclosed': null,
//       'Partnership Deed enclosed': null,
//       'Memorandum & Articles enclosed': null,
//       'Board resolution enclosed': null,
//       'Directors particulars enclosed': null,
//       'Current Account Statement enclosed': null,
//       'Creditors/Debtors list enclosed': null,
//       'IRC form with documents enclosed': null,
//       'Audited Balance sheet enclosed': null,
//     },
    
//     // Section L: Site Photos & Video
//     site_photos: [],
//     site_video: null,
    
//     // Section M: Documents Upload
//     uploaded_documents: [],
    
//     status: INSPECTION_STATUS.IN_PROGRESS
//   });

//   // Dropdown options
//   const dropdownOptions = {
//     investmentCategories: [
//       'Agriculture (AG)', 'Large & Medium Scale Industry-LM', 'Working Capital (Jute) WJ',
//       'Working Capital (other than Jute) WO', 'Jute Trading (JT)', 'Jute & Jute goods Export (JE)',
//       'Other Exports (OE)', 'Other Commercial Investments (OC)', 'Urban Housing (UH)',
//       'Special program', 'Others (OT)'
//     ],
//     facilityTypes: [
//       'Bai-Murabaha', 'Bai-Muajjal', 'Bai-Salam', 'Mudaraba', 'BB LC/ BILLS',
//       'FBN/FBP/IBP', 'Others'
//     ],
//     outstandingTypes: [
//       'Bai-Murabaha TR', 'Bai-Muajjal TR', 'Bai-Salam', 'BB LC/ BILLS',
//       'FBN/FBP/IBP', 'None', 'Others'
//     ],
//     marketSituations: [
//       'Highly Saturated', 'Saturated', 'Low Demand Gap', 'High Demand Gap'
//     ],
//     clientPositions: [
//       'Market Leader', 'Medium', 'Weak', 'Deteriorating'
//     ],
//     reputationOptions: [
//       'Very Good', 'Good', 'Bad'
//     ],
//     productionTypes: [
//       'Export Oriented', 'Import Substitute', 'Agro Based'
//     ],
//     statusOptions: [
//       'Pending', 'In Progress', 'Completed', 'Approved', 'Rejected'
//     ]
//   };

//   useEffect(() => {
//     fetchInspection();
//   }, [id]);

//   const fetchInspection = async () => {
//     try {
//       const inspections = await getNewInspections();
//       const found = inspections.find(i => i.id === parseInt(id));
//       if (found) {
//         setInspection(found);
//         // Pre-fill data from the assigned inspection
//         setFormData(prev => ({
//           ...prev,
//           client_name: found.client_name || '',
//           industry_name: found.industry_name || '',
//           phone_number: found.phone_number || ''
//         }));
//       }
//     } catch (error) {
//       showError('Failed to fetch inspection details');
//       console.error('Error fetching inspection:', error);
//     }
//   };

//   // Handle form field changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   };

//   // Handle nested object changes (for partners, employees, etc.)
//   const handleNestedChange = (section, index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   };

//   // Handle checklist changes
//   const handleChecklistChange = (key, value) => {
//     setFormData(prev => ({
//       ...prev,
//       checklist_items: {
//         ...prev.checklist_items,
//         [key]: value
//       }
//     }));
//   };

//   // Handle working capital item changes
//   const handleWorkingCapitalChange = (index, field, value) => {
//     setFormData(prev => {
//       const updatedItems = prev.working_capital_items.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       );
      
//       // Auto-calculate amount and amount_dxe
//       if (field === 'unit' || field === 'rate') {
//         const item = updatedItems[index];
//         const unit = parseFloat(item.unit) || 0;
//         const rate = parseFloat(item.rate) || 0;
//         const amount = unit * rate;
//         updatedItems[index].amount = amount.toFixed(2);
//       }
      
//       if (field === 'tied_up_days' || field === 'amount') {
//         const item = updatedItems[index];
//         const amount = parseFloat(item.amount) || 0;
//         const tiedUpDays = parseFloat(item.tied_up_days) || 0;
//         const amountDxe = amount * tiedUpDays;
//         updatedItems[index].amount_dxe = amountDxe.toFixed(2);
//       }
      
//       return { ...prev, working_capital_items: updatedItems };
//     });
//   };

//   // Add/Remove dynamic items
//   const addPartner = () => {
//     setFormData(prev => ({
//       ...prev,
//       partners_directors: [...prev.partners_directors, { name: '', age: '', qualification: '', share: '', status: '', relationship: '' }]
//     }));
//   };

//   const removePartner = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       partners_directors: prev.partners_directors.filter((_, i) => i !== index)
//     }));
//   };

//   const addEmployee = () => {
//     setFormData(prev => ({
//       ...prev,
//       key_employees: [...prev.key_employees, { name: '', designation: '', age: '', qualification: '', experience: '' }]
//     }));
//   };

//   const removeEmployee = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       key_employees: prev.key_employees.filter((_, i) => i !== index)
//     }));
//   };

//   // Location Tracking Functions
//   const startLocationTracking = () => {
//     setIsLocationTracking(true);
//     setLocationStartTime(new Date());
//     setLocationPoints([]);
    
//     // Get initial location
//     getCurrentLocation();
    
//     // Set up periodic location updates (every 5 minutes)
//     const intervalId = setInterval(getCurrentLocation, 5 * 60 * 1000);
    
//     // Store interval ID for cleanup
//     setLocationIntervalId(intervalId);
    
//     showSuccess('Location tracking started successfully!');
//   };

//   const stopLocationTracking = () => {
//     setIsLocationTracking(false);
//     setLocationEndTime(new Date());
    
//     // Clear interval
//     if (locationIntervalId) {
//       clearInterval(locationIntervalId);
//       setLocationIntervalId(null);
//     }
    
//     showSuccess(`Location tracking stopped. ${locationPoints.length} points captured.`);
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const locationPoint = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             accuracy: position.coords.accuracy,
//             altitude: position.coords.altitude,
//             speed: position.coords.speed,
//             heading: position.coords.heading,
//             timestamp: new Date().toISOString(),
//           };
          
//           setLocationPoints(prev => [...prev, locationPoint]);
//           console.log('📍 Location captured:', position.coords.latitude, position.coords.longitude);
//         },
//         (error) => {
//           console.error('Error getting location:', error);
//           showError(`Error getting location: ${error.message}`);
//         },
//         { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
//       );
//     } else {
//       showError('Geolocation is not supported by this browser.');
//     }
//   };

//   // Auto-calculation functions for financial data
//   const calculateFinancials = () => {
//     // Current Assets
//     const currentAssets = 
//       (parseFloat(formData.cash_balance) || 0) +
//       (parseFloat(formData.stock_trade_finished) || 0) +
//       (parseFloat(formData.stock_trade_financial) || 0) +
//       (parseFloat(formData.accounts_receivable) || 0) +
//       (parseFloat(formData.advance_deposit) || 0) +
//       (parseFloat(formData.other_current_assets) || 0);
    
//     // Fixed Assets
//     const fixedAssets = 
//       (parseFloat(formData.land_building) || 0) +
//       (parseFloat(formData.plant_machinery) || 0) +
//       (parseFloat(formData.other_assets) || 0);
    
//     // Total Assets
//     const totalAssets = currentAssets + fixedAssets;
    
//     // Current Liabilities
//     const currentLiabilities = 
//       (parseFloat(formData.ibbl_investment) || 0) +
//       (parseFloat(formData.other_banks_investment) || 0) +
//       (parseFloat(formData.borrowing_sources) || 0) +
//       (parseFloat(formData.accounts_payable) || 0) +
//       (parseFloat(formData.other_current_liabilities) || 0);
    
//     // Total Liabilities
//     const totalLiabilities = currentLiabilities + 
//       (parseFloat(formData.long_term_liabilities) || 0) +
//       (parseFloat(formData.other_non_current_liabilities) || 0);
    
//     // Total Equity
//     const totalEquity = 
//       (parseFloat(formData.paid_up_capital) || 0) +
//       (parseFloat(formData.retained_earning) || 0) +
//       (parseFloat(formData.resources) || 0);
    
//     // Grand Total and Net Worth
//     const grandTotal = totalLiabilities + totalEquity;
//     const netWorth = totalAssets - totalLiabilities;
    
//     // Update form data with calculated values
//     setFormData(prev => ({
//       ...prev,
//       current_assets_subtotal: currentAssets,
//       fixed_assets_subtotal: fixedAssets,
//       total_assets: totalAssets,
//       current_liabilities_subtotal: currentLiabilities,
//       total_liabilities: totalLiabilities,
//       total_equity: totalEquity,
//       grand_total: grandTotal,
//       net_worth: netWorth
//     }));
//   };

//   // Auto-calculate when financial fields change
//   useEffect(() => {
//     calculateFinancials();
//   }, [
//     formData.cash_balance, formData.stock_trade_finished, formData.stock_trade_financial,
//     formData.accounts_receivable, formData.advance_deposit, formData.other_current_assets,
//     formData.land_building, formData.plant_machinery, formData.other_assets,
//     formData.ibbl_investment, formData.other_banks_investment, formData.borrowing_sources,
//     formData.accounts_payable, formData.other_current_liabilities, formData.long_term_liabilities,
//     formData.other_non_current_liabilities, formData.paid_up_capital, formData.retained_earning,
//     formData.resources
//   ]);


//   // Add this function before the handleSubmit function
//   const validateInspectionData = (data) => {
//     const errors = {};
    
//     // Required fields validation
//     if (!data.client_name?.trim()) {
//       errors.client_name = 'Client name is required';
//     }
    
//     if (!data.industry_name?.trim()) {
//       errors.industry_name = 'Industry name is required';
//     }
    
//     if (!data.nature_of_business?.trim()) {
//       errors.nature_of_business = 'Nature of business is required';
//     }
    
//     if (!data.legal_status?.trim()) {
//       errors.legal_status = 'Legal status is required';
//     }
    
//     if (!data.phone_number?.trim()) {
//       errors.phone_number = 'Phone number is required';
//     }
    
//     if (!data.account_number?.trim()) {
//       errors.account_number = 'Account number is required';
//     }
    
//     if (!data.trade_license?.trim()) {
//       errors.trade_license = 'Trade license information is required';
//     }
    
//     if (!data.investment_category?.trim()) {
//       errors.investment_category = 'Investment category is required';
//     }
    
//     if (!data.owner_name?.trim()) {
//       errors.owner_name = 'Owner name is required';
//     }
    
//     if (!data.residential_address?.trim()) {
//       errors.residential_address = 'Residential address is required';
//     }
    
//     if (!data.permanent_address?.trim()) {
//       errors.permanent_address = 'Permanent address is required';
//     }
    
//     if (!data.purpose_investment?.trim()) {
//       errors.purpose_investment = 'Purpose of investment is required';
//     }
    
//     if (!data.period_investment?.trim()) {
//       errors.period_investment = 'Period of investment is required';
//     }
    
//     if (!data.facility_type?.trim()) {
//       errors.facility_type = 'Facility type is required';
//     }
    
//     // Validate location tracking

    
//     // Validate checklist items
//     const requiredChecklistItems = Object.keys(data.checklist_items).slice(0, 10); // First 10 are critical
//     const missingChecklist = requiredChecklistItems.filter(key => 
//       data.checklist_items[key] === null || data.checklist_items[key] === undefined
//     );
    
//     if (missingChecklist.length > 0) {
//       errors.checklist = 'All critical checklist items must be completed';
//     }
    
//     return Object.keys(errors).length === 0 ? true : errors;
//   };

//   // Form Submission
// // InspectionForm.js - handleSubmit function update
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     console.log('🔄 Starting form submission...');
//     console.log('Inspection ID:', id);
    
//     // Validate form data first
//     const validationResult = validateInspectionData(formData);
//     if (validationResult !== true) {
//       console.log('❌ Validation errors:', validationResult);
//       showError('Please fill all required fields correctly. Check the form for errors.');
//       setLoading(false);
//       return;
//     }

//     // Prepare final data with location information
//     const submissionData = {
//       ...formData,
//       location_points: locationPoints,
//       location_start_time: locationStartTime?.toISOString(),
//       location_end_time: locationEndTime?.toISOString(),
//       total_location_points: locationPoints.length,
//       submitted_at: new Date().toISOString(),
//       status: 'completed'
//     };

//     console.log('📤 Sending to API...', submissionData);
    
//     // Use the same update function as Flutter app
//     const result = await updateInspection(id, submissionData);
//     console.log('✅ Submission successful:', result);
    
//     showSuccess('Inspection submitted successfully!');
//     navigate('/inspector/dashboard');
    
//   } catch (error) {
//     console.error('❌ Submission failed:', error);
//     showError(`Failed to submit inspection: ${error.message}`);
//   } finally {
//     setLoading(false);
//   }
// };
//   // Section Navigation
//   const sections = [
//     { id: 'A', title: 'Company Information' },
//     { id: 'B', title: 'Owner Information' },
//     { id: 'C', title: 'Partners/Directors' },
//     { id: 'D', title: 'Purpose' },
//     { id: 'E', title: 'Proposed Facilities' },
//     { id: 'F', title: 'Present Outstanding' },
//     { id: 'G', title: 'Business Analysis' },
//     { id: 'H', title: 'Property & Assets' },
//     { id: 'I', title: 'Working Capital' },
//     { id: 'J', title: 'Godown Particulars' },
//     { id: 'K', title: 'Checklist' },
//     { id: 'L', title: 'Site Photos & Video' },
//     { id: 'M', title: 'Documents Upload' }
//   ];

//   // Helper function to render form fields
//   const renderTextField = (label, name, type = 'text', required = false, rows = 1) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       {rows > 1 ? (
//         <textarea
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           rows={rows}
//           required={required}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//         />
//       ) : (
//         <input
//           type={type}
//           name={name}
//           value={formData[name]}
//           onChange={handleChange}
//           required={required}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//         />
//       )}
//     </div>
//   );

//   const renderDropdown = (label, name, options, required = false) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       <select
//         name={name}
//         value={formData[name]}
//         onChange={handleChange}
//         required={required}
//         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//       >
//         <option value="">Select {label}</option>
//         {options.map(option => (
//           <option key={option} value={option}>{option}</option>
//         ))}
//       </select>
//     </div>
//   );

//   const renderRadioGroup = (label, name, options) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
//       <div className="space-y-2">
//         {options.map(option => (
//           <label key={option} className="flex items-center">
//             <input
//               type="radio"
//               name={name}
//               value={option}
//               checked={formData[name] === option}
//               onChange={handleChange}
//               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//             />
//             <span className="ml-2 text-sm text-gray-700">{option}</span>
//           </label>
//         ))}
//       </div>
//     </div>
//   );

//   const renderCheckbox = (label, name) => (
//     <label className="flex items-center">
//       <input
//         type="checkbox"
//         name={name}
//         checked={formData[name]}
//         onChange={handleChange}
//         className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
//       />
//       <span className="ml-2 text-sm text-gray-700">{label}</span>
//     </label>
//   );

//   if (!inspection) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Inspection Form</h1>
//           <p className="mt-2 text-sm text-gray-600">
//             Project: {inspection.project} | Client: {inspection.client_name} | Industry: {inspection.industry_name}
//           </p>
//         </div>

//         {/* Location Tracking Section */}
//         <div className="bg-white shadow rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Tracking</h2>
//           <div className="space-y-4">
//             <div className={`p-4 rounded-lg border ${
//               isLocationTracking ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
//             }`}>
//               <div className="flex items-center">
//                 <div className={`p-2 rounded-full ${
//                   isLocationTracking ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
//                 }`}>
//                   {isLocationTracking ? (
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   ) : (
//                     <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
//                     </svg>
//                   )}
//                 </div>
//                 <div className="ml-4">
//                   <p className={`font-medium ${
//                     isLocationTracking ? 'text-green-800' : 'text-gray-800'
//                   }`}>
//                     {isLocationTracking ? 'Location Tracking Active' : 'Location Tracking Inactive'}
//                   </p>
//                   <p className="text-sm text-gray-600">
//                     {isLocationTracking 
//                       ? `${locationPoints.length} points captured • Started: ${locationStartTime?.toLocaleTimeString()}`
//                       : 'Click "Start Location" to begin tracking'
//                     }
//                   </p>
//                 </div>
//               </div>
//             </div>

//             <div className="flex space-x-4">
//               <button
//                 type="button"
//                 onClick={startLocationTracking}
//                 disabled={isLocationTracking}
//                 className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                   isLocationTracking 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
//                 }`}
//               >
//                 Start Location
//               </button>
//               <button
//                 type="button"
//                 onClick={stopLocationTracking}
//                 disabled={!isLocationTracking}
//                 className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
//                   !isLocationTracking 
//                     ? 'bg-gray-400 cursor-not-allowed' 
//                     : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
//                 }`}
//               >
//                 Stop Location
//               </button>
//             </div>

//             {locationPoints.length > 0 && (
//               <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
//                 <div className="flex justify-between items-center mb-2">
//                   <span className="font-medium text-blue-900">Total Points:</span>
//                   <span className="font-bold text-blue-600">{locationPoints.length}</span>
//                 </div>
//                 {locationStartTime && (
//                   <p className="text-sm text-blue-800">Started: {locationStartTime.toLocaleString()}</p>
//                 )}
//                 {locationEndTime && (
//                   <p className="text-sm text-blue-800">Ended: {locationEndTime.toLocaleString()}</p>
//                 )}
//                 {locationPoints.length > 0 && (
//                   <p className="text-sm font-mono text-blue-800 mt-2">
//                     Latest: {locationPoints[locationPoints.length - 1].latitude?.toFixed(4)}, {locationPoints[locationPoints.length - 1].longitude?.toFixed(4)}
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Section Navigation */}
//         <div className="bg-white shadow rounded-lg mb-6">
//           <nav className="flex overflow-x-auto">
//             {sections.map(section => (
//               <button
//                 key={section.id}
//                 onClick={() => setActiveSection(section.id)}
//                 className={`flex-shrink-0 px-4 py-3 border-b-2 font-medium text-sm ${
//                   activeSection === section.id
//                     ? 'border-primary text-primary'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 {section.id}. {section.title}
//               </button>
//             ))}
//           </nav>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {/* Section A: Company Information */}
//           {activeSection === 'A' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section A: Company's Client's Information</h2>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 {renderTextField('Name of the Client', 'client_name', 'text', true)}
//                 {renderTextField('Group Name (if any)', 'group_name')}
//                 {renderTextField('Industry Name (as per CIB)', 'industry_name', 'text', true)}
//                 {renderTextField('Nature of Business', 'nature_of_business', 'text', true, 3)}
//                 {renderTextField('Legal Status', 'legal_status', 'text', true)}
//                 {renderTextField('Date of Establishment', 'date_of_establishment', 'text', true)}
//                 {renderTextField('Office Address', 'office_address', 'text', true, 3)}
//                 {renderTextField('Showroom Address', 'showroom_address', 'text', false, 2)}
//                 {renderTextField('Factory/Godown/Depot Address', 'factory_address', 'text', false, 2)}
//                 {renderTextField('Phone/Mobile no (office)', 'phone_number', 'tel', true)}
//                 {renderTextField('Current A/C no', 'account_number', 'text', true)}
//                 {renderTextField('A/C ID no', 'account_id', 'text', true)}
//                 {renderTextField('TIN', 'tin_number', 'text', true)}
//                 {renderTextField('Date of Opening', 'date_of_opening', 'text')}
//                 {renderTextField('VAT Reg no', 'vat_reg_number', 'text')}
//                 {renderTextField('Date of 1st Investment availed', 'first_investment_date', 'text')}
//                 {renderTextField('Sector Code', 'sector_code', 'text')}
//                 {renderTextField('Trade License No & Date', 'trade_license', 'text', true)}
//                 {renderTextField('Economic Purpose Code', 'economic_purpose_code', 'text')}
//                 {renderDropdown('Investment Category', 'investment_category', dropdownOptions.investmentCategories, true)}
//               </div>
//             </div>
//           )}

//           {/* Section B: Owner Information */}
//           {activeSection === 'B' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section B: Owner Information</h2>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 {renderTextField('Name of the Owner (S) & status', 'owner_name', 'text', true, 2)}
//                 {renderTextField('Age', 'owner_age', 'text')}
//                 {renderTextField('Father\'s Name', 'father_name', 'text')}
//                 {renderTextField('Mother\'s Name', 'mother_name', 'text')}
//                 {renderTextField('Spouse\'s Name', 'spouse_name', 'text')}
//                 {renderTextField('Academic Qualification', 'academic_qualification', 'text', false, 3)}
//                 {renderTextField('No. of Children with age', 'children_info', 'text', false, 2)}
//                 {renderTextField('Business Successor', 'business_successor', 'text', false, 3)}
//                 {renderTextField('Residential Address', 'residential_address', 'text', true, 3)}
//                 {renderTextField('Permanent Address', 'permanent_address', 'text', true, 3)}
//               </div>
//             </div>
//           )}

//           {/* Section C: Partners/Directors */}
//           {activeSection === 'C' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section C: List of Partners / Directors</h2>
//               {formData.partners_directors.map((partner, index) => (
//                 <div key={index} className="border border-gray-200 rounded-lg p-6 mb-6">
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className="text-lg font-medium text-gray-900">Partner/Director {index + 1}</h3>
//                     {formData.partners_directors.length > 1 && (
//                       <button
//                         type="button"
//                         onClick={() => removePartner(index)}
//                         className="text-red-600 hover:text-red-800"
//                       >
//                         Remove
//                       </button>
//                     )}
//                   </div>
//                   <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Name with Father's / husband's</label>
//                       <input
//                         type="text"
//                         value={partner.name}
//                         onChange={(e) => handleNestedChange('partners_directors', index, 'name', e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Age</label>
//                       <input
//                         type="text"
//                         value={partner.age}
//                         onChange={(e) => handleNestedChange('partners_directors', index, 'age', e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700">Academic Qualification</label>
//                       <input
//                         type="text"
//                         value={partner.qualification}
//                         onChange={(e) => handleNestedChange('partners_directors', index, 'qualification', e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Extent of Share (%)</label>
//                       <input
//                         type="text"
//                         value={partner.share}
//                         onChange={(e) => handleNestedChange('partners_directors', index, 'share', e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Status</label>
//                       <input
//                         type="text"
//                         value={partner.status}
//                         onChange={(e) => handleNestedChange('partners_directors', index, 'status', e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                     <div className="sm:col-span-2">
//                       <label className="block text-sm font-medium text-gray-700">Relationship with Chairman / MD name</label>
//                       <input
//                         type="text"
//                         value={partner.relationship}
//                         onChange={(e) => handleNestedChange('partners_directors', index, 'relationship', e.target.value)}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={addPartner}
//                 className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//               >
//                 Add Another Partner/Director
//               </button>
//             </div>
//           )}

//           {/* Section D: Purpose */}
//           {activeSection === 'D' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section D: Purpose of Investment / Facilities</h2>
//               <div className="grid grid-cols-1 gap-6">
//                 {renderTextField('Purpose of Investment', 'purpose_investment', 'text', true, 3)}
//                 {renderTextField('Purpose of Bank Guarantee', 'purpose_bank_guarantee', 'text', false, 2)}
//                 {renderTextField('Period of Investment', 'period_investment', 'text', true)}
//               </div>
//             </div>
//           )}

//           {/* Section E: Proposed Facilities */}
//           {activeSection === 'E' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section E: Details of proposed Facilities/Investment</h2>
//               <div className="space-y-6">
//                 {renderDropdown('Facility Type', 'facility_type', dropdownOptions.facilityTypes, true)}
                
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Tk)</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       <tr>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Existing Limit</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="text"
//                             name="existing_limit"
//                             value={formData.existing_limit}
//                             onChange={handleChange}
//                             className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Limit Applied by the client</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="text"
//                             name="applied_limit"
//                             value={formData.applied_limit}
//                             onChange={handleChange}
//                             className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Limit Recommended By the Branch</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="text"
//                             name="recommended_limit"
//                             value={formData.recommended_limit}
//                             onChange={handleChange}
//                             className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Rate of return profit sharing ratio</h3>
//                   <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Bank (%)</label>
//                       <input
//                         type="text"
//                         name="bank_percentage"
//                         value={formData.bank_percentage}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700">Client (%)</label>
//                       <input
//                         type="text"
//                         name="client_percentage"
//                         value={formData.client_percentage}
//                         onChange={handleChange}
//                         className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section F: Present Outstanding */}
//           {activeSection === 'F' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section F: Break up of Present Outstanding</h2>
//               <div className="space-y-6">
//                 {renderDropdown('Outstanding Type', 'outstanding_type', dropdownOptions.outstandingTypes, true)}
                
//                 <div className="border border-gray-200 rounded-lg overflow-hidden">
//                   <table className="min-w-full divide-y divide-gray-200">
//                     <thead className="bg-gray-50">
//                       <tr>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
//                         <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                       </tr>
//                     </thead>
//                     <tbody className="bg-white divide-y divide-gray-200">
//                       <tr>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Limit</td>
//                         <td className="px-6 py-4 whitespace-nowrap">
//                           <input
//                             type="text"
//                             name="limit_amount"
//                             value={formData.limit_amount}
//                             onChange={handleChange}
//                             className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </td>
//                       </tr>
//                       <tr>
//                         <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                           Outstanding
//                           <table className="min-w-full mt-2">
//                             <tbody>
//                               <tr>
//                                 <td className="px-2 py-1 text-xs text-gray-500">Net</td>
//                                 <td className="px-2 py-1">
//                                   <input
//                                     type="text"
//                                     name="net_outstanding"
//                                     value={formData.net_outstanding}
//                                     onChange={handleChange}
//                                     className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-primary focus:border-primary"
//                                   />
//                                 </td>
//                               </tr>
//                               <tr>
//                                 <td className="px-2 py-1 text-xs text-gray-500">Gross</td>
//                                 <td className="px-2 py-1">
//                                   <input
//                                     type="text"
//                                     name="gross_outstanding"
//                                     value={formData.gross_outstanding}
//                                     onChange={handleChange}
//                                     className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-primary focus:border-primary"
//                                   />
//                                 </td>
//                               </tr>
//                             </tbody>
//                           </table>
//                         </td>
//                         <td className="px-6 py-4 whitespace-nowrap"></td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section G: Business Analysis */}
//           {activeSection === 'G' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section G: Business Industry / Analysis</h2>
//               <div className="space-y-8">
//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Market Situation</h3>
//                   {renderRadioGroup('', 'market_situation', dropdownOptions.marketSituations)}
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Client's Position in the Industry</h3>
//                   {renderRadioGroup('', 'client_position', dropdownOptions.clientPositions)}
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Name of 5 main competitors</h3>
//                   {formData.competitors.map((competitor, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
//                       <h4 className="font-medium text-gray-900 mb-3">Competitor {index + 1}</h4>
//                       <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Name</label>
//                           <input
//                             type="text"
//                             value={competitor.name}
//                             onChange={(e) => {
//                               const newCompetitors = [...formData.competitors];
//                               newCompetitors[index].name = e.target.value;
//                               setFormData(prev => ({ ...prev, competitors: newCompetitors }));
//                             }}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Address</label>
//                           <input
//                             type="text"
//                             value={competitor.address}
//                             onChange={(e) => {
//                               const newCompetitors = [...formData.competitors];
//                               newCompetitors[index].address = e.target.value;
//                               setFormData(prev => ({ ...prev, competitors: newCompetitors }));
//                             }}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Market Share</label>
//                           <input
//                             type="text"
//                             value={competitor.market_share}
//                             onChange={(e) => {
//                               const newCompetitors = [...formData.competitors];
//                               newCompetitors[index].market_share = e.target.value;
//                               setFormData(prev => ({ ...prev, competitors: newCompetitors }));
//                             }}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Business reputation</h3>
//                   {renderRadioGroup('', 'business_reputation', dropdownOptions.reputationOptions)}
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Production</h3>
//                   {renderRadioGroup('', 'production_type', dropdownOptions.productionTypes)}
//                 </div>

//                 <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
//                   {renderTextField('Name of the Product', 'product_name')}
//                   {renderTextField('Production Capacity: Units / Year', 'production_capacity')}
//                   {renderTextField('Actual Production: Units / Year', 'actual_production')}
//                 </div>

//                 {renderTextField('Observation on profitability / marketability of the goods', 'profitability_observation', 'text', false, 4)}

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Size of the labor force</h3>
//                   <div className="border border-gray-200 rounded-lg overflow-hidden">
//                     <table className="min-w-full divide-y divide-gray-200">
//                       <thead className="bg-gray-100">
//                         <tr>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Male</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Female</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skilled</th>
//                           <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unskilled</th>
//                         </tr>
//                       </thead>
//                       <tbody className="bg-white divide-y divide-gray-200">
//                         <tr>
//                           <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Officer / Staff</td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="male_officer"
//                               value={formData.male_officer}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="female_officer"
//                               value={formData.female_officer}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="skilled_officer"
//                               value={formData.skilled_officer}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="unskilled_officer"
//                               value={formData.unskilled_officer}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                         </tr>
//                         <tr>
//                           <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Labor / Worker</td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="male_worker"
//                               value={formData.male_worker}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="female_worker"
//                               value={formData.female_worker}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="skilled_worker"
//                               value={formData.skilled_worker}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                           <td className="px-4 py-3 whitespace-nowrap">
//                             <input
//                               type="text"
//                               name="unskilled_worker"
//                               value={formData.unskilled_worker}
//                               onChange={handleChange}
//                               className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                             />
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>

//                 <div className="bg-gray-50 p-4 rounded-lg">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Name of the key employee of the Firm</h3>
//                   {formData.key_employees.map((employee, index) => (
//                     <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
//                       <div className="flex justify-between items-center mb-4">
//                         <h4 className="font-medium text-gray-900">Employee {index + 1}</h4>
//                         {formData.key_employees.length > 1 && (
//                           <button
//                             type="button"
//                             onClick={() => removeEmployee(index)}
//                             className="text-red-600 hover:text-red-800 text-sm"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Name</label>
//                           <input
//                             type="text"
//                             value={employee.name}
//                             onChange={(e) => handleNestedChange('key_employees', index, 'name', e.target.value)}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Designation</label>
//                           <input
//                             type="text"
//                             value={employee.designation}
//                             onChange={(e) => handleNestedChange('key_employees', index, 'designation', e.target.value)}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Age</label>
//                           <input
//                             type="text"
//                             value={employee.age}
//                             onChange={(e) => handleNestedChange('key_employees', index, 'age', e.target.value)}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Education Qualification</label>
//                           <input
//                             type="text"
//                             value={employee.qualification}
//                             onChange={(e) => handleNestedChange('key_employees', index, 'qualification', e.target.value)}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                         <div>
//                           <label className="block text-sm font-medium text-gray-700">Experience</label>
//                           <input
//                             type="text"
//                             value={employee.experience}
//                             onChange={(e) => handleNestedChange('key_employees', index, 'experience', e.target.value)}
//                             className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={addEmployee}
//                     className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                   >
//                     Add Another Employee
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section H: Property & Assets */}
//           {activeSection === 'H' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section H: Property & Assets</h2>
//               <div className="space-y-6">
//                 {/* Current Assets */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Current Assets</h3>
//                   <div className="grid grid-cols-1 gap-4">
//                     {renderTextField('1. Cash & Bank Balance', 'cash_balance', 'number')}
//                     {renderTextField('Stock in trade & investment/finished goods', 'stock_trade_finished', 'number')}
//                     {renderTextField('2. Stock in trade & investment/financial goods', 'stock_trade_financial', 'number')}
//                     {renderTextField('3. Accounts receivable (Sundry Debtors)', 'accounts_receivable', 'number')}
//                     {renderTextField('4. Advance Deposit & Pre-payment', 'advance_deposit', 'number')}
//                     {renderTextField('5. Other current assets', 'other_current_assets', 'number')}
//                   </div>
//                   <div className="mt-4 p-3 bg-gray-50 rounded border">
//                     <div className="flex justify-between">
//                       <span className="font-medium text-sm">Sub-Total (a):</span>
//                       <span className="font-bold">Tk. {formData.current_assets_subtotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Fixed Assets */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Fixed Assets</h3>
//                   <div className="grid grid-cols-1 gap-4">
//                     {renderTextField('6. Land, Building & other immovable assets', 'land_building', 'number')}
//                     {renderTextField('7. Plant, Machinery & furniture & fixture', 'plant_machinery', 'number')}
//                     {renderTextField('8. Other assets', 'other_assets', 'number')}
//                   </div>
//                   <div className="mt-4 p-3 bg-gray-50 rounded border">
//                     <div className="flex justify-between">
//                       <span className="font-medium text-sm">Sub-Total (b):</span>
//                       <span className="font-bold">Tk. {formData.fixed_assets_subtotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Total Assets */}
//                 <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-blue-900">A. Grand Total (a+b):</span>
//                     <span className="font-bold text-xl text-blue-900">Tk. {formData.total_assets.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Current Liabilities */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Current Liabilities</h3>
//                   <div className="space-y-4">
//                     <div className="bg-gray-50 p-3 rounded">
//                       <h4 className="font-medium text-gray-900 mb-2">1. Investment from Bank/Financial Institutions</h4>
//                       <div className="grid grid-cols-1 gap-4 ml-4">
//                         {renderTextField('a) IBBL', 'ibbl_investment', 'number')}
//                         {renderTextField('b) Others', 'other_banks_investment', 'number')}
//                       </div>
//                     </div>
//                     {renderTextField('2. Borrowing from other sources', 'borrowing_sources', 'number')}
//                     {renderTextField('3. Accounts Payable (Sundry Creditors)', 'accounts_payable', 'number')}
//                     {renderTextField('4. Others', 'other_current_liabilities', 'number')}
//                   </div>
//                   <div className="mt-4 p-3 bg-gray-50 rounded border">
//                     <div className="flex justify-between">
//                       <span className="font-medium text-sm">Sub-Total (a):</span>
//                       <span className="font-bold">Tk. {formData.current_liabilities_subtotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Long Term Liability */}
//                 {renderTextField('Long Term Liability', 'long_term_liabilities', 'number')}

//                 {/* Other non-current liabilities */}
//                 {renderTextField('Other non-current liabilities', 'other_non_current_liabilities', 'number')}

//                 {/* Total Liabilities */}
//                 <div className="p-3 bg-gray-50 rounded border">
//                   <div className="flex justify-between">
//                     <span className="font-medium text-sm">B. Total Liabilities (a+b+c):</span>
//                     <span className="font-bold">Tk. {formData.total_liabilities.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Owner's Equity */}
//                 <div className="border border-gray-200 rounded-lg p-6">
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Owner's Equity</h3>
//                   <div className="grid grid-cols-1 gap-4">
//                     {renderTextField('d. Paid up capital / owner\'s Capital Balance as per last account', 'paid_up_capital', 'number')}
//                     {renderTextField('e. Resources', 'resources', 'number')}
//                     {renderTextField('I. Retained Earning / Net Profit for the year transferred to Balance Sheet', 'retained_earning', 'number')}
//                   </div>
//                   <div className="mt-4 p-3 bg-gray-50 rounded border">
//                     <div className="flex justify-between">
//                       <span className="font-medium text-sm">C. Total Equity (d+e+f):</span>
//                       <span className="font-bold">Tk. {formData.total_equity.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Grand Total */}
//                 <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-green-900">Grand Total (a+b+c+d+e+f):</span>
//                     <span className="font-bold text-xl text-green-900">Tk. {formData.grand_total.toFixed(2)}</span>
//                   </div>
//                 </div>

//                 {/* Net Worth */}
//                 <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
//                   <div className="flex justify-between items-center">
//                     <span className="font-bold text-orange-900">NET WORTH (Total Assets - Total Liabilities):</span>
//                     <span className="font-bold text-xl text-orange-900">Tk. {formData.net_worth.toFixed(2)}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section I: Working Capital Assessment */}
//           {activeSection === 'I' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section I: Working Capital Assessment: N/A</h2>
//               <div className="overflow-x-auto">
//                 <table className="min-w-full border border-gray-200">
//                   <thead>
//                     <tr className="bg-gray-50">
//                       <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
//                       <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700" colSpan="3">
//                         Daily Requirements
//                       </th>
//                       <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
//                         Tied up period in Days (e)
//                       </th>
//                       <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
//                         Amount d\e
//                       </th>
//                     </tr>
//                     <tr className="bg-gray-50">
//                       <th className="border border-gray-200 px-4 py-2"></th>
//                       <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600">Unit (b)</th>
//                       <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600">Rate (c)</th>
//                       <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600">Amount (d)\nd\\e</th>
//                       <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600"></th>
//                       <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600"></th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {formData.working_capital_items.map((item, index) => (
//                       <tr key={index}>
//                         <td className="border border-gray-200 px-4 py-2 text-sm">{item.name}</td>
//                         <td className="border border-gray-200 px-2 py-1">
//                           <input
//                             type="text"
//                             value={item.unit}
//                             onChange={(e) => handleWorkingCapitalChange(index, 'unit', e.target.value)}
//                             className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                           />
//                         </td>
//                         <td className="border border-gray-200 px-2 py-1">
//                           <input
//                             type="text"
//                             value={item.rate}
//                             onChange={(e) => handleWorkingCapitalChange(index, 'rate', e.target.value)}
//                             className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                           />
//                         </td>
//                         <td className="border border-gray-200 px-2 py-1">
//                           <input
//                             type="text"
//                             value={item.amount}
//                             readOnly
//                             className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
//                           />
//                         </td>
//                         <td className="border border-gray-200 px-2 py-1">
//                           <input
//                             type="text"
//                             value={item.tied_up_days}
//                             onChange={(e) => handleWorkingCapitalChange(index, 'tied_up_days', e.target.value)}
//                             className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
//                           />
//                         </td>
//                         <td className="border border-gray-200 px-2 py-1">
//                           <input
//                             type="text"
//                             value={item.amount_dxe}
//                             readOnly
//                             className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
//                           />
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//               <div className="mt-4 p-3 bg-gray-50 rounded border">
//                 <p className="text-sm text-gray-600 italic">
//                   Note: Amount (d) = Unit (b) × Rate (c)<br />
//                   Amount d\\e = Amount (d) × Tied up period (e)
//                 </p>
//               </div>
//             </div>
//           )}

//           {/* Section J: Godown Particulars */}
//           {activeSection === 'J' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section J: Particulars of the godown for storing MPI/Murabaha goods</h2>
//               <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
//                 {renderTextField('Location of the godown', 'godown_location')}
//                 {renderTextField('Capacity of godown', 'godown_capacity')}
//                 {renderTextField('Space of godown (Length X Width X Height)', 'godown_space')}
//                 {renderTextField('Nature of Godown (Pucca/Semi Pucca and class of godown)', 'godown_nature')}
//                 {renderTextField('Owner of godown (Bank/Client/Third Party)', 'godown_owner')}
//                 {renderTextField('Distance from the branch (K.M./Mile)', 'distance_from_branch')}
//                 {renderTextField('item to be stored', 'items_to_store', 'text', false, 3)}
//               </div>
              
//               <div className="mt-8 bg-gray-50 p-6 rounded-lg">
//                 <h3 className="text-lg font-medium text-gray-900 mb-4">Godown Facilities</h3>
//                 <div className="space-y-4">
//                   {renderCheckbox('Whether Ware-House License has been obtained from the Competent authority', 'warehouse_license')}
//                   {renderCheckbox('Whether godown is watched over by the godown guard round the clock', 'godown_guard')}
//                   {renderCheckbox('Whether godown is damp proof and safe from rain/flood water and other common hazards', 'damp_proof')}
//                   {renderCheckbox('Whether the officials of the Branch have easy access to the godown', 'easy_access')}
//                   {renderCheckbox('Whether letter of disclaimer is obtained', 'letter_disclaimer')}
//                   {renderCheckbox('Whether Insurance Policy obtained / updated', 'insurance_policy')}
//                   {renderCheckbox('Whether the Godown hired by the Bank', 'godown_hired')}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section K: Checklist */}
//           {activeSection === 'K' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section K: Checklist</h2>
//               <div className="space-y-6">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">General</h3>
//                   <div className="space-y-4">
//                     {Object.entries(formData.checklist_items).slice(0, 15).map(([key, value]) => (
//                       <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                         <span className="text-sm font-medium text-gray-700 flex-1">{key}</span>
//                         <div className="flex items-center space-x-4">
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="true"
//                               checked={value === true}
//                               onChange={() => handleChecklistChange(key, true)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">Yes</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="false"
//                               checked={value === false}
//                               onChange={() => handleChecklistChange(key, false)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">No</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="null"
//                               checked={value === null}
//                               onChange={() => handleChecklistChange(key, null)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">N/A</span>
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Constitution of the Firm</h3>
//                   <div className="space-y-4">
//                     {Object.entries(formData.checklist_items).slice(15, 21).map(([key, value]) => (
//                       <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                         <span className="text-sm font-medium text-gray-700 flex-1">{key}</span>
//                         <div className="flex items-center space-x-4">
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="true"
//                               checked={value === true}
//                               onChange={() => handleChecklistChange(key, true)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">Yes</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="false"
//                               checked={value === false}
//                               onChange={() => handleChecklistChange(key, false)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">No</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="null"
//                               checked={value === null}
//                               onChange={() => handleChecklistChange(key, null)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">N/A</span>
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Statements</h3>
//                   <div className="space-y-4">
//                     {Object.entries(formData.checklist_items).slice(21).map(([key, value]) => (
//                       <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                         <span className="text-sm font-medium text-gray-700 flex-1">{key}</span>
//                         <div className="flex items-center space-x-4">
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="true"
//                               checked={value === true}
//                               onChange={() => handleChecklistChange(key, true)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">Yes</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="false"
//                               checked={value === false}
//                               onChange={() => handleChecklistChange(key, false)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">No</span>
//                           </label>
//                           <label className="flex items-center">
//                             <input
//                               type="radio"
//                               name={`checklist_${key}`}
//                               value="null"
//                               checked={value === null}
//                               onChange={() => handleChecklistChange(key, null)}
//                               className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
//                             />
//                             <span className="ml-2 text-sm text-gray-700">N/A</span>
//                           </label>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section L: Site Photos & Video */}
//           {activeSection === 'L' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section L: Site Photos & Video Documentation</h2>
//               <div className="space-y-8">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Site Photos (up to 10 images)</h3>
//                   <p className="text-sm text-gray-600 mb-4">Upload clear photos of the business site, premises, and operations</p>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                       <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     <div className="mt-4">
//                       <label htmlFor="photo-upload" className="cursor-pointer">
//                         <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                           Upload Photos
//                         </span>
//                         <input id="photo-upload" name="photo-upload" type="file" className="sr-only" multiple accept="image/*" />
//                       </label>
//                     </div>
//                     <p className="mt-2 text-xs text-gray-500">PNG, JPG, GIF up to 10MB each</p>
//                   </div>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Site Video (Short documentation)</h3>
//                   <p className="text-sm text-gray-600 mb-4">Upload a short video (max 2 minutes) showing the business operations and premises</p>
//                   <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
//                     <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                       <path d="M12 8v28l16-14L12 8z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                     </svg>
//                     <div className="mt-4">
//                       <label htmlFor="video-upload" className="cursor-pointer">
//                         <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
//                           Upload Video
//                         </span>
//                         <input id="video-upload" name="video-upload" type="file" className="sr-only" accept="video/*" />
//                       </label>
//                     </div>
//                     <p className="mt-2 text-xs text-gray-500">MP4, MOV up to 100MB</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section M: Documents Upload */}
//           {activeSection === 'M' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section M: Supporting Documents Upload</h2>
//               <div className="space-y-6">
//                 <p className="text-sm text-gray-600">Upload all relevant supporting documents (unlimited files)</p>
                
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Documents</h3>
//                   <div className="flex flex-wrap gap-2">
//                     {['Trade License', 'TIN Certificate', 'VAT Certificate', 'Bank Statements', 'Audit Reports', 'Property Documents', 'Partnership Deed', 'Memorandum', 'Others'].map((doc) => (
//                       <span key={doc} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
//                         {doc}
//                       </span>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center bg-blue-50">
//                   <svg className="mx-auto h-12 w-12 text-blue-500" stroke="currentColor" fill="none" viewBox="0 0 48 48">
//                     <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
//                   </svg>
//                   <div className="mt-4">
//                     <label htmlFor="document-upload" className="cursor-pointer">
//                       <span className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                         Click to Upload Documents
//                       </span>
//                       <input id="document-upload" name="document-upload" type="file" className="sr-only" multiple />
//                     </label>
//                   </div>
//                   <p className="mt-2 text-sm text-gray-500">
//                     Supported formats: PDF, DOC, DOCX, JPG, PNG<br />
//                     Maximum file size: 10MB per file
//                   </p>
//                 </div>

//                 {formData.uploaded_documents.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-medium text-gray-900 mb-4">
//                       Uploaded Documents ({formData.uploaded_documents.length})
//                     </h3>
//                     <div className="space-y-3">
//                       {formData.uploaded_documents.map((doc, index) => (
//                         <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
//                           <div className="flex items-center">
//                             <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                             </svg>
//                             <div className="ml-3">
//                               <p className="text-sm font-medium text-gray-900">{doc.name}</p>
//                               <p className="text-sm text-gray-500">Uploaded: {new Date(doc.upload_date).toLocaleDateString()}</p>
//                             </div>
//                           </div>
//                           <button
//                             type="button"
//                             className="text-red-600 hover:text-red-800"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Navigation Buttons */}
//           <div className="flex justify-between pt-6 border-t border-gray-200">
//             <button
//               type="button"
//               onClick={() => navigate('/inspector/dashboard')}
//               className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//             >
//               Cancel
//             </button>
            
//             <div className="flex space-x-3">
//               <button
//                 type="button"
//                 onClick={() => {
//                   const currentIndex = sections.findIndex(s => s.id === activeSection);
//                   if (currentIndex > 0) {
//                     setActiveSection(sections[currentIndex - 1].id);
//                   }
//                 }}
//                 disabled={activeSection === 'A'}
//                 className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
//               >
//                 Previous Section
//               </button>
              
//               {activeSection === 'M' ? (
//                 <button
//                   type="submit"
//                   disabled={loading}
//                   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
//                 >
//                   {loading ? 'Submitting...' : 'Submit Inspection'}
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   onClick={() => {
//                     const currentIndex = sections.findIndex(s => s.id === activeSection);
//                     if (currentIndex < sections.length - 1) {
//                       setActiveSection(sections[currentIndex + 1].id);
//                     }
//                   }}
//                   className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Next Section
//                 </button>
//               )}
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default InspectionForm;


// src/components/inspector/CompleteInspectionForm.js



import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewInspections, updateInspection, createNewInspection,getInspectionById   } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';
import { INSPECTION_STATUS } from '../../utils/constants';
import api from '../../services/api'; // Add this import
const CompleteInspectionForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showSuccess, showError } = useNotification();
  
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('A');
  
  // Location Tracking State
  const [isLocationTracking, setIsLocationTracking] = useState(false);
  const [locationPoints, setLocationPoints] = useState([]);
  const [locationStartTime, setLocationStartTime] = useState(null);
  const [locationEndTime, setLocationEndTime] = useState(null);
  const [locationIntervalId, setLocationIntervalId] = useState(null);

  // Form Data State - Flutter app এর সাথে compatible structure
  const [formData, setFormData] = useState({
    // Section A: Company's Client's Information
    client_name: '',
    group_name: '',
    industry_name: '',
    nature_of_business: '',
    legal_status: '',
    date_of_establishment: '',
    office_address: '',
    showroom_address: '',
    factory_address: '',
    phone_number: '',
    account_number: '',
    account_id: '',
    tin_number: '',
    date_of_opening: '',
    vat_reg_number: '',
    first_investment_date: '',
    sector_code: '',
    trade_license: '',
    economic_purpose_code: '',
    investment_category: '',
    
    // Section B: Owner Information
    owner_name: '',
    owner_age: '',
    father_name: '',
    mother_name: '',
    spouse_name: '',
    academic_qualification: '',
    children_info: '',
    business_successor: '',
    residential_address: '',
    permanent_address: '',
    
    // Section C: Partners/Directors
    partners_directors: [{ name: '', age: '', qualification: '', share: '', status: '', relationship: '' }],
    
    // Section D: Purpose
    purpose_investment: '',
    purpose_bank_guarantee: '',
    period_investment: '',
    
    // Section E: Proposed Facilities
    facility_type: '',
    existing_limit: '',
    applied_limit: '',
    recommended_limit: '',
    bank_percentage: '',
    client_percentage: '',
    
    // Section F: Present Outstanding
    outstanding_type: '',
    limit_amount: '',
    net_outstanding: '',
    gross_outstanding: '',
    
    // Section G: Business Analysis
    market_situation: '',
    client_position: '',
    competitors: Array(5).fill().map(() => ({ name: '', address: '', market_share: '' })),
    business_reputation: '',
    production_type: '',
    product_name: '',
    production_capacity: '',
    actual_production: '',
    profitability_observation: '',
    
    // Labor Force
    male_officer: '',
    female_officer: '',
    skilled_officer: '',
    unskilled_officer: '',
    male_worker: '',
    female_worker: '',
    skilled_worker: '',
    unskilled_worker: '',
    
    // Key Employees
    key_employees: [{ name: '', designation: '', age: '', qualification: '', experience: '' }],
    
    // Section H: Property & Assets
    cash_balance: '',
    stock_trade_finished: '',
    stock_trade_financial: '',
    accounts_receivable: '',
    advance_deposit: '',
    other_current_assets: '',
    land_building: '',
    plant_machinery: '',
    other_assets: '',
    ibbl_investment: '',
    other_banks_investment: '',
    borrowing_sources: '',
    accounts_payable: '',
    other_current_liabilities: '',
    long_term_liabilities: '',
    other_non_current_liabilities: '',
    paid_up_capital: '',
    retained_earning: '',
    resources: '',
    
    // Auto-calculated financial values
    current_assets_subtotal: 0,
    fixed_assets_subtotal: 0,
    total_assets: 0,
    current_liabilities_subtotal: 0,
    total_liabilities: 0,
    total_equity: 0,
    grand_total: 0,
    net_worth: 0,
    
    // Section I: Working Capital Assessment
    working_capital_items: [
      { name: 'Raw Materials (imported)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
      { name: 'Raw Materials (Local)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
      { name: 'Work in Process', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
      { name: 'Finished goods', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' }
    ],
    
    // Section J: Godown Particulars
    godown_location: '',
    godown_capacity: '',
    godown_space: '',
    godown_nature: '',
    godown_owner: '',
    distance_from_branch: '',
    items_to_store: '',
    warehouse_license: false,
    godown_guard: false,
    damp_proof: false,
    easy_access: false,
    letter_disclaimer: false,
    insurance_policy: false,
    godown_hired: false,
    
    // Section K: Checklist
    checklist_items: {
      'Business establishment physically verified': null,
      'Honesty and integrity ascertained': null,
      'Confidential Report obtained': null,
      'CIB report obtained': null,
      'Items permissible by Islamic Shariah': null,
      'Items not restricted by Bangladesh Bank': null,
      'Items permissible by Investment Policy': null,
      'Market Price verified': null,
      'Constant market demand': null,
      'F-167 A duly filled': null,
      'F-167 B property filled': null,
      'Application particulars verified': null,
      'IRC, ERC, VAT copies enclosed': null,
      'TIN Certificate enclosed': null,
      'Rental Agreement enclosed': null,
      'Trade License enclosed': null,
      'Partnership Deed enclosed': null,
      'Memorandum & Articles enclosed': null,
      'Board resolution enclosed': null,
      'Directors particulars enclosed': null,
      'Current Account Statement enclosed': null,
      'Creditors/Debtors list enclosed': null,
      'IRC form with documents enclosed': null,
      'Audited Balance sheet enclosed': null,
    },
    
    // Section L: Site Photos & Video
    site_photos: [],
    site_video: null,
    
    // Section M: Documents Upload
    uploaded_documents: [],
    
    status: INSPECTION_STATUS.IN_PROGRESS,
    branch_name: '',
    submitted_at: ''
  });

  // Dropdown options - Flutter app এর মতোই
  const dropdownOptions = {
    investmentCategories: [
      'Agriculture (AG)', 'Large & Medium Scale Industry-LM', 'Working Capital (Jute) WJ',
      'Working Capital (other than Jute) WO', 'Jute Trading (JT)', 'Jute & Jute goods Export (JE)',
      'Other Exports (OE)', 'Other Commercial Investments (OC)', 'Urban Housing (UH)',
      'Special program', 'Others (OT)'
    ],
    facilityTypes: [
      'Bai-Murabaha', 'Bai-Muajjal', 'Bai-Salam', 'Mudaraba', 'BB LC/ BILLS',
      'FBN/FBP/IBP', 'Others'
    ],
    outstandingTypes: [
      'Bai-Murabaha TR', 'Bai-Muajjal TR', 'Bai-Salam', 'BB LC/ BILLS',
      'FBN/FBP/IBP', 'None', 'Others'
    ],
    marketSituations: [
      'Highly Saturated', 'Saturated', 'Low Demand Gap', 'High Demand Gap'
    ],
    clientPositions: [
      'Market Leader', 'Medium', 'Weak', 'Deteriorating'
    ],
    reputationOptions: [
      'Very Good', 'Good', 'Bad'
    ],
    productionTypes: [
      'Export Oriented', 'Import Substitute', 'Agro Based'
    ],
    statusOptions: [
      'Pending', 'In Progress', 'Completed', 'Approved', 'Rejected'
    ]
  };

  // Performance optimized handlers
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  }, []);

  // Financial fields-এর জন্য আলাদা handler
  const handleFinancialFieldChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => {
      const newData = {
        ...prev,
        [name]: value
      };
      
      // Immediately calculate financials with new data
      return calculateFinancialsWithData(newData);
    });
  }, []);

  const handleNestedChange = useCallback((section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  }, []);

  const handleChecklistChange = useCallback((key, value) => {
    setFormData(prev => ({
      ...prev,
      checklist_items: {
        ...prev.checklist_items,
        [key]: value
      }
    }));
  }, []);

  const handleWorkingCapitalChange = useCallback((index, field, value) => {
    setFormData(prev => {
      const updatedItems = prev.working_capital_items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      
      // Auto-calculate amount and amount_dxe (Flutter app logic)
      if (field === 'unit' || field === 'rate') {
        const item = updatedItems[index];
        const unit = parseFloat(item.unit) || 0;
        const rate = parseFloat(item.rate) || 0;
        const amount = unit * rate;
        updatedItems[index].amount = amount.toFixed(2);
      }
      
      if (field === 'tied_up_days' || field === 'amount') {
        const item = updatedItems[index];
        const amount = parseFloat(item.amount) || 0;
        const tiedUpDays = parseFloat(item.tied_up_days) || 0;
        const amountDxe = amount * tiedUpDays;
        updatedItems[index].amount_dxe = amountDxe.toFixed(2);
      }
      
      return { ...prev, working_capital_items: updatedItems };
    });
  }, []);

  // Separate calculation function that doesn't depend on formData
  const calculateFinancialsWithData = useCallback((data) => {
    const parseValue = (value) => parseFloat(value) || 0;

    // Current Assets (Flutter app logic)
    const currentAssets = 
      parseValue(data.cash_balance) +
      parseValue(data.stock_trade_finished) +
      parseValue(data.stock_trade_financial) +
      parseValue(data.accounts_receivable) +
      parseValue(data.advance_deposit) +
      parseValue(data.other_current_assets);
    
    // Fixed Assets
    const fixedAssets = 
      parseValue(data.land_building) +
      parseValue(data.plant_machinery) +
      parseValue(data.other_assets);
    
    // Total Assets
    const totalAssets = currentAssets + fixedAssets;
    
    // Current Liabilities
    const currentLiabilities = 
      parseValue(data.ibbl_investment) +
      parseValue(data.other_banks_investment) +
      parseValue(data.borrowing_sources) +
      parseValue(data.accounts_payable) +
      parseValue(data.other_current_liabilities);
    
    // Total Liabilities
    const totalLiabilities = currentLiabilities + 
      parseValue(data.long_term_liabilities) +
      parseValue(data.other_non_current_liabilities);
    
    // Total Equity
    const totalEquity = 
      parseValue(data.paid_up_capital) +
      parseValue(data.retained_earning) +
      parseValue(data.resources);
    
    // Grand Total and Net Worth
    const grandTotal = totalLiabilities + totalEquity;
    const netWorth = totalAssets - totalLiabilities;
    
    return {
      ...data,
      current_assets_subtotal: currentAssets,
      fixed_assets_subtotal: fixedAssets,
      total_assets: totalAssets,
      current_liabilities_subtotal: currentLiabilities,
      total_liabilities: totalLiabilities,
      total_equity: totalEquity,
      grand_total: grandTotal,
      net_worth: netWorth
    };
  }, []);

  // Dynamic list handlers
  const addPartner = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      partners_directors: [...prev.partners_directors, { name: '', age: '', qualification: '', share: '', status: '', relationship: '' }]
    }));
  }, []);

  const removePartner = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      partners_directors: prev.partners_directors.filter((_, i) => i !== index)
    }));
  }, []);

  const addEmployee = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      key_employees: [...prev.key_employees, { name: '', designation: '', age: '', qualification: '', experience: '' }]
    }));
  }, []);

  const removeEmployee = useCallback((index) => {
    setFormData(prev => ({
      ...prev,
      key_employees: prev.key_employees.filter((_, i) => i !== index)
    }));
  }, []);

  // Location Tracking Functions
  const startLocationTracking = useCallback(async () => {
    if (!navigator.geolocation) {
      showError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocationTracking(true);
    setLocationStartTime(new Date());
    setLocationPoints([]);
    
    // Get initial location
    getCurrentLocation();
    
    // Set up periodic location updates (every 5 minutes like Flutter app)
    const intervalId = setInterval(getCurrentLocation, 5 * 60 * 1000);
    setLocationIntervalId(intervalId);
    
    showSuccess('Location tracking started successfully!');
  }, [showError, showSuccess]);

  const stopLocationTracking = useCallback(() => {
    setIsLocationTracking(false);
    setLocationEndTime(new Date());
    
    if (locationIntervalId) {
      clearInterval(locationIntervalId);
      setLocationIntervalId(null);
    }
    
    showSuccess(`Location tracking stopped. ${locationPoints.length} points captured.`);
  }, [locationIntervalId, locationPoints.length, showSuccess]);

  const getCurrentLocation = useCallback(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationPoint = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          altitude: position.coords.altitude,
          speed: position.coords.speed,
          heading: position.coords.heading,
          timestamp: new Date().toISOString(),
        };
        
        setLocationPoints(prev => [...prev, locationPoint]);
      },
      (error) => {
        console.error('Error getting location:', error);
        showError(`Error getting location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  }, [showError]);

  // File handling functions for web
  const handleFileUpload = useCallback((e, field) => {
    const files = Array.from(e.target.files);
    
    if (field === 'site_photos') {
      const photoFiles = files.slice(0, 10 - formData.site_photos.length);
      setFormData(prev => ({
        ...prev,
        site_photos: [...prev.site_photos, ...photoFiles]
      }));
      showSuccess(`${photoFiles.length} photos selected`);
    } else if (field === 'site_video' && files.length > 0) {
      setFormData(prev => ({
        ...prev,
        site_video: files[0]
      }));
      showSuccess('Video selected successfully');
    } else if (field === 'documents') {
      setFormData(prev => ({
        ...prev,
        uploaded_documents: [...prev.uploaded_documents, ...files.map(file => ({
          name: file.name,
          file: file,
          upload_date: new Date().toISOString()
        }))]
      }));
      showSuccess(`${files.length} documents added`);
    }
  }, [formData.site_photos.length, showSuccess]);

  const removeFile = useCallback((field, index) => {
    setFormData(prev => {
      const newData = { ...prev };
      if (field === 'site_photos') {
        newData.site_photos = newData.site_photos.filter((_, i) => i !== index);
      } else if (field === 'site_video') {
        newData.site_video = null;
      } else if (field === 'documents') {
        newData.uploaded_documents = newData.uploaded_documents.filter((_, i) => i !== index);
      }
      return newData;
    });
    showSuccess('File removed');
  }, [showSuccess]);

  // Prepare files for submission
  const prepareFilesForSubmission = useCallback(async () => {
    const photosData = [];
    const documentsData = [];
    
    // Process photos
    for (let i = 0; i < formData.site_photos.length; i++) {
      const photo = formData.site_photos[i];
      const base64 = await fileToBase64(photo);
      photosData.push({
        index: i,
        file_name: `site_photo_${i + 1}.jpg`,
        file_size: photo.size,
        base64_data: base64,
        uploaded_at: new Date().toISOString(),
        description: `Site photo ${i + 1}`
      });
    }
    
    // Process video
    let videoData = null;
    if (formData.site_video) {
      const base64 = await fileToBase64(formData.site_video);
      videoData = {
        file_name: 'site_video.mp4',
        file_size: formData.site_video.size,
        base64_data: base64,
        uploaded_at: new Date().toISOString(),
        description: 'Site documentation video'
      };
    }
    
    // Process documents
    for (const doc of formData.uploaded_documents) {
      documentsData.push({
        name: doc.name,
        file_path: URL.createObjectURL(doc.file),
        upload_date: doc.upload_date,
        file_type: getFileType(doc.name)
      });
    }
    
    return { photosData, videoData, documentsData };
  }, [formData.site_photos, formData.site_video, formData.uploaded_documents]);

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64 = reader.result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = error => reject(error);
    });
  };

  const getFileType = (fileName) => {
    const extension = fileName.split('.').pop().toLowerCase();
    if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
    if (['pdf'].includes(extension)) return 'pdf';
    if (['doc', 'docx'].includes(extension)) return 'document';
    return 'other';
  };

  // Fetch inspection data
  // useEffect(() => {
  //   const fetchInspection = async () => {
  //     try {
  //       const inspections = await getNewInspections();
  //       const found = inspections.find(i => i.id === parseInt(id));
  //       if (found) {
  //         setInspection(found);
  //         // Auto-load data from assigned inspection
  //         setFormData(prev => ({
  //           ...prev,
  //           client_name: found.client_name || '',
  //           industry_name: found.industry_name || '',
  //           phone_number: found.phone_number || '',
  //           ...found
  //         }));
  //       }
  //     } catch (error) {
  //       showError('Failed to fetch inspection details');
  //       console.error('Error fetching inspection:', error);
  //     }
  //   };

  //   if (id) fetchInspection();
  // }, [id, showError]);
  // CompleteInspectionForm.js - FIXED useEffect
// CompleteInspectionForm.js - TEMPORARY FIX
  useEffect(() => {
    const fetchInspection = async () => {
      try {
        console.log('🔍 Fetching inspection for ID:', id);
        
        // ✅ TEMPORARY FIX: Use existing functions
        let foundInspection = null;
        
        // Try NewInspections first (where your IDs exist)
        try {
          const newInspections = await getNewInspections();
          foundInspection = newInspections.find(i => i.id === parseInt(id));
          if (foundInspection) {
            console.log('✅ Found in NewInspections:', foundInspection);
            foundInspection.is_new_inspection = true; // Add flag
          }
        } catch (error) {
          console.log('❌ NewInspections search failed:', error.message);
        }
        
        // If not found, try regular inspections
        if (!foundInspection) {
          try {
            const allInspections = await getAllInspections();
            foundInspection = allInspections.find(i => i.id === parseInt(id));
            if (foundInspection) {
              console.log('✅ Found in regular inspections:', foundInspection);
              foundInspection.is_new_inspection = false; // Add flag
            }
          } catch (error) {
            console.log('❌ Regular inspections search failed:', error.message);
          }
        }
        try {
        const foundInspection = await getInspectionById(id);
        console.log('✅ Found via getInspectionById:', foundInspection);
        setInspection(foundInspection);
        setFormData(prev => ({
          ...prev,
          ...foundInspection
        }));
        return;
      } catch (error) {
        console.log('❌ getInspectionById failed:', error.message);
      }
        // If not found, try admin endpoint
        if (!foundInspection) {
          try {
            const response = await api.get(`/admin/inspections/${id}/`);
            foundInspection = response.data;
            foundInspection.is_new_inspection = false;
            console.log('✅ Found via admin endpoint:', foundInspection);
          } catch (error) {
            console.log('❌ Admin endpoint failed:', error.message);
          }
        }
        
        if (foundInspection) {
          console.log('✅ Final found inspection:', foundInspection);
          setInspection(foundInspection);
          
          // Auto-load data from the inspection
          setFormData(prev => ({
            ...prev,
            client_name: foundInspection.client_name || '',
            industry_name: foundInspection.industry_name || '',
            phone_number: foundInspection.phone_number || '',
            branch_name: foundInspection.branch_name || '',
            project: foundInspection.project || '',
            status: foundInspection.status || 'pending',
            ...foundInspection
          }));
          
        } else {
          console.warn('⚠️ No inspection found with ID:', id);
          showError(`Inspection ID ${id} not found. Available IDs: 6, 40, 39, 38, 2`);
        }
        
      } catch (error) {
        console.error('❌ Error fetching inspection:', error);
        showError(`Failed to fetch inspection: ${error.message}`);
      }
    };

    if (id) {
      fetchInspection();
    }
  }, [id, showError]);

  // Form validation
  const validateInspectionData = useCallback((data) => {
    const errors = {};
    
    // Required fields validation
    const requiredFields = [
      'client_name', 'industry_name', 'nature_of_business', 'legal_status',
      'phone_number', 'account_number', 'trade_license', 'investment_category',
      'owner_name', 'residential_address', 'permanent_address',
      'purpose_investment', 'period_investment', 'facility_type'
    ];
    
    requiredFields.forEach(field => {
      if (!data[field]?.toString().trim()) {
        errors[field] = `${field.replace(/_/g, ' ')} is required`;
      }
    });

    if (locationPoints.length === 0) {
      errors.location = 'Location tracking data is required';
    }
    
    return Object.keys(errors).length === 0 ? true : errors;
  }, [locationPoints.length]);

  // Form Submission
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);

  //   try {
  //     // Validate form data
  //     const validationResult = validateInspectionData(formData);
  //     if (validationResult !== true) {
  //       showError('Please fill all required fields correctly.');
  //       setLoading(false);
  //       return;
  //     }

  //     // Stop location tracking if active
  //     if (isLocationTracking) {
  //       stopLocationTracking();
  //     }

  //     // Prepare files
  //     const { photosData, videoData, documentsData } = await prepareFilesForSubmission();

  //     // Get branch name
  //     const branchName = localStorage.getItem('branch_name') || 'Web Branch';

  //     // Prepare final data
  //     const submissionData = {
  //       branch_name: branchName,
  //       location_points: locationPoints,
  //       location_start_time: locationStartTime?.toISOString(),
  //       location_end_time: locationEndTime?.toISOString(),
  //       total_location_points: locationPoints.length,
  //       ...formData,
  //       site_photos: photosData,
  //       site_video: videoData,
  //       uploaded_documents: documentsData,
  //       submitted_at: new Date().toISOString(),
  //       status: 'completed'
  //     };

  //     // Use appropriate service method
  //     let result;
  //     if (id) {
  //       result = await updateInspection(id, submissionData);
  //     } else {
  //       result = await createNewInspection(submissionData);
  //     }
      
  //     showSuccess(id ? 'Inspection updated successfully! ✅' : 'Inspection submitted successfully! ✅');
  //     navigate('/inspector/dashboard');
      
  //   } catch (error) {
  //     console.error('❌ Submission failed:', error);
  //     showError(`Failed to submit inspection: ${error.message}`);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // CompleteInspectionForm.js - FIXED handleSubmit

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validationResult = validateInspectionData(formData);
      if (validationResult !== true) {
        showError('Please fill all required fields correctly.');
        setLoading(false);
        return;
      }

      // Stop location tracking if active
      if (isLocationTracking) {
        stopLocationTracking();
      }

      // Prepare files
      const { photosData, videoData, documentsData } = await prepareFilesForSubmission();

      // Get branch name
      const branchName = localStorage.getItem('branch_name') || 'Web Branch';

      // Prepare final data
      const submissionData = {
        branch_name: branchName,
        location_points: locationPoints,
        location_start_time: locationStartTime?.toISOString(),
        location_end_time: locationEndTime?.toISOString(),
        total_location_points: locationPoints.length,
        ...formData,
        site_photos: photosData,
        site_video: videoData,
        uploaded_documents: documentsData,
        submitted_at: new Date().toISOString(),
        status: 'completed'
      };

      console.log('📤 Submitting data for inspection:', id);

      let result;
      
      // ✅ SMART SUBMISSION LOGIC
      if (id && inspection) {
        if (inspection.is_new_inspection) {
          // This was a NewInspection - create a new full Inspection
          console.log('🔄 Converting NewInspection to full Inspection');
          
          // Remove ID to create new record
          const { id: _, ...dataWithoutId } = submissionData;
          result = await createNewInspection(dataWithoutId);
          
          showSuccess('New inspection created successfully from assignment! ✅');
        } else {
          // This is a regular Inspection - update it
          result = await updateInspection(id, submissionData);
          showSuccess('Inspection updated successfully! ✅');
        }
      } else {
        // Create brand new inspection
        result = await createNewInspection(submissionData);
        showSuccess('Inspection created successfully! ✅');
      }
      
      navigate('/inspector/dashboard');
      
    } catch (error) {
      console.error('❌ Submission failed:', error);
      showError(`Failed to submit inspection: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Clear form function
  const clearForm = useCallback(() => {
    setFormData({
      client_name: '',
      group_name: '',
      industry_name: '',
      nature_of_business: '',
      legal_status: '',
      date_of_establishment: '',
      office_address: '',
      showroom_address: '',
      factory_address: '',
      phone_number: '',
      account_number: '',
      account_id: '',
      tin_number: '',
      date_of_opening: '',
      vat_reg_number: '',
      first_investment_date: '',
      sector_code: '',
      trade_license: '',
      economic_purpose_code: '',
      investment_category: '',
      owner_name: '',
      owner_age: '',
      father_name: '',
      mother_name: '',
      spouse_name: '',
      academic_qualification: '',
      children_info: '',
      business_successor: '',
      residential_address: '',
      permanent_address: '',
      partners_directors: [{ name: '', age: '', qualification: '', share: '', status: '', relationship: '' }],
      purpose_investment: '',
      purpose_bank_guarantee: '',
      period_investment: '',
      facility_type: '',
      existing_limit: '',
      applied_limit: '',
      recommended_limit: '',
      bank_percentage: '',
      client_percentage: '',
      outstanding_type: '',
      limit_amount: '',
      net_outstanding: '',
      gross_outstanding: '',
      market_situation: '',
      client_position: '',
      competitors: Array(5).fill().map(() => ({ name: '', address: '', market_share: '' })),
      business_reputation: '',
      production_type: '',
      product_name: '',
      production_capacity: '',
      actual_production: '',
      profitability_observation: '',
      male_officer: '',
      female_officer: '',
      skilled_officer: '',
      unskilled_officer: '',
      male_worker: '',
      female_worker: '',
      skilled_worker: '',
      unskilled_worker: '',
      key_employees: [{ name: '', designation: '', age: '', qualification: '', experience: '' }],
      cash_balance: '',
      stock_trade_finished: '',
      stock_trade_financial: '',
      accounts_receivable: '',
      advance_deposit: '',
      other_current_assets: '',
      land_building: '',
      plant_machinery: '',
      other_assets: '',
      ibbl_investment: '',
      other_banks_investment: '',
      borrowing_sources: '',
      accounts_payable: '',
      other_current_liabilities: '',
      long_term_liabilities: '',
      other_non_current_liabilities: '',
      paid_up_capital: '',
      retained_earning: '',
      resources: '',
      current_assets_subtotal: 0,
      fixed_assets_subtotal: 0,
      total_assets: 0,
      current_liabilities_subtotal: 0,
      total_liabilities: 0,
      total_equity: 0,
      grand_total: 0,
      net_worth: 0,
      working_capital_items: [
        { name: 'Raw Materials (imported)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
        { name: 'Raw Materials (Local)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
        { name: 'Work in Process', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
        { name: 'Finished goods', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' }
      ],
      godown_location: '',
      godown_capacity: '',
      godown_space: '',
      godown_nature: '',
      godown_owner: '',
      distance_from_branch: '',
      items_to_store: '',
      warehouse_license: false,
      godown_guard: false,
      damp_proof: false,
      easy_access: false,
      letter_disclaimer: false,
      insurance_policy: false,
      godown_hired: false,
      checklist_items: {
        'Business establishment physically verified': null,
        'Honesty and integrity ascertained': null,
        'Confidential Report obtained': null,
        'CIB report obtained': null,
        'Items permissible by Islamic Shariah': null,
        'Items not restricted by Bangladesh Bank': null,
        'Items permissible by Investment Policy': null,
        'Market Price verified': null,
        'Constant market demand': null,
        'F-167 A duly filled': null,
        'F-167 B property filled': null,
        'Application particulars verified': null,
        'IRC, ERC, VAT copies enclosed': null,
        'TIN Certificate enclosed': null,
        'Rental Agreement enclosed': null,
        'Trade License enclosed': null,
        'Partnership Deed enclosed': null,
        'Memorandum & Articles enclosed': null,
        'Board resolution enclosed': null,
        'Directors particulars enclosed': null,
        'Current Account Statement enclosed': null,
        'Creditors/Debtors list enclosed': null,
        'IRC form with documents enclosed': null,
        'Audited Balance sheet enclosed': null,
      },
      site_photos: [],
      site_video: null,
      uploaded_documents: [],
      status: INSPECTION_STATUS.IN_PROGRESS
    });

    // Reset location data
    setIsLocationTracking(false);
    setLocationPoints([]);
    setLocationStartTime(null);
    setLocationEndTime(null);
    if (locationIntervalId) {
      clearInterval(locationIntervalId);
      setLocationIntervalId(null);
    }

    showSuccess('Form cleared successfully');
  }, [locationIntervalId, showSuccess]);

  // UI Helper functions
  const renderTextField = useCallback((label, name, type = 'text', required = false, rows = 1, customOnChange = null) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {rows > 1 ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={customOnChange || handleChange}
          rows={rows}
          required={required}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={customOnChange || handleChange}
          required={required}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      )}
    </div>
  ), [formData, handleChange]);

  const renderDropdown = useCallback((label, name, options, required = false) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={formData[name]}
        onChange={handleChange}
        required={required}
        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  ), [formData, handleChange]);

  const renderRadioGroup = useCallback((label, name, options) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
      <div className="space-y-2">
        {options.map(option => (
          <label key={option} className="flex items-center">
            <input
              type="radio"
              name={name}
              value={option}
              checked={formData[name] === option}
              onChange={handleChange}
              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
            />
            <span className="ml-2 text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  ), [formData, handleChange]);

  const renderCheckbox = useCallback((label, name) => (
    <label className="flex items-center">
      <input
        type="checkbox"
        name={name}
        checked={formData[name]}
        onChange={handleChange}
        className="focus:ring-primary h-4 w-4 text-primary border-gray-300 rounded"
      />
      <span className="ml-2 text-sm text-gray-700">{label}</span>
    </label>
  ), [formData, handleChange]);

  // Section navigation
  const sections = [
    { id: 'A', title: 'Company Information' },
    { id: 'B', title: 'Owner Information' },
    { id: 'C', title: 'Partners/Directors' },
    { id: 'D', title: 'Purpose' },
    { id: 'E', title: 'Proposed Facilities' },
    { id: 'F', title: 'Present Outstanding' },
    { id: 'G', title: 'Business Analysis' },
    { id: 'H', title: 'Property & Assets' },
    { id: 'I', title: 'Working Capital' },
    { id: 'J', title: 'Godown Particulars' },
    { id: 'K', title: 'Checklist' },
    { id: 'L', title: 'Site Photos & Video' },
    { id: 'M', title: 'Documents Upload' }
  ];

  if (!inspection && id) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {id ? 'Edit Inspection' : 'Create New Inspection'}
          </h1>
          {inspection && (
            <p className="mt-2 text-sm text-gray-600">
              Project: {inspection.project} | Client: {inspection.client_name} | Industry: {inspection.industry_name}
            </p>
          )}
        </div>

        {/* Location Tracking Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Tracking</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              isLocationTracking ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  isLocationTracking ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {isLocationTracking ? '📍' : '📌'}
                </div>
                <div className="ml-4">
                  <p className={`font-medium ${
                    isLocationTracking ? 'text-green-800' : 'text-gray-800'
                  }`}>
                    {isLocationTracking ? 'Location Tracking Active' : 'Location Tracking Inactive'}
                  </p>
                  <p className="text-sm text-gray-600">
                    {isLocationTracking 
                      ? `${locationPoints.length} points captured • Started: ${locationStartTime?.toLocaleTimeString()}`
                      : 'Click "Start Location" to begin tracking'
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={startLocationTracking}
                disabled={isLocationTracking}
                className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  isLocationTracking 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500'
                }`}
              >
                Start Location
              </button>
              <button
                type="button"
                onClick={stopLocationTracking}
                disabled={!isLocationTracking}
                className={`flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  !isLocationTracking 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
                }`}
              >
                Stop Location
              </button>
            </div>

            {locationPoints.length > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-blue-900">Total Points:</span>
                  <span className="font-bold text-blue-600">{locationPoints.length}</span>
                </div>
                {locationStartTime && (
                  <p className="text-sm text-blue-800">Started: {locationStartTime.toLocaleString()}</p>
                )}
                {locationEndTime && (
                  <p className="text-sm text-blue-800">Ended: {locationEndTime.toLocaleString()}</p>
                )}
                {locationPoints.length > 0 && (
                  <p className="text-sm font-mono text-blue-800 mt-2">
                    Latest: {locationPoints[locationPoints.length - 1].latitude?.toFixed(4)}, {locationPoints[locationPoints.length - 1].longitude?.toFixed(4)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Section Navigation */}
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
                {section.id}. {section.title}
              </button>
            ))}
          </nav>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section A: Company Information */}
          {activeSection === 'A' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section A: Company's Client's Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {renderTextField('Name of the Client', 'client_name', 'text', true)}
                {renderTextField('Group Name (if any)', 'group_name')}
                {renderTextField('Industry Name (as per CIB)', 'industry_name', 'text', true)}
                {renderTextField('Nature of Business', 'nature_of_business', 'text', true, 3)}
                {renderTextField('Legal Status', 'legal_status', 'text', true)}
                {renderTextField('Date of Establishment', 'date_of_establishment', 'text', true)}
                {renderTextField('Office Address', 'office_address', 'text', true, 3)}
                {renderTextField('Showroom Address', 'showroom_address', 'text', false, 2)}
                {renderTextField('Factory/Godown/Depot Address', 'factory_address', 'text', false, 2)}
                {renderTextField('Phone/Mobile no (office)', 'phone_number', 'tel', true)}
                {renderTextField('Current A/C no', 'account_number', 'text', true)}
                {renderTextField('A/C ID no', 'account_id', 'text', true)}
                {renderTextField('TIN', 'tin_number', 'text', true)}
                {renderTextField('Date of Opening', 'date_of_opening', 'text')}
                {renderTextField('VAT Reg no', 'vat_reg_number', 'text')}
                {renderTextField('Date of 1st Investment availed', 'first_investment_date', 'text')}
                {renderTextField('Sector Code', 'sector_code', 'text')}
                {renderTextField('Trade License No & Date', 'trade_license', 'text', true)}
                {renderTextField('Economic Purpose Code', 'economic_purpose_code', 'text')}
                {renderDropdown('Investment Category', 'investment_category', dropdownOptions.investmentCategories, true)}
              </div>
            </div>
          )}

          {/* Section B: Owner Information */}
          {activeSection === 'B' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section B: Owner Information</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {renderTextField('Name of the Owner (S) & status', 'owner_name', 'text', true, 2)}
                {renderTextField('Age', 'owner_age', 'text')}
                {renderTextField('Father\'s Name', 'father_name', 'text')}
                {renderTextField('Mother\'s Name', 'mother_name', 'text')}
                {renderTextField('Spouse\'s Name', 'spouse_name', 'text')}
                {renderTextField('Academic Qualification', 'academic_qualification', 'text', false, 3)}
                {renderTextField('No. of Children with age', 'children_info', 'text', false, 2)}
                {renderTextField('Business Successor', 'business_successor', 'text', false, 3)}
                {renderTextField('Residential Address', 'residential_address', 'text', true, 3)}
                {renderTextField('Permanent Address', 'permanent_address', 'text', true, 3)}
              </div>
            </div>
          )}

          {/* Section C: Partners/Directors */}
          {activeSection === 'C' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section C: List of Partners / Directors</h2>
              {formData.partners_directors.map((partner, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Partner/Director {index + 1}</h3>
                    {formData.partners_directors.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removePartner(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name with Father's / husband's</label>
                      <input
                        type="text"
                        value={partner.name}
                        onChange={(e) => handleNestedChange('partners_directors', index, 'name', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Age</label>
                      <input
                        type="text"
                        value={partner.age}
                        onChange={(e) => handleNestedChange('partners_directors', index, 'age', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Academic Qualification</label>
                      <input
                        type="text"
                        value={partner.qualification}
                        onChange={(e) => handleNestedChange('partners_directors', index, 'qualification', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Extent of Share (%)</label>
                      <input
                        type="text"
                        value={partner.share}
                        onChange={(e) => handleNestedChange('partners_directors', index, 'share', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Status</label>
                      <input
                        type="text"
                        value={partner.status}
                        onChange={(e) => handleNestedChange('partners_directors', index, 'status', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700">Relationship with Chairman / MD name</label>
                      <input
                        type="text"
                        value={partner.relationship}
                        onChange={(e) => handleNestedChange('partners_directors', index, 'relationship', e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={addPartner}
                className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Add Another Partner/Director
              </button>
            </div>
          )}

          {/* Section D: Purpose */}
          {activeSection === 'D' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section D: Purpose of Investment / Facilities</h2>
              <div className="grid grid-cols-1 gap-6">
                {renderTextField('Purpose of Investment', 'purpose_investment', 'text', true, 3)}
                {renderTextField('Purpose of Bank Guarantee', 'purpose_bank_guarantee', 'text', false, 2)}
                {renderTextField('Period of Investment', 'period_investment', 'text', true)}
              </div>
            </div>
          )}

          {/* Section E: Proposed Facilities */}
          {activeSection === 'E' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section E: Details of proposed Facilities/Investment</h2>
              <div className="space-y-6">
                {renderDropdown('Facility Type', 'facility_type', dropdownOptions.facilityTypes, true)}
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Tk)</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Existing Limit</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="existing_limit"
                            value={formData.existing_limit}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Limit Applied by the client</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="applied_limit"
                            value={formData.applied_limit}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Limit Recommended By the Branch</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="recommended_limit"
                            value={formData.recommended_limit}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Rate of return profit sharing ratio</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Bank (%)</label>
                      <input
                        type="text"
                        name="bank_percentage"
                        value={formData.bank_percentage}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Client (%)</label>
                      <input
                        type="text"
                        name="client_percentage"
                        value={formData.client_percentage}
                        onChange={handleChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section F: Present Outstanding */}
          {activeSection === 'F' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section F: Break up of Present Outstanding</h2>
              <div className="space-y-6">
                {renderDropdown('Outstanding Type', 'outstanding_type', dropdownOptions.outstandingTypes, true)}
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Limit</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <input
                            type="text"
                            name="limit_amount"
                            value={formData.limit_amount}
                            onChange={handleChange}
                            className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          Outstanding
                          <table className="min-w-full mt-2">
                            <tbody>
                              <tr>
                                <td className="px-2 py-1 text-xs text-gray-500">Net</td>
                                <td className="px-2 py-1">
                                  <input
                                    type="text"
                                    name="net_outstanding"
                                    value={formData.net_outstanding}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-primary focus:border-primary"
                                  />
                                </td>
                              </tr>
                              <tr>
                                <td className="px-2 py-1 text-xs text-gray-500">Gross</td>
                                <td className="px-2 py-1">
                                  <input
                                    type="text"
                                    name="gross_outstanding"
                                    value={formData.gross_outstanding}
                                    onChange={handleChange}
                                    className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-xs focus:outline-none focus:ring-primary focus:border-primary"
                                  />
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section G: Business Analysis */}
          {activeSection === 'G' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section G: Business Industry / Analysis</h2>
              <div className="space-y-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Market Situation</h3>
                  {renderRadioGroup('', 'market_situation', dropdownOptions.marketSituations)}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Client's Position in the Industry</h3>
                  {renderRadioGroup('', 'client_position', dropdownOptions.clientPositions)}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Name of 5 main competitors</h3>
                  {formData.competitors.map((competitor, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
                      <h4 className="font-medium text-gray-900 mb-3">Competitor {index + 1}</h4>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            value={competitor.name}
                            onChange={(e) => {
                              const newCompetitors = [...formData.competitors];
                              newCompetitors[index].name = e.target.value;
                              setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Address</label>
                          <input
                            type="text"
                            value={competitor.address}
                            onChange={(e) => {
                              const newCompetitors = [...formData.competitors];
                              newCompetitors[index].address = e.target.value;
                              setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Market Share</label>
                          <input
                            type="text"
                            value={competitor.market_share}
                            onChange={(e) => {
                              const newCompetitors = [...formData.competitors];
                              newCompetitors[index].market_share = e.target.value;
                              setFormData(prev => ({ ...prev, competitors: newCompetitors }));
                            }}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Business reputation</h3>
                  {renderRadioGroup('', 'business_reputation', dropdownOptions.reputationOptions)}
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Production</h3>
                  {renderRadioGroup('', 'production_type', dropdownOptions.productionTypes)}
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                  {renderTextField('Name of the Product', 'product_name')}
                  {renderTextField('Production Capacity: Units / Year', 'production_capacity')}
                  {renderTextField('Actual Production: Units / Year', 'actual_production')}
                </div>

                {renderTextField('Observation on profitability / marketability of the goods', 'profitability_observation', 'text', false, 4)}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Size of the labor force</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Male</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Female</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Skilled</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unskilled</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Officer / Staff</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="male_officer"
                              value={formData.male_officer}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="female_officer"
                              value={formData.female_officer}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="skilled_officer"
                              value={formData.skilled_officer}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="unskilled_officer"
                              value={formData.unskilled_officer}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Labor / Worker</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="male_worker"
                              value={formData.male_worker}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="female_worker"
                              value={formData.female_worker}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="skilled_worker"
                              value={formData.skilled_worker}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="unskilled_worker"
                              value={formData.unskilled_worker}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Name of the key employee of the Firm</h3>
                  {formData.key_employees.map((employee, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-white">
                      <div className="flex justify-between items-center mb-4">
                        <h4 className="font-medium text-gray-900">Employee {index + 1}</h4>
                        {formData.key_employees.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeEmployee(index)}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Name</label>
                          <input
                            type="text"
                            value={employee.name}
                            onChange={(e) => handleNestedChange('key_employees', index, 'name', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Designation</label>
                          <input
                            type="text"
                            value={employee.designation}
                            onChange={(e) => handleNestedChange('key_employees', index, 'designation', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Age</label>
                          <input
                            type="text"
                            value={employee.age}
                            onChange={(e) => handleNestedChange('key_employees', index, 'age', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Education Qualification</label>
                          <input
                            type="text"
                            value={employee.qualification}
                            onChange={(e) => handleNestedChange('key_employees', index, 'qualification', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Experience</label>
                          <input
                            type="text"
                            value={employee.experience}
                            onChange={(e) => handleNestedChange('key_employees', index, 'experience', e.target.value)}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addEmployee}
                    className="w-full py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  >
                    Add Another Employee
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Section H: Property & Assets */}
          {activeSection === 'H' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section H: Property & Assets</h2>
              <div className="space-y-6">
                {/* Current Assets */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Assets</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {renderTextField('1. Cash & Bank Balance', 'cash_balance', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('Stock in trade & investment/finished goods', 'stock_trade_finished', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('2. Stock in trade & investment/financial goods', 'stock_trade_financial', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('3. Accounts receivable (Sundry Debtors)', 'accounts_receivable', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('4. Advance Deposit & Pre-payment', 'advance_deposit', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('5. Other current assets', 'other_current_assets', 'number', false, 1, handleFinancialFieldChange)}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded border">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Sub-Total (a):</span>
                      <span className="font-bold">Tk. {formData.current_assets_subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Fixed Assets */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Fixed Assets</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {renderTextField('6. Land, Building & other immovable assets', 'land_building', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('7. Plant, Machinery & furniture & fixture', 'plant_machinery', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('8. Other assets', 'other_assets', 'number', false, 1, handleFinancialFieldChange)}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded border">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Sub-Total (b):</span>
                      <span className="font-bold">Tk. {formData.fixed_assets_subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Total Assets */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-blue-900">A. Grand Total (a+b):</span>
                    <span className="font-bold text-xl text-blue-900">Tk. {formData.total_assets.toFixed(2)}</span>
                  </div>
                </div>

                {/* Current Liabilities */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Liabilities</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-3 rounded">
                      <h4 className="font-medium text-gray-900 mb-2">1. Investment from Bank/Financial Institutions</h4>
                      <div className="grid grid-cols-1 gap-4 ml-4">
                        {renderTextField('a) IBBL', 'ibbl_investment', 'number', false, 1, handleFinancialFieldChange)}
                        {renderTextField('b) Others', 'other_banks_investment', 'number', false, 1, handleFinancialFieldChange)}
                      </div>
                    </div>
                    {renderTextField('2. Borrowing from other sources', 'borrowing_sources', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('3. Accounts Payable (Sundry Creditors)', 'accounts_payable', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('4. Others', 'other_current_liabilities', 'number', false, 1, handleFinancialFieldChange)}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded border">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">Sub-Total (a):</span>
                      <span className="font-bold">Tk. {formData.current_liabilities_subtotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Long Term Liability */}
                {renderTextField('Long Term Liability', 'long_term_liabilities', 'number', false, 1, handleFinancialFieldChange)}

                {/* Other non-current liabilities */}
                {renderTextField('Other non-current liabilities', 'other_non_current_liabilities', 'number', false, 1, handleFinancialFieldChange)}

                {/* Total Liabilities */}
                <div className="p-3 bg-gray-50 rounded border">
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">B. Total Liabilities (a+b+c):</span>
                    <span className="font-bold">Tk. {formData.total_liabilities.toFixed(2)}</span>
                  </div>
                </div>

                {/* Owner's Equity */}
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Owner's Equity</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {renderTextField('d. Paid up capital / owner\'s Capital Balance as per last account', 'paid_up_capital', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('e. Resources', 'resources', 'number', false, 1, handleFinancialFieldChange)}
                    {renderTextField('I. Retained Earning / Net Profit for the year transferred to Balance Sheet', 'retained_earning', 'number', false, 1, handleFinancialFieldChange)}
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded border">
                    <div className="flex justify-between">
                      <span className="font-medium text-sm">C. Total Equity (d+e+f):</span>
                      <span className="font-bold">Tk. {formData.total_equity.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Grand Total */}
                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-green-900">Grand Total (a+b+c+d+e+f):</span>
                    <span className="font-bold text-xl text-green-900">Tk. {formData.grand_total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Net Worth */}
                <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-orange-900">NET WORTH (Total Assets - Total Liabilities):</span>
                    <span className="font-bold text-xl text-orange-900">Tk. {formData.net_worth.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section I: Working Capital Assessment */}
          {activeSection === 'I' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section I: Working Capital Assessment: N/A</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                      <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700" colSpan="3">
                        Daily Requirements
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
                        Tied up period in Days (e)
                      </th>
                      <th className="border border-gray-200 px-4 py-2 text-center text-sm font-medium text-gray-700">
                        Amount d\e
                      </th>
                    </tr>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-200 px-4 py-2"></th>
                      <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600">Unit (b)</th>
                      <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600">Rate (c)</th>
                      <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600">Amount (d)\nd\\e</th>
                      <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600"></th>
                      <th className="border border-gray-200 px-2 py-1 text-center text-xs font-medium text-gray-600"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.working_capital_items.map((item, index) => (
                      <tr key={index}>
                        <td className="border border-gray-200 px-4 py-2 text-sm">{item.name}</td>
                        <td className="border border-gray-200 px-2 py-1">
                          <input
                            type="text"
                            value={item.unit}
                            onChange={(e) => handleWorkingCapitalChange(index, 'unit', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </td>
                        <td className="border border-gray-200 px-2 py-1">
                          <input
                            type="text"
                            value={item.rate}
                            onChange={(e) => handleWorkingCapitalChange(index, 'rate', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </td>
                        <td className="border border-gray-200 px-2 py-1">
                          <input
                            type="text"
                            value={item.amount}
                            readOnly
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                        <td className="border border-gray-200 px-2 py-1">
                          <input
                            type="text"
                            value={item.tied_up_days}
                            onChange={(e) => handleWorkingCapitalChange(index, 'tied_up_days', e.target.value)}
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                          />
                        </td>
                        <td className="border border-gray-200 px-2 py-1">
                          <input
                            type="text"
                            value={item.amount_dxe}
                            readOnly
                            className="w-full border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded border">
                <p className="text-sm text-gray-600 italic">
                  Note: Amount (d) = Unit (b) × Rate (c)<br />
                  Amount d\\e = Amount (d) × Tied up period (e)
                </p>
              </div>
            </div>
          )}

          {/* Section J: Godown Particulars */}
          {activeSection === 'J' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section J: Particulars of the godown for storing MPI/Murabaha goods</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {renderTextField('Location of the godown', 'godown_location')}
                {renderTextField('Capacity of godown', 'godown_capacity')}
                {renderTextField('Space of godown (Length X Width X Height)', 'godown_space')}
                {renderTextField('Nature of Godown (Pucca/Semi Pucca and class of godown)', 'godown_nature')}
                {renderTextField('Owner of godown (Bank/Client/Third Party)', 'godown_owner')}
                {renderTextField('Distance from the branch (K.M./Mile)', 'distance_from_branch')}
                {renderTextField('item to be stored', 'items_to_store', 'text', false, 3)}
              </div>
              
              <div className="mt-8 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Godown Facilities</h3>
                <div className="space-y-4">
                  {renderCheckbox('Whether Ware-House License has been obtained from the Competent authority', 'warehouse_license')}
                  {renderCheckbox('Whether godown is watched over by the godown guard round the clock', 'godown_guard')}
                  {renderCheckbox('Whether godown is damp proof and safe from rain/flood water and other common hazards', 'damp_proof')}
                  {renderCheckbox('Whether the officials of the Branch have easy access to the godown', 'easy_access')}
                  {renderCheckbox('Whether letter of disclaimer is obtained', 'letter_disclaimer')}
                  {renderCheckbox('Whether Insurance Policy obtained / updated', 'insurance_policy')}
                  {renderCheckbox('Whether the Godown hired by the Bank', 'godown_hired')}
                </div>
              </div>
            </div>
          )}

          {/* Section K: Checklist */}
          {activeSection === 'K' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section K: Checklist</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">General</h3>
                  <div className="space-y-4">
                    {Object.entries(formData.checklist_items).slice(0, 15).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 flex-1">{key}</span>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="true"
                              checked={value === true}
                              onChange={() => handleChecklistChange(key, true)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="false"
                              checked={value === false}
                              onChange={() => handleChecklistChange(key, false)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="null"
                              checked={value === null}
                              onChange={() => handleChecklistChange(key, null)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">N/A</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Constitution of the Firm</h3>
                  <div className="space-y-4">
                    {Object.entries(formData.checklist_items).slice(15, 21).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 flex-1">{key}</span>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="true"
                              checked={value === true}
                              onChange={() => handleChecklistChange(key, true)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="false"
                              checked={value === false}
                              onChange={() => handleChecklistChange(key, false)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="null"
                              checked={value === null}
                              onChange={() => handleChecklistChange(key, null)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">N/A</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Statements</h3>
                  <div className="space-y-4">
                    {Object.entries(formData.checklist_items).slice(21).map(([key, value]) => (
                      <div key={key} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <span className="text-sm font-medium text-gray-700 flex-1">{key}</span>
                        <div className="flex items-center space-x-4">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="true"
                              checked={value === true}
                              onChange={() => handleChecklistChange(key, true)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">Yes</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="false"
                              checked={value === false}
                              onChange={() => handleChecklistChange(key, false)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">No</span>
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              value="null"
                              checked={value === null}
                              onChange={() => handleChecklistChange(key, null)}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                            <span className="ml-2 text-sm text-gray-700">N/A</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section L: Site Photos & Video */}
          {activeSection === 'L' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section L: Site Photos & Video Documentation</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Site Photos (up to 10 images)</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload clear photos of the business site, premises, and operations</p>
                  
                  {/* Photo Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                    {formData.site_photos.map((photo, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(photo)}
                          alt={`Site photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeFile('site_photos', index)}
                          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {formData.site_photos.length < 10 && (
                      <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <p className="text-sm text-gray-500">Add Photo</p>
                        </div>
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'site_photos')}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{formData.site_photos.length}/10 photos</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Site Video (Short documentation)</h3>
                  <p className="text-sm text-gray-600 mb-4">Upload a short video (max 2 minutes) showing the business operations and premises</p>
                  
                  {formData.site_video ? (
                    <div className="relative">
                      <video
                        src={URL.createObjectURL(formData.site_video)}
                        controls
                        className="w-full rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile('site_video', 0)}
                        className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
                      >
                        Remove Video
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm text-gray-500">Upload Video</p>
                        <p className="text-xs text-gray-400">MP4, MOV up to 100MB</p>
                      </div>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, 'site_video')}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section M: Documents Upload */}
          {activeSection === 'M' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section M: Supporting Documents Upload</h2>
              <div className="space-y-6">
                <p className="text-sm text-gray-600">Upload all relevant supporting documents (unlimited files)</p>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Documents</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Trade License', 'TIN Certificate', 'VAT Certificate', 'Bank Statements', 'Audit Reports', 'Property Documents', 'Partnership Deed', 'Memorandum', 'Others'].map((doc) => (
                      <span key={doc} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 bg-blue-50">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-12 h-12 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <p className="text-lg font-medium text-blue-600">Click to Upload Documents</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Supported formats: PDF, DOC, DOCX, JPG, PNG<br />
                      Maximum file size: 10MB per file
                    </p>
                  </div>
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={(e) => handleFileUpload(e, 'documents')}
                    className="hidden"
                  />
                </label>

                {formData.uploaded_documents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Uploaded Documents ({formData.uploaded_documents.length})
                    </h3>
                    <div className="space-y-3">
                      {formData.uploaded_documents.map((doc, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center">
                            <svg className="h-6 w-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{doc.name}</p>
                              <p className="text-sm text-gray-500">Uploaded: {new Date(doc.upload_date).toLocaleDateString()}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile('documents', index)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => navigate('/inspector/dashboard')}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              {!id && (
                <button
                  type="button"
                  onClick={clearForm}
                  className="inline-flex justify-center py-2 px-4 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Clear Form
                </button>
              )}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => {
                  const currentIndex = sections.findIndex(s => s.id === activeSection);
                  if (currentIndex > 0) {
                    setActiveSection(sections[currentIndex - 1].id);
                  }
                }}
                disabled={activeSection === 'A'}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous Section
              </button>
              
              {activeSection === 'M' ? (
                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {id ? 'Updating...' : 'Submitting...'}
                    </>
                  ) : (
                    id ? 'Update Inspection' : 'Submit Complete Form'
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) {
                      setActiveSection(sections[currentIndex + 1].id);
                    }
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Next Section
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompleteInspectionForm;