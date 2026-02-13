import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
    title: "One Piece LogPose",
    description: "Explora el mundo de One Piece",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return children;
}
