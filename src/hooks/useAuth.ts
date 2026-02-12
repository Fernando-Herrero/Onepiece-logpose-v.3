import {
    getMyPostsApi,
    getMyLikedPostsApi,
    getMyBookmarkedPostsApi,
    getMyCommentedPostsApi,
} from "./../core/auth/auth.api";
import { PostsResponse } from "./../core/auth/auth.types";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/store/authStore";
import { saveTokenInCookies } from "@/src/core/auth/auth.service";
import { LoginPayload, RegisterPayload, UserAuth } from "@/src/core/auth/auth.types";
import {
    deleteAccountApi,
    getProfileApi,
    getUserStatsApi,
    loginApi,
    logOutApi,
    registerApi,
    updateProfileApi,
} from "@/src/core/auth/auth.api";

export const useAuth = () => {
    const router = useRouter();
    const { setUser, logout: logoutStore } = useAuthStore();

    const register = useCallback(
        async (user: RegisterPayload) => {
            console.log("Registrando usuario", user);

            try {
                const authData = await registerApi(user);

                saveTokenInCookies(authData.token);
                setUser(authData.user);
                router.push("/");
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                console.error("Register error", message);
                throw new Error(message);
            }
        },
        [setUser, router]
    );

    const login = useCallback(
        async (user: LoginPayload) => {
            console.log("Iniciando sesión:", user);

            try {
                const authData = await loginApi(user);

                saveTokenInCookies(authData.token);
                authData.user.isActive = true;
                setUser(authData.user);
                router.push("/");
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                console.error("No se pudo hacer login", message);
                throw new Error(message);
            }
        },
        [setUser, router]
    );

    const logout = useCallback(async () => {
        console.log("Cerrando sesión");

        try {
            await logOutApi();
            logoutStore();
            router.push("/");
        } catch (error) {
            console.error("Error en logout:", error);
            logoutStore();
            router.push("/");
        }
    }, [logoutStore, router]);

    const deleteAccount = useCallback(
        async (userId: string) => {
            console.log("Eliminando usuario");

            try {
                await deleteAccountApi(userId);
                logoutStore();
                router.push("/");
            } catch (error) {
                console.error("Error al eliminar cuenta:", error);
                throw error;
            }
        },
        [logoutStore, router]
    );

    const getProfile = useCallback(async () => {
        console.log("Obteniendo perfil del usuario actual");

        try {
            const user = await getProfileApi();
            if (user) {
                console.log("Usuario obtenido:", user);
                setUser(user);
            }
            return user;
        } catch (error) {
            console.error("Error al obtener perfil:", error);
            throw error;
        }
    }, [setUser]);

    const updateProfile = useCallback(
        async (user: UserAuth, updatedFields: Partial<UserAuth>) => {
            console.log("Actualizando perfil...");

            try {
                const updatedUser = await updateProfileApi(user, updatedFields);
                setUser(updatedUser);
                console.log("Perfil actualizado", updatedUser);
                return updatedUser;
            } catch (error: unknown) {
                const message = error instanceof Error ? error.message : String(error);
                console.error("No se pudo actualizar el user", message);
                throw new Error(message);
            }
        },
        [setUser]
    );

    const getUserStats = useCallback(async () => {
        try {
            const dataStats = await getUserStatsApi();
            return dataStats;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("Error al obtener stats del usuario", message);
            throw error;
        }
    }, []);

    const getMyPosts = useCallback(async (): Promise<PostsResponse> => {
        try {
            const dataPosts = await getMyPostsApi();
            console.log("Posts obtenidos:", dataPosts);
            return dataPosts;
        } catch (error: unknown) {
            const message = error instanceof Error ? error.message : String(error);
            console.error("Error al obtener posts", message);
            throw error;
        }
    }, []);

    const getMyLikedPosts = useCallback(async (): Promise<PostsResponse> => {
        try {
            const dataLikedPosts = await getMyLikedPostsApi();
            return dataLikedPosts;
        } catch (error: unknown) {
            console.error("Error al obtener liked posts", error);
            return [];
        }
    }, []);

    const getMyBookmarkedPosts = useCallback(async (): Promise<PostsResponse> => {
        try {
            const dataBookmarkedPosts = await getMyBookmarkedPostsApi();
            return dataBookmarkedPosts;
        } catch (error: unknown) {
            console.error("Error al obtener bookmarked posts", error);
            return [];
        }
    }, []);

    const getMyCommentedPosts = useCallback(async (): Promise<PostsResponse> => {
        try {
            const dataCommentedPosts = await getMyCommentedPostsApi();
            return dataCommentedPosts;
        } catch (error: unknown) {
            console.error("Error al obtener commented posts", error);
            return [];
        }
    }, []);

    return {
        register,
        login,
        logout,
        getProfile,
        updateProfile,
        getUserStats,
        getMyPosts,
        getMyLikedPosts,
        getMyBookmarkedPosts,
        getMyCommentedPosts,
        deleteAccount,
    };
};
