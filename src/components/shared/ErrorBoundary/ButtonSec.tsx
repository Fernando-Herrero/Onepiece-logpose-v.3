import type { ButtonSecSize, ButtonSecVariant } from "@/types/button.types.variant";
import classNames from "classnames";
import type { ReactNode } from "react";

interface ButtonSecProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    variant?: ButtonSecVariant;
    size?: ButtonSecSize;
    to?: string;
}

export const ButtonSec = ({
    children,
    variant = "default",
    size = "md",
    disabled = false,
    onClick,
    type = "button",
    to,
    className = "",
    ...props
}: ButtonSecProps) => {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-md transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer";

    const variantConfig: Record<
        ButtonSecVariant,
        {
            classes: string;
            hasHoverEffects: boolean;
            shadowColor: string | null;
        }
    > = {
        default: {
            classes:
                "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 hover:text-gray-900 focus:ring-blue-500",
            hasHoverEffects: true,
            shadowColor: null,
        },
        primary: {
            classes:
                "bg-blue-500 text-white border border-blue-600 hover:bg-blue-400 focus:ring-blue-500 shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-blue-500/25",
        },
        secondary: {
            classes:
                "bg-gray-500 text-white border border-gray-600 hover:bg-gray-400 focus:ring-gray-500 shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-gray-500/25",
        },
        outline: {
            classes:
                "bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-50 focus:ring-gray-500",
            hasHoverEffects: true,
            shadowColor: null,
        },
        ghost: {
            classes: "bg-transparent text-gray-700 border-transparent hover:bg-gray-100 focus:ring-gray-500",
            hasHoverEffects: false,
            shadowColor: null,
        },
        danger: {
            classes:
                "bg-red-600 text-white border border-red-700 hover:bg-red-500 focus:ring-red-500 shadow-sm",
            hasHoverEffects: true,
            shadowColor: "hover:shadow-red-500/25",
        },
    };

    const sizeConfig: Record<ButtonSecSize, string> = {
        sm: "px-3 py-1.5 text-sm",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
        xl: "px-8 py-4 text-lg",
    };

    const currentVariant = variantConfig[variant] || variantConfig.default;
    const currentSize = sizeConfig[size] || sizeConfig.md;

    const buttonClasses = classNames(
        baseClasses,
        currentVariant.classes,
        currentSize,
        {
            "opacity-50 cursor-not-allowed pointer-events-none": disabled,
            "hover:scale-105 hover:shadow-lg transform": !disabled && currentVariant.hasHoverEffects,
        },
        !disabled && currentVariant.shadowColor,
        className
    );

    // Renderizado por defecto como button
    return (
        <button type={type} disabled={disabled} onClick={onClick} className={buttonClasses} {...props}>
            {children}
        </button>
    );
};
