-- Habilitar extensiones
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Asegurar que existe la tabla de subcategorias y la columna en mensajes
CREATE TABLE IF NOT EXISTS public.subcategorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    categoria_id UUID REFERENCES public.categorias(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
ALTER TABLE IF EXISTS public.mensajes ADD COLUMN IF NOT EXISTS sub_categoria TEXT;
ALTER TABLE IF EXISTS public.mensajes ADD COLUMN IF NOT EXISTS internal_note TEXT;

DO $$
DECLARE
  new_user_id UUID;
  new_conjunto_id UUID;
  cat_id UUID;
BEGIN
  -- Buscar al usuario Shantal
  SELECT id INTO new_user_id FROM auth.users WHERE email = 'sgamboa@uin.ac.cr';
  
  -- Crear conjunto
  INSERT INTO public.conjuntos (user_id, name) VALUES (new_user_id, 'Guia para respuestas CRM 2026') RETURNING id INTO new_conjunto_id;
  
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Carreras y sedes', 'bg-indigo', 'map-pin');
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Primer contacto', 'bg-pink', 'user-plus');
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Información académica clave', 'bg-emerald', 'book-open');
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Financiamiento y costos', 'bg-orange', 'credit-card');
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Proceso de matrícula y trámites', 'bg-blue', 'file-text');
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Correos del proceso de matrícula', 'bg-purple', 'mail');


  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Carreras y sedes';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Carreras aprobadas en la sede', 'Las carreras de Bachillerato y Licenciatura en Ingeniería Industrial y en Ingeniería Civil, así como la Maestría en Ingeniería Ambiental, están aprobadas en la Sede Central San Carlos y en la Sede Metropolitana San José.

Carreras en UIN:
• Bachillerato en Ingeniería Civil
• Bachillerato en Ingeniería Industrial
• Licenciatura en Ingeniería Civil
• Licenciatura en Ingeniería Industrial
• Maestría en Ingeniería Ambiental', false, 'Recordar que Guápiles y Liberia NO son Sedes, son Centros de Atención Estudiantil, y así debe explicarse al estudiante. Salvedad: en los cursos con laboratorio deben desplazarse a Sede Central, San José o Liberia, y llenar el formulario correspondiente.');

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Carreras y sedes';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Carrera no acreditada en el Centro de Atención', 'En el caso de la carrera que te interesa 🎓, esta se encuentra aprobada oficialmente en nuestra Sede Central en San Carlos 🏛️ y en nuestra Sede Metropolitana San José. Sin embargo, gracias a nuestra modalidad mixta y a las clases sincrónicas por Microsoft Teams 💻📚, funcionamos como tu Centro de Atención Estudiantil 📍.

Esto significa que no tenés que desplazarte para tus gestiones. Podés realizar todos tus trámites directamente en nuestra sede, entre ellos:
✅ Matrícula
✅ Trámites administrativos
✅ Pagos
✅ Consultas y acompañamiento académico
✅ ¡Y mucho más! 💼📝

Así podés estudiar con total comodidad, mientras la Universidad Isaac Newton (UIN) te ayuda a construir tu futuro profesional 🍎.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Carreras y sedes';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Adición: cursos con laboratorio presencial', 'Además, es importante que tomés en cuenta que esta carrera incluye algunos cursos con laboratorio, los cuales son presenciales 🔬🧪.

🗓️ La buena noticia es que no se imparten semanalmente. Estos laboratorios se realizan en nuestra Sede San Carlos, Sede Metropolitana San José y el Centro de Atención de Liberia 📍.

🚗 Por este motivo, deberás trasladarte únicamente para esos cursos específicos 🛣️🎒.

Este formato te permite llevar la carrera con mucha flexibilidad, aprovechando las clases en línea y asistiendo solo cuando realmente es necesario.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Primer contacto';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Saludo general', 'Hola, ¡qué gusto saludarte! 😊

Gracias por acercarte a la Universidad Isaac Newton, una institución que transforma vidas a través de la educación de calidad, construyendo el futuro profesional de miles de personas que han confiado en nosotros.

👉 Estoy aquí para hacer tu proceso más fácil y ayudarte a dar ese paso que abrirá nuevas oportunidades en tu futuro.

Me encantaría acompañarte en este camino y orientarte para que encuentres el programa ideal según tus metas profesionales.

¿Podrías contarme qué carrera te interesa?', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Primer contacto';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Solicitud de datos a prospectos nuevos', '✨ En la UIN queremos brindarte una atención más ágil y personalizada.

Para poder ayudarte mejor y acompañarte en tu proceso, ¿nos podés compartir estos datos?
• Nombre completo
• Número de cédula
• Correo electrónico

Con esta información podemos:
✅ Identificarte rápidamente sin hacerte repetir datos en cada consulta.
✅ Enviarte información, documentos y avances directamente a tu correo.
✅ Agilizar tus trámites y darte respuestas más rápidas y precisas.

Así tu proceso es mucho más sencillo, seguro y sin complicaciones 🌟', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Periodo de matrícula — Ordinaria: nuevos ingresos o reingresos', '📅 Periodo de matrícula ordinaria para nuevos ingresos o reingresos:
🗓️ Del 27 de julio al 29 de agosto del 2026
🎓 Inicio de lecciones: 31 de agosto del 2026', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Periodo de matrícula — Ordinaria: estudiantes activos', '📚 Periodo de matrícula ordinaria para estudiantes activos:
🗓️ Del 24 al 29 de agosto del 2026
🎓 Inicio de lecciones: 31 de agosto del 2026', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Periodo de matrícula — Extraordinaria', '⏳ Periodo de matrícula extraordinaria (con recargo):
🗓️ Del 31 de agosto al 6 de setiembre del 2026', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Periodo de matrícula — Súper extraordinaria', '⏳ Periodo de matrícula súper extraordinaria (con recargo y siempre que no haya cursado 2 sesiones de clases, es decir, que solo haya perdido 1 lección):
🗓️ Del 7 al 11 de setiembre 2026', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Modalidad', 'Nuestra modalidad está diseñada para impulsar tus metas con la flexibilidad que necesitas y la calidad que te mereces. 💫

Trabajamos bajo un modelo mixto, que combina lo mejor de la educación virtual y presencial:

✔️ Clases sincrónicas en línea a través de Microsoft Teams, donde interactúas en tiempo real con tus docentes.
✔️ Las clases quedan grabadas, para que puedas repasarlas cuando lo necesités y avanzar a tu propio ritmo.
✔️ Podés conectarte desde cualquier lugar, lo que te permite estudiar incluso si viajás o vivís lejos de la sede.
✔️ Presencialidad obligatoria únicamente en los cursos de laboratorio, garantizando el aprendizaje práctico que te prepara para el mundo real, según el cronograma que en cada caso se facilite.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, '¿Hay becas?', 'Si bien existen algunas becas aprobadas por el Consejo Universitario y otras derivadas de convenios específicos, actualmente buscamos apoyar al mayor número posible de estudiantes.

Por eso, ponemos a tu disposición excelentes descuentos accesibles para toda nuestra comunidad estudiantil, diseñados para que podás iniciar tu carrera sin que lo económico sea un obstáculo. 🌟📘

Estos beneficios te permiten avanzar con tranquilidad y le permiten a la Universidad Isaac Newton acompañarte a construir tu futuro 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Requisitos para matricular (por grado) - Bachillerato', '📚 Bachillerato

Requisitos:
• Fotografía del documento de identidad (ambos lados).
• Fotografía del título de Bachillerato en Educación Media.
• Fotografía tamaño pasaporte o selfie frontal y formal.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Requisitos para matricular (por grado) - Licenciatura', '🎓 Licenciatura

Requisitos:
• Fotografía del documento de identidad (ambos lados).
• Fotografía del título de Bachillerato en Educación Media.
• Fotografía del título de Bachillerato Universitario.
• Certificación del TCU (si se realizó en otra institución), con menos de 3 meses de emitida.
• Fotografía tamaño pasaporte.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Información académica clave';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Requisitos para matricular (por grado) - Maestría', '🎓 Maestría

Requisitos:
• Fotografía del documento de identidad (ambos lados).
• Fotografía del título de Bachillerato en Educación Media.
• Fotografía del título de Bachillerato Universitario afín.
• Fotografía tamaño pasaporte o selfie frontal y formal.
• Documento que compruebe haber realizado 150 horas de TCU.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Métodos de financiamiento', 'La Universidad Isaac Newton (UIN) pone a su disposición dos métodos de financiamiento diseñados para brindarle accesibilidad y flexibilidad en su proceso académico:

🔹 Financiamiento Todo Terreno
Este método le permite financiar tanto la matrícula como las materias. El monto total se divide en 4 tractos iguales. Únicamente en el primer pago se agrega un monto de ₡4 500 correspondiente al uso de herramientas tecnológicas 🛠️.

🔹 Financiamiento 1, 2, 3
En este caso, el primer pago incluye:
• El total de la matrícula
• El monto de ₡4 500 por herramientas tecnológicas
• El 25% del costo de las materias
El 75% restante se financia en 3 tractos iguales 📊📆.

✔ Beneficios importantes
• No requiere fiador
• No requiere trámites adicionales
• Únicamente se firma un pagaré como compromiso de pago ✍️🤝

📅 Fechas de pago — III Cuatrimestre 2026 (el primer pago se realiza al matricular y luego los 3 tractos serían):
• Primera mensualidad: 1 de octubre 2026
• Segunda mensualidad: 1 de noviembre 2026
• Tercera mensualidad: 1 de diciembre 2026

Si desea, puedo brindarle una simulación de pagos según la carrera que le interesa. Será un gusto acompañarle en este proceso para que la UIN te acompañe a Construir Tu Futuro 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Cierre — manifiesta interés en matricular - Pregunta inicial', '🤩 Si gustás, podés indicarme cuántas materias te interesa llevar y si preferís optar por nuestro financiamiento o pagar de contado.

Con esa información puedo darte el monto exacto que tendrías que cancelar al matricular y el valor de cada cuota.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Cierre — manifiesta interés en matricular - Detalle de montos', 'Para [XX] materias, deberías cancelar al momento de matricular un monto de ₡[monto].
Luego, te quedarían tres mensualidades de ₡[monto], que se pagarían en las siguientes fechas:
•  💳 1 de octubre 2026
•  💳 1 de noviembre 2026
•  💳 1 de diciembre 2026

Si preferís pagar de contado, el total del cuatrimestre sería de ₡[monto total].

Quedo atenta para ayudarte con lo que necesités y acompañarte en este proceso para que la UIN te acompañe a Construir Tu Futuro 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'TCU — Costo administrativo', '📝 El TCU (Trabajo Comunal Universitario) tiene un costo administrativo de ₡30 640,95 (IVA incluido).

Este costo cubre el registro y acompañamiento durante las 150 horas de servicio que deberás completar en una institución sin fines de lucro.

Al matricularlo, recibirás una convocatoria para una reunión informativa donde se explica todo el proceso, el cronograma y los pasos a seguir 📋🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Práctica Profesional', '🏢 El costo de la Práctica Profesional es de ₡370 000.

Si deseás iniciar el proceso, podés indicarme y te orientamos sobre los pasos a seguir 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Tesis', '🎓 El costo de la Tesis es:
• Precio aprobado CONESUP: ₡600 000
• Descuento aplicado: 10%
• Total a pagar: ₡540 000

Si deseás iniciar el proceso, con gusto te acompaño en los próximos pasos 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Tesina', '🎓 El costo de la Tesina es de ₡240 000.

Si deseás iniciar el proceso, con gusto te acompaño en los próximos pasos 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Prueba de Grado', '🎓 El costo de la Prueba de Grado es:
• Precio aprobado CONESUP: ₡600 000
• Descuento aplicado: 10%
• Total a pagar: ₡540 000

Si deseás iniciar el proceso, con gusto te acompaño en los próximos pasos 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.subcategorias (categoria_id, name) VALUES (cat_id, '🔬 CON LABORATORIO PRESENCIAL');

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🔬 CON LABORATORIO PRESENCIAL', 'Fundamentos de Química', '🔬 Quería comentarte que el curso de Fundamentos de Química incluye un Laboratorio Presencial, el cual se realiza en nuestra Sede San Carlos, Sede Metropolitana San José o el Centro de Atención de Liberia 📍.

🗓️ La buena noticia es que no se imparte semanalmente — al inicio del cuatrimestre te compartimos el cronograma con las fechas específicas para que te organices con tiempo.

El costo de esta materia es de ₡174 616,90. ¿Te gustaría saber más sobre cómo funciona el laboratorio? 🚀💙', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🔬 CON LABORATORIO PRESENCIAL', 'Física I', '🔬 Quería comentarte que el curso de Física I incluye un Laboratorio Presencial, el cual se realiza en nuestra Sede San Carlos, Sede Metropolitana San José o el Centro de Atención de Liberia 📍.

🗓️ La buena noticia es que no se imparte semanalmente — al inicio del cuatrimestre te compartimos el cronograma con las fechas específicas para que te organices con tiempo.

El costo de esta materia es de ₡174 616,90. ¿Te gustaría saber más sobre cómo funciona el laboratorio? 🚀💙', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🔬 CON LABORATORIO PRESENCIAL', 'Física II', '🔬 Quería comentarte que el curso de Física II incluye un Laboratorio Presencial, el cual se realiza en nuestra Sede San Carlos, Sede Metropolitana San José o el Centro de Atención de Liberia 📍.

🗓️ La buena noticia es que no se imparte semanalmente — al inicio del cuatrimestre te compartimos el cronograma con las fechas específicas para que te organices con tiempo.

El costo de esta materia es de ₡174 616,90. ¿Te gustaría saber más sobre cómo funciona el laboratorio? 🚀💙', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.subcategorias (categoria_id, name) VALUES (cat_id, '🚌 CON GIRA ACADÉMICA');

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🚌 CON GIRA ACADÉMICA', 'Contaminación Ambiental', '🚌 Quería comentarte que el curso de Contaminación Ambiental incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.

La gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.

El costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🚌 CON GIRA ACADÉMICA', 'Control de Calidad I', '🚌 Quería comentarte que el curso de Control de Calidad I incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.

La gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.

El costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🚌 CON GIRA ACADÉMICA', 'Materiales de Construcción', '🚌 Quería comentarte que el curso de Materiales de Construcción incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.

La gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.

El costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🚌 CON GIRA ACADÉMICA', 'Investigación de Operaciones Avanzadas I', '🚌 Quería comentarte que el curso de Investigación de Operaciones Avanzadas I incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.

La gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.

El costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '🚌 CON GIRA ACADÉMICA', 'Vías de Comunicación I', '🚌 Quería comentarte que el curso de Vías de Comunicación I incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.

La gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.

El costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.subcategorias (categoria_id, name) VALUES (cat_id, '📚 CURSOS DOBLES');

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '📚 CURSOS DOBLES', 'Cálculo Diferencial e Integral I', '📚 Te comento que el curso de Cálculo Diferencial e Integral I es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.

Al matricularlo, equivale a llevar 2 materias:
• Costo total por este curso: ₡174 616,90

Si querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '📚 CURSOS DOBLES', 'Análisis Vectorial', '📚 Te comento que el curso de Análisis Vectorial es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.

Al matricularlo, equivale a llevar 2 materias:
• Costo total por este curso: ₡174 616,90

Si querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '📚 CURSOS DOBLES', 'Algebra Lineal', '📚 Te comento que el curso de Algebra Lineal es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.

Al matricularlo, equivale a llevar 2 materias:
• Costo total por este curso: ₡174 616,90

Si querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, '📚 CURSOS DOBLES', 'Ecuaciones Diferenciales', '📚 Te comento que el curso de Ecuaciones Diferenciales es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.

Al matricularlo, equivale a llevar 2 materias:
• Costo total por este curso: ₡174 616,90

Si querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Bachillerato — Primer Ingreso y Reingreso', '🌟 Para este III Cuatrimestre 2026, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes de primer ingreso en Bachillerato en Ingeniería:

📌 Matrícula:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 100%
• Total a pagar: ₡0 ✅ (¡matrícula gratis!)

📌 Materias:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento: 10%
• Total por materia: ₡78 577,64

⭐ ¡Este es un beneficio excepcional y una excelente oportunidad para iniciar tu formación profesional!

Si deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato. Solo indicame cuántas materias te gustaría llevar 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Bachillerato — Regular / Activo', '📘 Si sos estudiante activo, este III Cuatrimestre 2026 es una oportunidad ideal para seguir avanzando y no detener tu proceso académico.
La Universidad Isaac Newton quiere acompañarte para que continúes construyendo tu meta profesional.

📌 Matrícula:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 50%
• Total a pagar: ₡43 654,23

📌 Materias:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento: 5%
• Total por materia: ₡82 943,03

🔵 Continuar te acerca a tu título, te mantiene en ritmo y evita retrocesos que después son más difíciles de retomar.

Si querés, puedo calcularte el total a pagar según las materias que deseás llevar 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Licenciatura — Nuevo Ingreso y Reingreso', '🌟 Para este III Cuatrimestre 2026, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes de nuevo ingreso en nuestra Licenciatura en Ingeniería:

📌 Matrícula:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 50%
• Total a pagar: ₡43 654,23

📌 Materias:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento: 5%
• Total por materia: ₡82 943,03

⭐ ¡Este es un beneficio excepcional y una excelente oportunidad para continuar fortaleciendo tu formación profesional!

Si deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato. Solo necesito que me confirmés cuántas materias te gustaría llevar 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Licenciatura — Activo / Regular', '📘 Si sos estudiante activo, este III Cuatrimestre 2026 es un excelente momento para retomar tu carrera y avanzar hacia tus metas profesionales. En la Universidad Isaac Newton queremos que aprovechés esta oportunidad:

📌 Matrícula:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 35%
• Total a pagar: ₡56 750,49

📌 Materias:
• Costo aprobado CONESUP: ₡87 308,45
• Descuento: 5%
• Total por materia: ₡82 943,03

Si querés, puedo ayudarte a calcular el total según las materias que te gustaría matricular.
¿Deseás que avancemos? 🚀💙', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Financiamiento y costos';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Maestría en Ingeniería Ambiental — Nuevo Ingreso, Activo / Regular y Reingreso', '🌟 Para este III Cuatrimestre 2026, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes en nuestra Maestría en Ingeniería Ambiental:

📌 Matrícula:
• Costo aprobado CONESUP: ₡147 213,99
• Descuento aplicado: 50%
• Total a pagar: ₡73 607

📌 Materias:
• Costo aprobado CONESUP: ₡98 142,57
• Descuento: 10%
• Total por materia: ₡88 328,31

⭐ ¡Este es un beneficio excepcional y una excelente oportunidad para continuar fortaleciendo tu formación profesional!

Si deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato 🚀💙.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Cómo matriculan los estudiantes regulares (Acamsys)', '🔹 1. Ingreso al portal
Accedé al portal de estudiantes Acamsys: 🔗 https://uin.acamsys.com/student/login
Usuario y contraseña: tu número de ID completo (si no lo has modificado antes).

🔹 2. Aceptación del contrato
Al ingresar verás el Contrato Estudiantil. Deslizá hacia abajo, léelo con atención y presioná Aceptar.

🔹 3. Acceso al menú
En la parte superior verás el ícono de menú (tres líneas). Hacé clic y buscá la opción Registro.

🔹 4. Selección de cursos
• Elegí tu Plan de Estudio.
• Para cursos regulares, seleccioná Sede Virtual.

Cursos disponibles: aparecen con un círculo.
Cursos no disponibles: aparecen con un candado.

🔹 5. Recordá el tiempo límite
La selección de cursos queda activa por 72 horas. Si no realizás el pago dentro de ese plazo, el sistema libera el cupo.

🔹 6. Pago de la matrícula
Ingresá a Cajas → Pagar con tarjeta. Ingresá los datos correspondientes y completá el pago.
⚠️ Si los datos de la tarjeta se ingresan incorrectamente, la prematrícula se elimina temporalmente como medida de seguridad.

🔹 7. Guía completa
También cuento con la guía oficial de uso de Acamsys, con pasos ilustrados. Si la necesitás, te la comparto con gusto.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Seguimiento a quien ya le mandamos información', '¡Hola de nuevo! 😄

Solo paso por aquí para asegurarme de que recibieras mi mensaje anterior. En la UIN queremos convertirnos en el motor que impulse tus sueños, y me encantaría ayudarte a elegir la carrera y la sede que mejor se adapten a tus metas.

Además, te recuerdo que el proceso de matrícula lo podemos hacer por este medio, sin necesidad de que te presentes personalmente a la sede 🏡. ¡Así de fácil y conveniente! ¿Te gustaría matricular? 💻', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de reporte de pagos — Sede San Carlos', 'Este trámite debes solicitarlo a través de nuestro correo:

📧 Sede de San Carlos: reportedepago@uin.cr

Debés indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de reporte de pagos — Sede San José', 'Este trámite debes solicitarlo a través de nuestro correo:

📧 Sede de San José: reportedepago-sj@uin.ac.cr

Debés indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de reporte de pagos — Centro de Atención Guápiles', 'Este trámite debes solicitarlo a través de nuestro correo:

📧 Centro de Atención Guápiles: reportedepago-gp@uin.ac.cr

Debés indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de reporte de pagos — Centro de Atención Liberia', 'Este trámite debes solicitarlo a través de nuestro correo:

📧 Centro de Atención Liberia: reportedepago-lb@uin.ac.cr

Debés indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Convalidación de estudios', 'Para este cuatrimestre, las convalidaciones no tienen ningún costo, por lo que es un excelente momento para avanzar y reconocer tus estudios previos.

Antes de iniciar el trámite formal, podemos realizar un preestudio sin compromiso, con el fin de valorar las materias que podrían convalidarse.

Para ello, únicamente necesitamos que nos compartás un documento donde se visualicen:
• Las materias aprobadas
• Sus respectivas notas
• Tus datos personales

Con esa información, la coordinadora de carrera revisará tu caso y nos indicará qué cursos podrían ser convalidados.

⭐ Requisitos para iniciar la convalidación formal:
• Certificación de materias aprobadas, sellada y firmada, con menos de 3 meses de emitida.
• Programas de estudio, sellados y firmados en todas las páginas de las materias a convalidar.
• Plan de estudio, sellado y firmado.

Si gustás, puedo ayudarte desde ya a iniciar el preestudio y orientarte paso a paso durante el proceso.
¿Te gustaría enviarme los documentos para comenzar? 💙🚀', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'TCU — Información completa', 'El TCU (Trabajo Comunal Universitario) es un requisito académico que permite al estudiante aportar a la comunidad mediante un servicio realizado en una institución sin fines de lucro, donde no trabajés vos ni familiares hasta el tercer grado de consanguinidad o afinidad.

🔹 Duración y naturaleza del TCU
• Consiste en completar 150 horas de trabajo durante el cuatrimestre en que se matricula.
• Es una labor no remunerada, enfocada en responsabilidad social y desarrollo profesional.

🔹 Reunión informativa obligatoria
Una vez matriculado el TCU, recibirás una convocatoria para una reunión en el horario de clase donde se explica:
• Cómo funciona el TCU
• El cronograma oficial
• Cómo elegir la institución donde lo realizarás
• La elaboración y entrega del anteproyecto
• Los pasos a seguir después de su aprobación

🔹 Costo administrativo
El TCU tiene un costo administrativo de: ₡30 640,95 con IVA incluido.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Proceso de matrícula y trámites';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Derechos de graduación', 'Fechas para cancelar los derechos de graduación:
🗓️ Del 20 de julio al 12 de setiembre del 2026

💰 Costo del derecho de graduación: ₡175 150 (IVA incluido)

⚠️ Si deseás ingresar a la Licenciatura, primero debés cancelar los derechos de graduación de Bachillerato, tanto para Ingeniería Civil como para Ingeniería Industrial.

📨 Para iniciar el trámite, debés enviar un correo electrónico al departamento de Registro de la sede correspondiente 🏫. Ellos verificarán que cumplás con todos los requisitos y te indicarán los pasos a seguir para el depósito del dinero y los demás trámites 🧾✅.', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Correos del proceso de matrícula';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'CRM — cuando el prospecto ya mandó los requisitos', '¡Qué alegría que ya estás dando este gran paso hacia un futuro extraordinario!

Para continuar con el trámite formal de tu matrícula en la carrera que seleccionaste, por favor completá la información en el siguiente formulario:
[LINK DEL FORMULARIO DE LA SEDE]

📌 Importante: indicá el correo electrónico que utilizás habitualmente, ya que una vez que llenes el formulario, te enviaremos a ese correo tu pre-matrícula y toda la información sobre pagos.

Este es tu momento único y sensacional para asegurar tu lugar y comenzar una experiencia académica maravillosa. ¡No lo dejés pasar!

Me avisás cuando lo llenás y enviás, por favor 😉', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Correos del proceso de matrícula';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de pre-matrícula - Asunto del correo', '¡Asegurá tu lugar hoy y viví una experiencia extraordinaria en la UIN!', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Correos del proceso de matrícula';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de pre-matrícula - Cuerpo del correo', 'Hola [Nombre del estudiante],
¡Qué placer saludarte de nuevo!

Has dado el primer gran paso hacia un futuro increíble y transformador que te merecés. Estamos emocionados de acompañarte en este camino único hacia tus metas.

Hemos recibido la información que nos enviaste y hemos iniciado el proceso formal de tu inscripción con nosotros. Por eso, te comparto como adjunto:

1. Pre-matrícula de las materias que deseás matricular, donde podrás observar el horario disponible para este III Cuatrimestre 2026.

Importante: La pre-matrícula tiene una duración de 24 horas. Si no realizás el pago en ese plazo, los horarios podrían variar según la disponibilidad de espacios.

2. Términos y condiciones de la matrícula, que debés conocer antes de formalizar tu inscripción.

El monto a cancelar es:
• Sin financiamiento, pago de contado: ₡[monto en colones]
• Con financiamiento 4 pagos, el primero al momento de matricular: ₡[monto en colones]

Luego, te quedan tres mensualidades de ₡[monto], que se pagan en las siguientes fechas:
•  💳 1 de octubre 2026
•  💳 1 de noviembre 2026
•  💳 1 de diciembre 2026

Para continuar, envianos:
1. El comprobante de pago.
2. El contrato institucional debidamente firmado (podés tomarle foto a la última página y nos lo enviás adjunto al correo).
3. [Solo si aplica laboratorios:] Firmado el documento donde te das por enterado(a) y aceptás trasladarte a los laboratorios a la Sede indicada.

Adjunto también encontrarás las cuentas bancarias de la Institución para tu comodidad y los datos en caso de que desees realizar el pago mediante SINPE Móvil.

Estamos listos para acompañarte en esta etapa. ¡Espero tu comprobante para formalizar tu matrícula!

Con entusiasmo,', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Correos del proceso de matrícula';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de bienvenida — matrícula formalizada - Asunto del correo', '¡Bienvenid@ a la UIN! Tu matrícula está lista para un cuatrimestre extraordinario', false, NULL);

  SELECT id INTO cat_id FROM public.categorias WHERE conjunto_id = new_conjunto_id AND name = 'Correos del proceso de matrícula';
  INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note) VALUES
  (cat_id, NULL, 'Correo de bienvenida — matrícula formalizada - Cuerpo del correo', 'Hola [Nombre del estudiante].

Te informo que tu matrícula fue formalizada para este III Cuatrimestre 2026 en la carrera de [Nombre de la carrera].

Este es un paso extraordinario y transformador hacia el futuro único que te merecés.

Adjunto encontrarás:

1. Informe de matrícula, donde podrás observar los cursos, horarios y los docentes que impartirán cada asignatura.
Recordá: Las clases inician el 31 de agosto, ¡prepárate para una experiencia académica increíble!

2. Pagaré, donde se indican los montos a cancelar en cada cuota y la fecha de pago. Por favor, leé el documento, firmalo y envialo a este mismo correo.

Además, te comparto:
1. Usuario [xxx]. Contraseña [xxx]. Debés ingresar a https://uin.acamsys.com/home con tu usuario y contraseña, y allí tendrás acceso a todas nuestras herramientas para las clases en línea (sincrónicas) y lo relacionado con el espacio para los trabajos asincrónicos.
2. Para conocer más sobre el uso de nuestras plataformas, podés conectarte el día [xxxxxx] a las [xxxxx] para una sesión de capacitación de nuestras plataformas para estudiantes de nuevo ingreso.', false, NULL);

END $$;
