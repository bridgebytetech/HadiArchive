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
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('admin_token');
    
    // Debug log
    if (process.env.NODE_ENV === 'development') {
      console.log('📡 API Request:', config.url);
      console.log('🔑 Token exists:', !!token);
    }
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiResponse<null>>) => {
    console.error('❌ API Error:', {
      status: error.response?.status,
      url: error.config?.url,
      message: error.response?.data?.message || error.message,
    });

    if (error.response?.status === 401) {
      Cookies.remove('admin_token', { path: '/' });
      if (typeof window !== 'undefined' && 
          window.location.pathname.startsWith('/admin') &&
          !window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

// ✅ Fixed apiRequest function
export async function apiRequest<T>(
  promise: Promise<{ data: any }>
): Promise<T> {
  try {
    const response = await promise;
    
    // Debug
    console.log('📦 API Response:', response.data);
    
    // Handle different response formats
    if (response.data.success === true && response.data.data !== undefined) {
      return response.data.data as T;
    }
    
    if (response.data.success === false) {
      throw new Error(response.data.message || 'Request failed');
    }
    
    // Direct data return
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw error;
  }
}
