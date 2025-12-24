// services/quoteService.ts (ফ্রন্টএন্ড সম্পূর্ণ আপডেট)
import api, { apiRequest } from '@/lib/api';
import { Quote, PagedResponse } from '@/types';

const ADMIN_URL = '/admin/quotes';

export const quoteService = {
  // ১. সব উক্তি (এডমিন প্যানেল)
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Quote>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  // ২. আইডি দিয়ে উক্তি (এডিট পেজের জন্য)
  adminGetById: async (id: string): Promise<Quote> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  // ৩. নতুন তৈরি
  create: async (data: Partial<Quote>): Promise<Quote> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  // ৪. আপডেট
  update: async (id: string, data: Partial<Quote>): Promise<Quote> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  // ৫. ডিলিট
  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  // ৬. স্ট্যাটাস পরিবর্তন
  togglePublish: async (id: string): Promise<Quote> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },

  toggleFeatured: async (id: string): Promise<Quote> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/feature`));
  },
};
