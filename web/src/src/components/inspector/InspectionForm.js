

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












// UPDATED handleVideoUpload function with better error handling
const handleVideoUpload = (e) => {
  const file = e.target.files[0];
  
  if (!file) {
    showError('No video file selected');
    return;
  }
  
  console.log(`📹 Video selected: ${file.name}, Size: ${(file.size / (1024 * 1024)).toFixed(2)}MB, Type: ${file.type}`);
  
  // ✅ Video size limit (50MB)
  const MAX_VIDEO_SIZE = 50 * 1024 * 1024;
  
  if (file.size > MAX_VIDEO_SIZE) {
    showError(`Video size too large! Maximum 50MB allowed. Your file: ${(file.size / (1024 * 1024)).toFixed(2)}MB`);
    e.target.value = ''; // Reset file input
    return;
  }
  
  // ✅ Allowed video formats
  const allowedTypes = [
    'video/mp4', 
    'video/webm', 
    'video/ogg',
    'video/quicktime',
    'video/x-msvideo', // avi
    'video/x-matroska' // mkv
  ];
  
  if (!allowedTypes.includes(file.type)) {
    showError(`Unsupported video format. Please use: MP4, WebM, OGG, MOV, AVI, or MKV. Your file: ${file.type}`);
    e.target.value = ''; // Reset file input
    return;
  }
  
  // Show loading message
  showSuccess('Processing video... Please wait');
  
  const reader = new FileReader();
  
  reader.onloadstart = () => {
    console.log('🔄 Starting video file reading...');
  };
  
  reader.onprogress = (event) => {
    if (event.lengthComputable) {
      const percentLoaded = Math.round((event.loaded / event.total) * 100);
      console.log(`📊 Video loading: ${percentLoaded}%`);
    }
  };
  
  reader.onloadend = () => {
    try {
      const base64String = reader.result;
      
      if (!base64String || typeof base64String !== 'string') {
        throw new Error('Failed to read video file');
      }
      
      // Extract base64 data (remove data:video/...;base64, prefix)
      let base64Data;
      if (base64String.includes('base64,')) {
        base64Data = base64String.split(',')[1];
      } else {
        base64Data = base64String;
      }
      
      // Validate base64 data
      if (!base64Data || base64Data.length < 100) {
        throw new Error('Invalid base64 data');
      }
      
      const videoData = {
        name: file.name,
        size: file.size,
        type: file.type,
        base64_data: base64Data,
        description: 'Site documentation video',
        uploaded_at: new Date().toISOString(),
        thumbnail_url: null // Can add thumbnail generation later
      };
      
      console.log(`✅ Video processed: ${file.name}`);
      console.log(`📊 Base64 data length: ${Math.round(base64Data.length / 1024)}KB`);
      console.log(`📊 MIME type: ${file.type}`);
      
      setFormData(prev => ({
        ...prev,
        site_video: videoData
      }));
      
      showSuccess('Video added successfully! Preview available.');
      
    } catch (error) {
      console.error('❌ Error processing video:', error);
      showError(`Failed to process video: ${error.message}`);
    }
  };
  
  reader.onerror = (error) => {
    console.error('❌ FileReader error:', error);
    showError('Error reading video file. Please try again with a different file.');
    e.target.value = ''; // Reset file input
  };
  
  // Start reading the file
  reader.readAsDataURL(file);
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


























// Handle form submission - COMPLETE FIXED VERSION
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    console.log('🔄 [SUBMISSION START] Starting form submission...');
    
    // Validate form data
    const validationResult = validateInspectionData(formData);
    if (validationResult !== true) {
      console.log('❌ [VALIDATION] Validation errors:', validationResult);
      showError('Please fill all required fields correctly.');
      setLoading(false);
      return;
    }

    // Stop location tracking if active
    if (isLocationTracking) {
      stopLocationTracking();
    }

    // Get current user
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    
    // Determine inspection type
    const isNewInspection = inspection?.is_new_inspection || id === 'create';
    
    // 🔥 **COMPLETE DATA STRUCTURE FOR INSPECTION**
    const submissionData = {
  // =============== SECTION A: COMPANY INFORMATION ===============
    client_name: formData.client_name || '',
    group_name: formData.group_name || '',
    industry_name: formData.industry_name || '',
    nature_of_business: formData.nature_of_business || '',
    legal_status: formData.legal_status || '',
    date_of_establishment: formData.date_of_establishment || '',
    office_address: formData.office_address || '',
    showroom_address: formData.showroom_address || '',
    factory_address: formData.factory_address || '',
    phone_number: formData.phone_number || '',
    account_number: formData.account_number || '',
    account_id: formData.account_id || '',
    tin_number: formData.tin_number || '',
    date_of_opening: formData.date_of_opening || '',
    vat_reg_number: formData.vat_reg_number || '',
    first_investment_date: formData.first_investment_date || '',
    sector_code: formData.sector_code || '',
    trade_license: formData.trade_license || '',
    economic_purpose_code: formData.economic_purpose_code || '',
    investment_category: formData.investment_category || '',
    
    // =============== SECTION B: OWNER INFORMATION ===============
    owner_name: formData.owner_name || '',
    owner_age: String(formData.owner_age || ''),  // ✅ String এ convert
    father_name: formData.father_name || '',
    mother_name: formData.mother_name || '',
    spouse_name: formData.spouse_name || '',
    academic_qualification: formData.academic_qualification || '',
    children_info: formData.children_info || '',
    business_successor: formData.business_successor || '',
    residential_address: formData.residential_address || '',
    permanent_address: formData.permanent_address || '',
    
    // =============== SECTION C: PARTNERS/DIRECTORS ===============
    partners_directors: JSON.stringify(formData.partners_directors || []),
    
    // =============== SECTION D: PURPOSE ===============
    purpose_investment: formData.purpose_investment || '',
    purpose_bank_guarantee: formData.purpose_bank_guarantee || '',
    period_investment: formData.period_investment || '',
    
    // =============== SECTION E: PROPOSED FACILITIES ===============
    facility_type: formData.facility_type || '',
    // ✅ সকল numeric values কে string এ convert করুন
    existing_limit: String(parseFloat(formData.existing_limit) || 0),
    applied_limit: String(parseFloat(formData.applied_limit) || 0),
    recommended_limit: String(parseFloat(formData.recommended_limit) || 0),
    bank_percentage: String(parseFloat(formData.bank_percentage) || 0),
    client_percentage: String(parseFloat(formData.client_percentage) || 0),
    
    // =============== SECTION F: PRESENT OUTSTANDING ===============
    outstanding_type: formData.outstanding_type || '',
    limit_amount: String(parseFloat(formData.limit_amount) || 0),
    net_outstanding: String(parseFloat(formData.net_outstanding) || 0),
    gross_outstanding: String(parseFloat(formData.gross_outstanding) || 0),
    
    // =============== SECTION G: BUSINESS ANALYSIS ===============
    market_situation: formData.market_situation || '',
    client_position: formData.client_position || '',
    competitors: JSON.stringify(formData.competitors || []),
    business_reputation: formData.business_reputation || '',
    production_type: formData.production_type || '',
    product_name: formData.product_name || '',
    production_capacity: String(formData.production_capacity || ''),
    actual_production: String(formData.actual_production || ''),
    profitability_observation: formData.profitability_observation || '',
    
    // Labor Force - ✅ সকল numeric values কে string এ convert
    male_officer: String(parseInt(formData.male_officer) || 0),
    female_officer: String(parseInt(formData.female_officer) || 0),
    skilled_officer: String(parseInt(formData.skilled_officer) || 0),
    unskilled_officer: String(parseInt(formData.unskilled_officer) || 0),
    male_worker: String(parseInt(formData.male_worker) || 0),
    female_worker: String(parseInt(formData.female_worker) || 0),
    skilled_worker: String(parseInt(formData.skilled_worker) || 0),
    unskilled_worker: String(parseInt(formData.unskilled_worker) || 0),
    
    // Key Employees
    key_employees: JSON.stringify(formData.key_employees || []),
    
    // =============== SECTION H: PROPERTY & ASSETS ===============
    // ✅ সকল financial values কে string এ convert
    cash_balance: String(parseFloat(formData.cash_balance) || 0),
    stock_trade_finished: String(parseFloat(formData.stock_trade_finished) || 0),
    stock_trade_financial: String(parseFloat(formData.stock_trade_financial) || 0),
    accounts_receivable: String(parseFloat(formData.accounts_receivable) || 0),
    advance_deposit: String(parseFloat(formData.advance_deposit) || 0),
    other_current_assets: String(parseFloat(formData.other_current_assets) || 0),
    
    // Fixed Assets
    land_building: String(parseFloat(formData.land_building) || 0),
    plant_machinery: String(parseFloat(formData.plant_machinery) || 0),
    other_assets: String(parseFloat(formData.other_assets) || 0),
    
    // Liabilities
    ibbl_investment: String(parseFloat(formData.ibbl_investment) || 0),
    other_banks_investment: String(parseFloat(formData.other_banks_investment) || 0),
    borrowing_sources: String(parseFloat(formData.borrowing_sources) || 0),
    accounts_payable: String(parseFloat(formData.accounts_payable) || 0),
    other_current_liabilities: String(parseFloat(formData.other_current_liabilities) || 0),
    long_term_liabilities: String(parseFloat(formData.long_term_liabilities) || 0),
    other_non_current_liabilities: String(parseFloat(formData.other_non_current_liabilities) || 0),
    
    // Equity
    paid_up_capital: String(parseFloat(formData.paid_up_capital) || 0),
    retained_earning: String(parseFloat(formData.retained_earning) || 0),
    resources: String(parseFloat(formData.resources) || 0),
    
    // Auto-calculated values - ✅ String এ convert
    current_assets_subtotal: String(parseFloat(formData.current_assets_subtotal) || 0),
    fixed_assets_subtotal: String(parseFloat(formData.fixed_assets_subtotal) || 0),
    total_assets: String(parseFloat(formData.total_assets) || 0),
    current_liabilities_subtotal: String(parseFloat(formData.current_liabilities_subtotal) || 0),
    total_liabilities: String(parseFloat(formData.total_liabilities) || 0),
    total_equity: String(parseFloat(formData.total_equity) || 0),
    grand_total: String(parseFloat(formData.grand_total) || 0),
    net_worth: String(parseFloat(formData.net_worth) || 0),
    
    // =============== SECTION I: WORKING CAPITAL ===============
    working_capital_items: JSON.stringify(formData.working_capital_items || []),
    
    // =============== SECTION J: GODOWN PARTICULARS ===============
    godown_location: formData.godown_location || '',
    godown_capacity: String(formData.godown_capacity || ''),
    godown_space: String(formData.godown_space || ''),
    godown_nature: formData.godown_nature || '',
    godown_owner: formData.godown_owner || '',
    distance_from_branch: String(formData.distance_from_branch || ''),
    items_to_store: formData.items_to_store || '',
    warehouse_license: Boolean(formData.warehouse_license),
    godown_guard: Boolean(formData.godown_guard),
    damp_proof: Boolean(formData.damp_proof),
    easy_access: Boolean(formData.easy_access),
    letter_disclaimer: Boolean(formData.letter_disclaimer),
    insurance_policy: Boolean(formData.insurance_policy),
    godown_hired: Boolean(formData.godown_hired),
    
    // =============== SECTION K: CHECKLIST ===============
    checklist_items: JSON.stringify(formData.checklist_items || {}),
    
    // =============== SECTION L: MEDIA ===============
    // JSON stringify for arrays
    site_photos: JSON.stringify(formData.site_photos || []),
    site_video: formData.site_video ? JSON.stringify(formData.site_video) : null,
    
    // =============== SECTION M: DOCUMENTS ===============
    uploaded_documents: JSON.stringify(formData.uploaded_documents || []),
    
    // =============== REQUIRED METADATA FIELDS ===============
    branch_name: formData.branch_name || user.branch_name || 'Web Branch',
    project: formData.project || 'Inspection Project',
    status: 'Completed',  // ✅ Capitalized as per model choices
    inspector: user.id || 1,
    
    // =============== LOCATION TRACKING ===============
    location_points: JSON.stringify(locationPoints || []),
    location_start_time: locationStartTime?.toISOString() || new Date().toISOString(),
    location_end_time: locationEndTime?.toISOString() || new Date().toISOString(),
    total_location_points: locationPoints.length,
  };


















    console.log('📤 [SUBMISSION DATA] Fields being sent:', {
      inspector: submissionData.inspector,
      client: submissionData.client_name,
      branch: submissionData.branch_name,
      status: submissionData.status,
      isNewInspection: isNewInspection,
      totalFields: Object.keys(submissionData).length,
      hasLocationPoints: locationPoints.length > 0
    });

    let result;
    
    if (id === 'create') {
      // CREATE new inspection
      console.log('📝 [CREATE] Creating new inspection...');
      
      if (isNewInspection) {
        // Create NewInspection (simplified)
        const newInspectionData = {
          project: submissionData.project,
          client_name: submissionData.client_name,
          industry_name: submissionData.industry_name,
          phone_number: submissionData.phone_number,
          assigned_inspector: user.id || 1,
          branch_name: submissionData.branch_name,
          status: 'pending'
        };
        result = await createNewInspection(newInspectionData);
        showSuccess('New inspection created successfully! ✅');
      } else {
        // Create full Inspection
        result = await api.post('/inspections/', submissionData);
        showSuccess('Inspection created successfully! ✅');
      }
      
    } else {
      // UPDATE existing inspection
      console.log('🔄 [UPDATE] Processing inspection ID:', id);
      
      if (isNewInspection) {
        console.log('🎯 [CONVERSION] Converting NewInspection to full Inspection...');
        
        // 🔥 OPTION 1: Try direct conversion first
        try {
          console.log('🔧 Trying direct conversion...');
          const convertResponse = await api.post(`/new-inspections/${id}/convert/`, submissionData);
          result = convertResponse.data;
          console.log('✅ [DIRECT CONVERSION SUCCESS]');
          showSuccess('Inspection converted and submitted successfully! ✅');
        } catch (convertError) {
          console.log('⚠️ [DIRECT CONVERSION FAILED] Trying alternative...');
          
          // 🔥 OPTION 2: Create new Inspection and update NewInspection status
          try {
            // First create new Inspection
            console.log('🆕 Creating new Inspection from data...');
            const newInspectionResponse = await api.post('/inspections/', submissionData);
            result = newInspectionResponse.data;
            
            // Then update NewInspection status to Completed
            try {
              await api.patch(`/new-inspections/${id}/`, {
                status: 'Completed',
                converted_inspection_id: result.id
              });
            } catch (updateError) {
              console.log('⚠️ Could not update NewInspection status:', updateError.message);
            }
            
            console.log('✅ [ALTERNATIVE CONVERSION SUCCESS]');
            showSuccess('Inspection created successfully! ✅');
          } catch (createError) {
            console.error('❌ [ALL CONVERSION ATTEMPTS FAILED]');
            throw createError;
          }
        }
        
      } else {
        // Regular inspection update
        console.log('🎯 [REGULAR UPDATE] Updating existing Inspection...');
        result = await updateInspection(id, submissionData);
        showSuccess('Inspection updated successfully! ✅');
      }
    }
    
    // Navigate to dashboard
    setTimeout(() => {
      navigate('/inspector/dashboard');
    }, 1500);
    
  } catch (error) {
    console.error('❌ [SUBMISSION FAILED] Full error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
    });
    
    // Show specific error message
    if (error.response?.data) {
      if (typeof error.response.data === 'object') {
        // Field-by-field errors
        const errors = Object.entries(error.response.data)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}: ${value.join(', ')}`;
            }
            return `${key}: ${value}`;
          })
          .join('\n');
        showError(`Please fix these errors:\n${errors}`);
      } else {
        showError(`Error: ${error.response.data}`);
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
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = 'https://via.placeholder.com/300x200?text=Image+Error';
                                }}
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
                        Maximum file size: 50MB • Supported formats: MP4, WebM, OGG
                      </p>
                    </div>

                    {formData.site_video && (
                      <div className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-4">
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
                        
                        {/* ✅ FIXED VIDEO PREVIEW SECTION */}
                        <div className="relative bg-black rounded-lg overflow-hidden">
                          {formData.site_video.base64_data ? (
                            <div className="aspect-video">
                              <video
                                controls
                                className="w-full h-full object-contain"
                                preload="metadata"
                                poster="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
                                onError={(e) => {
                                  console.error('Video loading error:', e);
                                  e.target.parentElement.innerHTML = `
                                    <div class="flex flex-col items-center justify-center h-full p-4">
                                      <svg class="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                      </svg>
                                      <p class="text-white text-center">
                                        Video preview could not be loaded<br/>
                                        <span class="text-sm text-gray-400">Video will still be saved to database</span>
                                      </p>
                                    </div>
                                  `;
                                }}
                              >
                                <source 
                                  src={`data:${formData.site_video.type};base64,${formData.site_video.base64_data}`}
                                  type={formData.site_video.type}
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          ) : (
                            <div className="aspect-video flex flex-col items-center justify-center p-4">
                              <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                              </svg>
                              <p className="text-white text-center">
                                Video uploaded successfully!<br />
                                <span className="text-sm text-gray-400">Preview will be available after form submission</span>
                              </p>
                            </div>
                          )}
                        </div>
                        
                        {/* Video Status Indicator */}
                        <div className="mt-4 flex items-center justify-between text-sm">
                          <div className="flex items-center">
                            <div className={`w-3 h-3 rounded-full mr-2 ${formData.site_video.base64_data ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            <span className="text-gray-700">
                              {formData.site_video.base64_data ? 'Ready for submission' : 'Processing...'}
                            </span>
                          </div>
                          <span className="text-gray-600">
                            Base64 length: {formData.site_video.base64_data ? `${Math.round(formData.site_video.base64_data.length / 1024)} KB` : 'N/A'}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          }






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



































































