// services/posterService.ts
import api, { apiRequest } from "@/lib/api";
import { Poster, PosterPage, PosterRequest } from "@/types";

export const posterService = {
  // 🌏 Public Methods (মেইন পেজের জন্য - /api/posters)
  getPublicPosters: async (page = 0, size = 6): Promise<PosterPage> => {
    // এখানে /admin নেই, এটি পাবলিক এপিআই কল করবে
    return apiRequest(api.get(`/posters?page=${page}&size=${size}`));
  },

  getFeatured: async (): Promise<Poster[]> => {
    return apiRequest(api.get(`/posters/featured`));
  },

  // 🔐 Admin Methods (এডমিন প্যানেলের জন্য - /api/admin/posters)
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/admin/posters?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/admin/posters/${id}`));
  },

  create: async (data: PosterRequest) => apiRequest(api.post(`/admin/posters`, data)),
  update: async (id: string, data: PosterRequest) => apiRequest(api.put(`/admin/posters/${id}`, data)),
  delete: async (id: string) => apiRequest(api.delete(`/admin/posters/${id}`)),
  togglePublish: async (id: string) => apiRequest(api.patch(`/admin/posters/${id}/publish`)),
  toggleFeatured: async (id: string) => apiRequest(api.patch(`/admin/posters/${id}/feature`)),
};
