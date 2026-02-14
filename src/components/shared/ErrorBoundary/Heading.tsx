import type {
    HeadingAlign,
    HeadingColor,
    HeadingLevel,
    HeadingSize,
    HeadingTags,
    HeadingVariant,
    HeadingWeight,
} from "@/types/heading.types";
import classNames from "classnames";
import { forwardRef, type ElementType, type ReactNode } from "react";

interface HeadingProps {
    children: ReactNode;

    level?: HeadingLevel;
    size?: HeadingSize;
    weight?: HeadingWeight;
    color?: HeadingColor;
    variant?: HeadingVariant;
    align?: HeadingAlign;
    truncate?: boolean;
    as?: ElementType;
    id?: string;
    className?: string;
}

export const Heading = forwardRef<HTMLElement, HeadingProps>(
    (
        {
            children,
            level = 1,
            size,
            weight = "semibold",
            color = "default",
            variant = "default",
            align = "left",
            truncate = false,
            className = "",
            as,
            id,
            ...props
        },
        ref
    ) => {
        const defaultSizes: Record<HeadingLevel, HeadingSize> = {
            1: "5xl",
            2: "4xl",
            3: "3xl",
            4: "2xl",
            5: "xl",
            6: "lg",
        };

        const finalSize = size ?? defaultSizes[level];

        const colorClasses: Record<HeadingColor, string> = {
            default: "text-gray-900",
            primary: "text-blue-600",
            secondary: "text-gray-600",
            success: "text-green-600",
            warning: "text-yellow-600",
            danger: "text-red-600",
            info: "text-cyan-600",
            muted: "text-gray-500",
            white: "text-white",
            black: "text-black",
        };

        const defaultHeadingTags: Record<HeadingLevel, HeadingTags> = {
            1: "h1",
            2: "h2",
            3: "h3",
            4: "h4",
            5: "h5",
            6: "h6",
        };

        const variantClasses: Record<HeadingVariant, string> = {
            default: "leading-tight tracking-tight",
            display: "leading-none tracking-tighter font-extrabold",
            subtitle: "leading-relaxed tracking-normal font-normal",
            eyebrow: "leading-tight tracking-widest uppercase font-semibold text-sm",
        };

        const headingClasses = classNames(
            "leading-tight tracking-tight",

            `text-${finalSize}`,
            `font-${weight}`,
            colorClasses[color],
            `text-${align}`,

            variantClasses[variant],

            {
                truncate: truncate,
            },

            className
        );

        const Component: ElementType = as ?? defaultHeadingTags[level];

        return (
            <Component ref={ref} className={headingClasses} id={id} {...props}>
                {children}
            </Component>
        );
    }
);

Heading.displayName = "Heading";
