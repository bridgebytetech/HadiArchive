// services/posterService.ts
import api from "@/lib/api";

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

// Admin Poster Service
export const posterService = {
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    const response = await api.get(`/admin/posters?page=${page}&size=${size}`);
    return response.data;
  },

  getById: async (id: string): Promise<Poster> => {
    const response = await api.get(`/admin/posters/${id}`);
    return response.data;
  },

  create: async (data: PosterRequest): Promise<Poster> => {
    const response = await api.post(`/admin/posters`, data);
    return response.data;
  },

  update: async (id: string, data: PosterRequest): Promise<Poster> => {
    const response = await api.put(`/admin/posters/${id}`, data);
    return response.data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/admin/posters/${id}`);
  },

  togglePublish: async (id: string): Promise<Poster> => {
    const response = await api.patch(`/admin/posters/${id}/publish`);
    return response.data;
  },

  toggleFeatured: async (id: string): Promise<Poster> => {
    const response = await api.patch(`/admin/posters/${id}/feature`);
    return response.data;
  },
};
