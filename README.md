# SomnoLab

Plataforma web para clínica de medicina del sueño. Gestión integral de pacientes, citas, cuestionarios clínicos y reportes, con panel administrativo completo.

**[somno-lab.vercel.app](https://somno-lab.vercel.app)**

---

## Stack

| Capa | Tecnología |
|---|---|
| Framework | [Astro 5](https://astro.build) — modo SSR |
| Estilos | [Tailwind CSS 4](https://tailwindcss.com) |
| Base de datos | [Supabase](https://supabase.com) (PostgreSQL + Storage) |
| Autenticación | [Clerk](https://clerk.com) |
| Generación de PDF | [pdf-lib](https://pdf-lib.js.org) |
| Deploy | [Vercel](https://vercel.com) |

---

## Funcionalidades

**Público**
- Página de inicio con información de la clínica
- Formulario de contacto con endpoint seguro
- Herramientas públicas: rastreador de hábitos de sueño (imprimible, A4)
- Aviso de privacidad (LFPDPPP)

**Administrativo**
- Dashboard con métricas generales
- Gestión de pacientes (expedientes, historial)
- Agendamiento de citas individuales y masivas (TMS / NFB)
- Cuestionarios clínicos: Berlín, Pittsburgh (PSQI), STOP-BANG, posición de sueño
- Calculadora de IMC integrada (modal nativo `<dialog>`)
- Generación de reportes de poligrafía en PDF
- Exportación de datos a CSV/Excel
- CRUD de manuales clínicos

---

## Estructura del proyecto

```
/
├── public/                 # Assets estáticos
├── src/
│   ├── components/         # Componentes reutilizables (.astro)
│   ├── layouts/            # Layouts base
│   ├── pages/
│   │   ├── api/            # Endpoints del servidor
│   │   ├── admin/          # Panel administrativo (protegido)
│   │   └── index.astro     # Página pública principal
│   ├── lib/                # Servicios, helpers, lógica de negocio
│   └── styles/
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

---

## Configuración

### Variables de entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
# Supabase
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Clerk
PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
```

### Instalación y desarrollo

```bash
# Instalar dependencias
pnpm install

# Servidor de desarrollo (localhost:4321)
pnpm dev

# Build de producción
pnpm build

# Preview del build
pnpm preview
```

---

## Despliegue

El proyecto está configurado para desplegarse en **Vercel** usando el adaptador `@astrojs/vercel` en modo SSR. Cada push a `main` genera un deploy automático.

---

## Lenguajes

- Astro — 93.9%
- TypeScript — 4.8%
- JavaScript — 1.3%