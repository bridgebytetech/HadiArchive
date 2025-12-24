// services/publicQuoteService.ts
import api, { apiRequest } from "@/lib/api";
import { Quote, PagedResponse } from "@/types";

export const publicQuoteService = {
  // ১. সব উক্তি লোড করা (পাবলিক)
  getAll: (page = 0, size = 12): Promise<PagedResponse<Quote>> =>
    apiRequest(api.get(`/quotes?page=${page}&size=${size}`)),

  // ২. র‍্যান্ডম একটি উক্তি (হোমপেজ হিরো সেকশনের জন্য ভালো)
  getRandom: (): Promise<Quote> =>
    apiRequest(api.get(`/quotes/random`)),

  // ৩. ফিচারড উক্তিগুলো (হোমপেজ গ্রিডের জন্য)
  getFeatured: (): Promise<Quote[]> =>
    apiRequest(api.get(`/quotes/featured`)),
};
