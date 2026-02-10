import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { courseId, title } = body;
    
    const { error } = await supabase.from('modules').insert([{ course_id: courseId, title, order_index: 99 }]);
    
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { id } = body;
    
    const { error } = await supabase.from('modules').delete().eq('id', id);
    
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
};