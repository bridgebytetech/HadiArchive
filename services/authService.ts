// services/authService.ts
import api from '@/lib/api';
import { Admin, LoginResponse } from '@/types';
import Cookies from 'js-cookie';

const AUTH_URL = '/auth';

export const authService = {
  login: async (credentials: { username: string; password: string }): Promise<LoginResponse> => {
    try {
      const response = await api.post(`${AUTH_URL}/login`, {
        username: credentials.username,
        password: credentials.password
      });
      
      console.log('🔐 Login Response:', response.data);
      
      const data = response.data;
      
      let token = null;
      let admin = null;
      let tokenType = 'Bearer';
      let expiresIn = 604800;
      
      if (data.data?.token) {
        token = data.data.token;
        admin = data.data.admin;
        tokenType = data.data.tokenType || 'Bearer';
        expiresIn = data.data.expiresIn || 604800;
      } else if (data.token) {
        token = data.token;
        admin = data.admin;
        tokenType = data.tokenType || 'Bearer';
        expiresIn = data.expiresIn || 604800;
      }
      
      if (token) {
        // ✅ Cookie settings - Production এ secure: false দিয়ে test করো
        Cookies.set('admin_token', token, { 
          expires: 7,
          path: '/',
          // ✅ এই দুইটা line change করো
          secure: false,  // Production এও false রাখো আপাতত
          sameSite: 'lax',
          // domain না দিলে current domain এ save হবে
        });
        
        // ✅ Verify cookie saved হলো কিনা
        const savedToken = Cookies.get('admin_token');
        console.log('✅ Token saved:', savedToken ? 'YES' : 'NO');
        console.log('🍪 Cookie value:', savedToken?.substring(0, 30) + '...');
        
        if (!savedToken) {
          console.error('❌ Cookie save failed!');
        }
      } else {
        console.error('❌ No token in response');
        throw new Error('Login response এ token নেই');
      }
      
      return { token, admin, tokenType, expiresIn };
    } catch (error: any) {
      console.error('❌ Login Error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  },

  logout: () => {
    Cookies.remove('admin_token', { path: '/' });
  },

  getCurrentAdmin: async (): Promise<Admin> => {
    const response = await api.get(`${AUTH_URL}/me`);
    return response.data.data || response.data;
  },

  isAuthenticated: (): boolean => {
    return !!Cookies.get('admin_token');
  },
};
