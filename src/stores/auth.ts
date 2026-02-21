import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthStore {
  token: string | null;
  username: string | null;
  setAuth: (token: string, username: string) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      username: null,
      setAuth: (token, username) => {
        localStorage.setItem('admin_token', token);
        set({ token, username });
      },
      logout: () => {
        localStorage.removeItem('admin_token');
        set({ token: null, username: null });
      },
      isAuthenticated: () => !!get().token,
    }),
    { name: 'kickstore-auth' }
  )
);
