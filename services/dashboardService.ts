import api, { apiRequest } from '@/lib/api';
import { DashboardStats } from '@/types';

const ADMIN_URL = '/admin/dashboard';

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    return apiRequest(api.get(`${ADMIN_URL}/stats`));
  },
};