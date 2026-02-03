-- Tabla para almacenar el contenido de la Thank You Page
CREATE TABLE IF NOT EXISTS thankyou_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  vsl_embed TEXT DEFAULT '',
  pdf_url TEXT,
  pdf_filename TEXT,
  youtube_channel_url TEXT,
  youtube_video_embed TEXT,
  testimonials JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insertar registro inicial vacío
INSERT INTO thankyou_content (vsl_embed, testimonials)
VALUES ('', '[]'::jsonb)
ON CONFLICT DO NOTHING;

-- Habilitar RLS
ALTER TABLE thankyou_content ENABLE ROW LEVEL SECURITY;

-- Política: Lectura pública (para la thank you page)
CREATE POLICY "Lectura pública de contenido"
  ON thankyou_content
  FOR SELECT
  TO public
  USING (true);

-- Política: Solo usuarios autenticados pueden modificar
CREATE POLICY "Solo autenticados pueden modificar"
  ON thankyou_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Storage bucket para assets (PDFs e imágenes)
-- NOTA: Ejecutar esto desde el dashboard de Supabase > Storage
-- 1. Crear bucket "thankyou-assets" (público)
-- 2. Políticas:
--    - SELECT: public (para que se vean las imágenes)
--    - INSERT/UPDATE/DELETE: authenticated only
