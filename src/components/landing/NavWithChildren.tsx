import rightArrow from "@/icons/right-arrow.svg";
import { ToggleButton } from "@/src/components/shared/ToggleButton";
import { useToggle } from "@/src/hooks/useToggle";
import { NavItemDropdown } from "@/src/types/navbar.types";
import classNames from "classnames";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

interface NavWithChildren {
    item: NavItemDropdown;
    toggleMenu?: () => void;
}

export const NavWithChildren = ({ item, toggleMenu }: NavWithChildren) => {
    const t = useTranslations("navbar");
    const [open, toggleBox] = useToggle(false);
    const containRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handelClickOutside = (event: MouseEvent) => {
            const target = event.target;
            if (
                open &&
                containRef.current &&
                target instanceof Node &&
                !containRef.current.contains(target)
            ) {
                toggleBox();
            }
        };

        if (open) {
            window.addEventListener("mousedown", handelClickOutside);
        }

        return () => window.removeEventListener("mousedown", handelClickOutside);
    }, [open, toggleBox]);

    return (
        <section
            ref={containRef}
            className={classNames("text-muted p-2 rounded-xl md:text-primary md:relative", {
                "bg-orangeAce/10 md:bg-secondary/80 md:rounded-t-xl md:rounded-b-none": open,
            })}
        >
            <header className="flex items-center justify-between cursor-pointer md:gap-1" onClick={toggleBox}>
                <p className="font-bold">{t(`navbar.${item.label}`)}</p>
                <ToggleButton isOpen={open} />
            </header>

            <div
                className={classNames(
                    "grid transition-[grid-template-rows] duration-300 md:absolute md:top-full md:left-0 md:w-full md:bg-secondary/80 md:rounded-b-xl",
                    {
                        "[grid-rows-[1fr]": open,
                        "[grid-rows-[0fr]": !open,
                    }
                )}
            >
                <div className="min-h-0 overflow-hidden">
                    {item.children.map((child, childIndex) => (
                        <Link
                            key={`${child.label}-${childIndex}`}
                            className="flex justify-between mx-2 px-2 py-2 rounded relative group transition hover:-translate-y-0.5 hover:bg-orangeAce/10 md:mx-1 md:p-1 md:hover:bg-orangeAce/0"
                            href={child.path}
                            onClick={toggleMenu}
                        >
                            <p className="relative md:after:block md:after:absolute md:after:left-0 md:after:bottom-0 md:after:h-0.5 md:after:w-0 md:after:bg-orangeAce/30 after:transition-all after:duration-300 group-hover:after:w-full">
                                {t(`navbar.${child.label}`)}
                            </p>
                            <Image
                                className="w-4 md:hidden"
                                src={rightArrow}
                                alt="Right arrow icon"
                                width={16}
                                height={16}
                            />{" "}
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
