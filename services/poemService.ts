import api, { apiRequest } from '@/lib/api';
import { Poem, PagedResponse } from '@/types';

const BASE_URL = '/poems';
const ADMIN_URL = '/admin/poems';

export const poemService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Poem>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Poem> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  getFeatured: async (limit = 4): Promise<Poem[]> => {
    return apiRequest(api.get(`${BASE_URL}/featured?limit=${limit}`));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Poem>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  create: async (data: Partial<Poem>): Promise<Poem> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<Poem>): Promise<Poem> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<Poem> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },

  toggleFeatured: async (id: string): Promise<Poem> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/feature`));
  },
};