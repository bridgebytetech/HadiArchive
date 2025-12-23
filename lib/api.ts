// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/types';

// ✅ Helper function to get token
const getToken = (): string | null => {
  // First try cookie
  const cookieToken = Cookies.get('admin_token');
  if (cookieToken) return cookieToken;
  
  // Then try localStorage
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      return parsed?.state?.token || null;
    }
  } catch (e) {
    console.error('Error reading from localStorage:', e);
  }
  
  return null;
};

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
    const token = getToken();
    
    console.log('🔑 Token Check:', token ? `Found: ${token.substring(0, 20)}...` : '❌ NOT FOUND');
    
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

    if (error.response?.status === 401 || 
        (error.response?.status === 400 && error.response?.data?.message === 'Access Denied')) {
      // Clear both cookie and localStorage
      Cookies.remove('admin_token', { path: '/' });
      try {
        localStorage.removeItem('auth-storage');
      } catch (e) {}
      
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
