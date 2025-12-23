// services/posterService.ts
import api, { apiRequest } from "@/lib/api";

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
  createdAt: string;
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
  // ১. সব পোস্টার (এডমিন)
  getAll: async (page = 0, size = 12): Promise<PosterPage> => {
    return apiRequest(api.get(`/admin/posters?page=${page}&size=${size}`));
  },

  // ২. আইডি দিয়ে পোস্টার (এডিট পেজের জন্য প্রয়োজনীয়)
  getById: async (id: string): Promise<Poster> => {
    return apiRequest(api.get(`/admin/posters/${id}`));
  },

  // ৩. নতুন পোস্টার তৈরি
  create: async (data: PosterRequest): Promise<Poster> => {
    return apiRequest(api.post(`/admin/posters`, data));
  },

  // ৪. পোস্টার আপডেট
  update: async (id: string, data: PosterRequest): Promise<Poster> => {
    return apiRequest(api.put(`/admin/posters/${id}`, data));
  },

  // ৫. ডিলিট
  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`/admin/posters/${id}`));
  },

  // ৬. পাবলিশ স্ট্যাটাস পরিবর্তন
  togglePublish: async (id: string): Promise<Poster> => {
    return apiRequest(api.patch(`/admin/posters/${id}/publish`));
  },

  // ৭. ফিচারড স্ট্যাটাস পরিবর্তন
  toggleFeatured: async (id: string): Promise<Poster> => {
    return apiRequest(api.patch(`/admin/posters/${id}/feature`));
  },
};
