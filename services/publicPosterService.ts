// services/publicPosterService.ts
import api, { apiRequest } from "@/lib/api";
import { Poster, PosterPage } from "./posterService";

export const publicPosterService = {
  // ১. সব পোস্টার লোড করা
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters?page=${page}&size=${size}`));
  },

  // ২. আইডি দিয়ে পোস্টার লোড করা
  getById: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/posters/${id}`));
  },

  // ৩. ফিচারড পোস্টার লোড করা
  getFeatured: async (): Promise<Poster[]> => {
    return apiRequest(api.get(`/posters/featured`));
  },

  // ৪. টাইপ অনুযায়ী পোস্টার লোড করা
  getByType: async (type: string, page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters/type/${type}?page=${page}&size=${size}`));
  },

  // ✅ ৫. ডাউনলোড ট্র্যাক করা (এই মেথডটি মিসিং ছিল)
  trackDownload: async (id: string): Promise<void> => {
    return apiRequest(api.post(`/posters/${id}/download`));
  },
};
