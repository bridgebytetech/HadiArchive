// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/types';

// Helper function to get token from cookie or localStorage
const getToken = (): string | null => {
  // First try cookie
  const cookieToken = Cookies.get('admin_token');
  if (cookieToken) return cookieToken;
  
  // Then try localStorage
  if (typeof window !== 'undefined') {
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        const parsed = JSON.parse(authStorage);
        return parsed?.state?.token || null;
      }
    } catch (e) {
      console.error('Error reading from localStorage:', e);
    }
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
      Cookies.remove('admin_token', { path: '/' });
      if (typeof window !== 'undefined') {
        try {
          localStorage.removeItem('auth-storage');
        } catch (e) {}
      }
      
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

// ✅ apiRequest function - এটা export করতে হবে
export async function apiRequest<T>(
  promise: Promise<{ data: any }>
): Promise<T> {
  try {
    const response = await promise;
    
    // Handle different response formats
    if (response.data?.success === true && response.data?.data !== undefined) {
      return response.data.data as T;
    }
    
    if (response.data?.success === false) {
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
