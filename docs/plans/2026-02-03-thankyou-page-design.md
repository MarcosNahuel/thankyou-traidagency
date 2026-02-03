# Diseño: TRAID Thank You Page

**Fecha:** 2026-02-03
**Estado:** Implementado

## Objetivo

Crear una Thank You Page para leads que agendan llamada vía Calendly, con el objetivo de aumentar el show-up rate mediante:
- Video VSL pre-venta
- Guía PDF descargable
- Prueba social (testimonios)
- Canal de YouTube

## Arquitectura

```
thankyou-page/
├── src/app/
│   ├── page.tsx              # Thank You Page pública
│   ├── layout.tsx            # Layout root
│   ├── globals.css           # Estilos TRAID
│   └── admin/
│       ├── layout.tsx        # Layout admin
│       ├── page.tsx          # Dashboard
│       └── login/page.tsx    # Login
├── src/lib/supabase/         # Cliente Supabase
├── src/types/                # TypeScript types
└── src/middleware.ts         # Auth middleware
```

## Base de Datos

### Tabla: `thankyou_content`

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | UUID | Primary key |
| vsl_embed | TEXT | HTML embed del video principal |
| pdf_url | TEXT | URL del PDF en storage |
| pdf_filename | TEXT | Nombre original del archivo |
| youtube_channel_url | TEXT | URL del canal |
| youtube_video_embed | TEXT | HTML embed del video destacado |
| testimonials | JSONB | Array de {id, image_url, order} |
| created_at | TIMESTAMPTZ | Fecha creación |
| updated_at | TIMESTAMPTZ | Última actualización |

### Storage Bucket: `thankyou-assets`

- PDFs en `/pdfs/`
- Imágenes de testimonios en `/testimonials/`

## Decisiones de Diseño

1. **Embed como HTML raw**: Permite cualquier plataforma de video (YouTube, Vimeo, Wistia, Loom, etc.)

2. **Testimonios como JSONB**: Flexibilidad para agregar campos futuros sin migración

3. **Supabase compartido**: Reutiliza el proyecto existente de onboarding para reducir costos

4. **Middleware para auth**: Protección de rutas admin con redirect automático

## Estilos

- Paleta TRAID: Púrpuras (#8b5cf6, #7c3aed) + Pinks (#ec4899, #db2777)
- Fondo negro (#000000)
- Glass morphism en cards
- Gradientes animados en títulos

## URLs

- **Producción:** thankyou.traidagency.com
- **Admin:** thankyou.traidagency.com/admin
