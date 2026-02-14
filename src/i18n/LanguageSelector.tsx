"use client";

import { DropDown } from "@/src/components/shared/Dropdown";
import { useClickOutside } from "@/src/hooks/useClickOutside";
import { useToggle } from "@/src/hooks/useToggle";
import { locales, type Locale } from "@/src/i18n/config";
import { DropDownAlign, DropDownPlacement } from "@/src/types/dropdown.types";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

interface LanguageSelectorProps {
    placement: DropDownPlacement;
    align: DropDownAlign;
}

type LanguageCode = "es" | "en" | "ja";

const languagesMap: Record<Locale, { flag: string; label: string }> = {
    es: { flag: "🇪🇸", label: "Español" },
    en: { flag: "🇬🇧", label: "English" },
    ja: { flag: "🇯🇵", label: "日本語" },
};

export const LanguageSelector = ({ placement, align }: LanguageSelectorProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const [isOpen, toggleMenu, closeMenu] = useToggle();
    const menuRef: React.RefObject<HTMLDivElement | null> = useClickOutside(closeMenu, isOpen);

    const currentLanguage = (pathname.split("/")[1] as LanguageCode) || "en";

    const handleLanguage = (language: Locale) => {
        const pathWithoutLocale = pathname.replace(/^\/(en|es|ja)/, "");

        router.push(`/${language}${pathWithoutLocale}`);
        closeMenu();
    };

    return (
        <div className="relative" ref={menuRef}>
            <button
                type="button"
                onClick={toggleMenu}
                className="flex items-center gap-2 border border-orangeAce/20 bg-transparent px-2 py-1 rounded-xl cursor-pointer transition hover:bg-orangeAce/10"
            >
                <span>{languagesMap[currentLanguage].flag}</span>
                <span className="hidden text-gradient md:block">{languagesMap[currentLanguage].label}</span>
            </button>

            <DropDown open={isOpen} onClose={closeMenu} size="sm" placement={placement} align={align}>
                <div className="flex flex-col">
                    {locales.map((language) => (
                        <button
                            key={language}
                            onClick={() => handleLanguage(language)}
                            className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-orangeAce/10 rounded-md cursor-pointer"
                        >
                            <span>{languagesMap?.[language].flag}</span>
                            <span className="text-gradient">{languagesMap[language]?.label || "Idioma"}</span>
                        </button>
                    ))}
                </div>
            </DropDown>
        </div>
    );
};
