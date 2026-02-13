import type { ReactNode } from "react";

interface ContainerProps {
    children: ReactNode;
    className?: string;
}

export const Container = ({ children, className = "" }: ContainerProps) => {
    return <div className={`max-w-container mx-auto px-5 ${className}`}>{children}</div>;
};
