// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { getAdminInspectionById } from '../../services/inspectionService'; // নতুন function
// // import { useNotification } from '../../context/NotificationContext';

// // const InspectionDetailsPage = () => {
// //   const [inspection, setInspection] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState('basic');
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { showError } = useNotification();

// //   useEffect(() => {
// //     fetchInspectionDetails();
// //   }, [id]);

// //   const fetchInspectionDetails = async () => {
// //     try {
// //       setLoading(true);
// //       console.log('🔄 Fetching admin inspection details:', id);
// //       const data = await getAdminInspectionById(id); // নতুন function use করছি
// //       console.log('✅ Admin inspection details loaded:', data);
// //       setInspection(data);
// //     } catch (error) {
// //       console.error('❌ Error fetching admin inspection:', error);
// //       showError('Failed to fetch inspection details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     const colors = {
// //       'Pending': 'bg-yellow-100 text-yellow-800',
// //       'In Progress': 'bg-blue-100 text-blue-800',
// //       'Completed': 'bg-purple-100 text-purple-800',
// //       'Approved': 'bg-green-100 text-green-800',
// //       'Rejected': 'bg-red-100 text-red-800',
// //     };
// //     return colors[status] || 'bg-gray-100 text-gray-800';
// //   };

// //   const getInspectorName = (inspection) => {
// //     if (inspection.inspector) {
// //       if (typeof inspection.inspector === 'string') {
// //         return inspection.inspector;
// //       } else if (inspection.inspector.username) {
// //         return inspection.inspector.username;
// //       } else if (inspection.inspector.name) {
// //         return inspection.inspector.name;
// //       }
// //     }
// //     return 'N/A';
// //   };

// //   const renderMediaGallery = () => {
// //     if (!inspection) return null;

// //     const allMedia = [
// //       ...(inspection.site_photos || []).map(photo => ({ ...photo, type: 'photo' })),
// //       ...(inspection.site_video || []).map(video => ({ ...video, type: 'video' })),
// //       ...(inspection.uploaded_documents || []).map(doc => ({ ...doc, type: 'document' }))
// //     ];

// //     if (allMedia.length === 0) {
// //       return (
// //         <div className="text-center py-8">
// //           <div className="text-gray-400 text-4xl mb-2">📷</div>
// //           <p className="text-gray-500">No media files available</p>
// //         </div>
// //       );
// //     }

// //     return (
// //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {allMedia.map((media, index) => (
// //           <div key={index} className="border rounded-lg overflow-hidden shadow-sm">
// //             {media.type === 'photo' && (
// //               <img 
// //                 src={media.url} 
// //                 alt={media.caption || 'Site photo'} 
// //                 className="w-full h-48 object-cover"
// //                 onError={(e) => {
// //                   e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
// //                 }}
// //               />
// //             )}
// //             {media.type === 'video' && (
// //               <video 
// //                 src={media.url} 
// //                 controls 
// //                 className="w-full h-48 object-cover"
// //               >
// //                 Your browser does not support the video tag.
// //               </video>
// //             )}
// //             {media.type === 'document' && (
// //               <div className="h-48 flex items-center justify-center bg-gray-100">
// //                 <div className="text-center">
// //                   <div className="text-4xl mb-2">📄</div>
// //                   <p className="text-sm text-gray-600">{media.name || 'Document'}</p>
// //                   <p className="text-xs text-gray-400 mt-1">Click to download</p>
// //                 </div>
// //               </div>
// //             )}
// //             <div className="p-3 bg-white">
// //               <p className="text-sm font-medium text-gray-900 truncate">
// //                 {media.caption || 'No caption'}
// //               </p>
// //               <p className="text-xs text-gray-500 capitalize mt-1">{media.type}</p>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   };

// //   const renderSection = (title, fields) => (
// //     <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// //       <div className="px-4 py-5 sm:px-6 bg-gray-50">
// //         <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
// //       </div>
// //       <div className="border-t border-gray-200">
// //         <dl>
// //           {fields.map(([label, value], index) => (
// //             <div key={index} className={`px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
// //               index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
// //             }`}>
// //               <dt className="text-sm font-medium text-gray-500">{label}</dt>
// //               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
// //                 {value || <span className="text-gray-400">N/A</span>}
// //               </dd>
// //             </div>
// //           ))}
// //         </dl>
// //       </div>
// //     </div>
// //   );

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //         <span className="ml-3 text-gray-600">Loading inspection details...</span>
// //       </div>
// //     );
// //   }

// //   if (!inspection) {
// //     return (
// //       <div className="text-center py-12">
// //         <div className="text-gray-400 text-6xl mb-4">🔍</div>
// //         <h3 className="text-lg font-medium text-gray-900 mb-2">Inspection not found</h3>
// //         <p className="text-gray-500 mb-4">The inspection you're looking for doesn't exist or you don't have permission to view it.</p>
// //         <div className="space-x-3">
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //           >
// //             Go Back
// //           </button>
// //           <button
// //             onClick={() => navigate('/admin/dashboard')}
// //             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
// //           >
// //             Back to Dashboard
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const tabs = [
// //     { id: 'basic', name: 'Basic Info' },
// //     { id: 'client', name: 'Client Info' },
// //     { id: 'owner', name: 'Owner Info' },
// //     { id: 'business', name: 'Business Analysis' },
// //     { id: 'financial', name: 'Financial Info' },
// //     { id: 'media', name: 'Media & Documents' },
// //   ];

// //   return (
// //     <div className="px-4 py-6 sm:px-0 lg:px-8">
// //       <div className="mb-8">
// //         <div className="flex justify-between items-start">
// //           <div className="flex-1">
// //             <div className="flex items-center space-x-3 mb-4">
// //               <button
// //                 onClick={() => navigate(-1)}
// //                 className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //               >
// //                 ← Back
// //               </button>
// //               <button
// //                 onClick={fetchInspectionDetails}
// //                 className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //               >
// //                 Refresh
// //               </button>
// //             </div>
            
// //             <h1 className="text-2xl font-bold text-gray-900">
// //               {inspection.client_name || 'Unnamed Inspection'}
// //             </h1>
            
// //             <div className="mt-3 flex flex-wrap items-center gap-3">
// //               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inspection.status)}`}>
// //                 {inspection.status}
// //               </span>
// //               <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
// //                 Inspector: {getInspectorName(inspection)}
// //               </span>
// //               <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
// //                 Branch: {inspection.branch_name || 'N/A'}
// //               </span>
// //               <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
// //                 ID: {inspection.id}
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Debug Info - Remove in production */}
// //       <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
// //         <div className="text-blue-700 text-sm">
// //           <strong>Debug:</strong> Inspection ID: {inspection.id} | Client: {inspection.client_name} | Status: {inspection.status}
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <div className="border-b border-gray-200 mb-6">
// //         <nav className="-mb-px flex space-x-8 overflow-x-auto">
// //           {tabs.map((tab) => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
// //                 activeTab === tab.id
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               {tab.name}
// //             </button>
// //           ))}
// //         </nav>
// //       </div>

// //       {/* Tab Content */}
// //       <div className="mb-8">
// //         {activeTab === 'basic' && (
// //           <div>
// //             {renderSection('Basic Information', [
// //               ['Client Name', inspection.client_name],
// //               ['Industry', inspection.industry_name],
// //               ['Branch', inspection.branch_name],
// //               ['Status', inspection.status],
// //               ['Inspector', getInspectorName(inspection)],
// //               ['Created', inspection.created_at ? new Date(inspection.created_at).toLocaleString() : 'N/A'],
// //               ['Last Updated', inspection.updated_at ? new Date(inspection.updated_at).toLocaleString() : 'N/A'],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'client' && (
// //           <div>
// //             {renderSection('Client Information', [
// //               ['Group Name', inspection.group_name],
// //               ['Nature of Business', inspection.nature_of_business],
// //               ['Legal Status', inspection.legal_status],
// //               ['Date of Establishment', inspection.date_of_establishment],
// //               ['Office Address', inspection.office_address],
// //               ['Showroom Address', inspection.showroom_address],
// //               ['Factory Address', inspection.factory_address],
// //               ['Phone Number', inspection.phone_number],
// //               ['TIN Number', inspection.tin_number],
// //               ['Trade License', inspection.trade_license],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'owner' && (
// //           <div>
// //             {renderSection('Owner Information', [
// //               ['Owner Name', inspection.owner_name],
// //               ['Age', inspection.owner_age],
// //               ['Father Name', inspection.father_name],
// //               ['Mother Name', inspection.mother_name],
// //               ['Spouse Name', inspection.spouse_name],
// //               ['Academic Qualification', inspection.academic_qualification],
// //               ['Children Info', inspection.children_info],
// //               ['Business Successor', inspection.business_successor],
// //               ['Residential Address', inspection.residential_address],
// //               ['Permanent Address', inspection.permanent_address],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'business' && (
// //           <div>
// //             {renderSection('Business Analysis', [
// //               ['Market Situation', inspection.market_situation],
// //               ['Client Position', inspection.client_position],
// //               ['Business Reputation', inspection.business_reputation],
// //               ['Production Type', inspection.production_type],
// //               ['Product Name', inspection.product_name],
// //               ['Production Capacity', inspection.production_capacity],
// //               ['Actual Production', inspection.actual_production],
// //               ['Profitability Observation', inspection.profitability_observation],
// //             ])}
            
// //             {renderSection('Labor Force', [
// //               ['Male Officer', inspection.male_officer],
// //               ['Female Officer', inspection.female_officer],
// //               ['Skilled Officer', inspection.skilled_officer],
// //               ['Unskilled Officer', inspection.unskilled_officer],
// //               ['Male Worker', inspection.male_worker],
// //               ['Female Worker', inspection.female_worker],
// //               ['Skilled Worker', inspection.skilled_worker],
// //               ['Unskilled Worker', inspection.unskilled_worker],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'financial' && (
// //           <div>
// //             {renderSection('Financial Information', [
// //               ['Cash Balance', inspection.cash_balance],
// //               ['Stock Trade Finished', inspection.stock_trade_finished],
// //               ['Stock Trade Financial', inspection.stock_trade_financial],
// //               ['Accounts Receivable', inspection.accounts_receivable],
// //               ['Land & Building', inspection.land_building],
// //               ['Plant & Machinery', inspection.plant_machinery],
// //               ['Paid Up Capital', inspection.paid_up_capital],
// //               ['Retained Earning', inspection.retained_earning],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'media' && (
// //           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
// //             <div className="px-4 py-5 sm:px-6 bg-gray-50">
// //               <h3 className="text-lg leading-6 font-medium text-gray-900">Media & Documents</h3>
// //               <p className="mt-1 text-sm text-gray-500">
// //                 Photos, videos, and documents related to this inspection
// //               </p>
// //             </div>
// //             <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// //               {renderMediaGallery()}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default InspectionDetailsPage;

// // // src/components/admin/InspectionDetailsPage.js
// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { getAdminInspectionById } from '../../services/inspectionService';
// // import { useNotification } from '../../context/NotificationContext';

// // const InspectionDetailsPage = () => {
// //   const [inspection, setInspection] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState('basic');
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { showError } = useNotification();

// //   useEffect(() => {
// //     fetchInspectionDetails();
// //   }, [id]);

// //   const fetchInspectionDetails = async () => {
// //     try {
// //       setLoading(true);
// //       console.log('🔄 Fetching admin inspection details:', id);
// //       const data = await getAdminInspectionById(id);
// //       console.log('✅ Admin inspection details loaded:', data);
      
// //       setInspection(data);
// //     } catch (error) {
// //       console.error('❌ Error fetching admin inspection:', error);
// //       showError('Failed to fetch inspection details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const getStatusColor = (status) => {
// //     const colors = {
// //       'Pending': 'bg-yellow-100 text-yellow-800',
// //       'In Progress': 'bg-blue-100 text-blue-800',
// //       'Completed': 'bg-purple-100 text-purple-800',
// //       'Approved': 'bg-green-100 text-green-800',
// //       'Rejected': 'bg-red-100 text-red-800',
// //     };
// //     return colors[status] || 'bg-gray-100 text-gray-800';
// //   };

// //   const getInspectorName = (inspection) => {
// //     if (inspection.inspector) {
// //       if (typeof inspection.inspector === 'string') {
// //         return inspection.inspector;
// //       } else if (inspection.inspector.username) {
// //         return inspection.inspector.username;
// //       } else if (inspection.inspector.name) {
// //         return inspection.inspector.name;
// //       }
// //     }
// //     return 'N/A';
// //   };

// //   const getMediaUrl = (media) => {
// //     if (!media) return '';
    
// //     if (media.url) {
// //       return media.url;
// //     }
    
// //     if (media.file_path) {
// //       if (media.file_path.startsWith('http')) {
// //         return media.file_path;
// //       } else {
// //         return `file://${media.file_path}`;
// //       }
// //     }
    
// //     if (media.base64_data) {
// //       if (media.base64_data.startsWith('data:')) {
// //         return media.base64_data;
// //       } else {
// //         return `data:image/jpeg;base64,${media.base64_data}`;
// //       }
// //     }
    
// //     if (typeof media === 'string') {
// //       return media;
// //     }
    
// //     return '';
// //   };

// //   const renderMediaGallery = () => {
// //     if (!inspection) return null;

// //     const allMedia = [
// //       ...(inspection.site_photos || []).map((photo, index) => ({ 
// //         ...photo, 
// //         type: 'photo',
// //         displayUrl: getMediaUrl(photo),
// //         displayName: photo.name || `Photo ${index + 1}`,
// //         id: `photo-${index}`
// //       })),
// //       ...(inspection.site_video || []).map((video, index) => ({ 
// //         ...video, 
// //         type: 'video',
// //         displayUrl: getMediaUrl(video),
// //         displayName: video.name || `Video ${index + 1}`,
// //         id: `video-${index}`
// //       })),
// //       ...(inspection.uploaded_documents || []).map((doc, index) => ({ 
// //         ...doc, 
// //         type: 'document',
// //         displayUrl: getMediaUrl(doc),
// //         displayName: doc.name || `Document ${index + 1}`,
// //         id: `doc-${index}`
// //       }))
// //     ];

// //     if (allMedia.length === 0) {
// //       return (
// //         <div className="text-center py-12">
// //           <div className="text-gray-400 text-6xl mb-4">📷</div>
// //           <h3 className="text-lg font-medium text-gray-900 mb-2">No Media Files</h3>
// //           <p className="text-gray-500">
// //             No photos, videos, or documents have been uploaded for this inspection yet.
// //           </p>
// //         </div>
// //       );
// //     }

// //     const handleMediaClick = (media) => {
// //       if (media.type === 'document' && media.displayUrl) {
// //         window.open(media.displayUrl, '_blank');
// //       }
// //     };

// //     const renderMediaItem = (media) => {
// //       switch (media.type) {
// //         case 'photo':
// //           return (
// //             <div className="relative group cursor-pointer" onClick={() => handleMediaClick(media)}>
// //               <img 
// //                 src={media.displayUrl} 
// //                 alt={media.displayName}
// //                 className="w-full h-48 object-cover rounded-lg"
// //                 onError={(e) => {
// //                   e.target.src = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Image+Not+Found';
// //                 }}
// //               />
// //               <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-end">
// //                 <div className="w-full p-3 bg-gradient-to-t from-black to-transparent text-white text-sm rounded-b-lg">
// //                   <div className="font-medium truncate">{media.displayName}</div>
// //                   <div className="text-xs opacity-90">Photo • Click to view</div>
// //                 </div>
// //               </div>
// //               <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
// //                 📸
// //               </div>
// //             </div>
// //           );

// //         case 'video':
// //           return (
// //             <div className="relative group">
// //               <video 
// //                 src={media.displayUrl}
// //                 controls
// //                 className="w-full h-48 object-cover rounded-lg bg-black"
// //               >
// //                 Your browser does not support the video tag.
// //               </video>
// //               <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
// //                 🎥
// //               </div>
// //             </div>
// //           );

// //         case 'document':
// //           return (
// //             <div 
// //               className="relative group cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg p-6 text-center hover:shadow-md transition-all duration-200 border-2 border-dashed border-blue-200 hover:border-blue-400"
// //               onClick={() => handleMediaClick(media)}
// //             >
// //               <div className="text-4xl mb-3">📄</div>
// //               <div className="font-medium text-gray-900 text-sm mb-2 truncate px-2">
// //                 {media.displayName}
// //               </div>
// //               <div className="text-xs text-gray-600 mb-3">
// //                 Click to {media.displayUrl ? 'view/download' : 'view'}
// //               </div>
// //               {media.file_size && (
// //                 <div className="text-xs text-gray-500 bg-white px-2 py-1 rounded-full inline-block">
// //                   {(media.file_size / 1024 / 1024).toFixed(2)} MB
// //                 </div>
// //               )}
// //               <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded text-xs">
// //                 📎
// //               </div>
// //             </div>
// //           );

// //         default:
// //           return (
// //             <div className="bg-gray-100 rounded-lg p-6 text-center">
// //               <div className="text-2xl mb-2">❓</div>
// //               <div className="text-sm text-gray-600">Unknown media type</div>
// //             </div>
// //           );
// //       }
// //     };

// //     return (
// //       <div>
// //         <div className="grid grid-cols-3 gap-4 mb-6">
// //           <div className="bg-blue-50 rounded-lg p-4 text-center">
// //             <div className="text-2xl text-blue-600 mb-1">📸</div>
// //             <div className="text-lg font-semibold text-blue-700">{inspection.site_photos?.length || 0}</div>
// //             <div className="text-sm text-blue-600">Photos</div>
// //           </div>
// //           <div className="bg-green-50 rounded-lg p-4 text-center">
// //             <div className="text-2xl text-green-600 mb-1">🎥</div>
// //             <div className="text-lg font-semibold text-green-700">{inspection.site_video?.length || 0}</div>
// //             <div className="text-sm text-green-600">Videos</div>
// //           </div>
// //           <div className="bg-purple-50 rounded-lg p-4 text-center">
// //             <div className="text-2xl text-purple-600 mb-1">📄</div>
// //             <div className="text-lg font-semibold text-purple-700">{inspection.uploaded_documents?.length || 0}</div>
// //             <div className="text-sm text-purple-600">Documents</div>
// //           </div>
// //         </div>

// //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
// //           {allMedia.map((media) => (
// //             <div key={media.id}>
// //               {renderMediaItem(media)}
// //             </div>
// //           ))}
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderSection = (title, fields) => (
// //     <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
// //       <div className="px-4 py-5 sm:px-6 bg-gray-50">
// //         <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
// //       </div>
// //       <div className="border-t border-gray-200">
// //         <dl>
// //           {fields.map(([label, value], index) => (
// //             <div key={index} className={`px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 ${
// //               index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
// //             }`}>
// //               <dt className="text-sm font-medium text-gray-500">{label}</dt>
// //               <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2 break-words">
// //                 {value || <span className="text-gray-400">N/A</span>}
// //               </dd>
// //             </div>
// //           ))}
// //         </dl>
// //       </div>
// //     </div>
// //   );

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
// //         <span className="ml-3 text-gray-600">Loading inspection details...</span>
// //       </div>
// //     );
// //   }

// //   if (!inspection) {
// //     return (
// //       <div className="text-center py-12">
// //         <div className="text-gray-400 text-6xl mb-4">🔍</div>
// //         <h3 className="text-lg font-medium text-gray-900 mb-2">Inspection not found</h3>
// //         <p className="text-gray-500 mb-4">The inspection you're looking for doesn't exist or you don't have permission to view it.</p>
// //         <div className="space-x-3">
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //           >
// //             Go Back
// //           </button>
// //           <button
// //             onClick={() => navigate('/admin/dashboard')}
// //             className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
// //           >
// //             Back to Dashboard
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const tabs = [
// //     { id: 'basic', name: 'Basic Info' },
// //     { id: 'client', name: 'Client Info' },
// //     { id: 'owner', name: 'Owner Info' },
// //     { id: 'business', name: 'Business Analysis' },
// //     { id: 'financial', name: 'Financial Info' },
// //     { id: 'media', name: 'Media & Documents' },
// //   ];

// //   return (
// //     <div className="px-4 py-6 sm:px-0 lg:px-8">
// //       <div className="mb-8">
// //         <div className="flex justify-between items-start">
// //           <div className="flex-1">
// //             <div className="flex items-center space-x-3 mb-4">
// //               <button
// //                 onClick={() => navigate(-1)}
// //                 className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //               >
// //                 ← Back
// //               </button>
// //               <button
// //                 onClick={fetchInspectionDetails}
// //                 className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //               >
// //                 Refresh
// //               </button>
// //             </div>
            
// //             <h1 className="text-2xl font-bold text-gray-900">
// //               {inspection.client_name || 'Unnamed Inspection'}
// //             </h1>
            
// //             <div className="mt-3 flex flex-wrap items-center gap-3">
// //               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inspection.status)}`}>
// //                 {inspection.status}
// //               </span>
// //               <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
// //                 Inspector: {getInspectorName(inspection)}
// //               </span>
// //               <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
// //                 Branch: {inspection.branch_name || 'N/A'}
// //               </span>
// //               <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
// //                 ID: {inspection.id}
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <div className="border-b border-gray-200 mb-6">
// //         <nav className="-mb-px flex space-x-8 overflow-x-auto">
// //           {tabs.map((tab) => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
// //                 activeTab === tab.id
// //                   ? 'border-blue-500 text-blue-600'
// //                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //               }`}
// //             >
// //               {tab.name}
// //             </button>
// //           ))}
// //         </nav>
// //       </div>

// //       {/* Tab Content */}
// //       <div className="mb-8">
// //         {activeTab === 'basic' && (
// //           <div>
// //             {renderSection('Basic Information', [
// //               ['Client Name', inspection.client_name],
// //               ['Industry', inspection.industry_name],
// //               ['Branch', inspection.branch_name],
// //               ['Status', inspection.status],
// //               ['Inspector', getInspectorName(inspection)],
// //               ['Created', inspection.created_at ? new Date(inspection.created_at).toLocaleString() : 'N/A'],
// //               ['Last Updated', inspection.updated_at ? new Date(inspection.updated_at).toLocaleString() : 'N/A'],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'client' && (
// //           <div>
// //             {renderSection('Client Information', [
// //               ['Group Name', inspection.group_name],
// //               ['Nature of Business', inspection.nature_of_business],
// //               ['Legal Status', inspection.legal_status],
// //               ['Date of Establishment', inspection.date_of_establishment],
// //               ['Office Address', inspection.office_address],
// //               ['Showroom Address', inspection.showroom_address],
// //               ['Factory Address', inspection.factory_address],
// //               ['Phone Number', inspection.phone_number],
// //               ['Account Number', inspection.account_number],
// //               ['Account ID', inspection.account_id],
// //               ['TIN Number', inspection.tin_number],
// //               ['Date of Opening', inspection.date_of_opening],
// //               ['VAT Registration Number', inspection.vat_reg_number],
// //               ['First Investment Date', inspection.first_investment_date],
// //               ['Sector Code', inspection.sector_code],
// //               ['Trade License', inspection.trade_license],
// //               ['Economic Purpose Code', inspection.economic_purpose_code],
// //               ['Investment Category', inspection.investment_category],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'owner' && (
// //           <div>
// //             {renderSection('Owner Information', [
// //               ['Owner Name', inspection.owner_name],
// //               ['Age', inspection.owner_age],
// //               ['Father Name', inspection.father_name],
// //               ['Mother Name', inspection.mother_name],
// //               ['Spouse Name', inspection.spouse_name],
// //               ['Academic Qualification', inspection.academic_qualification],
// //               ['Children Info', inspection.children_info],
// //               ['Business Successor', inspection.business_successor],
// //               ['Residential Address', inspection.residential_address],
// //               ['Permanent Address', inspection.permanent_address],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'business' && (
// //           <div>
// //             {renderSection('Business Analysis', [
// //               ['Market Situation', inspection.market_situation],
// //               ['Client Position', inspection.client_position],
// //               ['Business Reputation', inspection.business_reputation],
// //               ['Production Type', inspection.production_type],
// //               ['Product Name', inspection.product_name],
// //               ['Production Capacity', inspection.production_capacity],
// //               ['Actual Production', inspection.actual_production],
// //               ['Profitability Observation', inspection.profitability_observation],
// //             ])}
            
// //             {renderSection('Labor Force', [
// //               ['Male Officer', inspection.male_officer],
// //               ['Female Officer', inspection.female_officer],
// //               ['Skilled Officer', inspection.skilled_officer],
// //               ['Unskilled Officer', inspection.unskilled_officer],
// //               ['Male Worker', inspection.male_worker],
// //               ['Female Worker', inspection.female_worker],
// //               ['Skilled Worker', inspection.skilled_worker],
// //               ['Unskilled Worker', inspection.unskilled_worker],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'financial' && (
// //           <div>
// //             {renderSection('Financial Information', [
// //               ['Cash Balance', inspection.cash_balance],
// //               ['Stock Trade Finished', inspection.stock_trade_finished],
// //               ['Stock Trade Financial', inspection.stock_trade_financial],
// //               ['Accounts Receivable', inspection.accounts_receivable],
// //               ['Advance Deposit', inspection.advance_deposit],
// //               ['Other Current Assets', inspection.other_current_assets],
// //               ['Land & Building', inspection.land_building],
// //               ['Plant & Machinery', inspection.plant_machinery],
// //               ['Other Assets', inspection.other_assets],
// //               ['IBBL Investment', inspection.ibbl_investment],
// //               ['Other Banks Investment', inspection.other_banks_investment],
// //               ['Borrowing Sources', inspection.borrowing_sources],
// //               ['Accounts Payable', inspection.accounts_payable],
// //               ['Other Current Liabilities', inspection.other_current_liabilities],
// //               ['Long Term Liabilities', inspection.long_term_liabilities],
// //               ['Other Non-Current Liabilities', inspection.other_non_current_liabilities],
// //               ['Paid Up Capital', inspection.paid_up_capital],
// //               ['Retained Earning', inspection.retained_earning],
// //               ['Resources', inspection.resources],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'media' && (
// //           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
// //             <div className="px-4 py-5 sm:px-6 bg-gray-50">
// //               <h3 className="text-lg leading-6 font-medium text-gray-900">Media & Documents</h3>
// //               <p className="mt-1 text-sm text-gray-500">
// //                 Photos, videos, and documents related to this inspection
// //               </p>
// //               <div className="mt-2 flex space-x-4 text-sm text-gray-600">
// //                 <span>📸 {inspection.site_photos?.length || 0} Photos</span>
// //                 <span>🎥 {inspection.site_video?.length || 0} Videos</span>
// //                 <span>📄 {inspection.uploaded_documents?.length || 0} Documents</span>
// //               </div>
// //             </div>
// //             <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
// //               {renderMediaGallery()}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default InspectionDetailsPage;
// // src/components/admin/InspectionDetailsPage.js
// // src/components/admin/InspectionDetailsPage.js


























// // import React, { useState, useEffect } from 'react';
// // import { useParams, useNavigate } from 'react-router-dom';
// // import { getAdminInspectionById } from '../../services/inspectionService';
// // import { useNotification } from '../../context/NotificationContext';
// // import PhotoViewer from './PhotoViewer';
// // import DocumentViewer from './DocumentViewer';

// // const InspectionDetailsPage = () => {
// //   const [inspection, setInspection] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState('basic');
// //   const [showAllLocations, setShowAllLocations] = useState(false);
// //   const [photoViewer, setPhotoViewer] = useState({ show: false, photos: [], currentIndex: 0 });
// //   const [documentViewer, setDocumentViewer] = useState({ show: false, document: null });
// //   const { id } = useParams();
// //   const navigate = useNavigate();
// //   const { showError } = useNotification();

// //   useEffect(() => {
// //     fetchInspectionDetails();
// //   }, [id]);

// //   const fetchInspectionDetails = async () => {
// //     try {
// //       setLoading(true);
// //       console.log('🔄 Fetching admin inspection details:', id);
// //       const data = await getAdminInspectionById(id);
// //       console.log('✅ Admin inspection details loaded:', data);
      
// //       setInspection(data);
// //     } catch (error) {
// //       console.error('❌ Error fetching admin inspection:', error);
// //       showError('Failed to fetch inspection details');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Helper Functions
// //   const getStatusColor = (status) => {
// //     const colors = {
// //       'Pending': 'bg-yellow-100 text-yellow-800',
// //       'In Progress': 'bg-blue-100 text-blue-800',
// //       'Completed': 'bg-purple-100 text-purple-800',
// //       'Approved': 'bg-green-100 text-green-800',
// //       'Rejected': 'bg-red-100 text-red-800',
// //     };
// //     return colors[status] || 'bg-gray-100 text-gray-800';
// //   };

// //   const getStatusIcon = (status) => {
// //     const icons = {
// //       'Pending': '⏳',
// //       'In Progress': '⚙️',
// //       'Completed': '✅',
// //       'Approved': '👍',
// //       'Rejected': '❌',
// //     };
// //     return icons[status] || '📋';
// //   };

// //   const getInspectorName = (inspection) => {
// //     if (inspection.inspector) {
// //       if (typeof inspection.inspector === 'string') {
// //         return inspection.inspector;
// //       } else if (inspection.inspector.username) {
// //         return inspection.inspector.username;
// //       } else if (inspection.inspector.name) {
// //         return inspection.inspector.name;
// //       }
// //     }
// //     return 'N/A';
// //   };

// //   const getMediaUrl = (media) => {
// //     if (!media) return '';
    
// //     if (media.url) {
// //       return media.url;
// //     }
    
// //     if (media.file_path) {
// //       if (media.file_path.startsWith('http')) {
// //         return media.file_path;
// //       } else {
// //         return `file://${media.file_path}`;
// //       }
// //     }
    
// //     if (media.base64_data) {
// //       if (media.base64_data.startsWith('data:')) {
// //         return media.base64_data;
// //       } else {
// //         return `data:image/jpeg;base64,${media.base64_data}`;
// //       }
// //     }
    
// //     if (typeof media === 'string') {
// //       return media;
// //     }
    
// //     return '';
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'N/A';
// //     try {
// //       const date = new Date(dateString);
// //       return date.toLocaleDateString('en-BD') + ' ' + date.toLocaleTimeString('en-BD');
// //     } catch (e) {
// //       return 'Invalid Date';
// //     }
// //   };

// //   const formatFileSize = (bytes) => {
// //     if (!bytes) return 'Unknown size';
// //     if (bytes === 0) return '0 B';
    
// //     const k = 1024;
// //     const sizes = ['B', 'KB', 'MB', 'GB'];
// //     const i = Math.floor(Math.log(bytes) / Math.log(k));
    
// //     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
// //   };

// //   const getDocumentType = (fileName) => {
// //     if (!fileName) return 'File';
// //     const extension = fileName.split('.').pop()?.toLowerCase();
    
// //     switch (extension) {
// //       case 'pdf':
// //         return 'PDF Document';
// //       case 'doc':
// //       case 'docx':
// //         return 'Word Document';
// //       case 'jpg':
// //       case 'jpeg':
// //         return 'JPEG Image';
// //       case 'png':
// //         return 'PNG Image';
// //       case 'mp4':
// //       case 'avi':
// //       case 'mov':
// //         return 'Video File';
// //       default:
// //         return 'File';
// //     }
// //   };

// //   const getDocumentIcon = (fileName) => {
// //     if (!fileName) return '📄';
// //     const extension = fileName.split('.').pop()?.toLowerCase();
    
// //     switch (extension) {
// //       case 'pdf':
// //         return '📕';
// //       case 'doc':
// //       case 'docx':
// //         return '📘';
// //       case 'jpg':
// //       case 'jpeg':
// //       case 'png':
// //         return '🖼️';
// //       case 'mp4':
// //       case 'avi':
// //       case 'mov':
// //         return '🎥';
// //       default:
// //         return '📄';
// //     }
// //   };

// //   // Photo viewing functions
// //   const showPhotoFullScreen = (photo, currentIndex, allPhotos) => {
// //     console.log('Opening photo viewer:', { photo, currentIndex, allPhotos });
// //     setPhotoViewer({
// //       show: true,
// //       photos: allPhotos,
// //       currentIndex: currentIndex
// //     });
// //   };

// //   const closePhotoViewer = () => {
// //     setPhotoViewer({ show: false, photos: [], currentIndex: 0 });
// //   };

// //   // Document viewing functions
// // const showDocumentFullScreen = (doc, index) => {
// //   console.log('Opening document viewer:', { doc, index });
// //   setDocumentViewer({
// //     show: true,
// //     document: doc // Make sure this contains url, file_path, base64_data, etc.
// //   });
// // };

// //   const closeDocumentViewer = () => {
// //     setDocumentViewer({ show: false, document: null });
// //   };

// //   const showDocumentInfo = (doc, index) => {
// //     const fileName = doc.name || `Document ${index + 1}`;
// //     const filePath = doc.file_path || '';
    
// //     alert(`Document Information:\n\nName: ${fileName}\nType: ${getDocumentType(fileName)}\nPath: ${filePath}\nSize: ${doc.file_size ? formatFileSize(doc.file_size) : 'Unknown'}`);
// //   };

// //   // Location Tracking Section
// //   const renderLocationSection = () => {
// //     if (!inspection) return null;

// //     const locationPoints = inspection.location_points || [];
// //     const totalPoints = inspection.total_location_points || locationPoints.length;
// //     const startTime = inspection.location_start_time;
// //     const endTime = inspection.location_end_time;

// //     if (locationPoints.length === 0) {
// //       return null;
// //     }

// //     const renderLocationPoint = (point, label, index) => {
// //       const latitude = point.latitude ? point.latitude.toFixed(6) : 'N/A';
// //       const longitude = point.longitude ? point.longitude.toFixed(6) : 'N/A';
// //       const timestamp = point.timestamp || '';
// //       const accuracy = point.accuracy ? point.accuracy.toFixed(2) : 'N/A';
// //       const speed = point.speed ? point.speed.toFixed(2) : 'N/A';

// //       return (
// //         <div key={index} className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-50">
// //           <div className="text-sm font-semibold text-green-800 mb-2">{label}</div>
// //           <div className="grid grid-cols-2 gap-1 text-xs">
// //             <div>
// //               <span className="font-medium">Coordinates:</span> {latitude}, {longitude}
// //             </div>
// //             <div>
// //               <span className="font-medium">Accuracy:</span> {accuracy} meters
// //             </div>
// //             {speed !== 'N/A' && parseFloat(speed) > 0 && (
// //               <div>
// //                 <span className="font-medium">Speed:</span> {speed} m/s
// //               </div>
// //             )}
// //             <div>
// //               <span className="font-medium">Time:</span> {formatDate(timestamp)}
// //             </div>
// //           </div>
// //         </div>
// //       );
// //     };

// //     return (
// //       <div className="mb-6">
// //         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
// //           <h3 className="text-lg font-semibold">Location Tracking Data</h3>
// //         </div>
        
// //         <div className="bg-white shadow rounded-lg p-6">
// //           <div className="space-y-4">
// //             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
// //               <div className="text-center p-3 bg-blue-50 rounded-lg">
// //                 <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
// //                 <div className="text-sm text-blue-600">Total Points</div>
// //               </div>
// //               <div className="text-center p-3 bg-green-50 rounded-lg">
// //                 <div className="text-sm font-semibold text-green-600">Start Time</div>
// //                 <div className="text-xs text-green-600">{formatDate(startTime)}</div>
// //               </div>
// //               <div className="text-center p-3 bg-red-50 rounded-lg">
// //                 <div className="text-sm font-semibold text-red-600">End Time</div>
// //                 <div className="text-xs text-red-600">{formatDate(endTime)}</div>
// //               </div>
// //             </div>

// //             {locationPoints.length > 0 && (
// //               <>
// //                 {renderLocationPoint(locationPoints[0], 'First Location', 0)}
// //                 {locationPoints.length > 1 && 
// //                  renderLocationPoint(locationPoints[locationPoints.length - 1], 'Last Location', 1)}
                
// //                 {locationPoints.length > 2 && (
// //                   <div className="mt-4">
// //                     <button
// //                       onClick={() => setShowAllLocations(!showAllLocations)}
// //                       className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// //                     >
// //                       <span className="mr-2">
// //                         {showAllLocations ? '👁️‍🗨️' : '👁️'}
// //                       </span>
// //                       {showAllLocations ? 'Hide All Locations' : 'Show All Locations'}
// //                     </button>
// //                   </div>
// //                 )}

// //                 {showAllLocations && locationPoints.length > 2 && (
// //                   <div className="mt-4">
// //                     <h4 className="font-semibold text-green-800 mb-2">All Location Points:</h4>
// //                     <div className="space-y-2 max-h-60 overflow-y-auto">
// //                       {locationPoints.map((point, index) => 
// //                         renderLocationPoint(point, `Point ${index + 1}`, index)
// //                       )}
// //                     </div>
// //                   </div>
// //                 )}

// //                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
// //                   <button
// //                     onClick={() => navigate(`/admin/inspection-map/${id}`)}
// //                     className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
// //                   >
// //                     <span className="mr-2">🗺️</span>
// //                     Interactive Map
// //                   </button>
// //                   <button
// //                     onClick={openGoogleMaps}
// //                     className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
// //                   >
// //                     <span className="mr-2">🌐</span>
// //                     Google Maps
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   const openGoogleMaps = () => {
// //     const locationPoints = inspection.location_points || [];
// //     if (locationPoints.length === 0) {
// //       showError('No location data available to show on map');
// //       return;
// //     }

// //     const firstPoint = locationPoints[0];
// //     const lat = firstPoint.latitude;
// //     const lng = firstPoint.longitude;
    
// //     if (!lat || !lng) {
// //       showError('Invalid location coordinates');
// //       return;
// //     }

// //     const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
// //     window.open(url, '_blank');
// //   };

// //   // Checklist Section
// //   const renderChecklistSection = () => {
// //     if (!inspection || !inspection.checklist_items) return null;

// //     const checklistItems = inspection.checklist_items;
// //     if (Object.keys(checklistItems).length === 0) return null;

// //     const renderChecklistRow = (label, value) => {
// //       let statusText, statusColor, statusIcon;
      
// //       if (value === true) {
// //         statusText = 'Yes';
// //         statusColor = 'bg-green-100 text-green-800 border-green-300';
// //         statusIcon = '✅';
// //       } else if (value === false) {
// //         statusText = 'No';
// //         statusColor = 'bg-red-100 text-red-800 border-red-300';
// //         statusIcon = '❌';
// //       } else {
// //         statusText = 'N/A';
// //         statusColor = 'bg-orange-100 text-orange-800 border-orange-300';
// //         statusIcon = '❓';
// //       }

// //       return (
// //         <div key={label} className="flex items-center justify-between py-3 border-b border-gray-200">
// //           <div className="flex-1">
// //             <span className="text-gray-700">{label}</span>
// //           </div>
// //           <div className={`flex items-center px-3 py-1 rounded-full border ${statusColor}`}>
// //             <span className="mr-2">{statusIcon}</span>
// //             <span className="text-sm font-semibold">{statusText}</span>
// //           </div>
// //         </div>
// //       );
// //     };

// //     return (
// //       <div className="mb-6">
// //         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
// //           <h3 className="text-lg font-semibold">K. Checklist Verification</h3>
// //         </div>
        
// //         <div className="bg-white shadow rounded-lg p-6">
// //           <div className="space-y-2">
// //             {Object.entries(checklistItems).map(([key, value]) => 
// //               renderChecklistRow(key, value)
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Update the media rendering functions to use the new viewers
// //   const renderPhotoThumbnail = (photo, index, allPhotos) => {
// //     const displayUrl = getMediaUrl(photo);
// //     const displayName = photo.name || `Photo ${index + 1}`;

// //     console.log(`Rendering photo ${index}:`, { displayUrl, displayName, photo });

// //     return (
// //       <div 
// //         key={index}
// //         className="relative group cursor-pointer border border-gray-300 rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow"
// //         onClick={() => showPhotoFullScreen(photo, index, allPhotos)}
// //       >
// //         {displayUrl ? (
// //           <img 
// //             src={displayUrl}
// //             alt={displayName}
// //             className="w-full h-32 object-cover"
// //             onError={(e) => {
// //               console.error(`Failed to load image: ${displayUrl}`);
// //               e.target.src = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Image+Not+Found';
// //             }}
// //             onLoad={() => console.log(`✅ Image loaded: ${displayUrl}`)}
// //           />
// //         ) : (
// //           <div className="w-full h-32 flex flex-col items-center justify-center bg-gray-200">
// //             <span className="text-2xl">📷</span>
// //             <span className="text-xs mt-1">{displayName}</span>
// //             <span className="text-xs text-red-500 mt-1">No URL</span>
// //           </div>
// //         )}
// //         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-end">
// //           <div className="w-full p-2 bg-gradient-to-t from-black to-transparent text-white text-xs">
// //             <div className="font-medium truncate">{displayName}</div>
// //             <div className="opacity-90">Click to view</div>
// //           </div>
// //         </div>
// //         <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
// //           📸
// //         </div>
// //       </div>
// //     );
// //   };

// //   const renderDocumentItem = (doc, index) => {
// //     const displayName = doc.name || `Document ${index + 1}`;
// //     const filePath = doc.file_path || '';

// //     console.log(`Rendering document ${index}:`, { doc, displayName, filePath });

// //     return (
// //       <div 
// //         key={index}
// //         className="flex items-center p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-100"
// //         onClick={() => showDocumentFullScreen(doc, index)}
// //       >
// //         <div className="text-3xl mr-4">
// //           {getDocumentIcon(displayName)}
// //         </div>
// //         <div className="flex-1">
// //           <div className="font-medium text-gray-900">{displayName}</div>
// //           <div className="text-sm text-gray-600">
// //             {filePath ? 'Click to view document' : 'No file path available'}
// //           </div>
// //           {doc.file_size && (
// //             <div className="text-xs text-gray-500 mt-1">
// //               {formatFileSize(doc.file_size)}
// //             </div>
// //           )}
// //         </div>
// //         <div className="flex space-x-2">
// //           <button 
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               showDocumentFullScreen(doc, index);
// //             }}
// //             className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
// //             title="View Document"
// //           >
// //             👁️
// //           </button>
// //           <button 
// //             onClick={(e) => {
// //               e.stopPropagation();
// //               showDocumentInfo(doc, index);
// //             }}
// //             className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
// //             title="Document Info"
// //           >
// //             ℹ️
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Update the media section to pass allPhotos to thumbnail renderer
// //   const renderMediaSection = () => {
// //     if (!inspection) return null;

// //     const sitePhotos = inspection.site_photos || [];
// //     const siteVideo = inspection.site_video || [];
// //     const uploadedDocuments = inspection.uploaded_documents || [];

// //     console.log('Media section data:', { sitePhotos, siteVideo, uploadedDocuments });

// //     if (sitePhotos.length === 0 && siteVideo.length === 0 && uploadedDocuments.length === 0) {
// //       return (
// //         <div className="mb-6">
// //           <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
// //             <h3 className="text-lg font-semibold">Media & Documents</h3>
// //           </div>
// //           <div className="bg-white shadow rounded-lg p-6 text-center">
// //             <div className="text-6xl mb-4">📁</div>
// //             <h4 className="text-lg font-semibold text-gray-700 mb-2">No Media Files</h4>
// //             <p className="text-gray-500">No photos, videos, or documents have been uploaded for this inspection.</p>
// //           </div>
// //         </div>
// //       );
// //     }

// //     return (
// //       <div className="mb-6">
// //         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
// //           <h3 className="text-lg font-semibold">Media & Documents</h3>
// //         </div>
        
// //         <div className="bg-white shadow rounded-lg p-6">
// //           <div className="grid grid-cols-3 gap-4 mb-6">
// //             <div className="text-center p-4 bg-blue-50 rounded-lg">
// //               <div className="text-2xl">📸</div>
// //               <div className="text-lg font-semibold text-blue-700">{sitePhotos.length}</div>
// //               <div className="text-sm text-blue-600">Photos</div>
// //             </div>
// //             <div className="text-center p-4 bg-green-50 rounded-lg">
// //               <div className="text-2xl">🎥</div>
// //               <div className="text-lg font-semibold text-green-700">{siteVideo.length}</div>
// //               <div className="text-sm text-green-600">Videos</div>
// //             </div>
// //             <div className="text-center p-4 bg-purple-50 rounded-lg">
// //               <div className="text-2xl">📄</div>
// //               <div className="text-lg font-semibold text-purple-700">{uploadedDocuments.length}</div>
// //               <div className="text-sm text-purple-600">Documents</div>
// //             </div>
// //           </div>

// //           {sitePhotos.length > 0 && (
// //             <div className="mb-6">
// //               <h4 className="font-semibold text-green-800 mb-3">Site Photos</h4>
// //               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
// //                 {sitePhotos.map((photo, index) => 
// //                   renderPhotoThumbnail(photo, index, sitePhotos)
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {uploadedDocuments.length > 0 && (
// //             <div>
// //               <h4 className="font-semibold text-green-800 mb-3">Supporting Documents</h4>
// //               <div className="space-y-3">
// //                 {uploadedDocuments.map(renderDocumentItem)}
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Working Capital Assessment Section
// //   const renderWorkingCapitalSection = () => {
// //     if (!inspection) return null;

// //     const workingCapitalItems = inspection.working_capital_items || [];
// //     if (workingCapitalItems.length === 0) return null;

// //     return (
// //       <div className="mb-6">
// //         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
// //           <h3 className="text-lg font-semibold">I. Working Capital Assessment</h3>
// //         </div>
        
// //         <div className="bg-white shadow rounded-lg p-6">
// //           <div className="space-y-3">
// //             {workingCapitalItems.map((item, index) => (
// //               <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
// //                 <div className="font-medium text-green-800">{item.name || 'Item'}</div>
// //                 <div className="text-sm text-gray-600">
// //                   Unit: {item.unit || 'N/A'}, Rate: {item.rate || 'N/A'}, Amount: {item.amount || 'N/A'}
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     );
// //   };

// //   // Generic Section Renderer
// //   const renderSection = (title, fields) => (
// //     <div className="bg-white shadow rounded-lg mb-6">
// //       <div className="bg-green-800 text-white px-4 py-3 rounded-t-lg">
// //         <h3 className="text-lg font-semibold">{title}</h3>
// //       </div>
// //       <div className="p-6">
// //         <dl className="space-y-4">
// //           {fields.map(([label, value], index) => (
// //             <div key={index} className="flex flex-col sm:flex-row sm:items-start">
// //               <dt className="text-sm font-medium text-gray-500 sm:w-1/3 mb-1 sm:mb-0">{label}</dt>
// //               <dd className="text-sm text-gray-900 sm:w-2/3 break-words">
// //                 {value || <span className="text-gray-400">N/A</span>}
// //               </dd>
// //             </div>
// //           ))}
// //         </dl>
// //       </div>
// //     </div>
// //   );

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
// //         <span className="ml-3 text-gray-600">Loading inspection details...</span>
// //       </div>
// //     );
// //   }

// //   if (!inspection) {
// //     return (
// //       <div className="text-center py-12">
// //         <div className="text-gray-400 text-6xl mb-4">🔍</div>
// //         <h3 className="text-lg font-medium text-gray-900 mb-2">Inspection not found</h3>
// //         <p className="text-gray-500 mb-4">The inspection you're looking for doesn't exist.</p>
// //         <div className="space-x-3">
// //           <button
// //             onClick={() => navigate(-1)}
// //             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
// //           >
// //             Go Back
// //           </button>
// //           <button
// //             onClick={() => navigate('/admin/dashboard')}
// //             className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
// //           >
// //             Back to Dashboard
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   const tabs = [
// //     { id: 'basic', name: 'Basic Info' },
// //     { id: 'client', name: 'Client Info' },
// //     { id: 'owner', name: 'Owner Info' },
// //     { id: 'business', name: 'Business Analysis' },
// //     { id: 'financial', name: 'Financial Info' },
// //     { id: 'location', name: 'Location Tracking' },
// //     { id: 'media', name: 'Media & Documents' },
// //   ];

// //   return (
// //     <div className="min-h-screen bg-gray-50">
// //       {/* Header */}
// //       <div className="bg-green-800 text-white">
// //         <div className="container mx-auto px-4 py-6">
// //           <div className="flex items-center justify-between">
// //             <div className="flex items-center space-x-4">
// //               <button
// //                 onClick={() => navigate(-1)}
// //                 className="flex items-center px-3 py-2 text-sm bg-green-700 rounded-md hover:bg-green-600 transition-colors"
// //               >
// //                 ← Back
// //               </button>
// //               <button
// //                 onClick={fetchInspectionDetails}
// //                 className="px-3 py-2 text-sm bg-green-700 rounded-md hover:bg-green-600 transition-colors"
// //               >
// //                 Refresh
// //               </button>
// //             </div>
// //             <button
// //               onClick={() => navigate(`/admin/edit-inspection/${id}`)}
// //               className="flex items-center px-4 py-2 bg-white text-green-800 rounded-md hover:bg-gray-100 transition-colors"
// //             >
// //               <span className="mr-2">✏️</span>
// //               Edit Inspection
// //             </button>
// //           </div>

// //           <div className="mt-4">
// //             <h1 className="text-2xl font-bold">
// //               {inspection.client_name || 'Unnamed Inspection'}
// //             </h1>
            
// //             <div className="mt-3 flex flex-wrap items-center gap-3">
// //               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inspection.status)}`}>
// //                 <span className="mr-2">{getStatusIcon(inspection.status)}</span>
// //                 {inspection.status}
// //               </span>
// //               <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
// //                 Inspector: {getInspectorName(inspection)}
// //               </span>
// //               <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
// //                 Branch: {inspection.branch_name || 'N/A'}
// //               </span>
// //               <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
// //                 ID: {inspection.id}
// //               </span>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       {/* Tabs */}
// //       <div className="bg-white border-b">
// //         <div className="container mx-auto px-4">
// //           <nav className="flex space-x-8 overflow-x-auto">
// //             {tabs.map((tab) => (
// //               <button
// //                 key={tab.id}
// //                 onClick={() => setActiveTab(tab.id)}
// //                 className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
// //                   activeTab === tab.id
// //                     ? 'border-green-500 text-green-600'
// //                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
// //                 }`}
// //               >
// //                 {tab.name}
// //               </button>
// //             ))}
// //           </nav>
// //         </div>
// //       </div>

// //       {/* Content */}
// //       <div className="container mx-auto px-4 py-6">
// //         {activeTab === 'basic' && (
// //           <div>
// //             {renderSection('Basic Information', [
// //               ['Client Name', inspection.client_name],
// //               ['Industry', inspection.industry_name],
// //               ['Branch', inspection.branch_name],
// //               ['Status', inspection.status],
// //               ['Inspector', getInspectorName(inspection)],
// //               ['Created', formatDate(inspection.created_at)],
// //               ['Last Updated', formatDate(inspection.updated_at)],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'client' && (
// //           <div>
// //             {renderSection('Client Information', [
// //               ['Group Name', inspection.group_name],
// //               ['Nature of Business', inspection.nature_of_business],
// //               ['Legal Status', inspection.legal_status],
// //               ['Date of Establishment', inspection.date_of_establishment],
// //               ['Office Address', inspection.office_address],
// //               ['Showroom Address', inspection.showroom_address],
// //               ['Factory Address', inspection.factory_address],
// //               ['Phone Number', inspection.phone_number],
// //               ['Account Number', inspection.account_number],
// //               ['Account ID', inspection.account_id],
// //               ['TIN Number', inspection.tin_number],
// //               ['Date of Opening', inspection.date_of_opening],
// //               ['VAT Registration Number', inspection.vat_reg_number],
// //               ['First Investment Date', inspection.first_investment_date],
// //               ['Sector Code', inspection.sector_code],
// //               ['Trade License', inspection.trade_license],
// //               ['Economic Purpose Code', inspection.economic_purpose_code],
// //               ['Investment Category', inspection.investment_category],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'owner' && (
// //           <div>
// //             {renderSection('Owner Information', [
// //               ['Owner Name', inspection.owner_name],
// //               ['Age', inspection.owner_age],
// //               ['Father Name', inspection.father_name],
// //               ['Mother Name', inspection.mother_name],
// //               ['Spouse Name', inspection.spouse_name],
// //               ['Academic Qualification', inspection.academic_qualification],
// //               ['Children Info', inspection.children_info],
// //               ['Business Successor', inspection.business_successor],
// //               ['Residential Address', inspection.residential_address],
// //               ['Permanent Address', inspection.permanent_address],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'business' && (
// //           <div>
// //             {renderSection('Business Analysis', [
// //               ['Market Situation', inspection.market_situation],
// //               ['Client Position', inspection.client_position],
// //               ['Business Reputation', inspection.business_reputation],
// //               ['Production Type', inspection.production_type],
// //               ['Product Name', inspection.product_name],
// //               ['Production Capacity', inspection.production_capacity],
// //               ['Actual Production', inspection.actual_production],
// //               ['Profitability Observation', inspection.profitability_observation],
// //             ])}
            
// //             {renderSection('Labor Force', [
// //               ['Male Officer', inspection.male_officer],
// //               ['Female Officer', inspection.female_officer],
// //               ['Skilled Officer', inspection.skilled_officer],
// //               ['Unskilled Officer', inspection.unskilled_officer],
// //               ['Male Worker', inspection.male_worker],
// //               ['Female Worker', inspection.female_worker],
// //               ['Skilled Worker', inspection.skilled_worker],
// //               ['Unskilled Worker', inspection.unskilled_worker],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'financial' && (
// //           <div>
// //             {renderSection('Financial Information', [
// //               ['Cash Balance', inspection.cash_balance],
// //               ['Stock Trade Finished', inspection.stock_trade_finished],
// //               ['Stock Trade Financial', inspection.stock_trade_financial],
// //               ['Accounts Receivable', inspection.accounts_receivable],
// //               ['Advance Deposit', inspection.advance_deposit],
// //               ['Other Current Assets', inspection.other_current_assets],
// //               ['Land & Building', inspection.land_building],
// //               ['Plant & Machinery', inspection.plant_machinery],
// //               ['Other Assets', inspection.other_assets],
// //               ['IBBL Investment', inspection.ibbl_investment],
// //               ['Other Banks Investment', inspection.other_banks_investment],
// //               ['Borrowing Sources', inspection.borrowing_sources],
// //               ['Accounts Payable', inspection.accounts_payable],
// //               ['Other Current Liabilities', inspection.other_current_liabilities],
// //               ['Long Term Liabilities', inspection.long_term_liabilities],
// //               ['Other Non-Current Liabilities', inspection.other_non_current_liabilities],
// //               ['Paid Up Capital', inspection.paid_up_capital],
// //               ['Retained Earning', inspection.retained_earning],
// //               ['Resources', inspection.resources],
// //             ])}
// //           </div>
// //         )}

// //         {activeTab === 'location' && renderLocationSection()}

// //         {activeTab === 'media' && (
// //           <div>
// //             {renderMediaSection()}
// //             {renderChecklistSection()}
// //             {renderWorkingCapitalSection()}
// //           </div>
// //         )}
// //       </div>

// //       {/* Photo Viewer Modal */}
// //       {photoViewer.show && (
// //         <PhotoViewer
// //           photos={photoViewer.photos}
// //           initialIndex={photoViewer.currentIndex}
// //           onClose={closePhotoViewer}
// //         />
// //       )}

// //       {/* Document Viewer Modal */}
// //       {documentViewer.show && (
// //         <DocumentViewer
// //           document={documentViewer.document}
// //           onClose={closeDocumentViewer}
// //         />
// //       )}
// //     </div>
// //   );
// // };

// // export default InspectionDetailsPage;


























// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { getAdminInspectionById } from '../../services/inspectionService';
// import { useNotification } from '../../context/NotificationContext';
// import PhotoViewer from './PhotoViewer';
// import DocumentViewer from './DocumentViewer';

// const InspectionDetailsPage = () => {
//   const [inspection, setInspection] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState('basic');
//   const [showAllLocations, setShowAllLocations] = useState(false);
//   const [photoViewer, setPhotoViewer] = useState({ show: false, photos: [], currentIndex: 0 });
//   const [documentViewer, setDocumentViewer] = useState({ show: false, document: null });
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const { showError } = useNotification();

//   useEffect(() => {
//     fetchInspectionDetails();
//   }, [id]);

//   const fetchInspectionDetails = async () => {
//     try {
//       setLoading(true);
//       console.log('🔄 Fetching admin inspection details:', id);
//       const data = await getAdminInspectionById(id);
//       console.log('✅ Admin inspection details loaded:', data);
      
//       // Ensure all fields exist even if empty
//       const processedData = processInspectionData(data);
//       setInspection(processedData);
//     } catch (error) {
//       console.error('❌ Error fetching admin inspection:', error);
//       showError('Failed to fetch inspection details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Process inspection data to ensure all fields exist
//   const processInspectionData = (data) => {
//     if (!data) return null;

//     // Define all possible fields with default values
//     const defaultFields = {
//       // Basic Info
//       client_name: '',
//       industry_name: '',
//       branch_name: '',
//       status: '',
//       inspector: '',
//       created_at: '',
//       updated_at: '',

//       // Client Info
//       group_name: '',
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

//       // Owner Info
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

//       // Business Analysis
//       market_situation: '',
//       client_position: '',
//       business_reputation: '',
//       production_type: '',
//       product_name: '',
//       production_capacity: '',
//       actual_production: '',
//       profitability_observation: '',

//       // Labor Force
//       male_officer: '',
//       female_officer: '',
//       skilled_officer: '',
//       unskilled_officer: '',
//       male_worker: '',
//       female_worker: '',
//       skilled_worker: '',
//       unskilled_worker: '',

//       // Financial Info
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

//       // Media & Location
//       site_photos: [],
//       site_video: [],
//       uploaded_documents: [],
//       location_points: [],
//       total_location_points: 0,
//       location_start_time: '',
//       location_end_time: '',

//       // Additional sections
//       checklist_items: {},
//       working_capital_items: []
//     };

//     // Merge actual data with default fields
//     return { ...defaultFields, ...data };
//   };

//   // Helper Functions
//   const getStatusColor = (status) => {
//     const colors = {
//       'Pending': 'bg-yellow-100 text-yellow-800',
//       'In Progress': 'bg-blue-100 text-blue-800',
//       'Completed': 'bg-purple-100 text-purple-800',
//       'Approved': 'bg-green-100 text-green-800',
//       'Rejected': 'bg-red-100 text-red-800',
//     };
//     return colors[status] || 'bg-gray-100 text-gray-800';
//   };

//   const getStatusIcon = (status) => {
//     const icons = {
//       'Pending': '⏳',
//       'In Progress': '⚙️',
//       'Completed': '✅',
//       'Approved': '👍',
//       'Rejected': '❌',
//     };
//     return icons[status] || '📋';
//   };

//   const getInspectorName = (inspection) => {
//     if (inspection.inspector) {
//       if (typeof inspection.inspector === 'string') {
//         return inspection.inspector;
//       } else if (inspection.inspector.username) {
//         return inspection.inspector.username;
//       } else if (inspection.inspector.name) {
//         return inspection.inspector.name;
//       }
//     }
//     return 'N/A';
//   };

//   const getMediaUrl = (media) => {
//     if (!media) return '';
    
//     // Check for different possible URL fields
//     if (media.url) return media.url;
//     if (media.file_path) return media.file_path;
//     if (media.base64_data) {
//       if (media.base64_data.startsWith('data:')) {
//         return media.base64_data;
//       } else {
//         return `data:image/jpeg;base64,${media.base64_data}`;
//       }
//     }
//     if (media.file) return media.file;
//     if (typeof media === 'string') return media;
    
//     return '';
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'N/A';
//     try {
//       const date = new Date(dateString);
//       return date.toLocaleDateString('en-BD') + ' ' + date.toLocaleTimeString('en-BD');
//     } catch (e) {
//       return 'Invalid Date';
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (!bytes) return 'Unknown size';
//     if (bytes === 0) return '0 B';
    
//     const k = 1024;
//     const sizes = ['B', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
    
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
//   };

//   const getDocumentType = (fileName) => {
//     if (!fileName) return 'File';
//     const extension = fileName.split('.').pop()?.toLowerCase();
    
//     switch (extension) {
//       case 'pdf':
//         return 'PDF Document';
//       case 'doc':
//       case 'docx':
//         return 'Word Document';
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//         return 'Image File';
//       case 'mp4':
//       case 'avi':
//       case 'mov':
//         return 'Video File';
//       default:
//         return 'File';
//     }
//   };

//   const getDocumentIcon = (fileName) => {
//     if (!fileName) return '📄';
//     const extension = fileName.split('.').pop()?.toLowerCase();
    
//     switch (extension) {
//       case 'pdf':
//         return '📕';
//       case 'doc':
//       case 'docx':
//         return '📘';
//       case 'jpg':
//       case 'jpeg':
//       case 'png':
//         return '🖼️';
//       case 'mp4':
//       case 'avi':
//       case 'mov':
//         return '🎥';
//       default:
//         return '📄';
//     }
//   };

//   // Photo viewing functions
//   const showPhotoFullScreen = (photo, currentIndex, allPhotos) => {
//     console.log('Opening photo viewer:', { photo, currentIndex, allPhotos });
//     setPhotoViewer({
//       show: true,
//       photos: allPhotos,
//       currentIndex: currentIndex
//     });
//   };

//   const closePhotoViewer = () => {
//     setPhotoViewer({ show: false, photos: [], currentIndex: 0 });
//   };

//   // Document viewing functions
//   const showDocumentFullScreen = (doc, index) => {
//     console.log('Opening document viewer:', { doc, index });
//     setDocumentViewer({
//       show: true,
//       document: doc
//     });
//   };

//   const closeDocumentViewer = () => {
//     setDocumentViewer({ show: false, document: null });
//   };

//   const showDocumentInfo = (doc, index) => {
//     const fileName = doc.name || `Document ${index + 1}`;
//     const filePath = doc.file_path || '';
    
//     alert(`Document Information:\n\nName: ${fileName}\nType: ${getDocumentType(fileName)}\nPath: ${filePath}\nSize: ${doc.file_size ? formatFileSize(doc.file_size) : 'Unknown'}`);
//   };

//   // Location Tracking Section
//   const renderLocationSection = () => {
//     if (!inspection) return null;

//     const locationPoints = inspection.location_points || [];
//     const totalPoints = inspection.total_location_points || locationPoints.length;
//     const startTime = inspection.location_start_time;
//     const endTime = inspection.location_end_time;

//     if (locationPoints.length === 0) {
//       return (
//         <div className="mb-6">
//           <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//             <h3 className="text-lg font-semibold">Location Tracking Data</h3>
//           </div>
//           <div className="bg-white shadow rounded-lg p-6 text-center">
//             <div className="text-6xl mb-4">📍</div>
//             <h4 className="text-lg font-semibold text-gray-700 mb-2">No Location Data</h4>
//             <p className="text-gray-500">No location tracking data available for this inspection.</p>
//           </div>
//         </div>
//       );
//     }

//     const renderLocationPoint = (point, label, index) => {
//       const latitude = point.latitude ? point.latitude.toFixed(6) : 'N/A';
//       const longitude = point.longitude ? point.longitude.toFixed(6) : 'N/A';
//       const timestamp = point.timestamp || '';
//       const accuracy = point.accuracy ? point.accuracy.toFixed(2) : 'N/A';
//       const speed = point.speed ? point.speed.toFixed(2) : 'N/A';

//       return (
//         <div key={index} className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-50">
//           <div className="text-sm font-semibold text-green-800 mb-2">{label}</div>
//           <div className="grid grid-cols-2 gap-1 text-xs">
//             <div>
//               <span className="font-medium">Coordinates:</span> {latitude}, {longitude}
//             </div>
//             <div>
//               <span className="font-medium">Accuracy:</span> {accuracy} meters
//             </div>
//             {speed !== 'N/A' && parseFloat(speed) > 0 && (
//               <div>
//                 <span className="font-medium">Speed:</span> {speed} m/s
//               </div>
//             )}
//             <div>
//               <span className="font-medium">Time:</span> {formatDate(timestamp)}
//             </div>
//           </div>
//         </div>
//       );
//     };

//     return (
//       <div className="mb-6">
//         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//           <h3 className="text-lg font-semibold">Location Tracking Data</h3>
//         </div>
        
//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <div className="text-center p-3 bg-blue-50 rounded-lg">
//                 <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
//                 <div className="text-sm text-blue-600">Total Points</div>
//               </div>
//               <div className="text-center p-3 bg-green-50 rounded-lg">
//                 <div className="text-sm font-semibold text-green-600">Start Time</div>
//                 <div className="text-xs text-green-600">{formatDate(startTime)}</div>
//               </div>
//               <div className="text-center p-3 bg-red-50 rounded-lg">
//                 <div className="text-sm font-semibold text-red-600">End Time</div>
//                 <div className="text-xs text-red-600">{formatDate(endTime)}</div>
//               </div>
//             </div>

//             {locationPoints.length > 0 && (
//               <>
//                 {renderLocationPoint(locationPoints[0], 'First Location', 0)}
//                 {locationPoints.length > 1 && 
//                  renderLocationPoint(locationPoints[locationPoints.length - 1], 'Last Location', 1)}
                
//                 {locationPoints.length > 2 && (
//                   <div className="mt-4">
//                     <button
//                       onClick={() => setShowAllLocations(!showAllLocations)}
//                       className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                     >
//                       <span className="mr-2">
//                         {showAllLocations ? '👁️‍🗨️' : '👁️'}
//                       </span>
//                       {showAllLocations ? 'Hide All Locations' : 'Show All Locations'}
//                     </button>
//                   </div>
//                 )}

//                 {showAllLocations && locationPoints.length > 2 && (
//                   <div className="mt-4">
//                     <h4 className="font-semibold text-green-800 mb-2">All Location Points:</h4>
//                     <div className="space-y-2 max-h-60 overflow-y-auto">
//                       {locationPoints.map((point, index) => 
//                         renderLocationPoint(point, `Point ${index + 1}`, index)
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => navigate(`/admin/inspection-map/${id}`)}
//                     className="flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
//                   >
//                     <span className="mr-2">🗺️</span>
//                     Interactive Map
//                   </button>
//                   <button
//                     onClick={openGoogleMaps}
//                     className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
//                   >
//                     <span className="mr-2">🌐</span>
//                     Google Maps
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   const openGoogleMaps = () => {
//     const locationPoints = inspection.location_points || [];
//     if (locationPoints.length === 0) {
//       showError('No location data available to show on map');
//       return;
//     }

//     const firstPoint = locationPoints[0];
//     const lat = firstPoint.latitude;
//     const lng = firstPoint.longitude;
    
//     if (!lat || !lng) {
//       showError('Invalid location coordinates');
//       return;
//     }

//     const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
//     window.open(url, '_blank');
//   };

//   // Checklist Section
//   const renderChecklistSection = () => {
//     if (!inspection) return null;

//     const checklistItems = inspection.checklist_items || {};
//     if (Object.keys(checklistItems).length === 0) {
//       return (
//         <div className="mb-6">
//           <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//             <h3 className="text-lg font-semibold">K. Checklist Verification</h3>
//           </div>
//           <div className="bg-white shadow rounded-lg p-6 text-center">
//             <div className="text-6xl mb-4">📋</div>
//             <h4 className="text-lg font-semibold text-gray-700 mb-2">No Checklist Data</h4>
//             <p className="text-gray-500">No checklist verification data available.</p>
//           </div>
//         </div>
//       );
//     }

//     const renderChecklistRow = (label, value) => {
//       let statusText, statusColor, statusIcon;
      
//       if (value === true) {
//         statusText = 'Yes';
//         statusColor = 'bg-green-100 text-green-800 border-green-300';
//         statusIcon = '✅';
//       } else if (value === false) {
//         statusText = 'No';
//         statusColor = 'bg-red-100 text-red-800 border-red-300';
//         statusIcon = '❌';
//       } else {
//         statusText = 'N/A';
//         statusColor = 'bg-orange-100 text-orange-800 border-orange-300';
//         statusIcon = '❓';
//       }

//       return (
//         <div key={label} className="flex items-center justify-between py-3 border-b border-gray-200">
//           <div className="flex-1">
//             <span className="text-gray-700">{label}</span>
//           </div>
//           <div className={`flex items-center px-3 py-1 rounded-full border ${statusColor}`}>
//             <span className="mr-2">{statusIcon}</span>
//             <span className="text-sm font-semibold">{statusText}</span>
//           </div>
//         </div>
//       );
//     };

//     return (
//       <div className="mb-6">
//         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//           <h3 className="text-lg font-semibold">K. Checklist Verification</h3>
//         </div>
        
//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="space-y-2">
//             {Object.entries(checklistItems).map(([key, value]) => 
//               renderChecklistRow(key, value)
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Update the media rendering functions to use the new viewers
//   const renderPhotoThumbnail = (photo, index, allPhotos) => {
//     const displayUrl = getMediaUrl(photo);
//     const displayName = photo.name || `Photo ${index + 1}`;

//     console.log(`Rendering photo ${index}:`, { displayUrl, displayName, photo });

//     return (
//       <div 
//         key={index}
//         className="relative group cursor-pointer border border-gray-300 rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow"
//         onClick={() => showPhotoFullScreen(photo, index, allPhotos)}
//       >
//         {displayUrl ? (
//           <img 
//             src={displayUrl}
//             alt={displayName}
//             className="w-full h-32 object-cover"
//             onError={(e) => {
//               console.error(`Failed to load image: ${displayUrl}`);
//               e.target.src = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Image+Not+Found';
//             }}
//             onLoad={() => console.log(`✅ Image loaded: ${displayUrl}`)}
//           />
//         ) : (
//           <div className="w-full h-32 flex flex-col items-center justify-center bg-gray-200">
//             <span className="text-2xl">📷</span>
//             <span className="text-xs mt-1">{displayName}</span>
//             <span className="text-xs text-red-500 mt-1">No URL</span>
//           </div>
//         )}
//         <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-end">
//           <div className="w-full p-2 bg-gradient-to-t from-black to-transparent text-white text-xs">
//             <div className="font-medium truncate">{displayName}</div>
//             <div className="opacity-90">Click to view</div>
//           </div>
//         </div>
//         <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
//           📸
//         </div>
//       </div>
//     );
//   };

//   const renderDocumentItem = (doc, index) => {
//     const displayName = doc.name || `Document ${index + 1}`;
//     const filePath = doc.file_path || '';

//     console.log(`Rendering document ${index}:`, { doc, displayName, filePath });

//     return (
//       <div 
//         key={index}
//         className="flex items-center p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-100"
//         onClick={() => showDocumentFullScreen(doc, index)}
//       >
//         <div className="text-3xl mr-4">
//           {getDocumentIcon(displayName)}
//         </div>
//         <div className="flex-1">
//           <div className="font-medium text-gray-900">{displayName}</div>
//           <div className="text-sm text-gray-600">
//             {filePath ? 'Click to view document' : 'No file path available'}
//           </div>
//           {doc.file_size && (
//             <div className="text-xs text-gray-500 mt-1">
//               {formatFileSize(doc.file_size)}
//             </div>
//           )}
//         </div>
//         <div className="flex space-x-2">
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               showDocumentFullScreen(doc, index);
//             }}
//             className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
//             title="View Document"
//           >
//             👁️
//           </button>
//           <button 
//             onClick={(e) => {
//               e.stopPropagation();
//               showDocumentInfo(doc, index);
//             }}
//             className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
//             title="Document Info"
//           >
//             ℹ️
//           </button>
//         </div>
//       </div>
//     );
//   };

//   // Update the media section to pass allPhotos to thumbnail renderer
//   const renderMediaSection = () => {
//     if (!inspection) return null;

//     const sitePhotos = inspection.site_photos || [];
//     const siteVideo = inspection.site_video || [];
//     const uploadedDocuments = inspection.uploaded_documents || [];

//     console.log('Media section data:', { sitePhotos, siteVideo, uploadedDocuments });

//     if (sitePhotos.length === 0 && siteVideo.length === 0 && uploadedDocuments.length === 0) {
//       return (
//         <div className="mb-6">
//           <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//             <h3 className="text-lg font-semibold">Media & Documents</h3>
//           </div>
//           <div className="bg-white shadow rounded-lg p-6 text-center">
//             <div className="text-6xl mb-4">📁</div>
//             <h4 className="text-lg font-semibold text-gray-700 mb-2">No Media Files</h4>
//             <p className="text-gray-500">No photos, videos, or documents have been uploaded for this inspection.</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="mb-6">
//         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//           <h3 className="text-lg font-semibold">Media & Documents</h3>
//         </div>
        
//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="grid grid-cols-3 gap-4 mb-6">
//             <div className="text-center p-4 bg-blue-50 rounded-lg">
//               <div className="text-2xl">📸</div>
//               <div className="text-lg font-semibold text-blue-700">{sitePhotos.length}</div>
//               <div className="text-sm text-blue-600">Photos</div>
//             </div>
//             <div className="text-center p-4 bg-green-50 rounded-lg">
//               <div className="text-2xl">🎥</div>
//               <div className="text-lg font-semibold text-green-700">{siteVideo.length}</div>
//               <div className="text-sm text-green-600">Videos</div>
//             </div>
//             <div className="text-center p-4 bg-purple-50 rounded-lg">
//               <div className="text-2xl">📄</div>
//               <div className="text-lg font-semibold text-purple-700">{uploadedDocuments.length}</div>
//               <div className="text-sm text-purple-600">Documents</div>
//             </div>
//           </div>

//           {sitePhotos.length > 0 && (
//             <div className="mb-6">
//               <h4 className="font-semibold text-green-800 mb-3">Site Photos</h4>
//               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
//                 {sitePhotos.map((photo, index) => 
//                   renderPhotoThumbnail(photo, index, sitePhotos)
//                 )}
//               </div>
//             </div>
//           )}

//           {uploadedDocuments.length > 0 && (
//             <div>
//               <h4 className="font-semibold text-green-800 mb-3">Supporting Documents</h4>
//               <div className="space-y-3">
//                 {uploadedDocuments.map(renderDocumentItem)}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };

//   // Working Capital Assessment Section
//   const renderWorkingCapitalSection = () => {
//     if (!inspection) return null;

//     const workingCapitalItems = inspection.working_capital_items || [];
//     if (workingCapitalItems.length === 0) {
//       return (
//         <div className="mb-6">
//           <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//             <h3 className="text-lg font-semibold">I. Working Capital Assessment</h3>
//           </div>
//           <div className="bg-white shadow rounded-lg p-6 text-center">
//             <div className="text-6xl mb-4">💰</div>
//             <h4 className="text-lg font-semibold text-gray-700 mb-2">No Working Capital Data</h4>
//             <p className="text-gray-500">No working capital assessment data available.</p>
//           </div>
//         </div>
//       );
//     }

//     return (
//       <div className="mb-6">
//         <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
//           <h3 className="text-lg font-semibold">I. Working Capital Assessment</h3>
//         </div>
        
//         <div className="bg-white shadow rounded-lg p-6">
//           <div className="space-y-3">
//             {workingCapitalItems.map((item, index) => (
//               <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
//                 <div className="font-medium text-green-800">{item.name || 'Item'}</div>
//                 <div className="text-sm text-gray-600">
//                   Unit: {item.unit || 'N/A'}, Rate: {item.rate || 'N/A'}, Amount: {item.amount || 'N/A'}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     );
//   };

//   // Generic Section Renderer - FIXED to show all fields even if empty
//   const renderSection = (title, fields) => (
//     <div className="bg-white shadow rounded-lg mb-6">
//       <div className="bg-green-800 text-white px-4 py-3 rounded-t-lg">
//         <h3 className="text-lg font-semibold">{title}</h3>
//       </div>
//       <div className="p-6">
//         <dl className="space-y-4">
//           {fields.map(([label, value], index) => (
//             <div key={index} className="flex flex-col sm:flex-row sm:items-start">
//               <dt className="text-sm font-medium text-gray-500 sm:w-1/3 mb-1 sm:mb-0">{label}</dt>
//               <dd className="text-sm text-gray-900 sm:w-2/3 break-words">
//                 {value || value === 0 ? value : <span className="text-gray-400 italic">Not provided</span>}
//               </dd>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
//         <span className="ml-3 text-gray-600">Loading inspection details...</span>
//       </div>
//     );
//   }

//   if (!inspection) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-gray-400 text-6xl mb-4">🔍</div>
//         <h3 className="text-lg font-medium text-gray-900 mb-2">Inspection not found</h3>
//         <p className="text-gray-500 mb-4">The inspection you're looking for doesn't exist.</p>
//         <div className="space-x-3">
//           <button
//             onClick={() => navigate(-1)}
//             className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//           >
//             Go Back
//           </button>
//           <button
//             onClick={() => navigate('/admin/dashboard')}
//             className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
//           >
//             Back to Dashboard
//           </button>
//         </div>
//       </div>
//     );
//   }

//   const tabs = [
//     { id: 'basic', name: 'Basic Info' },
//     { id: 'client', name: 'Client Info' },
//     { id: 'owner', name: 'Owner Info' },
//     { id: 'business', name: 'Business Analysis' },
//     { id: 'financial', name: 'Financial Info' },
//     { id: 'location', name: 'Location Tracking' },
//     { id: 'media', name: 'Media & Documents' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-green-800 text-white">
//         <div className="container mx-auto px-4 py-6">
//           <div className="flex items-center justify-between">
//             <div className="flex items-center space-x-4">
//               <button
//                 onClick={() => navigate(-1)}
//                 className="flex items-center px-3 py-2 text-sm bg-green-700 rounded-md hover:bg-green-600 transition-colors"
//               >
//                 ← Back
//               </button>
//               <button
//                 onClick={fetchInspectionDetails}
//                 className="px-3 py-2 text-sm bg-green-700 rounded-md hover:bg-green-600 transition-colors"
//               >
//                 Refresh
//               </button>
//             </div>
//             <button
//               onClick={() => navigate(`/admin/edit-inspection/${id}`)}
//               className="flex items-center px-4 py-2 bg-white text-green-800 rounded-md hover:bg-gray-100 transition-colors"
//             >
//               <span className="mr-2">✏️</span>
//               Edit Inspection
//             </button>
//           </div>

//           <div className="mt-4">
//             <h1 className="text-2xl font-bold">
//               {inspection.client_name || 'Unnamed Inspection'}
//             </h1>
            
//             <div className="mt-3 flex flex-wrap items-center gap-3">
//               <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inspection.status)}`}>
//                 <span className="mr-2">{getStatusIcon(inspection.status)}</span>
//                 {inspection.status}
//               </span>
//               <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
//                 Inspector: {getInspectorName(inspection)}
//               </span>
//               <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
//                 Branch: {inspection.branch_name || 'N/A'}
//               </span>
//               <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
//                 ID: {inspection.id}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="bg-white border-b">
//         <div className="container mx-auto px-4">
//           <nav className="flex space-x-8 overflow-x-auto">
//             {tabs.map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveTab(tab.id)}
//                 className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
//                   activeTab === tab.id
//                     ? 'border-green-500 text-green-600'
//                     : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
//                 }`}
//               >
//                 {tab.name}
//               </button>
//             ))}
//           </nav>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto px-4 py-6">
//         {activeTab === 'basic' && (
//           <div>
//             {renderSection('Basic Information', [
//               ['Client Name', inspection.client_name],
//               ['Industry', inspection.industry_name],
//               ['Branch', inspection.branch_name],
//               ['Status', inspection.status],
//               ['Inspector', getInspectorName(inspection)],
//               ['Created', formatDate(inspection.created_at)],
//               ['Last Updated', formatDate(inspection.updated_at)],
//             ])}
//           </div>
//         )}

//         {activeTab === 'client' && (
//           <div>
//             {renderSection('Client Information', [
//               ['Group Name', inspection.group_name],
//               ['Nature of Business', inspection.nature_of_business],
//               ['Legal Status', inspection.legal_status],
//               ['Date of Establishment', inspection.date_of_establishment],
//               ['Office Address', inspection.office_address],
//               ['Showroom Address', inspection.showroom_address],
//               ['Factory Address', inspection.factory_address],
//               ['Phone Number', inspection.phone_number],
//               ['Account Number', inspection.account_number],
//               ['Account ID', inspection.account_id],
//               ['TIN Number', inspection.tin_number],
//               ['Date of Opening', inspection.date_of_opening],
//               ['VAT Registration Number', inspection.vat_reg_number],
//               ['First Investment Date', inspection.first_investment_date],
//               ['Sector Code', inspection.sector_code],
//               ['Trade License', inspection.trade_license],
//               ['Economic Purpose Code', inspection.economic_purpose_code],
//               ['Investment Category', inspection.investment_category],
//             ])}
//           </div>
//         )}

//         {activeTab === 'owner' && (
//           <div>
//             {renderSection('Owner Information', [
//               ['Owner Name', inspection.owner_name],
//               ['Age', inspection.owner_age],
//               ['Father Name', inspection.father_name],
//               ['Mother Name', inspection.mother_name],
//               ['Spouse Name', inspection.spouse_name],
//               ['Academic Qualification', inspection.academic_qualification],
//               ['Children Info', inspection.children_info],
//               ['Business Successor', inspection.business_successor],
//               ['Residential Address', inspection.residential_address],
//               ['Permanent Address', inspection.permanent_address],
//             ])}
//           </div>
//         )}

//         {activeTab === 'business' && (
//           <div>
//             {renderSection('Business Analysis', [
//               ['Market Situation', inspection.market_situation],
//               ['Client Position', inspection.client_position],
//               ['Business Reputation', inspection.business_reputation],
//               ['Production Type', inspection.production_type],
//               ['Product Name', inspection.product_name],
//               ['Production Capacity', inspection.production_capacity],
//               ['Actual Production', inspection.actual_production],
//               ['Profitability Observation', inspection.profitability_observation],
//             ])}
            
//             {renderSection('Labor Force', [
//               ['Male Officer', inspection.male_officer],
//               ['Female Officer', inspection.female_officer],
//               ['Skilled Officer', inspection.skilled_officer],
//               ['Unskilled Officer', inspection.unskilled_officer],
//               ['Male Worker', inspection.male_worker],
//               ['Female Worker', inspection.female_worker],
//               ['Skilled Worker', inspection.skilled_worker],
//               ['Unskilled Worker', inspection.unskilled_worker],
//             ])}
//           </div>
//         )}

//         {activeTab === 'financial' && (
//           <div>
//             {renderSection('Financial Information', [
//               ['Cash Balance', inspection.cash_balance],
//               ['Stock Trade Finished', inspection.stock_trade_finished],
//               ['Stock Trade Financial', inspection.stock_trade_financial],
//               ['Accounts Receivable', inspection.accounts_receivable],
//               ['Advance Deposit', inspection.advance_deposit],
//               ['Other Current Assets', inspection.other_current_assets],
//               ['Land & Building', inspection.land_building],
//               ['Plant & Machinery', inspection.plant_machinery],
//               ['Other Assets', inspection.other_assets],
//               ['IBBL Investment', inspection.ibbl_investment],
//               ['Other Banks Investment', inspection.other_banks_investment],
//               ['Borrowing Sources', inspection.borrowing_sources],
//               ['Accounts Payable', inspection.accounts_payable],
//               ['Other Current Liabilities', inspection.other_current_liabilities],
//               ['Long Term Liabilities', inspection.long_term_liabilities],
//               ['Other Non-Current Liabilities', inspection.other_non_current_liabilities],
//               ['Paid Up Capital', inspection.paid_up_capital],
//               ['Retained Earning', inspection.retained_earning],
//               ['Resources', inspection.resources],
//             ])}
//           </div>
//         )}

//         {activeTab === 'location' && renderLocationSection()}

//         {activeTab === 'media' && (
//           <div>
//             {renderMediaSection()}
//             {renderChecklistSection()}
//             {renderWorkingCapitalSection()}
//           </div>
//         )}
//       </div>

//       {/* Photo Viewer Modal */}
//       {photoViewer.show && (
//         <PhotoViewer
//           photos={photoViewer.photos}
//           initialIndex={photoViewer.currentIndex}
//           onClose={closePhotoViewer}
//         />
//       )}

//       {/* Document Viewer Modal */}
//       {documentViewer.show && (
//         <DocumentViewer
//           document={documentViewer.document}
//           onClose={closeDocumentViewer}
//         />
//       )}
//     </div>
//   );
// };

// export default InspectionDetailsPage;











































import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAdminInspectionById } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';
import PhotoViewer from './PhotoViewer';
import DocumentViewer from './DocumentViewer';

const InspectionDetailsPage = () => {
  const [inspection, setInspection] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('basic');
  const [showAllLocations, setShowAllLocations] = useState(false);
  const [photoViewer, setPhotoViewer] = useState({ show: false, photos: [], currentIndex: 0 });
  const [documentViewer, setDocumentViewer] = useState({ show: false, document: null });
  const { id } = useParams();
  const navigate = useNavigate();
  const { showError } = useNotification();

  useEffect(() => {
    fetchInspectionDetails();
  }, [id]);

  // JSON ফিল্ড পার্স করার ফাংশন
  const parseJsonField = (fieldData) => {
    if (!fieldData) return [];
    
    if (typeof fieldData === 'string') {
      try {
        const parsed = JSON.parse(fieldData);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch (error) {
        console.error('JSON parse error:', error);
        return [];
      }
    } else if (Array.isArray(fieldData)) {
      return fieldData;
    } else if (typeof fieldData === 'object') {
      return [fieldData];
    }
    
    return [];
  };

  const fetchInspectionDetails = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching admin inspection details:', id);
      const data = await getAdminInspectionById(id);
      console.log('✅ Admin inspection details loaded:', data);
      
      // JSON ফিল্ডগুলো পার্স করে সেট করুন
      if (data) {
        const parsedData = {
          ...data,
          key_employees: parseJsonField(data.key_employees),
          working_capital_items: parseJsonField(data.working_capital_items),
          partners_directors: parseJsonField(data.partners_directors),
          competitors: parseJsonField(data.competitors),
          location_points: parseJsonField(data.location_points),
          site_photos: parseJsonField(data.site_photos),
          uploaded_documents: parseJsonField(data.uploaded_documents),
          checklist_items: data.checklist_items || {}
        };
        setInspection(parsedData);
      } else {
        setInspection(data);
      }
    } catch (error) {
      console.error('❌ Error fetching admin inspection:', error);
      showError('Failed to fetch inspection details');
    } finally {
      setLoading(false);
    }
  };

  // Helper Functions
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

  const getStatusIcon = (status) => {
    const icons = {
      'Pending': '⏳',
      'In Progress': '⚙️',
      'Completed': '✅',
      'Approved': '👍',
      'Rejected': '❌',
    };
    return icons[status] || '📋';
  };

  const getInspectorName = (inspection) => {
    if (inspection.inspector) {
      if (typeof inspection.inspector === 'string') {
        return inspection.inspector;
      } else if (inspection.inspector.username) {
        return inspection.inspector.username;
      } else if (inspection.inspector.name) {
        return inspection.inspector.name;
      }
    }
    return 'N/A';
  };

  const getMediaUrl = (media) => {
    if (!media) return '';
    
    if (media.url) {
      return media.url;
    }
    
    if (media.file_path) {
      if (media.file_path.startsWith('http')) {
        return media.file_path;
      } else {
        return `file://${media.file_path}`;
      }
    }
    
    if (media.base64_data) {
      if (media.base64_data.startsWith('data:')) {
        return media.base64_data;
      } else {
        return `data:image/jpeg;base64,${media.base64_data}`;
      }
    }
    
    if (typeof media === 'string') {
      return media;
    }
    
    return '';
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-BD') + ' ' + date.toLocaleTimeString('en-BD');
    } catch (e) {
      return 'Invalid Date';
    }
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return 'Unknown size';
    if (bytes === 0) return '0 B';
    
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const getDocumentType = (fileName) => {
    if (!fileName) return 'File';
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return 'PDF Document';
      case 'doc':
      case 'docx':
        return 'Word Document';
      case 'jpg':
      case 'jpeg':
        return 'JPEG Image';
      case 'png':
        return 'PNG Image';
      case 'mp4':
      case 'avi':
      case 'mov':
        return 'Video File';
      default:
        return 'File';
    }
  };

  const getDocumentIcon = (fileName) => {
    if (!fileName) return '📄';
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📕';
      case 'doc':
      case 'docx':
        return '📘';
      case 'jpg':
      case 'jpeg':
      case 'png':
        return '🖼️';
      case 'mp4':
      case 'avi':
      case 'mov':
        return '🎥';
      default:
        return '📄';
    }
  };

  // Photo viewing functions
  const showPhotoFullScreen = (photo, currentIndex, allPhotos) => {
    console.log('Opening photo viewer:', { photo, currentIndex, allPhotos });
    setPhotoViewer({
      show: true,
      photos: allPhotos,
      currentIndex: currentIndex
    });
  };

  const closePhotoViewer = () => {
    setPhotoViewer({ show: false, photos: [], currentIndex: 0 });
  };

  // Document viewing functions
  const showDocumentFullScreen = (doc, index) => {
    console.log('Opening document viewer:', { doc, index });
    setDocumentViewer({
      show: true,
      document: doc
    });
  };

  const closeDocumentViewer = () => {
    setDocumentViewer({ show: false, document: null });
  };

  const showDocumentInfo = (doc, index) => {
    const fileName = doc.name || `Document ${index + 1}`;
    const filePath = doc.file_path || '';
    
    alert(`Document Information:\n\nName: ${fileName}\nType: ${getDocumentType(fileName)}\nPath: ${filePath}\nSize: ${doc.file_size ? formatFileSize(doc.file_size) : 'Unknown'}`);
  };

  // Enhanced Location Tracking Section with Google Maps
// Enhanced Location Tracking Section with Interactive Map
// Enhanced Location Tracking Section with Google Maps
  const renderLocationSection = () => {
    if (!inspection) return null;

    const locationPoints = inspection.location_points || [];
    const totalPoints = inspection.total_location_points || locationPoints.length;
    const startTime = inspection.location_start_time;
    const endTime = inspection.location_end_time;

    if (locationPoints.length === 0) {
      return (
        <div className="mb-6">
          <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
            <h3 className="text-lg font-semibold">Location Tracking Data</h3>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <div className="text-6xl mb-4">📍</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Location Data</h4>
            <p className="text-gray-500">No location tracking data available for this inspection.</p>
          </div>
        </div>
      );
    }

    const renderLocationPoint = (point, label, index) => {
      const latitude = point.latitude ? point.latitude.toFixed(6) : 'N/A';
      const longitude = point.longitude ? point.longitude.toFixed(6) : 'N/A';
      const timestamp = point.timestamp || '';
      const accuracy = point.accuracy ? point.accuracy.toFixed(2) : 'N/A';
      const speed = point.speed ? point.speed.toFixed(2) : 'N/A';
      const altitude = point.altitude ? point.altitude.toFixed(2) : 'N/A';
      const heading = point.heading ? point.heading.toFixed(2) : 'N/A';

      return (
        <div key={index} className="border border-gray-300 rounded-lg p-3 mb-2 bg-gray-50">
          <div className="text-sm font-semibold text-green-800 mb-2">{label}</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            <div><span className="font-medium">Coordinates:</span> {latitude}, {longitude}</div>
            <div><span className="font-medium">Accuracy:</span> {accuracy} meters</div>
            {speed !== 'N/A' && parseFloat(speed) > 0 && (
              <div><span className="font-medium">Speed:</span> {speed} m/s</div>
            )}
            {altitude !== 'N/A' && (
              <div><span className="font-medium">Altitude:</span> {altitude} meters</div>
            )}
            {heading !== 'N/A' && (
              <div><span className="font-medium">Heading:</span> {heading}°</div>
            )}
            <div className="md:col-span-2">
              <span className="font-medium">Time:</span> {formatDate(timestamp)}
            </div>
          </div>
        </div>
      );
    };

    const calculateDuration = (startTime, endTime) => {
      try {
        const start = new Date(startTime);
        const end = new Date(endTime);
        const diffMs = end - start;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours}h ${minutes}m`;
      } catch (e) {
        return 'N/A';
      }
    };

    // Generate Google Maps URL with polyline
    const generateGoogleMapsUrl = () => {
      if (locationPoints.length === 0) return '';
      
      const points = locationPoints
        .filter(point => point.latitude && point.longitude)
        .map(point => `${point.latitude},${point.longitude}`)
        .join('/');
      
      return `https://www.google.com/maps/dir/${points}`;
    };

    // Generate Google Maps Embed URL
    const generateGoogleMapsEmbedUrl = () => {
      if (locationPoints.length === 0) return '';
      
      const validPoints = locationPoints.filter(point => point.latitude && point.longitude);
      if (validPoints.length === 0) return '';
      
      // Calculate bounds for the map
      const lats = validPoints.map(p => p.latitude);
      const lngs = validPoints.map(p => p.longitude);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      
      // Center of the map
      const centerLat = (minLat + maxLat) / 2;
      const centerLng = (minLng + maxLng) / 2;
      
      // Create polyline points
      const polylinePoints = validPoints
        .map(point => `${point.latitude},${point.longitude}`)
        .join('|');
      
      return `https://www.google.com/maps/embed/v1/directions?` +
        `key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&` + // Replace with your actual Google Maps API key
        `origin=${validPoints[0].latitude},${validPoints[0].longitude}&` +
        `destination=${validPoints[validPoints.length - 1].latitude},${validPoints[validPoints.length - 1].longitude}&` +
        `waypoints=${polylinePoints}&` +
        `zoom=12&` +
        `maptype=roadmap`;
    };

    // Calculate distance between points in kilometers
    const calculateDistance = (points) => {
      if (points.length < 2) return 0;
      
      let totalDistance = 0;
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const distance = haversineDistance(
          prev.latitude, prev.longitude,
          curr.latitude, curr.longitude
        );
        totalDistance += distance;
      }
      return totalDistance;
    };

    // Haversine formula to calculate distance between two coordinates
    const haversineDistance = (lat1, lon1, lat2, lon2) => {
      const R = 6371; // Earth's radius in kilometers
      const dLat = (lat2 - lat1) * Math.PI / 180;
      const dLon = (lon2 - lon1) * Math.PI / 180;
      const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    // Calculate average speed
    const calculateAverageSpeed = (points, start, end) => {
      if (points.length < 2 || !start || !end) return 0;
      
      try {
        const startTime = new Date(start);
        const endTime = new Date(end);
        const durationHours = (endTime - startTime) / (1000 * 60 * 60);
        
        if (durationHours <= 0) return 0;
        
        const totalDistance = calculateDistance(points);
        return totalDistance / durationHours;
      } catch (e) {
        return 0;
      }
    };

    const validPoints = locationPoints.filter(point => point.latitude && point.longitude);

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">Location Tracking Data</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="text-2xl font-bold text-blue-600">{totalPoints}</div>
                <div className="text-sm text-blue-600 font-medium">Total Points</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="text-sm font-semibold text-green-600">Start Time</div>
                <div className="text-xs text-green-600 mt-1">{formatDate(startTime)}</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="text-sm font-semibold text-red-600">End Time</div>
                <div className="text-xs text-red-600 mt-1">{formatDate(endTime)}</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="text-sm font-semibold text-purple-600">Duration</div>
                <div className="text-xs text-purple-600 mt-1">
                  {startTime && endTime ? 
                    calculateDuration(startTime, endTime) : 'N/A'
                  }
                </div>
              </div>
            </div>

            {/* Google Maps Embed */}
            {validPoints.length > 0 && (
              <div className="mt-6">
                <h4 className="font-semibold text-green-800 mb-3 text-lg">Inspection Route Map</h4>
                <div className="bg-gray-100 rounded-lg p-4 border border-gray-300">
                  <div className="h-96 rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src={generateGoogleMapsEmbedUrl()}
                      allowFullScreen
                      title="Inspection Route Map"
                    >
                    </iframe>
                  </div>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">Start Point</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                        <span className="text-sm text-gray-600">End Point</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-1 bg-blue-500 mr-2"></div>
                        <span className="text-sm text-gray-600">Route</span>
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(generateGoogleMapsUrl(), '_blank')}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      <span className="mr-2">🌐</span>
                      Open in Google Maps
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Route Statistics */}
            {validPoints.length > 1 && (
              <div className="mt-6">
                <h4 className="font-semibold text-green-800 mb-3 text-lg">Route Statistics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-lg font-bold text-blue-600">{validPoints.length}</div>
                    <div className="text-sm text-blue-600 font-medium">Location Points</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-lg font-bold text-green-600">
                      {calculateDistance(validPoints).toFixed(2)}
                    </div>
                    <div className="text-sm text-green-600 font-medium">Total Distance (km)</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-lg font-bold text-purple-600">
                      {calculateDuration(startTime, endTime)}
                    </div>
                    <div className="text-sm text-purple-600 font-medium">Duration</div>
                  </div>
                  <div className="text-center p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="text-lg font-bold text-red-600">
                      {calculateAverageSpeed(validPoints, startTime, endTime).toFixed(1)}
                    </div>
                    <div className="text-sm text-red-600 font-medium">Avg Speed (km/h)</div>
                  </div>
                </div>
              </div>
            )}

            {/* First and Last Location */}
            <div className="mt-6">
              <h4 className="font-semibold text-green-800 mb-3 text-lg">Key Locations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {locationPoints.length > 0 && renderLocationPoint(locationPoints[0], '📍 Start Location', 0)}
                {locationPoints.length > 1 && 
                renderLocationPoint(locationPoints[locationPoints.length - 1], '🎯 End Location', 1)}
              </div>
            </div>

            {/* Show All Locations Toggle */}
            {locationPoints.length > 2 && (
              <div className="mt-6">
                <button
                  onClick={() => setShowAllLocations(!showAllLocations)}
                  className="flex items-center justify-center w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  <span className="mr-2 text-lg">
                    {showAllLocations ? '👁️‍🗨️' : '👁️'}
                  </span>
                  {showAllLocations ? 'Hide All Locations' : `Show All ${locationPoints.length} Location Points`}
                </button>
              </div>
            )}

            {/* All Locations */}
            {showAllLocations && locationPoints.length > 2 && (
              <div className="mt-6">
                <h4 className="font-semibold text-green-800 mb-3 text-lg">All Location Points</h4>
                <div className="space-y-3 max-h-96 overflow-y-auto p-2">
                  {locationPoints.map((point, index) => 
                    renderLocationPoint(point, `📍 Point ${index + 1}`, index)
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };
  // Partners/Directors Section
  const renderPartnersDirectorsSection = () => {
    if (!inspection) return null;

    const partnersDirectors = inspection.partners_directors || [];
    if (partnersDirectors.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">C. Partners/Directors Information</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {partnersDirectors.map((partner, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-3">Partner/Director {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><span className="font-medium">Name:</span> {partner.name || 'N/A'}</div>
                  <div><span className="font-medium">Age:</span> {partner.age || 'N/A'}</div>
                  <div><span className="font-medium">Qualification:</span> {partner.qualification || 'N/A'}</div>
                  <div><span className="font-medium">Share:</span> {partner.share || 'N/A'}</div>
                  <div><span className="font-medium">Status:</span> {partner.status || 'N/A'}</div>
                  <div><span className="font-medium">Relationship:</span> {partner.relationship || 'N/A'}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Purpose Section
  const renderPurposeSection = () => {
    if (!inspection) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">D. Purpose of Investment/Facilities</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div><span className="font-medium">Purpose of Investment:</span> {inspection.purpose_investment || 'N/A'}</div>
            <div><span className="font-medium">Purpose of Bank Guarantee:</span> {inspection.purpose_bank_guarantee || 'N/A'}</div>
            <div><span className="font-medium">Period of Investment:</span> {inspection.period_investment || 'N/A'}</div>
          </div>
        </div>
      </div>
    );
  };

  // Proposed Facilities Section
  const renderProposedFacilitiesSection = () => {
    if (!inspection) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">E. Proposed Facilities/Investment</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div><span className="font-medium">Facility Type:</span> {inspection.facility_type || 'N/A'}</div>
            <div><span className="font-medium">Existing Limit:</span> {inspection.existing_limit || 'N/A'}</div>
            <div><span className="font-medium">Applied Limit:</span> {inspection.applied_limit || 'N/A'}</div>
            <div><span className="font-medium">Recommended Limit:</span> {inspection.recommended_limit || 'N/A'}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span className="font-medium">Bank Percentage:</span> {inspection.bank_percentage || 'N/A'}</div>
              <div><span className="font-medium">Client Percentage:</span> {inspection.client_percentage || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Present Outstanding Section
  const renderPresentOutstandingSection = () => {
    if (!inspection) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">F. Present Outstanding</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            <div><span className="font-medium">Outstanding Type:</span> {inspection.outstanding_type || 'N/A'}</div>
            <div><span className="font-medium">Limit Amount:</span> {inspection.limit_amount || 'N/A'}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><span className="font-medium">Net Outstanding:</span> {inspection.net_outstanding || 'N/A'}</div>
              <div><span className="font-medium">Gross Outstanding:</span> {inspection.gross_outstanding || 'N/A'}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Competitors Section
  const renderCompetitorsSection = () => {
    if (!inspection) return null;

    const competitors = inspection.competitors || [];
    if (competitors.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">Competitors Analysis</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            {competitors.map((competitor, index) => (
              competitor.name && (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-2">Competitor {index + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><span className="font-medium">Name:</span> {competitor.name || 'N/A'}</div>
                    <div><span className="font-medium">Address:</span> {competitor.address || 'N/A'}</div>
                    <div className="md:col-span-2">
                      <span className="font-medium">Market Share:</span> {competitor.market_share || 'N/A'}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Key Employees Section - FIXED
  const renderKeyEmployeesSection = () => {
    if (!inspection) return null;

    const keyEmployees = inspection.key_employees || [];
    console.log('Key Employees:', keyEmployees);

    if (keyEmployees.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">Key Employees</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-4">
            {keyEmployees.map((employee, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <h4 className="font-semibold text-green-800 mb-2">Employee {index + 1}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><span className="font-medium">Name:</span> {employee.name || 'N/A'}</div>
                  <div><span className="font-medium">Designation:</span> {employee.designation || 'N/A'}</div>
                  <div><span className="font-medium">Age:</span> {employee.age || 'N/A'}</div>
                  <div><span className="font-medium">Qualification:</span> {employee.qualification || 'N/A'}</div>
                  <div className="md:col-span-2">
                    <span className="font-medium">Experience:</span> {employee.experience || 'N/A'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Property & Assets Section
  const renderPropertyAssetsSection = () => {
    if (!inspection) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">H. Property & Assets</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Current Assets */}
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Current Assets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">Cash Balance:</span> {inspection.cash_balance || 'N/A'}</div>
                <div><span className="font-medium">Stock Trade Finished:</span> {inspection.stock_trade_finished || 'N/A'}</div>
                <div><span className="font-medium">Stock Trade Financial:</span> {inspection.stock_trade_financial || 'N/A'}</div>
                <div><span className="font-medium">Accounts Receivable:</span> {inspection.accounts_receivable || 'N/A'}</div>
                <div><span className="font-medium">Advance Deposit:</span> {inspection.advance_deposit || 'N/A'}</div>
                <div><span className="font-medium">Other Current Assets:</span> {inspection.other_current_assets || 'N/A'}</div>
              </div>
            </div>

            {/* Fixed Assets */}
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Fixed Assets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">Land & Building:</span> {inspection.land_building || 'N/A'}</div>
                <div><span className="font-medium">Plant & Machinery:</span> {inspection.plant_machinery || 'N/A'}</div>
                <div><span className="font-medium">Other Assets:</span> {inspection.other_assets || 'N/A'}</div>
              </div>
            </div>

            {/* Investments */}
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Investments</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">IBBL Investment:</span> {inspection.ibbl_investment || 'N/A'}</div>
                <div><span className="font-medium">Other Banks Investment:</span> {inspection.other_banks_investment || 'N/A'}</div>
              </div>
            </div>

            {/* Liabilities & Capital */}
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Liabilities & Capital</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">Borrowing Sources:</span> {inspection.borrowing_sources || 'N/A'}</div>
                <div><span className="font-medium">Accounts Payable:</span> {inspection.accounts_payable || 'N/A'}</div>
                <div><span className="font-medium">Other Current Liabilities:</span> {inspection.other_current_liabilities || 'N/A'}</div>
                <div><span className="font-medium">Long Term Liabilities:</span> {inspection.long_term_liabilities || 'N/A'}</div>
                <div><span className="font-medium">Other Non-Current Liabilities:</span> {inspection.other_non_current_liabilities || 'N/A'}</div>
                <div><span className="font-medium">Paid Up Capital:</span> {inspection.paid_up_capital || 'N/A'}</div>
                <div><span className="font-medium">Retained Earning:</span> {inspection.retained_earning || 'N/A'}</div>
                <div><span className="font-medium">Resources:</span> {inspection.resources || 'N/A'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Working Capital Assessment Section - FIXED
  const renderWorkingCapitalSection = () => {
    if (!inspection) return null;

    const workingCapitalItems = inspection.working_capital_items || [];
    console.log('Working Capital Items:', workingCapitalItems);

    if (workingCapitalItems.length === 0) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">I. Working Capital Assessment</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Item</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Unit</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Rate</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tied Up Days</th>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Amount d×e</th>
                </tr>
              </thead>
              <tbody>
                {workingCapitalItems.map((item, index) => (
                  <tr key={index} className="border-b border-gray-200">
                    <td className="px-4 py-2 text-sm">{item.name || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{item.unit || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{item.rate || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{item.amount || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{item.tied_up_days || 'N/A'}</td>
                    <td className="px-4 py-2 text-sm">{item.amount_dxe || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  // Godown Particulars Section
  const renderGodownParticularsSection = () => {
    if (!inspection) return null;

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">J. Godown Particulars</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-6">
            {/* Godown Information */}
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Godown Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">Location:</span> {inspection.godown_location || 'N/A'}</div>
                <div><span className="font-medium">Capacity:</span> {inspection.godown_capacity || 'N/A'}</div>
                <div><span className="font-medium">Space:</span> {inspection.godown_space || 'N/A'}</div>
                <div><span className="font-medium">Nature:</span> {inspection.godown_nature || 'N/A'}</div>
                <div><span className="font-medium">Owner:</span> {inspection.godown_owner || 'N/A'}</div>
                <div><span className="font-medium">Distance from Branch:</span> {inspection.distance_from_branch || 'N/A'}</div>
                <div className="md:col-span-2">
                  <span className="font-medium">Items to Store:</span> {inspection.items_to_store || 'N/A'}
                </div>
              </div>
            </div>

            {/* Godown Facilities */}
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Godown Facilities</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><span className="font-medium">Warehouse License:</span> {inspection.warehouse_license ? 'Yes' : 'No'}</div>
                <div><span className="font-medium">Godown Guard:</span> {inspection.godown_guard ? 'Yes' : 'No'}</div>
                <div><span className="font-medium">Damp Proof:</span> {inspection.damp_proof ? 'Yes' : 'No'}</div>
                <div><span className="font-medium">Easy Access:</span> {inspection.easy_access ? 'Yes' : 'No'}</div>
                <div><span className="font-medium">Letter Disclaimer:</span> {inspection.letter_disclaimer ? 'Yes' : 'No'}</div>
                <div><span className="font-medium">Insurance Policy:</span> {inspection.insurance_policy ? 'Yes' : 'No'}</div>
                <div><span className="font-medium">Godown Hired:</span> {inspection.godown_hired ? 'Yes' : 'No'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Checklist Section
  const renderChecklistSection = () => {
    if (!inspection || !inspection.checklist_items) return null;

    const checklistItems = inspection.checklist_items;
    if (Object.keys(checklistItems).length === 0) return null;

    const renderChecklistRow = (label, value) => {
      let statusText, statusColor, statusIcon;
      
      if (value === true) {
        statusText = 'Yes';
        statusColor = 'bg-green-100 text-green-800 border-green-300';
        statusIcon = '✅';
      } else if (value === false) {
        statusText = 'No';
        statusColor = 'bg-red-100 text-red-800 border-red-300';
        statusIcon = '❌';
      } else {
        statusText = 'N/A';
        statusColor = 'bg-orange-100 text-orange-800 border-orange-300';
        statusIcon = '❓';
      }

      return (
        <div key={label} className="flex items-center justify-between py-3 border-b border-gray-200">
          <div className="flex-1">
            <span className="text-gray-700">{label}</span>
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full border ${statusColor}`}>
            <span className="mr-2">{statusIcon}</span>
            <span className="text-sm font-semibold">{statusText}</span>
          </div>
        </div>
      );
    };

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">K. Checklist Verification</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="space-y-2">
            {Object.entries(checklistItems).map(([key, value]) => 
              renderChecklistRow(key, value)
            )}
          </div>
        </div>
      </div>
    );
  };

  // Media Section
  const renderPhotoThumbnail = (photo, index, allPhotos) => {
    const displayUrl = getMediaUrl(photo);
    const displayName = photo.name || `Photo ${index + 1}`;

    console.log(`Rendering photo ${index}:`, { displayUrl, displayName, photo });

    return (
      <div 
        key={index}
        className="relative group cursor-pointer border border-gray-300 rounded-lg overflow-hidden bg-gray-100 hover:shadow-lg transition-shadow"
        onClick={() => showPhotoFullScreen(photo, index, allPhotos)}
      >
        {displayUrl ? (
          <img 
            src={displayUrl}
            alt={displayName}
            className="w-full h-32 object-cover"
            onError={(e) => {
              console.error(`Failed to load image: ${displayUrl}`);
              e.target.src = 'https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=Image+Not+Found';
            }}
            onLoad={() => console.log(`✅ Image loaded: ${displayUrl}`)}
          />
        ) : (
          <div className="w-full h-32 flex flex-col items-center justify-center bg-gray-200">
            <span className="text-2xl">📷</span>
            <span className="text-xs mt-1">{displayName}</span>
            <span className="text-xs text-red-500 mt-1">No URL</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-end">
          <div className="w-full p-2 bg-gradient-to-t from-black to-transparent text-white text-xs">
            <div className="font-medium truncate">{displayName}</div>
            <div className="opacity-90">Click to view</div>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs">
          📸
        </div>
      </div>
    );
  };

  const renderDocumentItem = (doc, index) => {
    const displayName = doc.name || `Document ${index + 1}`;
    const filePath = doc.file_path || '';

    console.log(`Rendering document ${index}:`, { doc, displayName, filePath });

    return (
      <div 
        key={index}
        className="flex items-center p-4 border border-gray-300 rounded-lg hover:shadow-md transition-shadow cursor-pointer bg-gradient-to-br from-blue-50 to-indigo-100"
        onClick={() => showDocumentFullScreen(doc, index)}
      >
        <div className="text-3xl mr-4">
          {getDocumentIcon(displayName)}
        </div>
        <div className="flex-1">
          <div className="font-medium text-gray-900">{displayName}</div>
          <div className="text-sm text-gray-600">
            {filePath ? 'Click to view document' : 'No file path available'}
          </div>
          {doc.file_size && (
            <div className="text-xs text-gray-500 mt-1">
              {formatFileSize(doc.file_size)}
            </div>
          )}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              showDocumentFullScreen(doc, index);
            }}
            className="p-2 text-blue-600 hover:bg-blue-100 rounded-full transition-colors"
            title="View Document"
          >
            👁️
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              showDocumentInfo(doc, index);
            }}
            className="p-2 text-green-600 hover:bg-green-100 rounded-full transition-colors"
            title="Document Info"
          >
            ℹ️
          </button>
        </div>
      </div>
    );
  };

  const renderMediaSection = () => {
    if (!inspection) return null;

    const sitePhotos = inspection.site_photos || [];
    const siteVideo = inspection.site_video || [];
    const uploadedDocuments = inspection.uploaded_documents || [];

    console.log('Media section data:', { sitePhotos, siteVideo, uploadedDocuments });

    if (sitePhotos.length === 0 && siteVideo.length === 0 && uploadedDocuments.length === 0) {
      return (
        <div className="mb-6">
          <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
            <h3 className="text-lg font-semibold">Media & Documents</h3>
          </div>
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <div className="text-6xl mb-4">📁</div>
            <h4 className="text-lg font-semibold text-gray-700 mb-2">No Media Files</h4>
            <p className="text-gray-500">No photos, videos, or documents have been uploaded for this inspection.</p>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-6">
        <div className="bg-green-800 text-white px-4 py-3 rounded-lg mb-4">
          <h3 className="text-lg font-semibold">Media & Documents</h3>
        </div>
        
        <div className="bg-white shadow rounded-lg p-6">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl">📸</div>
              <div className="text-lg font-semibold text-blue-700">{sitePhotos.length}</div>
              <div className="text-sm text-blue-600">Photos</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl">🎥</div>
              <div className="text-lg font-semibold text-green-700">{siteVideo.length}</div>
              <div className="text-sm text-green-600">Videos</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl">📄</div>
              <div className="text-lg font-semibold text-purple-700">{uploadedDocuments.length}</div>
              <div className="text-sm text-purple-600">Documents</div>
            </div>
          </div>

          {sitePhotos.length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-green-800 mb-3">Site Photos</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {sitePhotos.map((photo, index) => 
                  renderPhotoThumbnail(photo, index, sitePhotos)
                )}
              </div>
            </div>
          )}

          {uploadedDocuments.length > 0 && (
            <div>
              <h4 className="font-semibold text-green-800 mb-3">Supporting Documents</h4>
              <div className="space-y-3">
                {uploadedDocuments.map(renderDocumentItem)}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Generic Section Renderer
  const renderSection = (title, fields) => (
    <div className="bg-white shadow rounded-lg mb-6">
      <div className="bg-green-800 text-white px-4 py-3 rounded-t-lg">
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <div className="p-6">
        <dl className="space-y-4">
          {fields.map(([label, value], index) => (
            <div key={index} className="flex flex-col sm:flex-row sm:items-start">
              <dt className="text-sm font-medium text-gray-500 sm:w-1/3 mb-1 sm:mb-0">{label}</dt>
              <dd className="text-sm text-gray-900 sm:w-2/3 break-words">
                {value || <span className="text-gray-400">N/A</span>}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
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
        <div className="space-x-3">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Go Back
          </button>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'basic', name: 'Basic Info' },
    { id: 'client', name: 'Client Info' },
    { id: 'owner', name: 'Owner Info' },
    { id: 'partners', name: 'Partners' },
    { id: 'purpose', name: 'Purpose' },
    { id: 'facilities', name: 'Facilities' },
    { id: 'outstanding', name: 'Outstanding' },
    { id: 'business', name: 'Business Analysis' },
    { id: 'employees', name: 'Employees' },
    { id: 'property', name: 'Property & Assets' },
    { id: 'workingcapital', name: 'Working Capital' },
    { id: 'godown', name: 'Godown Particulars' },
    { id: 'location', name: 'Location Tracking' },
    { id: 'media', name: 'Media & Documents' },
    { id: 'checklist', name: 'Checklist' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center px-3 py-2 text-sm bg-green-700 rounded-md hover:bg-green-600 transition-colors"
              >
                ← Back
              </button>
              <button
                onClick={fetchInspectionDetails}
                className="px-3 py-2 text-sm bg-green-700 rounded-md hover:bg-green-600 transition-colors"
              >
                Refresh
              </button>
            </div>
            <button
              onClick={() => navigate(`/admin/edit-inspection/${id}`)}
              className="flex items-center px-4 py-2 bg-white text-green-800 rounded-md hover:bg-gray-100 transition-colors"
            >
              <span className="mr-2">✏️</span>
              Edit Inspection
            </button>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold">
              {inspection.client_name || 'Unnamed Inspection'}
            </h1>
            
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(inspection.status)}`}>
                <span className="mr-2">{getStatusIcon(inspection.status)}</span>
                {inspection.status}
              </span>
              <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                Inspector: {getInspectorName(inspection)}
              </span>
              <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                Branch: {inspection.branch_name || 'N/A'}
              </span>
              <span className="text-sm bg-white bg-opacity-20 px-3 py-1 rounded-full">
                ID: {inspection.id}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <nav className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-6">
        {activeTab === 'basic' && (
          <div>
            {renderSection('Basic Information', [
              ['Client Name', inspection.client_name],
              ['Industry', inspection.industry_name],
              ['Branch', inspection.branch_name],
              ['Status', inspection.status],
              ['Inspector', getInspectorName(inspection)],
              ['Created', formatDate(inspection.created_at)],
              ['Last Updated', formatDate(inspection.updated_at)],
            ])}
          </div>
        )}

        {activeTab === 'client' && (
          <div>
            {renderSection('Client Information', [
              ['Group Name', inspection.group_name],
              ['Nature of Business', inspection.nature_of_business],
              ['Legal Status', inspection.legal_status],
              ['Date of Establishment', inspection.date_of_establishment],
              ['Office Address', inspection.office_address],
              ['Showroom Address', inspection.showroom_address],
              ['Factory Address', inspection.factory_address],
              ['Phone Number', inspection.phone_number],
              ['Account Number', inspection.account_number],
              ['Account ID', inspection.account_id],
              ['TIN Number', inspection.tin_number],
              ['Date of Opening', inspection.date_of_opening],
              ['VAT Registration Number', inspection.vat_reg_number],
              ['First Investment Date', inspection.first_investment_date],
              ['Sector Code', inspection.sector_code],
              ['Trade License', inspection.trade_license],
              ['Economic Purpose Code', inspection.economic_purpose_code],
              ['Investment Category', inspection.investment_category],
            ])}
          </div>
        )}

        {activeTab === 'owner' && (
          <div>
            {renderSection('Owner Information', [
              ['Owner Name', inspection.owner_name],
              ['Age', inspection.owner_age],
              ['Father Name', inspection.father_name],
              ['Mother Name', inspection.mother_name],
              ['Spouse Name', inspection.spouse_name],
              ['Academic Qualification', inspection.academic_qualification],
              ['Children Info', inspection.children_info],
              ['Business Successor', inspection.business_successor],
              ['Residential Address', inspection.residential_address],
              ['Permanent Address', inspection.permanent_address],
            ])}
          </div>
        )}

        {activeTab === 'partners' && renderPartnersDirectorsSection()}

        {activeTab === 'purpose' && renderPurposeSection()}

        {activeTab === 'facilities' && renderProposedFacilitiesSection()}

        {activeTab === 'outstanding' && renderPresentOutstandingSection()}

        {activeTab === 'business' && (
          <div>
            {renderSection('Business Analysis', [
              ['Market Situation', inspection.market_situation],
              ['Client Position', inspection.client_position],
              ['Business Reputation', inspection.business_reputation],
              ['Production Type', inspection.production_type],
              ['Product Name', inspection.product_name],
              ['Production Capacity', inspection.production_capacity],
              ['Actual Production', inspection.actual_production],
              ['Profitability Observation', inspection.profitability_observation],
            ])}
            
            {renderSection('Labor Force', [
              ['Male Officer', inspection.male_officer],
              ['Female Officer', inspection.female_officer],
              ['Skilled Officer', inspection.skilled_officer],
              ['Unskilled Officer', inspection.unskilled_officer],
              ['Male Worker', inspection.male_worker],
              ['Female Worker', inspection.female_worker],
              ['Skilled Worker', inspection.skilled_worker],
              ['Unskilled Worker', inspection.unskilled_worker],
            ])}

            {renderCompetitorsSection()}
          </div>
        )}

        {activeTab === 'employees' && renderKeyEmployeesSection()}

        {activeTab === 'property' && renderPropertyAssetsSection()}

        {activeTab === 'workingcapital' && renderWorkingCapitalSection()}

        {activeTab === 'godown' && renderGodownParticularsSection()}

        {activeTab === 'location' && renderLocationSection()}

        {activeTab === 'media' && renderMediaSection()}

        {activeTab === 'checklist' && renderChecklistSection()}
      </div>

      {/* Photo Viewer Modal */}
      {photoViewer.show && (
        <PhotoViewer
          photos={photoViewer.photos}
          initialIndex={photoViewer.currentIndex}
          onClose={closePhotoViewer}
        />
      )}

      {/* Document Viewer Modal */}
      {documentViewer.show && (
        <DocumentViewer
          document={documentViewer.document}
          onClose={closeDocumentViewer}
        />
      )}
    </div>
  );
};

export default InspectionDetailsPage;