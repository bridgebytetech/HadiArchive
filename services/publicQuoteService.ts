// services/publicQuoteService.ts
import api, { apiRequest } from "@/lib/api";
import { Quote, PagedResponse } from "@/types";

export const publicQuoteService = {
  // ১. ফিচারড উক্তিগুলো নিয়ে আসার জন্য সাইজ বাড়িয়ে দিন (যেমন ১০)
  getFeatured: (): Promise<Quote[]> =>
    apiRequest(api.get(`/quotes/featured?size=10`)),

  // ২. সব উক্তি
  getAll: (page = 0, size = 12): Promise<PagedResponse<Quote>> =>
    apiRequest(api.get(`/quotes?page=${page}&size=${size}`)),
};
