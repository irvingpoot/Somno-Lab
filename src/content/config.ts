import { defineCollection, z } from 'astro:content';

const blogCollection = defineCollection({
    type: 'content',
    schema: z.object({
        id: z.string(),
        titulo: z.string(),
        categoria: z.string(),
        autor: z.string(),
        fecha: z.string(),
        tiempo: z.string(),
        img: z.string(),
        resumen: z.string(),
        destacado: z.boolean().default(false),
    }),
});

export const collections = {
    'blog': blogCollection,
};