import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request, locals }) => {
    const { userId } = locals.auth();
    if (!userId) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { lessonId } = body;

    if (!lessonId) {
        return new Response(JSON.stringify({ error: "Missing lessonId" }), { status: 400 });
    }

    // Insertamos o actualizamos (Upsert) el progreso
    const { error } = await supabase
        .from('progress')
        .upsert(
            { 
                user_id: userId, 
                lesson_id: lessonId, 
                is_completed: true,
                last_updated: new Date()
            },
            { onConflict: 'user_id, lesson_id' }
        );

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};