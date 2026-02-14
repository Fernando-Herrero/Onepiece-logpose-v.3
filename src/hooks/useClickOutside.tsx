import { useEffect, useRef } from "react";

type UseClickOutsideCallback = () => void;

export const useClickOutside = <T extends HTMLElement>(
    callback: UseClickOutsideCallback,
    isActive: boolean = true
) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        if (!isActive) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback();
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [callback, isActive]);

    return ref;
};
