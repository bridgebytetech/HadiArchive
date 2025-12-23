// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { ApiResponse } from '@/types';

// ✅ সরাসরি Full API URL দিন - Rewrite bypass
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.hadiarchive.com/api',  // ✅ এখানে পরিবর্তন
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = Cookies.get('admin_token');
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
    if (error.response?.status === 401) {
      Cookies.remove('admin_token');
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

// Helper function to handle API responses
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
