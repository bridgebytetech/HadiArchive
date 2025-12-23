// services/publicPosterService.ts
import api from "@/lib/api";
import { Poster, PosterPage } from "./posterService";

// Public Poster Service
export const publicPosterService = {
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    const response = await api.get(`/posters?page=${page}&size=${size}`);
    return response.data;
  },

  getById: async (id: string): Promise<Poster> => {
    const response = await api.get(`/posters/${id}`);
    return response.data;
  },

  getFeatured: async (): Promise<Poster[]> => {
    const response = await api.get(`/posters/featured`);
    return response.data;
  },

  getByType: async (type: string, page = 0, size = 12): Promise<PosterPage> => {
    const response = await api.get(`/posters/type/${type}?page=${page}&size=${size}`);
    return response.data;
  },

  trackDownload: async (id: string): Promise<void> => {
    await api.post(`/posters/${id}/download`);
  },
};
