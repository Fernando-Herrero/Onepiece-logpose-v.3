import { Cards } from "@/landing/components/ui/Cards";
import { Container } from "@/landing/components/ui/Container";
import { useTranslate } from "@/translations/useTranslate";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useMemo, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const BackUpPage = () => {
    const { t } = useTranslate();

    const items = [
        {
            title: t("items_back_up.title_what"),
            text: t("items_back_up.text_what"),
        },
        {
            title: t("items_back_up.title_dashboard"),
            text: t("items_back_up.text_dashboard"),
        },
        {
            title: t("items_back_up.title_social"),
            text: t("items_back_up.text_social"),
        },
        {
            title: t("items_back_up.title_content"),
            text: t("items_back_up.text_content"),
        },
        {
            title: t("items_back_up.title_gamification"),
            text: t("items_back_up.text_gamification"),
        },
        {
            title: t("items_back_up.title_mobile"),
            text: t("items_back_up.text_mobile"),
        },
    ];

    const cardsRef = useRef<HTMLElement[]>([]);
    cardsRef.current = [];

    const addToRefs = useCallback((element: HTMLElement | null) => {
        if (element && !cardsRef.current.includes(element)) {
            cardsRef.current.push(element);
        }
    }, []);

    const memoItems = useMemo(
        () =>
            items.map(({ title, text }, index) => (
                <Cards key={`${title}-${index}`} title={title} text={text} ref={addToRefs} />
            )),
        [addToRefs]
    );

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
