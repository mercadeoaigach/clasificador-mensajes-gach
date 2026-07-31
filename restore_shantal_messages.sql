-- SCRIPT PARA RESTAURAR TODOS LOS MENSAJES EN LOS CONJUNTOS DE SHANTAL
DO $$ 
DECLARE 
  cat_rec RECORD;
BEGIN
  -- Recorrer todas las categorías de todos los conjuntos
  FOR cat_rec IN SELECT id, name FROM public.categorias LOOP
    IF (cat_rec.name ILIKE '%contacto%') THEN
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Saludo general', 'Hola, ¡qué gusto saludarte! 😊

Gracias por acercarte a la Universidad Isaac Newton, una institución que transforma vidas a través de la educación de calidad, construyendo el futuro profesional de miles de personas que han confiado en nosotros.

👉 Estoy aquí para hacer tu proceso más fácil y ayudarte a dar ese paso que abrirá nuevas oportunidades en tu futuro.

Me encantaría acompañarte en este camino y orientarte para que encuentres el programa ideal según tus metas profesionales.

¿Podrías contarme qué carrera te interesa?', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Saludo general');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Solicitud de datos a nuevos', '✨ En la UIN queremos brindarte una atención más ágil y personalizada.

Para poder ayudarte mejor y acompañarte en tu proceso, ¿nos podés compartir estos datos?

• Nombre completo
• Número de cédula
• Correo electrónico

Con esta información podemos:

✅ Identificarte rápidamente sin hacerte repetir datos en cada consulta.
✅ Enviarte información, documentos y avances directamente a tu correo.
✅ Agilizar tus trámites y darte respuestas más rápidas y precisas.

Así tu proceso es mucho más sencillo, seguro y sin complicaciones 🌟', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Solicitud de datos a nuevos');
    ELSIF (cat_rec.name ILIKE '%carrera%' OR cat_rec.name ILIKE '%sede%') THEN
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Carreras aprobadas en la sede', 'Las carreras de Bachillerato y Licenciatura en Ingeniería Industrial y en Ingeniería Civil, así como la Maestría en Ingeniería Ambiental, están aprobadas en la Sede Central San Carlos y en la Sede Metropolitana San José.

Carreras en UIN:
• Bachillerato en Ingeniería Civil
• Bachillerato en Ingeniería Industrial
• Licenciatura en Ingeniería Civil
• Licenciatura en Ingeniería Industrial
• Maestría en Ingeniería Ambiental', false, 'Recordar que Guápiles y Liberia NO son Sedes, son Centros de Atención Estudiantil, y así debe explicarse al estudiante. Salvedad: en los cursos con laboratorio deben desplazarse a Sede Central, San José o Liberia, y llenar el formulario correspondiente.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Carreras aprobadas en la sede');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Si no es una carrera acreditada en la sede', 'En el caso de la carrera que te interesa 🎓, esta se encuentra aprobada oficialmente en nuestra Sede Central en San Carlos 🏛️ y en nuestra Sede Metropolitana San José. Sin embargo, gracias a nuestra modalidad mixta y a las clases sincrónicas por Microsoft Teams 💻📚, funcionamos como tu Centro de Atención Estudiantil 📍.

Esto significa que no tenés que desplazarte para tus gestiones.
Podés realizar todos tus trámites directamente en nuestra sede, entre ellos:

✅ Matrícula
✅ Trámites administrativos
✅ Pagos
✅ Consultas y acompañamiento académico
✅ ¡Y mucho más! 💼📝

Así podés estudiar con total comodidad, mientras la Universidad Isaac Newton (UIN) te ayuda a construir tu futuro profesional 🍎.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Si no es una carrera acreditada en la sede');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Complemento: carrera con laboratorios', 'Además, es importante que tomés en cuenta que esta carrera incluye algunos cursos con laboratorio, los cuales son presenciales 🔬🧪.

🗓️ La buena noticia es que no se imparten semanalmente.
Estos laboratorios se realizan en nuestra Sede San Carlos, Sede Metropolitana San José y Centro de Atención de Liberia 📍.

🚗 Por este motivo, deberás trasladarte únicamente para esos cursos específicos 🛣️🎒.

Este formato te permite llevar la carrera con mucha flexibilidad, aprovechando las clases en línea y asistiendo solo cuando realmente es necesario.
B · Periodos y modalidad', false, 'Agregar este texto a continuación de D04 únicamente si la carrera consultada incluye cursos con laboratorio.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Complemento: carrera con laboratorios');
    ELSIF (cat_rec.name ILIKE '%académic%') THEN
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, '¿Hay becas?', 'Si bien existen algunas becas aprobadas por el Consejo Universitario y otras derivadas de convenios específicos, actualmente buscamos apoyar al mayor número posible de estudiantes.

Por eso, ponemos a tu disposición excelentes descuentos accesibles para toda nuestra comunidad estudiantil, diseñados para que podás iniciar tu carrera sin que lo económico sea un obstáculo. 🌟📘

Estos beneficios te permiten avanzar con tranquilidad y le permiten a la Universidad Isaac Newton acompañarte a construir tu futuro 🚀💙.
D · Requisitos de matrícula', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = '¿Hay becas?');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Requisitos Bachillerato', '📚 Bachillerato

Requisitos:
• Fotografía del documento de identidad (ambos lados).
• Fotografía del título de Bachillerato en Educación Media.
• Fotografía tamaño pasaporte o selfie frontal y formal.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Requisitos Bachillerato');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Requisitos Licenciatura', '🎓 Licenciatura

Requisitos:
• Fotografía del documento de identidad (ambos lados).
• Fotografía del título de Bachillerato en Educación Media.
• Fotografía del título de Bachillerato Universitario.
• Certificación del TCU (si se realizó en otra institución), con menos de 3 meses de emitida.
• Fotografía tamaño pasaporte o selfie frontal y formal.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Requisitos Licenciatura');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Requisitos Maestría', '🎓 Maestría

Requisitos:
• Fotografía del documento de identidad (ambos lados).
• Fotografía del título de Bachillerato en Educación Media.
• Fotografía del título de Bachillerato Universitario afín.
• Fotografía tamaño pasaporte o selfie frontal y formal.
• Documento que compruebe haber realizado 150 horas de TCU.
E · Costos por carrera', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Requisitos Maestría');
    ELSIF (cat_rec.name ILIKE '%financiam%' OR cat_rec.name ILIKE '%costo%') THEN
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Modalidad de estudio', 'Nuestra modalidad está diseñada para impulsar tus metas con la flexibilidad que necesitas y la calidad que te mereces. 💫

Trabajamos bajo un modelo mixto, que combina lo mejor de la educación virtual y presencial:

✔️ Clases sincrónicas en línea a través de Microsoft Teams, donde interactúas en tiempo real con tus docentes.
✔️ Las clases quedan grabadas, para que puedas repasarlas cuando lo necesites y avanzar a tu propio ritmo.
✔️ Podés conectarte desde cualquier lugar, lo que te permite estudiar incluso si viajás o vivís lejos de la sede.
✔️ Presencialidad obligatoria únicamente en los cursos de laboratorio, garantizando el aprendizaje práctico que te prepara para el mundo real, según el cronograma que en cada caso se facilite.
C · Financiamiento y costos', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Modalidad de estudio');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Financiamiento Todo Terreno', '🔹 Financiamiento Todo Terreno

Este método le permite financiar tanto la matrícula como las materias.
El monto total se divide en 4 tractos iguales.
Únicamente en el primer pago se agrega un monto de ₡4 500 correspondiente al uso de herramientas tecnológicas 🛠️.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Financiamiento Todo Terreno');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Financiamiento 1, 2, 3', '🔹 Financiamiento 1, 2, 3

En este caso, el primer pago incluye:
• El total de la matrícula
• El monto de ₡4 500 por herramientas tecnológicas
• El 25% del costo de las materias

El 75% restante se financia en 3 tractos iguales 📊📆.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Financiamiento 1, 2, 3');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Beneficios del financiamiento y fechas de pago', '✔ Beneficios importantes
• No requiere fiador
• No requiere trámites adicionales
• Únicamente se firma un pagaré como compromiso de pago ✍️🤝

📅 Fechas de pago — III Cuatrimestre 2026. El primer pago se realiza al matricular y luego los 3 tractos serían:

Primera mensualidad: 1 de octubre 2026
Segunda mensualidad: 1 de noviembre 2026
Tercera mensualidad: 1 de diciembre 2026

Si desea, puedo brindarle una simulación de pagos según la carrera que le interesa. Será un gusto acompañarle en este proceso para que la UIN te acompañe a Construir Tu Futuro 🚀💙.', false, 'Actualizar el cuatrimestre y las fechas de pago (en verde) cada término.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Beneficios del financiamiento y fechas de pago');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Si manifiesta interés en matricular', '🤩 Si gustás, podés indicarme cuántas materias te interesa llevar y si preferís optar por nuestro financiamiento o pagar de contado.

Con esa información puedo darte el monto exacto que tendrías que cancelar al matricular y el valor de cada cuota.', false, 'Si el prospecto responde afirmativamente (ej. "sí", "dale") sin especificar cantidad de materias ni forma de pago, continuá con esta plantilla y luego pasá a D15 solicitando esos dos datos antes de dar montos.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Si manifiesta interés en matricular');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Detalle de montos (servicio al cliente contesta)', 'Para [XX] materias, deberías cancelar al momento de matricular un monto de ₡[monto].
Luego, te quedarían tres mensualidades de ₡[monto], que se pagarían en las siguientes fechas:

• 💳 1 de octubre 2026
• 💳 1 de noviembre 2026
• 💳 1 de diciembre 2026

Si preferís pagar de contado, el total del cuatrimestre sería de ₡[monto total].

Quedo atenta para ayudarte con lo que necesités y acompañarte en este proceso para que la UIN te acompañe a Construir Tu Futuro 🚀💙.', false, 'Completar únicamente después de tener la cantidad de materias y la forma de pago (financiamiento o contado) elegida por el prospecto. Si no las indicó, solicitáselas antes de enviar montos.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Detalle de montos (servicio al cliente contesta)');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Cursos con laboratorio — costo', 'Los cursos con laboratorio son:
• Fundamentos de Química
• Física I
• Física II
Estos tienen un costo de ₡174 616,90', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Cursos con laboratorio — costo');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Giras académicas — Ingeniería Industrial', 'Los cursos de Ingeniería Industrial con giras académicas son:
• Contaminación Ambiental (bachillerato)
• Control de Calidad I (bachillerato)
• Investigación de Operaciones Avanzadas I (Licenciatura)
Estas tienen un costo de ₡87 308,45 más ₡30 000,00 de los costos de la gira (incluye transporte, póliza estudiantil y merienda)', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Giras académicas — Ingeniería Industrial');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Giras académicas — Ingeniería Civil', 'Los cursos de Ingeniería Civil con giras académicas son:
• Contaminación Ambiental (bachillerato)
• Materiales de Construcción (bachillerato)
• Vías de Comunicación I (Licenciatura)
Estas tienen un costo de ₡87 308,45 más ₡30 000,00 de los costos de la gira (incluye transporte, póliza estudiantil y merienda)', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Giras académicas — Ingeniería Civil');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Materias con dos clases semanales — costo', 'Materias con dos clases semanales tienen un costo de ₡174 616,90:
• Cálculo Diferencial e Integral I
• Análisis Vectorial
• Álgebra Lineal
• Ecuaciones Diferenciales', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Materias con dos clases semanales — costo');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Costo Bachillerato — nuevo ingreso / reingreso', 'Para este cuatrimestre, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes de primer ingreso en Bachillerato en Ingeniería, con el objetivo de facilitar su inicio académico:

Matrícula
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 100%
• Total a pagar: ₡0

Materias
• Costo aprobado CONESUP: ₡87 308,45
• Descuento estudiante activo: 10%
• Total por materia: ₡78 577,64

⭐ Este es un beneficio excepcional y una excelente oportunidad para iniciar tu formación profesional.

Si deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Costo Bachillerato — nuevo ingreso / reingreso');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Costo Bachillerato — activo / regular', '📘 Si sos estudiante activo, este cuatrimestre es una oportunidad ideal para seguir avanzando y no detener tu proceso académico.
La Universidad Isaac Newton quiere acompañarte para que continúes construyendo tu meta profesional.

Matrícula
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 50%
• Total a pagar: ₡43 654,23

Materias
• Costo aprobado CONESUP: ₡87 308,45
• Descuento estudiante activo: 5%
• Total por materia: ₡82 943,03

🔵 Continuar te acerca a tu título, te mantiene en ritmo y evita retrocesos que después son más difíciles de retomar.
Tu formación sigue siendo una prioridad, y estás a tiempo de avanzar firme hacia tu objetivo.

Si querés, puedo calcularte el total a pagar según las materias que deseás llevar.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Costo Bachillerato — activo / regular');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Costo Licenciatura — nuevo ingreso / reingreso', 'Para este cuatrimestre, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes de primer ingreso en nuestra Licenciatura, con el objetivo de facilitar su inicio académico:

Matrícula
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 50%
• Total a pagar: ₡43 654,23

Materias
• Costo aprobado CONESUP: ₡87 308,45
• Descuento estudiante activo: 5%
• Total por materia: ₡82 943,03

⭐ Este es un beneficio excepcional y una excelente oportunidad para continuar fortaleciendo tu formación profesional.

Si deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato.

Solo necesito que me confirmés cuántas materias te gustaría llevar y procedo con el registro.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Costo Licenciatura — nuevo ingreso / reingreso');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Costo Licenciatura — activo / regular', '📘 Si sos estudiante de reingreso, este es un excelente momento para retomar tu carrera y avanzar hacia tus metas profesionales. En la Universidad Isaac Newton queremos que aprovechés esta oportunidad y por eso contamos con beneficios especiales para vos:

Matrícula
• Costo aprobado CONESUP: ₡87 308,45
• Descuento aplicado: 35%
• Total a pagar: ₡56 750,49

Materias
• Costo aprobado CONESUP: ₡87 308,45
• Descuento estudiante activo: 5%
• Total por materia: ₡82 943,03

Si querés, puedo ayudarte a calcular el total según las materias que te gustaría matricular.
¿Deseás que avancemos con tu reingreso? 🚀💙', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Costo Licenciatura — activo / regular');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Costo Maestría — todas las modalidades', 'Para este cuatrimestre, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes de nuestra Maestría, con el objetivo de facilitar su inicio académico:

Matrícula
• Costo aprobado CONESUP: ₡147 213,99
• Descuento aplicado: 50%
• Total a pagar: ₡73 607,00

Materias
• Costo aprobado CONESUP: ₡98 142,57
• Descuento estudiante activo: 10%
• Total por materia: ₡88 328,31

⭐ Este es un beneficio excepcional y una excelente oportunidad para continuar fortaleciendo tu formación profesional.

Si deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato.
F · Proceso de matrícula en Acamsys', false, 'Aplica para nuevo ingreso, reingreso y estudiante activo/regular de la Maestría en Ingeniería Ambiental.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Costo Maestría — todas las modalidades');
    ELSIF (cat_rec.name ILIKE '%matrícula%' OR cat_rec.name ILIKE '%trámite%' OR cat_rec.name ILIKE '%requisito%') THEN
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Matrícula ordinaria — nuevo ingreso o reingreso', '📅 Periodo de matrícula ordinaria para nuevos ingresos o reingresos:
🗓️ Del 27 de julio al 29 de agosto del 2026
🎓 Inicio de lecciones: 31 de agosto del 2026', false, 'Actualizar las fechas en verde cada cuatrimestre.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Matrícula ordinaria — nuevo ingreso o reingreso');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Matrícula ordinaria — estudiantes activos', '📚 Periodo de matrícula ordinaria para estudiantes activos:
🗓️ Del 24 al 29 de agosto del 2026
🎓 Inicio de lecciones: 31 de agosto del 2026', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Matrícula ordinaria — estudiantes activos');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Matrícula extraordinaria (con recargo)', '⏳ Periodo de matrícula extraordinaria (con recargo):
🗓️ Del 31 de agosto al 6 de setiembre del 2026', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Matrícula extraordinaria (con recargo)');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Matrícula súper extraordinaria (con recargo)', '⏳ Periodo de matrícula súper extraordinaria (con recargo):
🗓️ Del 7 al 11 de setiembre del 2026', false, 'Aplica solo si el estudiante no ha cursado 2 sesiones de clase, es decir, si únicamente perdió 1 lección.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Matrícula súper extraordinaria (con recargo)');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Cómo matriculan los estudiantes regulares', '🔹 1. Ingreso al portal
Accedé al portal de estudiantes Acamsys:
🔗 https://uin.acamsys.com/student/login
Usuario y contraseña: tu número de cédula completo (si no lo has modificado antes).

🔹 2. Aceptación del contrato
Al ingresar verás el Contrato Estudiantil.
Deslizá hacia abajo, léelo con atención y presioná Aceptar.

🔹 3. Acceso al menú
En la parte superior verás el ícono de menú (tres líneas).
Hacé clic y buscá la opción Registro.

🔹 4. Selección de cursos
Elegí tu Plan de Estudio.
Para cursos regulares, seleccioná Sede Virtual.
Cursos disponibles: aparecen con un círculo.
Cursos no disponibles: aparecen con un candado.

🔹 5. Recordá el tiempo límite
La selección de cursos queda activa por 72 horas. Si no realizás el pago dentro de ese plazo, el sistema libera el cupo.

🔹 6. Pago de la matrícula
Ingresá a Cajas → Pagar con tarjeta. Ingresá los datos correspondientes y completá el pago.
⚠️ Si los datos de la tarjeta se ingresan incorrectamente, la prematrícula se elimina temporalmente como medida de seguridad.

🔹 7. Guía completa
También cuento con la guía oficial de uso de Acamsys, con pasos ilustrados. Si la necesitás, te la comparto con gusto.
G · Seguimiento y trámites administrativos', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Cómo matriculan los estudiantes regulares');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Seguimiento a prospecto contactado', '¡Hola de nuevo! 😄

Solo paso por aquí para asegurarme de que recibieras mi mensaje anterior. En la UIN queremos convertirnos en el motor que impulse tus sueños, y me encantaría ayudarte a elegir la carrera y la sede que mejor se adapten a tus metas.

Además, te recuerdo que el proceso de matrícula lo podemos hacer por este medio, sin necesidad de que te presentes personalmente a la sede 🏡. ¡Así de fácil y conveniente! ¿Te gustaría matricular? 💻', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Seguimiento a prospecto contactado');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Convalidación de estudios', 'Para este cuatrimestre, las convalidaciones no tienen ningún costo, por lo que es un excelente momento para avanzar y reconocer tus estudios previos.

Antes de iniciar el trámite formal, podemos realizar un preestudio sin compromiso, con el fin de valorar las materias que podrían convalidarse.

Para ello, únicamente necesitamos que nos compartás un documento donde se visualicen:
• Las materias aprobadas
• Sus respectivas notas
• Tus datos personales

Con esa información, la coordinadora de carrera revisará tu caso y nos indicará qué cursos podrían ser convalidados.

⭐ Requisitos para iniciar la convalidación formal
Si deseás avanzar con el proceso (con o sin preestudio previo), necesitaremos:
• Certificación de materias aprobadas, sellada y firmada, con menos de 3 meses de emitida.
• Programas de estudio, sellados y firmados en todas las páginas de las materias a convalidar.
• Plan de estudio, sellado y firmado.

Si gustás, puedo ayudarte desde ya a iniciar el preestudio y orientarte paso a paso durante el proceso.

¿Te gustaría enviarme los documentos para comenzar? 💙🚀', false, 'Los requisitos formales se solicitan solo cuando el estudiante decida avanzar (con o sin preestudio previo).'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Convalidación de estudios');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'TCU — información general', 'El TCU (Trabajo Comunal Universitario) es un requisito académico que permite al estudiante aportar a la comunidad mediante un servicio realizado en una institución sin fines de lucro, donde no trabajés vos ni familiares hasta el tercer grado de consanguinidad o afinidad.

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
El TCU tiene un costo administrativo de ₡30 640,95 con IVA incluido.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'TCU — información general');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Derechos de graduación', 'Fechas para cancelar los derechos de graduación:
🗓️ Del 20 de julio al 12 de setiembre del 2026

El costo de derecho de graduación es: ₡175 150 con IVA incluido.

📨 Para iniciar el trámite de derechos de graduación, debes enviar un correo electrónico al departamento de registro de la sede correspondiente 🏫.
Ellos verificarán que cumplas con todos los requisitos y te indicarán los pasos a seguir para el depósito del dinero y los demás trámites 🧾✅.
H · Correos del proceso de matrícula', false, 'Verificar en Acamsys que el plan de estudios esté "concluido" o "concluyendo" antes de indicar este trámite. Si el estudiante desea ingresar a la Licenciatura, debe cancelar primero los derechos de graduación de Bachillerato (Ingeniería Civil o Industrial).'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Derechos de graduación');
    ELSIF (cat_rec.name ILIKE '%correo%' OR cat_rec.name ILIKE '%seguimiento%' OR cat_rec.name ILIKE '%atención%') THEN
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Correo de reporte de pagos — Sede San Carlos', 'Este trámite debes solicitarlo a través de nuestro correo:
reportedepago@uin.cr

Debes indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, 'Indicar siempre al estudiante que debe incluir nombre completo, número de identificación y trámite por el cual se realiza el pago.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Correo de reporte de pagos — Sede San Carlos');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Correo de reporte de pagos — Sede San José', 'Este trámite debes solicitarlo a través de nuestro correo:
reportedepago-sj@uin.ac.cr

Debes indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Correo de reporte de pagos — Sede San José');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Correo de reporte de pagos — Centro de Atención Guápiles', 'Este trámite debes solicitarlo a través de nuestro correo:
reportedepago-gp@uin.ac.cr

Debes indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Correo de reporte de pagos — Centro de Atención Guápiles');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Correo de reporte de pagos — Centro de Atención Liberia', 'Este trámite debes solicitarlo a través de nuestro correo:
reportedepago-lb@uin.ac.cr

Debes indicar tu nombre completo, número de ID y el trámite por el cual se realiza el pago.', false, NULL
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Correo de reporte de pagos — Centro de Atención Liberia');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Envío de requisitos — lo redacta Ventas', '¡Qué alegría que ya estás dando este gran paso hacia un futuro extraordinario!

Para continuar con el trámite formal de tu matrícula en la carrera que seleccionaste, por favor completá la información en el siguiente formulario:

[LINK DEL FORMULARIO DE LA SEDE]

📌 Importante: indicá el correo electrónico que utilizás habitualmente, ya que una vez que llenés el formulario, te enviaremos a ese correo tu pre-matrícula y toda la información sobre pagos.

Este es tu momento único y sensacional para asegurar tu lugar y comenzar una experiencia académica maravillosa. ¡No lo dejés pasar!

Me avisás cuando lo llenás y enviás, por favor 😉', false, 'Este mensaje lo envía el personal de Ventas cuando el prospecto ya está listo para formalizar. Incluir el link del formulario de la sede correspondiente, según lo indicado por TI.'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Envío de requisitos — lo redacta Ventas');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Correo de pre-matrícula — lo redacta Registro y Plataforma', 'Hola [Nombre del estudiante],
¡Qué placer saludarte de nuevo!

Has dado el primer gran paso hacia un futuro increíble y transformador que te merecés. Estamos emocionados de acompañarte en este camino único hacia tus metas.

Hemos recibido la información que nos enviaste y hemos iniciado el proceso formal de tu inscripción con nosotros. Por eso, te comparto como adjunto:

Pre-matrícula de las materias que deseás matricular, donde podrás observar el horario disponible para este III Cuatrimestre 2026.
Importante: la pre-matrícula tiene una duración de 24 horas. Si no realizás el pago en ese plazo, los horarios podrían variar según la disponibilidad de espacios.

Términos y condiciones de la matrícula, que debés conocer antes de formalizar tu inscripción.

El monto a cancelar es:
• Sin financiamiento, pago de contado: ₡[monto en colones]
• Con financiamiento en 4 pagos, el primero al momento de matricular: ₡[monto en colones]
• Luego, te quedan tres mensualidades de ₡[monto], que se pagan en las siguientes fechas:
  💳 1 de octubre 2026
  💳 1 de noviembre 2026
  💳 1 de diciembre 2026

Para continuar, enviános:
• El comprobante de pago.
• El contrato institucional debidamente firmado (podés tomarle foto a la última página y enviarlo adjunto al correo).
• El documento firmado donde te das por enterado(a) y aceptás trasladarte a los laboratorios a la sede indicada (solo si la carrera incluye laboratorios).

Adjunto también encontrarás las cuentas bancarias de la institución para tu comodidad y los datos por si deseás realizar el pago mediante Sinpe Móvil.

Estamos listos para acompañarte en esta etapa. ¡Espero tu comprobante para formalizar tu matrícula!

Con entusiasmo,
[Nombre del asesor]', false, 'Se envía por correo una vez que el prospecto llenó el formulario. Pedirle que devuelva el correo firmado. El punto sobre laboratorios solo aplica si la carrera los incluye.
Asunto sugerido: ¡Asegura tu lugar hoy y vive una experiencia extraordinaria en la UIN!'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Correo de pre-matrícula — lo redacta Registro y Plataforma');
      INSERT INTO public.mensajes (categoria_id, sub_categoria, title, excerpt, is_pinned, internal_note)
      SELECT cat_rec.id, NULL, 'Correo de bienvenida tras confirmar el pago', 'Hola [Nombre del estudiante].

Te informo que tu matrícula fue formalizada para este III Cuatrimestre 2026 en la carrera de [Nombre de la carrera].

Este es un paso extraordinario y transformador hacia el futuro único que te merecés.

Adjunto encontrarás:

Informe de matrícula, donde podrás observar los cursos, horarios y los docentes que impartirán cada asignatura.
Recordá: las clases inician el 31 de agosto, ¡prepárate para una experiencia académica increíble!

Pagaré, donde se indican los montos a cancelar en cada cuota y la fecha de pago. Por favor, leé el documento, firmalo y enviálo a este mismo correo.

Además, te comparto:
• Usuario: [usuario]@estudiantesgach.com
• Contraseña: [contraseña temporal]

Debés ingresar a https://uin.acamsys.com/home con tu usuario y contraseña, y allí tendrás acceso a todas nuestras herramientas para las clases en línea (sincrónicas) y lo relacionado con el espacio para los trabajos asincrónicos.

Acá te adjunto un link de material de apoyo para activar las cuentas que vas a utilizar este cuatrimestre:
https://www.youtube.com/watch?v=ReMIcrtvV8c

Sesión de capacitación para estudiantes nuevos sobre el uso de nuestras plataformas:
Fecha: sábado 29 de agosto
Hora: 11:00 a.m.
Link de la reunión: CAPACITACION UIN NUEVOS | Reunión- Unirse | Microsoft Teams
https://teams.microsoft.com/meet/250763169646734?p=hmLfwqjWPZH6J1nQyb', false, 'Enviar una vez confirmado el pago y formalizada la matrícula. Recordar generar la contraseña del estudiante en Acamsys.
Asunto sugerido: ¡Bienvenid@ a la UIN! Tu matrícula está lista para un cuatrimestre extraordinario'
      WHERE NOT EXISTS (SELECT 1 FROM public.mensajes WHERE categoria_id = cat_rec.id AND title = 'Correo de bienvenida tras confirmar el pago');
    END IF;
  END LOOP;
END $$;
