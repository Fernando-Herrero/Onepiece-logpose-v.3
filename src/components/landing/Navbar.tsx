"use client";

import cardsIcon from "@/icons/cards-icon.svg";
import profileIcon from "@/icons/home-icon.svg";
import serieIcon from "@/icons/serie-icon.svg";
import socialIcon from "@/icons/social-icon.svg";
import { NavbarItems } from "@/src/components/landing/NavbarItems";
import { useAuthStore } from "@/src/store/authStore";
import { NavItem } from "@/src/types/navbar.types";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems: NavItem[] = [
    {
        type: "link",
        path: "/dashboard/profile",
        label: "profile",
        icon: profileIcon,
        isPrivate: true,
    },
    {
        type: "link",
        path: "/dashboard/community",
        label: "community",
        icon: socialIcon,
        isPrivate: true,
    },
    { type: "link", path: "/dashboard/serie", label: "serie", icon: serieIcon, isPrivate: true },
    { type: "link", path: "/dashboard/cards", label: "cards", icon: cardsIcon, isPrivate: true },
    {
        type: "dropdown",
        label: "onepiece",
        children: [
            { type: "link", path: "/history", label: "history" },
            { type: "link", path: "/characters", label: "characters" },
            { type: "link", path: "/map", label: "map" },
        ],
    },
    {
        type: "dropdown",
        label: "help",
        children: [
            { type: "link", path: "/faq", label: "faq" },
            { type: "link", path: "/contact", label: "contact" },
        ],
    },
];

interface NavbarProps {
    toggleMenu?: () => void;
}

export const Navbar = ({ toggleMenu }: NavbarProps) => {
    const t = useTranslations("navbar");
    const { user } = useAuthStore();
    const pathname = usePathname();

    const privateItems = navItems.filter(
        (item): item is NavItem & { type: "link" } =>
            item.type === "link" && item.isPrivate === true && !!user
    );

    return (
        <nav
            className={classNames("relative flex flex-col gap-2", {
                "items-center md:items-start": user,
                "md:flex-row md:gap-4": !user,
            })}
        >
            {!user && <NavbarItems navItems={navItems} toggleMenu={toggleMenu} />}

            {user &&
                privateItems.map(({ path, label, icon }) => {
                    const isActive = pathname === path;

                    return (
                        <Link
                            key={path || label}
                            href={path}
                            onClick={toggleMenu}
                            title={t(label)}
                            className={classNames(
                                "flex items-center gap-1 p-2 rounded-xl transition-all duration-300 md:text-base",
                                {
                                    "bg-orangeAce/20 scale-110": isActive,
                                    "hover:bg-orangeAce/10": !isActive,
                                }
                            )}
                        >
                            {icon && (
                                <Image
                                    src={icon ? icon : ""}
                                    alt={`${t(label)} icon`}
                                    width={24}
                                    height={24}
                                    className="transition-transform group-hover:scale-105 md:w-4 md:h-4"
                                />
                            )}
                            <span className="hidden text-gradient md:block">{t(label)}</span>
                        </Link>
                    );
                })}
        </nav>
    );
};
