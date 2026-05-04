/**
 * @file solicitudes.ts
 * @description Endpoint para recibir solicitudes de contacto del formulario público.
 * Aplica validación estricta, sanitización y rate-limit básico por IP.
 *
 * POST /api/solicitudes
 * Body: { nombre, motivo, servicio, telefono?, correo? }
 */

import type { APIRoute } from "astro";
import { createClient } from "@supabase/supabase-js";


const MAX_NOMBRE  = 100;
const MAX_MOTIVO  = 1000;
const MAX_SERVICIO = 60;
const MAX_TELEFONO = 20;
const MAX_CORREO   = 254;

const SERVICIOS_VALIDOS = ["insomnio", "apnea", "ritmo", "parasomnias"];

const RE_NOMBRE   = /^[\p{L}\p{M}'\- ]{2,100}$/u;
const RE_TELEFONO = /^\+?[0-9()\- ]{7,20}$/;
const RE_CORREO   = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ipHits = new Map<string, { count: number; ts: number }>();
const RATE_LIMIT  = 5;
const RATE_WINDOW = 60_000;

function isRateLimited(ip: string): boolean {
    const now  = Date.now();
    const rec  = ipHits.get(ip);

    if (!rec || now - rec.ts > RATE_WINDOW) {
        ipHits.set(ip, { count: 1, ts: now });
        return false;
    }
    rec.count++;
    return rec.count > RATE_LIMIT;
}

function errorResponse(msg: string, status = 400) {
    return new Response(JSON.stringify({ ok: false, error: msg }), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {

    const ip = clientAddress ?? "unknown";
    if (isRateLimited(ip)) {
        return errorResponse("Demasiadas solicitudes. Intenta en un momento.", 429);
    }

    const ct = request.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) {
        return errorResponse("Formato no soportado.", 415);
    }

    const contentLength = Number(request.headers.get("content-length") ?? "0");
    if (contentLength > 16_384) {
        return errorResponse("Payload demasiado grande.", 413);
    }

    let body: Record<string, unknown>;
    try {
        body = await request.json();
    } catch {
        return errorResponse("JSON inválido.");
    }

    const nombre   = String(body.nombre   ?? "").trim();
    const motivo   = String(body.motivo   ?? "").trim();
    const servicio = String(body.servicio ?? "").trim().toLowerCase();
    const telefono = String(body.telefono ?? "").trim();
    const correo   = String(body.correo   ?? "").trim().toLowerCase();

    if (!nombre) return errorResponse("El nombre es obligatorio.");
    if (nombre.length > MAX_NOMBRE)    return errorResponse("Nombre demasiado largo.");
    if (!RE_NOMBRE.test(nombre))       return errorResponse("El nombre contiene caracteres no válidos.");

    if (!motivo) return errorResponse("El motivo es obligatorio.");
    if (motivo.length < 10) return errorResponse("El motivo debe ser más descriptivo (mínimo 10 caracteres).");
    if (motivo.length > MAX_MOTIVO) return errorResponse("El motivo excede el límite de caracteres.");

    if (!servicio) return errorResponse("Debes seleccionar un servicio.");
    if (!SERVICIOS_VALIDOS.includes(servicio)) return errorResponse("Servicio no reconocido.");

    const tieneTelefono = telefono.length > 0;
    const tieneCorreo   = correo.length > 0;

    if (!tieneTelefono && !tieneCorreo) {
        return errorResponse("Debes proporcionar al menos un medio de contacto (teléfono o correo).");
    }

    if (tieneTelefono) {
        if (telefono.length > MAX_TELEFONO) return errorResponse("Teléfono demasiado largo.");
        if (!RE_TELEFONO.test(telefono))    return errorResponse("El teléfono contiene caracteres no válidos.");
    }

    if (tieneCorreo) {
        if (correo.length > MAX_CORREO)  return errorResponse("Correo demasiado largo.");
        if (!RE_CORREO.test(correo))     return errorResponse("El formato del correo no es válido.");
    }

    const supabase = createClient(
        import.meta.env.PUBLIC_SUPABASE_URL,
        import.meta.env.SUPABASE_KEY
    );

    const { error } = await supabase.from("solicitudes").insert({
        nombre,
        motivo,
        servicio,
        telefono: tieneTelefono ? telefono : null,
        correo:   tieneCorreo   ? correo   : null,
        ip_origen: ip !== "unknown" ? ip : null,
    });

    if (error) {
        console.error("[solicitudes] Supabase error:", error.message);
        return errorResponse("No se pudo registrar tu solicitud. Inténtalo de nuevo.", 500);
    }

    return new Response(
        JSON.stringify({ ok: true, mensaje: "Solicitud registrada correctamente." }),
        { status: 201, headers: { "Content-Type": "application/json" } }
    );
};