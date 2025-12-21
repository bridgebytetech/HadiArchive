import api, { apiRequest } from '@/lib/api';
import { Audio, PagedResponse } from '@/types';

const BASE_URL = '/audios';
const ADMIN_URL = '/admin/audios';

export const audioService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Audio>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Audio> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Audio>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  adminGetById: async (id: string): Promise<Audio> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  create: async (data: Partial<Audio>): Promise<Audio> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<Audio>): Promise<Audio> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<Audio> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },
};