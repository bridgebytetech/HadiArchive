import api, { apiRequest } from '@/lib/api';
import { TimelineEvent } from '@/types';

const BASE_URL = '/timeline';
const ADMIN_URL = '/admin/timeline';

export const timelineService = {
  // Public APIs
  getAll: async (): Promise<TimelineEvent[]> => {
    return apiRequest(api.get(BASE_URL));
  },

  getById: async (id: string): Promise<TimelineEvent> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },

  // Admin APIs
  adminGetAll: async (): Promise<TimelineEvent[]> => {
    return apiRequest(api.get(ADMIN_URL));
  },

  adminGetById: async (id: string): Promise<TimelineEvent> => {
    return apiRequest(api.get(`${ADMIN_URL}/${id}`));
  },

  create: async (data: Partial<TimelineEvent>): Promise<TimelineEvent> => {
    return apiRequest(api.post(ADMIN_URL, data));
  },

  update: async (id: string, data: Partial<TimelineEvent>): Promise<TimelineEvent> => {
    return apiRequest(api.put(`${ADMIN_URL}/${id}`, data));
  },

  delete: async (id: string): Promise<void> => {
    return apiRequest(api.delete(`${ADMIN_URL}/${id}`));
  },

  togglePublish: async (id: string): Promise<TimelineEvent> => {
    return apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`));
  },

  reorder: async (ids: string[]): Promise<string> => {
    return apiRequest(api.patch(`${ADMIN_URL}/reorder`, ids));
  },
};