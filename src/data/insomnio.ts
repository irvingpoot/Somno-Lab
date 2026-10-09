/**
 * Cuestionario de insomnio (13 preguntas).
 * Basado en el cuestionario del Laboratorio de Sueño y Neurociencias,
 * Facultad de Psicología, UADY.
 */

export const CTA_URL = '/servicios#contacto';

export const TOTAL_QUESTIONS = 13;
export const MAX_SCORE = 3;
export const SYMPTOMS_REQUIRED = 2;

export interface Question {
    name: string;
    number: number;
    text: string;
}

export const INTRO =
    'A continuación, se enlistan diferentes situaciones relacionadas con el sueño. Indica con Sí o No las que has presentado en el último mes.';

export const SECTION_BASE: Question[] = [
    {
        name: 'q1',
        number: 1,
        text: '¿Has tenido dificultades para comenzar a dormir, mantenerte dormido o despiertas más temprano de lo que quisieras y no puedes volver a dormir?',
    },
    {
        name: 'q2',
        number: 2,
        text: '¿Las dificultades para dormir en la noche ocurren a pesar de tener el lugar y tiempo para hacerlo?',
    },
];

export const SYMPTOMS_TITLE = '¿Has tenido alguno de los siguientes síntomas relacionados con las dificultades para dormir?';

export const SECTION_SYMPTOMS: Question[] = [
    { name: 'q3', number: 3, text: 'Fatiga o cansancio durante el día' },
    { name: 'q4', number: 4, text: 'Problemas de atención, concentración o memoria' },
    { name: 'q5', number: 5, text: 'Disminución del rendimiento académico/laboral' },
    { name: 'q6', number: 6, text: 'Problemas en tus relaciones sociales (familia, amigos, pareja, etc.)' },
    { name: 'q7', number: 7, text: 'Alteraciones del estado de ánimo o irritabilidad' },
    { name: 'q8', number: 8, text: 'Somnolencia diurna (propensión a quedarte dormido en varias situaciones durante el día)' },
    { name: 'q9', number: 9, text: 'Disminución de la motivación, energía o iniciativa' },
    { name: 'q10', number: 10, text: 'Propensión a cometer errores o accidentes al conducir, en el trabajo o escuela' },
    { name: 'q11', number: 11, text: 'Dolor de cabeza, tensión muscular o problemas gastrointestinales' },
    { name: 'q12', number: 12, text: 'Preocupación constante por no poder dormir' },
];

export const SECTION_FREQUENCY: Question[] = [
    { name: 'q13', number: 13, text: '¿Las dificultades para dormir te han ocurrido más de 2 noches a la semana?' },
];

export const ALL_QUESTIONS: Question[] = [...SECTION_BASE, ...SECTION_SYMPTOMS, ...SECTION_FREQUENCY];

export interface Criterion {
    id: 'base' | 'symptoms' | 'frequency';
    title: string;
    description: string;
}

export function evaluate(answers: boolean[]) {
    const base = answers[0] && answers[1];
    const symptomCount = answers.slice(2, 12).filter(Boolean).length;
    const symptoms = symptomCount >= SYMPTOMS_REQUIRED;
    const frequency = answers[12];

    const met = { base, symptoms, frequency };
    const score = [base, symptoms, frequency].filter(Boolean).length;

    return { score, met, symptomCount, outcome: getOutcome(score) };
}

export interface Outcome {
    id: 'probable' | 'sin-indicios';
    label: string;
    headline: string;
    message: string;
    ctaLead: string;
    ctaText: string;
    icon: string;
    soft: string;
    softText: string;
    iconColor: string;
    solid: string;
}

export const OUTCOMES: Outcome[] = [
    {
        id: 'probable',
        label: 'Probable presencia',
        headline: 'Probablemente tienes presencia de insomnio',
        message:
            'Tus respuestas cumplen los tres criterios del cuestionario: dificultades para dormir a pesar de tener el lugar y el tiempo para hacerlo, síntomas relacionados durante el día y episodios que ocurren más de 2 noches a la semana. Una valoración con un especialista en sueño puede confirmarlo y orientarte sobre el tratamiento.',
        ctaLead: 'Agenda una cita con nuestro equipo y revisemos tu caso.',
        ctaText: 'Agendar una cita',
        icon: 'fa-circle-exclamation',
        soft: 'bg-somno/10 border-somno/30',
        softText: 'text-slate-800',
        iconColor: 'text-somno',
        solid: 'bg-somno',
    },
    {
        id: 'sin-indicios',
        label: 'Sin indicios suficientes de insomnio',
        headline: 'Una mala noche no necesariamente es insomnio',
        message:
            'Algunos podemos tener una mala noche de sueño, aunque no necesariamente sean síntomas de insomnio. Se recomienda monitorear tu sueño para descartar algún problema.',
        ctaLead: 'Si las dificultades continúan o te preocupan, puedes pedir una valoración.',
        ctaText: 'Agendar una cita',
        icon: 'fa-circle-check',
        soft: 'bg-somno-light/10 border-somno-light/40',
        softText: 'text-slate-800',
        iconColor: 'text-somno-dark',
        solid: 'bg-somno-light',
    },
];

export function getOutcome(score: number): Outcome {
    return score >= MAX_SCORE ? OUTCOMES[0] : OUTCOMES[1];
}