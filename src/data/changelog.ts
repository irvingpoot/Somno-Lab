export const currentVersion = "3.7.0";

export const isMajorUpdate = true;

export const updateDate = "21 de Abril del 2026";

type Changes = {
    title: string;
    description: string;
    type: "feature" | "fix" | "style";
}

export const changes: Changes[] = [
    {
        title: "Semaforo de sueño",
        description: "Se agregó el selector de genero para controlar las imagenes dinamicas al momento de mostrar los resultados.",
        type: "feature"
    }
];