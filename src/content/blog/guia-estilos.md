---
id: "demo-markdown"
titulo: "Guía de Estilos: Elementos Markdown"
categoria: "Tecnología"
autor: "SomnoLab Dev"
fecha: "20 Dic 2025"
tiempo: "Manual de Uso"
img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200"
destacado: false
resumen: "Este es un artículo de demostración para visualizar todos los componentes tipográficos disponibles: listas, citas, tablas, código, imágenes y jerarquía de textos."
---

Este artículo existe para demostrar las capacidades de **Tailwind Typography** en nuestro blog. Aquí podrás ver cómo se renderizan los diferentes elementos HTML generados a partir de Markdown estándar.

## Tipografía Básica

Podemos resaltar texto de varias formas. Lo más común es usar **negritas para conceptos clave** o *cursivas para énfasis sutil*. También podemos tachar ~~información obsoleta~~ o resaltar `código en línea` para términos técnicos.

Si necesitas hacer una cita o referencia a un libro, se verá así: "El sueño es la cadena de oro que une salud y cuerpo".

---

## Jerarquía de Encabezados (H2)

Los encabezados son vitales para el SEO y la legibilidad. Este es un H2.

### Subtítulo de Sección (H3)
Este es un H3, ideal para dividir puntos dentro de una sección principal.

#### Encabezado Menor (H4)
Rara vez llegaremos a este nivel, pero está disponible si el artículo es muy denso y técnico.

---

## Listas y Estructura

Las listas son fundamentales para enumerar pasos o ingredientes.

### Lista Desordenada (Bullets)
* **Fase 1:** Adormecimiento (N1).
* **Fase 2:** Sueño ligero (N2).
* **Fase 3:** Sueño profundo (N3) - *Aquí ocurre la reparación física*.
* **Fase REM:** Movimiento ocular rápido - *Aquí soñamos*.

### Lista Ordenada (Pasos)
1.  Apagar dispositivos electrónicos 1 hora antes.
2.  Bajar la temperatura de la habitación.
3.  Leer un libro físico.
4.  Dormir.

### Lista de Tareas (Checklist)
* [x] Instalar Astro
* [x] Configurar Tailwind
* [ ] Dormir 8 horas

---

## Citas Destacadas (Blockquotes)

Cuando quieras resaltar una frase célebre o un dato médico importante, usa el signo `>`:

> "La privación de sueño es una epidemia de salud pública no declarada que afecta a todas las naciones industrializadas."
>
> — **Matthew Walker**, *Por qué dormimos*

---

## Tablas de Datos

Las tablas son excelentes para comparar información técnica.

| Fase del Sueño | Ondas Cerebrales | Función Principal |
| :--- | :--- | :--- |
| **N1** | Theta | Transición vigilia-sueño |
| **N2** | Husos de sueño | Consolidación memoria motora |
| **N3 (Profundo)** | Delta | Reparación de tejidos y GH |
| **REM** | Mixtas | Procesamiento emocional |

---

## Bloques de Código

Si alguna vez escribimos un artículo técnico para otros doctores o desarrolladores, así se ve el código:

```javascript
// Función para calcular ciclos de sueño
function calcularDespertar(horaDormir) {
    const ciclo = 90; // minutos
    const ciclosRecomendados = 5;
    
    return horaDormir + (ciclo * ciclosRecomendados);
}

console.log("Deberías despertar en 7.5 horas");
```

## Imágenes Integradas

Las imágenes dentro del post se redondean automáticamente y tienen una sombra suave.

![Diagrama de ejemplo sobre el ritmo circadiano](https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?q=80&w=1200)
*Pie de foto: Representación artística del ritmo circadiano.*

## Enlaces y Referencias

Finalmente, así es como se ven los [enlaces externos a fuentes médicas](https://www.sleepfoundation.org) o enlaces internos a [nuestros servicios](/citas).