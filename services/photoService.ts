import api, { apiRequest } from '@/lib/api';
import { Photo, PhotoRequest, PagedResponse } from '@/types';

const BASE_URL = '/photos';
const ADMIN_URL = '/admin/photos';

export const photoService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<Photo>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<Photo> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  getByType: async (type: string, page = 0, size = 20): Promise<PagedResponse<Photo>> => {
    return apiRequest(api.get(`${BASE_URL}?type=${type}&page=${page}&size=${size}`));
  },

  getFeatured: async (limit = 8): Promise<Photo[]> => {
    return apiRequest(api.get(`${BASE_URL}/featured?limit=${limit}`));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<Photo>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  adminGetById: async (id: string): Promise<Photo> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  create: async (data: PhotoRequest): Promise<Photo> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: PhotoRequest): Promise<Photo> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<Photo> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },
};