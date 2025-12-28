

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAdminInspectionStats } from '../../services/inspectionService';
// import { useNotification } from '../../context/NotificationContext';
// import StatCard from '../common/StatCard';
// import QuickActions from '../common/QuickActions';

// const AdminDashboard = () => {
//   const [stats, setStats] = useState({
//     all: 0,
//     pending: 0,
//     approved: 0,
//     rejected: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const { showError } = useNotification();
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const fetchStats = async () => {
//     try {
//       console.log('🔄 Fetching admin inspection stats...');
//       const data = await getAdminInspectionStats();
//       console.log('📊 Admin stats received:', data);
      
//       // Format the data to ensure we have the right structure
//       const formattedStats = {
//         all: data.all || 0,
//         pending: data.pending || 0,
//         approved: data.approved || 0,
//         rejected: data.rejected || 0,
//       };
      
//       console.log('✅ Formatted stats:', formattedStats);
//       setStats(formattedStats);
//     } catch (error) {
//       console.error('❌ Error fetching admin stats:', error);
//       showError('Failed to fetch statistics');
      
//       // Set default values in case of error
//       setStats({
//         all: 0,
//         pending: 0,
//         approved: 0,
//         rejected: 0,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCardClick = (status) => {
//     navigate(`/admin/inspections?status=${status}`);
//   };

//   // Mock data for charts (in real app, this would come from API)
//   const chartData = {
//     statusDistribution: [
//       { status: 'Pending', count: stats.pending, color: 'bg-yellow-500' },
//       { status: 'In Progress', count: Math.floor(stats.all * 0.2), color: 'bg-blue-500' },
//       { status: 'Completed', count: Math.floor(stats.all * 0.1), color: 'bg-purple-500' },
//       { status: 'Approved', count: stats.approved, color: 'bg-green-500' },
//       { status: 'Rejected', count: stats.rejected, color: 'bg-red-500' },
//     ],
//     branchWise: [
//       { branch: 'Dhaka Main', count: Math.floor(stats.all * 0.4), color: 'bg-blue-600' },
//       { branch: 'Chittagong', count: Math.floor(stats.all * 0.3), color: 'bg-green-600' },
//       { branch: 'Sylhet', count: Math.floor(stats.all * 0.15), color: 'bg-purple-600' },
//       { branch: 'Khulna', count: Math.floor(stats.all * 0.1), color: 'bg-orange-600' },
//       { branch: 'Rajshahi', count: Math.floor(stats.all * 0.05), color: 'bg-red-600' },
//     ],
//     monthlyTrend: [
//       { month: 'Jan', inspections: 12 },
//       { month: 'Feb', inspections: 18 },
//       { month: 'Mar', inspections: 15 },
//       { month: 'Apr', inspections: 22 },
//       { month: 'May', inspections: 25 },
//       { month: 'Jun', inspections: stats.all || 20 },
//     ]
//   };

//   const getPercentage = (value, total) => {
//     if (total === 0) return 0;
//     return Math.round((value / total) * 100);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
//         <span className="ml-3 text-gray-600">Loading dashboard...</span>
//       </div>
//     );
//   }

//   const quickActions = [
//     {
//       title: 'Create Branch Admin',
//       description: 'Add a new branch administrator',
//       icon: 'user-add',
//       color: 'green',
//       link: '/admin/create-branch-admin'
//     },
//     {
//       title: 'View Branch Admins',
//       description: 'Manage all branch administrators',
//       icon: 'users',
//       color: 'blue',
//       link: '/admin/branch-admins'
//     },
//     {
//       title: 'View All Inspections',
//       description: 'See all inspection records',
//       icon: 'clipboard-list',
//       color: 'purple',
//       link: '/admin/inspections'
//     }
//   ];

//   return (
//     <div className="px-4 py-6 sm:px-0 lg:px-8">
//       <div className="mb-8">
//         <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
//         <p className="mt-1 text-sm text-gray-600">
//           Welcome to the InvestTracker admin dashboard
//         </p>
//       </div>

//       {/* Statistics Cards */}
//       <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
//         <StatCard
//           title="All Inspections"
//           value={stats.all}
//           icon="document-text"
//           color="blue"
//           onClick={() => handleCardClick('all')}
//           clickable
//         />
//         <StatCard
//           title="Pending"
//           value={stats.pending}
//           icon="clock"
//           color="yellow"
//           onClick={() => handleCardClick('pending')}
//           clickable
//         />
//         <StatCard
//           title="Approved"
//           value={stats.approved}
//           icon="check-circle"
//           color="green"
//           onClick={() => handleCardClick('approved')}
//           clickable
//         />
//         <StatCard
//           title="Rejected"
//           value={stats.rejected}
//           icon="x-circle"
//           color="red"
//           onClick={() => handleCardClick('rejected')}
//           clickable
//         />
//       </div>

//       {/* Quick Actions */}
//       <QuickActions actions={quickActions} />

//       {/* Analytics & Charts Section */}
//       <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
//         {/* Status Distribution Chart */}
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Status Distribution</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Breakdown of inspections by status
//             </p>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
//             <div className="space-y-4">
//               {chartData.statusDistribution.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
//                     <span className="text-sm font-medium text-gray-700">{item.status}</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-32 bg-gray-200 rounded-full h-2">
//                       <div 
//                         className={`h-2 rounded-full ${item.color}`}
//                         style={{ width: `${getPercentage(item.count, stats.all)}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-600 w-12 text-right">
//                       {item.count} ({getPercentage(item.count, stats.all)}%)
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Branch-wise Distribution */}
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg">
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Branch-wise Inspections</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Inspection distribution across branches
//             </p>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
//             <div className="space-y-4">
//               {chartData.branchWise.map((item, index) => (
//                 <div key={index} className="flex items-center justify-between">
//                   <div className="flex items-center space-x-3">
//                     <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
//                     <span className="text-sm font-medium text-gray-700 truncate max-w-24">{item.branch}</span>
//                   </div>
//                   <div className="flex items-center space-x-3">
//                     <div className="w-32 bg-gray-200 rounded-full h-2">
//                       <div 
//                         className={`h-2 rounded-full ${item.color}`}
//                         style={{ width: `${getPercentage(item.count, stats.all)}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-sm text-gray-600 w-12 text-right">
//                       {item.count}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Monthly Trend Chart */}
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:col-span-2">
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Monthly Inspection Trend</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Inspection progress over the last 6 months
//             </p>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
//             <div className="flex items-end justify-between space-x-2 h-40">
//               {chartData.monthlyTrend.map((item, index) => {
//                 const maxValue = Math.max(...chartData.monthlyTrend.map(m => m.inspections));
//                 const height = (item.inspections / maxValue) * 120;
//                 return (
//                   <div key={index} className="flex flex-col items-center space-y-2 flex-1">
//                     <div className="text-xs text-gray-500">{item.inspections}</div>
//                     <div 
//                       className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
//                       style={{ height: `${height}px` }}
//                     ></div>
//                     <div className="text-xs font-medium text-gray-700">{item.month}</div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:col-span-2">
//           <div className="px-4 py-5 sm:px-6">
//             <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Statistics</h3>
//             <p className="mt-1 text-sm text-gray-500">
//               Key performance indicators
//             </p>
//           </div>
//           <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               <div className="text-center p-4 bg-blue-50 rounded-lg">
//                 <div className="text-2xl font-bold text-blue-600">{getPercentage(stats.approved, stats.all)}%</div>
//                 <div className="text-sm text-blue-600">Approval Rate</div>
//               </div>
//               <div className="text-center p-4 bg-yellow-50 rounded-lg">
//                 <div className="text-2xl font-bold text-yellow-600">{getPercentage(stats.pending, stats.all)}%</div>
//                 <div className="text-sm text-yellow-600">Pending Rate</div>
//               </div>
//               <div className="text-center p-4 bg-green-50 rounded-lg">
//                 <div className="text-2xl font-bold text-green-600">{stats.all}</div>
//                 <div className="text-sm text-green-600">Total Inspections</div>
//               </div>
//               <div className="text-center p-4 bg-purple-50 rounded-lg">
//                 <div className="text-2xl font-bold text-purple-600">{Math.floor(stats.all / 6)}</div>
//                 <div className="text-sm text-purple-600">Avg/Month</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Refresh Button */}
//       <div className="mt-6 flex justify-end">
//         <button
//           onClick={fetchStats}
//           className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//         >
//           Refresh Stats
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;





import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminInspectionStats } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';
import StatCard from '../common/StatCard';
import QuickActions from '../common/QuickActions';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    inProgress: 0,
    completed: 0,
    statusDistribution: [],
    branchWise: [],
    monthlyTrend: []
  });
  const [loading, setLoading] = useState(true);
  const { showError } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('🔄 Fetching admin inspection stats...');
      const data = await getAdminInspectionStats();
      console.log('📊 Admin stats received:', data);
      
      // Format the data to ensure we have the right structure
      const formattedStats = {
        all: data.all || 0,
        pending: data.pending || 0,
        approved: data.approved || 0,
        rejected: data.rejected || 0,
        inProgress: data.inProgress || 0,
        completed: data.completed || 0,
        statusDistribution: data.statusDistribution || [],
        branchWise: data.branchWise || [],
        monthlyTrend: data.monthlyTrend || []
      };
      
      console.log('✅ Formatted stats:', formattedStats);
      setStats(formattedStats);
    } catch (error) {
      console.error('❌ Error fetching admin stats:', error);
      showError('Failed to fetch statistics');
      
      // Set default values in case of error
      setStats({
        all: 0,
        pending: 0,
        approved: 0,
        rejected: 0,
        inProgress: 0,
        completed: 0,
        statusDistribution: [],
        branchWise: [],
        monthlyTrend: []
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (status) => {
    navigate(`/admin/inspections?status=${status}`);
  };

  // Prepare chart data from real stats
  const chartData = {
    statusDistribution: [
      { status: 'Pending', count: stats.pending, color: 'bg-yellow-500' },
      { status: 'In Progress', count: stats.inProgress, color: 'bg-blue-500' },
      { status: 'Completed', count: stats.completed, color: 'bg-purple-500' },
      { status: 'Approved', count: stats.approved, color: 'bg-green-500' },
      { status: 'Rejected', count: stats.rejected, color: 'bg-red-500' },
    ],
    branchWise: stats.branchWise.length > 0 ? stats.branchWise : [
      { branch: 'Dhaka Main', count: Math.floor(stats.all * 0.4), color: 'bg-blue-600' },
      { branch: 'Chittagong', count: Math.floor(stats.all * 0.3), color: 'bg-green-600' },
      { branch: 'Sylhet', count: Math.floor(stats.all * 0.15), color: 'bg-purple-600' },
      { branch: 'Khulna', count: Math.floor(stats.all * 0.1), color: 'bg-orange-600' },
      { branch: 'Rajshahi', count: Math.floor(stats.all * 0.05), color: 'bg-red-600' },
    ],
    monthlyTrend: stats.monthlyTrend.length > 0 ? stats.monthlyTrend : [
      { month: 'Jan', inspections: 12 },
      { month: 'Feb', inspections: 18 },
      { month: 'Mar', inspections: 15 },
      { month: 'Apr', inspections: 22 },
      { month: 'May', inspections: 25 },
      { month: 'Jun', inspections: stats.all || 20 },
    ]
  };

  const getPercentage = (value, total) => {
    if (total === 0) return 0;
    return Math.round((value / total) * 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Create Branch Admin',
      description: 'Add a new branch administrator',
      icon: 'user-add',
      color: 'green',
      link: '/admin/create-branch-admin'
    },
    {
      title: 'View Branch Admins',
      description: 'Manage all branch administrators',
      icon: 'users',
      color: 'blue',
      link: '/admin/branch-admins'
    },
    {
      title: 'View All Inspections',
      description: 'See all inspection records',
      icon: 'clipboard-list',
      color: 'purple',
      link: '/admin/inspections'
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-0 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to the InvestTracker admin dashboard
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="All Inspections"
          value={stats.all}
          icon="document-text"
          color="blue"
          onClick={() => handleCardClick('all')}
          // clickable
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon="clock"
          color="yellow"
          onClick={() => handleCardClick('pending')}
          // clickable
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon="check-circle"
          color="green"
          onClick={() => handleCardClick('approved')}
          // clickable
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon="x-circle"
          color="red"
          onClick={() => handleCardClick('rejected')}
          // clickable
        />
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Analytics & Charts Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Status Distribution Chart */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Status Distribution</h3>
            <p className="mt-1 text-sm text-gray-500">
              Breakdown of inspections by status
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {chartData.statusDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-700">{item.status}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${getPercentage(item.count, stats.all)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {item.count} ({getPercentage(item.count, stats.all)}%)
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Branch-wise Distribution */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Branch-wise Inspections</h3>
            <p className="mt-1 text-sm text-gray-500">
              Inspection distribution across branches
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="space-y-4">
              {chartData.branchWise.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm font-medium text-gray-700 truncate max-w-24">{item.branch}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${getPercentage(item.count, stats.all)}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">
                      {item.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monthly Trend Chart */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:col-span-2">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Monthly Inspection Trend</h3>
            <p className="mt-1 text-sm text-gray-500">
              Inspection progress over the last 6 months
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="flex items-end justify-between space-x-2 h-40">
              {chartData.monthlyTrend.map((item, index) => {
                const maxValue = Math.max(...chartData.monthlyTrend.map(m => m.inspections));
                const height = maxValue > 0 ? (item.inspections / maxValue) * 120 : 0;
                return (
                  <div key={index} className="flex flex-col items-center space-y-2 flex-1">
                    <div className="text-xs text-gray-500">{item.inspections}</div>
                    <div 
                      className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
                      style={{ height: `${height}px` }}
                    ></div>
                    <div className="text-xs font-medium text-gray-700">{item.month}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white shadow overflow-hidden sm:rounded-lg lg:col-span-2">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Quick Statistics</h3>
            <p className="mt-1 text-sm text-gray-500">
              Key performance indicators
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{getPercentage(stats.approved, stats.all)}%</div>
                <div className="text-sm text-blue-600">Approval Rate</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{getPercentage(stats.pending, stats.all)}%</div>
                <div className="text-sm text-yellow-600">Pending Rate</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{stats.all}</div>
                <div className="text-sm text-green-600">Total Inspections</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{Math.floor(stats.all / 6)}</div>
                <div className="text-sm text-purple-600">Avg/Month</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={fetchStats}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Refresh Stats
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;