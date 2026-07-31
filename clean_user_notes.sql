-- Quitar las notas internas del conjunto de Shantal (y cualquier otro conjunto personal), manteniendo solo las notas en la Guía Oficial
UPDATE public.mensajes 
SET internal_note = NULL
WHERE categoria_id IN (
  SELECT c.id 
  FROM public.categorias c
  JOIN public.conjuntos conj ON c.conjunto_id = conj.id
  WHERE conj.name NOT ILIKE '%Guia%' AND conj.name NOT ILIKE '%Guía%'
);
