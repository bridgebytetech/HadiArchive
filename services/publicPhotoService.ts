import api, { apiRequest } from "@/lib/api";
import { PagedResponse, Photo } from "@/types";

export const publicPhotoService = {
  getAll: (page = 0, size = 20): Promise<PagedResponse<Photo>> =>
    apiRequest(api.get(`/photos?page=${page}&size=${size}`)),

  getFeatured: (limit = 8): Promise<Photo[]> =>
    apiRequest(api.get(`/photos/featured?limit=${limit}`)),
};
