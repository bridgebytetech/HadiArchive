// services/posterService.ts
import api, { apiRequest } from "@/lib/api";

/**
 * ১. Poster Interface (অবশ্যই export করতে হবে)
 */
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

/**
 * ২. Request Interface
 */
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

/**
 * ৩. Pagination Interface
 */
export interface PosterPage {
  content: Poster[];
  totalElements: number;
  totalPages: number;
  page: number;
  size: number;
  first: boolean;
  last: boolean;
}

/**
 * ৪. Poster Service Object
 */
export const posterService = {
  // 🌏 পাবলিক এপিআই (মেইন পেজ ও গ্যালারির জন্য)
  // এটি কল করে: /api/posters
  getPublicPosters: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters?page=${page}&size=${size}`));
  },

  getByIdPublic: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/posters/${id}`));
  },

  getFeatured: async (): Promise<Poster[]> => {
    return apiRequest(api.get(`/posters/featured`));
  },

  getByTypePublic: async (type: string, page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/posters/type/${type}?page=${page}&size=${size}`));
  },

  trackDownload: async (id: string): Promise<void> => {
    return apiRequest(api.post(`/posters/${id}/download`));
  },

  // 🔐 এডমিন এপিআই (শুধুমাত্র এডমিন প্যানেলের জন্য)
  // এটি কল করে: /api/admin/posters
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
