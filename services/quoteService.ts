// services/quoteService.ts
import api, { apiRequest } from '@/lib/api';
import { Quote, PagedResponse } from '@/types';

const BASE_URL = '/quotes';
const ADMIN_URL = '/admin/quotes';

export const quoteService = {
  // ---------------------
  // 🌏 Public APIs (মেইন পেজ ও গ্যালারি)
  // ---------------------
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Quote>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getRandom: async (): Promise<Quote> => {
    return apiRequest(api.get(`${BASE_URL}/random`));
  },

  getFeatured: async (): Promise<Quote[]> => {
    return apiRequest(api.get(`${BASE_URL}/featured`));
  },

  getById: async (id: string): Promise<Quote> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  // ---------------------
  // 🔐 Admin APIs (এডমিন প্যানেল)
  // ---------------------
  
  // ✅ মেথডটির নাম 'adminGetAll' করা হলো যাতে বিল্ড এরর না দেয়
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Quote>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  // ✅ এডিট পেজের জন্য এটি জরুরি
  adminGetById: async (id: string): Promise<Quote> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
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

  toggleFeatured: async (id: string): Promise<Quote> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/feature`));
  },
};
