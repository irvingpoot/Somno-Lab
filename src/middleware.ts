import { clerkMiddleware, createRouteMatcher } from "@clerk/astro/server";
import { isUserAdmin } from "./lib/isAdmin";

// 1. Definir rutas protegidas
const isProtectedRoute = createRouteMatcher(["/dashboard(.*)", "/admin(.*)", "/mis-cursos(.*)", "/aula(.*)", "/lista", "/registro", "/paciente/:id", "/editar-cita/:id", "/citas", "/nueva-cita", "/gestion-eventos"]);

// 2. Definir rutas SOLO para Admin
const isAdminRoute = createRouteMatcher(["/admin(.*)", "/dashboard(.*)", "/lista", "/registro", "/paciente/:id", "/editar-cita/:id", "/citas", "/nueva-cita", "/gestion-eventos"]);

export const onRequest = clerkMiddleware((auth, context, next) => {
    const { userId, redirectToSignIn } = auth();

    if (!userId && isProtectedRoute(context.request)) {
        return redirectToSignIn();
    }

    if (userId && isAdminRoute(context.request)) {
        // Usamos la función auxiliar que creamos
        if (!isUserAdmin(userId)) {
            return Response.redirect(new URL('/mis-cursos', context.request.url));
        }
    }
    
    return next();
});