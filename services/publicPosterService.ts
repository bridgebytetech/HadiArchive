import api, { apiRequest } from "@/lib/api";
import { Poster, PosterPage } from "./posterService";

export const publicPosterService = {
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    // এখানে apiRequest ব্যবহার করলে {success: true, data: ...} থেকে শুধু ডাটাটুকু বের হবে
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
  }
};
