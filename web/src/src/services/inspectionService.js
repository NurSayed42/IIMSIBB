



// // src/services/inspectionService.js
// import api from './api';

// // ==================== USER & AUTHENTICATION FUNCTIONS ====================

// // Get current user information
// export const getCurrentUser = async () => {
//   try {
//     console.log('👤 Fetching current user information');
//     const response = await api.get('/current-user/');
//     console.log('✅ Current user loaded:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching current user:', error);
//     throw error;
//   }
// };

// // Get user profile
// export const getUserProfile = async () => {
//   try {
//     console.log('👤 Fetching user profile');
//     const response = await api.get('/users/me/');
//     console.log('✅ User profile loaded:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching user profile:', error);
//     throw error;
//   }
// };

// // Refresh token
// export const refreshToken = async () => {
//   try {
//     console.log('🔄 Refreshing token');
//     const refreshToken = localStorage.getItem('refresh');
    
//     if (!refreshToken) {
//       throw new Error('No refresh token found');
//     }

//     const response = await api.post('/token/refresh/', {
//       refresh: refreshToken
//     });
    
//     const newAccessToken = response.data.access;
//     localStorage.setItem('access', newAccessToken);
    
//     console.log('✅ Token refreshed successfully');
//     return newAccessToken;
//   } catch (error) {
//     console.error('❌ Error refreshing token:', error);
//     throw error;
//   }
// };

// // Check authentication
// export const isAuthenticated = async () => {
//   try {
//     const token = localStorage.getItem('access');
//     if (!token) return false;

//     // Verify token by making a simple API call
//     await api.get('/users/me/');
//     return true;
//   } catch (error) {
//     console.error('❌ Authentication check failed:', error);
//     return false;
//   }
// };

// // Logout
// export const logout = () => {
//   try {
//     localStorage.removeItem('access');
//     localStorage.removeItem('refresh');
//     localStorage.removeItem('branch_name');
//     localStorage.removeItem('user_role');
//     console.log('✅ User logged out successfully');
//   } catch (error) {
//     console.error('❌ Error during logout:', error);
//   }
// };

// // Get branch name
// export const getBranchName = () => {
//   return localStorage.getItem('branch_name');
// };

// // Save branch name
// export const saveBranchName = (branchName) => {
//   localStorage.setItem('branch_name', branchName);
//   console.log('✅ Branch name saved:', branchName);
// };

// // ==================== INSPECTION CRUD OPERATIONS ====================

// // Get NEW inspections (assigned inspections) - CORRECTED
// export const getNewInspections = async () => {
//   try {
//     console.log('🔄 Fetching NEW inspections from API...');
//     const response = await api.get('/new-inspections/list/');
//     console.log('✅ New inspections loaded:', response.data);
//     console.log('📊 Total new inspections:', response.data.length);
    
//     // Debug: Show first inspection details
//     if (response.data.length > 0) {
//       console.log('🔍 Sample inspection:', {
//         id: response.data[0].id,
//         project: response.data[0].project,
//         assigned_inspector: response.data[0].assigned_inspector,
//         status: response.data[0].status,
//         client_name: response.data[0].client_name
//       });
//     }
    
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching new inspections:', error);
//     console.error('Error details:', error.response?.data);
//     return [];
//   }
// };

// // Get all inspections (existing inspections)
// export const getAllInspections = async (filters = {}) => {
//   try {
//     const response = await api.get('/inspections/', { params: filters });
//     console.log('📋 All inspections loaded:', response.data.length);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching all inspections:', error);
//     return [];
//   }
// };

// // Get inspection by ID
// export const getInspectionById = async (id) => {
//   try {
//     console.log('🔄 Fetching inspection:', id);
//     const response = await api.get(`/api/inspections/${id}/`);
//     console.log('✅ Inspection loaded:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error fetching inspection ${id}:`, error);
//     throw error;
//   }
// };

// // Create new inspection
// export const createNewInspection = async (inspectionData) => {
//   try {
//     console.log('📤 Creating new inspection:', inspectionData);
//     const response = await api.post('/new-inspections/create/', inspectionData);
//     console.log('✅ Inspection created successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error creating inspection:', error);
//     throw error;
//   }
// };

// // Update inspection (complete data)
// export const updateInspection = async (id, data) => {
//   try {
//     console.log('🔄 Updating inspection:', id);
//     console.log('📝 Update data:', data);
    
//     const response = await api.patch(`/inspections/${id}/`, data);
//     console.log('✅ Inspection updated successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error updating inspection ${id}:`, error);
//     throw error;
//   }
// };

// // Update inspection status
// export const updateInspectionStatus = async (id, status) => {
//   try {
//     console.log('📝 Updating inspection status:', id, status);
//     const response = await api.patch(`/api/inspections/${id}/`, { status });
//     console.log('✅ Status updated successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error updating status for inspection ${id}:`, error);
//     /////////debug////////////
//      if (error.response) {
//       console.error('📊 Error Response Status:', error.response.status);
//       console.error('📊 Error Response Data:', error.response.data);
//       console.error('📊 Error Response Headers:', error.response.headers);
      
//       // Extract specific validation errors
//       if (error.response.data) {
//         Object.keys(error.response.data).forEach(key => {
//           console.error(`❌ Field Error - ${key}:`, error.response.data[key]);
//         });
//       }
//     } else if (error.request) {
//       console.error('❌ No response received:', error.request);
//     } else {
//       console.error('❌ Error setting up request:', error.message);
//     }
//     /////////////////end debug/////////
//     throw error;
//   }
// };

// // Delete inspection
// export const deleteInspection = async (id) => {
//   try {
//     console.log('🗑️ Deleting inspection:', id);
//     const response = await api.delete(`/inspections/${id}/`);
//     console.log('✅ Inspection deleted successfully');
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error deleting inspection ${id}:`, error);
//     throw error;
//   }
// };

// // Duplicate inspection
// export const duplicateInspection = async (inspectionId) => {
//   try {
//     console.log('📋 Duplicating inspection:', inspectionId);
//     const response = await api.post(`/inspections/${inspectionId}/duplicate/`);
//     console.log('✅ Inspection duplicated successfully');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error duplicating inspection:', error);
//     throw error;
//   }
// };

// // ==================== INSPECTION QUERIES & FILTERS ====================

// // Get inspections by status
// export const getInspectionsByStatus = async (status) => {
//   try {
//     console.log('📋 Fetching inspections with status:', status);
//     const url = status === 'all' 
//       ? '/api/inspections/'
//       : `/api/inspections/?status=${status}`;
    
//     const response = await api.get(url);
//     console.log(`✅ Loaded ${response.data.length} inspections with status: ${status}`);
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error fetching inspections with status ${status}:`, error);
//     return [];
//   }
// };

// // Search inspections
// export const searchInspections = async (query) => {
//   try {
//     console.log('🔍 Searching inspections:', query);
//     const response = await api.get('/inspections/', {
//       params: { search: query }
//     });
//     console.log(`✅ Search found ${response.data.length} inspections`);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error searching inspections:', error);
//     return [];
//   }
// };

// // Get inspections by client name
// export const getInspectionsByClient = async (clientName) => {
//   try {
//     console.log('👤 Fetching inspections for client:', clientName);
//     const response = await api.get('/inspections/', {
//       params: { client_name: clientName }
//     });
//     console.log(`✅ Loaded ${response.data.length} inspections for client: ${clientName}`);
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error fetching inspections for client ${clientName}:`, error);
//     return [];
//   }
// };

// // Get recent inspections
// export const getRecentInspections = async (limit = 10) => {
//   try {
//     console.log('🕒 Fetching recent inspections, limit:', limit);
//     const response = await api.get('/inspections/', {
//       params: { limit, ordering: '-created_at' }
//     });
//     console.log(`✅ Loaded ${response.data.length} recent inspections`);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching recent inspections:', error);
//     return [];
//   }
// };

// // ==================== STATISTICS & ANALYTICS ====================

// // Get inspection statistics for dashboard
// export const getInspectionStats = async () => {
//   try {
//     const response = await api.get('/api/inspections/stats/');
//     console.log('📊 Stats API Response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspection stats:', error);
//     return {
//       all: 0,
//       pending: 0,
//       approved: 0,
//       rejected: 0,
//     };
//   }
// };

// // Get inspector statistics
// export const getInspectorStats = async () => {
//   try {
//     const response = await api.get('/inspections/stats/');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspector stats:', error);
//     return {
//       total: 0,
//       pending: 0,
//       in_progress: 0,
//       completed: 0,
//       approved: 0,
//       rejected: 0,
//     };
//   }
// };

// // Get branch inspection statistics
// export const getBranchInspectionStats = async (branchName) => {
//   try {
//     const response = await api.get('/branch/inspection-stats/', {
//       params: { branch_name: branchName }
//     });
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching branch stats:', error);
//     return {
//       total: 0,
//       pending: 0,
//       in_progress: 0,
//       completed: 0,
//       approved: 0,
//       rejected: 0,
//     };
//   }
// };

// // Get inspection analytics
// export const getInspectionAnalytics = async () => {
//   try {
//     console.log('📈 Fetching inspection analytics');
//     const response = await api.get('/inspections/stats/');
//     console.log('✅ Analytics data loaded:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching analytics:', error);
//     return {};
//   }
// };

// // Get dashboard overview
// export const getDashboardOverview = async () => {
//   try {
//     console.log('📊 Fetching dashboard overview');
//     const response = await api.get('/dashboard/overview/');
//     console.log('✅ Dashboard overview loaded');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching dashboard overview:', error);
//     return {};
//   }
// };
// // ==================== ADMIN SPECIFIC FUNCTIONS ====================

// // Get admin inspection statistics
// export const getAdminInspectionStats = async () => {
//   try {
//     console.log('🔄 Fetching admin inspection stats from API...');
//     const response = await api.get('/admin/inspection-stats/'); // Fixed endpoint
//     console.log('📊 Admin Stats API Response:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching admin inspection stats:', error);
//     return {
//       all: 0,
//       pending: 0,
//       approved: 0,
//       rejected: 0,
//       inProgress: 0,
//       completed: 0,
//       statusDistribution: [],
//       branchWise: [],
//       monthlyTrend: []
//     };
//   }
// };

// // Get admin inspections by status
// export const getAdminInspectionsByStatus = async (status) => {
//   try {
//     console.log('📋 Fetching admin inspections with status:', status);
    
//     const params = {};
//     if (status && status !== 'all') {
//       params.status = status;
//     }
    
//     console.log('🔧 API params:', params);
//     const response = await api.get('/admin/inspections/', { params }); // Fixed endpoint
    
//     console.log(`✅ Loaded ${response.data.length} admin inspections`);
//     console.log('🔍 First inspection status:', response.data.length > 0 ? response.data[0].status : 'No data');
    
//     return response.data;
//   } catch (error) {
//     console.error(`❌ Error fetching admin inspections with status ${status}:`, error);
//     console.error('Error details:', error.response?.data);
//     return [];
//   }
// };

// // Get admin inspection analytics
// export const getAdminInspectionAnalytics = async () => {
//   try {
//     console.log('📈 Fetching admin inspection analytics...');
//     const response = await api.get('/admin/analytics/'); // Fixed endpoint
//     console.log('✅ Admin analytics data loaded:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching admin analytics:', error);
//     return {
//       status_distribution: [],
//       branch_distribution: [],
//       monthly_trend: [],
//       quick_stats: {
//         approval_rate: 0,
//         pending_rate: 0,
//         total_inspections: 0,
//         avg_per_month: 0
//       }
//     };
//   }
// };

// // Get admin inspection by ID
// export const getAdminInspectionById = async (inspectionId) => {
//   try {
//     console.log('🔄 Fetching admin inspection details:', inspectionId);
//     const response = await api.get(`/admin/inspections/${inspectionId}/`); // Fixed endpoint
//     console.log('✅ Raw API response:', response.data);
    
//     const inspection = response.data;
    
//     // Process media files with proper base64 and file path handling
//     const processMediaField = (field, fieldName) => {
//       console.log(`🔄 Processing ${fieldName}:`, field);
      
//       if (!field) {
//         console.log(`📭 ${fieldName} is empty`);
//         return [];
//       }
      
//       if (Array.isArray(field)) {
//         console.log(`✅ ${fieldName} is already an array with ${field.length} items`);
//         return field.map((item, index) => {
//           // Handle base64 photos
//           if (fieldName === 'site_photos') {
//             if (item.base64_data) {
//               console.log(`🖼️ ${fieldName}[${index}] has base64 data`);
//               return {
//                 url: item.base64_data.startsWith('data:') ? item.base64_data : `data:image/jpeg;base64,${item.base64_data}`,
//                 name: item.file_name || `Photo ${index + 1}`,
//                 type: 'photo',
//                 file_size: item.file_size,
//                 ...item
//               };
//             }
//           }
          
//           // Handle document file paths
//           if (fieldName === 'uploaded_documents') {
//             if (item.file_path) {
//               console.log(`📄 ${fieldName}[${index}] has file path:`, item.file_path);
//               return {
//                 url: item.file_path,
//                 name: item.file_name || `Document ${index + 1}`,
//                 type: 'document',
//                 file_size: item.file_size,
//                 ...item
//               };
//             }
//           }
          
//           // Handle video files
//           if (fieldName === 'site_video') {
//             if (item.file_path || item.base64_data) {
//               console.log(`🎥 ${fieldName}[${index}] has video data`);
//               const videoUrl = item.file_path || 
//                 (item.base64_data?.startsWith('data:') ? item.base64_data : `data:video/mp4;base64,${item.base64_data}`);
//               return {
//                 url: videoUrl,
//                 name: item.file_name || `Video ${index + 1}`,
//                 type: 'video',
//                 file_size: item.file_size,
//                 ...item
//               };
//             }
//           }
          
//           // Fallback for any other format
//           if (typeof item === 'string') {
//             console.log(`📝 ${fieldName}[${index}] is string:`, item);
//             return {
//               url: item,
//               name: `Item ${index + 1}`,
//               type: fieldName.includes('photo') ? 'photo' : 
//                     fieldName.includes('video') ? 'video' : 'document'
//             };
//           } else if (typeof item === 'object' && item !== null) {
//             console.log(`📦 ${fieldName}[${index}] is object:`, item);
//             return {
//               url: item.url || item.file_path || item.base64_data,
//               name: item.file_name || item.name || `Item ${index + 1}`,
//               type: fieldName.includes('photo') ? 'photo' : 
//                     fieldName.includes('video') ? 'video' : 'document',
//               file_size: item.file_size,
//               ...item
//             };
//           } else {
//             console.log(`❓ ${fieldName}[${index}] unknown type:`, typeof item, item);
//             return {
//               url: '',
//               name: `Unknown Item ${index + 1}`,
//               type: 'unknown'
//             };
//           }
//         });
//       } else {
//         console.log(`⚠️ ${fieldName} is not an array:`, typeof field, field);
//         return [];
//       }
//     };

//     // Process each media field
//     inspection.site_photos = processMediaField(inspection.site_photos, 'site_photos');
//     inspection.site_video = processMediaField(inspection.site_video, 'site_video');
//     inspection.uploaded_documents = processMediaField(inspection.uploaded_documents, 'uploaded_documents');

//     console.log('🎯 Final processed inspection data:', {
//       id: inspection.id,
//       client_name: inspection.client_name,
//       photos: inspection.site_photos?.map(p => ({ name: p.name, type: p.type, hasUrl: !!p.url })),
//       videos: inspection.site_video?.map(v => ({ name: v.name, type: v.type, hasUrl: !!v.url })),
//       documents: inspection.uploaded_documents?.map(d => ({ name: d.name, type: d.type, hasUrl: !!d.url }))
//     });

//     return inspection;
//   } catch (error) {
//     console.error('❌ Error fetching admin inspection:', error);
//     console.error('Error response:', error.response?.data);
//     throw error;
//   }
// };

// // Get all inspectors for admin
// export const getAdminInspectors = async () => {
//   try {
//     console.log('🔄 Fetching all inspectors...');
//     const response = await api.get('/admin/inspectors/'); // Fixed endpoint
//     console.log('✅ Inspectors loaded:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspectors:', error);
//     console.error('Error details:', error.response?.data);
//     throw error;
//   }
// };




// // ==================== MEDIA & DOCUMENT FUNCTIONS ====================

// // Upload documents for inspection
// export const uploadInspectionDocuments = async (inspectionId, documents) => {
//   try {
//     console.log('📎 Uploading documents for inspection:', inspectionId);
    
//     const formData = new FormData();
//     documents.forEach((file, index) => {
//       formData.append('documents', file);
//     });

//     const response = await api.post(`/inspections/${inspectionId}/upload_documents/`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     });
    
//     console.log('✅ Documents uploaded successfully');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error uploading documents:', error);
//     throw error;
//   }
// };

// // ==================== BULK OPERATIONS ====================

// // Bulk update inspection status
// export const bulkUpdateInspectionStatus = async (inspectionIds, status) => {
//   try {
//     console.log('📝 Bulk updating inspections:', inspectionIds, 'to status:', status);
//     const response = await api.post('/inspections/bulk_update_status/', {
//       inspection_ids: inspectionIds,
//       status
//     });
//     console.log('✅ Bulk status update successful');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error in bulk status update:', error);
//     throw error;
//   }
// };

// // ==================== VALIDATION & UTILITIES ====================

// // Validate inspection data
// export const validateInspectionData = (data) => {
//   try {
//     // Check required fields
//     if (!data.client_name || data.client_name.toString().trim() === '') {
//       console.log('❌ Validation failed: Client name is required');
//       return false;
//     }

//     if (!data.industry_name || data.industry_name.toString().trim() === '') {
//       console.log('❌ Validation failed: Industry name is required');
//       return false;
//     }

//     if (!data.branch_name || data.branch_name.toString().trim() === '') {
//       console.log('❌ Validation failed: Branch name is required');
//       return false;
//     }

//     // Check if location data exists
//     if (!data.location_points || data.total_location_points === 0) {
//       console.log('⚠️ Warning: No location data captured');
//     }

//     // Check if photos exist
//     if (!data.site_photos || data.site_photos.length === 0) {
//       console.log('⚠️ Warning: No photos uploaded');
//     }

//     console.log('✅ Inspection data validation passed');
//     return true;
//   } catch (error) {
//     console.log('❌ Error validating inspection data:', error);
//     return false;
//   }
// };

// // ==================== EXPORT & REPORT FUNCTIONS ====================

// // Export inspection data
// export const exportInspectionData = async (inspectionId, format = 'pdf') => {
//   try {
//     console.log(`📤 Exporting inspection ${inspectionId} as ${format}`);
//     const response = await api.get(`/inspections/${inspectionId}/export/`, {
//       params: { format },
//       responseType: 'blob'
//     });
//     console.log('✅ Inspection data exported successfully');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error exporting inspection data:', error);
//     throw error;
//   }
// };

// // Download inspection report
// export const downloadInspectionReport = async (inspectionId) => {
//   try {
//     console.log('📥 Downloading inspection report:', inspectionId);
//     const response = await api.get(`/inspections/${inspectionId}/report/`, {
//       responseType: 'blob'
//     });
//     console.log('✅ Inspection report downloaded');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error downloading inspection report:', error);
//     throw error;
//   }
// };

// // ==================== INSPECTION DETAILS & META DATA ====================

// // Get inspection timeline
// export const getInspectionTimeline = async (inspectionId) => {
//   try {
//     console.log('📅 Fetching inspection timeline:', inspectionId);
//     const response = await api.get(`/inspections/${inspectionId}/timeline/`);
//     console.log(`✅ Timeline loaded with ${response.data.length} events`);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspection timeline:', error);
//     return [];
//   }
// };

// // Get inspection summary
// export const getInspectionSummary = async (inspectionId) => {
//   try {
//     console.log('📄 Fetching inspection summary:', inspectionId);
//     const response = await api.get(`/inspections/${inspectionId}/summary/`);
//     console.log('✅ Inspection summary loaded');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspection summary:', error);
//     return null;
//   }
// };

// // Get inspection progress
// export const getInspectionProgress = async (inspectionId) => {
//   try {
//     console.log('📈 Fetching inspection progress:', inspectionId);
//     const response = await api.get(`/inspections/${inspectionId}/progress/`);
//     console.log('✅ Inspection progress loaded');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspection progress:', error);
//     return {};
//   }
// };

// // Get inspection history
// export const getInspectionHistory = async (inspectionId) => {
//   try {
//     console.log('📖 Fetching inspection history:', inspectionId);
//     const response = await api.get(`/inspections/${inspectionId}/history/`);
//     console.log(`✅ Loaded ${response.data.length} history entries`);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspection history:', error);
//     return [];
//   }
// };

// // ==================== COMMENTS & COMMUNICATION ====================

// // Get inspection comments
// export const getInspectionComments = async (inspectionId) => {
//   try {
//     console.log('💬 Fetching inspection comments:', inspectionId);
//     const response = await api.get(`/inspections/${inspectionId}/comments/`);
//     console.log(`✅ Loaded ${response.data.length} comments`);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspection comments:', error);
//     return [];
//   }
// };

// // Add inspection comment
// export const addInspectionComment = async (inspectionId, comment) => {
//   try {
//     console.log('➕ Adding inspection comment:', inspectionId);
//     const response = await api.post(`/inspections/${inspectionId}/comments/`, {
//       comment
//     });
//     console.log('✅ Comment added successfully');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error adding inspection comment:', error);
//     throw error;
//   }
// };

// // ==================== TEMPLATES ====================

// // Get inspection templates
// export const getInspectionTemplates = async () => {
//   try {
//     console.log('📝 Fetching inspection templates');
//     const response = await api.get('/inspection-templates/');
//     console.log(`✅ Loaded ${response.data.length} templates`);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching inspection templates:', error);
//     return [];
//   }
// };

// // Create inspection from template
// export const createInspectionFromTemplate = async (templateId, inspectionData) => {
//   try {
//     console.log('🎨 Creating inspection from template:', templateId);
//     const response = await api.post(`/inspection-templates/${templateId}/create-inspection/`, inspectionData);
//     console.log('✅ Inspection created from template');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error creating inspection from template:', error);
//     throw error;
//   }
// };

// // ==================== NOTIFICATIONS ====================

// // Get notifications
// export const getNotifications = async () => {
//   try {
//     console.log('🔔 Fetching notifications');
//     const response = await api.get('/notifications/');
//     console.log(`✅ Loaded ${response.data.length} notifications`);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error fetching notifications:', error);
//     return [];
//   }
// };

// // Mark notification as read
// export const markNotificationAsRead = async (notificationId) => {
//   try {
//     console.log('📭 Marking notification as read:', notificationId);
//     const response = await api.patch(`/notifications/${notificationId}/mark-read/`);
//     console.log('✅ Notification marked as read');
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error marking notification as read:', error);
//     throw error;
//   }
// };

// export default {
//   // User & Auth
//   getCurrentUser,
//   getUserProfile,
//   refreshToken,
//   isAuthenticated,
//   logout,
//   getBranchName,
//   saveBranchName,

//   // Inspection CRUD
//   getNewInspections,
//   getAllInspections,
//   getInspectionById,
//   createNewInspection,
//   updateInspection,
//   updateInspectionStatus,
//   deleteInspection,
//   duplicateInspection,

//   // Queries & Filters
//   getInspectionsByStatus,
//   searchInspections,
//   getInspectionsByClient,
//   getRecentInspections,

//   // Statistics & Analytics
//   getInspectionStats,
//   getInspectorStats,
//   getBranchInspectionStats,
//   getInspectionAnalytics,
//   getDashboardOverview,

//   // Admin Functions
//   getAdminInspectionStats,
//   getAdminInspectionsByStatus,
//   getAdminInspectionAnalytics,
//   getAdminInspectionById,
//   getAdminInspectors,

//   // Media & Documents
//   uploadInspectionDocuments,

//   // Bulk Operations
//   bulkUpdateInspectionStatus,

//   // Validation & Utilities
//   validateInspectionData,

//   // Export & Reports
//   exportInspectionData,
//   downloadInspectionReport,

//   // Inspection Details
//   getInspectionTimeline,
//   getInspectionSummary,
//   getInspectionProgress,
//   getInspectionHistory,

//   // Comments & Communication
//   getInspectionComments,
//   addInspectionComment,

//   // Templates
//   getInspectionTemplates,
//   createInspectionFromTemplate,

//   // Notifications
//   getNotifications,
//   markNotificationAsRead
// };























// src/services/inspectionService.js
import axios from 'axios'; // এইটা যোগ করুন
import api from './api';

// ==================== USER & AUTHENTICATION FUNCTIONS ====================

// Get current user information
export const getCurrentUser = async () => {
  try {
    console.log('👤 Fetching current user information');
    const response = await api.get('/current-user/');
    console.log('✅ Current user loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching current user:', error);
    throw error;
  }
};

// Get user profile
export const getUserProfile = async () => {
  try {
    console.log('👤 Fetching user profile');
    const response = await api.get('/users/me/');
    console.log('✅ User profile loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching user profile:', error);
    throw error;
  }
};

// Refresh token
export const refreshToken = async () => {
  try {
    console.log('🔄 Refreshing token');
    const refreshToken = localStorage.getItem('refresh');
    
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await api.post('/token/refresh/', {
      refresh: refreshToken
    });
    
    const newAccessToken = response.data.access;
    localStorage.setItem('access', newAccessToken);
    
    console.log('✅ Token refreshed successfully');
    return newAccessToken;
  } catch (error) {
    console.error('❌ Error refreshing token:', error);
    throw error;
  }
};

// Check authentication
export const isAuthenticated = async () => {
  try {
    const token = localStorage.getItem('access');
    if (!token) return false;

    // Verify token by making a simple API call
    await api.get('/users/me/');
    return true;
  } catch (error) {
    console.error('❌ Authentication check failed:', error);
    return false;
  }
};

// Logout
export const logout = () => {
  try {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('branch_name');
    localStorage.removeItem('user_role');
    console.log('✅ User logged out successfully');
  } catch (error) {
    console.error('❌ Error during logout:', error);
  }
};

// Get branch name
export const getBranchName = () => {
  return localStorage.getItem('branch_name');
};

// Save branch name
export const saveBranchName = (branchName) => {
  localStorage.setItem('branch_name', branchName);
  console.log('✅ Branch name saved:', branchName);
};

// ==================== BRANCH SPECIFIC FUNCTIONS ====================

// Get inspectors for a specific branch - UPDATED VERSION
export const getBranchInspectors = async (branchName) => {
  try {
    console.log('🔄 Fetching inspectors for branch:', branchName);
    
    // Try multiple possible endpoints
    const endpoints = [
      `/branch/inspectors/?branch_name=${branchName}`,
      `/api/branch/inspectors/?branch_name=${branchName}`,
      `/inspectors/?branch_name=${branchName}`,
      `/api/inspectors/?branch_name=${branchName}`
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔧 Trying endpoint: ${endpoint}`);
        const response = await api.get(endpoint);
        console.log('✅ Branch inspectors loaded:', response.data);
        return response.data;
      } catch (endpointError) {
        console.log(`⚠️ Endpoint failed: ${endpoint}`, endpointError.message);
        continue;
      }
    }

    // If all endpoints fail, try to get all inspectors and filter
    console.log('🔄 All branch endpoints failed, trying admin endpoint with filtering...');
    try {
      const allInspectors = await getAdminInspectors();
      
      // Filter inspectors by branch (check multiple possible field names)
      const branchInspectors = allInspectors.filter(inspector => {
        const inspectorBranch = inspector.branch_name || inspector.branch || inspector.branchName;
        return inspectorBranch === branchName;
      });
      
      console.log(`✅ Filtered ${branchInspectors.length} inspectors for branch ${branchName}`);
      return branchInspectors;
    } catch (adminError) {
      console.error('❌ Admin endpoint also failed:', adminError);
      throw new Error(`Unable to fetch inspectors for branch ${branchName}. Please check your permissions and API endpoints.`);
    }

  } catch (error) {
    console.error('❌ Error fetching branch inspectors:', error);
    throw new Error(`Failed to load inspectors: ${error.message}`);
  }
};

// Get branch inspection statistics - ADDED THIS FUNCTION
export const getBranchInspectionStats = async (branchName) => {
  try {
    console.log('📊 Fetching branch inspection stats for:', branchName);
    
    // Try multiple endpoints for branch stats
    const endpoints = [
      `/branch/inspection-stats/?branch_name=${branchName}`,
      `/api/branch/inspection-stats/?branch_name=${branchName}`,
      `/inspections/stats/?branch_name=${branchName}`,
      `/api/inspections/stats/?branch_name=${branchName}`
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔧 Trying stats endpoint: ${endpoint}`);
        const response = await api.get(endpoint);
        console.log('✅ Branch stats loaded:', response.data);
        return response.data;
      } catch (endpointError) {
        console.log(`⚠️ Stats endpoint failed: ${endpoint}`, endpointError.message);
        continue;
      }
    }

    // If all endpoints fail, fallback to calculating from all inspections
    console.log('🔄 All stats endpoints failed, calculating from inspections...');
    try {
      const allInspections = await getAllInspections();
      const branchInspections = allInspections.filter(inspection => 
        inspection.branch_name === branchName
      );

      const stats = {
        total: branchInspections.length,
        pending: branchInspections.filter(i => i.status === 'Pending').length,
        in_progress: branchInspections.filter(i => i.status === 'In Progress').length,
        completed: branchInspections.filter(i => i.status === 'Completed').length,
        approved: branchInspections.filter(i => i.status === 'Approved').length,
        rejected: branchInspections.filter(i => i.status === 'Rejected').length
      };

      console.log('✅ Calculated branch stats:', stats);
      return stats;

    } catch (calcError) {
      console.error('❌ Error calculating branch stats:', calcError);
      throw new Error(`Failed to load branch statistics: ${calcError.message}`);
    }

  } catch (error) {
    console.error('❌ Error fetching branch inspection stats:', error);
    throw new Error(`Failed to load branch statistics: ${error.message}`);
  }
};

// ==================== INSPECTION CRUD OPERATIONS ====================

// Get NEW inspections (assigned inspections)
export const getNewInspections = async () => {
  try {
    console.log('🔄 Fetching NEW inspections from API...');
    const response = await api.get('/new-inspections/list/');
    console.log('✅ New inspections loaded:', response.data);
    console.log('📊 Total new inspections:', response.data.length);
    
    // Debug: Show first inspection details
    if (response.data.length > 0) {
      console.log('🔍 Sample inspection:', {
        id: response.data[0].id,
        project: response.data[0].project,
        assigned_inspector: response.data[0].assigned_inspector,
        status: response.data[0].status,
        client_name: response.data[0].client_name
      });
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching new inspections:', error);
    console.error('Error details:', error.response?.data);
    throw new Error(`Failed to load inspections: ${error.message}`);
  }
};

// Get all inspections (existing inspections)
// src/services/inspectionService.js - FIXED VERSION
export const getAllInspections = async (filters = {}) => {
  try {
    console.log('🔄 [GET ALL INSPECTIONS] Fetching from multiple sources...');
    
    let allInspections = [];
    
    // ✅ GET FROM NEW INSPECTIONS (where your actual data is)
    try {
      const newInspections = await getNewInspections();
      console.log(`✅ Found ${newInspections.length} new inspections`);
      allInspections = [...allInspections, ...newInspections];
    } catch (error) {
      console.log('❌ Failed to get new inspections:', error.message);
    }
    
    // ✅ GET FROM REGULAR INSPECTIONS (existing endpoint)
    try {
      const response = await api.get('/inspections/', { params: filters });
      console.log(`✅ Found ${response.data.length} regular inspections`);
      allInspections = [...allInspections, ...response.data];
    } catch (error) {
      console.log('❌ Failed to get regular inspections:', error.message);
    }
    
    // Remove duplicates by ID
    const uniqueInspections = allInspections.filter((insp, index, self) => 
      index === self.findIndex(i => i.id === insp.id)
    );
    
    console.log(`📋 Total unique inspections loaded: ${uniqueInspections.length}`);
    
    // Debug: Show first few inspections
    if (uniqueInspections.length > 0) {
      console.log('🔍 Sample inspections:', uniqueInspections.slice(0, 3).map(i => ({
        id: i.id,
        client: i.client_name,
        project: i.project,
        status: i.status
      })));
    }
    
    return uniqueInspections;
  } catch (error) {
    console.error('❌ Error fetching all inspections:', error);
    throw new Error(`Failed to load inspections: ${error.message}`);
  }
};

// Get inspection by ID
export const getInspectionById = async (id) => {
  try {
    console.log('🔄 Fetching inspection:', id);
    const response = await api.get(`/inspections/${id}/`);
    console.log('✅ Inspection loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching inspection ${id}:`, error);
    throw error;
  }
};

// Create new inspection
export const createNewInspection = async (inspectionData) => {
  try {
    console.log('📤 Creating new inspection:', inspectionData);
    
    // Ensure the data is properly formatted
    const formattedData = {
      project: inspectionData.project,
      client_name: inspectionData.client_name,
      industry_name: inspectionData.industry_name,
      phone_number: inspectionData.phone_number,
      assigned_inspector: inspectionData.assigned_inspector,
      branch_name: inspectionData.branch_name,
      status: inspectionData.status || 'Pending'
    };
    
    console.log('📝 Formatted inspection data:', formattedData);
    
    const response = await api.post('/new-inspections/create/', formattedData);
    console.log('✅ Inspection created successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error creating inspection:', error);
    
    // Detailed error logging
    if (error.response) {
      console.error('📊 Error Response Status:', error.response.status);
      console.error('📊 Error Response Data:', error.response.data);
      
      // If it's a validation error, show specific field errors
      if (error.response.data && typeof error.response.data === 'object') {
        Object.keys(error.response.data).forEach(key => {
          console.error(`❌ Field Error - ${key}:`, error.response.data[key]);
        });
      }
    } else if (error.request) {
      console.error('❌ No response received:', error.request);
    } else {
      console.error('❌ Error setting up request:', error.message);
    }
    
    throw error;
  }
};










// // Update inspection (complete data)
// // Update inspection (complete data)
// export const updateInspection = async (id, data) => {
//   try {
//     console.log('🔄 Updating inspection:', id);
//     console.log('📝 Update data:', data);
    
//     // Try multiple endpoints for compatibility
//     const endpoints = [
//       // `/api/inspections/${id}/`,
//       `/inspections/${id}/`
//     ];

//     let lastError;
//     for (const endpoint of endpoints) {
//       try {
//         console.log(`🔧 Trying endpoint: ${endpoint}`);
//         const response = await api.patch(endpoint, data);
//         console.log('✅ Inspection updated successfully:', response.data);
//         return response.data;
//       } catch (error) {
//         console.log(`⚠️ Endpoint failed: ${endpoint}`, error.message);
//         lastError = error;
//         continue;
//       }
//     }

//     // If all endpoints fail, throw the last error
//     throw lastError;
//   } catch (error) {
//     console.error(`❌ Error updating inspection ${id}:`, error);
    
//     // Provide more detailed error information
//     if (error.response) {
//       console.error('📊 Error Response Status:', error.response.status);
//       console.error('📊 Error Response Data:', error.response.data);
//       console.error('📊 Error Response Headers:', error.response.headers);
//     } else if (error.request) {
//       console.error('❌ No response received:', error.request);
//     } else {
//       console.error('❌ Error setting up request:', error.message);
//     }
    
//     throw error;
//   }
// };

// src/services/inspectionService.js
// Update inspection (complete data)
// Update inspection (complete data)
export const updateInspection = async (id, data) => {
  try {
    console.log('🔄 Updating inspection:', id);
    console.log('📝 Update data structure:', Object.keys(data));
    
    // 🔥 IMPORTANT: Check if this is a NewInspection or regular Inspection
    const isNewInspection = data.is_new_inspection || 
                          (inspection && inspection.is_new_inspection) || 
                          data.project === 'New Inspection';
    
    // 🔥 Prepare data based on model type
    let preparedData = { ...data };
    
    if (isNewInspection) {
      console.log('🎯 This appears to be a NewInspection');
      
      // For NewInspection, ensure required fields
      preparedData = {
        client_name: data.client_name || '',
        industry_name: data.industry_name || '',
        phone_number: data.phone_number || '',
        branch_name: data.branch_name || '',
        project: data.project || 'New Inspection',
        status: data.status || 'pending',
        assigned_inspector: data.assigned_inspector || data.inspector || 1, // 🔥 REQUIRED FIELD
      };
      
      console.log('📦 Prepared NewInspection data:', preparedData);
      
      // Try NewInspection update endpoint
      try {
        const response = await api.patch(`/new-inspections/${id}/`, preparedData);
        console.log('✅ NewInspection updated successfully');
        return response.data;
      } catch (newError) {
        console.log('⚠️ NewInspection update failed, trying conversion...');
        
        // If update fails, try to convert to full inspection
        if (newError.response?.status === 400 || newError.response?.status === 404) {
          try {
            const convertResponse = await api.post(`/new-inspections/${id}/convert/`, data);
            console.log('✅ Successfully converted to full inspection');
            return convertResponse.data;
          } catch (convertError) {
            console.log('❌ Conversion also failed:', convertError.message);
            throw convertError;
          }
        }
        throw newError;
      }
      
    } else {
      console.log('🎯 This appears to be a regular Inspection');
      
      // For regular Inspection, remove NewInspection specific fields
      delete preparedData.assigned_inspector;
      delete preparedData.is_new_inspection;
      
      console.log('📦 Prepared Inspection data:', {
        client: preparedData.client_name,
        inspector: preparedData.inspector,
        fields: Object.keys(preparedData).length
      });
      
      // Try regular inspection endpoints
      const endpoints = [
        `/api/inspections/${id}/`,
        `/inspections/${id}/`
      ];

      let lastError;
      for (const endpoint of endpoints) {
        try {
          console.log(`🔧 Trying endpoint: ${endpoint}`);
          const response = await api.patch(endpoint, preparedData);
          console.log('✅ Inspection updated successfully');
          return response.data;
        } catch (error) {
          console.log(`⚠️ Endpoint failed: ${endpoint}`, error.message);
          lastError = error;
          continue;
        }
      }

      throw lastError;
    }
    
  } catch (error) {
    console.error(`❌ Error updating inspection ${id}:`, error);
    
    // Provide more detailed error information
    if (error.response) {
      console.error('📊 Error Response Status:', error.response.status);
      console.error('📊 Error Response Data:', error.response.data);
      console.error('📊 Error URL:', error.config?.url);
      
      // Handle specific validation errors
      if (error.response.data && typeof error.response.data === 'object') {
        Object.keys(error.response.data).forEach(key => {
          console.error(`❌ Field Error - ${key}:`, error.response.data[key]);
        });
      }
    }
    
    throw error;
  }
};











// Update inspection status
export const updateInspectionStatus = async (id, status) => {
  try {
    console.log('📝 Updating inspection status:', id, status);
    const response = await api.patch(`/api/inspections/${id}/`, { status });
    console.log('✅ Status updated successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error(`❌ Error updating status for inspection ${id}:`, error);
    throw error;
  }
};

// Delete inspection
export const deleteInspection = async (id) => {
  try {
    console.log('🗑️ Deleting inspection:', id);
    const response = await api.delete(`/inspections/${id}/`);
    console.log('✅ Inspection deleted successfully');
    return response.data;
  } catch (error) {
    console.error(`❌ Error deleting inspection ${id}:`, error);
    throw error;
  }
};

// Duplicate inspection
export const duplicateInspection = async (inspectionId) => {
  try {
    console.log('📋 Duplicating inspection:', inspectionId);
    const response = await api.post(`/inspections/${inspectionId}/duplicate/`);
    console.log('✅ Inspection duplicated successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error duplicating inspection:', error);
    throw error;
  }
};

// ==================== INSPECTION QUERIES & FILTERS ====================

// Get inspections by status
export const getInspectionsByStatus = async (status) => {
  try {
    console.log('📋 Fetching inspections with status:', status);
    const url = status === 'all' 
      ? '/api/inspections/'
      : `/api/inspections/?status=${status}`;
    
    const response = await api.get(url);
    console.log(`✅ Loaded ${response.data.length} inspections with status: ${status}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching inspections with status ${status}:`, error);
    throw new Error(`Failed to load inspections: ${error.message}`);
  }
};

// Search inspections
export const searchInspections = async (query) => {
  try {
    console.log('🔍 Searching inspections:', query);
    const response = await api.get('/inspections/', {
      params: { search: query }
    });
    console.log(`✅ Search found ${response.data.length} inspections`);
    return response.data;
  } catch (error) {
    console.error('❌ Error searching inspections:', error);
    throw new Error(`Search failed: ${error.message}`);
  }
};

// Get inspections by client name
export const getInspectionsByClient = async (clientName) => {
  try {
    console.log('👤 Fetching inspections for client:', clientName);
    const response = await api.get('/inspections/', {
      params: { client_name: clientName }
    });
    console.log(`✅ Loaded ${response.data.length} inspections for client: ${clientName}`);
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching inspections for client ${clientName}:`, error);
    throw new Error(`Failed to load client inspections: ${error.message}`);
  }
};

// Get recent inspections
export const getRecentInspections = async (limit = 10) => {
  try {
    console.log('🕒 Fetching recent inspections, limit:', limit);
    const response = await api.get('/inspections/', {
      params: { limit, ordering: '-created_at' }
    });
    console.log(`✅ Loaded ${response.data.length} recent inspections`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching recent inspections:', error);
    throw new Error(`Failed to load recent inspections: ${error.message}`);
  }
};

// ==================== STATISTICS & ANALYTICS ====================

// Get inspection statistics for dashboard
// src/services/inspectionService.js - FIXED VERSION
export const getInspectionStats = async () => {
  try {
    console.log('🔄 [STATS] Calculating stats from all sources...');
    
    // Get all inspections from both sources
    const allInspections = await getAllInspections();
    
    const stats = {
      total: allInspections.length,
      pending: allInspections.filter(i => i.status === 'pending' || i.status === 'Pending').length,
      in_progress: allInspections.filter(i => i.status === 'in_progress' || i.status === 'In Progress').length,
      completed: allInspections.filter(i => i.status === 'completed' || i.status === 'Completed').length,
      approved: allInspections.filter(i => i.status === 'approved' || i.status === 'Approved').length,
      rejected: allInspections.filter(i => i.status === 'rejected' || i.status === 'Rejected').length,
    };
    
    console.log('📊 [STATS] Final stats:', stats);
    return stats;
  } catch (error) {
    console.error('❌ Error fetching inspection stats:', error);
    
    // Fallback to API if calculation fails
    try {
      const response = await api.get('/api/inspections/stats/');
      console.log('📊 [STATS] Using API stats:', response.data);
      return response.data;
    } catch (apiError) {
      console.error('❌ API stats also failed:', apiError);
      // Return default stats
      return {
        total: 0,
        pending: 0,
        in_progress: 0,
        completed: 0,
        approved: 0,
        rejected: 0
      };
    }
  }
};
// Get inspector statistics
export const getInspectorStats = async () => {
  try {
    const response = await api.get('/inspections/stats/');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching inspector stats:', error);
    throw new Error(`Failed to load inspector statistics: ${error.message}`);
  }
};

// Get inspection analytics
export const getInspectionAnalytics = async () => {
  try {
    console.log('📈 Fetching inspection analytics');
    const response = await api.get('/inspections/stats/');
    console.log('✅ Analytics data loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching analytics:', error);
    throw new Error(`Failed to load analytics: ${error.message}`);
  }
};

// Get dashboard overview
export const getDashboardOverview = async () => {
  try {
    console.log('📊 Fetching dashboard overview');
    const response = await api.get('/dashboard/overview/');
    console.log('✅ Dashboard overview loaded');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching dashboard overview:', error);
    throw new Error(`Failed to load dashboard overview: ${error.message}`);
  }
};

// ==================== ADMIN SPECIFIC FUNCTIONS ====================

// Get admin inspection statistics
export const getAdminInspectionStats = async () => {
  try {
    console.log('🔄 Fetching admin inspection stats from API...');
    const response = await api.get('/admin/inspection-stats/');
    console.log('📊 Admin Stats API Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching admin inspection stats:', error);
    throw new Error(`Failed to load admin statistics: ${error.message}`);
  }
};

// Get admin inspections by status
export const getAdminInspectionsByStatus = async (status) => {
  try {
    console.log('📋 Fetching admin inspections with status:', status);
    
    const params = {};
    if (status && status !== 'all') {
      params.status = status;
    }
    
    console.log('🔧 API params:', params);
    const response = await api.get('/admin/inspections/', { params });
    
    console.log(`✅ Loaded ${response.data.length} admin inspections`);
    console.log('🔍 First inspection status:', response.data.length > 0 ? response.data[0].status : 'No data');
    
    return response.data;
  } catch (error) {
    console.error(`❌ Error fetching admin inspections with status ${status}:`, error);
    console.error('Error details:', error.response?.data);
    throw new Error(`Failed to load admin inspections: ${error.message}`);
  }
};

// Get admin inspection analytics
export const getAdminInspectionAnalytics = async () => {
  try {
    console.log('📈 Fetching admin inspection analytics...');
    const response = await api.get('/admin/analytics/');
    console.log('✅ Admin analytics data loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching admin analytics:', error);
    throw new Error(`Failed to load admin analytics: ${error.message}`);
  }
};

// Get admin inspection by ID
export const getAdminInspectionById = async (inspectionId) => {
  try {
    console.log('🔄 Fetching admin inspection details:', inspectionId);
    const response = await api.get(`/admin/inspections/${inspectionId}/`);
    console.log('✅ Raw API response:', response.data);
    
    const inspection = response.data;
    
    // Process media files with proper base64 and file path handling
    const processMediaField = (field, fieldName) => {
      console.log(`🔄 Processing ${fieldName}:`, field);
      
      if (!field) {
        console.log(`📭 ${fieldName} is empty`);
        return [];
      }
      
      if (Array.isArray(field)) {
        console.log(`✅ ${fieldName} is already an array with ${field.length} items`);
        return field.map((item, index) => {
          // Handle base64 photos
          if (fieldName === 'site_photos') {
            if (item.base64_data) {
              console.log(`🖼️ ${fieldName}[${index}] has base64 data`);
              return {
                url: item.base64_data.startsWith('data:') ? item.base64_data : `data:image/jpeg;base64,${item.base64_data}`,
                name: item.file_name || `Photo ${index + 1}`,
                type: 'photo',
                file_size: item.file_size,
                ...item
              };
            }
          }
          
          // Handle document file paths
          if (fieldName === 'uploaded_documents') {
            if (item.file_path) {
              console.log(`📄 ${fieldName}[${index}] has file path:`, item.file_path);
              return {
                url: item.file_path,
                name: item.file_name || `Document ${index + 1}`,
                type: 'document',
                file_size: item.file_size,
                ...item
              };
            }
          }
          
          // Handle video files
          if (fieldName === 'site_video') {
            if (item.file_path || item.base64_data) {
              console.log(`🎥 ${fieldName}[${index}] has video data`);
              const videoUrl = item.file_path || 
                (item.base64_data?.startsWith('data:') ? item.base64_data : `data:video/mp4;base64,${item.base64_data}`);
              return {
                url: videoUrl,
                name: item.file_name || `Video ${index + 1}`,
                type: 'video',
                file_size: item.file_size,
                ...item
              };
            }
          }
          
          // Fallback for any other format
          if (typeof item === 'string') {
            console.log(`📝 ${fieldName}[${index}] is string:`, item);
            return {
              url: item,
              name: `Item ${index + 1}`,
              type: fieldName.includes('photo') ? 'photo' : 
                    fieldName.includes('video') ? 'video' : 'document'
            };
          } else if (typeof item === 'object' && item !== null) {
            console.log(`📦 ${fieldName}[${index}] is object:`, item);
            return {
              url: item.url || item.file_path || item.base64_data,
              name: item.file_name || item.name || `Item ${index + 1}`,
              type: fieldName.includes('photo') ? 'photo' : 
                    fieldName.includes('video') ? 'video' : 'document',
              file_size: item.file_size,
              ...item
            };
          } else {
            console.log(`❓ ${fieldName}[${index}] unknown type:`, typeof item, item);
            return {
              url: '',
              name: `Unknown Item ${index + 1}`,
              type: 'unknown'
            };
          }
        });
      } else {
        console.log(`⚠️ ${fieldName} is not an array:`, typeof field, field);
        return [];
      }
    };

    // Process each media field
    inspection.site_photos = processMediaField(inspection.site_photos, 'site_photos');
    inspection.site_video = processMediaField(inspection.site_video, 'site_video');
    inspection.uploaded_documents = processMediaField(inspection.uploaded_documents, 'uploaded_documents');

    console.log('🎯 Final processed inspection data:', {
      id: inspection.id,
      client_name: inspection.client_name,
      photos: inspection.site_photos?.map(p => ({ name: p.name, type: p.type, hasUrl: !!p.url })),
      videos: inspection.site_video?.map(v => ({ name: v.name, type: v.type, hasUrl: !!v.url })),
      documents: inspection.uploaded_documents?.map(d => ({ name: d.name, type: d.type, hasUrl: !!d.url }))
    });

    return inspection;
  } catch (error) {
    console.error('❌ Error fetching admin inspection:', error);
    console.error('Error response:', error.response?.data);
    throw error;
  }
};

// Get all inspectors for admin
export const getAdminInspectors = async () => {
  try {
    console.log('🔄 Fetching all inspectors...');
    
    // Try multiple possible endpoints
    const endpoints = [
      '/admin/inspectors/',
      '/api/admin/inspectors/',
      '/inspectors/',
      '/api/inspectors/'
    ];

    for (const endpoint of endpoints) {
      try {
        console.log(`🔧 Trying admin endpoint: ${endpoint}`);
        const response = await api.get(endpoint);
        console.log('✅ Inspectors loaded:', response.data);
        return response.data;
      } catch (endpointError) {
        console.log(`⚠️ Admin endpoint failed: ${endpoint}`, endpointError.message);
        continue;
      }
    }

    // If all endpoints fail
    throw new Error('All inspector endpoints failed. Please check API availability and permissions.');

  } catch (error) {
    console.error('❌ Error fetching inspectors:', error);
    console.error('Error details:', error.response?.data);
    throw new Error(`Failed to load inspectors: ${error.message}`);
  }
};

// ==================== MEDIA & DOCUMENT FUNCTIONS ====================

// Upload documents for inspection
export const uploadInspectionDocuments = async (inspectionId, documents) => {
  try {
    console.log('📎 Uploading documents for inspection:', inspectionId);
    
    const formData = new FormData();
    documents.forEach((file, index) => {
      formData.append('documents', file);
    });

    const response = await api.post(`/inspections/${inspectionId}/upload_documents/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    console.log('✅ Documents uploaded successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error uploading documents:', error);
    throw error;
  }
};

// ==================== BULK OPERATIONS ====================

// Bulk update inspection status
export const bulkUpdateInspectionStatus = async (inspectionIds, status) => {
  try {
    console.log('📝 Bulk updating inspections:', inspectionIds, 'to status:', status);
    const response = await api.post('/inspections/bulk_update_status/', {
      inspection_ids: inspectionIds,
      status
    });
    console.log('✅ Bulk status update successful');
    return response.data;
  } catch (error) {
    console.error('❌ Error in bulk status update:', error);
    throw error;
  }
};

// ==================== VALIDATION & UTILITIES ====================

// Validate inspection data
export const validateInspectionData = (data) => {
  try {
    // Check required fields
    if (!data.client_name || data.client_name.toString().trim() === '') {
      console.log('❌ Validation failed: Client name is required');
      return false;
    }

    if (!data.industry_name || data.industry_name.toString().trim() === '') {
      console.log('❌ Validation failed: Industry name is required');
      return false;
    }

    if (!data.branch_name || data.branch_name.toString().trim() === '') {
      console.log('❌ Validation failed: Branch name is required');
      return false;
    }

    // Check if location data exists
    if (!data.location_points || data.total_location_points === 0) {
      console.log('⚠️ Warning: No location data captured');
    }

    // Check if photos exist
    if (!data.site_photos || data.site_photos.length === 0) {
      console.log('⚠️ Warning: No photos uploaded');
    }

    console.log('✅ Inspection data validation passed');
    return true;
  } catch (error) {
    console.log('❌ Error validating inspection data:', error);
    return false;
  }
};

// ==================== EXPORT & REPORT FUNCTIONS ====================

// Export inspection data
export const exportInspectionData = async (inspectionId, format = 'pdf') => {
  try {
    console.log(`📤 Exporting inspection ${inspectionId} as ${format}`);
    const response = await api.get(`/inspections/${inspectionId}/export/`, {
      params: { format },
      responseType: 'blob'
    });
    console.log('✅ Inspection data exported successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error exporting inspection data:', error);
    throw error;
  }
};

// Download inspection report
export const downloadInspectionReport = async (inspectionId) => {
  try {
    console.log('📥 Downloading inspection report:', inspectionId);
    const response = await api.get(`/inspections/${inspectionId}/report/`, {
      responseType: 'blob'
    });
    console.log('✅ Inspection report downloaded');
    return response.data;
  } catch (error) {
    console.error('❌ Error downloading inspection report:', error);
    throw error;
  }
};

// ==================== INSPECTION DETAILS & META DATA ====================

// Get inspection timeline
export const getInspectionTimeline = async (inspectionId) => {
  try {
    console.log('📅 Fetching inspection timeline:', inspectionId);
    const response = await api.get(`/inspections/${inspectionId}/timeline/`);
    console.log(`✅ Timeline loaded with ${response.data.length} events`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching inspection timeline:', error);
    throw new Error(`Failed to load timeline: ${error.message}`);
  }
};

// Get inspection summary
export const getInspectionSummary = async (inspectionId) => {
  try {
    console.log('📄 Fetching inspection summary:', inspectionId);
    const response = await api.get(`/inspections/${inspectionId}/summary/`);
    console.log('✅ Inspection summary loaded');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching inspection summary:', error);
    throw new Error(`Failed to load summary: ${error.message}`);
  }
};

// Get inspection progress
export const getInspectionProgress = async (inspectionId) => {
  try {
    console.log('📈 Fetching inspection progress:', inspectionId);
    const response = await api.get(`/inspections/${inspectionId}/progress/`);
    console.log('✅ Inspection progress loaded');
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching inspection progress:', error);
    throw new Error(`Failed to load progress: ${error.message}`);
  }
};

// Get inspection history
export const getInspectionHistory = async (inspectionId) => {
  try {
    console.log('📖 Fetching inspection history:', inspectionId);
    const response = await api.get(`/inspections/${inspectionId}/history/`);
    console.log(`✅ Loaded ${response.data.length} history entries`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching inspection history:', error);
    throw new Error(`Failed to load history: ${error.message}`);
  }
};

// ==================== COMMENTS & COMMUNICATION ====================

// Get inspection comments
export const getInspectionComments = async (inspectionId) => {
  try {
    console.log('💬 Fetching inspection comments:', inspectionId);
    const response = await api.get(`/inspections/${inspectionId}/comments/`);
    console.log(`✅ Loaded ${response.data.length} comments`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching inspection comments:', error);
    throw new Error(`Failed to load comments: ${error.message}`);
  }
};

// Add inspection comment
export const addInspectionComment = async (inspectionId, comment) => {
  try {
    console.log('➕ Adding inspection comment:', inspectionId);
    const response = await api.post(`/inspections/${inspectionId}/comments/`, {
      comment
    });
    console.log('✅ Comment added successfully');
    return response.data;
  } catch (error) {
    console.error('❌ Error adding inspection comment:', error);
    throw error;
  }
};

// ==================== TEMPLATES ====================

// Get inspection templates
export const getInspectionTemplates = async () => {
  try {
    console.log('📝 Fetching inspection templates');
    const response = await api.get('/inspection-templates/');
    console.log(`✅ Loaded ${response.data.length} templates`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching inspection templates:', error);
    throw new Error(`Failed to load templates: ${error.message}`);
  }
};

// Create inspection from template
export const createInspectionFromTemplate = async (templateId, inspectionData) => {
  try {
    console.log('🎨 Creating inspection from template:', templateId);
    const response = await api.post(`/inspection-templates/${templateId}/create-inspection/`, inspectionData);
    console.log('✅ Inspection created from template');
    return response.data;
  } catch (error) {
    console.error('❌ Error creating inspection from template:', error);
    throw error;
  }
};

// ==================== NOTIFICATIONS ====================

// Get notifications
export const getNotifications = async () => {
  try {
    console.log('🔔 Fetching notifications');
    const response = await api.get('/notifications/');
    console.log(`✅ Loaded ${response.data.length} notifications`);
    return response.data;
  } catch (error) {
    console.error('❌ Error fetching notifications:', error);
    throw new Error(`Failed to load notifications: ${error.message}`);
  }
};

// Mark notification as read
export const markNotificationAsRead = async (notificationId) => {
  try {
    console.log('📭 Marking notification as read:', notificationId);
    const response = await api.patch(`/notifications/${notificationId}/mark-read/`);
    console.log('✅ Notification marked as read');
    return response.data;
  } catch (error) {
    console.error('❌ Error marking notification as read:', error);
    throw error;
  }
};


// ==================== BRANCH ADMIN INSPECTION FUNCTIONS ====================

// Get branch admin inspection statistics - STRICTLY BRANCH SPECIFIC
// src/services/inspectionService.js - FIXED VERSION
// src/services/inspectionService.js - ULTIMATE FIX

// Get branch admin inspection statistics - ULTIMATE FIX
export const getBranchAdminInspectionStats = async () => {
  try {
    console.log('🎯 [ULTIMATE STATS] Fetching stats...');
    const response = await api.get('/branch-admin/inspection-stats/');
    console.log('✅ [ULTIMATE STATS] Received:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ [ULTIMATE STATS] Error:', error);
    return { all: 0, pending: 0, inProgress: 0, completed: 0, approved: 0, rejected: 0 };
  }
};

// Get branch admin inspections by status - ULTIMATE FIX
// src/services/inspectionService.js - BRANCH ADMIN SPECIFIC FUNCTIONS

// Get branch admin inspections by status - STRICTLY CURRENT BRANCH ONLY
// src/services/inspectionService.js - CORRECT BRANCH ADMIN FUNCTION

// Get branch admin inspections by status - FIXED VERSION
export const getBranchAdminInspectionsByStatus = async (status = 'all') => {
  try {
    console.log('🎯 [BRANCH INSPECTIONS] Fetching for current branch with status:', status);
    
    const params = {};
    if (status && status !== 'all') {
      params.status = status;
    }
    
    console.log('🔧 [BRANCH INSPECTIONS] API params:', params);
    
    // Use branch-admin specific endpoint
    const response = await api.get('/branch-admin/inspections/', { params });
    
    console.log(`✅ [BRANCH INSPECTIONS] Received ${response.data.length} inspections from API`);
    
    // Get current user for client-side verification
    let currentBranch;
    try {
      const currentUser = await getCurrentUser();
      currentBranch = currentUser.branch_name;
      console.log(`🔍 [BRANCH INSPECTIONS] Current branch: ${currentBranch}`);
    } catch (userError) {
      console.warn('⚠️ [BRANCH INSPECTIONS] Could not get current user, using localStorage');
      currentBranch = localStorage.getItem('branch_name');
    }
    
    // Client-side branch verification
    const branchInspections = response.data.filter(inspection => {
      const matches = inspection.branch_name === currentBranch;
      if (!matches) {
        console.warn(`🚨 [BRANCH INSPECTIONS] Filtered out inspection from different branch:`, {
          id: inspection.id,
          client: inspection.client_name,
          inspection_branch: inspection.branch_name,
          user_branch: currentBranch
        });
      }
      return matches;
    });
    
    console.log(`✅ [BRANCH INSPECTIONS] Final count for branch ${currentBranch}: ${branchInspections.length}`);
    
    return branchInspections;
    
  } catch (error) {
    console.error('❌ [BRANCH INSPECTIONS] Error:', error);
    
    // Fallback: Try to get all and filter by branch
    console.log('🔄 [BRANCH INSPECTIONS] Trying fallback method...');
    try {
      const allInspections = await getAllInspections();
      const currentBranch = localStorage.getItem('branch_name') || (await getCurrentUser()).branch_name;
      
      const branchInspections = allInspections.filter(inspection => 
        inspection.branch_name === currentBranch
      );
      
      // Apply status filter
      let filtered = branchInspections;
      if (status && status !== 'all') {
        filtered = branchInspections.filter(inspection => inspection.status === status);
      }
      
      console.log(`✅ [BRANCH INSPECTIONS] Fallback result: ${filtered.length} inspections`);
      return filtered;
      
    } catch (fallbackError) {
      console.error('❌ [BRANCH INSPECTIONS] Fallback also failed:', fallbackError);
      throw new Error(`Failed to load branch inspections: ${error.message}`);
    }
  }
};
// Get branch admin inspection by ID - STRICTLY CURRENT BRANCH ONLY
export const getBranchAdminInspectionById = async (inspectionId) => {
  try {
    console.log('🔄 [BRANCH ADMIN] Fetching inspection details:', inspectionId);
    const response = await api.get(`/branch-admin/inspections/${inspectionId}/`);
    
    // Verify the inspection belongs to current branch
    const currentUser = await getCurrentUser();
    if (response.data.branch_name !== currentUser.branch_name) {
      throw new Error(`Inspection ${inspectionId} does not belong to your branch (${currentUser.branch_name})`);
    }
    
    console.log('✅ [BRANCH ADMIN] Inspection loaded:', {
      id: response.data.id,
      client_name: response.data.client_name,
      branch_name: response.data.branch_name,
      status: response.data.status
    });
    return response.data;
  } catch (error) {
    console.error('❌ [BRANCH ADMIN] Error fetching inspection:', error);
    throw error;
  }
};


// Update inspection status (branch admin) - ONLY CURRENT BRANCH
// src/services/inspectionService.js - ADD THIS FUNCTION

// Update branch admin inspection status
// src/services/inspectionService.js - CORRECTED URL
// src/services/inspectionService.js - USE CAPITALIZED STATUS
export const updateBranchAdminInspectionStatus = async (inspectionId, status) => {
  try {
    console.log('📝 [BRANCH ADMIN] Updating inspection status:', inspectionId, status);
    
    // Map frontend status to backend expected format
    const statusMap = {
      'pending': 'Pending',
      'in_progress': 'In Progress', 
      'completed': 'Completed',
      'approved': 'Approved',
      'rejected': 'Rejected'
    };
    
    const backendStatus = statusMap[status] || status;
    
    console.log('🔧 [BRANCH ADMIN] Frontend status:', status, '-> Backend status:', backendStatus);
    
    const response = await api.patch(`/branch-admin/inspections/${inspectionId}/update-status/`, {
      status: backendStatus
    });
    
    console.log('✅ [BRANCH ADMIN] Status updated successfully:', response.data);
    return response.data;
    
  } catch (error) {
    console.error('❌ [BRANCH ADMIN] Error updating status:', error);
    
    if (error.response) {
      console.error('📊 Error Response Status:', error.response.status);
      console.error('📊 Error Response Data:', error.response.data);
    }
    
    throw new Error(`Failed to update inspection status: ${error.message}`);
  }
};
/////////////////////////
////end new added/////////////////



// ==================== DEBUG & TROUBLESHOOTING FUNCTIONS ====================

// Comprehensive debug function
export const debugAllInspections = async () => {
  try {
    console.log('🔍 DEBUG: Checking ALL available inspections...');
    
    const endpoints = [
      '/api/inspections/',
      '/inspections/',
      '/new-inspections/list/',
      '/admin/inspections/'
    ];
    
    for (const endpoint of endpoints) {
      try {
        console.log(`\n🔧 Testing endpoint: ${endpoint}`);
        const response = await api.get(endpoint);
        
        console.log(`✅ SUCCESS: Found ${response.data.length} inspections at ${endpoint}`);
        
        if (response.data.length > 0) {
          console.log('📋 Available Inspections:');
          response.data.forEach((inspection, index) => {
            console.log(`   ${index + 1}. ID: ${inspection.id}, Client: "${inspection.client_name}", Status: ${inspection.status}, Branch: ${inspection.branch_name}`);
          });
        } else {
          console.log('📭 No inspections found at this endpoint');
        }
        
      } catch (error) {
        console.log(`⚠️ Failed to access ${endpoint}:`, error.response?.status, error.response?.data);
      }
    }
    
  } catch (error) {
    console.error('❌ Debug failed:', error);
  }
};

// Check authentication status
export const checkAuthStatus = async () => {
  try {
    console.log('🔐 Checking authentication status...');
    
    // Check localStorage tokens
    const accessToken = localStorage.getItem('access');
    const refreshToken = localStorage.getItem('refresh');
    
    console.log('📝 Token status:', {
      hasAccessToken: !!accessToken,
      hasRefreshToken: !!refreshToken,
      accessTokenLength: accessToken?.length,
      user: localStorage.getItem('user_role'),
      branch: localStorage.getItem('branch_name')
    });
    
    // Test authentication
    try {
      const userResponse = await api.get('/users/me/');
      console.log('✅ Authentication valid - Current user:', userResponse.data);
      return true;
    } catch (authError) {
      console.log('❌ Authentication failed:', authError.response?.status);
      return false;
    }
    
  } catch (error) {
    console.error('❌ Auth check failed:', error);
    return false;
  }
};


// src/services/inspectionService.js - এই function টি যোগ করুন

// Universal inspection search - works for both Inspection and NewInspection models
export const getInspectionByIdUniversal = async (id) => {
  try {
    console.log('🔍 [UNIVERSAL] Searching for inspection:', id);
    
    const response = await api.get(`/inspections/universal/${id}/`);
    console.log('✅ [UNIVERSAL] Found inspection:', response.data);
    
    return response.data;
    
  } catch (error) {
    console.error(`❌ [UNIVERSAL] Error fetching inspection ${id}:`, error);
    
    if (error.response?.status === 404) {
      throw new Error(`Inspection ${id} not found in the system`);
    }
    
    throw error;
  }
};









// src/services/inspectionService.js - ADD THESE FUNCTIONS

// Convert NewInspection to full Inspection
export const convertToFullInspection = async (newInspectionId, inspectionData) => {
  try {
    console.log('🔄 Converting NewInspection to full Inspection:', newInspectionId);
    
    const response = await api.post(`/inspections/convert-from-new/${newInspectionId}/`, inspectionData);
    console.log('✅ Successfully converted to full inspection');
    return response.data;
  } catch (error) {
    console.error('❌ Error converting inspection:', error);
    throw error;
  }
};

// Universal inspection submission
export const submitInspectionUniversal = async (inspectionData, originalInspection = null) => {
  try {
    console.log('🌐 Universal inspection submission');
    
    if (originalInspection && originalInspection.is_new_inspection) {
      // Convert NewInspection to full Inspection
      return await convertToFullInspection(originalInspection.id, inspectionData);
    } else if (originalInspection) {
      // Update existing Inspection
      return await updateInspection(originalInspection.id, inspectionData);
    } else {
      // Create brand new Inspection
      return await createNewInspection(inspectionData);
    }
  } catch (error) {
    console.error('❌ Universal submission failed:', error);
    throw error;
  }
};


// Default export with all functions
export default {
  // User & Auth
  getCurrentUser,
  getUserProfile,
  refreshToken,
  isAuthenticated,
  logout,
  getBranchName,
  saveBranchName,

  // Branch Functions
  getBranchInspectors,
  // getBranchInspectionStats, // ADDED THIS

  // Inspection CRUD
  getNewInspections,
  getAllInspections,
  getInspectionById,
  createNewInspection,
  updateInspection,
  updateInspectionStatus,
  deleteInspection,
  duplicateInspection,
  getInspectionByIdUniversal,




  convertToFullInspection,
  submitInspectionUniversal,
  // Queries & Filters
  getInspectionsByStatus,
  searchInspections,
  getInspectionsByClient,
  getRecentInspections,

  // Statistics & Analytics
  getInspectionStats,
  getInspectorStats,
  getBranchInspectionStats, // ADDED THIS HERE TOO
  getInspectionAnalytics,
  getDashboardOverview,

  // Admin Functions
  getAdminInspectionStats,
  getAdminInspectionsByStatus,
  getAdminInspectionAnalytics,
  getAdminInspectionById,
  getAdminInspectors,

  // Media & Documents
  uploadInspectionDocuments,

  // Bulk Operations
  bulkUpdateInspectionStatus,

  // Validation & Utilities
  validateInspectionData,

  // Export & Reports
  exportInspectionData,
  downloadInspectionReport,

  // Inspection Details
  getInspectionTimeline,
  getInspectionSummary,
  getInspectionProgress,
  getInspectionHistory,

  // Comments & Communication
  getInspectionComments,
  addInspectionComment,

  // Templates
  getInspectionTemplates,
  createInspectionFromTemplate,

  // Notifications
  getNotifications,
  markNotificationAsRead,

  
  debugAllInspections,
  checkAuthStatus
};