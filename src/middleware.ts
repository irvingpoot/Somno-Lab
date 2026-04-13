/**
 * @file middleware.ts
 * @description Middleware de seguridad y control de sesiones (Clerk).
 * * FUNCIÓN PRINCIPAL:
 * - Intercepta todas las solicitudes al servidor (SSR) antes de renderizar la página.
 * * LÓGICA DE PROTECCIÓN:
 * 1. Rutas Protegidas (`isProtectedRoute`): Define la lista blanca de rutas que requieren sesión activa
 * (ej: /dashboard, /lista, /registro). Si no hay usuario, redirige al inicio (/).
 * 2. Redirección Inversa: Si un usuario YA logueado intenta entrar explícitamente a `/login`
 * (o la landing page de login), lo redirige automáticamente al `/dashboard` para mejorar la UX.
 */

import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher([
    '/admin(.*)',
]);

export const onRequest = clerkMiddleware((auth, context) => {
    const { userId } = auth()

    if (isProtectedRoute(context.request) && !userId) {
        return context.redirect("/login")
    }

    if (userId && context.url.pathname === "/login") {
        return context.redirect("/admin/dashboard");
    }
});