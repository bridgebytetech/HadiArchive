import api, { apiRequest } from "@/lib/api";
import { PagedResponse, SocialPost } from "@/types";

export const socialPostPublicService = {
  getAll: (page = 0, size = 12): Promise<PagedResponse<SocialPost>> =>
    apiRequest(api.get(`/social-posts?page=${page}&size=${size}`)),
};