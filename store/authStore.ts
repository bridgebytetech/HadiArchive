import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Admin } from '@/types';
import { authService } from '@/services/authService';

interface AuthState {
  admin: Admin | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // আমরা এখানে username নিচ্ছি
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (username, password) => {
        set({ isLoading: true, error: null });
        try {
          // সার্ভিস কল করার সময় নিশ্চিত করছি যে username যাচ্ছে
          const response = await authService.login({ username, password });
          
          set({ 
            admin: response.admin as any, 
            isAuthenticated: true, 
            isLoading: false 
          });
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
        set({ admin: null, isAuthenticated: false });
      },

      checkAuth: async () => {
        if (!authService.isAuthenticated()) return;
        try {
          const admin = await authService.getCurrentAdmin();
          set({ admin, isAuthenticated: true });
        } catch {
          authService.logout();
          set({ admin: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);