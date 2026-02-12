import { create } from "zustand";
import {
    getUserFromCookies,
    removeTokenFromCookies,
    removeUserFromCookies,
    saveUserInCookies,
} from "@/src/core/auth/auth.service";
import { UserAuth } from "@/src/core/auth/auth.types";

interface AuthState {
    user: UserAuth | null;
    isAuthenticated: boolean;

    setUser: (user: UserAuth | null) => void;
    logout: () => void;
    initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) => {
        if (user) {
            saveUserInCookies(user);
            set({ user, isAuthenticated: true });
        } else {
            set({ user: null, isAuthenticated: false });
        }
    },

    logout: () => {
        removeUserFromCookies();
        removeTokenFromCookies();
        set({ user: null, isAuthenticated: false });
    },

    initializeAuth: () => {
        const user = getUserFromCookies();
        if (user) {
            set({ user, isAuthenticated: true });
        }
    },
}));
