"use client";

import { useAuthStore } from "@/src/store/authStore";
import { initializeDeviceListener } from "@/src/store/deviceStore";
import { useEffect } from "react";

export function AppInitializer() {
    const { initializeAuth } = useAuthStore();

    useEffect(() => {
        initializeAuth();

        const cleanupDevice = initializeDeviceListener();

        return cleanupDevice?.();
    }, [initializeAuth]);

    return null;
}
