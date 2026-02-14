import { ButtonSec } from "@/components/ErrorBoundary/ButtonSec";
import { Heading } from "@/components/ErrorBoundary/Heading";
import { Text } from "@/components/ErrorBoundary/Text";
import { useTranslate } from "@/translations/useTranslate";
import { memo, useMemo, type ReactNode } from "react";

interface PageErrorProps {
    title?: string;
    message?: string;
    icon?: ReactNode;
    onRetry?: () => void;
    noCenter?: boolean;
    retryText?: string;
    className?: string;
    containerClassName?: string;
    fullPage?: boolean;
}

export const PageError = memo(
    ({
        title,
        message,
        icon = "⚠️",
        onRetry,
        noCenter,
        retryText,
        className = "",
        containerClassName = "",
        fullPage = false,
    }: PageErrorProps) => {
        const { t } = useTranslate();
        const containerClasses = useMemo(() => {
            const baseContainerClasses = noCenter ? "flex" : "flex items-center justify-center";
            return fullPage
                ? `${baseContainerClasses} min-h-screen ${containerClassName}`
                : `${baseContainerClasses} py-12 ${containerClassName}`;
        }, [fullPage, containerClassName]);

        return (
            <div className={containerClasses}>
                <div className={`flex flex-col items-center ${className}`}>
                    <Text size="4xl" className="mb-4" color="danger" as="div">
                        {icon}
                    </Text>

                    <Heading level={3} size="lg" color="danger" className="mb-2">
                        {title || t("pageError.default_title")}
                    </Heading>

                    {message && (
                        <Text size="sm" color="muted" align="center" className="mb-6 max-w-md mx-auto">
                            {message}
                        </Text>
                    )}

                    {onRetry && (
                        <ButtonSec variant="danger" onClick={onRetry}>
                            {retryText || t("pageError.retry_text")}
                        </ButtonSec>
                    )}

                    <ButtonSec className="mt-4" onClick={() => (window.location.href = "/")}>
                        {t("pageError.back_to_home")}
                    </ButtonSec>
                </div>
            </div>
        );
    }
);
