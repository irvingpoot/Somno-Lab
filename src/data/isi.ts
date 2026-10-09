/**
 * Índice de Gravedad del Insomnio (ISI)
 * Fuente: Guía de Práctica Clínica para el manejo de pacientes con insomnio
 * en Atención Primaria — Anexo 6, Instrumentos de medida del insomnio.
 */

export const CTA_URL = '/servicios#contacto';
export const MAX_SCORE = 28;
export const TOTAL_ITEMS = 7;
export const SCORE_VALUES = MAX_SCORE + 1;

export interface IsiItem {
    name: string;
    label: string;
}

export const SEVERITY_LABELS = ['Nada', 'Leve', 'Moderado', 'Grave', 'Muy grave'];
export const INTENSITY_LABELS = ['Nada', 'Un poco', 'Algo', 'Mucho', 'Muchísimo'];
export const SATISFACTION_LABELS = ['Muy satisfecho', '', 'Moderadamente satisfecho', '', 'Muy insatisfecho'];

export const SEVERITY_ITEMS: IsiItem[] = [
    { name: 'q1a', label: 'Dificultad para quedarse dormido/a' },
    { name: 'q1b', label: 'Dificultad para permanecer dormido/a' },
    { name: 'q1c', label: 'Despertarse muy temprano' },
];

export interface IsiBand {
    id: 'ausente' | 'subclinico' | 'moderado' | 'grave';
    min: number;
    max: number;
    short: string;
    headline: string;
    recommendation: string;
    tips: string[];
    ctaLead: string;
    icon: string;
    soft: string;
    softText: string;
    softSubtext: string;
    iconColor: string;
    solid: string;
}

export const BANDS: IsiBand[] = [
    {
        id: 'ausente',
        min: 0,
        max: 7,
        short: 'Ausencia de insomnio clínico',
        headline: 'Tu sueño no muestra señales de insomnio clínico',
        recommendation:
            'Tu puntuación no indica un problema de insomnio clínicamente significativo. Conserva los hábitos que te funcionan y presta atención si algo cambia con el tiempo. Si aun así sientes que tu descanso no es reparador, podemos revisarlo contigo.',
        tips: [
            'Mantén horarios regulares para acostarte y levantarte, también en fin de semana.',
            'Evita cafeína, alcohol y pantallas en las horas previas a dormir.',
            'Procura un dormitorio oscuro, fresco y silencioso.',
        ],
        ctaLead: '¿Tienes dudas sobre tu descanso? Una valoración puede darte tranquilidad.',
        icon: 'fa-circle-check',
        soft: 'bg-emerald-50 border-emerald-200',
        softText: 'text-emerald-800',
        softSubtext: 'text-emerald-700',
        iconColor: 'text-emerald-500',
        solid: 'bg-emerald-400',
    },
    {
        id: 'subclinico',
        min: 8,
        max: 14,
        short: 'Insomnio subclínico',
        headline: 'Hay señales tempranas de que tu sueño se está viendo afectado',
        recommendation:
            'Tu puntuación indica insomnio subclínico: tienes síntomas, pero todavía por debajo del nivel clínico. Es un buen momento para ajustar tus hábitos de sueño. Si los síntomas continúan por más de unas semanas, una valoración a tiempo puede evitar que avancen.',
        tips: [
            'Registra tu horario de sueño durante dos semanas para identificar patrones.',
            'Reduce la cafeína por la tarde y evita las siestas largas.',
            'Crea una rutina relajante de 30 minutos antes de acostarte.',
        ],
        ctaLead: 'Si los síntomas persisten, agenda una valoración antes de que se agraven.',
        icon: 'fa-circle-info',
        soft: 'bg-amber-50 border-amber-200',
        softText: 'text-amber-800',
        softSubtext: 'text-amber-700',
        iconColor: 'text-amber-500',
        solid: 'bg-amber-400',
    },
    {
        id: 'moderado',
        min: 15,
        max: 21,
        short: 'Insomnio clínico moderado',
        headline: 'Tu puntuación sugiere insomnio clínico de intensidad moderada',
        recommendation:
            'Te recomendamos una valoración con un especialista en medicina del sueño para identificar las causas de tu insomnio y definir un tratamiento adecuado a tu caso. Atenderlo ahora suele facilitar la recuperación de un sueño reparador.',
        tips: [
            'Anota desde cuándo tienes el problema y qué lo empeora o lo mejora.',
            'Evita automedicarte con somníferos o remedios sin supervisión.',
            'Lleva a tu cita este resultado y tu registro de sueño.',
        ],
        ctaLead: 'Agenda tu valoración con nuestro equipo especializado en sueño.',
        icon: 'fa-circle-exclamation',
        soft: 'bg-orange-50 border-orange-200',
        softText: 'text-orange-800',
        softSubtext: 'text-orange-700',
        iconColor: 'text-orange-500',
        solid: 'bg-orange-500',
    },
    {
        id: 'grave',
        min: 22,
        max: 28,
        short: 'Insomnio clínico grave',
        headline: 'Tu puntuación sugiere insomnio clínico grave',
        recommendation:
            'Te recomendamos agendar una valoración con un especialista lo antes posible. Un insomnio de esta intensidad suele afectar el estado de ánimo, la concentración y la salud en general, y un tratamiento oportuno puede mejorar de forma importante tu descanso y tu calidad de vida.',
        tips: [
            'Evita manejar o usar maquinaria si sientes somnolencia durante el día.',
            'No tomes somníferos sin indicación médica.',
            'Si además notas tristeza persistente o ansiedad intensa, menciónalo en tu consulta.',
        ],
        ctaLead: 'No esperes más: agenda tu cita y recibe orientación especializada.',
        icon: 'fa-triangle-exclamation',
        soft: 'bg-red-50 border-red-200',
        softText: 'text-red-800',
        softSubtext: 'text-red-700',
        iconColor: 'text-red-500',
        solid: 'bg-red-500',
    },
];

export function getBand(score: number): IsiBand {
    return BANDS.find((b) => score >= b.min && score <= b.max) ?? BANDS[BANDS.length - 1];
}