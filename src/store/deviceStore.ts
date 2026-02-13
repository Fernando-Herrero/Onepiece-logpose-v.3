import { DeviceType } from "@/src/types/device.types";
import { create } from "zustand";

interface DeviceState {
    device: DeviceType;
    setDevice: (device: DeviceType) => void;
}

const getDeviceFromWidth = (w: number): DeviceType => {
    if (w >= 1280) return "desktopXl";
    if (w >= 1024) return "desktop";
    if (w >= 768) return "tabletXl";
    if (w >= 550) return "tablet";
    if (w >= 376) return "mobile";
    return "mobileXs";
};

export const useDeviceStore = create<DeviceState>((set) => ({
    device: "desktop",
    setDevice: (device) => set({ device }),
}));

export const initializeDeviceListener = () => {
    if (typeof window === "undefined") return;

    const updateDevice = () => {
        const newDevice = getDeviceFromWidth(window.innerWidth);
        useDeviceStore.setState({ device: newDevice });
    };

    updateDevice();

    window.addEventListener("resize", updateDevice);

    return () => window.removeEventListener("resize", updateDevice);
};
