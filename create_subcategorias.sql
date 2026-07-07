-- 1. Crear tabla de subcategorías (divisiones internas)
CREATE TABLE IF NOT EXISTS public.subcategorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Añadir columna a mensajes para relacionarlos con su subcategoría
ALTER TABLE public.mensajes 
ADD COLUMN IF NOT EXISTS subcategoria_id UUID REFERENCES public.subcategorias(id) ON DELETE SET NULL;

-- 3. Habilitar Row Level Security (RLS) para subcategorías (Asumiendo que es igual que categorias)
ALTER TABLE public.subcategorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Los usuarios pueden ver subcategorías de sus conjuntos" ON public.subcategorias
    FOR SELECT USING (
        categoria_id IN (
            SELECT id FROM public.categorias WHERE conjunto_id IN (
                SELECT id FROM public.conjuntos WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Los usuarios pueden insertar subcategorías" ON public.subcategorias
    FOR INSERT WITH CHECK (
        categoria_id IN (
            SELECT id FROM public.categorias WHERE conjunto_id IN (
                SELECT id FROM public.conjuntos WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Los usuarios pueden actualizar sus subcategorías" ON public.subcategorias
    FOR UPDATE USING (
        categoria_id IN (
            SELECT id FROM public.categorias WHERE conjunto_id IN (
                SELECT id FROM public.conjuntos WHERE user_id = auth.uid()
            )
        )
    );

CREATE POLICY "Los usuarios pueden eliminar sus subcategorías" ON public.subcategorias
    FOR DELETE USING (
        categoria_id IN (
            SELECT id FROM public.categorias WHERE conjunto_id IN (
                SELECT id FROM public.conjuntos WHERE user_id = auth.uid()
            )
        )
    );
