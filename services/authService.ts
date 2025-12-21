import api, { apiRequest } from '@/lib/api';
import { Admin, LoginResponse } from '@/types';
import Cookies from 'js-cookie';

const AUTH_URL = '/auth';

export const authService = {
  login: async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
    // এখানে সরাসরি অবজেক্ট পাঠিয়ে নিশ্চিত করছি কি (key) এর নাম 'username'
    const response = await apiRequest<LoginResponse>(
      api.post(`${AUTH_URL}/login`, {
        username: credentials.username, // ব্যাকএন্ড এই নামটাই খুঁজছে
        password: credentials.password
      })
    );
    
    if (response.token) {
      Cookies.set('admin_token', response.token, { expires: 7, path: '/' });
    }
    
    return response;
  },

  logout: () => {
    Cookies.remove('admin_token', { path: '/' });
  },

  getCurrentAdmin: async (): Promise<Admin> => {
    return apiRequest(api.get(`${AUTH_URL}/me`));
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get('admin_token');
  },
};