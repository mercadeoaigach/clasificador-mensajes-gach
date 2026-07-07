-- =================================================================================
-- SCRIPT: CLONACIÓN AUTOMÁTICA DE PLANTILLA PARA NUEVOS USUARIOS
-- =================================================================================

-- 1. Crear la función que se ejecutará automáticamente cuando alguien se registre
CREATE OR REPLACE FUNCTION public.handle_new_user_clone_template()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
DECLARE
  template_conjunto_id UUID;
  new_conjunto_id UUID;
  template_cat RECORD;
  new_cat_id UUID;
  template_msg RECORD;
  template_sub RECORD;
BEGIN
  -- A. Buscar la plantilla original (el conjunto más antiguo llamado "Guia para respuestas CRM 2026")
  SELECT id INTO template_conjunto_id 
  FROM public.conjuntos 
  WHERE name = 'Guia para respuestas CRM 2026' 
  ORDER BY created_at ASC 
  LIMIT 1;
  
  -- Si no existe la plantilla por alguna razón, le creamos un espacio vacío estándar
  IF template_conjunto_id IS NULL THEN
    INSERT INTO public.conjuntos (user_id, name) VALUES (new.id, 'Mi Espacio de Trabajo');
    RETURN new;
  END IF;

  -- B. Crear un nuevo conjunto "clonado" asignado al nuevo usuario
  INSERT INTO public.conjuntos (user_id, name) 
  VALUES (new.id, 'Guia para respuestas CRM 2026') 
  RETURNING id INTO new_conjunto_id;

  -- C. Recorrer todas las categorías de la plantilla
  FOR template_cat IN SELECT * FROM public.categorias WHERE conjunto_id = template_conjunto_id LOOP
    
    -- Clonar la categoría
    INSERT INTO public.categorias (conjunto_id, name, color, icon) 
    VALUES (new_conjunto_id, template_cat.name, template_cat.color, template_cat.icon)
    RETURNING id INTO new_cat_id;
    
    -- Clonar las subcategorías (divisiones) de esta categoría
    FOR template_sub IN SELECT * FROM public.subcategorias WHERE categoria_id = template_cat.id LOOP
       INSERT INTO public.subcategorias (categoria_id, name) 
       VALUES (new_cat_id, template_sub.name);
    END LOOP;
    
    -- Clonar los mensajes de esta categoría
    FOR template_msg IN SELECT * FROM public.mensajes WHERE categoria_id = template_cat.id LOOP
       INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned)
       VALUES (new_cat_id, template_msg.sub_categoria, template_msg.title, template_msg.excerpt, template_msg.is_pinned);
    END LOOP;

  END LOOP;
  
  RETURN new;
END;
$$;

-- 2. Eliminar el trigger si ya existía (para evitar duplicados al actualizar)
DROP TRIGGER IF EXISTS on_auth_user_created_clone ON auth.users;

-- 3. Crear el Trigger que escucha los registros en Supabase (auth.users)
CREATE TRIGGER on_auth_user_created_clone
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user_clone_template();
