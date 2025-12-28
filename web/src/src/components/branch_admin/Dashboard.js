// src/components/branch_admin/Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getBranchInspectionStats } from '../../services/inspectionService';
import { useNotification } from '../../context/NotificationContext';
import StatCard from '../common/StatCard';
import QuickActions from '../common/QuickActions';

const BranchAdminDashboard = () => {
  const [stats, setStats] = useState({
    all: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { showError } = useNotification();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getBranchInspectionStats(user?.branch_name);
      setStats(data);
    } catch (error) {
      showError('Failed to fetch branch statistics');
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  const quickActions = [
    {
      title: 'Create Inspection',
      description: 'Create a new inspection assignment',
      icon: 'plus-circle',
      color: 'green',
      link: '/branch-admin/create-inspection'
    },
    {
      title: 'Create Inspector',
      description: 'Add a new inspector to your branch',
      icon: 'user-add',
      color: 'blue',
      link: '/branch-admin/create-inspector'
    },
    {
      title: 'View Inspections',
      description: 'Manage all branch inspections',
      icon: 'clipboard-list',
      color: 'purple',
      link: '/branch-admin/inspections'
    },
    {
      title: 'Manage Inspectors',
      description: 'View and manage branch inspectors',
      icon: 'users',
      color: 'indigo',
      link: '/branch-admin/inspectors'
    }
  ];

  return (
    <div className="px-4 py-6 sm:px-0 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Branch Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-600">
          Welcome to your branch administration dashboard - {user?.branch_name}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard
          title="All Inspections"
          value={stats.all}
          icon="document-text"
          color="blue"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon="clock"
          color="yellow"
        />
        <StatCard
          title="Approved"
          value={stats.approved}
          icon="check-circle"
          color="green"
        />
        <StatCard
          title="Rejected"
          value={stats.rejected}
          icon="x-circle"
          color="red"
        />
      </div>

      {/* Quick Actions */}
      <QuickActions actions={quickActions} />

      {/* Branch Information */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Branch Information</h3>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Branch Name</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.branch_name}</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Your Email</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{user?.email}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default BranchAdminDashboard;

