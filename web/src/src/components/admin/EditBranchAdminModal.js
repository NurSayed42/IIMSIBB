// // src/components/admin/EditBranchAdminModal.js
// import React, { useState, useEffect } from 'react';
// import { updateBranchAdmin } from '../../services/adminService';
// import { useNotification } from '../../context/NotificationContext';

// const EditBranchAdminModal = ({ admin, onClose, onSuccess }) => {
//   const [formData, setFormData] = useState({
//     user_name: '',
//     email: '',
//     employee_id: '',
//     branch_name: ''
//   });
//   const [loading, setLoading] = useState(false);
//   const { showError } = useNotification();

//   useEffect(() => {
//     if (admin) {
//       setFormData({
//         user_name: admin.user_name || '',
//         email: admin.email || '',
//         employee_id: admin.employee_id || '',
//         branch_name: admin.branch_name || ''
//       });
//     }
//   }, [admin]);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await updateBranchAdmin(admin.id, formData);
//       onSuccess();
//     } catch (error) {
//       showError('Failed to update branch admin');
//       console.error('Error updating branch admin:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!admin) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
//       <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
//         <div className="mt-3">
//           {/* Header */}
//           <div className="flex justify-between items-center pb-3 border-b">
//             <h3 className="text-xl font-semibold text-gray-800">Edit Branch Admin</h3>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600"
//             >
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//               </svg>
//             </button>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="mt-4 space-y-4">
//             <div>
//               <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
//                 Username *
//               </label>
//               <input
//                 type="text"
//                 id="user_name"
//                 name="user_name"
//                 value={formData.user_name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
//               />
//             </div>

//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email *
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
//               />
//             </div>

//             <div>
//               <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
//                 Employee ID *
//               </label>
//               <input
//                 type="text"
//                 id="employee_id"
//                 name="employee_id"
//                 value={formData.employee_id}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
//               />
//             </div>

//             <div>
//               <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">
//                 Branch Name *
//               </label>
//               <input
//                 type="text"
//                 id="branch_name"
//                 name="branch_name"
//                 value={formData.branch_name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
//               />
//             </div>

//             {/* Buttons */}
//             <div className="flex justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
//               >
//                 {loading ? 'Updating...' : 'Update'}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditBranchAdminModal;
// src/components/admin/EditBranchAdminModal.js
import React, { useState, useEffect } from 'react';
import { updateBranchAdmin } from '../../services/adminService';
import { useNotification } from '../../context/NotificationContext';

const EditBranchAdminModal = ({ admin, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    employee_id: '',
    branch_name: '',
    password: '' // ✅ Password field added
  });
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  useEffect(() => {
    if (admin) {
      setFormData({
        user_name: admin.user_name || '',
        email: admin.email || '',
        employee_id: admin.employee_id || '',
        branch_name: admin.branch_name || '',
        password: '' // ✅ Password initially empty
      });
    }
  }, [admin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ✅ Create update data - only include password if provided
      const updateData = {
        user_name: formData.user_name,
        email: formData.email,
        employee_id: formData.employee_id,
        branch_name: formData.branch_name
      };

      // ✅ Only add password to update data if it's not empty
      if (formData.password.trim() !== '') {
        updateData.password = formData.password;
      }

      await updateBranchAdmin(admin.id, updateData);
      onSuccess();
    } catch (error) {
      showError('Failed to update branch admin');
      console.error('Error updating branch admin:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!admin) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
        <div className="mt-3">
          {/* Header */}
          <div className="flex justify-between items-center pb-3 border-b">
            <h3 className="text-xl font-semibold text-gray-800">Edit Branch Admin</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label htmlFor="user_name" className="block text-sm font-medium text-gray-700">
                Username *
              </label>
              <input
                type="text"
                id="user_name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="employee_id" className="block text-sm font-medium text-gray-700">
                Employee ID *
              </label>
              <input
                type="text"
                id="employee_id"
                name="employee_id"
                value={formData.employee_id}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div>
              <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">
                Branch Name *
              </label>
              <input
                type="text"
                id="branch_name"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            {/* ✅ Password Field - Optional */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                New Password (Optional)
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave empty to keep current password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
              />
              <p className="mt-1 text-xs text-gray-500">
                Only enter if you want to change the password
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
              >
                {loading ? 'Updating...' : 'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBranchAdminModal;