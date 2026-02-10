import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, locals }) => {
    // 1. Verificar autenticación
    const { userId } = locals.auth();
    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { courseId } = body;

    if (!courseId) {
        return new Response(JSON.stringify({ error: "Missing courseId" }), { status: 400 });
    }

    // 2. SEGURIDAD: Verificar el precio del curso antes de inscribir
    const { data: course } = await supabase
        .from('courses')
        .select('price')
        .eq('id', courseId)
        .single();

    // Si el curso cuesta dinero, RECHAZAMOS la auto-inscripción
    if (course && course.price > 0) {
        return new Response(JSON.stringify({ error: "Este curso requiere pago manual." }), { status: 403 });
    }

    // 3. Insertar en Supabase (Solo si es gratis)
    const { error } = await supabase
        .from('enrollments')
        .insert([
        { user_id: userId, course_id: courseId }
        ])
        .select();

    if (error && error.code !== '23505') {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};