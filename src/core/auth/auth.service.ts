import { UserAuth } from "@/src/core/auth/auth.types";
import Cookies from "js-cookie";


const TOKEN_KEY = "token";
const USER_KEY = "user";

// ========== TOKEN ==========
export const saveTokenInCookies = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: 7, 
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const getTokenFromCookies = (): string | undefined => {
  return Cookies.get(TOKEN_KEY);
};

export const removeTokenFromCookies = (): void => {
  Cookies.remove(TOKEN_KEY);
};

// ========== USER ==========
export const saveUserInCookies = (user: UserAuth): void => {
  Cookies.set(USER_KEY, JSON.stringify(user), {
    expires: 7,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
};

export const getUserFromCookies = (): UserAuth | null => {
  const userStr = Cookies.get(USER_KEY);
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr) as UserAuth;
  } catch {
    return null;
  }
};

export const removeUserFromCookies = (): void => {
  Cookies.remove(USER_KEY);
};