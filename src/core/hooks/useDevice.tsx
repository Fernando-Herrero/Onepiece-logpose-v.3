import { useDeviceStore } from "@/src/store/deviceStore";
import { DeviceInfo } from "@/src/types/device.types";

export const useDevice = (): DeviceInfo => {
    const { device } = useDeviceStore();

    const isMobileXs = device === "mobileXs";
    const isMobile = device === "mobile";
    const isTablet = device === "tablet";
    const isTabletXl = device === "tabletXl";
    const isDesktop = device === "desktop" || device === "desktopXl";

    return {
        device,
        isMobileXs,
        isMobile,
        isTablet,
        isTabletXl,
        isDesktop,
    };
};
