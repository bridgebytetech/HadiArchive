// services/publicTributeService.ts
import api, { apiRequest } from "@/lib/api";
import { PagedResponse, Tribute } from "@/types";

const BASE_URL = '/tributes';

export const tributePublicService = {
  // এই ফাংশনে status=APPROVED ফিল্টার যোগ করুন
  getAll: (page = 0): Promise<PagedResponse<Tribute>> => {
    return apiRequest(api.get(`${BASE_URL}?page=${page}&size=12&status=APPROVED`));
  },

  getById: (id: string): Promise<Tribute> => {
    return apiRequest(api.get(`${BASE_URL}/${id}`));
  },
};
