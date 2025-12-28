// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthProvider } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import LoginForm from './components/auth/LoginForm';
// import { routes } from './routes';
// import Header from './components/common/Header';
// import Sidebar from './components/common/Sidebar';

// function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginForm />} />
//       {routes.map((route, index) => (
//         <Route
//           key={index}
//           path={route.path}
//           element={
//             <div className="min-h-screen bg-gray-100">
//               <Header />
//               <div className="flex">
//                 <Sidebar />
//                 <main className="flex-1">
//                   {route.element}
//                 </main>
//               </div>
//             </div>
//           }
//         />
//       ))}
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <NotificationProvider>
//         <Router>
//           <AppRoutes />
//           <ToastContainer
//             position="top-right"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//         </Router>
//       </NotificationProvider>
//     </AuthProvider>
//   );
// }

// export default App;


























// src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { AuthProvider } from './context/AuthContext';
// import { NotificationProvider } from './context/NotificationContext';
// import LoginForm from './components/auth/LoginForm';
// import { routes } from './routes';
// import Header from './components/common/Header';
// import Sidebar from './components/common/Sidebar';
// import InspectorsList from './components/admin/InspectorsList '

// function AppRoutes() {
//   return (
//     <Routes>
//       {/* Public Route - Login */}
//       <Route path="/login" element={<LoginForm />} />
      
//       {/* Protected Routes with Layout */}
//       {routes.map((route, index) => (
//         <Route
//           key={index}
//           path={route.path}
//           element={
//             <div className="min-h-screen bg-gray-100">
//               <Header />
//               <div className="flex">
//                 <Sidebar />
//                 <main className="flex-1 p-4 md:p-6">
//                   {route.element}
//                 </main>
//               </div>
//             </div>
//           }
//         />
//       ))}
      
//       {/* Catch all route - redirect to dashboard */}
//       <Route path="*" element={<Navigate to="/dashboard" replace />} />
//       <Route path="/admin/inspectors" element={<InspectorsList />} />

//     </Routes>
//   );
// }

// function App() {
//   return (
//     <AuthProvider>
//       <NotificationProvider>
//         <Router>
//           <AppRoutes />
//           <ToastContainer
//             position="top-right"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//         </Router>
//       </NotificationProvider>
//     </AuthProvider>
//   );
// }

// export default App;

// src/App.js - UPDATED
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm'; // Import new SignupForm
import { routes } from './routes';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      
      {/* Protected Routes with Layout */}
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          element={
            <div className="min-h-screen bg-gray-100">
              <Header />
              <div className="flex">
                <Sidebar />
                <main className="flex-1 p-4 md:p-6">
                  {route.element}
                </main>
              </div>
            </div>
          }
        />
      ))}
      
      {/* Catch all route - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <Router>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </NotificationProvider>
    </AuthProvider>
  );
}

export default App;