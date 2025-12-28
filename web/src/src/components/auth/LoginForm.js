// import React, { useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import { useNavigate } from 'react-router-dom';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [role, setRole] = useState('admin');
//   const [error, setError] = useState('');

//   const { login, loading } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     const result = await login(email, password, role);

//     if (result.success) {
//       switch (role) {
//         case 'admin':
//           navigate('/admin/dashboard');
//           break;
//         case 'branch_admin':
//           navigate('/branch-admin/dashboard');
//           break;
//         case 'inspector':
//           navigate('/inspector/dashboard');
//           break;
//         default:
//           navigate('/dashboard');
//       }
//     } else {
//       setError(result.error);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div className="text-center">
//           <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back!!</h2>
//           <p className="mt-2 text-sm text-gray-600">Login to continue</p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}

//           <div className="space-y-4">
//             <input
//               type="email"
//               placeholder="Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full p-3 border rounded-md"
//               required
//             />
//             <input
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-3 border rounded-md"
//               required
//             />
//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="w-full p-3 border rounded-md"
//             >
//               <option value="admin">Admin</option>
//               <option value="branch_admin">Branch Admin</option>
//               <option value="inspector">Inspector</option>
//             </select>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full py-3 bg-green-700 text-white rounded-md hover:bg-green-800 disabled:opacity-50"
//           >
//             {loading ? 'Signing in...' : 'Login'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginForm;








// src/components/auth/LoginForm.js - UPDATED VERSION
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../../context/NotificationContext';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    employee_id: '',
    branch_name: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { showSuccess, showError } = useNotification();
  const navigate = useNavigate();

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
      const response = await fetch('http://localhost:8000/api/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Save tokens and user data
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        showSuccess('Login successful!');
        
        // Redirect based on role - DEFAULT: All go to inspector dashboard
        // Later admin can change roles and they will go to respective dashboards
        navigate('/inspector/dashboard');
        
      } else {
        showError(data.error || 'Login failed');
      }
    } catch (error) {
      showError('Login failed. Please try again.');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Welcome Back!</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to your account</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Employee ID */}
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
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your employee ID"
              />
            </div>

            {/* Branch Code */}
            <div>
              <label htmlFor="branch_name" className="block text-sm font-medium text-gray-700">
                Branch Code *
              </label>
              <input
                type="text"
                id="branch_name"
                name="branch_name"
                value={formData.branch_name}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your branch code"
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password *
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="font-medium text-primary hover:text-primary-dark"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;