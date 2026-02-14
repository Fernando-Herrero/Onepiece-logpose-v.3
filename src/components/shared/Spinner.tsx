import classNames from "classnames";
import type { SVGProps } from "react";

const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-8 h-8",
    xl: "w-12 h-12",
} as const;
type SpinnerSizes = keyof typeof sizeClasses;

const colorClasses = {
    primary: "text-blue-500",
    secondary: "text-indigo-500",
    white: "text-white",
    gray: "text-gray-500",
    success: "text-green-500",
    warning: "text-red-700",
    error: "text-red-500",
} as const;
type SpinnerColors = keyof typeof colorClasses;

interface SpinnerProps extends SVGProps<SVGSVGElement> {
    size?: SpinnerSizes;
    color?: SpinnerColors;
    className?: string;
}

export const Spinner = ({ size = "md", color = "primary", className = "", ...props }: SpinnerProps) => {
    const spinnerClasses = classNames("animate-spin", sizeClasses[size], colorClasses[color], className);

    return (
        <svg
            className={spinnerClasses}
            fill="none"
            viewBox="0 0 24 24"
            role="status"
            aria-label="Cargando"
            {...props}
        >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
        </svg>
    );
};
