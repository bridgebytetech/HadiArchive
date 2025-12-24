// services/publicQuoteService.ts
import api, { apiRequest } from "@/lib/api";
import { Quote, PagedResponse } from "@/types";

export const publicQuoteService = {
  // ১. ফিচারড উক্তি
  getFeatured: (): Promise<Quote[]> =>
    apiRequest(api.get(`/quotes/featured`)),

  // ২. সব উক্তি
  getAll: (page = 0, size = 12): Promise<PagedResponse<Quote>> =>
    apiRequest(api.get(`/quotes?page=${page}&size=${size}`)),
};
