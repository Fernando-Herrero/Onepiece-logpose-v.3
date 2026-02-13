import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { AppInitializer } from "@/src/components/providers/AppInitializer";
import "@/src/app/globals.css";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const locales = ["es", "en", "ja"];

export default async function LocaleLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode;
    params: { locale: string };
}) {
    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages({ locale });

    return (
        <html lang={locale}>
            <body className={geistSans.variable}>
                <NextIntlClientProvider messages={messages}>
                    <AppInitializer />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
