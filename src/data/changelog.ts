export const currentVersion = "3.8.0";

export const isMajorUpdate = true;

export const updateDate = "21 de Julio del 2026";

type Changes = {
    title: string;
    description: string;
    type: "feature" | "fix" | "style";
}

export const changes: Changes[] = [
    {
        title: "Seguimiento de hábitos de sueño",
        description: "Ahora los pacientes pueden contestar un diario de hábitos de sueño a través de un enlace que se genera en la sección de hábitos del panel de administración.",
        type: "feature"
    }
];