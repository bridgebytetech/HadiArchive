import api, { apiRequest } from '@/lib/api';
import { Video, VideoRequest, PagedResponse } from '@/types';

const BASE_URL = '/videos';
const ADMIN_URL = '/admin/videos';

export const videoService = {
  // ---------------------
  // Public APIs
  // ---------------------
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Video>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Video> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  getFeatured: async (limit = 4): Promise<Video[]> => {
    return apiRequest(api.get(`${BASE_URL}/featured?limit=${limit}`));
  },

  getLatest: async (limit = 8): Promise<Video[]> => {
    return apiRequest(api.get(`${BASE_URL}/latest?limit=${limit}`));
  },

  // ---------------------
  // Admin APIs
  // ---------------------
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Video>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  // ✅ adminGetById
  adminGetById: async (id: string): Promise<Video> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  create: async (data: VideoRequest): Promise<Video> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: VideoRequest): Promise<Video> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<Video> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },

  toggleFeatured: async (id: string): Promise<Video> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/feature`));
  },
};
