import type { AlignClass, ColorClass, VariantClass } from "@/types/text.types";
import classNames from "classnames";
import { forwardRef, type ElementType, type ReactNode } from "react";

interface TextProps {
    children: ReactNode;
    size?: string;
    weight?: string;
    color?: ColorClass;
    variant?: VariantClass;
    align?: AlignClass;
    transform?: string;
    decoration?: string;
    truncate?: boolean;
    leading?: string;
    className?: string;
    as?: ElementType;
    id?: string;
}

export const Text = forwardRef<HTMLElement, TextProps>(
    (
        {
            children,
            size = "base",
            weight = "normal",
            color = "default",
            variant = "body",
            align = "left",
            transform = "none",
            decoration = "none",
            truncate = false,
            leading = "normal",
            className = "",
            as = "p",
            id,
            ...props
        },
        ref
    ) => {
        const colorClasses: Record<ColorClass, string> = {
            default: "text-gray-700",
            primary: "text-brand-400",
            secondary: "text-secondary",
            success: "text-success-600",
            warning: "text-warning-600",
            danger: "text-error-600",
            info: "text-blue-600",
            muted: "text-gray-500",
            white: "text-white",
            black: "text-black",
        };

        const variantClasses: Record<VariantClass, string> = {
            body: "leading-relaxed",
            caption: "leading-tight text-sm text-gray-600",
            label: "leading-none font-medium text-sm",
            code: "font-mono bg-gray-100 px-2 py-1 rounded-md text-sm border",
            kbd: "font-mono bg-gray-800 text-white px-2 py-1 rounded text-sm shadow-sm border",
            muted: "text-gray-500",
            small: "text-sm text-gray-600",
            lead: "text-xl leading-relaxed text-gray-600",
        };

        const alignClasses: Record<AlignClass, string> = {
            left: "text-left",
            center: "text-center",
            right: "text-right",
            justify: "text-justify",
        };

        const textClasses = classNames(
            "leading-relaxed",

            `text-${size}`,
            `font-${weight}`,
            colorClasses[color],
            alignClasses[align],
            transform && transform !== "none" ? transform : "",
            decoration && decoration !== "none" ? decoration : "",
            leading && leading !== "normal" ? `leading-${leading}` : "",

            variantClasses[variant],

            {
                truncate: truncate,
            },

            className
        );

        const Component = as;

        return (
            <Component ref={ref} className={textClasses} id={id} {...props}>
                {children}
            </Component>
        );
    }
);

Text.displayName = "Text";
