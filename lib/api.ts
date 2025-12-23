// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

/**
 * ১. এপিআই ইন্সট্যান্স তৈরি
 */
const api: AxiosInstance = axios.create({
  baseURL: 'https://api.hadiarchive.com/api',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * ২. রিকোয়েস্ট ইন্টারসেপ্টর
 * ভিজিটরদের (Public) জন্য এটি টোকেন ছাড়াই কাজ করবে।
 * এডমিনদের জন্য এটি কুকি বা লোকাল স্টোরেজ থেকে টোকেন নিয়ে অটোমেটিক পাঠাবে।
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token = Cookies.get('admin_token');

    // যদি কুকিতে না থাকে, তবে লোকাল স্টোরেজ (Zustand) থেকে খুঁজি যাতে সেশন না হারায়
    if (!token && typeof window !== 'undefined') {
      try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
          const parsed = JSON.parse(authStorage);
          token = parsed?.state?.token || null;
        }
      } catch (e) {
        // Parsing error ইগনোর করি
      }
    }

    // শুধুমাত্র টোকেন থাকলে Authorization হেডার যোগ হবে
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ৩. রেসপন্স ইন্টারসেপ্টর
 * এপিআই থেকে টোকেন এক্সপায়ার এরর (401) আসলে এডমিনকে লগআউট করবে।
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // যদি ৪০১ (Unauthorized) আসে এবং ইউজার এডমিন প্যানেলে থাকে
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined' && window.location.pathname.startsWith('/admin')) {
        Cookies.remove('admin_token', { path: '/' });
        localStorage.removeItem('auth-storage');
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/admin/login';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;

/**
 * ৪. apiRequest ফাংশন (সবচেয়ে গুরুত্বপূর্ণ)
 * এটি মেইন পেজের 'TypeError: map is not a function' এররটি ঠিক করবে।
 * ব্যাকএন্ড থেকে আসা { success: true, data: [...] } থেকে শুধু আসল ডাটাটুকু বের করে দিবে।
 */
export async function apiRequest<T>(
  promise: Promise<{ data: any }>
): Promise<T> {
  try {
    const response = await promise;
    const resData = response.data;

    // ব্যাকএন্ডের পাঠানো অবজেক্টটি ভেঙ্গে ডাটা অংশটুকু নেওয়া
    if (resData && typeof resData === 'object' && 'success' in resData) {
      if (resData.success === true) {
        return resData.data as T; // শুধু কাজের ডাটা (যেমন অ্যারে) রিটার্ন করবে
      } else {
        throw new Error(resData.message || 'API error occurred');
      }
    }
    
    // যদি ব্যাকএন্ড সরাসরি ডাটা পাঠায় (fallback)
    return resData as T;
  } catch (error: any) {
    // এরর মেসেজ হ্যান্ডেল করা
    const message = error.response?.data?.message || error.message || 'Network Error';
    console.error("API Request Fail:", message);
    throw new Error(message);
  }
}
