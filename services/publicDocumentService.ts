import api, { apiRequest } from "@/lib/api";
import { DocDocument, PagedResponse } from "@/types";

export const docPublicService = {
  getAll: (page = 0, size = 12): Promise<PagedResponse<DocDocument>> =>
    apiRequest(api.get(`/documents?page=${page}&size=${size}`)),
};