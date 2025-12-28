// src/services/adminService.js
import api from './api';

export const createBranchAdmin = async (adminData) => {
  const response = await api.post('/branch-admin/create/', adminData);
  return response.data;
};

export const getBranchAdmins = async () => {
  const response = await api.get('/branch-admin/list/');
  return response.data;
};

export const deleteBranchAdmin = async (id) => {
  const response = await api.delete(`/user/delete/${id}/`);
  return response.data;
};

export const updateBranchAdmin = async (id, adminData) => {
  const response = await api.put(`/user/update/${id}/`, adminData);
  return response.data;
};

// Alternative: PATCH request if you want partial update
export const patchBranchAdmin = async (id, adminData) => {
  const response = await api.patch(`/user/update/${id}/`, adminData);
  return response.data;
};