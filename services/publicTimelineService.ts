// services/publicTimelineService.ts
import api, { apiRequest } from "@/lib/api";

// ✅ টাইপটি এখানেই ডিফাইন করে দিচ্ছি যাতে @/types এরর না দেয়
export interface TimelineItem {
  id: string;
  date: string;
  titleBn: string;
  titleEn?: string;
  descriptionBn: string;
  descriptionEn?: string;
  locationBn?: string;
  locationEn?: string;
  imageUrls?: string[];
  type: string;
  published: boolean;
}

export const publicTimelineService = {
  // ১. সব টাইমলাইন আইটেম লোড করা
  getAll: async (): Promise<TimelineItem[]> => {
    return apiRequest(api.get(`/timeline`));
  },

  // ২. নির্দিষ্ট আইডি দিয়ে লোড করা
  getById: async (id: string): Promise<TimelineItem> => {
    return apiRequest(api.get(`/timeline/${id}`));
  }
};
