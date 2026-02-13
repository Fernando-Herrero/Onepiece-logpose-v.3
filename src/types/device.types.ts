export type DeviceType = "mobileXs" | "mobile" | "tablet" | "tabletXl" | "desktop" | "desktopXl";

export interface DeviceInfo {
    device: DeviceType;
    isMobileXs: boolean;
    isMobile: boolean;
    isTablet: boolean;
    isTabletXl: boolean;
    isDesktop: boolean;
}

export type DeviceContextType = {
    device: DeviceType;
};
