// services/authService.ts
import api from '@/lib/api';
import { Admin, LoginResponse } from '@/types';
import Cookies from 'js-cookie';

const AUTH_URL = '/auth';

export const authService = {
  login: async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
    try {
      // ✅ সরাসরি api.post ব্যবহার করো - apiRequest নয়
      const response = await api.post(`${AUTH_URL}/login`, {
        username: credentials.username,
        password: credentials.password
      });
      
      // ✅ Debug log
      console.log('🔐 Login Response:', response.data);
      
      // ✅ Response structure check করো
      const data = response.data;
      
      // Backend response format অনুযায়ী adjust করো
      // Format 1: { success: true, data: { token: "...", admin: {...} } }
      // Format 2: { token: "...", admin: {...} }
      // Format 3: { success: true, token: "...", admin: {...} }
      
      let token = null;
      let admin = null;
      
      if (data.data?.token) {
        // Format 1
        token = data.data.token;
        admin = data.data.admin;
      } else if (data.token) {
        // Format 2 or 3
        token = data.token;
        admin = data.admin;
      }
      
      if (token) {
        Cookies.set('admin_token', token, { 
          expires: 7, 
          path: '/',
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'lax'
        });
        console.log('✅ Token saved to cookie');
      } else {
        console.error('❌ No token in response');
        throw new Error('Login response এ token নেই');
      }
      
      return { token, admin };
    } catch (error: any) {
      console.error('❌ Login Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    Cookies.remove('admin_token', { path: '/' });
    console.log('🚪 Logged out, token removed');
  },

  getCurrentAdmin: async (): Promise<Admin> => {
    const response = await api.get(`${AUTH_URL}/me`);
    return response.data.data || response.data;
  },

  isAuthenticated: (): boolean => {
    const hasToken = !!Cookies.get('admin_token');
    console.log('🔑 Is Authenticated:', hasToken);
    return hasToken;
  },
};
