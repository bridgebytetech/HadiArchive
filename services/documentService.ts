import api, { apiRequest } from "@/lib/api";
import { DocDocument, PagedResponse } from "@/types";

const ADMIN_URL = "/admin/documents";

export const docService = {
  adminGetAll: (page = 0, size = 20): Promise<PagedResponse<DocDocument>> =>
    apiRequest(api.get(`${ADMIN_URL}?page=${page}&size=${size}`)),

  adminGetById: (id: string): Promise<DocDocument> =>
    apiRequest(api.get(`${ADMIN_URL}/${id}`)),

  create: (payload: Partial<DocDocument>): Promise<DocDocument> =>
    apiRequest(api.post(ADMIN_URL, payload)),

  update: (id: string, payload: Partial<DocDocument>): Promise<DocDocument> =>
    apiRequest(api.put(`${ADMIN_URL}/${id}`, payload)),

  delete: (id: string): Promise<void> => apiRequest(api.delete(`${ADMIN_URL}/${id}`)),

  togglePublish: (id: string): Promise<DocDocument> =>
    apiRequest(api.patch(`${ADMIN_URL}/${id}/publish`)),
};