"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useTranslate = (namespace: string) => {
    const locale = useLocale();
    const router = useRouter();
    const translations = useTranslations(namespace);

    const t = (key: string) => translations(key);

    const i18n = {
        language: locale,
        changeLanguage: (newLocale: string) => {
            Cookies.set("NEXT_LOCALE", newLocale, { expires: 365 });

            const currentPath = window.location.pathname;
            const newPath = currentPath.replace(`/${locale}`, `/${newLocale}`);
            router.push(newPath);
        },
        options: {
            resources: {
                es: {},
                en: {},
                ja: {},
            },
        },
    };

    return { t, i18n };
};
