import "./globals.css";

export const metadata = {
    title: "One Piece LogPose",
    description: "Explora el mundo de One Piece",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning>
            <body suppressHydrationWarning>{children}</body>
        </html>
    );
}
