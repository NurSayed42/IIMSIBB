
// // src/routes.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import ProtectedRoute from './components/common/ProtectedRoute';
// import AdminDashboard from './components/admin/Dashboard';
// import BranchAdminDashboard from './components/branch_admin/Dashboard';
// import InspectorDashboard from './components/inspector/Dashboard';
// import CreateInspection from './components/branch_admin/CreateInspection';
// import InspectionForm from './components/inspector/InspectionForm';
// import AssignedInspections from './components/inspector/AssignedInspections';
// import CreateBranchAdmin from './components/admin/CreateBranchAdmin'; // নতুন import
// import BranchAdminsList from './components/admin/BranchAdminsList'; // নতুন import
// import SignupForm from './components/auth/SignupForm';
// import UsersManagement from './components/admin/UsersManagement';
// import BranchAdminUsersManagement from './components/branch_admin/BranchAdminUsersManagement';

// //

// // Admin Dashboard Components - নতুন import
// import InspectionsListPage from './components/admin/InspectionsListPage';
// import InspectionDetailsPage from './components/admin/InspectionDetailsPage';

// // ✅ 
// const DashboardRedirect = () => {
//   const user = JSON.parse(localStorage.getItem('user') || '{}');
  
//   switch (user.role) {
//     case 'admin':
//       return <Navigate to="/admin/dashboard" replace />;
//     case 'branch_admin':
//       return <Navigate to="/branch-admin/dashboard" replace />;
//     case 'inspector':
//       return <Navigate to="/inspector/dashboard" replace />;
//     default:
//       return <Navigate to="/login" replace />;
//   }
// };

// export const routes = [
//   ////new added routes for signup////////////
//   {
//     path: '/',
//     element: <Navigate to="/dashboard" replace />
//   },
//   {
//     path: '/dashboard',
//     element: <ProtectedRoute><DashboardRedirect /></ProtectedRoute>
//   },
//   /////////////end new added routes for signup////////////
//   {
//     path: '/',
//     element: <Navigate to="/dashboard" replace />
//   },
//   {
//     path: '/dashboard',
//     element: <ProtectedRoute><DashboardRedirect /></ProtectedRoute>
//   },
//   {
//     path: '/admin/dashboard',
//     element: <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
//   },
//   {
//     path: '/branch-admin/dashboard',
//     element: <ProtectedRoute roles={['branch_admin']}><BranchAdminDashboard /></ProtectedRoute>
//   },
//   {
//     path: '/inspector/dashboard',
//     element: <ProtectedRoute roles={['inspector']}><InspectorDashboard /></ProtectedRoute>
//   },
//   {
//     path: '/branch-admin/create-inspection',
//     element: <ProtectedRoute roles={['branch_admin']}><CreateInspection /></ProtectedRoute>
//   },
//   {
//     path: '/inspector/inspection/:id',
//     element: <ProtectedRoute roles={['inspector']}><InspectionForm /></ProtectedRoute>
//   },
//   {
//     path: '/inspector/assigned-inspections',
//     element: <ProtectedRoute roles={['inspector']}><AssignedInspections /></ProtectedRoute>
//   },
//   // {
//   //   path: '/inspector/inspection/details/:id',
//   //   element: <ProtectedRoute roles={['inspector']}><InspectionDetails /></ProtectedRoute>
//   // },
  
//   // ✅ নতুন রাউট যোগ করুন
//   {
//     path: '/admin/create-branch-admin',
//     element: <ProtectedRoute roles={['admin']}><CreateBranchAdmin /></ProtectedRoute>
//   },
//   {
//     path: '/admin/branch-admins',
//     element: <ProtectedRoute roles={['admin']}><BranchAdminsList /></ProtectedRoute>
//   },
//   {
//     path: '/inspector/inspections',
//     element: <ProtectedRoute allowedRoles={['inspector']}><InspectionsListPage /></ProtectedRoute>
//   },
//   // ✅ নতুন Inspection Management রাউট যোগ করুন
//   {
//     path: '/admin/inspections',
//     element: <ProtectedRoute roles={['admin']}><InspectionsListPage /></ProtectedRoute>
//   },
//   {
//     path: '/admin/inspections/:id',
//     element: <ProtectedRoute roles={['admin']}><InspectionDetailsPage /></ProtectedRoute>
//   },
//   // In your routes.js file
//    {
//     path: '/admin/users',
//     element: <ProtectedRoute roles={['admin']}><UsersManagement /></ProtectedRoute>
//   },
//   {
//     path: '/branch-admin/users',
//     element: <ProtectedRoute roles={['branch_admin']}><BranchAdminUsersManagement /></ProtectedRoute>
//   },
  
  
// ];







// src/routes.js - Alternative version with shared components
import React from 'react';
import { Navigate } from 'react-router-dom';
import ProtectedRoute from './components/common/ProtectedRoute';

// Import all components
import AdminDashboard from './components/admin/Dashboard';
import BranchAdminDashboard from './components/branch_admin/Dashboard';
import InspectorDashboard from './components/inspector/Dashboard';
import CreateInspection from './components/branch_admin/CreateInspection';
import InspectionForm from './components/inspector/InspectionForm';
import AssignedInspections from './components/inspector/AssignedInspections';
import CreateBranchAdmin from './components/admin/CreateBranchAdmin';
import BranchAdminsList from './components/admin/BranchAdminsList';
import UsersManagement from './components/admin/UsersManagement';
import BranchAdminUsersManagement from './components/branch_admin/BranchAdminUsersManagement';

// Shared Inspection Components
import InspectionsListPage from './components/admin/InspectionsListPage';
import InspectionDetailsPage from './components/admin/InspectionDetailsPage';
import BranchInspectionsList from './components/branch_admin/BranchInspectionsList';


import InspectionsList from './components/inspector/InspectionList';
// Dashboard Redirect Component
const DashboardRedirect = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  
  switch (user.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" replace />;
    case 'branch_admin':
      return <Navigate to="/branch-admin/dashboard" replace />;
    case 'inspector':
      return <Navigate to="/inspector/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export const routes = [
  // Root and Dashboard Routes
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardRedirect /></ProtectedRoute>
  },

  // Admin Routes
  {
    path: '/admin/dashboard',
    element: <ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>
  },
  {
    path: '/admin/create-branch-admin',
    element: <ProtectedRoute roles={['admin']}><CreateBranchAdmin /></ProtectedRoute>
  },
  {
    path: '/admin/branch-admins',
    element: <ProtectedRoute roles={['admin']}><BranchAdminsList /></ProtectedRoute>
  },
  {
    path: '/admin/users',
    element: <ProtectedRoute roles={['admin']}><UsersManagement /></ProtectedRoute>
  },
  {
    path: '/admin/inspections',
    element: <ProtectedRoute roles={['admin']}><InspectionsListPage /></ProtectedRoute>
  },
  {
    path: '/admin/inspections/:id',
    element: <ProtectedRoute roles={['admin']}><InspectionDetailsPage /></ProtectedRoute>
  },

  // Branch Admin Routes
  {
    path: '/branch-admin/dashboard',
    element: <ProtectedRoute roles={['branch_admin']}><BranchAdminDashboard /></ProtectedRoute>
  },
  {
    path: '/branch-admin/create-inspection',
    element: <ProtectedRoute roles={['branch_admin']}><CreateInspection /></ProtectedRoute>
  },
  {
    path: '/branch-admin/users',
    element: <ProtectedRoute roles={['branch_admin']}><BranchAdminUsersManagement /></ProtectedRoute>
  },
  // Shared Inspection Routes for Branch Admin
  {
    path: '/branch-admin/inspections',
    element: <ProtectedRoute roles={['branch_admin']}><BranchInspectionsList /></ProtectedRoute>
  },
  {
    path: '/branch-admin/inspections/:id',
    element: <ProtectedRoute roles={['branch_admin']}><InspectionDetailsPage /></ProtectedRoute>
  },

  // Inspector Routes
  {
    path: '/inspector/dashboard',
    element: <ProtectedRoute roles={['inspector']}><InspectorDashboard /></ProtectedRoute>
  },
  {
    path: '/inspector/inspection/:id',
    element: <ProtectedRoute roles={['inspector']}><InspectionForm /></ProtectedRoute>
  },
  {
    path: '/inspector/assigned-inspections',
    element: <ProtectedRoute roles={['inspector']}><AssignedInspections /></ProtectedRoute>
  },
  {
    path: '/inspector/inspections',
    element: <ProtectedRoute roles={['inspector']}><InspectionsList /></ProtectedRoute>
  },
   {
    path: '/inspector/my-inspections',
    element: <ProtectedRoute roles={['inspector']}><InspectionsList /></ProtectedRoute>
  }
];