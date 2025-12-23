// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.hadiarchive.com/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = Cookies.get('admin_token');
  if (token && config.headers) config.headers['Authorization'] = `Bearer ${token}`;
  return config;
});

export default api;

export async function apiRequest<T>(promise: Promise<{ data: any }>): Promise<T> {
  try {
    const response = await promise;
    // এপিআই থেকে { success: true, data: [...] } আসলে শুধু data অংশটুকু রিটার্ন করবে
    if (response.data && response.data.success === true) {
      return response.data.data as T;
    }
    return response.data as T;
  } catch (error: any) {
    const message = error.response?.data?.message || error.message;
    throw new Error(message);
  }
}
