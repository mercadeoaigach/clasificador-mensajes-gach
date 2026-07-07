import fs from 'fs';
import { defaultWorkspaceCategories, defaultAppMessages } from './generated_app_data.js';

let sql = `-- =================================================================================
-- SCRIPT: INSTALACIÓN DE PLANTILLA BASE OFICIAL
-- =================================================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Asegurar que existe la tabla de subcategorias y la columna en mensajes
CREATE TABLE IF NOT EXISTS public.subcategorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE IF EXISTS public.mensajes ADD COLUMN IF NOT EXISTS sub_categoria TEXT;

-- 1. Crear la función que inyecta la plantilla oficial hardcodeada
CREATE OR REPLACE FUNCTION public.handle_new_user_setup()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  new_conjunto_id UUID;
  cat_id UUID;
BEGIN
  -- Crear conjunto
  INSERT INTO public.conjuntos (user_id, name) VALUES (new.id, 'Guia para respuestas CRM 2026') RETURNING id INTO new_conjunto_id;
  
`;

for (const cat of defaultWorkspaceCategories) {
    sql += `  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, '${cat.name.replace(/'/g, "''")}', '${cat.color}', '${cat.icon}');\n`;
}

sql += `\n`;

const subsSet = new Set();
for (const msg of defaultAppMessages) {
    const cat = defaultWorkspaceCategories.find(c => c.id === msg.categoryId);
    if (!cat) continue;
    const subCatStr = (msg.subCategory && msg.subCategory !== 'null') ? msg.subCategory : null;
    
    if (subCatStr) {
        const key = cat.name + '|' + subCatStr;
        if (!subsSet.has(key)) {
            subsSet.add(key);
            sql += `
  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = '${cat.name.replace(/'/g, "''")}';
  INSERT INTO public.subcategorias (categoria_id, name) VALUES (cat_id, '${subCatStr.replace(/'/g, "''")}');
`;
        }
    }
    
    const subCatInsert = subCatStr ? `'${subCatStr.replace(/'/g, "''")}'` : `NULL`;
    sql += `
  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = '${cat.name.replace(/'/g, "''")}';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned) VALUES
  (cat_id, ${subCatInsert}, '${msg.title.replace(/'/g, "''")}', '${msg.excerpt.replace(/'/g, "''")}', ${msg.is_pinned ? 'true' : 'false'});
`;
}

sql += `
  RETURN new;
END;
$$;

-- 2. Eliminar trigger anterior si existía
DROP TRIGGER IF EXISTS on_auth_user_created_setup ON auth.users;

-- 3. Crear Trigger para nuevos registros
CREATE TRIGGER on_auth_user_created_setup
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_setup();

-- 4. (Opcional) Inyectarle la plantilla a Shantal inmediatamente si ella ya existe y no la tiene
DO $init$
DECLARE
  shantal_id UUID;
  existing_conjunto UUID;
  fake_record auth.users%ROWTYPE;
BEGIN
  SELECT id INTO shantal_id FROM auth.users WHERE email = 'sgamboa@uin.ac.cr' LIMIT 1;
  IF shantal_id IS NOT NULL THEN
     -- Solo inyectar si no tiene ya un conjunto llamado 'Guia para respuestas CRM 2026'
     SELECT id INTO existing_conjunto FROM public.conjuntos WHERE user_id = shantal_id AND name = 'Guia para respuestas CRM 2026' LIMIT 1;
     IF existing_conjunto IS NULL THEN
        fake_record.id := shantal_id;
        PERFORM public.handle_new_user_setup() FROM (SELECT fake_record AS new) t;
     END IF;
  END IF;
END $init$;
`;

fs.writeFileSync('setup_database.sql', sql);
console.log("Generado setup_database.sql");
