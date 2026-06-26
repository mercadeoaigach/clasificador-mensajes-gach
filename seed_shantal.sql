-- Inserción de un usuario directamente en auth.users con contraseña 'Shantal2026!'
-- El hash de 'Shantal2026!' generado con bcrypt
DO $$
DECLARE
  new_user_id UUID := gen_random_uuid();
  new_conjunto_id UUID;
  cat_info_id UUID;
  cat_costos_id UUID;
  cat_tramites_id UUID;
  cat_seguimiento_id UUID;
BEGIN
  INSERT INTO auth.users (
    id, instance_id, aud, role, email, encrypted_password, email_confirmed_at, recovery_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, created_at, updated_at, confirmation_token, email_change, email_change_token_new, recovery_token
  ) VALUES (
    new_user_id,
    '00000000-0000-0000-0000-000000000000',
    'authenticated',
    'authenticated',
    'sgamboa@uin.ac.cr',
    crypt('Shantal2026!', gen_salt('bf')),
    now(),
    now(),
    now(),
    '{"provider":"email","providers":["email"]}',
    '{}',
    now(),
    now(),
    '',
    '',
    '',
    ''
  );

  INSERT INTO auth.identities (id, provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at)
  VALUES (gen_random_uuid(), 'sgamboa@uin.ac.cr', new_user_id, format('{"sub":"%s","email":"%s"}', new_user_id::text, 'sgamboa@uin.ac.cr')::jsonb, 'email', now(), now(), now());

  -- Crear conjunto
  INSERT INTO public.conjuntos (user_id, name) VALUES (new_user_id, 'Shantal 2026') RETURNING id INTO new_conjunto_id;

  -- Crear categorías
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Información Académica', 'bg-emerald', 'book-open') RETURNING id INTO cat_info_id;
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Costos y Financiamiento', 'bg-orange', 'credit-card') RETURNING id INTO cat_costos_id;
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Trámites y Requisitos', 'bg-blue', 'file-text') RETURNING id INTO cat_tramites_id;
  INSERT INTO public.categorias (conjunto_id, name, color, icon) VALUES (new_conjunto_id, 'Seguimiento y Atención', 'bg-purple', 'headphones') RETURNING id INTO cat_seguimiento_id;

  -- Mensajes
  INSERT INTO public.mensajes (categoria_id, title, excerpt) VALUES
  (cat_info_id, 'Modalidad Presencialidad Remota', '📚✨ Modalidad Presencialidad Remota 💻🌍
Estudiá de forma flexible y conectate con tus docentes en tiempo real desde cualquier lugar.
Las clases se imparten de forma virtual y sincrónica mediante nuestras plataformas Teams, Acamsys y Moodle.
🎥 Clases GrabadasTodas las sesiones quedan grabadas para que podás repasar contenidos o ponerte al día cuando lo necesités.
📍 Importante:
Los laboratorios se realizan de forma presencial, y el profesor les indicará cada cuánto deben presentarse.
Los talleres incluyen una gira académica.
🚀 Ventajas
• Conectate desde cualquier lugar
• Ahorrá tiempo en traslados
• Acompañamiento docente en cada clase ✨'),
  (cat_info_id, 'Carreras Disponibles (Ingenierías)', '¡Hola! 😊
Actualmente en la universidad contamos con las carreras de Ingeniería Civil e Ingeniería Industrial.
🔹 Ingeniería Civil es ideal si te interesa el diseño, construcción y supervisión de obras como edificios, carreteras, puentes y proyectos de infraestructura que impactan directamente en el desarrollo del país.
🔹 Ingeniería Industrial se enfoca en mejorar procesos dentro de las empresas, optimizar recursos, aumentar la productividad y gestionar proyectos en diferentes áreas de negocio.
Ambas carreras tienen amplias oportunidades laborales, ya que los profesionales en ingeniería son muy solicitados en diferentes sectores.
Además, desarrollan habilidades en análisis, liderazgo y resolución de problemas, muy valoradas en el mercado laboral.
Si gustas, con mucho gusto puedo brindarte más información sobre el plan de estudios y la modalidad de estudio. 📚'),
  (cat_info_id, 'Horarios Disponibles', 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN K/17:15-19:30
CONTAMINACIÓN AMBIENTAL K/19:45-22:00
FUNDAMENTOS DE ADMINISTRACIÓN J/17:15-19:30
TEORÍA DE LA COMUNICACIÓN J/19:45-22:00'),
  (cat_info_id, 'Aclaración sobre CIDEP', 'Hola! Muchas gracias por tu interés.
Te comento que nuestra universidad no ofrece carreras técnicas, cursos libres ni diplomados directamente.
Esos programas los imparte el Colegio Universitario CIDEP, que forma parte de nuestra misma corporación educativa.
📲 Para más información podés escribir al WhatsApp 87724337 📧 O bien al correo: info@cidep.cr Con gusto te van a orientar según lo que estés buscando.
Cualquier otra consulta, estamos para servirte.'),
  (cat_info_id, 'Información de Cursos MM (Civil)', 'Hola, muy buenas tardes! 😊
Te saluda Shantal Gamboa desde la sede San José. 🍎📚
Como le puedo ayudar?
Info de MM
Horarios:
•Diseño Estructural y de Materiales: Miércoles y Viernes, de 7:00 p.m. a 9:00 p.m. (hora de Costa Rica).
•Gestión de Infraestructura: Sábados, de 8:00 a.m. a 12:00 p.m. (hora de Costa Rica)
•Innovación de Geotecnia, Análisis de Data y Diseño Vial: Martes y Jueves de 7:00pm a 9:00pm
Fechas de inicio:
• Innovación de Geotecnia Análisis de Data y Diseño Vial 30 de junio 2026
• Diseño de Infraestructura y de Materiales para Pavimentos 5 de agosto 2026
• Gestión de Pavimentos 8 de agosto 2026
Requisitos: Título de grado en ingeniería Civil
Precio $300 USD'),
  (cat_costos_id, 'Detalles de Financiamiento 4x4', 'Le comento que no necesita fiador ni realizar trámites complicados para acceder a nuestro financiamiento.
Únicamente se firma un pagaré como compromiso de pago con la universidad.
Tenemos una opción muy cómoda para nuestros estudiantes 🤩
🍎 Financiamiento 4x4: Le permite financiar tanto la matrícula como las materias, cancelando el monto total en 4 tractos iguales durante el cuatrimestre.
El único costo adicional se incluye en el primer pago, que corresponde a ₡4.500 por el uso de herramientas tecnológicas.'),
  (cat_costos_id, 'Costos: Bachillerato', 'Hola, muy buenas tardes! 😊
Te saluda Shantal Gamboa desde la sede San José. 🍎📚
En este momento, podés aprovechar:
✅ 100% de descuento en matrícula.
✅ 10% de descuento en materias.
Con estos beneficios y un plan de financiamiento aprobado, estarías pagando solo:
₡90 577,61 al mes aproximadamente, durante un cuatri completo. 😱
Si te interesa, con mucho gusto puedo brindarte más información sobre:
1️⃣ Financiamiento 💳
2️⃣ Modalidad de estudio 📚
3️⃣ Convalidaciones 📝'),
  (cat_costos_id, 'Costos: Licenciatura', 'LICENCIATURA: Hola, muy buenas tardes! 😊
Te saluda Shantal Gamboa desde la sede San José. 🍎📚
En este momento, podés aprovechar:
✅ 50% de descuento en matrícula.
✅ 5% de descuento en materias.
Con estos beneficios y un plan de financiamiento aprobado, estarías pagando solo:
₡105 856,58 al mes aproximadamente, durante un cuatri completo. 😱
Si te interesa, con mucho gusto puedo brindarte más información sobre:
1️⃣ Financiamiento 💳
2️⃣ Modalidad de estudio 📚
3️⃣ Convalidaciones 📝'),
  (cat_costos_id, 'Costos: Ingeniería Ambiental', 'Hola, muy buenas tardes! 😊
Te saluda Shantal Gamboa desde la sede San José. 🍎📚
En este momento, podés aprovechar:
✅ 50% de descuento en matrícula. La matricula tiene un costo de 147.213,67 colones, con este descuento te queda en 73.607,23
✅ 10% de descuento en materias. Las materias tiene un costo de 98.142,57 colones, con este descuento te quedan en 88.328,31 colones
Con estos beneficios y un plan de financiamiento aprobado, estarías pagando solo: ₡111 230,06 al mes aproximadamente, durante un cuatri completo. 😱
Si te interesa, con mucho gusto puedo brindarte más información sobre:
1️⃣ Financiamiento 💳
2️⃣ Modalidad de estudio 📚
3️⃣ Convalidaciones 📝'),
  (cat_tramites_id, 'Requisitos Generales de Matrícula', 'Hola
Los requisitos para matricularte en bachillerato son:
• Fotografía del documento de identidad (ambos lados)
• Fotografía del título de bachillerato en educación media
• Una fotografía tamaño pasaporte o selfie
Con estos documentos, tu matrícula será rápida y sencilla. 💙'),
  (cat_tramites_id, 'Datos Solicitados para Matrícula', 'Requiero los siguientes datos:
- Provincia
- Cantón
- Distrito
- Correo
- Si cuenta con algún número adicional
- Estado civil
- Si tiene hijos
- Dirección exacta de donde vive
- Como se enteró de nosotros'),
  (cat_tramites_id, 'Proceso de Convalidaciones (Corta)', 'Hola 😊 ¡Tenemos excelentes noticias para este cuatrimestre!
Las convalidaciones no tienen ningún costo 🎉
Si deseas iniciar el trámite, solo necesitas enviarnos una certificación de materias aprobadas, la cual debe estar vigente, firmada y sellada. Debes de enviarla al correo del director de carrera ______ CC a kacosta@uin.ac.cr
Con este documento realizamos un estudio de pre-convalidación, donde podrás conocer qué materias se te pueden convalidar 📚
A partir de ahí, ya sabrás cuáles son los programas que debes solicitar para completar el proceso.
Quedo atenta para ayudarte en todo lo que necesitas 💬'),
  (cat_tramites_id, 'Proceso de Convalidaciones (Detallada)', 'Hola, con gusto te explico cómo funciona el proceso de convalidación de materias en nuestra universidad 📚
Para poder analizar las materias que deseas convalidar, necesitamos que presentes los siguientes documentos:
1️⃣ Certificación de notas de la universidad de procedencia vigente, donde se indica la nota y aprobación de las materias que deseas convalidar.
2️⃣ Plan de estudios, donde se detalla el contenido y los objetivos de los cursos que llevaste.
3️⃣ Programas de las materias que deseas convalidar, firmados y sellados por la universidad de procedencia.
Si los programas tienen firma digital, también son válidos.
4️⃣ Si deseas convalidar el TCU, debes presentar una certificación donde se indique que fue aprobado y la cantidad de horas realizadas.
✨ Con estos documentos nuestro equipo académico podrá revisar tu caso y determinar las materias que se pueden convalidar.'),
  (cat_seguimiento_id, 'Aviso de Fuera de Matrícula', '¡Hola, te saluda Shantal Gamboa desde la sede San José! 🍎📚😊
En este momento todavía no estamos en período de matrícula, por lo que aún no puedo brindarte el costo con descuentos o financiamiento.
Sin embargo, te adjunto nuestra factura proforma donde podrás ver el costo de la matrícula y de cada materia sin descuentos, para que tengás una referencia.
Cualquier consulta con gusto te ayudo. 📚'),
  (cat_seguimiento_id, 'Seguimiento de Interés (General)', 'Hola! 😊
Queríamos saber si tuviste la oportunidad de revisar la información que te compartimos.
Nos encantaría conocer tu opinión y saber qué te pareció.
Si tienes alguna duda o necesitas más detalles, con gusto estoy para ayudarte 💬'),
  (cat_seguimiento_id, 'Seguimiento para Retomar Matrícula', 'Hola 😊 ¡Espero que estés súper bien!
Quería consultarte si te gustaría retomar tu proceso de matrícula.
Estoy aquí para ayudarte en todo lo que necesitas 💬
¡Aprovecha los descuentos vigentes y no dejes pasar esta oportunidad! 🚀'),
  (cat_seguimiento_id, 'Invitación a Capacitación', 'Por este medio le informamos que el próximo sábado 09 de mayo a la 1:30 pm, la Universidad Isaac Newton llevará a cabo una capacitación virtual, a la cual es importante que todos los participantes se conecten.
La sesión se realizará a través de Microsoft Teams. A continuación, encontrará los detalles de acceso:
Reunión de Microsoft Teams https://teams.microsoft.com/meet/270247214646658?p=CkRHVThSnQvaJ7Jc0T
Id. de reunión: 270 247 214 646 658
Código de acceso: sF39FW98');

END $$;
