import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware({
    locales: ["es", "en", "ja"],
    defaultLocale: "es",
});

export default function middleware(request: NextRequest) {
    // Leer idioma guardado de cookies
    const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;

    // Si hay idioma guardado y no está en la URL, redirigir
    if (savedLocale && !request.nextUrl.pathname.startsWith(`/${savedLocale}`)) {
        const newUrl = new URL(`/${savedLocale}${request.nextUrl.pathname}`, request.url);
        return NextResponse.redirect(newUrl);
    }

    return intlMiddleware(request);
}

export const config = {
    matcher: ["/", "/(es|en|ja)/:path*"],
};
