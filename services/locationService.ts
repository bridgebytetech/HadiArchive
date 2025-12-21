import api, { apiRequest } from '@/lib/api';
import { Location } from '@/types';

const BASE_URL = '/locations';
const ADMIN_URL = '/admin/locations';

export const locationService = {
  // Public APIs
  getAll: async (): Promise<Location[]> => {
    return apiRequest(api.get(BASE_URL));
  },

  getById: async (id: string): Promise<Location> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  // Admin APIs
  adminGetAll: async (): Promise<Location[]> => {
    return apiRequest(api.get(ADMIN_URL));
  },

  create: async (data: Partial<Location>): Promise<Location> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<Location>): Promise<Location> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<Location> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },
};