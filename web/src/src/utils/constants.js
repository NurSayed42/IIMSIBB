// src/utils/constants.js
export const USER_ROLES = {
  ADMIN: 'admin',
  BRANCH_ADMIN: 'branch_admin',
  INSPECTOR: 'inspector'
};

export const INSPECTION_STATUS = {
  PENDING: 'pending',
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const STATUS_COLORS = {
  [INSPECTION_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [INSPECTION_STATUS.IN_PROGRESS]: 'bg-blue-100 text-blue-800',
  [INSPECTION_STATUS.COMPLETED]: 'bg-green-100 text-green-800',
  [INSPECTION_STATUS.APPROVED]: 'bg-green-100 text-green-800',
  [INSPECTION_STATUS.REJECTED]: 'bg-red-100 text-red-800'
};

export const API_ENDPOINTS = {
  LOGIN: '/token/',
  REFRESH_TOKEN: '/token/refresh/',
  CURRENT_USER: '/current-user/',
  INSPECTION_STATS: '/inspection/stats/',
  BRANCH_INSPECTION_STATS: '/branch/inspection-stats/',
  INSPECTOR_STATS: '/inspections/stats/',
  NEW_INSPECTIONS: '/new-inspections/',
  INSPECTIONS: '/inspections/',
  USERS: '/users/',
  BRANCH_ADMINS: '/branch-admin/',
  INSPECTORS: '/inspector/'
};