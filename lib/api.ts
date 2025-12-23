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
    // ✅ সরাসরি Cookies.get() ব্যবহার করো
    let token = Cookies.get('admin_token');
    
    // Cookie তে না থাকলে localStorage থেকে নাও
    if (!token && typeof window !== 'undefined') {
      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          token = parsed?.state?.token || null;
        }
      } catch (e) {
        console.error('Error reading localStorage:', e);
      }
    }
    
    console.log('📡 API Request:', config.url);
    console.log('🔑 Token found:', token ? 'YES' : 'NO');
    
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
      console.log('✅ Authorization header set');
    } else {
      console.warn('⚠️ No token - request will fail');
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

    // শুধু 401 এ logout করো
    if (error.response?.status === 401) {
      Cookies.remove('admin_token', { path: '/' });
      if (typeof window !== 'undefined') {
        try { localStorage.removeItem('auth-storage'); } catch (e) {}
        if (window.location.pathname.startsWith('/admin') &&
            !window.location.pathname.includes('/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
    
    return Promise.reject(error);
  }
);

export default api;

// apiRequest function
export async function apiRequest<T>(
  promise: Promise<{ data: any }>
): Promise<T> {
  try {
    const response = await promise;
    
    if (response.data?.success === true && response.data?.data !== undefined) {
      return response.data.data as T;
    }
    
    if (response.data?.success === false) {
      throw new Error(response.data.message || 'Request failed');
    }
    
    return response.data as T;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const message = error.response?.data?.message || error.message;
      throw new Error(message);
    }
    throw error;
  }
}
