import { DropDownAlign, DropDownPlacement, DropDownSizes } from "@/src/types/dropdown.types";
import classNames from "classnames";
import { useEffect, useRef, type ReactNode } from "react";

interface DropDownProps {
    open: boolean;
    onClose: () => void;
    className?: string;
    children: ReactNode;
    size?: DropDownSizes;
    placement?: DropDownPlacement;
    align?: DropDownAlign;
}

export const DropDown = ({
    open,
    onClose,
    className = "",
    children,
    size = "md",
    placement = "bottom",
    align = "right",
}: DropDownProps) => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const onDoclick = (event: MouseEvent) => {
            if (!ref.current) return;
            if (event.target instanceof Node && !ref.current.contains(event.target)) onClose?.();
        };

        const onEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") onClose?.();
        };

        document.addEventListener("mousedown", onDoclick);
        document.addEventListener("keydown", onEsc);

        return () => {
            document.removeEventListener("mousedown", onDoclick);
            document.removeEventListener("keydown", onEsc);
        };
    }, [open, onClose]);

    const sizeClass = size === "sm" ? "dropdown-sm" : "dropdown-md";
    const placementClass =
        placement === "top" ? "bottom-full mb-2 origin-bottom" : "top-full mt-2 origin-top";
    const alignClass =
        align === "left" ? "left-0" : align === "center" ? "left-1/2 -translate-x-1/2" : "right-0";

    return (
        <div
            ref={ref}
            className={classNames(
                "absolute z-50 dropdown-panel",
                sizeClass,
                placementClass,
                alignClass,
                open ? "block" : "hidden",
                className
            )}
            role="menu"
        >
            {children}
        </div>
    );
};
