export const locales = ["en", "es", "ja"] as const;
export const defaultLocale = "en";

export type Locale = (typeof locales)[number];
