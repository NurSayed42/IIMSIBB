// // // src/components/inspector/AssignedInspections.js
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import { getNewInspections } from '../../services/inspectionService';
// // import { useAuth } from '../../context/AuthContext';
// // import { useNotification } from '../../context/NotificationContext';
// // import InspectionCard from '../common/InspectionCard';

// // const AssignedInspections = () => {
// //   const [assignedInspections, setAssignedInspections] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const { user } = useAuth();
// //   const navigate = useNavigate();
// //   const { showError } = useNotification();

// //   useEffect(() => {
// //     fetchAssignedInspections();
// //   }, []);

// //   const fetchAssignedInspections = async () => {
// //     try {
// //       const allInspections = await getNewInspections();
// //       const myInspections = allInspections.filter(
// //         inspection => inspection.assigned_inspector === user?.id
// //       );
// //       setAssignedInspections(myInspections);
// //     } catch (error) {
// //       showError('Failed to fetch assigned inspections');
// //       console.error('Error fetching inspections:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleStartInspection = (inspectionId) => {
// //     navigate(`/inspector/inspection/${inspectionId}`);
// //   };

// //   if (loading) {
// //     return (
// //       <div className="flex justify-center items-center h-64">
// //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="px-4 py-6 sm:px-0 lg:px-8">
// //       <div className="mb-8">
// //         <h1 className="text-2xl font-bold text-gray-900">My Assigned Inspections</h1>
// //         <p className="mt-1 text-sm text-gray-600">
// //           All inspections assigned to you
// //         </p>
// //       </div>

// //       <div className="bg-white shadow overflow-hidden sm:rounded-md">
// //         <div className="px-4 py-5 sm:px-6">
// //           <h3 className="text-lg leading-6 font-medium text-gray-900">Inspection List</h3>
// //           <p className="mt-1 max-w-2xl text-sm text-gray-500">
// //             Total: {assignedInspections.length} inspections
// //           </p>
// //         </div>
// //         <div className="border-t border-gray-200">
// //           {assignedInspections.length > 0 ? (
// //             <ul className="divide-y divide-gray-200">
// //               {assignedInspections.map((inspection) => (
// //                 <li key={inspection.id}>
// //                   <InspectionCard
// //                     inspection={inspection}
// //                     showStartButton={inspection.status === 'pending'}
// //                     onStart={() => handleStartInspection(inspection.id)}
// //                   />
// //                 </li>
// //               ))}
// //             </ul>
// //           ) : (
// //             <div className="px-4 py-5 sm:px-6">
// //               <p className="text-sm text-gray-500">No inspections assigned to you at the moment.</p>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AssignedInspections;


// // src/components/inspector/AssignedInspections.js
// // src/components/inspector/AssignedInspections.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getNewInspections } from '../../services/inspectionService';
// import { useAuth } from '../../context/AuthContext';
// import { useNotification } from '../../context/NotificationContext';
// import InspectionCard from '../common/InspectionCard';

// const AssignedInspections = () => {
//   const [assignedInspections, setAssignedInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const { user } = useAuth();
//   const navigate = useNavigate();
//   const { showError } = useNotification();

//   useEffect(() => {
//     fetchAssignedInspections();
//   }, [user]);

//   const fetchAssignedInspections = async () => {
//     try {
//       console.log('🔄 Fetching assigned inspections for user:', user);
      
//       const allInspections = await getNewInspections();
//       console.log('📥 All NEW inspections from API:', allInspections);
      
//       if (!allInspections || allInspections.length === 0) {
//         console.log('ℹ️ No inspections returned from API');
//         setAssignedInspections([]);
//         setLoading(false);
//         return;
//       }

//       // Filter inspections assigned to current user
//       const myInspections = allInspections.filter(inspection => {
//         // Handle both string and number comparison
//         const inspectorId = inspection.assigned_inspector;
//         const userId = user?.id;
        
//         const isAssigned = inspectorId == userId; // Use loose equality for type conversion
        
//         console.log(`🔍 Inspection ${inspection.id}:`, {
//           project: inspection.project,
//           assigned_inspector: inspectorId,
//           user_id: userId,
//           matches: isAssigned
//         });
        
//         return isAssigned;
//       });
      
//       console.log('✅ My assigned inspections:', myInspections);
//       setAssignedInspections(myInspections);
      
//     } catch (error) {
//       console.error('❌ Error fetching inspections:', error);
//       showError('Failed to fetch assigned inspections');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStartInspection = (inspectionId) => {
//     navigate(`/inspector/inspection/${inspectionId}`);
//   };

//   const handleRefresh = async () => {
//     setLoading(true);
//     await fetchAssignedInspections();
//   };

//   // Group by status for better display
//   const pendingInspections = assignedInspections.filter(insp => insp.status === 'pending');
//   const inProgressInspections = assignedInspections.filter(insp => insp.status === 'in_progress');
//   const completedInspections = assignedInspections.filter(insp => insp.status === 'completed');

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//         <span className="ml-3 text-gray-600">Loading inspections...</span>
//       </div>
//     );
//   }

//   return (
//     <div className="px-4 py-6 sm:px-0 lg:px-8">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-2xl font-bold text-gray-900">My Assigned Inspections</h1>
//           <p className="mt-1 text-sm text-gray-600">
//             Total: {assignedInspections.length} inspections
//           </p>
//           <p className="mt-1 text-xs text-gray-500">
//             User ID: {user?.id} | Role: {user?.role} | Branch: {user?.branch_name}
//           </p>
//         </div>
//         <button
//           onClick={handleRefresh}
//           className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//         >
//           Refresh
//         </button>
//       </div>

//       {/* Debug Panel */}
//       <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
//         <h3 className="text-sm font-medium text-blue-800 mb-2">Debug Information</h3>
//         <div className="text-xs text-blue-600 space-y-1">
//           <div><strong>User ID:</strong> {user?.id}</div>
//           <div><strong>User Role:</strong> {user?.role}</div>
//           <div><strong>Branch:</strong> {user?.branch_name}</div>
//           <div><strong>Total Found:</strong> {assignedInspections.length}</div>
//           <div><strong>Pending:</strong> {pendingInspections.length}</div>
//           <div><strong>In Progress:</strong> {inProgressInspections.length}</div>
//           <div><strong>Completed:</strong> {completedInspections.length}</div>
//         </div>
//       </div>

//       {assignedInspections.length > 0 ? (
//         <div className="space-y-6">
//           {/* Pending Inspections */}
//           {pendingInspections.length > 0 && (
//             <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//               <div className="px-4 py-5 sm:px-6 bg-yellow-50 border-b border-yellow-200">
//                 <h3 className="text-lg leading-6 font-medium text-yellow-800">
//                   Pending Inspections ({pendingInspections.length})
//                 </h3>
//                 <p className="mt-1 text-sm text-yellow-600">
//                   Ready to start inspection
//                 </p>
//               </div>
//               <ul className="divide-y divide-gray-200">
//                 {pendingInspections.map((inspection) => (
//                   <li key={inspection.id}>
//                     <InspectionCard
//                       inspection={inspection}
//                       showStartButton={true}
//                       onStart={() => handleStartInspection(inspection.id)}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* In Progress Inspections */}
//           {inProgressInspections.length > 0 && (
//             <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//               <div className="px-4 py-5 sm:px-6 bg-blue-50 border-b border-blue-200">
//                 <h3 className="text-lg leading-6 font-medium text-blue-800">
//                   In Progress ({inProgressInspections.length})
//                 </h3>
//                 <p className="mt-1 text-sm text-blue-600">
//                   Inspections currently being worked on
//                 </p>
//               </div>
//               <ul className="divide-y divide-gray-200">
//                 {inProgressInspections.map((inspection) => (
//                   <li key={inspection.id}>
//                     <InspectionCard
//                       inspection={inspection}
//                       showStartButton={false}
//                       showContinueButton={true}
//                       onContinue={() => handleStartInspection(inspection.id)}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}

//           {/* Completed Inspections */}
//           {completedInspections.length > 0 && (
//             <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//               <div className="px-4 py-5 sm:px-6 bg-green-50 border-b border-green-200">
//                 <h3 className="text-lg leading-6 font-medium text-green-800">
//                   Completed ({completedInspections.length})
//                 </h3>
//                 <p className="mt-1 text-sm text-green-600">
//                   Finished inspections
//                 </p>
//               </div>
//               <ul className="divide-y divide-gray-200">
//                 {completedInspections.map((inspection) => (
//                   <li key={inspection.id}>
//                     <InspectionCard
//                       inspection={inspection}
//                       showStartButton={false}
//                       showViewButton={true}
//                       onView={() => handleStartInspection(inspection.id)}
//                     />
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           )}
//         </div>
//       ) : (
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-12 text-center">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//             </svg>
//             <h3 className="mt-2 text-sm font-medium text-gray-900">No inspections assigned</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               You don't have any inspections assigned to you at the moment.
//             </p>
//             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
//               <p className="text-xs text-yellow-700">
//                 <strong>Note:</strong> Check browser console for detailed API response
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignedInspections;
// src/components/inspector/AssignedInspections.js







import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNewInspections } from '../../services/inspectionService'; // ✅ Change this import
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';

const AssignedInspections = () => {
  const [inspections, setInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { showError } = useNotification();

  useEffect(() => {
    fetchAssignedInspections();
  }, []);

  const fetchAssignedInspections = async () => {
    try {
      console.log('🔄 Fetching NEW inspections...');
      const response = await getNewInspections(); // ✅ Change this function call
      
      console.log('📋 Raw API response:', response);
      
      // ✅ SAFE: Handle different response formats
      let allInspections = [];
      
      if (Array.isArray(response)) {
        allInspections = response;
      } else if (response && Array.isArray(response.data)) {
        allInspections = response.data;
      } else if (response && Array.isArray(response.inspections)) {
        allInspections = response.inspections;
      } else {
        console.log('❌ Invalid response format, using empty array');
        allInspections = [];
      }
      
      console.log('✅ Processed inspections array:', allInspections);
      
      // ✅ SAFE: Now filter the array - Inspector-specific filtering
      const assigned = allInspections.filter(inspection => {
        if (!inspection) return false;
        
        // Check if inspection is assigned to current user
        const isAssignedToMe = 
          inspection.assigned_inspector === user?.id ||
          inspection.inspector_id === user?.id ||
          inspection.assigned_to === user?.id;
        
        // Check status
        const isPendingOrAssigned = 
          inspection.status === 'pending' || 
          inspection.status === 'assigned' ||
          inspection.status === 'Assigned' ||
          inspection.status === 'Pending';
        
        return isAssignedToMe && isPendingOrAssigned;
      });
      
      console.log('👤 Final assigned inspections for user', user?.id, ':', assigned);
      setInspections(assigned);
      
    } catch (error) {
      console.error('❌ Error fetching assigned inspections:', error);
      showError('Failed to fetch assigned inspections');
      setInspections([]);
    } finally {
      setLoading(false);
    }
  };

  const handleStartInspection = (inspectionId) => {
    navigate(`/inspector/inspection/${inspectionId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <span className="ml-3 text-gray-600">Loading inspections...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-green-800 text-white shadow-lg">
        <div className="px-4 py-4 sm:px-6 lg:px-8">
          <button 
            onClick={() => navigate('/inspector/dashboard')}
            className="flex items-center text-green-200 hover:text-white mb-4"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          <h1 className="text-2xl font-bold">Assigned Inspections</h1>
          <p className="text-green-200 mt-1">All inspections assigned to you ({user?.name || user?.username})</p>
        </div>
      </div>

      <div className="px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg">
          {inspections.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {inspections.map((inspection) => (
                <div key={inspection.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {inspection.client_name || inspection.project || 'Unnamed Client'}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Industry:</span> {inspection.industry_name || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Project:</span> {inspection.project || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Location:</span> {inspection.location || inspection.office_address || 'N/A'}
                        </p>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium">Assigned:</span> {inspection.assigned_date ? new Date(inspection.assigned_date).toLocaleDateString() : 'N/A'}
                        </p>
                      </div>
                      <div className="flex items-center mt-3">
                        <span className="text-sm text-gray-500 mr-4">Status:</span>
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          inspection.status === 'pending' || inspection.status === 'Pending' 
                            ? 'bg-orange-100 text-orange-800' 
                            : inspection.status === 'assigned' || inspection.status === 'Assigned'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {inspection.status || 'Unknown'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleStartInspection(inspection.id)}
                      className="ml-6 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors whitespace-nowrap"
                    >
                      Start Inspection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No assigned inspections</h3>
              <p className="text-gray-500 mb-4">There are currently no pending or assigned inspections for you.</p>
              <button
                onClick={fetchAssignedInspections}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Refresh
              </button>
            </div>
          )}
        </div>

        {/* Debug Info */}
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <details className="text-sm">
            <summary className="cursor-pointer font-medium text-gray-700">Debug Information</summary>
            <div className="mt-2 text-xs text-gray-600">
              <p>User ID: {user?.id}</p>
              <p>User Name: {user?.name || user?.username}</p>
              <p>Total inspections found: {inspections.length}</p>
              <pre className="mt-2 bg-gray-200 p-2 rounded overflow-auto">
                {JSON.stringify(inspections, null, 2)}
              </pre>
            </div>
          </details>
        </div>
      </div>
    </div>
  );
};

export default AssignedInspections;