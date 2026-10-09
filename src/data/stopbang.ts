export const CTA_URL = '/servicios#contacto';

export const TOTAL_QUESTIONS = 8;
export const SCORE_VALUES = TOTAL_QUESTIONS + 1;

export const ACRONYM = [
    { letra: 'S', texto: 'Snoring — Ronquido' },
    { letra: 'T', texto: 'Tiredness — Cansancio' },
    { letra: 'O', texto: 'Observed apnea — Apnea observada' },
    { letra: 'P', texto: 'Pressure — Presión arterial' },
    { letra: 'B', texto: 'BMI — Índice de masa corporal' },
    { letra: 'A', texto: 'Age — Edad' },
    { letra: 'N', texto: 'Neck — Circunferencia del cuello' },
    { letra: 'G', texto: 'Gender — Género' },
];

export interface Question {
    name: string;
    letter: string;
    text: string;
    imc?: boolean;
}

export const QUESTIONS: Question[] = [
    {
        name: 'p1',
        letter: 'S',
        text: '¿Ronca fuerte (tan fuerte que se escucha a través de puertas cerradas o su pareja lo mueve para que deje de roncar)?',
    },
    {
        name: 'p2',
        letter: 'T',
        text: '¿Se siente con frecuencia cansado, fatigado o somnoliento durante el día (por ejemplo, se ha quedado dormido mientras maneja o habla con alguien)?',
    },
    { name: 'p3', letter: 'O', text: '¿Alguien lo ha visto dejar de respirar o ahogarse mientras duerme?' },
    { name: 'p4', letter: 'P', text: '¿Tiene o está recibiendo tratamiento para la presión arterial alta?' },
    { name: 'p5', letter: 'B', text: '¿Tiene un índice de masa corporal mayor a 35 kg/m²?', imc: true },
    { name: 'p6', letter: 'A', text: '¿Tiene más de 50 años?' },
    {
        name: 'p7',
        letter: 'N',
        text: '¿La circunferencia de su cuello medida a la altura de la manzana de Adán es igual o mayor de 41 cm si es mujer o de 43 cm si es hombre?',
    },
    { name: 'p8', letter: 'G', text: '¿Su género es masculino?' },
];

export interface RiskLevel {
    id: 'bajo' | 'intermedio' | 'alto';
    min: number;
    max: number;
    short: string;
    range: string;
    detail: string;
    label: string;
    titulo: string;
    desc: string;
    nota: string;
    ctaTexto: string;
    icon: string;
    soft: string;
    softText: string;
    softSubtext: string;
    iconColor: string;
    solid: string;
}

export const RISK_LEVELS: RiskLevel[] = [
    {
        id: 'bajo',
        min: 0,
        max: 2,
        short: 'Bajo riesgo',
        range: '0–2',
        detail: 'Sí a 0–2 preguntas',
        label: 'Bajo riesgo de SAOS',
        titulo: 'Bajo riesgo de Apnea Obstructiva del Sueño',
        desc: 'Obtuviste {puntaje} de 8 puntos. Tu puntaje indica un bajo riesgo de Apnea Obstructiva del Sueño: entre 0 y 2 respuestas afirmativas.',
        nota: 'Aunque el riesgo es bajo, si presentas síntomas persistentes de somnolencia o mala calidad del sueño, te invitamos a agendar una consulta. Nuestros especialistas pueden ayudarte a mejorar tu descanso y descartar otras causas.',
        ctaTexto: 'Agendar una consulta',
        icon: 'fa-circle-check',
        soft: 'bg-emerald-50 border-emerald-200',
        softText: 'text-emerald-800',
        softSubtext: 'text-emerald-700',
        iconColor: 'text-emerald-500',
        solid: 'bg-emerald-400',
    },
    {
        id: 'intermedio',
        min: 3,
        max: 4,
        short: 'Riesgo intermedio',
        range: '3–4',
        detail: 'Sí a 3–4 preguntas',
        label: 'Riesgo intermedio de SAOS',
        titulo: 'Riesgo intermedio de Apnea Obstructiva del Sueño',
        desc: 'Obtuviste {puntaje} de 8 puntos. Tu puntaje se encuentra en el rango de riesgo intermedio para Apnea Obstructiva del Sueño: entre 3 y 4 respuestas afirmativas.',
        nota: 'Te recomendamos agendar una consulta con nuestros especialistas para que un médico evalúe estos resultados. Una valoración del sueño puede ayudar a descartar o confirmar la presencia de apnea y orientarte sobre los siguientes pasos.',
        ctaTexto: 'Agendar consulta',
        icon: 'fa-circle-exclamation',
        soft: 'bg-amber-50 border-amber-200',
        softText: 'text-amber-800',
        softSubtext: 'text-amber-700',
        iconColor: 'text-amber-500',
        solid: 'bg-amber-400',
    },
    {
        id: 'alto',
        min: 5,
        max: 8,
        short: 'Alto riesgo',
        range: '5–8',
        detail:
            'Sí a 5–8 preguntas, o ≥2 de las primeras 4 combinado con: género masculino, IMC >35 kg/m², o cuello ≥43 cm (hombre) / 41 cm (mujer)',
        label: 'Alto riesgo de SAOS',
        titulo: 'Riesgo elevado de Apnea Obstructiva del Sueño',
        desc: 'Obtuviste {puntaje} de 8 puntos. Los criterios de calificación indican un alto riesgo de Apnea Obstructiva del Sueño. Esto puede deberse a 5 o más respuestas afirmativas, o a 2 o más respuestas afirmativas en las primeras 4 preguntas combinadas con género masculino, IMC elevado o circunferencia de cuello aumentada.',
        nota: 'Te recomendamos agendar una consulta con nuestros especialistas a la brevedad posible. La apnea del sueño no tratada puede tener consecuencias cardiovasculares y metabólicas importantes, y un estudio del sueño puede confirmar el diagnóstico e iniciar el tratamiento adecuado.',
        ctaTexto: 'Agendar consulta urgente',
        icon: 'fa-triangle-exclamation',
        soft: 'bg-red-50 border-red-200',
        softText: 'text-red-800',
        softSubtext: 'text-red-700',
        iconColor: 'text-red-500',
        solid: 'bg-red-500',
    },
];

/**
 * Criterios de calificación del STOP-BANG:
 * alto riesgo con 5 o más "Sí", o con 2 o más "Sí" en las primeras 4 preguntas
 * combinados con género masculino, IMC > 35 o cuello grande.
 * `answers` es un arreglo de 8 valores (1 = Sí, 0 = No) en el orden p1…p8.
 */
export function classify(answers: number[]) {
    const score = answers.reduce((a, b) => a + b, 0);
    const firstFour = answers.slice(0, 4).reduce((a, b) => a + b, 0);
    const male = answers[7] === 1;
    const highBmi = answers[4] === 1;
    const bigNeck = answers[6] === 1;

    const extendedHigh = firstFour >= 2 && (male || highBmi || bigNeck);
    const high = score >= 5 || extendedHigh;

    const level = high ? RISK_LEVELS[2] : score >= 3 ? RISK_LEVELS[1] : RISK_LEVELS[0];

    return { score, level, combinedOnly: high && score < 5 };
}

export interface ImcInfo {
    cat: string;
    color: string;
    bar: string;
    pct: number;
    bg: string;
    msg: string;
}

export function getImcInfo(imc: number): ImcInfo {
    if (imc < 18.5) {
        return { cat: 'Bajo peso', color: 'text-blue-600', bar: 'bg-blue-400', pct: 15, bg: 'bg-blue-50',
            msg: 'Tu IMC está por debajo del rango normal. Para la pregunta del cuestionario, responde No.' };
    }
    if (imc < 25) {
        return { cat: 'Peso normal', color: 'text-emerald-600', bar: 'bg-emerald-400', pct: 35, bg: 'bg-emerald-50',
            msg: 'Tu IMC está en el rango normal. Para la pregunta del cuestionario, responde No.' };
    }
    if (imc < 30) {
        return { cat: 'Sobrepeso', color: 'text-amber-600', bar: 'bg-amber-400', pct: 55, bg: 'bg-amber-50',
            msg: 'Tu IMC indica sobrepeso, pero es menor a 35. Para la pregunta del cuestionario, responde No.' };
    }
    if (imc < 35) {
        return { cat: 'Obesidad grado I', color: 'text-orange-600', bar: 'bg-orange-400', pct: 72, bg: 'bg-orange-50',
            msg: 'Tu IMC indica obesidad grado I, pero es menor a 35. Para la pregunta del cuestionario, responde No.' };
    }
    return {
        cat: imc < 40 ? 'Obesidad grado II' : 'Obesidad grado III',
        color: 'text-red-600',
        bar: 'bg-red-500',
        pct: Math.min(92, 80 + (imc - 35) * 2),
        bg: 'bg-red-50',
        msg: 'Tu IMC es mayor a 35. Para la pregunta del cuestionario, responde Sí.',
    };
}