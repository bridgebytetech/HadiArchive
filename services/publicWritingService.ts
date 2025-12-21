import api, { apiRequest } from "@/lib/api";
import { PagedResponse, Writing } from "@/types";

export const writingPublicService = {
  getAll: (page = 0): Promise<PagedResponse<Writing>> =>
    apiRequest(api.get(`/writings?page=${page}`)),

  getById: (id: string): Promise<Writing> =>
    apiRequest(api.get(`/writings/${id}`)),
};
