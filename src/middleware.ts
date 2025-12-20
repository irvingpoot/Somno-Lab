import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/lista", "/registro", "/paciente/:id", "/editar-cita/:id", "/citas", "/nueva-cita", "/404", "/gestion-eventos", "/dashboard"]);

export const onRequest = clerkMiddleware((auth, context) => {
    const { userId } = auth()

    if (isProtectedRoute(context.request) && !userId) {
        const returnUrl = context.url.href;
        
        return context.redirect(`/login?redirect_url=${encodeURIComponent(returnUrl)}`)
    }

    if (userId && context.url.pathname === "/login") {
        return context.redirect("/citas");
    }
});