import type { APIRoute } from "astro";
import { supabase } from "../../lib/supabase";
import { isUserAdmin } from "../../lib/isAdmin";

// 1. POST: CREAR UN NUEVO CURSO
export const POST: APIRoute = async ({ request, locals }) => {
    const { userId } = locals.auth();
    if (!userId || !isUserAdmin(userId)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    // Extraemos los datos que nos mandan
    const { title, slug, price, description, level, category, image_url } = body;

    const { data, error } = await supabase
        .from('courses')
        .insert([
        { 
            title, 
            slug, 
            price: parseFloat(price) || 0,
            description,
            level,
            category,
            image_url,
            is_published: false // Siempre nace como borrador
        }
        ])
        .select()
        .single();

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true, data }), { status: 200 });
};

// 2. PUT: ACTUALIZAR UN CURSO EXISTENTE
export const PUT: APIRoute = async ({ request, locals }) => {
    const { userId } = locals.auth();
    if (!userId || !isUserAdmin(userId)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
        return new Response(JSON.stringify({ error: "Faltan datos" }), { status: 400 });
    }
    
    const { error } = await supabase
        .from('courses')
        .update(updates)
        .eq('id', id);
    
    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};

// 3. DELETE: BORRAR UN CURSO (Opcional, pero útil tenerlo)
export const DELETE: APIRoute = async ({ request, locals }) => {
    const { userId } = locals.auth();
    if (!userId || !isUserAdmin(userId)) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
    }

    const body = await request.json();
    const { id } = body;

    const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
};