// services/posterService.ts
import api, { apiRequest } from "@/lib/api";

// ✅ অবশ্যই 'export' কি-ওয়ার্ড থাকতে হবে
export interface Poster {
  id: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  posterType: string;
  designer?: string;
  source?: string;
  tags?: string[];
  category?: string;
  featured: boolean;
  published: boolean;
  viewCount?: number;
  downloadCount?: number;
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PosterRequest {
  titleBn: string;
  titleEn?: string;
  descriptionBn?: string;
  descriptionEn?: string;
  imageUrl: string;
  thumbnailUrl?: string;
  posterType: string;
  designer?: string;
  source?: string;
  tags?: string[];
  category?: string;
  featured?: boolean;
  published?: boolean;
}

export interface PosterPage {
  content: Poster[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

export const posterService = {
  // 🌏 Public APIs (মেইন পেজের জন্য)
  getPublicPosters: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters?page=${page}&size=${size}`));
  },

  getFeatured: async (): Promise<Poster[]> => {
    return apiRequest(api.get(`/posters/featured`));
  },

  // 🔐 Admin APIs (এডমিন প্যানেলের জন্য)
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/admin/posters?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/admin/posters/${id}`));
  },

  create: async (data: PosterRequest): Promise<Poster> => {
    return apiRequest(api.post(`/admin/posters`, data));
  },

  update: async (id: string, data: PosterRequest): Promise<Poster> => {
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
