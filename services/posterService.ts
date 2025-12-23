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
}

export interface PosterPage {
  content: Poster[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export const posterService = {
  // অ্যাডমিন প্যানেলের মেথডগুলো এখানে থাকবে (getAll, create, update, delete)
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/admin/posters?page=${page}&size=${size}`));
  },
  // ... বাকি অ্যাডমিন মেথড ...
  togglePublish: (id: string) => apiRequest(api.patch(`/admin/posters/${id}/publish`)),
  toggleFeatured: (id: string) => apiRequest(api.patch(`/admin/posters/${id}/feature`)),
  delete: (id: string) => apiRequest(api.delete(`/admin/posters/${id}`)),
};
