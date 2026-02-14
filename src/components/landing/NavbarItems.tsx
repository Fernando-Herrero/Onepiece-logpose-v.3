"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import rightArrow from "@/icons/right-arrow.svg";
import { useTranslations } from "next-intl";
import { NavItem } from "@/src/types/navbar.types";
import { NavWithChildren } from "@/src/components/landing/NavWithChildren";

interface NavbarItemsProps {
    navItems: NavItem[];
    toggleMenu?: () => void;
}

export const NavbarItems = ({ navItems, toggleMenu }: NavbarItemsProps) => {
    const t = useTranslations("navbar");
    const pathname = usePathname();

    return navItems
        .filter((item) => !item.isPrivate)
        .map((item) => {
            if (item.type === "dropdown") {
                return <NavWithChildren key={item.label} item={item} toggleMenu={toggleMenu} />;
            }

            const isActive = pathname === item.path;

            return (
                <Link key={item.label} href={item.path}>
                    <p className={isActive ? "active" : ""}>{t(item.label)}</p>
                    <Image src={rightArrow} alt="Right arrow icon" width={16} height={16} />
                </Link>
            );
        });
};
