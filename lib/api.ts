// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/types';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.hadiarchive.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // ✅ CORS এর জন্য
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('admin_token');
    
    // ✅ Debug log (production এ remove করো)
    if (process.env.NODE_ENV === 'development') {
      console.log('🔑 Token:', token ? 'Found' : 'Missing');
      console.log('📡 Request URL:', config.url);
    }
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<null>>) => {
    // ✅ Better error logging
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
    }

    if (error.response?.status === 401) {
      Cookies.remove('admin_token');
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    
    // ✅ 400 error এর জন্য specific handling
    if (error.response?.status === 400) {
      console.error('⚠️ Bad Request - Check if token exists:', !!Cookies.get('admin_token'));
    }
    
    return Promise.reject(error);
  }
);

export default api;

// Helper function
export async function apiRequest<T>(
  promise: Promise<{ data: ApiResponse<T> }>
): Promise<T> {
  try {
    const response = await promise;
    if (response.data.success) {
      return response.data.data;
    }
    throw new Error(response.data.message || 'Something went wrong');
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw error;
  }
}
