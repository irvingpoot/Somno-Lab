import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";

export const POST: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { moduleId, title, videoUrl, duration, isFree } = body;
    
    const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '') + '-' + Date.now().toString().slice(-4);

    const { error } = await supabase.from('lessons').insert([{
        module_id: moduleId,
        title,
        video_url: videoUrl,
        duration,
        is_free_preview: isFree,
        slug
    }]);
    
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
};

export const DELETE: APIRoute = async ({ request }) => {
    const body = await request.json();
    const { id } = body;
    
    const { error } = await supabase.from('lessons').delete().eq('id', id);
    
    if (error) return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
};