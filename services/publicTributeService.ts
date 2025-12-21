import api, { apiRequest } from "@/lib/api";
import { PagedResponse, Tribute } from "@/types";

export const tributePublicService = {
  getAll: (page = 0): Promise<PagedResponse<Tribute>> =>
    apiRequest(api.get(`/tributes?page=${page}`)),

  getById: (id: string): Promise<Tribute> =>
    apiRequest(api.get(`/tributes/${id}`)),
};
