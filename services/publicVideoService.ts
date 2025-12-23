import api, { apiRequest } from "@/lib/api";
import { Video, PagedResponse } from "@/types";

export const publicVideoService = {
  getAll: (page = 0, size = 12): Promise<PagedResponse<Video>> =>
    apiRequest(api.get(`/videos?page=${page}&size=${size}`)),

  getLatest: (limit = 8): Promise<Video[]> =>
    apiRequest(api.get(`/videos/latest?limit=${limit}`)),

  getFeatured: (limit = 4): Promise<Video[]> =>
    apiRequest(api.get(`/videos/featured?limit=${limit}`)),
};
