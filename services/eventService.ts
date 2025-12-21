import api, { apiRequest } from '@/lib/api';
import { SpecialEvent, EventPhoto, EventVideo, PagedResponse } from '@/types';

const BASE_URL = '/events';
const ADMIN_URL = '/admin/events';

export const eventService = {
  // Public APIs
  getAll: async (page = 0, size = 20): Promise<PagedResponse<SpecialEvent>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=${size}`));
  },

  getById: async (id: string): Promise<SpecialEvent> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  getByType: async (type: string, page = 0, size = 20): Promise<PagedResponse<SpecialEvent>> => {
    return apiRequest(api.get(`${BASE_URL}?type=${type}&page=${page}&size=${size}`));
  },

  getFeatured: async (limit = 4): Promise<SpecialEvent[]> => {
    return apiRequest(api.get(`${BASE_URL}/featured?limit=${limit}`));
  },

  // Admin APIs
  adminGetAll: async (page = 0, size = 20): Promise<PagedResponse<SpecialEvent>> => {
    return apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`));
  },

  adminGetById: async (id: string): Promise<SpecialEvent> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  create: async (data: Partial<SpecialEvent>): Promise<SpecialEvent> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<SpecialEvent>): Promise<SpecialEvent> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<SpecialEvent> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },

  toggleFeatured: async (id: string): Promise<SpecialEvent> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/feature`));
  },

  addPhotos: async (id: string, photos: EventPhoto[]): Promise<SpecialEvent> => {
    return apiRequest(api.post(`${ADMIN_URL}/${id}/photos`, photos));
  },

  addVideos: async (id: string, videos: EventVideo[]): Promise<SpecialEvent> => {
    return apiRequest(api.post(`${ADMIN_URL}/${id}/videos`, videos));
  },
};