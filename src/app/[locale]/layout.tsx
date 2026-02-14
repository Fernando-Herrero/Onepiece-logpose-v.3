import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist } from "next/font/google";
import { AppInitializer } from "@/src/components/providers/AppInitializer";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const locales = ["es", "en", "ja"];

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!locales.includes(locale)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div className={geistSans.variable}>
                <AppInitializer />
                {children}
            </div>
        </NextIntlClientProvider>
    );
}
