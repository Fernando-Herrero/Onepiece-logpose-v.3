import type { AxiosError } from "axios";

import type {
    AuthResponse,
    DeleteResponse,
    LoginPayload,
    LogoutResponse,
    RegisterPayload,
    StatsResponse,
    UserAuth,
} from "./auth.types";
import { api } from "@/src/core/api/axios.instance";

export const registerApi = async (user: RegisterPayload): Promise<AuthResponse> => {
    try {
        console.log("registerApi:", user);
        const response = await api.post<AuthResponse>("/auth/register", user);
        console.log("respuesta de la api", response);

        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        console.error("Error en registerApi:", err);
        const backendMessage = err.response?.data?.error || "Something went wrong";
        throw new Error(backendMessage);
    }
};

export const loginApi = async (user: LoginPayload): Promise<AuthResponse> => {
    try {
        console.log("loginApi:", user);
        const response = await api.post<AuthResponse>("/auth/login", user);
        console.log("respuesta de la api", response);

        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        console.error("Error en loginApi:", err);
        const backendMessage = err.response?.data?.error || "Something went wrong";
        throw new Error(backendMessage);
    }
};

export const logOutApi = async (): Promise<LogoutResponse> => {
    try {
        console.log("logOutApi");
        const response = await api.post<LogoutResponse>("/auth/logout");
        console.log("Respuesta de la api la logout:", response);

        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        console.error("Error en logOutApi:", err);
        const backendMessage = err.response?.data?.error || "Error al cerrar sesión";
        throw new Error(backendMessage);
    }
};

export const deleteAccountApi = async (userId: string): Promise<DeleteResponse> => {
    try {
        console.log("Eliminando usuario", userId);
        const response = await api.delete<DeleteResponse>(`/users/${userId}`);
        console.log("Respuesta de la api al eliminar usuario:", response);

        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        console.error("Error en deleteAccountApi:", err);
        const backendMessage = err.response?.data?.error || "Error al eliminar usuario";
        throw new Error(backendMessage);
    }
};

export const getProfileApi = async (): Promise<UserAuth> => {
    try {
        console.log("getProfileApi");
        const response = await api.get<{ user: UserAuth }>("/auth/me");

        return response.data.user;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        console.error("Error en getProfileApi:", err);
        const backendMessage = err.response?.data?.error || "Error al obtener el usuario";
        throw new Error(backendMessage);
    }
};

export const updateProfileApi = async (user: UserAuth, updateFields: Partial<UserAuth>) => {
    try {
        console.log("updateProfileApi");
        const response = await api.patch<UserAuth>(`/users/${user.id || user._id}`, updateFields);
        console.log("Respuesta de la api:", response);

        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        console.error("Error en updateProfileApi:", err);
        const backendMessage = err.response?.data?.error || "Error al actualizar el perfil";
        throw new Error(backendMessage);
    }
};

export const getUserStatsApi = async (): Promise<StatsResponse> => {
    try {
        console.log("Obteniendo stats del user");
        const response = await api.get<StatsResponse>("/users/me/stats");
        console.log("Respuesta de la api", response);

        return response.data;
    } catch (error: unknown) {
        const err = error as AxiosError<{ error: string }>;
        console.error("Error en getUserStatsApi:", err);
        const backendMessage = err.response?.data?.error || "Error al obtener user stats";
        throw new Error(backendMessage);
    }
};

// export const getMyPostsApi = async (): Promise<PostsResponse> => {
//     try {
//         console.log("Obteniendo mis posts");
//         const response = await api.get<PostsResponse>("/users/me/my-posts");
//         console.log("Respuesta de la api", response);

//         return response.data;
//     } catch (error: unknown) {
//         const err = error as AxiosError<{ error: string }>;
//         console.error("Error en getMyPostsApi:", err);
//         const backendMessage = err.response?.data?.error || "Error al obtener mis posts";
//         throw new Error(backendMessage);
//     }
// };

// export const getMyLikedPostsApi = async (): Promise<PostsResponse> => {
//     try {
//         console.log("Obteniendo mis likes de posts");
//         const response = await api.get<PostsResponse>("/users/me/liked-posts");
//         console.log("Respuesta de la api", response);

//         return response.data;
//     } catch (error: unknown) {
//         const err = error as AxiosError<{ error: string }>;
//         console.error("Error en getMyLikedPostsApi:", err);
//         const backendMessage = err.response?.data?.error || "Error al obtener mis likes posts";
//         throw new Error(backendMessage);
//     }
// };

// export const getMyBookmarkedPostsApi = async (): Promise<PostsResponse> => {
//     try {
//         console.log("Obteniendo mis favoritos posts");
//         const response = await api.get<PostsResponse>("/users/me/bookmarked-posts");
//         console.log("Respuesta de la api", response);

//         return response.data;
//     } catch (error: unknown) {
//         const err = error as AxiosError<{ error: string }>;
//         console.error("Error en getMyBookmarkedPostsApi:", err);
//         const backendMessage = err.response?.data?.error || "Error al obtener mis favoritos posts";
//         throw new Error(backendMessage);
//     }
// };

// export const getMyCommentedPostsApi = async (): Promise<PostsResponse> => {
//     try {
//         console.log("Obteniendo mis comentarios posts");
//         const response = await api.get<PostsResponse>("/users/me/commented-posts");
//         console.log("Respuesta de la api", response);

//         return response.data;
//     } catch (error: unknown) {
//         const err = error as AxiosError<{ error: string }>;
//         console.error("Error en getMyCommentedPostsApi:", err);
//         const backendMessage = err.response?.data?.error || "Error al obtener mis comentarios posts";
//         throw new Error(backendMessage);
//     }
// };
