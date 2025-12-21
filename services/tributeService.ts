import api, { apiRequest } from '@/lib/api';
import { Tribute, TributeRequest, PagedResponse } from '@/types';

const BASE_URL = '/tributes';
const ADMIN_URL = '/admin/tributes';

export const tributeService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Tribute>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Tribute> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  getFeatured: async (limit = 4): Promise<Tribute[]> => {
    return apiRequest(api.get(`${BASE_URL}/featured?limit=${limit}`));
  },

  // Public Submit
  submit: async (data: TributeRequest): Promise<Tribute> => {
    return apiRequest(api.post(BASE_URL, data));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Tribute>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  getPending: async (page = 0, size = 20): Promise<PagedResponse<Tribute>> => {
    return apiRequest(api.get(`${ADMIN_URL}/pending?page=${page}&size=${size}`));
  },

  adminGetById: async (id: string): Promise<Tribute> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  approve: async (id: string): Promise<Tribute> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/approve`));
  },

  reject: async (id: string, reason?: string): Promise<Tribute> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/reject?reason=${reason || ''}`));
  },

  toggleFeatured: async (id: string): Promise<Tribute> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/feature`));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },
};