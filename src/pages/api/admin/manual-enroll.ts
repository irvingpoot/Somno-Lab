import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";
import { isUserAdmin } from "../../../lib/isAdmin";

export const POST: APIRoute = async ({ request, locals }) => {
    // 1. Seguridad: Solo Admin
    const { userId } = locals.auth();
    if (!userId || !isUserAdmin(userId)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { targetUserId, courseId } = body; // ID del alumno y del curso

    if (!targetUserId || !courseId) {
        return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }

    // 2. Inscribir forzosamente (sin importar precio)
    const { error } = await supabase
        .from('enrollments')
        .insert([
        { user_id: targetUserId, course_id: courseId }
        ]);

    if (error) {
        // Ignoramos error de duplicado (ya estaba inscrito)
        if (error.code === '23505') {
            return new Response(JSON.stringify({ success: true, message: "Usuario ya estaba inscrito" }), { status: 200 });
        }
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};