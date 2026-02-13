import { Cards } from "@/src/components/landing/Cards";
import { Container } from "@/src/components/landing/Container";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useMemo, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const BackUpPage = () => {
    const t = useTranslations("items_back_up");

    const cardsRef = useRef<HTMLElement[]>([]);

    const addToRefs = useCallback((element: HTMLElement | null) => {
        if (element && !cardsRef.current.includes(element)) {
            cardsRef.current.push(element);
        }
    }, []);

    useEffect(() => {
        cardsRef.current = [];
    }, []);

    const memoItems = useMemo(() => {
        const items = [
            { title: t("title_what"), text: t("text_what") },
            { title: t("title_dashboard"), text: t("text_dashboard") },
            { title: t("title_social"), text: t("text_social") },
            { title: t("title_content"), text: t("text_content") },
            { title: t("title_gamification"), text: t("text_gamification") },
            { title: t("title_mobile"), text: t("text_mobile") },
        ];

        return items.map(({ title, text }, index) => (
            <Cards key={`${title}-${index}`} title={title} text={text} ref={addToRefs} />
        ));
    }, [addToRefs, t]);

    useEffect(() => {
        cardsRef.current.forEach((card, index) => {
            gsap.fromTo(
                card,
                { opacity: 0, y: 120, scale: 0.6 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.6,
                    delay: index * 0.05,
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 95%",
                    },
                }
            );
        });
    }, []);

    return (
        <Container className="grid grid-cols-1 justify-items-center gap-6 lg:grid-cols-2">
            {memoItems}
        </Container>
    );
};
