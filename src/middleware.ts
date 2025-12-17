import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";

const isProtectedRoute = createRouteMatcher(["/lista", "/registro", "/paciente/:id", "/editar-cita/:id", "/citas", "/nueva-cita", "/404"]);

export const onRequest = clerkMiddleware((auth, context) => {
    const { userId } = auth()

    if (isProtectedRoute(context.request) && !userId) {
        const returnUrl = context.url.href;
        
        // 2. La adjuntamos como parámetro 'redirect_url'
        return context.redirect(`/login?redirect_url=${encodeURIComponent(returnUrl)}`)
    }

    if (userId && context.url.pathname === "/login") {
        return context.redirect("/citas");
    }
});