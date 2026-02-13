"use client";

import { DeviceType } from "@/src/types/device.types";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { BackUpPage } from "@/src/components/landing/BackUpPage";
import { useDevice } from "@/src/hooks/useDevice";

gsap.registerPlugin(ScrollTrigger);

const getIconSize = (device: DeviceType): number => {
    const sizeMap: Record<DeviceType, number> = {
        mobileXs: 12,
        mobile: 16,
        tablet: 20,
        tabletXl: 24,
        desktop: 24,
        desktopXl: 28,
    };

    return sizeMap[device] || 16;
};

const maskMap: Record<DeviceType, string> = {
    mobileXs: "30vh",
    mobile: "30vh",
    tablet: "35vh",
    tabletXl: "40vh",
    desktop: "40vh",
    desktopXl: "40vh",
} as const;

const subTitle: Record<DeviceType, string> = {
    mobileXs: "76vh",
    mobile: "59vh",
    tablet: "60vh",
    tabletXl: "62vh",
    desktop: "63vh",
    desktopXl: "64vh",
} as const;

const heightDevice: Record<DeviceType, string> = {
    mobileXs: "h-[400dvh]",
    mobile: "h-[300dvh]",
    tablet: "h-[270dvh]",
    tabletXl: "h-[270dvh]",
    desktop: "h-[200dvh]",
    desktopXl: "h-[280dvh]",
} as const;

export default function Home() {
    const { isMobileXs, isMobile, isTablet, device } = useDevice();

    const heroImgRef = useRef<HTMLPictureElement>(null);
    const logoMask = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const contentRef = useRef<HTMLElement>(null);

    const heightContainer = heightDevice[device];
    const maskSettings = maskMap[device] || maskMap["tabletXl"];
    const subtitleSettings = subTitle[device];

    const bgImage =
        isMobile || isMobileXs || isTablet
            ? "/images/backgrounds/home-mobile-bgMask.webp"
            : "/images/backgrounds/home-bgMask.avif";

    const iconSize = getIconSize(device);

    useEffect(() => {
        const tl = gsap.timeline({
            ease: "power2.out",
            scrollTrigger: {
                scrub: 1,
                trigger: document.body,
                start: "top top",
                end: "+=500",
            },
        });

        gsap.set(logoMask.current, {
            maskSize: "5500vh",
            maskPosition: "44%  -1600vh",
        });

        gsap.set(titleRef.current, {
            opacity: 0,
            y: subtitleSettings,
            x: "55%",
        });

        gsap.set(contentRef.current, {
            opacity: 0,
            y: "100vh",
        });

        tl.to(
            logoMask.current,
            {
                maskSize: maskSettings,
                maskPosition: "50% 10vh",
                duration: 1,
                ease: "power1.inOut",
            },
            0.01
        )
            .to(
                titleRef.current,
                {
                    opacity: 1,
                    y: subtitleSettings,
                    x: "55%",
                    duration: 1,
                    ease: "power2.out",
                },
                1.5
            )
            .to(
                heroImgRef.current,
                {
                    scale: 1,
                    transformOrigin: "center center",
                },
                "<"
            )
            .to(
                contentRef.current,
                {
                    opacity: 1,
                    y: "80vh",
                    ease: "power2.out",
                },
                "<"
            )
            .to(
                heroImgRef.current,
                {
                    opacity: 0,
                },
                1.2
            )
            .to(
                logoMask.current,
                {
                    maskPosition: "50% -40vh",
                    ease: "power1.inOut",
                },
                2
            )
            .to(
                titleRef.current,
                {
                    opacity: 0,
                    ease: "power2.out",
                },
                2
            );

        return () => {
            tl.kill();
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        };
    }, [maskSettings, subtitleSettings]);

    return (
        <div className={heightContainer} suppressHydrationWarning>
            <section ref={logoMask} className="fixed top-0 w-full h-screen logo-mask">
                <picture ref={heroImgRef} className="w-full h-screen overflow-hidden fixed scale-120">
                    <img
                        className="w-full h-full object-cover"
                        src={bgImage}
                        alt="Crew Straw Hat"
                        suppressHydrationWarning
                    />
                </picture>

                <div className="absolute z-10 bottom-30 left-[50%] -translate-x-1/2 bg-gradient-card p-4 rounded-xl text-center animate-bounce perfect-center">
                    <p className="text-4xl font-family-pirate">SCROLL</p>
                    <Image
                        className="mx-auto"
                        src="/icons/down-arrow.svg"
                        alt="icon down arrow"
                        width={iconSize}
                        height={iconSize}
                    />
                </div>
            </section>

            <h2 ref={titleRef} className="title-glow text-subtitle">
                LogPose
            </h2>

            <section ref={contentRef} className="pt-30">
                <BackUpPage />
            </section>
        </div>
    );
}
