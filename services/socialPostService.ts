import api, { apiRequest } from "@/lib/api";
import { PagedResponse, SocialPost } from "@/types";

const ADMIN_URL = "/admin/social-posts";

export const socialPostService = {
  adminGetAll: (page = 0, size = 20): Promise<PagedResponse<SocialPost>> =>
    apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`)),

  adminGetById: (id: string): Promise<SocialPost> =>
    apiRequest(api.get(`${ADMIN_URL}/${id}`)),

  create: (payload: Partial<SocialPost>): Promise<SocialPost> =>
    apiRequest(api.post(ADMIN_URL, payload)),

  update: (id: string, payload: Partial<SocialPost>): Promise<SocialPost> =>
    apiRequest(api.put(`${ADMIN_URL}/${id}`, payload)),

  delete: (id: string): Promise<void> => apiRequest(api.delete(`${ADMIN_URL}/${id}`)),

  togglePublish: (id: string): Promise<SocialPost> =>
    apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`)),
};