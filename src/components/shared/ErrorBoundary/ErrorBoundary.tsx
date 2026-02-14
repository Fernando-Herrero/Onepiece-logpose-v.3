import { t } from "i18next";
import React from "react";

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    // Se llama cuando un componente hijo lanza un error
    static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
        console.log("Error Boundary:", error);
        return { hasError: true };
    }

    // Opcional: loggear el error a un servicio externo
    componentDidCatch(error: Error, info: React.ErrorInfo) {
        // Aquí hacemos lo que queramos con el error. Como enviarlo a herramientas como Sentry, Datadog etc.
        // Estas herramientas son plataformas de pago para trackear los errores de nuestra app en producción.
        console.error("Error capturado por ErrorBoundary:", error, info);
    }

    render() {
        const { hasError } = this.state;
        const { fallback, children } = this.props;

        if (hasError) {
            // Fallback UI configurable
            if (fallback) {
                return fallback;
            }

            return <p>{t ? t("error_boundary.occurred") : "Ha ocurrido un error en esta sección."}</p>;
        }

        return children;
    }
}
