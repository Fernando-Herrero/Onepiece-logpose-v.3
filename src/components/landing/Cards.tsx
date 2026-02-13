import { forwardRef } from "react";

interface CardsProps {
    title: string;
    text: string;
    className?: string;
}

export const Cards = forwardRef<HTMLElement, CardsProps>(({ title, text, className }: CardsProps, ref) => {
    return (
        <article ref={ref} className={`card bg-gradient-card p-6 ${className} max-w-96`}>
            <h3 className="text-xl font-semibold text-primary/90">{title}</h3>
            <p className="text-muted text-gradient leading-relaxed">{text}</p>
        </article>
    );
});

Cards.displayName = "Cards";
