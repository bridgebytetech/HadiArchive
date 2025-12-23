// store/authStore.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Admin } from '@/types';
import { authService } from '@/services/authService';
import Cookies from 'js-cookie';

interface AuthState {
  admin: Admin | null;
  token: string | null;  // ✅ Token ও store এ রাখো
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setToken: (token: string) => {
        set({ token, isAuthenticated: true });
      },

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authService.login({ username, password });
          
          // ✅ Token store এও save করো
          set({ 
            admin: response.admin as any,
            token: response.token,
            isAuthenticated: true, 
            isLoading: false 
          });
          
          console.log('✅ Auth store updated, token saved');
        } catch (error: any) {
          set({ 
            error: error.message || 'Login failed', 
            isLoading: false 
          });
          throw error;
        }
      },

      logout: () => {
        authService.logout();
        set({ admin: null, token: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        // ✅ Cookie বা store থেকে token check করো
        const cookieToken = Cookies.get('admin_token');
        const storeToken = get().token;
        
        const token = cookieToken || storeToken;
        
        if (!token) {
          set({ isAuthenticated: false });
          return;
        }
        
        // Cookie তে না থাকলে store থেকে set করো
        if (!cookieToken && storeToken) {
          Cookies.set('admin_token', storeToken, {
            expires: 7,
            path: '/',
            secure: false,
            sameSite: 'lax'
          });
        }
        
        try {
          const admin = await authService.getCurrentAdmin();
          set({ admin, isAuthenticated: true });
        } catch {
          authService.logout();
          set({ admin: null, token: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage), // ✅ localStorage ব্যবহার করো
      partialize: (state) => ({ 
        token: state.token,
        admin: state.admin,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);
