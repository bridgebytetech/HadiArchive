import api, { apiRequest } from "@/lib/api";
import { PagedResponse, Poem } from "@/types";

export const poemPublicService = {
  getAll: (page = 0): Promise<PagedResponse<Poem>> =>
    apiRequest(api.get(`/poems?page=${page}`)),

  getById: (id: string): Promise<Poem> =>
    apiRequest(api.get(`/poems/${id}`)),
};
