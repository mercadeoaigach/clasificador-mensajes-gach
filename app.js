// Inicializar iconos de Lucide
lucide.createIcons();

// --- ESTADO Y DUMMY DATA ---

const defaultWorkspaceCategories = [
    {
        "id": "cat_1",
        "name": "Carreras y sedes",
        "color": "bg-indigo",
        "icon": "map-pin"
    },
    {
        "id": "cat_2",
        "name": "Primer contacto",
        "color": "bg-pink",
        "icon": "user-plus"
    },
    {
        "id": "cat_3",
        "name": "Información académica clave",
        "color": "bg-emerald",
        "icon": "book-open"
    },
    {
        "id": "cat_4",
        "name": "Financiamiento y costos",
        "color": "bg-orange",
        "icon": "credit-card"
    },
    {
        "id": "cat_5",
        "name": "Proceso de matrícula y trámites",
        "color": "bg-blue",
        "icon": "file-text"
    },
    {
        "id": "cat_6",
        "name": "Correos del proceso de matrícula",
        "color": "bg-purple",
        "icon": "mail"
    }
];

const defaultAppMessages = [
    {
        "id": 1,
        "categoryId": "cat_1",
        "subCategory": null,
        "code": "A3",
        "title": "Carrera no acreditada en el Centro de Atención",
        "excerpt": "En el caso de la carrera que te interesa 🎓, esta se encuentra aprobada oficialmente en nuestra Sede Central en San Carlos 🏛️ y en nuestra Sede Metropolitana San José. Sin embargo, gracias a nuestra modalidad mixta y a las clases sincrónicas por Microsoft Teams 💻📚, funcionamos como tu Centro de Atención Estudiantil 📍.\n\nEsto significa que no tenés que desplazarte para tus gestiones. Podés realizar todos tus trámites directamente en nuestra sede, entre ellos:\n✅ Matrícula\n✅ Trámites administrativos\n✅ Pagos\n✅ Consultas y acompañamiento académico\n✅ ¡Y mucho más! 💼📝\n\nAsí podés estudiar con total comodidad, mientras la Universidad Isaac Newton (UIN) se te ayuda a construir tu futuro profesional 🍎."
    },
    {
        "id": 2,
        "categoryId": "cat_1",
        "subCategory": null,
        "code": "A4",
        "title": "Adición: cursos con laboratorio presencial",
        "excerpt": "Además, es importante que tomés en cuenta que esta carrera incluye algunos cursos con laboratorio, los cuales son presenciales 🔬🧪.\n\n🗓️ La buena noticia es que no se imparten semanalmente. Estos laboratorios se realizan en nuestra Sede San Carlos, Sede Metropolitana San José y el Centro de Atención de Liberia 📍.\n\n🚗 Por este motivo, deberás trasladarte únicamente para esos cursos específicos 🛣️🎒.\n\nEste formato te permite llevar la carrera con mucha flexibilidad, aprovechando las clases en línea y asistiendo solo cuando realmente es necesario."
    },
    {
        "id": 3,
        "categoryId": "cat_2",
        "subCategory": null,
        "code": "B1",
        "title": "Saludo general",
        "excerpt": "Hola, ¡qué gusto saludarte! 😊\n\nGracias por acercarte a la Universidad Isaac Newton, una institución que transforma vidas a través de la educación de calidad, construyendo el futuro profesional de miles de personas que han confiando en nosotros.\n\n👉 Estoy aquí para hacer tu proceso más fácil y ayudarte a dar ese paso que abrirá nuevas oportunidades en tu futuro.\n\nMe encantaría acompañarte en este camino y orientarte para que encuentres el programa ideal según tus metas profesionales.\n\n¿Podrías contarme qué carrera te interesa?"
    },
    {
        "id": 4,
        "categoryId": "cat_2",
        "subCategory": null,
        "code": "B2",
        "title": "Solicitud de datos a prospectos nuevos",
        "excerpt": "✨ En la UIN queremos brindarte una atención más ágil y personalizada.\n\nPara poder ayudarte mejor y acompañarte en tu proceso, ¿nos podés compartir estos datos?\n• Nombre completo\n• Número de cédula\n• Correo electrónico\n\nCon esta información podemos:\n✅ Identificarte rápidamente sin hacerte repetir datos en cada consulta.\n✅ Enviarte información, documentos y avances directamente a tu correo.\n✅ Agilizar tus trámites y darte respuestas más rápidas y precisas.\n\nAsí tu proceso es mucho más sencillo, seguro y sin complicaciones 🌟"
    },
    {
        "id": 5,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C1a",
        "title": "Periodo de matrícula — Ordinaria: nuevos ingresos o reingresos",
        "excerpt": "📅 Periodo de matrícula ordinaria para nuevos ingresos o reingresos:\n🗓️ Del 27 de julio al 29 de agosto del 2026\n🎓 Inicio de lecciones: 31 de agosto del 2026"
    },
    {
        "id": 6,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C1b",
        "title": "Periodo de matrícula — Ordinaria: estudiantes activos",
        "excerpt": "📚 Periodo de matrícula ordinaria para estudiantes activos:\n🗓️ Del 24 al 29 de agosto del 2026\n🎓 Inicio de lecciones: 31 de agosto del 2026"
    },
    {
        "id": 7,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C1c",
        "title": "Periodo de matrícula — Extraordinaria",
        "excerpt": "⏳ Periodo de matrícula extraordinaria (con recargo):\n🗓️ Del 31 de agosto al 6 de setiembre 2026"
    },
    {
        "id": 8,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C1d",
        "title": "Periodo de matrícula — Súper extraordinaria",
        "excerpt": "⏳ Periodo de matrícula súper extraordinaria (con recargo y siempre que no haya cursado 2 sesiones de clases, es decir, que solo haya perdido 1 lección):\n🗓️ Del 7 al 11 de setiembre 2026"
    },
    {
        "id": 9,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C2",
        "title": "Modalidad",
        "excerpt": "Nuestra modalidad está diseñada para impulsar tus metas con la flexibilidad que necesitas y la calidad que te merecés. 💫\n\nTrabajamos bajo un modelo mixto, que combina lo mejor de la educación virtual y presencial:\n\n✔️ Clases sincrónicas en línea a través de Microsoft Teams, donde interactúás en tiempo real con tus docentes.\n✔️ Las clases quedan grabadas, para que puedas repasarlas cuando lo necesités y avanzar a tu propio ritmo.\n✔️ Podés conectarte desde cualquier lugar, lo que te permite estudiar incluso si viajás o vivís lejos de la sede.\n✔️ Presencialidad obligatoria únicamente en los cursos de laboratorio, garantizando el aprendizaje práctico que te prepara para el mundo real, según el cronograma que en cada caso se facilite."
    },
    {
        "id": 10,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C3",
        "title": "¿Hay becas?",
        "excerpt": "Si bien existen algunas becas aprobadas por el Consejo Universitario y otras derivadas de convenios específicos, actualmente buscamos apoyar al mayor número posible de estudiantes.\n\nPor eso, ponemos a tu disposición excelentes descuentos accesibles para toda nuestra comunidad estudiantil, diseñados para que podás iniciar tu carrera sin que lo económico sea un obstáculo. 🌟📘\n\nEstos beneficios te permiten avanzar con tranquilidad y permitir a la Universidad Isaac Newton que te acompañe a construir tu futuro 🚀💙."
    },
    {
        "id": 11,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C4",
        "title": "Requisitos para matricular (por grado) - Bachillerato",
        "excerpt": "📚 Requisitos para Bachillerato:\n• Fotografía del documento de identidad (ambos lados).\n• Fotografía del título de Bachillerato en Educación Media.\n• Fotografía tamaño pasaporte o selfie frontal y formal."
    },
    {
        "id": 12,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C4",
        "title": "Requisitos para matricular (por grado) - Licenciatura",
        "excerpt": "🎓 Requisitos para Licenciatura:\n• Fotografía del documento de identidad (ambos lados).\n• Fotografía del título de Bachillerato en Educación Media.\n• Fotografía del título de Bachillerato Universitario.\n• Certificación del TCU (si se realizó en otra institución), con menos de 3 meses de emitida.\n• Fotografía tamaño pasaporte."
    },
    {
        "id": 13,
        "categoryId": "cat_3",
        "subCategory": null,
        "code": "C4",
        "title": "Requisitos para matricular (por grado) - Maestría",
        "excerpt": "🎓 Requisitos para Maestría:\n• Fotografía del documento de identidad (ambos lados).\n• Fotografía del título de Bachillerato en Educación Media.\n• Fotografía del título de Bachillerato Universitario afín.\n• Fotografía tamaño pasaporte.\n• Documento que compruebe haber realizado 150 horas de TCU."
    },
    {
        "id": 14,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D1",
        "title": "Métodos de financiamiento",
        "excerpt": "La Universidad Isaac Newton (UIN) pone a su disposición dos métodos de financiamiento diseñados para brindarle accesibilidad y flexibilidad en su proceso académico:\n\n🔹 Financiamiento Todo Terreno\nEste método le permite financiar tanto la matrícula como las materias. El monto total se divide en 4 tractos iguales. Únicamente en el primer pago se agrega un monto de ₡4 500 correspondiente al uso de herramientas tecnológicas 🛠️.\n\n🔹 Financiamiento 1, 2, 3\nEn este caso, el primer pago incluye:\n• El total de la matrícula\n• El monto de ₡4 500 por herramientas tecnológicas\n• El 25% del costo de las materias\nEl 75% restante se financia en 3 tractos iguales 📊📆.\n\n✔ Beneficios importantes\n• No requiere fiador\n• No requiere trámites adicionales\n• Únicamente se firma un pagaré como compromiso de pago ✍️🤝\n\n📅 Fechas de pago — III Cuatrimestre 2026 (el primer pago se realiza al matricular y luego los 3 tractos serían):\n• Primera mensualidad: 1 de octubre 2026\n• Segunda mensualidad: 1 de noviembre 2026\n• Tercera mensualidad: 1 de diciembre 2026\n\nSi desea, puedo brindarle una simulación de pagos según la carrera que le interesa. Será un gusto acompañarle en este proceso para que la UIN te acompañe a Construir Tu Futuro 🚀💙."
    },
    {
        "id": 15,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D2",
        "title": "Cierre — manifiesta interés en matricular - Pregunta inicial",
        "excerpt": "🤩 Si gustás, podés indicarme cuántas materias te interesa llevar y si preferís optar por nuestro financiamiento o pagar de contado.\n\nCon esa información puedo darte el monto exacto que tendrías que cancelar al matricular y el valor de cada cuota."
    },
    {
        "id": 16,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D2",
        "title": "Cierre — manifiesta interés en matricular - Detalle de montos",
        "excerpt": "Para [XX] materias, deberías cancelar al momento de matricular un monto de ₡[monto].\nLuego, te quedarían tres mensualidades de ₡[monto], que se pagarían en las siguientes fechas:\n•  💳 1 de octubre 2026\n•  💳 1 de noviembre 2026\n•  💳 1 de diciembre 2026\n\nSi preferís pagar de contado, el total del cuatrimestre sería de ₡[monto total].\n\nQuedo atenta para ayudarte con lo que necesités y acompañarte en este proceso para que la UIN te acompañe a Construir Tu Futuro 🚀💙."
    },
    {
        "id": 17,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D3a",
        "title": "TCU — Costo administrativo",
        "excerpt": "📝 El TCU (Trabajo Comunal Universitario) tiene un costo administrativo de ₡30 640,95 (IVA incluido).\n\nEste costo cubre el registro y acompañamiento durante las 150 horas de servicio que deberás completar en una institución sin fines de lucro.\n\nAl matricularlo, recibirás una convocatoria para una reunión informativa donde se explica todo el proceso, el cronograma y los pasos a seguir 📋🚀💙."
    },
    {
        "id": 18,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D3b",
        "title": "Práctica Profesional",
        "excerpt": "🏢 El costo de la Práctica Profesional es de ₡370 000.\n\nSi deseás iniciar el proceso, podés indicarme y te orientamos sobre los pasos a seguir 🚀💙."
    },
    {
        "id": 19,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D3c",
        "title": "Tesis",
        "excerpt": "🎓 El costo de la Tesis es:\n• Precio aprobado CONESUP: ₡600 000\n• Descuento aplicado: 10%\n• Total a pagar: ₡540 000\n\nSi deseás iniciar el proceso, con gusto te acompaño en los próximos pasos 🚀💙."
    },
    {
        "id": 20,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D3d",
        "title": "Tesina",
        "excerpt": "🎓 El costo de la Tesina es de ₡240 000.\n\nSi deseás iniciar el proceso, con gusto te acompaño en los próximos pasos 🚀💙."
    },
    {
        "id": 21,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D3e",
        "title": "Prueba de Grado",
        "excerpt": "🎓 El costo de la Prueba de Grado es:\n• Precio aprobado CONESUP: ₡600 000\n• Descuento aplicado: 10%\n• Total a pagar: ₡540 000\n\nSi deseás iniciar el proceso, con gusto te acompaño en los próximos pasos 🚀💙."
    },
    {
        "id": 22,
        "categoryId": "cat_4",
        "subCategory": "🔬 CON LABORATORIO PRESENCIAL",
        "code": "D4a",
        "title": "Fundamentos de Química",
        "excerpt": "🔬 Quería comentarte que el curso de Fundamentos de Química incluye un Laboratorio Presencial, el cual se realiza en nuestra Sede San Carlos, Sede Metropolitana San José o el Centro de Atención de Liberia 📍.\n\n🗓️ La buena noticia es que no se imparte semanalmente — al inicio del cuatrimestre te compartimos el cronograma con las fechas específicas para que te organices con tiempo.\n\nEl costo de esta materia es de ₡174 616,90. ¿Te gustaría saber más sobre cómo funciona el laboratorio? 🚀💙"
    },
    {
        "id": 23,
        "categoryId": "cat_4",
        "subCategory": "🔬 CON LABORATORIO PRESENCIAL",
        "code": "D4b",
        "title": "Física I",
        "excerpt": "🔬 Quería comentarte que el curso de Física I incluye un Laboratorio Presencial, el cual se realiza en nuestra Sede San Carlos, Sede Metropolitana San José o el Centro de Atención de Liberia 📍.\n\n🗓️ La buena noticia es que no se imparte semanalmente — al inicio del cuatrimestre te compartimos el cronograma con las fechas específicas para que te organices con tiempo.\n\nEl costo de esta materia es de ₡174 616,90. ¿Te gustaría saber más sobre cómo funciona el laboratorio? 🚀💙"
    },
    {
        "id": 24,
        "categoryId": "cat_4",
        "subCategory": "🔬 CON LABORATORIO PRESENCIAL",
        "code": "D4c",
        "title": "Física II",
        "excerpt": "🔬 Quería comentarte que el curso de Física II incluye un Laboratorio Presencial, el cual se realiza en nuestra Sede San Carlos, Sede Metropolitana San José o el Centro de Atención de Liberia 📍.\n\n🗓️ La buena noticia es que no se imparte semanalmente — al inicio del cuatrimestre te compartimos el cronograma con las fechas específicas para que te organices con tiempo.\n\nEl costo de esta materia es de ₡174 616,90. ¿Te gustaría saber más sobre cómo funciona el laboratorio? 🚀💙"
    },
    {
        "id": 25,
        "categoryId": "cat_4",
        "subCategory": "🚌 CON GIRA ACADÉMICA",
        "code": "D4d",
        "title": "Contaminación Ambiental",
        "excerpt": "🚌 Quería comentarte que el curso de Contaminación Ambiental incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.\n\nLa gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.\n\nEl costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙."
    },
    {
        "id": 26,
        "categoryId": "cat_4",
        "subCategory": "🚌 CON GIRA ACADÉMICA",
        "code": "D4e",
        "title": "Control de Calidad I",
        "excerpt": "🚌 Quería comentarte que el curso de Control de Calidad I incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.\n\nLa gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.\n\nEl costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙."
    },
    {
        "id": 27,
        "categoryId": "cat_4",
        "subCategory": "🚌 CON GIRA ACADÉMICA",
        "code": "D4f",
        "title": "Materiales de Construcción",
        "excerpt": "🚌 Quería comentarte que el curso de Materiales de Construcción incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.\n\nLa gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.\n\nEl costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙."
    },
    {
        "id": 28,
        "categoryId": "cat_4",
        "subCategory": "🚌 CON GIRA ACADÉMICA",
        "code": "D4g",
        "title": "Investigación de Operaciones Avanzadas I",
        "excerpt": "🚌 Quería comentarte que el curso de Investigación de Operaciones Avanzadas I incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.\n\nLa gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.\n\nEl costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙."
    },
    {
        "id": 29,
        "categoryId": "cat_4",
        "subCategory": "🚌 CON GIRA ACADÉMICA",
        "code": "D4h",
        "title": "Vías de Comunicación I",
        "excerpt": "🚌 Quería comentarte que el curso de Vías de Comunicación I incluye una Gira Académica, que es una actividad presencial y obligatoria dentro del programa de la materia.\n\nLa gira es coordinada desde la sede y te avisamos con anticipación las fechas y los detalles logísticos para que puedas organizarte 📅.\n\nEl costo de esta materia es de ₡87 308,45 más ₡30 000 por costos de la gira (incluye transporte, póliza estudiantil y merienda). Si querés, puedo darte más detalles 🚀💙."
    },
    {
        "id": 30,
        "categoryId": "cat_4",
        "subCategory": "📚 CURSOS DOBLES",
        "code": "D4i",
        "title": "Cálculo Diferencial e Integral I",
        "excerpt": "📚 Te comento que el curso de Cálculo Diferencial e Integral I es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.\n\nAl matricularlo, equivale a llevar 2 materias:\n• Costo total por este curso: ₡174 616,90\n\nSi querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙."
    },
    {
        "id": 31,
        "categoryId": "cat_4",
        "subCategory": "📚 CURSOS DOBLES",
        "code": "D4j",
        "title": "Análisis Vectorial",
        "excerpt": "📚 Te comento que el curso de Análisis Vectorial es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.\n\nAl matricularlo, equivale a llevar 2 materias:\n• Costo total por este curso: ₡174 616,90\n\nSi querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙."
    },
    {
        "id": 32,
        "categoryId": "cat_4",
        "subCategory": "📚 CURSOS DOBLES",
        "code": "D4k",
        "title": "Algebra Lineal",
        "excerpt": "📚 Te comento que el curso de Algebra Lineal es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.\n\nAl matricularlo, equivale a llevar 2 materias:\n• Costo total por este curso: ₡174 616,90\n\nSi querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙."
    },
    {
        "id": 33,
        "categoryId": "cat_4",
        "subCategory": "📚 CURSOS DOBLES",
        "code": "D4l",
        "title": "Ecuaciones Diferenciales",
        "excerpt": "📚 Te comento que el curso de Ecuaciones Diferenciales es un Curso Doble, lo que significa que tiene el valor de 2 materias tanto en créditos como en costo.\n\nAl matricularlo, equivale a llevar 2 materias:\n• Costo total por este curso: ₡174 616,90\n\nSi querés que te calcule el total del cuatrimestre según tus materias, con gusto lo hago 🚀💙."
    },
    {
        "id": 34,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D5",
        "title": "Bachillerato — Primer Ingreso y Reingreso",
        "excerpt": "🌟 Para este III Cuatrimestre 2026, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes de primer ingreso en Bachillerato en Ingeniería:\n\n📌 Matrícula:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento aplicado: 100%\n• Total a pagar: ₡0 ✅ (¡matrícula gratis!)\n\n📌 Materias:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento: 10%\n• Total por materia: ₡78 577,64\n\n⭐ ¡Este es un beneficio excepcional y una excelente oportunidad para iniciar tu formación profesional!\n\nSi deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato. Solo indicame cuántas materias te gustaría llevar 🚀💙."
    },
    {
        "id": 35,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D6",
        "title": "Bachillerato — Regular / Activo",
        "excerpt": "📘 Si sos estudiante activo, este III Cuatrimestre 2026 es una oportunidad ideal para seguir avanzando y no detener tu proceso académico.\nLa Universidad Isaac Newton quiere acompañarte para que continúes construyendo tu meta profesional.\n\n📌 Matrícula:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento aplicado: 50%\n• Total a pagar: ₡43 654,23\n\n📌 Materias:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento: 5%\n• Total por materia: ₡82 943,03\n\n🔵 Continuar te acerca a tu título, te mantiene en ritmo y evita retrocesos que después son más difíciles de retomar.\n\nSi querés, puedo calcularte el total a pagar según las materias que deseás llevar 🚀💙."
    },
    {
        "id": 36,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D7",
        "title": "Licenciatura — Nuevo Ingreso y Reingreso",
        "excerpt": "🌟 Para este III Cuatrimestre 2026, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes de nuevo ingreso en nuestra Licenciatura en Ingeniería:\n\n📌 Matrícula:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento aplicado: 50%\n• Total a pagar: ₡43 654,23\n\n📌 Materias:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento: 5%\n• Total por materia: ₡82 943,03\n\n⭐ ¡Este es un beneficio excepcional y una excelente oportunidad para continuar fortaleciendo tu formación profesional!\n\nSi deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato. Solo necesito que me confirmés cuántas materias te gustaría llevar 🚀💙."
    },
    {
        "id": 37,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D8",
        "title": "Licenciatura — Activo / Regular",
        "excerpt": "📘 Si sos estudiante activo, este III Cuatrimestre 2026 es un excelente momento para retomar tu carrera y avanzar hacia tus metas profesionales. En la Universidad Isaac Newton queremos que aprovechés esta oportunidad:\n\n📌 Matrícula:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento aplicado: 35%\n• Total a pagar: ₡56 750,49\n\n📌 Materias:\n• Costo aprobado CONESUP: ₡87 308,45\n• Descuento: 5%\n• Total por materia: ₡82 943,03\n\nSi querés, puedo ayudarte a calcular el total según las materias que te gustaría matricular.\n¿Deseás que avancemos? 🚀💙"
    },
    {
        "id": 38,
        "categoryId": "cat_4",
        "subCategory": null,
        "code": "D9",
        "title": "Maestría en Ingeniería Ambiental — Nuevo Ingreso, Activo / Regular y Reingreso",
        "excerpt": "🌟 Para este III Cuatrimestre 2026, la Universidad Isaac Newton ha habilitado beneficios especiales para los estudiantes en nuestra Maestría en Ingeniería Ambiental:\n\n📌 Matrícula:\n• Costo aprobado CONESUP: ₡147 213,99\n• Descuento aplicado: 50%\n• Total a pagar: ₡73 607\n\n📌 Materias:\n• Costo aprobado CONESUP: ₡98 142,57\n• Descuento: 10%\n• Total por materia: ₡88 328,31\n\n⭐ ¡Este es un beneficio excepcional y una excelente oportunidad para continuar fortaleciendo tu formación profesional!\n\nSi deseás asegurar tu cupo, puedo ayudarte a completar tu proceso de matrícula de inmediato 🚀💙."
    },
    {
        "id": 39,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E1",
        "title": "Cómo matriculan los estudiantes regulares (Acamsys)",
        "excerpt": "🔹 1. Ingreso al portal\nAccedé al portal de estudiantes Acamsys: 🔗 https://uin.acamsys.com/student/login\nUsuario y contraseña: tu número de cédula completo (si no lo has modificado antes).\n\n🔹 2. Aceptación del contrato\nAl ingresar verás el Contrato Estudiantil. Deslizá hacia abajo, léelo con atención y presioná Aceptar.\n\n🔹 3. Acceso al menú\nEn la parte superior verás el ícono de menú (tres líneas). Hacé clic y buscá la opción Registro.\n\n🔹 4. Selección de cursos\n• Elegí tu Plan de Estudio.\n• Para cursos regulares, seleccioná Sede Virtual.\n\nCursos disponibles: aparecen con un círculo.\nCursos no disponibles: aparecen con un candado.\n\n🔹 5. Recordá el tiempo límite\nLa selección de cursos queda activa por 72 horas. Si no realizás el pago dentro de ese plazo, el sistema libera el cupo.\n\n🔹 6. Pago de la matrícula\nIngresá a Cajas → Pagar con tarjeta. Ingresá los datos correspondientes y completá el pago.\n⚠️ Si los datos de la tarjeta se ingresan incorrectamente, la prematrícula se elimina temporalmente como medida de seguridad.\n\n🔹 7. Guía completa\nTambién cuento con la guía oficial de uso de Acamsys, con pasos ilustrados. Si la necesitás, te la comparto con gusto."
    },
    {
        "id": 40,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E2",
        "title": "Seguimiento a quien ya le mandamos información",
        "excerpt": "¡Hola de nuevo! 😄\n\nSolo paso por aquí para asegurarme de que recibieras mi mensaje anterior. En la UIN queremos convertirnos en el motor que impulse tus sueños, y me encantaría ayudarte a elegir la carrera y la sede que mejor se adapten a tus metas.\n\nAdemás, te recuerdo que el proceso de matrícula lo podemos hacer por este medio, sin necesidad de que te presentes personalmente a la sede 🏡. ¡Así de fácil y conveniente! ¿Te gustaría matricular? 💻"
    },
    {
        "id": 41,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E3a",
        "title": "Correo de reporte de pagos — Sede San Carlos",
        "excerpt": "Este trámite debes solicitarlo a través de nuestro correo:\n\n📧 Sede de San Carlos: reportedepago@uin.cr.com\n\nDebés indicar tu nombre completo, número de cédula y el trámite por el cual se realiza el pago."
    },
    {
        "id": 42,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E3b",
        "title": "Correo de reporte de pagos — Sede San José",
        "excerpt": "Este trámite debes solicitarlo a través de nuestro correo:\n\n📧 Sede de San José: reportedepago-sj@uin.ac.cr.com\n\nDebés indicar tu nombre completo, número de cédula y el trámite por el cual se realiza el pago."
    },
    {
        "id": 43,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E3c",
        "title": "Correo de reporte de pagos — Centro de Atención Guápiles",
        "excerpt": "Este trámite debes solicitarlo a través de nuestro correo:\n\n📧 Centro de Atención Guápiles: reportedepago-gp@uin.ac.cr.com\n\nDebés indicar tu nombre completo, número de cédula y el trámite por el cual se realiza el pago."
    },
    {
        "id": 44,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E3d",
        "title": "Correo de reporte de pagos — Centro de Atención Liberia",
        "excerpt": "Este trámite debes solicitarlo a través de nuestro correo:\n\n📧 Centro de Atención Liberia: reportedepago-lb@uin.ac.cr.com\n\nDebés indicar tu nombre completo, número de cédula y el trámite por el cual se realiza el pago."
    },
    {
        "id": 45,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E4",
        "title": "Convalidación de estudios",
        "excerpt": "Para este cuatrimestre, las convalidaciones no tienen ningún costo, por lo que es un excelente momento para avanzar y reconocer tus estudios previos.\n\nAntes de iniciar el trámite formal, podemos realizar un preestudio sin compromiso, con el fin de valorar las materias que podrían convalidarse.\n\nPara ello, únicamente necesitamos que nos compartás un documento donde se visualicen:\n• Las materias aprobadas\n• Sus respectivas notas\n• Tus datos personales\n\nCon esa información, la coordinadora de carrera revisará tu caso y nos indicará qué cursos podrían ser convalidados.\n\n⭐ Requisitos para iniciar la convalidación formal:\n• Certificación de materias aprobadas, sellada y firmada, con menos de 3 meses de emitida.\n• Programas de estudio, sellados y firmados en todas las páginas de las materias a convalidar.\n• Plan de estudio, sellado y firmado.\n\nSi gustás, puedo ayudarte desde ya a iniciar el preestudio y orientarte paso a paso durante el proceso.\n¿Te gustaría enviarme los documentos para comenzar? 💙🚀"
    },
    {
        "id": 46,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E5",
        "title": "TCU — Información completa",
        "excerpt": "El TCU (Trabajo Comunal Universitario) es un requisito académico que permite al estudiante aportar a la comunidad mediante un servicio realizado en una institución sin fines de lucro, donde no trabajés vos ni familiares hasta el tercer grado de consanguinidad o afinidad.\n\n🔹 Duración y naturaleza del TCU\n• Consiste en completar 150 horas de trabajo durante el cuatrimestre en que se matricula.\n• Es una labor no remunerada, enfocada en responsabilidad social y desarrollo profesional.\n\n🔹 Reunión informativa obligatoria\nUna vez matriculado el TCU, recibirás una convocatoria para una reunión en el horario de clase donde se explica:\n• Cómo funciona el TCU\n• El cronograma oficial\n• Cómo elegir la institución donde lo realizarás\n• La elaboración y entrega del anteproyecto\n• Los pasos a seguir después de su aprobación\n\n🔹 Costo administrativo\nEl TCU tiene un costo administrativo de: ₡30 640,95 con IVA incluido."
    },
    {
        "id": 47,
        "categoryId": "cat_5",
        "subCategory": null,
        "code": "E6",
        "title": "Derechos de graduación",
        "excerpt": "Fechas para cancelar los derechos de graduación:\n🗓️ Del 20 de julio al 12 de setiembre del 2026\n\n💰 Costo del derecho de graduación: ₡175 150 (IVA incluido)\n\n⚠️ Si deseás ingresar a la Licenciatura, primero debés cancelar los derechos de graduación de Bachillerato, tanto para Ingeniería Civil como para Ingeniería Industrial.\n\n📨 Para iniciar el trámite, debés enviar un correo electrónico al departamento de Registro de la sede correspondiente 🏫. Ellos verificarán que cumplás con todos los requisitos y te indicarán los pasos a seguir para el depósito del dinero y los demás trámites 🧾✅."
    },
    {
        "id": 48,
        "categoryId": "cat_6",
        "subCategory": null,
        "code": "F1",
        "title": "CRM — cuando el prospecto ya mandó los requisitos",
        "excerpt": "¡Qué alegría que ya estás dando este gran paso hacia un futuro extraordinario!\n\nPara continuar con el trámite formal de tu matrícula en la carrera que seleccionaste, por favor completá la información en el siguiente formulario:\n[link de la SEDE, según lo que envíe TI]\n\n📌 Importante: indicá el correo electrónico que utilizás habitualmente, ya que una vez que llenes el formulario, te enviaremos a ese correo tu pre-matrícula y toda la información sobre pagos.\n\nEste es tu momento único y sensacional para asegurar tu lugar y comenzar una experiencia académica maravillosa. ¡No lo dejés pasar!\n\nMe avisás cuando lo llenás y enviás, por favor 😉"
    },
    {
        "id": 49,
        "categoryId": "cat_6",
        "subCategory": null,
        "code": "F2",
        "title": "Correo de pre-matrícula - Asunto del correo",
        "excerpt": "¡Asegurá tu lugar hoy y viví una experiencia extraordinaria en la UIN!"
    },
    {
        "id": 50,
        "categoryId": "cat_6",
        "subCategory": null,
        "code": "F2",
        "title": "Correo de pre-matrícula - Cuerpo del correo",
        "excerpt": "Hola [Nombre del estudiante],\n¡Qué placer saludarte de nuevo!\n\nHas dado el primer gran paso hacia un futuro increíble y transformador que te merecés. Estamos emocionados de acompañarte en este camino único hacia tus metas.\n\nHemos recibido la información que nos enviaste y hemos iniciado el proceso formal de tu inscripción con nosotros. Por eso, te comparto como adjunto:\n\n1. Pre-matrícula de las materias que deseás matricular, donde podrás observar el horario disponible para este III Cuatrimestre 2026.\n\nImportante: La pre-matrícula tiene una duración de 24 horas. Si no realizás el pago en ese plazo, los horarios podrían variar según la disponibilidad de espacios.\n\n2. Términos y condiciones de la matrícula, que debés conocer antes de formalizar tu inscripción.\n\nEl monto a cancelar es:\n• Sin financiamiento, pago de contado: ₡[monto en colones]\n• Con financiamiento 4 pagos, el primero al momento de matricular: ₡[monto en colones]\n\nLuego, te quedan tres mensualidades de ₡[monto], que se pagan en las siguientes fechas:\n•  💳 1 de octubre 2026\n•  💳 1 de noviembre 2026\n•  💳 1 de diciembre 2026\n\nPara continuar, envianos:\n1. El comprobante de pago.\n2. El contrato institucional debidamente firmado (podés tomarle foto a la última página y nos lo enviás adjunto al correo).\n3. [Solo si aplica laboratorios:] Firmado el documento donde te das por enterado(a) y aceptás trasladarte a los laboratorios a la Sede indicada.\n\nAdjunto también encontrarás las cuentas bancarias de la Institución para tu comodidad y los datos en caso de que desees realizar el pago mediante SINPE Móvil.\n\nEstamos listos para acompañarte en esta etapa. ¡Espero tu comprobante para formalizar tu matrícula!\n\nCon entusiasmo,"
    },
    {
        "id": 51,
        "categoryId": "cat_6",
        "subCategory": null,
        "code": "F3",
        "title": "Correo de bienvenida — matrícula formalizada - Asunto del correo",
        "excerpt": "¡Bienvenid@ a la UIN! Tu matrícula está lista para un cuatrimestre extraordinario"
    },
    {
        "id": 52,
        "categoryId": "cat_6",
        "subCategory": null,
        "code": "F3",
        "title": "Correo de bienvenida — matrícula formalizada - Cuerpo del correo",
        "excerpt": "Hola [Nombre del estudiante].\n\nTe informo que tu matrícula fue formalizada para este III Cuatrimestre 2026 en la carrera de [Nombre de la carrera].\n\nEste es un paso extraordinario y transformador hacia el futuro único que te merecés.\n\nAdjunto encontrarás:\n\n1. Informe de matrícula, donde podrás observar los cursos, horarios y los docentes que impartirán cada asignatura.\nRecordá: Las clases inician el 31 de agosto, ¡prepárate para una experiencia académica increíble!\n\n2. Pagaré, donde se indican los montos a cancelar en cada cuota y la fecha de pago. Por favor, leé el documento, firmalo y envialo a este mismo correo.\n\nAdemás, te comparto:\n1. Usuario [xxx]. Contraseña [xxx]. Debés ingresar a https://uin.acamsys.com/home con tu usuario y contraseña, y allí tendrás acceso a todas nuestras herramientas para las clases en línea (sincrónicas) y lo relacionado con el espacio para los trabajos asincrónicos.\n2. Para conocer más sobre el uso de nuestras plataformas, podés conectarte el día [xxxxxx] a las [xxxxx] para una sesión de capacitación de nuestras plataformas para estudiantes de nuevo ingreso."
    }
];


// En la V3 usaremos la propiedad isPinned directa en allMessages.

const recentItems = [];

let allMessages = JSON.parse(localStorage.getItem('uin_messages_v3')) || defaultAppMessages;
let workspaceCategories = JSON.parse(localStorage.getItem('uin_categories_v3')) || defaultWorkspaceCategories;

// Cargar papelera y auto-limpiar (>30 días)
let trashMessages = JSON.parse(localStorage.getItem('uin_trash_v3')) || [];
const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
trashMessages = trashMessages.filter(m => (Date.now() - m.deletedAt) < thirtyDaysInMs);

// Historial de Novedades
const changelog = [
    {
        version: "v1.1",
        date: "24 Abr 2026",
        title: "Papelera y Mejoras UI",
        changes: [
            "Se implementó una Papelera de reciclaje. Los mensajes borrados se guardan por 30 días.",
            "Mejoras visuales: Iconos reducidos un 20% y degradado de lectura suave.",
            "Las configuraciones de perfil ahora persisten correctamente."
        ]
    }
];

// Variables de Filtrado
let activeCategoryId = 'all';
let searchQuery = '';

// Guardar en Storage
function saveState() {
    localStorage.setItem('uin_messages_v3', JSON.stringify(allMessages));
    localStorage.setItem('uin_categories_v3', JSON.stringify(workspaceCategories));
    localStorage.setItem('uin_trash_v3', JSON.stringify(trashMessages));
}

// Cargar y Aplicar Perfil
function loadUserProfile() {
    const defaultProfile = { name: 'Shantal Gamboa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shantal&backgroundColor=e2e8f0' };
    const saved = JSON.parse(localStorage.getItem('uin_profile_v3')) || defaultProfile;
    
    // Aplicar a cabecera
    const headerAvatar = document.getElementById('header-avatar');
    const headerName = document.getElementById('header-user-name');
    if (headerAvatar) headerAvatar.src = saved.avatar;
    if (headerName) headerName.textContent = saved.name;
    
    // Aplicar a previsualizaciones en Configuración
    const settingsPreview = document.getElementById('settings-avatar-preview');
    const settingsNameInput = document.getElementById('settings-profile-name');
    if (settingsPreview) settingsPreview.src = saved.avatar;
    if (settingsNameInput) settingsNameInput.value = saved.name;
}



// --- RENDERIZADO DEL DOM ---

// Generar lista de Categorías en el Sidebar
function renderCategories() {
    let html = `
        <div class="category-nav-item ${activeCategoryId === 'all' ? 'active' : ''}" data-id="all">
            <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0; background-color: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-muted);">
                <i data-lucide="inbox" style="width: 16px; height: 16px;"></i>
            </div>
            <span class="category-text">Todos los mensajes</span>
            <div class="category-actions">
                <span class="cat-count" style="margin:0;">${allMessages.length}</span>
            </div>
        </div>
    `;

    html += workspaceCategories.map(cat => {
        const isActive = cat.id === activeCategoryId;
        const count = allMessages.filter(m => m.categoryId === cat.id).length;

        return `
            <div class="category-nav-item ${isActive ? 'active' : ''}" data-id="${cat.id}">
                <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px;" class="${cat.color}">
                    <i data-lucide="${cat.icon || 'message-circle'}" style="width: 16px; height: 16px;"></i>
                </div>
                <span class="category-text">${cat.name}</span>
                <div class="category-actions">
                    <span class="cat-count" style="margin:0;">${count}</span>
                    <button class="icon-btn btn-edit-category" data-id="${cat.id}" title="Editar categoría">
                        <i data-lucide="edit-2" style="width:12px; height:12px; color:var(--text-muted)"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');
    
    // Añadir separador y Papelera
    html += `
        <div class="divider" style="margin: 16px 0;"></div>
        <div class="category-nav-item ${activeCategoryId === 'trash' ? 'active' : ''}" data-id="trash">
            <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px; background-color: rgba(239, 68, 68, 0.1); color: var(--danger);">
                <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
            </div>
            <span class="category-text" style="color: var(--danger);">Papelera</span>
            <div class="category-actions">
                <span class="cat-count" style="margin:0;">${trashMessages.length}</span>
            </div>
        </div>
    `;
    
    document.getElementById('directory-categories').innerHTML = html;
    lucide.createIcons();

    // Poblar Selector de Categorías del Modal
    const selectEl = document.getElementById('edit-category');
    if (selectEl) {
        selectEl.innerHTML = workspaceCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }

    // Agregar listeners a categorías para el filtro
    document.querySelectorAll('.category-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if(e.target.closest('.btn-edit-category')) {
                const idToEdit = e.target.closest('.btn-edit-category').getAttribute('data-id');
                openCategoryModal(idToEdit);
                return;
            }
            activeCategoryId = e.currentTarget.getAttribute('data-id');
            renderCategories();
            renderMessages();
        });
    });
    lucide.createIcons();
}

// Obtener Categoría Helper
function getCatObj(catId) {
    return workspaceCategories.find(c => c.id === catId) || { name: 'SIN CATEGORÍA', color: 'bg-default', icon: 'message-circle' };
}

// Limpiador de tildes y mayúsculas
function normalizeString(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

// Generar Grid Central
function renderMessages() {
    let html = '';
    const searchVal = searchQuery.toLowerCase().trim();

    // Actualizar el título dinámico
    const panelTitle = document.getElementById('main-panel-title');
    if (activeCategoryId === 'all') {
        panelTitle.innerHTML = `<span style="display: flex; align-items: center; gap: 12px; font-size: 1.5rem; font-weight: 700;">
            <div style="display: flex; align-items: center; justify-content: center; color: var(--text-muted);">
                <i data-lucide="inbox" style="width: 22px; height: 22px;"></i>
            </div>
            Todos los Mensajes
        </span>`;
    } else if (activeCategoryId === 'trash') {
        panelTitle.innerHTML = `<span style="display: flex; align-items: center; gap: 12px; font-size: 1.5rem; font-weight: 700; color: var(--danger);">
            <div style="display: flex; align-items: center; justify-content: center; background-color: rgba(239, 68, 68, 0.1); color: var(--danger); border-radius: 8px; width: 36px; height: 36px;">
                <i data-lucide="trash-2" style="width: 22px; height: 22px;"></i>
            </div>
            Papelera (30 días)
        </span>`;
    } else {
        const activeCat = getCatObj(activeCategoryId);
        panelTitle.innerHTML = `<span style="display: flex; align-items: center; gap: 12px; font-size: 1.5rem; font-weight: 700;">
            <div style="display: flex; align-items: center; justify-content: center; background-color: transparent !important;" class="${activeCat.color}">
                <i data-lucide="${activeCat.icon || 'message-circle'}" style="width: 22px; height: 22px;"></i>
            </div>
            ${activeCat.name}
        </span>`;
    }

    const renderGridForList = (msgsList, isTrash = false) => {
        if (msgsList.length === 0) return '';
        
        // Agrupar por subCategory
        const grouped = {};
        msgsList.forEach(msg => {
            const sc = msg.subCategory || 'General';
            if (!grouped[sc]) grouped[sc] = [];
            grouped[sc].push(msg);
        });

        let fullHtml = '';
        // 'General' siempre primero
        const groups = Object.keys(grouped).sort((a,b) => a === 'General' ? -1 : (b === 'General' ? 1 : a.localeCompare(b)));

        groups.forEach(groupName => {
            if (groupName !== 'General' && Object.keys(grouped).length > 0) {
                fullHtml += `<h4 style="margin-top: 12px; margin-bottom: 16px; font-size: 0.95rem; color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">${groupName}</h4>`;
            }
            let gridHtml = `<div class="messages-square-grid" style="margin-bottom: 24px;">`;
            gridHtml += grouped[groupName].map(msg => {
            const catObj = getCatObj(msg.categoryId);
            
            let actionsHtml = '';
            if (isTrash) {
                // Info de días restantes
                const daysLeft = Math.ceil((thirtyDaysInMs - (Date.now() - msg.deletedAt)) / (1000 * 60 * 60 * 24));
                actionsHtml = `
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <span style="font-size: 0.75rem; color: var(--danger); font-weight: 600; background: rgba(239, 68, 68, 0.1); padding: 2px 8px; border-radius: 12px;">Quedan ${daysLeft} días</span>
                        <button class="icon-action-btn btn-restore" data-id="${msg.id}" title="Restaurar mensaje" style="color: var(--success); background-color: rgba(16, 185, 129, 0.1);">
                            <i data-lucide="rotate-ccw"></i>
                        </button>
                        <button class="icon-action-btn btn-hard-delete" data-id="${msg.id}" title="Eliminar definitivamente" style="color: var(--danger); background-color: rgba(239, 68, 68, 0.1);">
                            <i data-lucide="trash"></i>
                        </button>
                    </div>
                `;
            } else {
                actionsHtml = `
                    <button class="icon-action-btn card-copy-act" data-text="${msg.excerpt.replace(/"/g, '&quot;')}" title="Copiar al portapapeles">
                        <i data-lucide="copy"></i>
                    </button>
                    <button class="icon-action-btn btn-pin" data-id="${msg.id}" title="${msg.isPinned ? 'Desanclar mensaje' : 'Anclar mensaje'}">
                        <i data-lucide="pin" class="${msg.isPinned ? 'text-primary' : ''}" style="${msg.isPinned ? 'fill: currentColor;' : ''}"></i>
                    </button>
                    <button class="icon-action-btn btn-edit" data-id="${msg.id}" title="Editar mensaje">
                        <i data-lucide="edit-2"></i>
                    </button>
                    <button class="icon-action-btn btn-delete" data-id="${msg.id}" title="Borrar mensaje">
                        <i data-lucide="trash-2"></i>
                    </button>
                `;
            }

            return `
                <div class="square-card ${isTrash ? 'trash-card' : ''}" style="${isTrash ? 'border-color: rgba(239, 68, 68, 0.3); opacity: 0.85;' : ''}">
                    <div class="square-card-header">
                        <div class="square-card-icon ${catObj.color}">
                            <i data-lucide="${catObj.icon || 'message-circle'}"></i>
                        </div>
                        <div class="icon-actions">
                            ${actionsHtml}
                        </div>
                    </div>
                    <h3 class="square-card-title" title="${msg.title}">${msg.title}</h3>
                    <p class="square-card-excerpt" data-id="${msg.id}" title="Clic para expandir">${msg.excerpt}</p>
                </div>
            `;
        }).join('');
            gridHtml += `</div>`;
            fullHtml += gridHtml;
        });
        return fullHtml;
    };

    const filterMessages = (list, catId) => {
        return list.filter(m => {
            const matchesCat = (catId === 'all' || catId === 'trash' || m.categoryId === catId);
            const rawTitle = m.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const rawExcerpt = m.excerpt.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            const rawSearch = searchVal.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            return matchesCat && (!rawSearch || rawTitle.includes(rawSearch) || rawExcerpt.includes(rawSearch));
        });
    };

    if (activeCategoryId === 'all') {
        const categoriesWithMessages = workspaceCategories.map(cat => {
            const filteredMsgs = filterMessages(allMessages, cat.id);
            const gridHtml = renderGridForList(filteredMsgs, false);
            if (!gridHtml) return '';
            
            return `
                <div class="category-group">
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom: 16px;">
                        <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px;" class="${cat.color}">
                            <i data-lucide="${cat.icon || 'message-circle'}" style="width: 16px; height: 16px;"></i>
                        </div>
                        <h2 style="font-size: 1.1rem; font-weight: 600; color: var(--text-main); margin: 0;">${cat.name}</h2>
                    </div>
                    ${gridHtml}
                </div>
            `;
        }).join('');
        
        html = categoriesWithMessages || '<p style="text-align:center; color:#6B7280; padding: 40px; width: 100%;">No se encontraron mensajes que coincidan con la búsqueda.</p>';
    } else if (activeCategoryId === 'trash') {
        const filteredMsgs = filterMessages(trashMessages, 'trash');
        html = renderGridForList(filteredMsgs, true);
        if (!html) html = '<p style="text-align:center; color:#6B7280; padding: 40px; width: 100%;">La papelera está vacía.</p>';
    } else {
        const filteredMsgs = filterMessages(allMessages, activeCategoryId);
        html = renderGridForList(filteredMsgs, false);
        if (!html) html = '<p style="text-align:center; color:#6B7280; padding: 40px; width: 100%;">No se encontraron mensajes en esta categoría.</p>';
    }

    const container = document.getElementById('messages-grid');
    container.className = ''; // Limpiamos .messages-square-grid del wrapper externo para no chocar
    container.innerHTML = html;
    lucide.createIcons();
}

// Generar Items del Panel Derecho (Recientes)
function renderRightItem(item, isRecent = false) {
    let metaText = item.time || "";

    return `
        <li class="right-item right-recent-item" data-id="${item.id}" style="cursor:pointer;" title="Click para ver completo">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 8px;">
                <span class="right-item-title" style="flex:1;">${item.title}</span>
                <button class="icon-action-btn right-copy-act" data-text="${item.excerpt.replace(/"/g, '&quot;')}" title="Copiar al portapapeles" style="width: 28px; height: 28px;">
                    <i data-lucide="copy" style="width:14px; height:14px;"></i>
                </button>
            </div>
            <span class="right-item-meta">${metaText}</span>
        </li>
    `;
}

// Generar lista dinámica de pineados
function renderRightPinned() {
    const pItems = allMessages.filter(m => m.isPinned);
    const html = pItems.map(item => `
        <li class="right-item right-pinned-item" data-id="${item.id}" style="cursor:pointer;" title="Click para ver completo">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 8px;">
                <span class="right-item-title" style="flex:1;">${item.title}</span>
                <div style="display:flex; gap: 2px;">
                    <button class="icon-action-btn right-copy-act" data-text="${item.excerpt.replace(/"/g, '&quot;')}" title="Copiar al portapapeles" style="width: 28px; height: 28px;">
                        <i data-lucide="copy" style="width:14px; height:14px;"></i>
                    </button>
                    <button class="icon-action-btn btn-unpin" data-id="${item.id}" title="Desanclar" style="width: 28px; height: 28px;">
                        <i data-lucide="pin-off" style="width:14px; height:14px;"></i>
                    </button>
                </div>
            </div>
            <span class="right-item-meta">${getCatObj(item.categoryId).name}</span>
        </li>
    `).join('');
    document.getElementById('right-pinned').innerHTML = html || '<p style="color:var(--text-muted); font-size:0.8rem; padding: 10px 0;">No hay mensajes anclados</p>';
    lucide.createIcons();
}

function initDOM() {
    loadUserProfile();
    renderCategories();
    renderMessages();
    renderRightPinned();
    document.getElementById('right-recent').innerHTML = recentItems.map(i => renderRightItem(i, true)).join('');
    
    // Render Notifications
    const notifList = document.getElementById('notifications-list');
    if (notifList) {
        notifList.innerHTML = changelog.map((log, index) => `
            <div style="padding: 16px; border-bottom: ${index === changelog.length - 1 ? 'none' : '1px solid var(--border-color)'};">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                    <span style="font-weight: 600; color: var(--primary-color); font-size: 0.9rem;">${log.version} - ${log.title}</span>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">${log.date}</span>
                </div>
                <ul style="margin: 0; padding-left: 16px; font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">
                    ${log.changes.map(c => `<li style="margin-bottom: 4px;">${c}</li>`).join('')}
                </ul>
            </div>
        `).join('');
    }

    // Attach Notif Dropdown Logic
    const notifTrigger = document.getElementById('notifications-trigger');
    const notifDropdown = document.getElementById('notifications-dropdown');
    const notifDot = document.getElementById('notification-dot');

    // Show dot if version is new (simple check, we'll just show it always on load for demo unless dismissed)
    const lastSeenVersion = localStorage.getItem('uin_last_seen_version');
    if (changelog.length > 0 && lastSeenVersion !== changelog[0].version) {
        if (notifDot) notifDot.style.display = 'block';
    }

    if (notifTrigger && notifDropdown) {
        notifTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            notifDropdown.style.display = notifDropdown.style.display === 'none' ? 'flex' : 'none';
            // Hide other dropdowns
            const profileDropdown = document.getElementById('profile-dropdown');
            if (profileDropdown) profileDropdown.style.display = 'none';
            
            // Mark as seen
            if (notifDropdown.style.display === 'flex' && changelog.length > 0) {
                localStorage.setItem('uin_last_seen_version', changelog[0].version);
                if (notifDot) notifDot.style.display = 'none';
            }
        });
    }

    // Attach Dropdown Logic
    const profileTrigger = document.getElementById('profile-trigger');
    const profileDropdown = document.getElementById('profile-dropdown');

    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
            if (notifDropdown) notifDropdown.style.display = 'none';
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.style.display = 'none';
            }
            if (notifTrigger && notifDropdown && !notifTrigger.contains(e.target) && !notifDropdown.contains(e.target)) {
                notifDropdown.style.display = 'none';
            }
        });
    }

    // Perfil: Subir foto y guardar
    const photoUpload = document.getElementById('profile-photo-upload');
    const saveProfileBtn = document.getElementById('save-profile-btn');
    const avatarPreview = document.getElementById('settings-avatar-preview');
    const nameInput = document.getElementById('settings-profile-name');

    if (photoUpload && avatarPreview) {
        photoUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (event) => {
                // Previsualizar la foto cargada instantáneamente
                avatarPreview.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', () => {
            const newName = nameInput.value.trim() || 'Agente';
            const currentPhoto = avatarPreview.src;
            
            // Guardar
            localStorage.setItem('uin_profile_v3', JSON.stringify({
                name: newName,
                avatar: currentPhoto
            }));

            // Recargar interfaz y forzar dibujado de UI temporal
            loadUserProfile();
            
            // Boton animacion
            const originalText = saveProfileBtn.innerHTML;
            saveProfileBtn.innerHTML = '<i data-lucide="check"></i> Guardado';
            lucide.createIcons();
            
            setTimeout(() => {
                saveProfileBtn.innerHTML = originalText;
            }, 2000);
        });
    }

    lucide.createIcons();
}


// --- MODAL DE LECTURA COMPLETA ---
const readingModal = document.getElementById('reading-modal');
const readingTitle = document.getElementById('reading-modal-title');
const readingContent = document.getElementById('reading-modal-content');
let currentReadingId = null;

function openReadingModal(id) {
    const msg = allMessages.find(m => m.id === id);
    if (!msg) return;
    
    currentReadingId = id;
    readingTitle.textContent = msg.title;
    readingContent.textContent = msg.excerpt;
    
    // UI states of action buttons
    const pinBtn = document.getElementById('reading-btn-pin');
    const pinIcon = document.getElementById('reading-icon-pin');
    
    if (msg.isPinned) {
        pinIcon.classList.add('text-primary');
        pinIcon.style.fill = 'currentColor';
        pinBtn.title = 'Desanclar mensaje';
    } else {
        pinIcon.classList.remove('text-primary');
        pinIcon.style.fill = 'none';
        pinBtn.title = 'Anclar mensaje';
    }

    readingModal.classList.add('show');
    lucide.createIcons();
}

document.getElementById('close-reading-modal')?.addEventListener('click', () => {
    readingModal.classList.remove('show');
});

document.getElementById('reading-btn-copy')?.addEventListener('click', () => {
    const msg = allMessages.find(m => m.id === currentReadingId);
    if (!msg) return;
    navigator.clipboard.writeText(msg.excerpt)
        .then(() => {
            showToast("¡Mensaje copiado con éxito!");
            readingModal.classList.remove('show');
        }).catch(err => console.error(err));
});

document.getElementById('reading-btn-pin')?.addEventListener('click', () => {
    const msg = allMessages.find(m => m.id === currentReadingId);
    if (!msg) return;
    
    msg.isPinned = !msg.isPinned;
    saveState();
    renderMessages();
    renderRightPinned();
    
    // Update local modal state
    const pinBtn = document.getElementById('reading-btn-pin');
    const pinIcon = document.getElementById('reading-icon-pin');
    if (msg.isPinned) {
        pinIcon.classList.add('text-primary');
        pinIcon.style.fill = 'currentColor';
        pinBtn.title = 'Desanclar mensaje';
    } else {
        pinIcon.classList.remove('text-primary');
        pinIcon.style.fill = 'none';
        pinBtn.title = 'Anclar mensaje';
    }
});

document.getElementById('reading-btn-edit')?.addEventListener('click', () => {
    if (currentReadingId) {
        readingModal.classList.remove('show');
        openMessageModal(currentReadingId);
    }
});

// --- MODAL DE BORRADO ---
const deleteModal = document.getElementById('delete-modal');
let messageToDeleteId = null;

document.getElementById('close-delete-modal')?.addEventListener('click', () => {
    deleteModal.classList.remove('show');
    messageToDeleteId = null;
});

document.getElementById('cancel-delete-modal')?.addEventListener('click', () => {
    deleteModal.classList.remove('show');
    messageToDeleteId = null;
});

document.getElementById('confirm-delete-modal')?.addEventListener('click', () => {
    if (messageToDeleteId) {
        const msgIndex = allMessages.findIndex(m => m.id === messageToDeleteId);
        if (msgIndex > -1) {
            const msg = allMessages.splice(msgIndex, 1)[0];
            msg.deletedAt = Date.now();
            trashMessages.unshift(msg); // Add to top of trash
            saveState();
            renderMessages();
            renderCategories();
            renderRightPinned();
            showToast("✅ Mensaje movido a la papelera");
        }
        deleteModal.classList.remove('show');
        messageToDeleteId = null;
    }
});

// Cerrar todos los modales con la tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.show').forEach(modal => {
            modal.classList.remove('show');
            if (modal.id === 'delete-modal') messageToDeleteId = null;
        });
    }
});

// Cerrar modales haciendo click fuera de la caja
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
            backdrop.classList.remove('show');
            if (backdrop.id === 'delete-modal') messageToDeleteId = null;
        }
    });
});
initDOM();


// --- BÚSQUEDA GLOBAL ---
document.getElementById('global-search').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderMessages();
});


// --- LÓGICA DE NOTIFICACIONES (Toast) ---
const toastEl = document.getElementById('toast');
const toastMsgEl = document.getElementById('toast-message');
let toastTimeout;

function showToast(message = "¡Acción realizada con éxito!") {
    clearTimeout(toastTimeout);
    if (toastMsgEl) toastMsgEl.textContent = message;
    toastEl.classList.add('show');
    toastTimeout = setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

document.body.addEventListener('click', (e) => {
    // 1. Detectar Copiar en Tarjeta Cuadrada Central o en header principal
    const copyBtn = e.target.closest('.btn-copy, .card-copy-act');
    if (copyBtn) {
        navigator.clipboard.writeText(copyBtn.getAttribute('data-text'))
            .then(() => showToast("¡Mensaje copiado con éxito!")).catch(err => console.error(err));
        return;
    }

    // 2. Detectar Copiar en Lista Derecha
    const rightCopyBtn = e.target.closest('.right-copy-act');
    if (rightCopyBtn) {
        navigator.clipboard.writeText(rightCopyBtn.getAttribute('data-text'))
            .then(() => showToast("¡Mensaje copiado con éxito!")).catch(err => console.error(err));
        return;
    }

    // 3. Detectar Botón Editar Tarjeta Central
    const editBtn = e.target.closest('.btn-edit');
    if (editBtn) {
        const idToEdit = parseInt(editBtn.getAttribute('data-id'));
        openMessageModal(idToEdit);
        return;
    }

    // 4. Detectar Click en el Texto para Expandir Lectura Completa (Tarjeta central)
    const expandArea = e.target.closest('.square-card-excerpt');
    if (expandArea) {
        const idToView = parseInt(expandArea.getAttribute('data-id'));
        openReadingModal(idToView);
        return;
    }

    // 5. Detectar Anclar / Desanclar
    const pinBtn = e.target.closest('.btn-pin, .btn-unpin');
    if (pinBtn) {
        const idToPin = parseInt(pinBtn.getAttribute('data-id'));
        const targetMsg = allMessages.find(m => m.id === idToPin);
        if (targetMsg) {
            targetMsg.isPinned = !targetMsg.isPinned;
            saveState();
            renderMessages();
            renderRightPinned();
            lucide.createIcons();
        }
        return;
    }

    // 6. Detectar Borrar Mensaje
    const deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        messageToDeleteId = parseInt(deleteBtn.getAttribute('data-id'));
        if (messageToDeleteId && deleteModal) {
            deleteModal.classList.add('show');
        }
        return;
    }

    // 7. Detectar Restaurar Mensaje
    const restoreBtn = e.target.closest('.btn-restore');
    if (restoreBtn) {
        e.preventDefault();
        e.stopPropagation();
        const idToRestore = parseInt(restoreBtn.getAttribute('data-id'));
        const msgIndex = trashMessages.findIndex(m => m.id === idToRestore);
        if (msgIndex > -1) {
            const msg = trashMessages.splice(msgIndex, 1)[0];
            delete msg.deletedAt;
            allMessages.unshift(msg);
            saveState();
            renderMessages();
            renderCategories();
            showToast("✅ Mensaje restaurado");
        }
        return;
    }

    // 8. Detectar Borrado Permanente
    const hardDeleteBtn = e.target.closest('.btn-hard-delete');
    if (hardDeleteBtn) {
        e.preventDefault();
        e.stopPropagation();
        const idToHardDelete = parseInt(hardDeleteBtn.getAttribute('data-id'));
        if (confirm("⚠️ ¿Estás seguro de que deseas eliminar este mensaje definitivamente? Esta acción no se puede deshacer.")) {
            trashMessages = trashMessages.filter(m => m.id !== idToHardDelete);
            saveState();
            renderMessages();
            renderCategories();
            showToast("✅ Mensaje eliminado definitivamente");
        }
        return;
    }

    // 9. Vista completa desde el Sidebar (Anclados y Recientes)
    const sidebarItem = e.target.closest('.right-item');
    if (sidebarItem && !e.target.closest('button')) {
        const idToView = parseInt(sidebarItem.getAttribute('data-id'));
        if (idToView) openReadingModal(idToView);
        return;
    }
});


// --- MODAL DE MENSAJE (CREAR/EDITAR) ---
const messageModal = document.getElementById('edit-modal'); // Reusando la estructura div #edit-modal
const inputId = document.getElementById('edit-id');
const inputTitle = document.getElementById('edit-title');
const inputCategory = document.getElementById('edit-category');
const inputExcerpt = document.getElementById('edit-excerpt');
const messageModalTitle = document.getElementById('message-modal-title');

function openMessageModal(messageId = null) {
    if (messageId) {
        const msg = allMessages.find(m => m.id === messageId);
        if(!msg) return;
        messageModalTitle.textContent = "Editar Mensaje";
        inputId.value = msg.id;
        inputTitle.value = msg.title;
        inputCategory.value = msg.categoryId;
        inputExcerpt.value = msg.excerpt;
    } else {
        // Modo Creación
        messageModalTitle.textContent = "Nuevo Mensaje";
        inputId.value = "";
        inputTitle.value = "";
        
        // Seleccionar la categoría activa si no es ALL, sino el primero
        inputCategory.value = activeCategoryId !== 'all' ? activeCategoryId : (workspaceCategories[0] ? workspaceCategories[0].id : "");
        inputExcerpt.value = "";
    }
    messageModal.classList.add('show');
}

function closeMessageModal() {
    messageModal.classList.remove('show');
}

// Botones para lanzar Modal Mensaje
document.getElementById('btn-new-message').addEventListener('click', () => openMessageModal());
document.getElementById('close-message-modal').addEventListener('click', closeMessageModal);
document.getElementById('cancel-message-modal').addEventListener('click', closeMessageModal);

document.getElementById('save-message-modal').addEventListener('click', () => {
    if (!inputTitle.value.trim() || !inputExcerpt.value.trim()) {
        alert("El título y abstract son obligatorios.");
        return;
    }

    const id = parseInt(inputId.value);
    
    if (id) {
        // Actualizar existente
        const index = allMessages.findIndex(m => m.id === id);
        if(index > -1) {
            allMessages[index].title = inputTitle.value.trim();
            allMessages[index].categoryId = inputCategory.value;
            allMessages[index].excerpt = inputExcerpt.value.trim();
        }
    } else {
        // Crear nuevo
        const newId = allMessages.length ? Math.max(...allMessages.map(m => m.id)) + 1 : 1;
        allMessages.unshift({
            id: newId,
            title: inputTitle.value.trim(),
            categoryId: inputCategory.value,
            excerpt: inputExcerpt.value.trim(),
            isPinned: false
        });
    }
    
    saveState();
    renderMessages();
    renderCategories();
    closeMessageModal();
    showToast("¡Mensaje guardado con éxito!");
});


// --- MODAL DE CATEGORÍAS ---
const categoryModal = document.getElementById('category-modal');
const newCatNameEl = document.getElementById('new-category-name');
let selectedColorClass = 'bg-blue'; // Default color
let selectedIconClass = 'message-circle'; // Default icon
const colorSwatches = document.querySelectorAll('.color-swatch');
const iconSwatches = document.querySelectorAll('.icon-swatch');
let editingCategoryId = null;

function openCategoryModal(catIdToEdit = null) {
    editingCategoryId = typeof catIdToEdit === 'string' ? catIdToEdit : null;
    
    if (editingCategoryId) {
        document.querySelector('#category-modal h2').textContent = "Editar Categoría";
        const cat = getCatObj(editingCategoryId);
        newCatNameEl.value = cat.name;
        
        // Set Color
        colorSwatches.forEach(s => s.classList.remove('selected'));
        const activeSwatch = document.querySelector(`.color-swatch[data-color="${cat.color}"]`);
        if (activeSwatch) activeSwatch.classList.add('selected');
        selectedColorClass = cat.color;

        // Set Icon
        iconSwatches.forEach(s => s.classList.remove('selected'));
        const activeIconSwatch = document.querySelector(`.icon-swatch[data-icon="${cat.icon || 'message-circle'}"]`);
        if (activeIconSwatch) activeIconSwatch.classList.add('selected');
        selectedIconClass = cat.icon || 'message-circle';
        
        const deleteCatBtn = document.getElementById('delete-category-btn');
        if (deleteCatBtn) deleteCatBtn.style.display = 'block';
    } else {
        document.querySelector('#category-modal h2').textContent = "Nueva Categoría";
        newCatNameEl.value = "";
        
        // Reset Color
        colorSwatches.forEach(s => s.classList.remove('selected'));
        const defaultSwatch = document.querySelector('.color-swatch[data-color="bg-blue"]');
        if (defaultSwatch) defaultSwatch.classList.add('selected');
        selectedColorClass = 'bg-blue';

        // Reset Icon
        iconSwatches.forEach(s => s.classList.remove('selected'));
        const defaultIconSwatch = document.querySelector('.icon-swatch[data-icon="message-circle"]');
        if (defaultIconSwatch) defaultIconSwatch.classList.add('selected');
        selectedIconClass = 'message-circle';
        
        const deleteCatBtn = document.getElementById('delete-category-btn');
        if (deleteCatBtn) deleteCatBtn.style.display = 'none';
    }

    categoryModal.classList.add('show');
}

function closeCategoryModal() {
    categoryModal.classList.remove('show');
}

// Interacción Paleta
colorSwatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
        colorSwatches.forEach(s => s.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        selectedColorClass = e.currentTarget.getAttribute('data-color');
    });
});

// Interacción Paleta de Iconos
iconSwatches.forEach(swatch => {
    swatch.addEventListener('click', (e) => {
        iconSwatches.forEach(s => s.classList.remove('selected'));
        e.currentTarget.classList.add('selected');
        selectedIconClass = e.currentTarget.getAttribute('data-icon');
    });
});

document.getElementById('btn-new-category').addEventListener('click', openCategoryModal);
document.getElementById('close-category-modal').addEventListener('click', closeCategoryModal);
document.getElementById('cancel-category-modal').addEventListener('click', closeCategoryModal);

document.getElementById('save-category-modal').addEventListener('click', () => {
    const rawVal = newCatNameEl.value.trim();
    if (!rawVal) {
        alert("El nombre de la categoría no puede estar vacío.");
        return;
    }

    if (editingCategoryId) {
        const cat = workspaceCategories.find(c => c.id === editingCategoryId);
        if (cat) {
            cat.name = rawVal;
            cat.color = selectedColorClass;
            cat.icon = selectedIconClass;
            showToast("¡Categoría actualizada!");
        }
    } else {
        const newCat = {
            id: 'cat_' + Date.now(),
            name: rawVal,
            color: selectedColorClass,
            icon: selectedIconClass
        };
        workspaceCategories.push(newCat);
        showToast("¡Categoría creada!");
    }

    saveState();
    renderCategories();
    renderMessages(); // Refrescar mensajes por si afecta algo
    closeCategoryModal();
});

// --- LÓGICA DE BORRADO DE CATEGORÍAS ---
const deleteCategoryModal = document.getElementById('delete-category-modal');

document.getElementById('delete-category-btn')?.addEventListener('click', () => {
    if (deleteCategoryModal) deleteCategoryModal.classList.add('show');
});

document.getElementById('close-delete-category-modal')?.addEventListener('click', () => {
    if (deleteCategoryModal) deleteCategoryModal.classList.remove('show');
});

document.getElementById('cancel-delete-category-modal')?.addEventListener('click', () => {
    if (deleteCategoryModal) deleteCategoryModal.classList.remove('show');
});

document.getElementById('confirm-delete-category-modal')?.addEventListener('click', () => {
    if (!editingCategoryId) return;

    const action = document.querySelector('input[name="delete-category-action"]:checked').value;

    workspaceCategories = workspaceCategories.filter(c => c.id !== editingCategoryId);

    if (action === 'trash') {
        const msgsToTrash = allMessages.filter(m => m.categoryId === editingCategoryId);
        msgsToTrash.forEach(msg => {
            msg.deletedAt = Date.now();
            trashMessages.unshift(msg);
        });
        allMessages = allMessages.filter(m => m.categoryId !== editingCategoryId);
    } else {
        allMessages.forEach(m => {
            if (m.categoryId === editingCategoryId) {
                m.categoryId = '';
            }
        });
    }

    if (activeCategoryId === editingCategoryId) {
        activeCategoryId = 'all';
    }

    saveState();
    renderCategories();
    renderMessages();
    renderRightPinned();
    
    if (deleteCategoryModal) deleteCategoryModal.classList.remove('show');
    closeCategoryModal();
    showToast("✅ Categoría eliminada");
});


// --- LÓGICA DE NAVEGACIÓN (VISTAS) ---
const viewTriggers = document.querySelectorAll('[data-view]');
const views = document.querySelectorAll('.view');

viewTriggers.forEach(nav => {
    nav.addEventListener('click', (e) => {
        e.preventDefault();
        
        const trigger = e.target.closest('[data-view]');
        if (!trigger) return;

        // Remove .active from all nav links
        document.querySelectorAll('[data-view]').forEach(n => n.classList.remove('active'));
        
        // Set .active to clicked nav
        trigger.classList.add('active');
        
        // Close dropdown silently if it was open
        const profileDropdown = document.getElementById('profile-dropdown');
        if (profileDropdown && profileDropdown.style.display !== 'none') {
            profileDropdown.style.display = 'none';
        }
        
        const targetViewId = 'view-' + trigger.getAttribute('data-view');
        views.forEach(v => v.classList.remove('active'));
        
        const targetView = document.getElementById(targetViewId);
        if (targetView) {
            targetView.classList.add('active');
        }

        if (targetViewId === 'view-analytics' && !window.chartInitialized) {
            if (typeof initChart === 'function') {
                initChart();
                window.chartInitialized = true;
            }
        }
    });
});


// --- LÓGICA DE CHART.JS (VISTA 2) ---
function initChart() {
    const ctx = document.getElementById('usageChart');
    if (!ctx) return;
    
    let gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, '#0052FF');
    gradient.addColorStop(1, '#4B83FF');

    const config = {
        type: 'bar',
        data: {
            labels: ['L', 'Ma', 'Mi', 'J', 'V', 'S', 'D'],
            datasets: [{
                label: 'Copiados',
                data: [150, 230, 200, 280, 250, 120, 54],
                backgroundColor: gradient,
                borderRadius: 6,
                barThickness: 16
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { drawBorder: false } },
                x: { grid: { display: false } }
            }
        }
    };
    new Chart(ctx, config);
}
