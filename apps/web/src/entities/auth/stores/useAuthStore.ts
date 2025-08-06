import { updateUserRole as changeUserRole } from 'src/entities/auth/supabase/client';
import { create } from 'zustand';
import type { User } from '@supabase/supabase-js';
import type { ExtendedUser } from 'src/entities/auth/types';
import type { RoleType } from 'src/entities/user/mypage/main/types';

type AuthState = {
  user: ExtendedUser | null;
  loading: boolean;
  actions: {
    setUser: (user: ExtendedUser | User | null) => void;
    setLoading: (loading: boolean) => void;
    updateUserRole: (newRole: RoleType) => Promise<void>;
  };
};

const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  loading: true,
  actions: {
    setUser: (user) => {
      set({ user: user as ExtendedUser | null });
    },
    setLoading: (loading) => set({ loading }),
    updateUserRole: async (newRole) => {
      const currentUser = get().user;
      if (!currentUser) return;

      await changeUserRole(currentUser.id, newRole);
      set({
        user: {
          ...currentUser,
          role: newRole
        }
      });
    }
  }
}));

export const useUserState = () => useAuthStore((state) => state.user);
export const useUserLoadingState = () => useAuthStore((state) => state.loading);
export const useAuthActions = () => useAuthStore((state) => state.actions);
