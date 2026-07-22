import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const supabase = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.SUPABASE_KEY
    );

    try {
        const body = await request.json();
        const { token, semanas } = body;

        if (!token || !semanas) {
            return new Response(JSON.stringify({ ok: false, error: "Datos incompletos" }), { status: 400 });
        }

        const { data, error } = await supabase.rpc("guardar_habitos_seguro", {
            token_input: token,
            semanas_input: semanas
        });

        if (error || data !== true) {
            return new Response(JSON.stringify({ ok: false, error: error?.message || "No se pudo guardar" }), { status: 400 });
        }

        return new Response(JSON.stringify({ ok: true }), { status: 200 });

    } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: "Error inesperado" }), { status: 500 });
    }
};