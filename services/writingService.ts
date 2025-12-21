import api, { apiRequest } from '@/lib/api';
import { Writing, PagedResponse } from '@/types';

const BASE_URL = '/writings';
const ADMIN_URL = '/admin/writings';

export const writingService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Writing>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Writing> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Writing>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  create: async (data: Partial<Writing>): Promise<Writing> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<Writing>): Promise<Writing> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<Writing> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },
};