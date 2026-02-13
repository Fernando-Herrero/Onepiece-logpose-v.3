import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "./config";

export default getRequestConfig(async ({ locale }) => {
    const safeLocale = locale ?? defaultLocale;

    const messages = (await import(`./messages/${safeLocale}.json`)).default;

    return {
        locale: safeLocale,
        messages,
    };
});
