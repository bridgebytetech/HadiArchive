// services/publicNewsService.ts
import api, { apiRequest } from "@/lib/api";
import { NewsPress, PagedResponse } from "@/types";

export const publicNewsService = {
  // ১. সব নিউজ লোড করা
  getAll: (page = 0, size = 6): Promise<PagedResponse<NewsPress>> =>
    apiRequest(api.get(`/news?page=${page}&size=${size}`)),

  // ২. আইডি দিয়ে নিউজ দেখা
  getById: (id: string): Promise<NewsPress> =>
    apiRequest(api.get(`/news/${id}`)),
};
