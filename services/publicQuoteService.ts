import api, { apiRequest } from "@/lib/api";
import { Quote } from "@/types";

export const publicQuoteService = {
  getRandom: (): Promise<Quote> =>
    apiRequest(api.get(`/quotes/random`)),

  getFeatured: (): Promise<Quote> =>
    apiRequest(api.get(`/quotes/featured`)),
};
