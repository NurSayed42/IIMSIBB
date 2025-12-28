

// import React, { useState, useEffect, useCallback } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getNewInspections, updateInspection, createNewInspection, } from '../../services/inspectionService';
// import { useNotification } from '../../context/NotificationContext';
// import { INSPECTION_STATUS } from '../../utils/constants';


// const CompleteInspectionForm = () => {
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
//   const [locationIntervalId, setLocationIntervalId] = useState(null);

//   // Form Data State - Flutter app এর সাথে compatible structure
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
    
//     status: INSPECTION_STATUS.IN_PROGRESS,
//     branch_name: '',
//     submitted_at: ''
//   });

//   // Dropdown options - Flutter app এর মতোই
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

//   // Performance optimized handlers
//   const handleChange = useCallback((e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
//   }, []);

//   // Financial fields-এর জন্য আলাদা handler
//   const handleFinancialFieldChange = useCallback((e) => {
//     const { name, value } = e.target;
    
//     setFormData(prev => {
//       const newData = {
//         ...prev,
//         [name]: value
//       };
      
//       // Immediately calculate financials with new data
//       return calculateFinancialsWithData(newData);
//     });
//   }, []);

//   const handleNestedChange = useCallback((section, index, field, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: prev[section].map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       )
//     }));
//   }, []);

//   const handleChecklistChange = useCallback((key, value) => {
//     setFormData(prev => ({
//       ...prev,
//       checklist_items: {
//         ...prev.checklist_items,
//         [key]: value
//       }
//     }));
//   }, []);

//   const handleWorkingCapitalChange = useCallback((index, field, value) => {
//     setFormData(prev => {
//       const updatedItems = prev.working_capital_items.map((item, i) => 
//         i === index ? { ...item, [field]: value } : item
//       );
      
//       // Auto-calculate amount and amount_dxe (Flutter app logic)
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
//   }, []);

//   // Separate calculation function that doesn't depend on formData
//   const calculateFinancialsWithData = useCallback((data) => {
//     const parseValue = (value) => parseFloat(value) || 0;

//     // Current Assets (Flutter app logic)
//     const currentAssets = 
//       parseValue(data.cash_balance) +
//       parseValue(data.stock_trade_finished) +
//       parseValue(data.stock_trade_financial) +
//       parseValue(data.accounts_receivable) +
//       parseValue(data.advance_deposit) +
//       parseValue(data.other_current_assets);
    
//     // Fixed Assets
//     const fixedAssets = 
//       parseValue(data.land_building) +
//       parseValue(data.plant_machinery) +
//       parseValue(data.other_assets);
    
//     // Total Assets
//     const totalAssets = currentAssets + fixedAssets;
    
//     // Current Liabilities
//     const currentLiabilities = 
//       parseValue(data.ibbl_investment) +
//       parseValue(data.other_banks_investment) +
//       parseValue(data.borrowing_sources) +
//       parseValue(data.accounts_payable) +
//       parseValue(data.other_current_liabilities);
    
//     // Total Liabilities
//     const totalLiabilities = currentLiabilities + 
//       parseValue(data.long_term_liabilities) +
//       parseValue(data.other_non_current_liabilities);
    
//     // Total Equity
//     const totalEquity = 
//       parseValue(data.paid_up_capital) +
//       parseValue(data.retained_earning) +
//       parseValue(data.resources);
    
//     // Grand Total and Net Worth
//     const grandTotal = totalLiabilities + totalEquity;
//     const netWorth = totalAssets - totalLiabilities;
    
//     return {
//       ...data,
//       current_assets_subtotal: currentAssets,
//       fixed_assets_subtotal: fixedAssets,
//       total_assets: totalAssets,
//       current_liabilities_subtotal: currentLiabilities,
//       total_liabilities: totalLiabilities,
//       total_equity: totalEquity,
//       grand_total: grandTotal,
//       net_worth: netWorth
//     };
//   }, []);

//   // Dynamic list handlers
//   const addPartner = useCallback(() => {
//     setFormData(prev => ({
//       ...prev,
//       partners_directors: [...prev.partners_directors, { name: '', age: '', qualification: '', share: '', status: '', relationship: '' }]
//     }));
//   }, []);

//   const removePartner = useCallback((index) => {
//     setFormData(prev => ({
//       ...prev,
//       partners_directors: prev.partners_directors.filter((_, i) => i !== index)
//     }));
//   }, []);

//   const addEmployee = useCallback(() => {
//     setFormData(prev => ({
//       ...prev,
//       key_employees: [...prev.key_employees, { name: '', designation: '', age: '', qualification: '', experience: '' }]
//     }));
//   }, []);

//   const removeEmployee = useCallback((index) => {
//     setFormData(prev => ({
//       ...prev,
//       key_employees: prev.key_employees.filter((_, i) => i !== index)
//     }));
//   }, []);

//   // Location Tracking Functions
//   const startLocationTracking = useCallback(async () => {
//     if (!navigator.geolocation) {
//       showError('Geolocation is not supported by this browser.');
//       return;
//     }

//     setIsLocationTracking(true);
//     setLocationStartTime(new Date());
//     setLocationPoints([]);
    
//     // Get initial location
//     getCurrentLocation();
    
//     // Set up periodic location updates (every 5 minutes like Flutter app)
//     const intervalId = setInterval(getCurrentLocation, 5 * 60 * 1000);
//     setLocationIntervalId(intervalId);
    
//     showSuccess('Location tracking started successfully!');
//   }, [showError, showSuccess]);

//   const stopLocationTracking = useCallback(() => {
//     setIsLocationTracking(false);
//     setLocationEndTime(new Date());
    
//     if (locationIntervalId) {
//       clearInterval(locationIntervalId);
//       setLocationIntervalId(null);
//     }
    
//     showSuccess(`Location tracking stopped. ${locationPoints.length} points captured.`);
//   }, [locationIntervalId, locationPoints.length, showSuccess]);

//   const getCurrentLocation = useCallback(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const locationPoint = {
//           latitude: position.coords.latitude,
//           longitude: position.coords.longitude,
//           accuracy: position.coords.accuracy,
//           altitude: position.coords.altitude,
//           speed: position.coords.speed,
//           heading: position.coords.heading,
//           timestamp: new Date().toISOString(),
//         };
        
//         setLocationPoints(prev => [...prev, locationPoint]);
//       },
//       (error) => {
//         console.error('Error getting location:', error);
//         showError(`Error getting location: ${error.message}`);
//       },
//       { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
//     );
//   }, [showError]);

//   // File handling functions for web
//   const handleFileUpload = useCallback((e, field) => {
//     const files = Array.from(e.target.files);
    
//     if (field === 'site_photos') {
//       const photoFiles = files.slice(0, 10 - formData.site_photos.length);
//       setFormData(prev => ({
//         ...prev,
//         site_photos: [...prev.site_photos, ...photoFiles]
//       }));
//       showSuccess(`${photoFiles.length} photos selected`);
//     } else if (field === 'site_video' && files.length > 0) {
//       setFormData(prev => ({
//         ...prev,
//         site_video: files[0]
//       }));
//       showSuccess('Video selected successfully');
//     } else if (field === 'documents') {
//       setFormData(prev => ({
//         ...prev,
//         uploaded_documents: [...prev.uploaded_documents, ...files.map(file => ({
//           name: file.name,
//           file: file,
//           upload_date: new Date().toISOString()
//         }))]
//       }));
//       showSuccess(`${files.length} documents added`);
//     }
//   }, [formData.site_photos.length, showSuccess]);

//   const removeFile = useCallback((field, index) => {
//     setFormData(prev => {
//       const newData = { ...prev };
//       if (field === 'site_photos') {
//         newData.site_photos = newData.site_photos.filter((_, i) => i !== index);
//       } else if (field === 'site_video') {
//         newData.site_video = null;
//       } else if (field === 'documents') {
//         newData.uploaded_documents = newData.uploaded_documents.filter((_, i) => i !== index);
//       }
//       return newData;
//     });
//     showSuccess('File removed');
//   }, [showSuccess]);

//   // Prepare files for submission
//   const prepareFilesForSubmission = useCallback(async () => {
//     const photosData = [];
//     const documentsData = [];
    
//     // Process photos
//     for (let i = 0; i < formData.site_photos.length; i++) {
//       const photo = formData.site_photos[i];
//       const base64 = await fileToBase64(photo);
//       photosData.push({
//         index: i,
//         file_name: `site_photo_${i + 1}.jpg`,
//         file_size: photo.size,
//         base64_data: base64,
//         uploaded_at: new Date().toISOString(),
//         description: `Site photo ${i + 1}`
//       });
//     }
    
//     // Process video
//     let videoData = null;
//     if (formData.site_video) {
//       const base64 = await fileToBase64(formData.site_video);
//       videoData = {
//         file_name: 'site_video.mp4',
//         file_size: formData.site_video.size,
//         base64_data: base64,
//         uploaded_at: new Date().toISOString(),
//         description: 'Site documentation video'
//       };
//     }
    
//     // Process documents
//     for (const doc of formData.uploaded_documents) {
//       documentsData.push({
//         name: doc.name,
//         file_path: URL.createObjectURL(doc.file),
//         upload_date: doc.upload_date,
//         file_type: getFileType(doc.name)
//       });
//     }
    
//     return { photosData, videoData, documentsData };
//   }, [formData.site_photos, formData.site_video, formData.uploaded_documents]);

//   const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => {
//         const base64 = reader.result.split(',')[1];
//         resolve(base64);
//       };
//       reader.onerror = error => reject(error);
//     });
//   };

//   const getFileType = (fileName) => {
//     const extension = fileName.split('.').pop().toLowerCase();
//     if (['jpg', 'jpeg', 'png', 'gif'].includes(extension)) return 'image';
//     if (['pdf'].includes(extension)) return 'pdf';
//     if (['doc', 'docx'].includes(extension)) return 'document';
//     return 'other';
//   };

//   // Fetch inspection data
//   // useEffect(() => {
//   //   const fetchInspection = async () => {
//   //     try {
//   //       const inspections = await getNewInspections();
//   //       const found = inspections.find(i => i.id === parseInt(id));
//   //       if (found) {
//   //         setInspection(found);
//   //         // Auto-load data from assigned inspection
//   //         setFormData(prev => ({
//   //           ...prev,
//   //           client_name: found.client_name || '',
//   //           industry_name: found.industry_name || '',
//   //           phone_number: found.phone_number || '',
//   //           ...found
//   //         }));
//   //       }
//   //     } catch (error) {
//   //       showError('Failed to fetch inspection details');
//   //       console.error('Error fetching inspection:', error);
//   //     }
//   //   };

//   //   if (id) fetchInspection();
//   // }, [id, showError]);
//   // CompleteInspectionForm.js - FIXED useEffect
// // CompleteInspectionForm.js - TEMPORARY FIX
//   useEffect(() => {
//     const fetchInspection = async () => {
//       try {
//         console.log('🔍 Fetching inspection for ID:', id);
        
//         // ✅ TEMPORARY FIX: Use existing functions
//         let foundInspection = null;
        
//         // Try NewInspections first (where your IDs exist)
//         try {
//           const newInspections = await getNewInspections();
//           foundInspection = newInspections.find(i => i.id === parseInt(id));
//           if (foundInspection) {
//             console.log('✅ Found in NewInspections:', foundInspection);
//             foundInspection.is_new_inspection = true; // Add flag
//           }
//         } catch (error) {
//           console.log('❌ NewInspections search failed:', error.message);
//         }
        
//         // If not found, try regular inspections
//         if (!foundInspection) {
//           try {
//             const allInspections = await getAllInspections();
//             foundInspection = allInspections.find(i => i.id === parseInt(id));
//             if (foundInspection) {
//               console.log('✅ Found in regular inspections:', foundInspection);
//               foundInspection.is_new_inspection = false; // Add flag
//             }
//           } catch (error) {
//             console.log('❌ Regular inspections search failed:', error.message);
//           }
//         }
        
//         // If not found, try admin endpoint
//         if (!foundInspection) {
//           try {
//             const response = await api.get(`/admin/inspections/${id}/`);
//             foundInspection = response.data;
//             foundInspection.is_new_inspection = false;
//             console.log('✅ Found via admin endpoint:', foundInspection);
//           } catch (error) {
//             console.log('❌ Admin endpoint failed:', error.message);
//           }
//         }
        
//         if (foundInspection) {
//           console.log('✅ Final found inspection:', foundInspection);
//           setInspection(foundInspection);
          
//           // Auto-load data from the inspection
//           setFormData(prev => ({
//             ...prev,
//             client_name: foundInspection.client_name || '',
//             industry_name: foundInspection.industry_name || '',
//             phone_number: foundInspection.phone_number || '',
//             branch_name: foundInspection.branch_name || '',
//             project: foundInspection.project || '',
//             status: foundInspection.status || 'pending',
//             ...foundInspection
//           }));
          
//         } else {
//           console.warn('⚠️ No inspection found with ID:', id);
//           showError(`Inspection ID ${id} not found. Available IDs: 6, 40, 39, 38, 2`);
//         }
        
//       } catch (error) {
//         console.error('❌ Error fetching inspection:', error);
//         showError(`Failed to fetch inspection: ${error.message}`);
//       }
//     };

//     if (id) {
//       fetchInspection();
//     }
//   }, [id, showError]);

//   // Form validation
//   const validateInspectionData = useCallback((data) => {
//     const errors = {};
    
//     // Required fields validation
//     const requiredFields = [
//       'client_name', 'industry_name', 'nature_of_business', 'legal_status',
//       'phone_number', 'account_number', 'trade_license', 'investment_category',
//       'owner_name', 'residential_address', 'permanent_address',
//       'purpose_investment', 'period_investment', 'facility_type'
//     ];
    
//     requiredFields.forEach(field => {
//       if (!data[field]?.toString().trim()) {
//         errors[field] = `${field.replace(/_/g, ' ')} is required`;
//       }
//     });

//     if (locationPoints.length === 0) {
//       errors.location = 'Location tracking data is required';
//     }
    
//     return Object.keys(errors).length === 0 ? true : errors;
//   }, [locationPoints.length]);

//   // Form Submission
//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setLoading(true);

//   //   try {
//   //     // Validate form data
//   //     const validationResult = validateInspectionData(formData);
//   //     if (validationResult !== true) {
//   //       showError('Please fill all required fields correctly.');
//   //       setLoading(false);
//   //       return;
//   //     }

//   //     // Stop location tracking if active
//   //     if (isLocationTracking) {
//   //       stopLocationTracking();
//   //     }

//   //     // Prepare files
//   //     const { photosData, videoData, documentsData } = await prepareFilesForSubmission();

//   //     // Get branch name
//   //     const branchName = localStorage.getItem('branch_name') || 'Web Branch';

//   //     // Prepare final data
//   //     const submissionData = {
//   //       branch_name: branchName,
//   //       location_points: locationPoints,
//   //       location_start_time: locationStartTime?.toISOString(),
//   //       location_end_time: locationEndTime?.toISOString(),
//   //       total_location_points: locationPoints.length,
//   //       ...formData,
//   //       site_photos: photosData,
//   //       site_video: videoData,
//   //       uploaded_documents: documentsData,
//   //       submitted_at: new Date().toISOString(),
//   //       status: 'completed'
//   //     };

//   //     // Use appropriate service method
//   //     let result;
//   //     if (id) {
//   //       result = await updateInspection(id, submissionData);
//   //     } else {
//   //       result = await createNewInspection(submissionData);
//   //     }
      
//   //     showSuccess(id ? 'Inspection updated successfully! ✅' : 'Inspection submitted successfully! ✅');
//   //     navigate('/inspector/dashboard');
      
//   //   } catch (error) {
//   //     console.error('❌ Submission failed:', error);
//   //     showError(`Failed to submit inspection: ${error.message}`);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   // CompleteInspectionForm.js - FIXED handleSubmit

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       // Validate form data
//       const validationResult = validateInspectionData(formData);
//       if (validationResult !== true) {
//         showError('Please fill all required fields correctly.');
//         setLoading(false);
//         return;
//       }

//       // Stop location tracking if active
//       if (isLocationTracking) {
//         stopLocationTracking();
//       }

//       // Prepare files
//       const { photosData, videoData, documentsData } = await prepareFilesForSubmission();

//       // Get branch name
//       const branchName = localStorage.getItem('branch_name') || 'Web Branch';

//       // Prepare final data
//       const submissionData = {
//         branch_name: branchName,
//         location_points: locationPoints,
//         location_start_time: locationStartTime?.toISOString(),
//         location_end_time: locationEndTime?.toISOString(),
//         total_location_points: locationPoints.length,
//         ...formData,
//         site_photos: photosData,
//         site_video: videoData,
//         uploaded_documents: documentsData,
//         submitted_at: new Date().toISOString(),
//         status: 'completed'
//       };

//       console.log('📤 Submitting data for inspection:', id);

//       let result;
      
//       // ✅ SMART SUBMISSION LOGIC
//       if (id && inspection) {
//         if (inspection.is_new_inspection) {
//           // This was a NewInspection - create a new full Inspection
//           console.log('🔄 Converting NewInspection to full Inspection');
          
//           // Remove ID to create new record
//           const { id: _, ...dataWithoutId } = submissionData;
//           result = await createNewInspection(dataWithoutId);
          
//           showSuccess('New inspection created successfully from assignment! ✅');
//         } else {
//           // This is a regular Inspection - update it
//           result = await updateInspection(id, submissionData);
//           showSuccess('Inspection updated successfully! ✅');
//         }
//       } else {
//         // Create brand new inspection
//         result = await createNewInspection(submissionData);
//         showSuccess('Inspection created successfully! ✅');
//       }
      
//       navigate('/inspector/dashboard');
      
//     } catch (error) {
//       console.error('❌ Submission failed:', error);
//       showError(`Failed to submit inspection: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Clear form function
//   const clearForm = useCallback(() => {
//     setFormData({
//       client_name: '',
//       group_name: '',
//       industry_name: '',
//       nature_of_business: '',
//       legal_status: '',
//       date_of_establishment: '',
//       office_address: '',
//       showroom_address: '',
//       factory_address: '',
//       phone_number: '',
//       account_number: '',
//       account_id: '',
//       tin_number: '',
//       date_of_opening: '',
//       vat_reg_number: '',
//       first_investment_date: '',
//       sector_code: '',
//       trade_license: '',
//       economic_purpose_code: '',
//       investment_category: '',
//       owner_name: '',
//       owner_age: '',
//       father_name: '',
//       mother_name: '',
//       spouse_name: '',
//       academic_qualification: '',
//       children_info: '',
//       business_successor: '',
//       residential_address: '',
//       permanent_address: '',
//       partners_directors: [{ name: '', age: '', qualification: '', share: '', status: '', relationship: '' }],
//       purpose_investment: '',
//       purpose_bank_guarantee: '',
//       period_investment: '',
//       facility_type: '',
//       existing_limit: '',
//       applied_limit: '',
//       recommended_limit: '',
//       bank_percentage: '',
//       client_percentage: '',
//       outstanding_type: '',
//       limit_amount: '',
//       net_outstanding: '',
//       gross_outstanding: '',
//       market_situation: '',
//       client_position: '',
//       competitors: Array(5).fill().map(() => ({ name: '', address: '', market_share: '' })),
//       business_reputation: '',
//       production_type: '',
//       product_name: '',
//       production_capacity: '',
//       actual_production: '',
//       profitability_observation: '',
//       male_officer: '',
//       female_officer: '',
//       skilled_officer: '',
//       unskilled_officer: '',
//       male_worker: '',
//       female_worker: '',
//       skilled_worker: '',
//       unskilled_worker: '',
//       key_employees: [{ name: '', designation: '', age: '', qualification: '', experience: '' }],
//       cash_balance: '',
//       stock_trade_finished: '',
//       stock_trade_financial: '',
//       accounts_receivable: '',
//       advance_deposit: '',
//       other_current_assets: '',
//       land_building: '',
//       plant_machinery: '',
//       other_assets: '',
//       ibbl_investment: '',
//       other_banks_investment: '',
//       borrowing_sources: '',
//       accounts_payable: '',
//       other_current_liabilities: '',
//       long_term_liabilities: '',
//       other_non_current_liabilities: '',
//       paid_up_capital: '',
//       retained_earning: '',
//       resources: '',
//       current_assets_subtotal: 0,
//       fixed_assets_subtotal: 0,
//       total_assets: 0,
//       current_liabilities_subtotal: 0,
//       total_liabilities: 0,
//       total_equity: 0,
//       grand_total: 0,
//       net_worth: 0,
//       working_capital_items: [
//         { name: 'Raw Materials (imported)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
//         { name: 'Raw Materials (Local)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
//         { name: 'Work in Process', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
//         { name: 'Finished goods', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' }
//       ],
//       godown_location: '',
//       godown_capacity: '',
//       godown_space: '',
//       godown_nature: '',
//       godown_owner: '',
//       distance_from_branch: '',
//       items_to_store: '',
//       warehouse_license: false,
//       godown_guard: false,
//       damp_proof: false,
//       easy_access: false,
//       letter_disclaimer: false,
//       insurance_policy: false,
//       godown_hired: false,
//       checklist_items: {
//         'Business establishment physically verified': null,
//         'Honesty and integrity ascertained': null,
//         'Confidential Report obtained': null,
//         'CIB report obtained': null,
//         'Items permissible by Islamic Shariah': null,
//         'Items not restricted by Bangladesh Bank': null,
//         'Items permissible by Investment Policy': null,
//         'Market Price verified': null,
//         'Constant market demand': null,
//         'F-167 A duly filled': null,
//         'F-167 B property filled': null,
//         'Application particulars verified': null,
//         'IRC, ERC, VAT copies enclosed': null,
//         'TIN Certificate enclosed': null,
//         'Rental Agreement enclosed': null,
//         'Trade License enclosed': null,
//         'Partnership Deed enclosed': null,
//         'Memorandum & Articles enclosed': null,
//         'Board resolution enclosed': null,
//         'Directors particulars enclosed': null,
//         'Current Account Statement enclosed': null,
//         'Creditors/Debtors list enclosed': null,
//         'IRC form with documents enclosed': null,
//         'Audited Balance sheet enclosed': null,
//       },
//       site_photos: [],
//       site_video: null,
//       uploaded_documents: [],
//       status: INSPECTION_STATUS.IN_PROGRESS
//     });

//     // Reset location data
//     setIsLocationTracking(false);
//     setLocationPoints([]);
//     setLocationStartTime(null);
//     setLocationEndTime(null);
//     if (locationIntervalId) {
//       clearInterval(locationIntervalId);
//       setLocationIntervalId(null);
//     }

//     showSuccess('Form cleared successfully');
//   }, [locationIntervalId, showSuccess]);

//   // UI Helper functions
//   const renderTextField = useCallback((label, name, type = 'text', required = false, rows = 1, customOnChange = null) => (
//     <div>
//       <label className="block text-sm font-medium text-gray-700">
//         {label} {required && <span className="text-red-500">*</span>}
//       </label>
//       {rows > 1 ? (
//         <textarea
//           name={name}
//           value={formData[name]}
//           onChange={customOnChange || handleChange}
//           rows={rows}
//           required={required}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//         />
//       ) : (
//         <input
//           type={type}
//           name={name}
//           value={formData[name]}
//           onChange={customOnChange || handleChange}
//           required={required}
//           className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
//         />
//       )}
//     </div>
//   ), [formData, handleChange]);

//   const renderDropdown = useCallback((label, name, options, required = false) => (
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
//   ), [formData, handleChange]);

//   const renderRadioGroup = useCallback((label, name, options) => (
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
//   ), [formData, handleChange]);

//   const renderCheckbox = useCallback((label, name) => (
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
//   ), [formData, handleChange]);

//   // Section navigation
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

//   if (!inspection && id) {
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
//           <h1 className="text-3xl font-bold text-gray-900">
//             {id ? 'Edit Inspection' : 'Create New Inspection'}
//           </h1>
//           {inspection && (
//             <p className="mt-2 text-sm text-gray-600">
//               Project: {inspection.project} | Client: {inspection.client_name} | Industry: {inspection.industry_name}
//             </p>
//           )}
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
//                   {isLocationTracking ? '📍' : '📌'}
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
//                     {renderTextField('1. Cash & Bank Balance', 'cash_balance', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('Stock in trade & investment/finished goods', 'stock_trade_finished', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('2. Stock in trade & investment/financial goods', 'stock_trade_financial', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('3. Accounts receivable (Sundry Debtors)', 'accounts_receivable', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('4. Advance Deposit & Pre-payment', 'advance_deposit', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('5. Other current assets', 'other_current_assets', 'number', false, 1, handleFinancialFieldChange)}
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
//                     {renderTextField('6. Land, Building & other immovable assets', 'land_building', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('7. Plant, Machinery & furniture & fixture', 'plant_machinery', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('8. Other assets', 'other_assets', 'number', false, 1, handleFinancialFieldChange)}
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
//                         {renderTextField('a) IBBL', 'ibbl_investment', 'number', false, 1, handleFinancialFieldChange)}
//                         {renderTextField('b) Others', 'other_banks_investment', 'number', false, 1, handleFinancialFieldChange)}
//                       </div>
//                     </div>
//                     {renderTextField('2. Borrowing from other sources', 'borrowing_sources', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('3. Accounts Payable (Sundry Creditors)', 'accounts_payable', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('4. Others', 'other_current_liabilities', 'number', false, 1, handleFinancialFieldChange)}
//                   </div>
//                   <div className="mt-4 p-3 bg-gray-50 rounded border">
//                     <div className="flex justify-between">
//                       <span className="font-medium text-sm">Sub-Total (a):</span>
//                       <span className="font-bold">Tk. {formData.current_liabilities_subtotal.toFixed(2)}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Long Term Liability */}
//                 {renderTextField('Long Term Liability', 'long_term_liabilities', 'number', false, 1, handleFinancialFieldChange)}

//                 {/* Other non-current liabilities */}
//                 {renderTextField('Other non-current liabilities', 'other_non_current_liabilities', 'number', false, 1, handleFinancialFieldChange)}

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
//                     {renderTextField('d. Paid up capital / owner\'s Capital Balance as per last account', 'paid_up_capital', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('e. Resources', 'resources', 'number', false, 1, handleFinancialFieldChange)}
//                     {renderTextField('I. Retained Earning / Net Profit for the year transferred to Balance Sheet', 'retained_earning', 'number', false, 1, handleFinancialFieldChange)}
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
                  
//                   {/* Photo Grid */}
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
//                     {formData.site_photos.map((photo, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={URL.createObjectURL(photo)}
//                           alt={`Site photo ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeFile('site_photos', index)}
//                           className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                     {formData.site_photos.length < 10 && (
//                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                           </svg>
//                           <p className="text-sm text-gray-500">Add Photo</p>
//                         </div>
//                         <input
//                           type="file"
//                           multiple
//                           accept="image/*"
//                           onChange={(e) => handleFileUpload(e, 'site_photos')}
//                           className="hidden"
//                         />
//                       </label>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500">{formData.site_photos.length}/10 photos</p>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Site Video (Short documentation)</h3>
//                   <p className="text-sm text-gray-600 mb-4">Upload a short video (max 2 minutes) showing the business operations and premises</p>
                  
//                   {formData.site_video ? (
//                     <div className="relative">
//                       <video
//                         src={URL.createObjectURL(formData.site_video)}
//                         controls
//                         className="w-full rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeFile('site_video', 0)}
//                         className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
//                       >
//                         Remove Video
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="text-sm text-gray-500">Upload Video</p>
//                         <p className="text-xs text-gray-400">MP4, MOV up to 100MB</p>
//                       </div>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={(e) => handleFileUpload(e, 'site_video')}
//                         className="hidden"
//                       />
//                     </label>
//                   )}
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

//                 <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 bg-blue-50">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg className="w-12 h-12 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <p className="text-lg font-medium text-blue-600">Click to Upload Documents</p>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Supported formats: PDF, DOC, DOCX, JPG, PNG<br />
//                       Maximum file size: 10MB per file
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     multiple
//                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                     onChange={(e) => handleFileUpload(e, 'documents')}
//                     className="hidden"
//                   />
//                 </label>

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
//                             onClick={() => removeFile('documents', index)}
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
//             <div className="flex space-x-3">
//               <button
//                 type="button"
//                 onClick={() => navigate('/inspector/dashboard')}
//                 className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//               >
//                 Cancel
//               </button>
//               {!id && (
//                 <button
//                   type="button"
//                   onClick={clearForm}
//                   className="inline-flex justify-center py-2 px-4 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//                 >
//                   Clear Form
//                 </button>
//               )}
//             </div>
            
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
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       {id ? 'Updating...' : 'Submitting...'}
//                     </>
//                   ) : (
//                     id ? 'Update Inspection' : 'Submit Complete Form'
//                   )}
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

// export default CompleteInspectionForm;



















































/////////////


// // src/components/inspector/InspectionForm.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getNewInspections, updateInspection,getAllInspections  } from '../../services/inspectionService';
// import { useNotification } from '../../context/NotificationContext';
// import { INSPECTION_STATUS } from '../../utils/constants';
// import api from '../../services/api'; 
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





























// // src/components/inspector/InspectionForm.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getNewInspections, updateInspection, getAllInspections, createNewInspection } from '../../services/inspectionService';
// import { useNotification } from '../../context/NotificationContext';
// import { INSPECTION_STATUS } from '../../utils/constants';
// import api from '../../services/api'; 

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
//   const [locationIntervalId, setLocationIntervalId] = useState(null);

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
    
//     status: INSPECTION_STATUS.IN_PROGRESS,
//     branch_name: ''
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

//   // FIXED: fetchInspection function
//   useEffect(() => {
//     const fetchInspection = async () => {
//       try {
//         console.log('🔍 Fetching inspection for ID:', id);
        
//         // Check if it's "create" mode for new inspection
//         if (id === 'create') {
//           console.log('📝 Creating new inspection form');
//           // Set empty inspection for new form
//           setInspection({
//             project: 'New Inspection',
//             client_name: '',
//             industry_name: '',
//             branch_name: localStorage.getItem('branch_name') || 'Web Branch'
//           });
//           return;
//         }
        
//         let foundInspection = null;
        
//         // Try NewInspections first (where your IDs exist)
//         try {
//           const newInspections = await getNewInspections();
//           foundInspection = newInspections.find(i => i.id === parseInt(id));
//           if (foundInspection) {
//             console.log('✅ Found in NewInspections:', foundInspection);
//           }
//         } catch (error) {
//           console.log('⚠️ NewInspections search failed:', error.message);
//         }
        
//         // If not found, try regular inspections
//         if (!foundInspection) {
//           try {
//             const allInspections = await getAllInspections();
//             foundInspection = allInspections.find(i => i.id === parseInt(id));
//             if (foundInspection) {
//               console.log('✅ Found in regular inspections:', foundInspection);
//             }
//           } catch (error) {
//             console.log('⚠️ Regular inspections search failed:', error.message);
//           }
//         }
        
//         // If still not found, try direct API call
//         if (!foundInspection) {
//           try {
//             console.log('🔄 Trying direct API call...');
//             // Try multiple endpoint variations
//             const endpoints = [
//               `/inspections/${id}/`,
//               `/api/inspections/${id}/`,
//               `/admin/inspections/${id}/`
//             ];
            
//             for (const endpoint of endpoints) {
//               try {
//                 const response = await api.get(endpoint);
//                 if (response.data) {
//                   foundInspection = response.data;
//                   console.log(`✅ Found via ${endpoint}:`, foundInspection);
//                   break;
//                 }
//               } catch (error) {
//                 console.log(`❌ ${endpoint} failed:`, error.message);
//               }
//             }
//           } catch (error) {
//             console.log('❌ API call failed:', error.message);
//           }
//         }
        
//         if (foundInspection) {
//           console.log('✅ Final found inspection:', foundInspection);
//           setInspection(foundInspection);
          
//           // Auto-load data from the inspection
//           setFormData(prev => ({
//             ...prev,
//             client_name: foundInspection.client_name || '',
//             industry_name: foundInspection.industry_name || '',
//             phone_number: foundInspection.phone_number || '',
//             branch_name: foundInspection.branch_name || '',
//             project: foundInspection.project || '',
//             status: foundInspection.status || 'pending',
//             // Load more fields if available
//             ...foundInspection
//           }));
          
//         } else {
//           console.warn('⚠️ No inspection found with ID:', id);
//           showError(`Inspection ID ${id} not found`);
//         }
        
//       } catch (error) {
//         console.error('❌ Error in fetchInspection:', error);
//         showError(`Failed to fetch inspection: ${error.message}`);
//       }
//     };

//     if (id) {
//       fetchInspection();
//     }
//   }, [id, showError]);

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

//   // FIXED: Validation function with location tracking
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
    
//     // Validate location tracking - IMPORTANT
//     if (locationPoints.length === 0) {
//       errors.location = 'Location tracking data is required. Please start location tracking before submitting.';
//     }
    
//     // Validate checklist items
//     const requiredChecklistItems = Object.keys(data.checklist_items).slice(0, 10);
//     const missingChecklist = requiredChecklistItems.filter(key => 
//       data.checklist_items[key] === null || data.checklist_items[key] === undefined
//     );
    
//     if (missingChecklist.length > 0) {
//       errors.checklist = 'All critical checklist items must be completed';
//     }
    
//     return Object.keys(errors).length === 0 ? true : errors;
//   };

//   // FIXED: handleSubmit function
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       console.log('🔄 Starting form submission...');
//       console.log('Inspection ID:', id);
      
//       // Validate form data first
//       const validationResult = validateInspectionData(formData);
//       if (validationResult !== true) {
//         console.log('❌ Validation errors:', validationResult);
//         showError('Please fill all required fields correctly. Check the form for errors.');
//         setLoading(false);
//         return;
//       }

//       // Stop location tracking if active
//       if (isLocationTracking) {
//         stopLocationTracking();
//       }

//       // Get branch name from localStorage or use default
//       const branchName = localStorage.getItem('branch_name') || 'Web Branch';

//       // Prepare final data with location information
//       const submissionData = {
//         ...formData,
//         branch_name: branchName,
//         location_points: locationPoints,
//         location_start_time: locationStartTime?.toISOString(),
//         location_end_time: locationEndTime?.toISOString(),
//         total_location_points: locationPoints.length,
//         submitted_at: new Date().toISOString(),
//         status: 'completed'
//       };

//       console.log('📤 Sending to API...', submissionData);
      
//       let result;
//       if (id === 'create') {
//         // Create new inspection
//         console.log('📝 Creating new inspection...');
//         result = await createNewInspection(submissionData);
//         console.log('✅ New inspection created:', result);
//         showSuccess('New inspection created successfully! ✅');
//       } else {
//         // Update existing inspection
//         console.log('🔄 Updating existing inspection...');
//         result = await updateInspection(id, submissionData);
//         console.log('✅ Inspection updated:', result);
//         showSuccess('Inspection submitted successfully! ✅');
//       }
      
//       navigate('/inspector/dashboard');
      
//     } catch (error) {
//       console.error('❌ Submission failed:', error);
//       showError(`Failed to submit inspection: ${error.message || 'Please try again'}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // File upload handlers
//   const handlePhotoUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const photoFiles = files.slice(0, 10 - formData.site_photos.length);
    
//     setFormData(prev => ({
//       ...prev,
//       site_photos: [...prev.site_photos, ...photoFiles.map(file => ({
//         name: file.name,
//         size: file.size,
//         type: file.type,
//         preview: URL.createObjectURL(file),
//         file: file
//       }))]
//     }));
    
//     showSuccess(`${photoFiles.length} photos added`);
//   };

//   const handleVideoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData(prev => ({
//         ...prev,
//         site_video: {
//           name: file.name,
//           size: file.size,
//           type: file.type,
//           preview: URL.createObjectURL(file),
//           file: file
//         }
//       }));
//       showSuccess('Video added successfully');
//     }
//   };

//   const handleDocumentUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newDocuments = files.map(file => ({
//       name: file.name,
//       file: file,
//       upload_date: new Date().toISOString(),
//       size: file.size,
//       type: file.type
//     }));
    
//     setFormData(prev => ({
//       ...prev,
//       uploaded_documents: [...prev.uploaded_documents, ...newDocuments]
//     }));
    
//     showSuccess(`${files.length} documents added`);
//   };

//   const removeFile = (type, index) => {
//     if (type === 'photo') {
//       setFormData(prev => ({
//         ...prev,
//         site_photos: prev.site_photos.filter((_, i) => i !== index)
//       }));
//       showSuccess('Photo removed');
//     } else if (type === 'video') {
//       setFormData(prev => ({
//         ...prev,
//         site_video: null
//       }));
//       showSuccess('Video removed');
//     } else if (type === 'document') {
//       setFormData(prev => ({
//         ...prev,
//         uploaded_documents: prev.uploaded_documents.filter((_, i) => i !== index)
//       }));
//       showSuccess('Document removed');
//     }
//   };

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

//   // FIXED: Loading condition
//   if (!inspection && id !== 'create') {
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
//           <h1 className="text-3xl font-bold text-gray-900">
//             {id === 'create' ? 'Create New Inspection' : 'Edit Inspection'}
//           </h1>
//           {inspection && (
//             <p className="mt-2 text-sm text-gray-600">
//               {inspection.project ? `Project: ${inspection.project}` : 'New Inspection'} | 
//               {inspection.client_name ? ` Client: ${inspection.client_name}` : ''} | 
//               {inspection.industry_name ? ` Industry: ${inspection.industry_name}` : ''}
//             </p>
//           )}
//         </div>

//         {/* Location Tracking Section */}
//         <div className="bg-white shadow rounded-lg p-6 mb-6">
//           <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Tracking (Required)</h2>
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

//             {locationPoints.length === 0 && (
//               <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
//                 <div className="flex items-center">
//                   <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
//                   </svg>
//                   <p className="text-sm text-yellow-800">
//                     <strong>Important:</strong> Location tracking is required. Please start location tracking before submitting the form.
//                   </p>
//                 </div>
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
//           {/* Sections A-M remain the same as your code */}
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

//           {/* Sections B-M continue with your existing code... */}
//           {/* For brevity, I'm showing only Section A. The rest of the sections (B-M) remain exactly as in your code */}
          
//           {/* Section L: Site Photos & Video - UPDATED for file upload */}
//           {activeSection === 'L' && (
//             <div className="bg-white shadow rounded-lg p-6">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6">Section L: Site Photos & Video Documentation</h2>
//               <div className="space-y-8">
//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Site Photos (up to 10 images)</h3>
//                   <p className="text-sm text-gray-600 mb-4">Upload clear photos of the business site, premises, and operations</p>
                  
//                   {/* Photo Grid */}
//                   <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
//                     {formData.site_photos.map((photo, index) => (
//                       <div key={index} className="relative group">
//                         <img
//                           src={photo.preview}
//                           alt={`Site photo ${index + 1}`}
//                           className="w-full h-32 object-cover rounded-lg"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeFile('photo', index)}
//                           className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           ×
//                         </button>
//                       </div>
//                     ))}
//                     {formData.site_photos.length < 10 && (
//                       <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
//                         <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                           <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
//                           </svg>
//                           <p className="text-sm text-gray-500">Add Photo</p>
//                         </div>
//                         <input
//                           type="file"
//                           multiple
//                           accept="image/*"
//                           onChange={handlePhotoUpload}
//                           className="hidden"
//                         />
//                       </label>
//                     )}
//                   </div>
//                   <p className="text-sm text-gray-500">{formData.site_photos.length}/10 photos</p>
//                 </div>

//                 <div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-4">Site Video (Short documentation)</h3>
//                   <p className="text-sm text-gray-600 mb-4">Upload a short video (max 2 minutes) showing the business operations and premises</p>
                  
//                   {formData.site_video ? (
//                     <div className="relative">
//                       <video
//                         src={formData.site_video.preview}
//                         controls
//                         className="w-full rounded-lg"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeFile('video', 0)}
//                         className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-2"
//                       >
//                         Remove Video
//                       </button>
//                     </div>
//                   ) : (
//                     <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400">
//                       <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                         <svg className="w-8 h-8 mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
//                         </svg>
//                         <p className="text-sm text-gray-500">Upload Video</p>
//                         <p className="text-xs text-gray-400">MP4, MOV up to 100MB</p>
//                       </div>
//                       <input
//                         type="file"
//                         accept="video/*"
//                         onChange={handleVideoUpload}
//                         className="hidden"
//                       />
//                     </label>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Section M: Documents Upload - UPDATED */}
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

//                 <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 bg-blue-50">
//                   <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg className="w-12 h-12 mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
//                     </svg>
//                     <p className="text-lg font-medium text-blue-600">Click to Upload Documents</p>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Supported formats: PDF, DOC, DOCX, JPG, PNG<br />
//                       Maximum file size: 10MB per file
//                     </p>
//                   </div>
//                   <input
//                     type="file"
//                     multiple
//                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                     onChange={handleDocumentUpload}
//                     className="hidden"
//                   />
//                 </label>

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
//                               <p className="text-sm text-gray-500">Size: {(doc.size / 1024 / 1024).toFixed(2)} MB</p>
//                             </div>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeFile('document', index)}
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
//                   {loading ? (
//                     <>
//                       <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
//                         <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                         <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                       </svg>
//                       {id === 'create' ? 'Creating...' : 'Submitting...'}
//                     </>
//                   ) : (
//                     id === 'create' ? 'Create Inspection' : 'Submit Inspection'
//                   )}
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



































// src/components/inspector/InspectionForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getNewInspections, updateInspection, getAllInspections, createNewInspection } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';
import { INSPECTION_STATUS } from '../../utils/constants';
import api from '../../services/api'; 

const InspectionForm = () => {
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

  // Form Data State - Django models এর সাথে compatible
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
    
    // Auto-calculated financial values (Django তে নেই, frontend এ calculate করব)
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
    
    // Required fields for Django
    status: INSPECTION_STATUS.IN_PROGRESS,
    branch_name: '',
    inspector: localStorage.getItem('user_id') || 1, // Current user ID
    project: ''
  });

  // Dropdown options
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
























useEffect(() => {
  const fetchInspection = async () => {
    try {
      console.log('🔍 [FETCH INSPECTION] Starting fetch for ID:', id);
      
      // Check if it's "create" mode for new inspection
      if (id === 'create') {
        console.log('📝 [CREATE MODE] Creating new inspection form');
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        setInspection({
          project: 'New Inspection',
          client_name: '',
          industry_name: '',
          branch_name: user.branch_name || 'Web Branch',
          inspector: user.id
        });
        setFormData(prev => ({
          ...prev,
          branch_name: user.branch_name || 'Web Branch',
          inspector: user.id,
          status: 'pending' // Default status
        }));
        return;
      }
      
      let foundInspection = null;
      
      console.log('🔄 [SEARCH STRATEGY] Looking for inspection ID:', id);
      
      // 🔥 **STRATEGY 1: Use Universal Endpoint First**
      try {
        console.log('🎯 [STRATEGY 1] Trying universal endpoint...');
        const universalResponse = await api.get(`/inspections/universal/${id}/`);
        if (universalResponse.data) {
          foundInspection = universalResponse.data;
          console.log('✅ [UNIVERSAL] Found inspection:', {
            id: foundInspection.id,
            client: foundInspection.client_name,
            type: foundInspection.is_new_inspection ? 'NewInspection' : 'Inspection',
            status: foundInspection.status
          });
        }
      } catch (universalError) {
        console.log('⚠️ [UNIVERSAL] Not found, trying other methods...');
      }
      
      // 🔥 **STRATEGY 2: Try NewInspections**
      if (!foundInspection) {
        try {
          console.log('🎯 [STRATEGY 2] Checking NewInspections...');
          const newInspections = await getNewInspections();
          foundInspection = newInspections.find(i => i.id === parseInt(id));
          if (foundInspection) {
            console.log('✅ [NEW INSPECTIONS] Found:', {
              id: foundInspection.id,
              client: foundInspection.client_name,
              status: foundInspection.status
            });
            // Mark as NewInspection
            foundInspection.is_new_inspection = true;
          }
        } catch (error) {
          console.log('⚠️ [NEW INSPECTIONS] Search failed:', error.message);
        }
      }
      
      // 🔥 **STRATEGY 3: Try Regular Inspections**
      if (!foundInspection) {
        try {
          console.log('🎯 [STRATEGY 3] Checking regular inspections...');
          const allInspections = await getAllInspections();
          foundInspection = allInspections.find(i => i.id === parseInt(id));
          if (foundInspection) {
            console.log('✅ [REGULAR] Found:', {
              id: foundInspection.id,
              client: foundInspection.client_name,
              status: foundInspection.status
            });
            foundInspection.is_new_inspection = false;
          }
        } catch (error) {
          console.log('⚠️ [REGULAR] Search failed:', error.message);
        }
      }
      
      // 🔥 **STRATEGY 4: Try Direct API Call**
      if (!foundInspection) {
        try {
          console.log('🎯 [STRATEGY 4] Trying direct API calls...');
          // Try NewInspection endpoint
          try {
            const newInspectionResponse = await api.get(`/new-inspections/${id}/`);
            if (newInspectionResponse.data) {
              foundInspection = newInspectionResponse.data;
              foundInspection.is_new_inspection = true;
              console.log('✅ [DIRECT NEW] Found via direct API');
            }
          } catch (newError) {
            // Try regular inspection endpoint
            try {
              const inspectionResponse = await api.get(`/inspections/${id}/`);
              if (inspectionResponse.data) {
                foundInspection = inspectionResponse.data;
                foundInspection.is_new_inspection = false;
                console.log('✅ [DIRECT REGULAR] Found via direct API');
              }
            } catch (regError) {
              console.log('❌ [DIRECT] Both direct calls failed');
            }
          }
        } catch (error) {
          console.log('⚠️ [DIRECT] All direct calls failed:', error.message);
        }
      }
      
      if (foundInspection) {
        console.log('🎯 [SUCCESS] Final found inspection:', {
          id: foundInspection.id,
          client: foundInspection.client_name,
          type: foundInspection.is_new_inspection ? 'NewInspection' : 'Inspection',
          status: foundInspection.status,
          branch: foundInspection.branch_name
        });
        
        setInspection(foundInspection);
        
        // 🔥 **PROPERLY LOAD DATA WITH TYPE HANDLING**
        setFormData(prev => {
          // Base data loading
          const updatedData = {
            ...prev,
            // Core fields
            client_name: foundInspection.client_name || '',
            industry_name: foundInspection.industry_name || '',
            phone_number: foundInspection.phone_number || '',
            branch_name: foundInspection.branch_name || '',
            project: foundInspection.project || '',
            status: foundInspection.status || 'pending',
            inspector: foundInspection.inspector || foundInspection.assigned_inspector || localStorage.getItem('user_id'),
            
            // Handle NewInspection specific fields
            ...(foundInspection.is_new_inspection ? {
              assigned_inspector: foundInspection.assigned_inspector,
            } : {}),
            
            // JSON fields with safe parsing
            partners_directors: Array.isArray(foundInspection.partners_directors) 
              ? foundInspection.partners_directors 
              : (typeof foundInspection.partners_directors === 'string' 
                ? JSON.parse(foundInspection.partners_directors || '[]') 
                : [{ name: '', age: '', qualification: '', share: '', status: '', relationship: '' }]),
            
            competitors: Array.isArray(foundInspection.competitors) 
              ? foundInspection.competitors 
              : (typeof foundInspection.competitors === 'string'
                ? JSON.parse(foundInspection.competitors || '[]')
                : Array(5).fill().map(() => ({ name: '', address: '', market_share: '' }))),
            
            key_employees: Array.isArray(foundInspection.key_employees) 
              ? foundInspection.key_employees 
              : (typeof foundInspection.key_employees === 'string'
                ? JSON.parse(foundInspection.key_employees || '[]')
                : [{ name: '', designation: '', age: '', qualification: '', experience: '' }]),
            
            working_capital_items: Array.isArray(foundInspection.working_capital_items) 
              ? foundInspection.working_capital_items 
              : (typeof foundInspection.working_capital_items === 'string'
                ? JSON.parse(foundInspection.working_capital_items || '[]')
                : [
                  { name: 'Raw Materials (imported)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
                  { name: 'Raw Materials (Local)', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
                  { name: 'Work in Process', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' },
                  { name: 'Finished goods', unit: '', rate: '', amount: '', tied_up_days: '', amount_dxe: '' }
                ]),
            
            checklist_items: typeof foundInspection.checklist_items === 'object' && foundInspection.checklist_items !== null
              ? foundInspection.checklist_items
              : (typeof foundInspection.checklist_items === 'string'
                ? JSON.parse(foundInspection.checklist_items || '{}')
                : {
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
                }),
            
            // Media fields
            site_photos: Array.isArray(foundInspection.site_photos) 
              ? foundInspection.site_photos 
              : [],
            
            site_video: foundInspection.site_video || null,
            
            uploaded_documents: Array.isArray(foundInspection.uploaded_documents) 
              ? foundInspection.uploaded_documents 
              : [],
            
            // Load all other fields (excluding special ones)
            ...Object.keys(foundInspection).reduce((acc, key) => {
              if (!['id', 'created_at', 'updated_at', 'inspector', 'assigned_inspector', 
                    'partners_directors', 'competitors', 'key_employees', 
                    'working_capital_items', 'checklist_items', 
                    'site_photos', 'site_video', 'uploaded_documents'].includes(key)) {
                acc[key] = foundInspection[key] || '';
              }
              return acc;
            }, {})
          };
          
          // Calculate financials after loading data
          calculateFinancialsWithData(updatedData);
          
          console.log('📊 [DATA LOADED] Form data loaded successfully');
          return updatedData;
        });
        
        // Load location data if exists
        if (foundInspection.location_points) {
          setLocationPoints(Array.isArray(foundInspection.location_points) 
            ? foundInspection.location_points 
            : JSON.parse(foundInspection.location_points || '[]'));
        }
        if (foundInspection.location_start_time) {
          setLocationStartTime(new Date(foundInspection.location_start_time));
        }
        if (foundInspection.location_end_time) {
          setLocationEndTime(new Date(foundInspection.location_end_time));
        }
        
      } else {
        console.warn('❌ [NOT FOUND] No inspection found with ID:', id);
        showError(`Inspection ID ${id} not found in the system`);
        navigate('/inspector/dashboard');
      }
      
    } catch (error) {
      console.error('❌ [FETCH ERROR] Error in fetchInspection:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      showError(`Failed to fetch inspection: ${error.message}`);
      navigate('/inspector/dashboard');
    }
  };

  if (id) {
    fetchInspection();
  }
}, [id, showError, navigate]);























  
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle nested object changes
  const handleNestedChange = (section, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  // Handle checklist changes
  const handleChecklistChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      checklist_items: {
        ...prev.checklist_items,
        [key]: value
      }
    }));
  };

  // Handle working capital item changes
  const handleWorkingCapitalChange = (index, field, value) => {
    setFormData(prev => {
      const updatedItems = prev.working_capital_items.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      );
      
      // Auto-calculate amount and amount_dxe
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
  };

  // Financial calculation function
  const calculateFinancialsWithData = (data) => {
    const parseValue = (value) => parseFloat(value) || 0;

    // Current Assets
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
  };

  // Calculate financials when relevant fields change
  useEffect(() => {
    const updatedData = calculateFinancialsWithData(formData);
    // Only update if values changed
    if (JSON.stringify(updatedData) !== JSON.stringify(formData)) {
      setFormData(updatedData);
    }
  }, [
    formData.cash_balance, formData.stock_trade_finished, formData.stock_trade_financial,
    formData.accounts_receivable, formData.advance_deposit, formData.other_current_assets,
    formData.land_building, formData.plant_machinery, formData.other_assets,
    formData.ibbl_investment, formData.other_banks_investment, formData.borrowing_sources,
    formData.accounts_payable, formData.other_current_liabilities, formData.long_term_liabilities,
    formData.other_non_current_liabilities, formData.paid_up_capital, formData.retained_earning,
    formData.resources
  ]);

  // Add/Remove dynamic items
  const addPartner = () => {
    setFormData(prev => ({
      ...prev,
      partners_directors: [...prev.partners_directors, { name: '', age: '', qualification: '', share: '', status: '', relationship: '' }]
    }));
  };

  const removePartner = (index) => {
    setFormData(prev => ({
      ...prev,
      partners_directors: prev.partners_directors.filter((_, i) => i !== index)
    }));
  };

  const addEmployee = () => {
    setFormData(prev => ({
      ...prev,
      key_employees: [...prev.key_employees, { name: '', designation: '', age: '', qualification: '', experience: '' }]
    }));
  };

  const removeEmployee = (index) => {
    setFormData(prev => ({
      ...prev,
      key_employees: prev.key_employees.filter((_, i) => i !== index)
    }));
  };

  // Location Tracking Functions
  const startLocationTracking = () => {
    if (!navigator.geolocation) {
      showError('Geolocation is not supported by this browser.');
      return;
    }

    setIsLocationTracking(true);
    setLocationStartTime(new Date());
    setLocationPoints([]);
    
    // Get initial location
    getCurrentLocation();
    
    // Set up periodic location updates (every 5 minutes)
    const intervalId = setInterval(getCurrentLocation, 5 * 60 * 1000);
    
    // Store interval ID for cleanup
    setLocationIntervalId(intervalId);
    
    showSuccess('Location tracking started successfully!');
  };

  const stopLocationTracking = () => {
    setIsLocationTracking(false);
    setLocationEndTime(new Date());
    
    // Clear interval
    if (locationIntervalId) {
      clearInterval(locationIntervalId);
      setLocationIntervalId(null);
    }
    
    showSuccess(`Location tracking stopped. ${locationPoints.length} points captured.`);
  };

  const getCurrentLocation = () => {
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
        console.log('📍 Location captured:', position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        console.error('Error getting location:', error);
        showError(`Error getting location: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
    );
  };

  // File upload handlers
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const photoFiles = files.slice(0, 10 - formData.site_photos.length);
    
    const photoPromises = photoFiles.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            base64_data: reader.result.split(',')[1],
            description: `Site photo - ${file.name}`
          });
        };
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(photoPromises).then(photos => {
      setFormData(prev => ({
        ...prev,
        site_photos: [...prev.site_photos, ...photos]
      }));
      showSuccess(`${photos.length} photos added`);
    });
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          site_video: {
            name: file.name,
            size: file.size,
            type: file.type,
            base64_data: reader.result.split(',')[1],
            description: 'Site documentation video'
          }
        }));
        showSuccess('Video added successfully');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    
    const docPromises = files.map(file => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            size: file.size,
            type: file.type,
            base64_data: reader.result.split(',')[1],
            description: `Supporting document - ${file.name}`,
            upload_date: new Date().toISOString()
          });
        };
        reader.readAsDataURL(file);
      });
    });
    
    Promise.all(docPromises).then(documents => {
      setFormData(prev => ({
        ...prev,
        uploaded_documents: [...prev.uploaded_documents, ...documents]
      }));
      showSuccess(`${documents.length} documents added`);
    });
  };

  const removeFile = (type, index) => {
    if (type === 'photo') {
      setFormData(prev => ({
        ...prev,
        site_photos: prev.site_photos.filter((_, i) => i !== index)
      }));
      showSuccess('Photo removed');
    } else if (type === 'video') {
      setFormData(prev => ({
        ...prev,
        site_video: null
      }));
      showSuccess('Video removed');
    } else if (type === 'document') {
      setFormData(prev => ({
        ...prev,
        uploaded_documents: prev.uploaded_documents.filter((_, i) => i !== index)
      }));
      showSuccess('Document removed');
    }
  };

  // Validation function
  const validateInspectionData = (data) => {
    const errors = {};
    
    // Required fields validation - Django model অনুযায়ী
    if (!data.client_name?.trim()) {
      errors.client_name = 'Client name is required';
    }
    
    if (!data.industry_name?.trim()) {
      errors.industry_name = 'Industry name is required';
    }
    
    if (!data.nature_of_business?.trim()) {
      errors.nature_of_business = 'Nature of business is required';
    }
    
    if (!data.legal_status?.trim()) {
      errors.legal_status = 'Legal status is required';
    }
    
    if (!data.phone_number?.trim()) {
      errors.phone_number = 'Phone number is required';
    }
    
    if (!data.account_number?.trim()) {
      errors.account_number = 'Account number is required';
    }
    
    if (!data.trade_license?.trim()) {
      errors.trade_license = 'Trade license information is required';
    }
    
    if (!data.investment_category?.trim()) {
      errors.investment_category = 'Investment category is required';
    }
    
    if (!data.owner_name?.trim()) {
      errors.owner_name = 'Owner name is required';
    }
    
    if (!data.residential_address?.trim()) {
      errors.residential_address = 'Residential address is required';
    }
    
    if (!data.purpose_investment?.trim()) {
      errors.purpose_investment = 'Purpose of investment is required';
    }
    
    if (!data.period_investment?.trim()) {
      errors.period_investment = 'Period of investment is required';
    }
    
    if (!data.facility_type?.trim()) {
      errors.facility_type = 'Facility type is required';
    }
    
    // Validate location tracking
    // if (locationPoints.length === 0) {
    //   errors.location = 'Location tracking is required. Please start location tracking.';
    // }
    
    return Object.keys(errors).length === 0 ? true : errors;
  };





























// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    console.log('🔄 [SUBMISSION START] Starting form submission...');
    console.log('📋 Submission details:', {
      id: id,
      isCreateMode: id === 'create',
      hasInspection: !!inspection,
      inspectionType: inspection?.is_new_inspection ? 'NewInspection' : 'Inspection',
      inspectionData: inspection // Log the inspection object
    });
    
    // Validate form data first
    const validationResult = validateInspectionData(formData);
    if (validationResult !== true) {
      console.log('❌ [VALIDATION] Validation errors:', validationResult);
      showError('Please fill all required fields correctly. Check the form for errors.');
      setLoading(false);
      return;
    }

    // Stop location tracking if active
    if (isLocationTracking) {
      stopLocationTracking();
    }

    // Get current user
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('👤 Current user:', user);
    
    // 🔥 DETERMINE INSPECTION TYPE
    const isNewInspection = inspection?.is_new_inspection || id === 'create';
    console.log('🔍 Inspection type:', isNewInspection ? 'NewInspection' : 'Regular Inspection');
    
    // 🔥 PREPARE DATA BASED ON INSPECTION TYPE
    let submissionData = {
      // Common fields for both types
      client_name: formData.client_name || '',
      industry_name: formData.industry_name || '',
      phone_number: formData.phone_number || '',
      branch_name: formData.branch_name || user.branch_name || 'Web Branch',
      project: formData.project || 'Inspection Project',
      status: 'completed', // Lowercase as per Django model
      
      // Location data
      location_points: locationPoints,
      location_start_time: locationStartTime?.toISOString(),
      location_end_time: locationEndTime?.toISOString(),
      total_location_points: locationPoints.length,
    };

    if (isNewInspection) {
      // 🔥 NEW INSPECTION SPECIFIC FIELDS
      console.log('🎯 Preparing NewInspection data');
      
      submissionData = {
        ...submissionData,
        assigned_inspector: user.id || 1, // 🔥 REQUIRED FIELD FOR NEW INSPECTION
        status: 'completed',
        
        // Minimal required fields for NewInspection
        client_name: formData.client_name || '',
        industry_name: formData.industry_name || '',
        phone_number: formData.phone_number || '',
        branch_name: formData.branch_name || user.branch_name || 'Web Branch',
        project: formData.project || 'New Inspection',
        
        // Optional but recommended
        group_name: formData.group_name || '',
        nature_of_business: formData.nature_of_business || '',
        legal_status: formData.legal_status || '',
        investment_category: formData.investment_category || '',
      };
      
      // For full form submission, we need to convert to regular inspection
      // Include additional data for conversion
      submissionData.full_inspection_data = {
        // All the detailed form data
        ...formData,
        inspector: user.id || 1,
        status: 'completed'
      };
      
    } else {
      // 🔥 REGULAR INSPECTION FIELDS
      console.log('🎯 Preparing regular Inspection data');
      
      submissionData = {
        ...submissionData,
        inspector: user.id || 1, // Required for regular Inspection
        status: 'completed',
        
        // Include all form data
        ...formData,
        
        // Financial data as numbers
        cash_balance: parseFloat(formData.cash_balance) || 0,
        stock_trade_finished: parseFloat(formData.stock_trade_finished) || 0,
        stock_trade_financial: parseFloat(formData.stock_trade_financial) || 0,
        accounts_receivable: parseFloat(formData.accounts_receivable) || 0,
        advance_deposit: parseFloat(formData.advance_deposit) || 0,
        other_current_assets: parseFloat(formData.other_current_assets) || 0,
        land_building: parseFloat(formData.land_building) || 0,
        plant_machinery: parseFloat(formData.plant_machinery) || 0,
        other_assets: parseFloat(formData.other_assets) || 0,
        ibbl_investment: parseFloat(formData.ibbl_investment) || 0,
        other_banks_investment: parseFloat(formData.other_banks_investment) || 0,
        borrowing_sources: parseFloat(formData.borrowing_sources) || 0,
        accounts_payable: parseFloat(formData.accounts_payable) || 0,
        other_current_liabilities: parseFloat(formData.other_current_liabilities) || 0,
        long_term_liabilities: parseFloat(formData.long_term_liabilities) || 0,
        other_non_current_liabilities: parseFloat(formData.other_non_current_liabilities) || 0,
        paid_up_capital: parseFloat(formData.paid_up_capital) || 0,
        retained_earning: parseFloat(formData.retained_earning) || 0,
        resources: parseFloat(formData.resources) || 0,
        
        // Boolean fields
        warehouse_license: Boolean(formData.warehouse_license),
        godown_guard: Boolean(formData.godown_guard),
        damp_proof: Boolean(formData.damp_proof),
        easy_access: Boolean(formData.easy_access),
        letter_disclaimer: Boolean(formData.letter_disclaimer),
        insurance_policy: Boolean(formData.insurance_policy),
        godown_hired: Boolean(formData.godown_hired),
      };
      
      // Remove NewInspection specific fields
      delete submissionData.assigned_inspector;
      delete submissionData.is_new_inspection;
    }

    console.log('📤 [DATA PREPARED] Submission data summary:', {
      type: isNewInspection ? 'NewInspection' : 'Inspection',
      client: submissionData.client_name,
      branch: submissionData.branch_name,
      inspector: submissionData.inspector || submissionData.assigned_inspector,
      fields: Object.keys(submissionData).length,
      hasAssignedInspector: 'assigned_inspector' in submissionData,
      hasInspector: 'inspector' in submissionData
    });
    
    let result;
    
    if (id === 'create' || !id) {
      // CREATE new inspection
      console.log('📝 [CREATE] Creating new inspection...');
      
      if (isNewInspection) {
        // Create NewInspection
        result = await createNewInspection(submissionData);
      } else {
        // Create regular Inspection
        result = await api.post('/inspections/', submissionData);
      }
      
      console.log('✅ [CREATE SUCCESS] Inspection created:', result);
      showSuccess('New inspection created successfully! ✅');
      
    } else {
      // UPDATE existing inspection
      console.log('🔄 [UPDATE] Processing inspection ID:', id);
      
      if (isNewInspection) {
        console.log('🎯 [NEW INSPECTION STRATEGY]');
        
        // Strategy 1: Try to update NewInspection first
        try {
          // Simple update for NewInspection
          const updatePayload = {
            assigned_inspector: submissionData.assigned_inspector,
            status: 'completed',
            client_name: submissionData.client_name,
            industry_name: submissionData.industry_name,
            phone_number: submissionData.phone_number,
            branch_name: submissionData.branch_name,
            project: submissionData.project
          };
          
          console.log('📦 Sending NewInspection update:', updatePayload);
          result = await api.patch(`/new-inspections/${id}/`, updatePayload);
          console.log('✅ [NEW INSPECTION UPDATE] Updated successfully');
          
          // Strategy 2: Then convert to full inspection with all data
          console.log('🔄 Now converting to full inspection with detailed data...');
          try {
            const convertResponse = await api.post(`/new-inspections/${id}/convert/`, {
              ...formData,
              inspector: user.id || 1,
              status: 'completed',
              branch_name: submissionData.branch_name
            });
            result = convertResponse.data;
            console.log('✅ [CONVERSION SUCCESS] Converted to full inspection');
            showSuccess('Inspection converted and submitted successfully! ✅');
          } catch (convertError) {
            console.log('⚠️ [CONVERSION SKIPPED] Keeping as NewInspection:', convertError.message);
            showSuccess('Inspection updated successfully! ✅');
          }
          
        } catch (updateError) {
          console.log('❌ [NEW INSPECTION UPDATE FAILED] Trying direct conversion...');
          
          // If update fails, try direct conversion
          try {
            result = await api.post(`/new-inspections/${id}/convert/`, submissionData);
            console.log('✅ [DIRECT CONVERSION SUCCESS]');
            showSuccess('Inspection converted and submitted successfully! ✅');
          } catch (convertError) {
            console.error('❌ [ALL STRATEGIES FAILED]');
            throw convertError;
          }
        }
        
      } else {
        // Regular inspection update
        console.log('🎯 [REGULAR INSPECTION UPDATE]');
        
        // Use the updated updateInspection function
        result = await updateInspection(id, submissionData);
        console.log('✅ [REGULAR UPDATE SUCCESS]');
        showSuccess('Inspection updated successfully! ✅');
      }
    }
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate('/inspector/dashboard');
    }, 1500);
    
  } catch (error) {
    console.error('❌ [SUBMISSION FAILED] Full error details:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      method: error.config?.method
    });
    
    // Handle specific error types
    if (error.response) {
      const errorData = error.response.data;
      
      if (error.response.status === 400) {
        if (errorData.assigned_inspector) {
          showError(`Inspector field is required. Please ensure an inspector is assigned.`);
        } else if (typeof errorData === 'object') {
          const errorMessages = Object.entries(errorData)
            .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
            .join('\n');
          showError(`Validation errors:\n${errorMessages}`);
        } else {
          showError(`Validation error: ${errorData}`);
        }
      } else if (error.response.status === 404) {
        showError(`Inspection ${id} not found. Creating new one...`);
        // Try to create new
        try {
          const newData = { ...formData, inspector: user.id || 1 };
          await createNewInspection(newData);
          showSuccess('Created as new inspection!');
          setTimeout(() => navigate('/inspector/dashboard'), 1000);
        } catch (createError) {
          showError('Failed to create new inspection');
        }
      } else if (error.response.status === 401) {
        showError('Session expired. Please login again.');
        localStorage.clear();
        navigate('/login');
      } else {
        showError(`Error ${error.response.status}: ${error.message}`);
      }
    } else {
      showError(`Submission failed: ${error.message}`);
    }
    
  } finally {
    setLoading(false);
  }
};















  // Section Navigation
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

  // Helper function to render form fields
  const renderTextField = (label, name, type = 'text', required = false, rows = 1) => (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {rows > 1 ? (
        <textarea
          name={name}
          value={formData[name]}
          onChange={handleChange}
          rows={rows}
          required={required}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name]}
          onChange={handleChange}
          required={required}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
        />
      )}
    </div>
  );

  const renderDropdown = (label, name, options, required = false) => (
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
  );

  const renderRadioGroup = (label, name, options) => (
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
  );

  const renderCheckbox = (label, name) => (
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
  );

  // Loading condition
  if (!inspection && id !== 'create') {
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
            {id === 'create' ? 'Create New Inspection' : 'Edit Inspection'}
          </h1>
          {inspection && (
            <p className="mt-2 text-sm text-gray-600">
              {inspection.project ? `Project: ${inspection.project}` : 'New Inspection'} | 
              {inspection.client_name ? ` Client: ${inspection.client_name}` : ''} | 
              {inspection.industry_name ? ` Industry: ${inspection.industry_name}` : ''}
              {inspection.branch_name ? ` | Branch: ${inspection.branch_name}` : ''}
            </p>
          )}
        </div>

        {/* Location Tracking Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Location Tracking (Required)</h2>
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              isLocationTracking ? 'bg-green-50 border-green-200' : 'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-center">
                <div className={`p-2 rounded-full ${
                  isLocationTracking ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {isLocationTracking ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                  )}
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

            {locationPoints.length === 0 && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-yellow-800">
                    <strong>Important:</strong> Location tracking is required. Please start location tracking before submitting the form.
                  </p>
                </div>
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
                {renderTextField('Date of Establishment', 'date_of_establishment', 'text')}
                {renderTextField('Office Address', 'office_address', 'text', true, 3)}
                {renderTextField('Showroom Address', 'showroom_address', 'text', false, 2)}
                {renderTextField('Factory/Godown/Depot Address', 'factory_address', 'text', false, 2)}
                {renderTextField('Phone/Mobile no (office)', 'phone_number', 'tel', true)}
                {renderTextField('Current A/C no', 'account_number', 'text', true)}
                {renderTextField('A/C ID no', 'account_id', 'text', false)}
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
                {renderTextField('Permanent Address', 'permanent_address', 'text', false, 3)}
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Key Employees</h3>
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
                          <label className="block text-sm font-medium text-gray-700">Qualification</label>
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
              
              <div className="space-y-8">
                {/* Current Assets */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Assets</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Tk)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Cash balance</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="cash_balance"
                              value={formData.cash_balance}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Stock in trade (finished goods)</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="stock_trade_finished"
                              value={formData.stock_trade_finished}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Stock in trade (financial)</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="stock_trade_financial"
                              value={formData.stock_trade_financial}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Accounts receivable</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="accounts_receivable"
                              value={formData.accounts_receivable}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Advance / Deposit etc.</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="advance_deposit"
                              value={formData.advance_deposit}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Other Current Assets</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="other_current_assets"
                              value={formData.other_current_assets}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">Sub Total - Current Assets</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                            {formData.current_assets_subtotal.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Fixed Assets */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Fixed Assets</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Tk)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Land and Building</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="land_building"
                              value={formData.land_building}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Plant & Machinery</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="plant_machinery"
                              value={formData.plant_machinery}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Other Assets</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="other_assets"
                              value={formData.other_assets}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">Sub Total - Fixed Assets</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                            {formData.fixed_assets_subtotal.toFixed(2)}
                          </td>
                        </tr>
                        <tr className="bg-green-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">TOTAL ASSETS (A)</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-green-700">
                            {formData.total_assets.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Current Liabilities */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Current Liabilities</h3>
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (Tk)</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">IBBL Investment</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="ibbl_investment"
                              value={formData.ibbl_investment}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Investment from other Banks</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="other_banks_investment"
                              value={formData.other_banks_investment}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Borrowing from other sources</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="borrowing_sources"
                              value={formData.borrowing_sources}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Accounts Payable</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="accounts_payable"
                              value={formData.accounts_payable}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">Other Current Liabilities</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              name="other_current_liabilities"
                              value={formData.other_current_liabilities}
                              onChange={handleChange}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                            />
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">Sub Total - Current Liabilities</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-bold text-gray-900">
                            {formData.current_liabilities_subtotal.toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Long Term Liabilities & Equity */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Long Term Liabilities</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Long Term Liabilities</label>
                        <input
                          type="text"
                          name="long_term_liabilities"
                          value={formData.long_term_liabilities}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Other Non-current Liabilities</label>
                        <input
                          type="text"
                          name="other_non_current_liabilities"
                          value={formData.other_non_current_liabilities}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Equity</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Paid up Capital</label>
                        <input
                          type="text"
                          name="paid_up_capital"
                          value={formData.paid_up_capital}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Retained Earning</label>
                        <input
                          type="text"
                          name="retained_earning"
                          value={formData.retained_earning}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700">Resources</label>
                        <input
                          type="text"
                          name="resources"
                          value={formData.resources}
                          onChange={handleChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm px-3 py-2 focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-medium text-blue-900 mb-4">Financial Summary</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-500">Total Assets</p>
                      <p className="text-xl font-bold text-blue-600">{formData.total_assets.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-500">Total Liabilities</p>
                      <p className="text-xl font-bold text-orange-600">{formData.total_liabilities.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-500">Total Equity</p>
                      <p className="text-xl font-bold text-green-600">{formData.total_equity.toFixed(2)}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border">
                      <p className="text-sm text-gray-500">Net Worth</p>
                      <p className="text-xl font-bold text-purple-600">{formData.net_worth.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section I: Working Capital Assessment */}
          {activeSection === 'I' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section I: Working Capital Assessment</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p className="text-sm text-gray-600 mb-4">Note: Total Working Capital Requirement = (Amount × Days tied up)/360</p>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Particulars</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Tied Up</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount D×E</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {formData.working_capital_items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={item.unit}
                              onChange={(e) => handleWorkingCapitalChange(index, 'unit', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={item.rate}
                              onChange={(e) => handleWorkingCapitalChange(index, 'rate', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={item.amount}
                              onChange={(e) => handleWorkingCapitalChange(index, 'amount', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                              readOnly
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={item.tied_up_days}
                              onChange={(e) => handleWorkingCapitalChange(index, 'tied_up_days', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="text"
                              value={item.amount_dxe}
                              onChange={(e) => handleWorkingCapitalChange(index, 'amount_dxe', e.target.value)}
                              className="block w-full border border-gray-300 rounded-md shadow-sm px-2 py-1 text-sm focus:outline-none focus:ring-primary focus:border-primary"
                              readOnly
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-blue-800">Total Working Capital Requirement:</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formData.working_capital_items.reduce((total, item) => {
                        return total + (parseFloat(item.amount_dxe) || 0);
                      }, 0).toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-blue-800">Formula: (Amount × Days tied up)/360</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section J: Godown Particulars */}
          {activeSection === 'J' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section J: Godown Particulars</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {renderTextField('Location of Godown', 'godown_location', 'text', false, 2)}
                  {renderTextField('Capacity (in tons)', 'godown_capacity')}
                  {renderTextField('Space (square feet)', 'godown_space')}
                  {renderTextField('Nature of Godown', 'godown_nature')}
                  {renderTextField('Name of the Owner', 'godown_owner')}
                  {renderTextField('Distance from the Branch', 'distance_from_branch')}
                </div>

                {renderTextField('Items to be stored', 'items_to_store', 'text', false, 3)}

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Godown Facilities</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {renderCheckbox('Warehouse license obtained', 'warehouse_license')}
                    {renderCheckbox('Godown Guard is available', 'godown_guard')}
                    {renderCheckbox('Damp proof', 'damp_proof')}
                    {renderCheckbox('Easy access for vehicles', 'easy_access')}
                    {renderCheckbox('Letter of disclaimer obtained', 'letter_disclaimer')}
                    {renderCheckbox('Insurance policy obtained', 'insurance_policy')}
                    {renderCheckbox('Godown hired from others', 'godown_hired')}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Section K: Checklist */}
          {activeSection === 'K' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section K: Checklist</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600 mb-4">Please verify and confirm each item:</p>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-3/4">Particulars</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Yes</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">N/A</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {Object.entries(formData.checklist_items).map(([key, value]) => (
                        <tr key={key}>
                          <td className="px-4 py-3 whitespace-normal text-sm font-medium text-gray-900">
                            {key}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              checked={value === 'Yes'}
                              onChange={() => handleChecklistChange(key, 'Yes')}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              checked={value === 'No'}
                              onChange={() => handleChecklistChange(key, 'No')}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <input
                              type="radio"
                              name={`checklist_${key}`}
                              checked={value === 'N/A'}
                              onChange={() => handleChecklistChange(key, 'N/A')}
                              className="focus:ring-primary h-4 w-4 text-primary border-gray-300"
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Section L: Site Photos & Video */}
          {activeSection === 'L' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section L: Site Photos & Video</h2>
              
              <div className="space-y-8">
                {/* Photos */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Site Photos (Max 10 photos)</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Photos
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handlePhotoUpload}
                      disabled={formData.site_photos.length >= 10}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      {formData.site_photos.length}/10 photos uploaded
                    </p>
                  </div>

                  {formData.site_photos.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                      {formData.site_photos.map((photo, index) => (
                        <div key={index} className="relative border border-gray-200 rounded-lg overflow-hidden">
                          <div className="aspect-w-1 aspect-h-1">
                            <img
                              src={`data:${photo.type};base64,${photo.base64_data}`}
                              alt={photo.description}
                              className="object-cover w-full h-32"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFile('photo', index)}
                            className="absolute top-2 right-2 bg-red-100 text-red-600 rounded-full p-1 hover:bg-red-200"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          <div className="p-2">
                            <p className="text-xs text-gray-600 truncate">{photo.name}</p>
                            <p className="text-xs text-gray-500">{(photo.size / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Video */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Site Video (Optional)</h3>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Video
                    </label>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={!!formData.site_video}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Maximum file size: 100MB
                    </p>
                  </div>

                  {formData.site_video && (
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <p className="font-medium text-gray-900">{formData.site_video.name}</p>
                          <p className="text-sm text-gray-600">
                            {(formData.site_video.size / (1024 * 1024)).toFixed(2)} MB • {formData.site_video.type}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile('video', null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="bg-black rounded-lg aspect-video flex items-center justify-center">
                        <p className="text-white">Video preview not available</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section M: Documents Upload */}
          {activeSection === 'M' && (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Section M: Supporting Documents</h2>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Upload Supporting Documents</h3>
                
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Documents (PDF, Word, Excel, Images)
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleDocumentUpload}
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Upload trade license, VAT certificate, TIN certificate, etc.
                  </p>
                </div>

                {formData.uploaded_documents.length > 0 && (
                  <div className="border border-gray-200 rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Document Name</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {formData.uploaded_documents.map((doc, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                              {doc.name}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {doc.type}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {(doc.size / 1024).toFixed(2)} KB
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                              {doc.description}
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                              <button
                                type="button"
                                onClick={() => removeFile('document', index)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => navigate('/inspector/dashboard')}
                className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              
              <div className="space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    const updatedData = { ...formData, status: 'Pending' };
                    handleSubmit({ preventDefault: () => {} }, updatedData);
                  }}
                  className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save as Draft'}
                </button>
                
                <button
                  type="submit"
                  className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit Inspection'}
                </button>
              </div>
            </div>
            
            {locationPoints.length === 0 && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm text-red-800">
                    <strong>Warning:</strong> Location tracking is required before submission. Please start location tracking from the top section.
                  </p>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default InspectionForm;