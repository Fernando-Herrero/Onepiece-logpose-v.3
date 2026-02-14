import { Footer } from "@/src/components/landing/Footer";
import { Navbar } from "@/src/components/landing/Navbar";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </>
    );
}
