import type { Metadata } from "next";
import "@/src/app/globals.css";
import { Geist } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "One Piece LogPose",
    description: "Explora el mundo de One Piece",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="es">
            <body className={geistSans.variable}>{children}</body>
        </html>
    );
}
