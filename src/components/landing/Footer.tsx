import { Container } from "@/src/components/landing/Container";
import { LanguageSelector } from "@/src/i18n/LanguageSelector";
import { useTranslations } from "next-intl";

export const Footer = () => {
    const t = useTranslations("footer");
    const year = new Date().getFullYear();

    return (
        <footer className="border-t border-linePrimary py-2 relative bg-secondary">
            <Container className="flex flex-col items-center text-center gap-1">
                <div className="hidden md:flex">
                    <LanguageSelector placement="top" align="center" />
                </div>

                <div className="flex flex-col gap-0.5 text-xs">
                    <p>{t("disclaimer")}</p>
                    <p>
                        &copy; {year} {t("copyright")}
                    </p>
                </div>
            </Container>
        </footer>
    );
};
