
// // src/components/admin/BranchAdminsList.js
// import React, { useState, useEffect } from 'react';
// import { getBranchAdmins, deleteBranchAdmin } from '../../services/adminService';
// import { useNotification } from '../../context/NotificationContext';
// import EditBranchAdminModal from './EditBranchAdminModal';

// const BranchAdminsList = () => {
//   const [branchAdmins, setBranchAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingAdmin, setEditingAdmin] = useState(null);
//   const [isEditModalOpen, setIsEditModalOpen] = useState(false);
//   const { showSuccess, showError } = useNotification();

//   useEffect(() => {
//     fetchBranchAdmins();
//   }, []);

//   const fetchBranchAdmins = async () => {
//     try {
//       const data = await getBranchAdmins();
//       setBranchAdmins(data);
//     } catch (error) {
//       showError('Failed to fetch branch admins');
//       console.error('Error fetching branch admins:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDelete = async (id, userName) => {
//     if (window.confirm(`Are you sure you want to delete branch admin "${userName}"?`)) {
//       try {
//         await deleteBranchAdmin(id);
//         showSuccess('Branch admin deleted successfully!');
//         fetchBranchAdmins(); // Refresh the list
//       } catch (error) {
//         showError('Failed to delete branch admin');
//         console.error('Error deleting branch admin:', error);
//       }
//     }
//   };

//   const handleEdit = (admin) => {
//     setEditingAdmin(admin);
//     setIsEditModalOpen(true);
//   };

//   const handleUpdateSuccess = () => {
//     showSuccess('Branch admin updated successfully!');
//     fetchBranchAdmins(); // Refresh the list
//     setIsEditModalOpen(false);
//     setEditingAdmin(null);
//   };

//   const handleCloseModal = () => {
//     setIsEditModalOpen(false);
//     setEditingAdmin(null);
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
//         <h1 className="text-2xl font-bold text-gray-900">Branch Admins</h1>
//         <p className="mt-1 text-sm text-gray-600">
//           Manage all branch administrators
//         </p>
//       </div>

//       <div className="bg-white shadow overflow-hidden sm:rounded-md">
//         <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
//           <h3 className="text-lg leading-6 font-medium text-gray-900">
//             Branch Administrators
//           </h3>
//           <p className="mt-1 text-sm text-gray-500">
//             List of all branch administrators in the system
//           </p>
//         </div>

//         {branchAdmins.length === 0 ? (
//           <div className="px-4 py-5 sm:px-6">
//             <p className="text-sm text-gray-500">No branch admins found</p>
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {branchAdmins.map((admin) => (
//               <li key={admin.id}>
//                 <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
//                   <div className="flex items-center justify-between">
//                     <div className="flex items-center">
//                       <div className="flex-shrink-0">
//                         <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
//                           <span className="text-white font-medium text-sm">
//                             {admin.user_name?.charAt(0).toUpperCase()}
//                           </span>
//                         </div>
//                       </div>
//                       <div className="ml-4">
//                         <div className="text-sm font-medium text-gray-900">
//                           {admin.user_name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {admin.email}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           Employee ID: {admin.employee_id}
//                         </div>
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-4">
//                       <div className="text-sm text-gray-900">
//                         <span className="font-medium">Branch:</span> {admin.branch_name}
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => handleEdit(admin)}
//                           className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(admin.id, admin.user_name)}
//                           className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {isEditModalOpen && (
//         <EditBranchAdminModal
//           admin={editingAdmin}
//           onClose={handleCloseModal}
//           onSuccess={handleUpdateSuccess}
//         />
//       )}
//     </div>
//   );
// };

// export default BranchAdminsList;

// src/components/admin/BranchAdminsList.js
import React, { useState, useEffect } from 'react';
import { getBranchAdmins, deleteBranchAdmin } from '../../services/adminService';
import { useNotification } from '../../context/NotificationContext';
import EditBranchAdminModal from './EditBranchAdminModal';

const BranchAdminsList = () => {
  const [branchAdmins, setBranchAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { showSuccess, showError } = useNotification();

  useEffect(() => {
    fetchBranchAdmins();
  }, []);

  useEffect(() => {
    filterAdmins();
  }, [searchTerm, branchAdmins]);

  const fetchBranchAdmins = async () => {
    try {
      const data = await getBranchAdmins();
      setBranchAdmins(data);
    } catch (error) {
      showError('Failed to fetch branch admins');
      console.error('Error fetching branch admins:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAdmins = () => {
    if (!searchTerm.trim()) {
      setFilteredAdmins(branchAdmins);
    } else {
      const filtered = branchAdmins.filter(admin =>
        admin.branch_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.user_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.employee_id?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAdmins(filtered);
    }
  };

  const handleDelete = async (id, userName) => {
    if (window.confirm(`Are you sure you want to delete branch admin "${userName}"?`)) {
      try {
        await deleteBranchAdmin(id);
        showSuccess('Branch admin deleted successfully!');
        fetchBranchAdmins(); // Refresh the list
      } catch (error) {
        showError('Failed to delete branch admin');
        console.error('Error deleting branch admin:', error);
      }
    }
  };

  const handleEdit = (admin) => {
    setEditingAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleUpdateSuccess = () => {
    showSuccess('Branch admin updated successfully!');
    fetchBranchAdmins(); // Refresh the list
    setIsEditModalOpen(false);
    setEditingAdmin(null);
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setEditingAdmin(null);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-0 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Branch Admins</h1>
        <p className="mt-1 text-sm text-gray-600">
          Manage all branch administrators
        </p>
      </div>

      {/* Search Section */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow border">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex-1 w-full">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search Branch Admins
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
                placeholder="Search by branch name, username, email, or employee ID..."
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
              Search by branch name, username, email address, or employee ID
            </p>
          </div>
          
          <div className="flex items-end space-x-3">
            <button
              onClick={fetchBranchAdmins}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Refresh
            </button>
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="mb-4 flex items-center justify-between">
        <div className="text-sm text-gray-600">
          Showing {filteredAdmins.length} of {branchAdmins.length} branch admins
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

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Branch Administrators
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                List of all branch administrators in the system
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Total: {branchAdmins.length} | Showing: {filteredAdmins.length}
            </div>
          </div>
        </div>

        {filteredAdmins.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <div className="text-gray-400 text-4xl mb-4">👥</div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm ? 'No matching branch admins found' : 'No branch admins found'}
            </h3>
            <p className="text-gray-500 mb-4">
              {searchTerm 
                ? `No branch admins found for "${searchTerm}". Try a different search term.`
                : 'There are no branch administrators in the system yet.'
              }
            </p>
            {searchTerm && (
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100"
              >
                Clear Search
              </button>
            )}
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredAdmins.map((admin) => (
              <li key={admin.id}>
                <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                          <span className="text-white font-medium text-sm">
                            {admin.user_name?.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {admin.user_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {admin.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          Employee ID: {admin.employee_id}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-sm text-gray-900">
                        <span className="font-medium">Branch:</span> {admin.branch_name}
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(admin)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(admin.id, admin.user_name)}
                          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-5 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditBranchAdminModal
          admin={editingAdmin}
          onClose={handleCloseModal}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default BranchAdminsList;