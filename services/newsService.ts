import api, { apiRequest } from '@/lib/api';
import { NewsPress, PagedResponse } from '@/types';

const BASE_URL = '/news';
const ADMIN_URL = '/admin/news';

export const newsService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<NewsPress>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<NewsPress> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  getLatest: async (limit = 5): Promise<NewsPress[]> => {
    return apiRequest(api.get(`${BASE_URL}/latest?limit=${limit}`));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<NewsPress>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  create: async (data: Partial<NewsPress>): Promise<NewsPress> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<NewsPress>): Promise<NewsPress> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<NewsPress> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },
};