// services/publicPosterService.ts
import api, { apiRequest } from "@/lib/api";
import { Poster, PosterPage } from "./posterService";

export const publicPosterService = {
  // সব পাবলিক পোস্টার
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters?page=${page}&size=${size}`));
  },

  // আইডি দিয়ে পাবলিক পোস্টার
  getById: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/posters/${id}`));
  },

  // ফিচারড পোস্টার (হোমপেজ)
  getFeatured: async (): Promise<Poster[]> => {
    return apiRequest(api.get(`/posters/featured`));
  },

  // টাইপ অনুযায়ী ফিল্টার
  getByType: async (type: string, page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters/type/${type}?page=${page}&size=${size}`));
  },

  // ডাউনলোড ট্র্যাক
  trackDownload: async (id: string): Promise<void> => {
    return apiRequest(api.post(`/posters/${id}/download`));
  },
};
