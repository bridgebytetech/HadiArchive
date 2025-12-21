import api, { apiRequest } from '@/lib/api';
import { Admin } from '@/types';

const ADMIN_URL = '/admin/admins';

export const adminService = {
  getAll: async (): Promise<Admin[]> => {
    return apiRequest(api.get(ADMIN_URL));
  },

  getById: async (id: string): Promise<Admin> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  activate: async (id: string): Promise<Admin> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/activate`));
  },

  deactivate: async (id: string): Promise<Admin> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/deactivate`));
  },

  resetPassword: async (id: string, newPassword: string): Promise<string> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/reset-password?newPassword=${newPassword}`));
  },
};