"use client";

import { DropDown } from "@/src/components/shared/Dropdown";
import { useClickOutside } from "@/src/core/hooks/useClickOutside";
import { useToggle } from "@/src/core/hooks/useToggle";
import { useTranslate } from "@/src/i18n/useTranslate";
import type { DropDownAlign, DropDownPlacement } from "@/src/types/dropdown.types";

interface LanguageSelectorProps {
    placement: DropDownPlacement;
    align: DropDownAlign;
}

type LanguageCode = "es" | "en" | "ja";

export const LanguageSelector = ({ placement, align }: LanguageSelectorProps) => {
    const { i18n } = useTranslate();
    const languages = Object.keys(i18n.options.resources || {}) as LanguageCode[];
    const [isOpen, toggleMenu, closeMenu] = useToggle();
    const menuRef: React.RefObject<HTMLDivElement | null> = useClickOutside(toggleMenu, isOpen);
    const currentLanguage = i18n.language as LanguageCode;

    const languagesMap: Record<LanguageCode, { flag: string; label: string }> = {
        es: { flag: "🇪🇸", label: "Español" },
        en: { flag: "🇬🇧", label: "English" },
        ja: { flag: "🇯🇵", label: "日本語" },
    };

    const handleLanguage = (language: LanguageCode) => {
        i18n.changeLanguage(language);
        toggleMenu();
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
                    {languages.map((language) => (
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
