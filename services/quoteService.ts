import api, { apiRequest } from '@/lib/api';
import { Quote, PagedResponse } from '@/types';

const BASE_URL = '/quotes';
const ADMIN_URL = '/admin/quotes';

export const quoteService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Quote>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getRandom: async (): Promise<Quote> => {
    return apiRequest(api.get(`${BASE_URL}/random`));
  },

  getFeatured: async (): Promise<Quote> => {
    return apiRequest(api.get(`${BASE_URL}/featured`));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Quote>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  create: async (data: Partial<Quote>): Promise<Quote> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<Quote>): Promise<Quote> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<Quote> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },
};