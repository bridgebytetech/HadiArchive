// services/publicPosterService.ts
import api, { apiRequest } from "@/lib/api"; // ✅ apiRequest ইমপোর্ট করুন
import { Poster, PosterPage } from "./posterService";

export const publicPosterService = {
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    // ✅ সরাসরি return response.data এর বদলে apiRequest ব্যবহার করুন
    return apiRequest(api.get(`/posters?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/posters/${id}`));
  },

  getFeatured: async (): Promise<Poster[]> => {
    return apiRequest(api.get(`/posters/featured`));
  },

  getByType: async (type: string, page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters/type/${type}?page=${page}&size=${size}`));
  },

  trackDownload: async (id: string): Promise<void> => {
    return apiRequest(api.post(`/posters/${id}/download`));
  },
};
