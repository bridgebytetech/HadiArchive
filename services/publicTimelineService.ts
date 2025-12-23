import api, { apiRequest } from "@/lib/api";
import { TimelineItem } from "@/types";

export const publicTimelineService = {
  getAll: (): Promise<TimelineItem[]> =>
    apiRequest(api.get(`/timeline`)),
};
