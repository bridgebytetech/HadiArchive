// lib/api.ts
import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

// ১. এপিআই ইন্সট্যান্স তৈরি
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
 * এটি প্রতিটা এপিআই কল করার আগে চেক করবে টোকেন আছে কিনা।
 * কুকি অথবা লোকাল স্টোরেজ—উভয় জায়গা থেকে টোকেন খুঁজি যাতে সেশন না হারায়।
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    let token = Cookies.get('admin_token');

    // যদি কুকিতে না থাকে, লোকাল স্টোরেজ থেকে খুঁজি (Zustand persist storage)
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

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * ৩. রেসপন্স ইন্টারসেপ্টর
 * এপিআই থেকে ভুল এরর আসলে (যেমন ৪০১) এটি অটোমেটিক লগআউট করে দিবে।
 */
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // যদি ৪০১ (Unauthorized) আসে, তার মানে টোকেন ইনভ্যালিড
    if (error.response?.status === 401) {
      Cookies.remove('admin_token', { path: '/' });
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth-storage');
        // লগইন পেজে রিডাইরেক্ট (যদি আমরা এডমিন সেকশনে থাকি)
        if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
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
 * আপনার মেইন পেজের 'TypeError: map is not a function' এররটি এটি ঠিক করবে।
 * এটি ব্যাকএন্ডের { success: true, data: [...] } থেকে শুধু ভেতরের ডাটাটুকু বের করে দিবে।
 */
export async function apiRequest<T>(
  promise: Promise<{ data: any }>
): Promise<T> {
  try {
    const response = await promise;
    const resData = response.data;

    // যদি ব্যাকএন্ড ডাটা success wrappers এর ভেতরে পাঠায়
    if (resData && resData.success === true && resData.data !== undefined) {
      return resData.data as T; 
    }
    
    // যদি সরাসরি ডাটা আসে (fallback)
    return resData as T;
  } catch (error: any) {
    // এরর মেসেজ হ্যান্ডেল করা
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    throw new Error(message);
  }
}
