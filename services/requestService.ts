import api, { apiRequest } from '@/lib/api';
import { PublicRequest, PublicRequestForm, PagedResponse } from '@/types';

const BASE_URL = '/requests';
const ADMIN_URL = '/admin/requests';

export const requestService = {
  // Public Submit
  submit: async (data: PublicRequestForm): Promise<PublicRequest> => {
    return apiRequest(api.post(BASE_URL, data));
  },

  // Admin APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<PublicRequest>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  getPending: async (page = 0, size = 20): Promise<PagedResponse<PublicRequest>> => {
    return apiRequest(api.get(`${ADMIN_URL}/pending?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<PublicRequest> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  updateStatus: async (id: string, status: string, notes?: string): Promise<PublicRequest> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/status?status=${status}&notes=${notes || ''}`));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },
};