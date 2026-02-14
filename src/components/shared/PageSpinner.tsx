import { Text } from "@/src/components/shared/ErrorBoundary/Text";
import { LoadingDots } from "@/src/components/shared/LoadingDots";
import { Spinner } from "@/src/components/shared/Spinner";
import { useTranslations } from "next-intl";

export type PageSpinnerSizes = "xl" | "sm" | "md" | "lg";

export type PageSpinnerColor = "primary" | "secondary" | "white" | "gray" | "success" | "warning" | "error";

interface PageSpinnerProps {
    message: string;
    size?: PageSpinnerSizes;
    color?: PageSpinnerColor;
    className?: string;
    fullPage?: boolean;
    containerClassName?: string;
    showDots?: boolean;
}

export const PageSpinner = ({
    message,
    size = "xl",
    color = "primary",
    className = "",
    fullPage = false,
    containerClassName = "",
    showDots = false,
}: PageSpinnerProps) => {
    const t = useTranslations("page_spinner");
    const baseContainerClasses = "flex items-center justify-center";

    const containerClasses = fullPage
        ? `${baseContainerClasses} min-h-screen ${containerClassName}`
        : `${baseContainerClasses} py-12 ${containerClassName}`;

    return (
        <div className={containerClasses}>
            <div className="text-center flex flex-col items-center gap-2">
                <Spinner size={size} color={color} className={`mx-auto ${className}`} />
                {message && (
                    <Text weight="medium" color="muted" className="mt-4">
                        {message || t("default_message")} {showDots && <LoadingDots />}
                    </Text>
                )}
            </div>
        </div>
    );
};
