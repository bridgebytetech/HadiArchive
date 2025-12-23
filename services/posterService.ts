// services/posterService.ts
import api, { apiRequest } from "@/lib/api";

export interface Poster {
  id: string;
  titleBn: string;
  titleEn?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  posterType: string;
  featured: boolean;
  published: boolean;
  createdAt: string;
}

export interface PosterPage {
  content: Poster[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const posterService = {
  // 🌏 পাবলিক এপিআই (মেইন পেজের জন্য)
  getPublicPosters: async (page = 0, size = 12): Promise<PosterPage> => {
    // এখানে /api/posters কল হবে (অ্যাডমিন নয়)
    return apiRequest(api.get(`/posters?page=${page}&size=${size}`));
  },

  getFeaturedPosters: async (): Promise<Poster[]> => {
    return apiRequest(api.get(`/posters/featured`));
  },

  // 🔐 অ্যাডমিন এপিআই (অ্যাডমিন প্যানেলের জন্য)
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/admin/posters?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/admin/posters/${id}`));
  },

  create: async (data: any): Promise<Poster> => {
    return apiRequest(api.post(`/admin/posters`, data));
  },

  update: async (id: string, data: any): Promise<Poster> => {
    return apiRequest(api.put(`/admin/posters/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`/admin/posters/${id}`));
  },

  togglePublish: async (id: string): Promise<Poster> => {
    return apiRequest(api.patch(`/admin/posters/${id}/publish`));
  },

  toggleFeatured: async (id: string): Promise<Poster> => {
    return apiRequest(api.patch(`/admin/posters/${id}/feature`));
  },
};
