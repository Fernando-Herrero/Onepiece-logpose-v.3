"use client";

import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export const useTranslate = () => {
    const locale = useLocale();
    const router = useRouter();

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

    return {
        t: (key: string) => key,
        i18n,
    };
};
