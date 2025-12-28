// // src/components/inspector/Dashboard.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getInspectorStats, getNewInspections } from '../../services/inspectionService';
// import { useAuth } from '../../context/AuthContext';
// import { useNotification } from '../../context/NotificationContext';
// import StatCard from '../common/StatCard';
// import InspectionCard from '../common/InspectionCard';

// const InspectorDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     in_progress: 0,
//     completed: 0,
//     approved: 0,
//     rejected: 0,
//   });
//   const [assignedInspections, setAssignedInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { showError } = useNotification();

//   useEffect(() => {
//     fetchStats();
//     fetchAssignedInspections();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       const data = await getInspectorStats();
//       setStats(data);
//     } catch (error) {
//       showError('Failed to fetch inspection statistics');
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const fetchAssignedInspections = async () => {
//     try {
//       const allInspections = await getNewInspections();
//       const myInspections = allInspections.filter(
//         inspection => inspection.assigned_inspector === user?.id && 
//         inspection.status === 'pending'
//       );
//       setAssignedInspections(myInspections.slice(0, 5)); // Show only first 5
//     } catch (error) {
//       showError('Failed to fetch assigned inspections');
//       console.error('Error fetching inspections:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartInspection = (inspectionId) => {
//     navigate(`/inspector/inspection/${inspectionId}`);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-6 sm:px-0 lg:px-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Inspector Dashboard</h1>
//         <p className="mt-1 text-sm text-gray-600">
//           Welcome to your inspection dashboard - {user?.user_name}
//         </p>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
//         <StatCard
//           title="Total Inspections"
//           value={stats.total}
//           icon="document-text"
//           color="blue"
//         />
//         <StatCard
//           title="Pending"
//           value={stats.pending}
//           icon="clock"
//           color="yellow"
//         />

//         <StatCard
//           title="Approved"
//           value={stats.approved}
//           icon="badge-check"
//           color="green"
//         />
//         <StatCard
//           title="Rejected"
//           value={stats.rejected}
//           icon="x-circle"
//           color="red"
//         />
//       </div>

//       {/* Assigned Inspections */}
//       <div className="bg-white shadow overflow-hidden sm:rounded-md">
//         <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
//           <div>
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Assigned Inspections</h3>
//             <p className="mt-1 max-w-2xl text-sm text-gray-500">
//               Inspections assigned to you that need to be completed
//             </p>
//           </div>
//           <button
//             onClick={() => navigate('/inspector/assigned-inspections')}
//             className="text-primary hover:text-green-700 font-medium text-sm"
//           >
//             View All
//           </button>
//         </div>
//         <div className="border-t border-gray-200">
//           {assignedInspections.length > 0 ? (
//             <ul className="divide-y divide-gray-200">
//               {assignedInspections.map((inspection) => (
//                 <li key={inspection.id}>
//                   <InspectionCard
//                     inspection={inspection}
//                     showStartButton={true}
//                     onStart={() => handleStartInspection(inspection.id)}
//                   />
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div className="px-4 py-5 sm:px-6">
//               <p className="text-sm text-gray-500">No inspections assigned to you at the moment.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InspectorDashboard;

// src/components/inspector/Dashboard.js




// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getInspectorStats, getNewInspections, getCurrentUser } from '../../services/inspectionService';
// import { useAuth } from '../../context/AuthContext';
// import { useNotification } from '../../context/NotificationContext';
// import StatCard from '../common/StatCard';
// import InspectionCard from '../common/InspectionCard';
// import LoadingSpinner from '../common/LoadingSpinner';

// const InspectorDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     in_progress: 0,
//     completed: 0,
//     approved: 0,
//     rejected: 0,
//   });
//   const [assignedInspections, setAssignedInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { showError } = useNotification();

//   useEffect(() => {
//     fetchCurrentUser();
//     fetchStats();
//     fetchAssignedInspections();
//   }, []);

//   const fetchCurrentUser = async () => {
//     try {
//       const userData = await getCurrentUser();
//       setCurrentUserId(userData.id);
//     } catch (error) {
//       console.error('Error fetching current user:', error);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const data = await getInspectorStats();
//       setStats(data);
//     } catch (error) {
//       showError('Failed to fetch inspection statistics');
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const fetchAssignedInspections = async () => {
//     try {
//       const allInspections = await getNewInspections();
//       console.log('All inspections from API:', allInspections);
      
//       // Filter inspections assigned to current user AND status is 'pending'
//       const myAssignedInspections = allInspections.filter((inspection) => {
//         const assignedInspectorId = inspection.assigned_inspector;
//         const status = inspection.status;
//         const isAssignedToMe = assignedInspectorId === currentUserId;
//         const isPending = status === 'pending';

//         if (isAssignedToMe && isPending) {
//           console.log('Found pending assigned inspection:', inspection.project);
//         }
        
//         return isAssignedToMe && isPending;
//       });

//       setAssignedInspections(myAssignedInspections.slice(0, 5)); // Show only first 5

//       console.log('Pending assigned inspections loaded:', myAssignedInspections.length);

//       // Show debug information if no inspections found
//       if (myAssignedInspections.length === 0) {
//         console.log('No PENDING inspections assigned to user ID:', currentUserId);
//         console.log('All assigned inspections (all statuses):');
//         const allMyInspections = allInspections.filter((inspection) => {
//           return inspection.assigned_inspector === currentUserId;
//         });
        
//         allMyInspections.forEach((inspection) => {
//           console.log(`- ${inspection.project} -> Status: ${inspection.status}`);
//         });
//       }
//     } catch (error) {
//       showError('Failed to fetch assigned inspections');
//       console.error('Error fetching inspections:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartInspection = (inspection) => {
//     navigate(`/inspector/inspection/create`, { 
//       state: { 
//         inspectionData: inspection,
//         isEditMode: false 
//       } 
//     });
//   };

//   const handleViewAllInspections = (status = 'all') => {
//     navigate(`/inspector/inspections?status=${status}`);
//   };

//   const handleViewAssignedInspections = () => {
//     navigate('/inspector/assigned-inspections');
//   };

//   const handleRefresh = () => {
//     setLoading(true);
//     fetchStats();
//     fetchAssignedInspections();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner size="large" />
//         <span className="ml-3 text-gray-600">Loading your dashboard...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">IN</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <h1 className="text-2xl font-bold text-gray-900">Inspector Dashboard</h1>
//                 <p className="text-sm text-gray-600">
//                   Welcome back, {user?.user_name} 
//                   {user?.branch_name && ` • ${user.branch_name}`}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={handleRefresh}
//                 className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
          
//           {/* Statistics Overview */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Inspection Overview</h2>
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <div 
//                 onClick={() => handleViewAllInspections('all')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="All Inspections"
//                   value={stats.total || 0}
//                   icon="document-text"
//                   color="blue"
//                 />
//               </div>
//               <div 
//                 onClick={() => handleViewAllInspections('pending')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="Pending"
//                   value={stats.pending || 0}
//                   icon="clock"
//                   color="orange"
//                 />
//               </div>
//               <div 
//                 onClick={() => handleViewAllInspections('approved')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="Approved"
//                   value={stats.approved || 0}
//                   icon="badge-check"
//                   color="green"
//                 />
//               </div>
//               <div 
//                 onClick={() => handleViewAllInspections('rejected')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="Rejected"
//                   value={stats.rejected || 0}
//                   icon="x-circle"
//                   color="red"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <button
//                 onClick={handleViewAssignedInspections}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
//                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">Assigned Inspections</div>
//                     <div className="text-xs text-gray-500 mt-1">View all inspections assigned to you</div>
//                   </div>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => handleViewAllInspections('pending')}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
//                     <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">Pending Inspections</div>
//                     <div className="text-xs text-gray-500 mt-1">View pending inspections</div>
//                   </div>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => handleViewAllInspections('in_progress')}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">In Progress</div>
//                     <div className="text-xs text-gray-500 mt-1">Continue working inspections</div>
//                   </div>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => handleViewAllInspections('completed')}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
//                     <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">Completed</div>
//                     <div className="text-xs text-gray-500 mt-1">View completed inspections</div>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Assigned Inspections Section */}
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-green-50 border-b border-green-200">
//               <div>
//                 <h3 className="text-lg leading-6 font-medium text-green-900 flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   My Assigned Inspections
//                 </h3>
//                 <p className="mt-1 max-w-2xl text-sm text-green-700">
//                   Inspections assigned to you that need to be completed
//                 </p>
//               </div>
//               <button
//                 onClick={handleViewAssignedInspections}
//                 className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 View All
//               </button>
//             </div>
            
//             <div className="border-t border-gray-200">
//               {assignedInspections.length > 0 ? (
//                 <ul className="divide-y divide-gray-200">
//                   {assignedInspections.map((inspection) => (
//                     <li key={inspection.id} className="hover:bg-gray-50 transition-colors duration-150">
//                       <InspectionCard
//                         inspection={inspection}
//                         showStartButton={true}
//                         onStart={() => handleStartInspection(inspection)}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="px-4 py-12 text-center">
//                   <div className="text-gray-400 mb-4">
//                     <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No Assigned Inspections</h3>
//                   <p className="text-sm text-gray-500 max-w-md mx-auto">
//                     You don't have any inspections assigned to you at the moment. 
//                     Please check back later or contact your branch administrator.
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InspectorDashboard;






// src/components/inspector/Dashboard.js

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getInspectorStats, getNewInspections, getCurrentUser } from '../../services/inspectionService';
// import { useAuth } from '../../context/AuthContext';
// import { useNotification } from '../../context/NotificationContext';
// import StatCard from '../common/StatCard';
// import InspectionCard from '../common/InspectionCard';
// import LoadingSpinner from '../common/LoadingSpinner';

// const InspectorDashboard = () => {
//   const [stats, setStats] = useState({
//     total: 0,
//     pending: 0,
//     in_progress: 0,
//     completed: 0,
//     approved: 0,
//     rejected: 0,
//   });
//   const [assignedInspections, setAssignedInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentUserId, setCurrentUserId] = useState(null);
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { showError } = useNotification();

//   useEffect(() => {
//     const initializeDashboard = async () => {
//       try {
//         setLoading(true);
//         await fetchCurrentUser();
//         await fetchStats();
//         await fetchAssignedInspections();
//       } catch (error) {
//         console.error('Error initializing dashboard:', error);
//         showError('Failed to initialize dashboard');
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     initializeDashboard();
//   }, []);

//   // Refetch inspections when currentUserId changes
//   useEffect(() => {
//     if (currentUserId) {
//       fetchAssignedInspections();
//     }
//   }, [currentUserId]);

//   const fetchCurrentUser = async () => {
//     try {
//       const userData = await getCurrentUser();
//       setCurrentUserId(userData.id);
//       console.log('✅ Current user ID set:', userData.id);
//     } catch (error) {
//       console.error('Error fetching current user:', error);
//       showError('Failed to load user information');
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const data = await getInspectorStats();
//       setStats(data);
//       console.log('✅ Stats loaded:', data);
//     } catch (error) {
//       showError('Failed to fetch inspection statistics');
//       console.error('Error fetching stats:', error);
//     }
//   };

//   const fetchAssignedInspections = async () => {
//     // Don't proceed if we don't have currentUserId
//     if (!currentUserId) {
//       console.log('⏳ Waiting for user ID...');
//       return;
//     }

//     try {
//       console.log('🔄 Fetching assigned inspections for user:', currentUserId);
//       const allInspections = await getNewInspections();
//       console.log('📋 All inspections from API:', allInspections);
      
//       // Enhanced filtering with better debugging
//       const myAssignedInspections = allInspections.filter((inspection) => {
//         const assignedInspectorId = inspection.assigned_inspector;
//         const status = inspection.status;
//         const isAssignedToMe = assignedInspectorId === currentUserId;
//         const isPending = status === 'pending';

//         if (isAssignedToMe) {
//           console.log(`🔍 Found inspection assigned to me:`, {
//             id: inspection.id,
//             project: inspection.project,
//             status: status,
//             isPending: isPending
//           });
//         }

//         return isAssignedToMe && isPending;
//       });

//       console.log('✅ Pending assigned inspections found:', myAssignedInspections.length);
//       setAssignedInspections(myAssignedInspections.slice(0, 5));

//       // Debug: Check all inspections assigned to this user (any status)
//       const allMyInspections = allInspections.filter(
//         inspection => inspection.assigned_inspector === currentUserId
//       );
      
//       console.log('📊 All inspections assigned to me (all statuses):', allMyInspections.length);
//       allMyInspections.forEach(inspection => {
//         console.log(`   - ${inspection.project} | Status: ${inspection.status} | ID: ${inspection.id}`);
//       });

//       if (myAssignedInspections.length === 0 && allMyInspections.length > 0) {
//         console.log('ℹ️ User has inspections but none are pending status');
//       }

//     } catch (error) {
//       showError('Failed to fetch assigned inspections');
//       console.error('Error fetching inspections:', error);
//     }
//   };

//   const handleStartInspection = (inspection) => {
//     navigate(`/inspector/inspection/create`, { 
//       state: { 
//         inspectionData: inspection,
//         isEditMode: false 
//       } 
//     });
//   };

//   const handleViewAllInspections = (status = 'all') => {
//     navigate(`/inspector/inspections?status=${status}`);
//   };

//   const handleViewAssignedInspections = () => {
//     navigate('/inspector/assigned-inspections');
//   };

//   const handleRefresh = async () => {
//     try {
//       setLoading(true);
//       await fetchStats();
//       await fetchAssignedInspections();
//     } catch (error) {
//       console.error('Error refreshing dashboard:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDebugInfo = () => {
//     console.log('🔍 DEBUG DASHBOARD INFO:');
//     console.log('Current User ID:', currentUserId);
//     console.log('Auth Context User:', user);
//     console.log('Assigned Inspections:', assignedInspections);
//     console.log('Stats:', stats);
    
//     // Force refetch
//     fetchAssignedInspections();
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <LoadingSpinner size="large" />
//         <span className="ml-3 text-gray-600">Loading your dashboard...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header Section */}
//       <div className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex justify-between items-center py-6">
//             <div className="flex items-center">
//               <div className="flex-shrink-0">
//                 <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
//                   <span className="text-white font-bold text-sm">IN</span>
//                 </div>
//               </div>
//               <div className="ml-4">
//                 <h1 className="text-2xl font-bold text-gray-900">Inspector Dashboard</h1>
//                 <p className="text-sm text-gray-600">
//                   Welcome back, {user?.user_name} 
//                   {user?.branch_name && ` • ${user.branch_name}`}
//                 </p>
//               </div>
//             </div>
//             <div className="flex items-center space-x-3">
//               <button
//                 onClick={handleDebugInfo}
//                 className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//                 </svg>
//                 Debug
//               </button>
//               <button
//                 onClick={handleRefresh}
//                 className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//               >
//                 <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
//                 </svg>
//                 Refresh
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
//         <div className="px-4 py-6 sm:px-0">
          
//           {/* Statistics Overview */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Inspection Overview</h2>
//             <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
//               <div 
//                 onClick={() => handleViewAllInspections('all')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="All Inspections"
//                   value={stats.total || 0}
//                   icon="document-text"
//                   color="blue"
//                 />
//               </div>
//               <div 
//                 onClick={() => handleViewAllInspections('pending')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="Pending"
//                   value={stats.pending || 0}
//                   icon="clock"
//                   color="orange"
//                 />
//               </div>
//               <div 
//                 onClick={() => handleViewAllInspections('approved')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="Approved"
//                   value={stats.approved || 0}
//                   icon="badge-check"
//                   color="green"
//                 />
//               </div>
//               <div 
//                 onClick={() => handleViewAllInspections('rejected')}
//                 className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
//               >
//                 <StatCard
//                   title="Rejected"
//                   value={stats.rejected || 0}
//                   icon="x-circle"
//                   color="red"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div className="mb-8">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
//               <button
//                 onClick={handleViewAssignedInspections}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
//                     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">Assigned Inspections</div>
//                     <div className="text-xs text-gray-500 mt-1">View all inspections assigned to you</div>
//                   </div>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => handleViewAllInspections('pending')}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
//                     <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">Pending Inspections</div>
//                     <div className="text-xs text-gray-500 mt-1">View pending inspections</div>
//                   </div>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => handleViewAllInspections('in_progress')}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
//                     <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">In Progress</div>
//                     <div className="text-xs text-gray-500 mt-1">Continue working inspections</div>
//                   </div>
//                 </div>
//               </button>
              
//               <button
//                 onClick={() => handleViewAllInspections('completed')}
//                 className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all duration-200 text-left group"
//               >
//                 <div className="flex items-center">
//                   <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
//                     <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                   </div>
//                   <div className="ml-4">
//                     <div className="text-sm font-medium text-gray-900">Completed</div>
//                     <div className="text-xs text-gray-500 mt-1">View completed inspections</div>
//                   </div>
//                 </div>
//               </button>
//             </div>
//           </div>

//           {/* Assigned Inspections Section */}
//           <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//             <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-green-50 border-b border-green-200">
//               <div>
//                 <h3 className="text-lg leading-6 font-medium text-green-900 flex items-center">
//                   <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                   </svg>
//                   My Assigned Inspections
//                 </h3>
//                 <p className="mt-1 max-w-2xl text-sm text-green-700">
//                   Inspections assigned to you that need to be completed
//                   {currentUserId && ` (User ID: ${currentUserId})`}
//                 </p>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
//                   {assignedInspections.length} pending
//                 </span>
//                 <button
//                   onClick={handleViewAssignedInspections}
//                   className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                 >
//                   View All
//                 </button>
//               </div>
//             </div>
            
//             {/* <div className="border-t border-gray-200">
//               {assignedInspections.length > 0 ? (
//                 <ul className="divide-y divide-gray-200">
//                   {assignedInspections.map((inspection) => (
//                     <li key={inspection.id} className="hover:bg-gray-50 transition-colors duration-150">
//                       <InspectionCard
//                         inspection={inspection}
//                         showStartButton={true}
//                         onStart={() => handleStartInspection(inspection)}
//                       />
//                     </li>
//                   ))}
//                 </ul>
//               ) : (
//                 <div className="px-4 py-12 text-center">
//                   <div className="text-gray-400 mb-4">
//                     <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                     </svg>
//                   </div>
//                   <h3 className="text-lg font-medium text-gray-900 mb-2">No Assigned Inspections</h3>
//                   <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
//                     {currentUserId 
//                       ? "You don't have any pending inspections assigned to you at the moment." 
//                       : "Loading user information..."
//                     }
//                   </p>
//                   {currentUserId && (
//                     <button
//                       onClick={handleRefresh}
//                       className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//                     >
//                       Check Again
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InspectorDashboard;





// src/components/inspector/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getInspectorStats, getNewInspections, getCurrentUser } from '../../services/inspectionService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import StatCard from '../common/StatCard';
import InspectionCard from '../common/InspectionCard';
import LoadingSpinner from '../common/LoadingSpinner';

const InspectorDashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    in_progress: 0,
    completed: 0,
    approved: 0,
    rejected: 0,
  });
  const [assignedInspections, setAssignedInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError } = useNotification();

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setLoading(true);
        console.log('🚀 Starting dashboard initialization...');
        
        // Step 1: Fetch current user first
        const userData = await fetchCurrentUser();
        
        // Step 2: Once we have user ID, fetch stats and inspections
        if (userData && userData.id) {
          console.log('✅ User ID available, fetching stats and inspections...');
          await Promise.all([
            fetchStats(),
            fetchAssignedInspections(userData.id) // Pass user ID directly
          ]);
        }
      } catch (error) {
        console.error('Error initializing dashboard:', error);
        showError('Failed to initialize dashboard');
      } finally {
        setLoading(false);
      }
    };
    
    initializeDashboard();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      console.log('👤 Fetching current user...');
      const userData = await getCurrentUser();
      setCurrentUserId(userData.id);
      console.log('✅ Current user ID set:', userData.id);
      return userData; // Return user data for chaining
    } catch (error) {
      console.error('Error fetching current user:', error);
      showError('Failed to load user information');
      return null;
    }
  };

  const fetchStats = async () => {
    try {
      console.log('📊 Fetching stats...');
      const data = await getInspectorStats();
      setStats(data);
      console.log('✅ Stats loaded:', data);
    } catch (error) {
      showError('Failed to fetch inspection statistics');
      console.error('Error fetching stats:', error);
    }
  };

  const fetchAssignedInspections = async (userId = null) => {
    // Use provided userId or currentUserId state
    const targetUserId = userId || currentUserId;
    
    if (!targetUserId) {
      console.log('⏳ No user ID available for fetching inspections');
      return;
    }

    try {
      console.log('🔄 Fetching assigned inspections for user:', targetUserId);
      const allInspections = await getNewInspections();
      console.log('📋 All inspections from API:', allInspections);
      
      if (!allInspections || allInspections.length === 0) {
        console.log('📭 No inspections returned from API');
        setAssignedInspections([]);
        return;
      }
      
      // Enhanced filtering with better debugging
      const myAssignedInspections = allInspections.filter((inspection) => {
        const assignedInspectorId = inspection.assigned_inspector;
        const status = inspection.status;
        const isAssignedToMe = assignedInspectorId === targetUserId;
        const isPending = status === 'pending';

        console.log(`🔍 Checking inspection ${inspection.id}:`, {
          assigned_inspector: assignedInspectorId,
          current_user: targetUserId,
          status: status,
          isAssignedToMe: isAssignedToMe,
          isPending: isPending
        });

        return isAssignedToMe && isPending;
      });

      console.log('✅ Pending assigned inspections found:', myAssignedInspections.length);
      console.log('📝 Inspections details:', myAssignedInspections);
      setAssignedInspections(myAssignedInspections.slice(0, 5));

      // Debug: Check all inspections assigned to this user (any status)
      const allMyInspections = allInspections.filter(
        inspection => inspection.assigned_inspector === targetUserId
      );
      
      console.log('📊 All inspections assigned to me (all statuses):', allMyInspections.length);
      allMyInspections.forEach(inspection => {
        console.log(`   - ${inspection.project} | Status: ${inspection.status} | ID: ${inspection.id}`);
      });

      if (myAssignedInspections.length === 0 && allMyInspections.length > 0) {
        console.log('ℹ️ User has inspections but none are pending status');
      }

    } catch (error) {
      console.error('❌ Error fetching assigned inspections:', error);
      showError('Failed to fetch assigned inspections');
      setAssignedInspections([]);
    }
  };

  const handleStartInspection = (inspection) => {
    navigate(`/inspector/inspection/create`, { 
      state: { 
        inspectionData: inspection,
        isEditMode: false 
      } 
    });
  };

  const handleViewAllInspections = (status = 'all') => {
    navigate(`/inspector/inspections?status=${status}`);
  };

  const handleViewAssignedInspections = () => {
    navigate('/inspector/assigned-inspections');
  };

  const handleRefresh = async () => {
    try {
      setLoading(true);
      console.log('🔄 Refreshing dashboard...');
      await Promise.all([
        fetchStats(),
        fetchAssignedInspections()
      ]);
    } catch (error) {
      console.error('Error refreshing dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDebugInfo = () => {
    console.log('🔍 DEBUG DASHBOARD INFO:');
    console.log('Current User ID:', currentUserId);
    console.log('Auth Context User:', user);
    console.log('Assigned Inspections:', assignedInspections);
    console.log('Stats:', stats);
    
    // Force refetch
    fetchAssignedInspections();
  };

  // Uncomment and fix the assigned inspections section
  const renderAssignedInspections = () => {
    return (
      <div className="border-t border-gray-200">
        {assignedInspections.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {assignedInspections.map((inspection) => (
              <li key={inspection.id} className="hover:bg-gray-50 transition-colors duration-150">
                <InspectionCard
                  inspection={inspection}
                  showStartButton={true}
                  onStart={() => handleStartInspection(inspection)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="px-4 py-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-16 w-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Assigned Inspections</h3>
            <p className="text-sm text-gray-500 max-w-md mx-auto mb-4">
              {currentUserId 
                ? "You don't have any pending inspections assigned to you at the moment." 
                : "Loading user information..."
              }
            </p>
            {currentUserId && (
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Check Again
              </button>
            )}
          </div>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <LoadingSpinner size="large" />
        <span className="ml-3 text-gray-600">Loading your dashboard...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-10 w-10 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">IN</span>
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Inspector Dashboard</h1>
                <p className="text-sm text-gray-600">
                  Welcome back, {user?.user_name} 
                  {user?.branch_name && ` • ${user.branch_name}`}
                  {currentUserId && ` • ID: ${currentUserId}`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDebugInfo}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Debug
              </button>
              <button
                onClick={handleRefresh}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Statistics Overview */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Inspection Overview</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <div 
                onClick={() => handleViewAllInspections('all')}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <StatCard
                  title="All Inspections"
                  value={stats.total || 0}
                  icon="document-text"
                  color="blue"
                />
              </div>
              <div 
                onClick={() => handleViewAllInspections('pending')}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <StatCard
                  title="Pending"
                  value={stats.pending || 0}
                  icon="clock"
                  color="orange"
                />
              </div>
              <div 
                onClick={() => handleViewAllInspections('approved')}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <StatCard
                  title="Approved"
                  value={stats.approved || 0}
                  icon="badge-check"
                  color="green"
                />
              </div>
              <div 
                onClick={() => handleViewAllInspections('rejected')}
                className="cursor-pointer transform hover:scale-105 transition-transform duration-200"
              >
                <StatCard
                  title="Rejected"
                  value={stats.rejected || 0}
                  icon="x-circle"
                  color="red"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <button
                onClick={handleViewAssignedInspections}
                className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-green-500 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg group-hover:bg-green-200 transition-colors">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Assigned Inspections</div>
                    <div className="text-xs text-gray-500 mt-1">View all inspections assigned to you</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleViewAllInspections('pending')}
                className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-orange-500 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-orange-100 p-3 rounded-lg group-hover:bg-orange-200 transition-colors">
                    <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Pending Inspections</div>
                    <div className="text-xs text-gray-500 mt-1">View pending inspections</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleViewAllInspections('in_progress')}
                className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">In Progress</div>
                    <div className="text-xs text-gray-500 mt-1">Continue working inspections</div>
                  </div>
                </div>
              </button>
              
              <button
                onClick={() => handleViewAllInspections('completed')}
                className="bg-white p-6 rounded-lg shadow border border-gray-200 hover:border-purple-500 hover:shadow-md transition-all duration-200 text-left group"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">Completed</div>
                    <div className="text-xs text-gray-500 mt-1">View completed inspections</div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Assigned Inspections Section */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-green-50 border-b border-green-200">
              <div>
                <h3 className="text-lg leading-6 font-medium text-green-900 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  My Assigned Inspections
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-green-700">
                  Inspections assigned to you that need to be completed
                  {currentUserId && ` (User ID: ${currentUserId})`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  {assignedInspections.length} pending
                </span>
                <button
                  onClick={handleViewAssignedInspections}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  View All
                </button>
              </div>
            </div>
            
            {/* Uncomment the assigned inspections section */}
            {renderAssignedInspections()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InspectorDashboard;