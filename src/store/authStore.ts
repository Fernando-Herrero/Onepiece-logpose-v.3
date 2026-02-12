import { create } from "zustand";
import {
    getUserFromCookies,
    removeTokenFromCookies,
    removeUserFromCookies,
    saveTokenInCookies,
    saveUserInCookies,
} from "@/src/core/auth/auth.service";
import { LoginPayload, RegisterPayload, UserAuth } from "@/src/core/auth/auth.types";
import { loginApi, logOutApi, registerApi } from "@/src/core/auth/auth.api";

interface AuthState {
    user: UserAuth | null;
    isAuthenticated: boolean;
    loading: boolean;

    setUser: (user: UserAuth | null) => void;
    logout: () => Promise<void>;
    initializeAuth: () => void;
    login: (payload: LoginPayload) => Promise<void>;
    register: (payload: RegisterPayload) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    loading: false,

    setUser: (user) => {
        if (user) {
            saveUserInCookies(user);
            set({ user, isAuthenticated: true });
        } else {
            set({ user: null, isAuthenticated: false });
        }
    },

    initializeAuth: () => {
        const user = getUserFromCookies();
        if (user) {
            set({ user, isAuthenticated: true });
        }
    },

    login: async (payload: LoginPayload) => {
        set({ loading: true });
        try {
            const authData = await loginApi(payload);
            saveTokenInCookies(authData.token);
            set({ user: authData.user, isAuthenticated: true });
        } catch (error) {
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    register: async (payload: RegisterPayload) => {
        set({ loading: true });
        try {
            const authData = await registerApi(payload);
            saveTokenInCookies(authData.token);
            set({ user: authData.user, isAuthenticated: true });
        } catch (error) {
            throw error;
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        set({ loading: true });

        try {
            await logOutApi();
        } catch (error) {
            console.error("Logout API failed:", error);
        } finally {
            removeUserFromCookies();
            removeTokenFromCookies();

            set({
                user: null,
                isAuthenticated: false,
                loading: false,
            });
        }
    },
}));
