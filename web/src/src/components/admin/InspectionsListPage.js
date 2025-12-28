

// import React, { useState, useEffect } from 'react';
// import { useNavigate, useSearchParams } from 'react-router-dom';
// import { getAdminInspectionsByStatus } from '../../services/inspectionService';
// import { useNotification } from '../../context/NotificationContext';

// const InspectionsListPage = () => {
//   const [allInspections, setAllInspections] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchParams] = useSearchParams();
//   const status = searchParams.get('status') || 'all';
//   const { showError } = useNotification();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchInspections();
//   }, [status]);

//   const fetchInspections = async () => {
//     try {
//       setLoading(true);
//       console.log('🔄 Fetching admin inspections with status:', status);
      
//       // Always fetch all inspections first
//       const data = await getAdminInspectionsByStatus('all');
//       console.log('✅ All admin inspections loaded:', data);
      
//       setAllInspections(data);
//     } catch (error) {
//       console.error('❌ Error fetching admin inspections:', error);
//       showError('Failed to fetch inspections');
//       setAllInspections([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter inspections based on status
//   const filteredInspections = status === 'all' 
//     ? allInspections 
//     : allInspections.filter(inspection => inspection.status === status);

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

//   const handleViewDetails = (inspectionId) => {
//     navigate(`/admin/inspections/${inspectionId}`);
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

//   // Status tabs with counts from allInspections
//   const statusTabs = [
//     { key: 'all', label: 'All', count: allInspections.length },
//     { key: 'Pending', label: 'Pending', count: allInspections.filter(i => i.status === 'Pending').length },
//     { key: 'In Progress', label: 'In Progress', count: allInspections.filter(i => i.status === 'In Progress').length },
//     { key: 'Completed', label: 'Completed', count: allInspections.filter(i => i.status === 'Completed').length },
//     { key: 'Approved', label: 'Approved', count: allInspections.filter(i => i.status === 'Approved').length },
//     { key: 'Rejected', label: 'Rejected', count: allInspections.filter(i => i.status === 'Rejected').length },
//   ];

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
//       <div className="mb-8">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-900 capitalize">
//               {status === 'all' ? 'All' : status} Inspections
//             </h1>
//             <p className="mt-1 text-sm text-gray-600">
//               {filteredInspections.length} inspections found
//             </p>
//           </div>
//           <div className="flex space-x-3">
//             <button
//               onClick={fetchInspections}
//               className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//             >
//               Refresh
//             </button>
//             <button
//               onClick={() => navigate('/admin/dashboard')}
//               className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
//             >
//               Back to Dashboard
//             </button>
//           </div>
//         </div>
//       </div>



//       {/* Status Filter Tabs */}
//       <div className="mb-6 bg-white rounded-lg shadow border">
//         <div className="flex overflow-x-auto">
//           {statusTabs.map((tab) => (
//             <button
//               key={tab.key}
//               onClick={() => navigate(`/admin/inspections?status=${tab.key}`)}
//               className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
//                 status === tab.key
//                   ? 'border-blue-500 text-blue-600 bg-blue-50'
//                   : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
//               }`}
//             >
//               <div className="flex flex-col items-center">
//                 <span>{tab.label}</span>
//                 <span className={`text-xs mt-1 ${
//                   status === tab.key ? 'text-blue-500' : 'text-gray-400'
//                 }`}>
//                   ({tab.count})
//                 </span>
//               </div>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Inspection Cards */}
//       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {filteredInspections.map((inspection) => (
//           <div key={inspection.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h3 className="text-lg font-medium text-gray-900 truncate">
//                   {inspection.client_name || 'No Client Name'}
//                 </h3>
//                 <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inspection.status)}`}>
//                   {inspection.status}
//                 </span>
//               </div>
              
//               <div className="space-y-2 text-sm text-gray-600">
//                 <div className="flex justify-between">
//                   <span>Industry:</span>
//                   <span className="font-medium text-gray-900">{inspection.industry_name || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Branch:</span>
//                   <span className="font-medium text-gray-900">{inspection.branch_name || 'N/A'}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Inspector:</span>
//                   <span className="font-medium text-gray-900">{getInspectorName(inspection)}</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span>Created:</span>
//                   <span className="font-medium text-gray-900">
//                     {inspection.created_at 
//                       ? new Date(inspection.created_at).toLocaleDateString() 
//                       : 'N/A'}
//                   </span>
//                 </div>
//               </div>

//               <div className="mt-6 flex justify-end">
//                 <button
//                   onClick={() => handleViewDetails(inspection.id)}
//                   className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {filteredInspections.length === 0 && (
//         <div className="text-center py-12">
//           <div className="text-gray-400 text-6xl mb-4">
//             {status === 'all' ? '📋' : 
//              status === 'Pending' ? '⏳' :
//              status === 'Approved' ? '✅' :
//              status === 'Rejected' ? '❌' : '📊'}
//           </div>
//           <h3 className="text-lg font-medium text-gray-900 mb-2">
//             {status === 'all' 
//               ? 'No inspections found' 
//               : `No ${status.toLowerCase()} inspections`}
//           </h3>
//           <p className="text-gray-500 mb-4">
//             {status === 'all' 
//               ? 'There are no inspections in the system yet.' 
//               : `There are currently no inspections with status "${status}".`}
//           </p>
//           <div className="space-x-3">
//             <button
//               onClick={fetchInspections}
//               className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
//             >
//               Try Again
//             </button>
//             {status !== 'all' && (
//               <button
//                 onClick={() => navigate('/admin/inspections?status=all')}
//                 className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
//               >
//                 View All Inspections
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InspectionsListPage;


import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { getAdminInspectionsByStatus } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';

const InspectionsListPage = () => {
  const [allInspections, setAllInspections] = useState([]);
  const [filteredInspections, setFilteredInspections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const status = searchParams.get('status') || 'all';
  const [searchTerm, setSearchTerm] = useState('');
  const { showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchInspections();
  }, [status]);

  useEffect(() => {
    filterInspections();
  }, [searchTerm, allInspections, status]);

  const fetchInspections = async () => {
    try {
      setLoading(true);
      console.log('🔄 Fetching admin inspections with status:', status);
      
      // Always fetch all inspections first
      const data = await getAdminInspectionsByStatus('all');
      console.log('✅ All admin inspections loaded:', data);
      
      setAllInspections(data);
    } catch (error) {
      console.error('❌ Error fetching admin inspections:', error);
      showError('Failed to fetch inspections');
      setAllInspections([]);
    } finally {
      setLoading(false);
    }
  };

  const filterInspections = () => {
    // First filter by status
    let filteredByStatus = status === 'all' 
      ? allInspections 
      : allInspections.filter(inspection => inspection.status === status);

    // Then filter by search term
    if (!searchTerm.trim()) {
      setFilteredInspections(filteredByStatus);
    } else {
      const searchLower = searchTerm.toLowerCase();
      const searched = filteredByStatus.filter(inspection =>
        inspection.client_name?.toLowerCase().includes(searchLower) ||
        inspection.industry_name?.toLowerCase().includes(searchLower) ||
        inspection.branch_name?.toLowerCase().includes(searchLower) ||
        inspection.inspector?.username?.toLowerCase().includes(searchLower) ||
        inspection.inspector?.name?.toLowerCase().includes(searchLower) ||
        (typeof inspection.inspector === 'string' && inspection.inspector.toLowerCase().includes(searchLower))
      );
      setFilteredInspections(searched);
    }
  };

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

  const handleViewDetails = (inspectionId) => {
    navigate(`/admin/inspections/${inspectionId}`);
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

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Status tabs with counts from allInspections
  const statusTabs = [
    { key: 'all', label: 'All', count: allInspections.length },
    { key: 'Pending', label: 'Pending', count: allInspections.filter(i => i.status === 'Pending').length },
    { key: 'In Progress', label: 'In Progress', count: allInspections.filter(i => i.status === 'In Progress').length },
    { key: 'Completed', label: 'Completed', count: allInspections.filter(i => i.status === 'Completed').length },
    { key: 'Approved', label: 'Approved', count: allInspections.filter(i => i.status === 'Approved').length },
    { key: 'Rejected', label: 'Rejected', count: allInspections.filter(i => i.status === 'Rejected').length },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading inspections...</span>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0 lg:px-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 capitalize">
              {status === 'all' ? 'All' : status} Inspections
            </h1>
            <p className="mt-1 text-sm text-gray-600">
              {filteredInspections.length} inspections found
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={fetchInspections}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Refresh
            </button>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Inspections
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                id="search"
                className="block w-full pl-10 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search by client name, industry, branch, or inspector..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <div className="absolute inset-y-0 right-0 flex items-center">
                  <button
                    onClick={clearSearch}
                    className="h-full py-0 px-3 border-transparent text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Search by client name, industry, branch name, or inspector name
            </p>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredInspections.length} of {allInspections.length} inspections
          {searchTerm && (
            <span className="text-blue-600 ml-2">
              for "{searchTerm}"
            </span>
          )}
        </div>
        {searchTerm && (
          <button
            onClick={clearSearch}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear search
          </button>
        )}
      </div>

      {/* Status Filter Tabs */}
      <div className="mb-6 bg-white rounded-lg shadow border">
        <div className="flex overflow-x-auto">
          {statusTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => navigate(`/admin/inspections?status=${tab.key}`)}
              className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium text-center border-b-2 transition-colors ${
                status === tab.key
                  ? 'border-blue-500 text-blue-600 bg-blue-50'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex flex-col items-center">
                <span>{tab.label}</span>
                <span className={`text-xs mt-1 ${
                  status === tab.key ? 'text-blue-500' : 'text-gray-400'
                }`}>
                  ({tab.count})
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Inspection Cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredInspections.map((inspection) => (
          <div key={inspection.id} className="bg-white overflow-hidden shadow rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900 truncate">
                  {inspection.client_name || 'No Client Name'}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inspection.status)}`}>
                  {inspection.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Industry:</span>
                  <span className="font-medium text-gray-900">{inspection.industry_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Branch:</span>
                  <span className="font-medium text-gray-900">{inspection.branch_name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Inspector:</span>
                  <span className="font-medium text-gray-900">{getInspectorName(inspection)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Created:</span>
                  <span className="font-medium text-gray-900">
                    {inspection.created_at 
                      ? new Date(inspection.created_at).toLocaleDateString() 
                      : 'N/A'}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleViewDetails(inspection.id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredInspections.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">
            {status === 'all' ? '📋' : 
             status === 'Pending' ? '⏳' :
             status === 'Approved' ? '✅' :
             status === 'Rejected' ? '❌' : '📊'}
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm 
              ? 'No matching inspections found' 
              : status === 'all' 
                ? 'No inspections found' 
                : `No ${status.toLowerCase()} inspections`
            }
          </h3>
          <p className="text-gray-500 mb-4">
            {searchTerm 
              ? `No inspections found for "${searchTerm}". Try a different search term.`
              : status === 'all' 
                ? 'There are no inspections in the system yet.' 
                : `There are currently no inspections with status "${status}".`
            }
          </p>
          <div className="space-x-3">
            <button
              onClick={fetchInspections}
              className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
            >
              Try Again
            </button>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Clear Search
              </button>
            )}
            {!searchTerm && status !== 'all' && (
              <button
                onClick={() => navigate('/admin/inspections?status=all')}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                View All Inspections
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default InspectionsListPage;