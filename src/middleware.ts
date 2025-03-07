import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Proteger solo rutas que comienzan con `/account`
    if (pathname.startsWith("/account")) {
        const token = req.cookies.get("token"); // Obtener el token de autenticación

        if (!token) {
            return NextResponse.redirect(new URL("/", req.url)); // Redirige a login si no hay sesión
        }
    }

    return NextResponse.next(); // Continuar con la petición
}