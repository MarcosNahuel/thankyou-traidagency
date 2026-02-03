# TRAID Thank You Page

Thank You Page para leads que agendan llamada vía Calendly. Incluye panel de administración para gestionar contenido.

## Stack

- **Next.js 16** + React 19
- **Tailwind CSS 4**
- **Supabase** (Auth + Storage + Database)

## Estructura

```
/                   → Thank You Page pública (leads)
/admin              → Dashboard de administración
/admin/login        → Login para admins
```

## Setup

### 1. Variables de Entorno

Crear `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 2. Supabase Setup

La migración SQL ya está aplicada. Solo falta crear el bucket de storage:

1. Ir a [Supabase Dashboard](https://supabase.com/dashboard) → Storage
2. Crear bucket: `thankyou-assets`
3. Marcar como **público**
4. Políticas (ya configuradas via RLS en la tabla)

### 3. Instalar y Correr

```bash
npm install
npm run dev
```

## Admin

Acceder a `/admin/login` con credenciales de Supabase Auth.

Desde el admin se puede:
- Pegar embed de video VSL (YouTube, Vimeo, etc.)
- Subir PDF descargable
- Agregar/eliminar/reordenar testimonios
- Configurar canal y video de YouTube

## Deploy

### Vercel

```bash
vercel
```

Configurar dominio: `thankyou.traidagency.com`

### Variables en Vercel

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Notas

- El middleware protege `/admin/*` (requiere autenticación)
- Los embeds de video se insertan como HTML raw (permite cualquier plataforma)
- Las imágenes de testimonios se guardan en Supabase Storage
