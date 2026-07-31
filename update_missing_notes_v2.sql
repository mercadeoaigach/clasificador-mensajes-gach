-- Run this script to update missing notes using robust text matching

UPDATE public.mensajes SET internal_note = 'Recordar que Guápiles y Liberia NO son Sedes, son Centros de Atención Estudiantil, y así debe explicarse al estudiante. Salvedad: en los cursos con laboratorio deben desplazarse a Sede Central, San José o Liberia, y llenar el formulario correspondiente.' WHERE excerpt LIKE 'Las carreras de Bachillerato y Licenciatura en Ing%';
UPDATE public.mensajes SET internal_note = 'Agregar este texto a continuación de D04 únicamente si la carrera consultada incluye cursos con laboratorio.' WHERE excerpt LIKE 'Además, es importante que tomés en cuenta que esta%';
UPDATE public.mensajes SET internal_note = 'Actualizar las fechas en verde cada cuatrimestre.' WHERE excerpt LIKE '📅 Periodo de matrícula ordinaria para nuevos ingre%';
UPDATE public.mensajes SET internal_note = 'Aplica solo si el estudiante no ha cursado 2 sesiones de clase, es decir, si únicamente perdió 1 lección.' WHERE excerpt LIKE '⏳ Periodo de matrícula súper extraordinaria (con r%';
UPDATE public.mensajes SET internal_note = 'Actualizar el cuatrimestre y las fechas de pago (en verde) cada término.' WHERE excerpt LIKE 'La Universidad Isaac Newton (UIN) pone a su dispos%';
UPDATE public.mensajes SET internal_note = 'Si el prospecto responde afirmativamente (ej. "sí", "dale") sin especificar cantidad de materias ni forma de pago, continuá con esta plantilla y luego pasá a D15 solicitando esos dos datos antes de dar montos.' WHERE excerpt LIKE '🤩 Si gustás, podés indicarme cuántas materias te i%';
UPDATE public.mensajes SET internal_note = 'Completar únicamente después de tener la cantidad de materias y la forma de pago (financiamiento o contado) elegida por el prospecto. Si no las indicó, solicitáselas antes de enviar montos.' WHERE excerpt LIKE 'Para [XX] materias, deberías cancelar al momento d%';
UPDATE public.mensajes SET internal_note = 'Indicar siempre al estudiante que debe incluir nombre completo, número de identificación y trámite por el cual se realiza el pago.' WHERE excerpt LIKE 'Este trámite debes solicitarlo a través de nuestro%';
UPDATE public.mensajes SET internal_note = 'Los requisitos formales se solicitan solo cuando el estudiante decida avanzar (con o sin preestudio previo).' WHERE excerpt LIKE 'Para este cuatrimestre, las convalidaciones no tie%';
UPDATE public.mensajes SET internal_note = 'Verificar en Acamsys que el plan de estudios esté "concluido" o "concluyendo" antes de indicar este trámite. Si el estudiante desea ingresar a la Licenciatura, debe cancelar primero los derechos de graduación de Bachillerato (Ingeniería Civil o Industrial).' WHERE excerpt LIKE 'Fechas para cancelar los derechos de graduación:
🗓%';
UPDATE public.mensajes SET internal_note = 'Este mensaje lo envía el personal de Ventas cuando el prospecto ya está listo para formalizar. Incluir el link del formulario de la sede correspondiente, según lo indicado por TI.' WHERE excerpt LIKE '¡Qué alegría que ya estás dando este gran paso hac%';
UPDATE public.mensajes SET internal_note = 'Se envía por correo una vez que el prospecto llenó el formulario. Pedirle que devuelva el correo firmado. El punto sobre laboratorios solo aplica si la carrera los incluye.
Asunto sugerido: ¡Asegura tu lugar hoy y vive una experiencia extraordinaria en la UIN!' WHERE excerpt LIKE 'Hola [Nombre del estudiante],
¡Qué placer saludart%';
UPDATE public.mensajes SET internal_note = 'Enviar una vez confirmado el pago y formalizada la matrícula. Recordar generar la contraseña del estudiante en Acamsys.
Asunto sugerido: ¡Bienvenid@ a la UIN! Tu matrícula está lista para un cuatrimestre extraordinario' WHERE excerpt LIKE 'Hola [Nombre del estudiante].

Te informo que tu m%';
UPDATE public.mensajes SET internal_note = 'Aplica para nuevo ingreso, reingreso y estudiante activo/regular de la Maestría en Ingeniería Ambiental.' WHERE title = 'Maestría en Ingeniería Ambiental — Nuevo Ingreso, Activo / Regular y Reingreso';
