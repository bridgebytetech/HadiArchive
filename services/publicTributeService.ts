import api, { apiRequest } from "@/lib/api";
import { PagedResponse, Tribute } from "@/types";

const BASE_URL = '/tributes';

export const tributePublicService = {
  // এখন শুধু অনুমোদিত tribute গুলোই public লিস্টে আসবে
  getAll: (page = 0): Promise<PagedResponse<Tribute>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=12&status=APPROVED`));
  },

  // সিঙ্গেল tribute দেখানোর জন্য endpoint
  getById: (id: string): Promise<Tribute> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },
};
