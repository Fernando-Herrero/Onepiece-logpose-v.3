"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useTranslate = (namespace: string) => {
    const locale = useLocale();
    const router = useRouter();
    const translations = useTranslations(namespace);

    const t = (key: string) => translations(key);
    const changeLanguage = (newLocale: string) => {
        Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });

        const currentPath = window.location.pathname;
        const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);

        router.push(newPath);
    };

    return {
        t,
        locale,
        changeLanguage,
    };
};
