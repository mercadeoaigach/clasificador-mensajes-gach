// Inicializar iconos de Lucide
lucide.createIcons();

// --- ESTADO Y DUMMY DATA ---
const defaultCategories = [
    { id: 'cat_info', name: 'Información Académica', color: 'bg-emerald', icon: 'book-open' },
    { id: 'cat_costos', name: 'Costos y Financiamiento', color: 'bg-orange', icon: 'credit-card' },
    { id: 'cat_tramites', name: 'Trámites y Requisitos', color: 'bg-blue', icon: 'file-text' },
    { id: 'cat_seguimiento', name: 'Seguimiento y Atención', color: 'bg-purple', icon: 'headphones' }
];

const defaultMessages = [
    // Información Académica
    { id: 1, categoryId: 'cat_info', title: 'Modalidad Presencialidad Remota', excerpt: '📚✨ Modalidad Presencialidad Remota 💻🌍\nEstudiá de forma flexible y conectate con tus docentes en tiempo real desde cualquier lugar.\nLas clases se imparten de forma virtual y sincrónica mediante nuestras plataformas Teams, Acamsys y Moodle.\n🎥 Clases GrabadasTodas las sesiones quedan grabadas para que podás repasar contenidos o ponerte al día cuando lo necesités.\n📍 Importante:\nLos laboratorios se realizan de forma presencial, y el profesor les indicará cada cuánto deben presentarse.\nLos talleres incluyen una gira académica.\n🚀 Ventajas\n• Conectate desde cualquier lugar\n• Ahorrá tiempo en traslados\n• Acompañamiento docente en cada clase ✨' },
    { id: 2, categoryId: 'cat_info', title: 'Carreras Disponibles (Ingenierías)', excerpt: '¡Hola! 😊\nActualmente en la universidad contamos con las carreras de Ingeniería Civil e Ingeniería Industrial.\n🔹 Ingeniería Civil es ideal si te interesa el diseño, construcción y supervisión de obras como edificios, carreteras, puentes y proyectos de infraestructura que impactan directamente en el desarrollo del país.\n🔹 Ingeniería Industrial se enfoca en mejorar procesos dentro de las empresas, optimizar recursos, aumentar la productividad y gestionar proyectos en diferentes áreas de negocio.\nAmbas carreras tienen amplias oportunidades laborales, ya que los profesionales en ingeniería son muy solicitados en diferentes sectores.\nAdemás, desarrollan habilidades en análisis, liderazgo y resolución de problemas, muy valoradas en el mercado laboral.\nSi gustas, con mucho gusto puedo brindarte más información sobre el plan de estudios y la modalidad de estudio. 📚' },
    { id: 3, categoryId: 'cat_info', title: 'Horarios Disponibles', excerpt: 'MÉTODOS Y TÉCNICAS DE INVESTIGACIÓN K/17:15-19:30\nCONTAMINACIÓN AMBIENTAL K/19:45-22:00\nFUNDAMENTOS DE ADMINISTRACIÓN J/17:15-19:30\nTEORÍA DE LA COMUNICACIÓN J/19:45-22:00' },
    { id: 4, categoryId: 'cat_info', title: 'Aclaración sobre CIDEP', excerpt: 'Hola! Muchas gracias por tu interés.\nTe comento que nuestra universidad no ofrece carreras técnicas, cursos libres ni diplomados directamente.\nEsos programas los imparte el Colegio Universitario CIDEP, que forma parte de nuestra misma corporación educativa.\n📲 Para más información podés escribir al WhatsApp 87724337 📧 O bien al correo: info@cidep.cr Con gusto te van a orientar según lo que estés buscando.\nCualquier otra consulta, estamos para servirte.' },
    { id: 5, categoryId: 'cat_info', title: 'Información de Cursos MM (Civil)', excerpt: 'Hola, muy buenas tardes! 😊\nTe saluda Shantal Gamboa desde la sede San José. 🍎📚\nComo le puedo ayudar?\nInfo de MM\nHorarios:\n•Diseño Estructural y de Materiales: Miércoles y Viernes, de 7:00 p.m. a 9:00 p.m. (hora de Costa Rica).\n•Gestión de Infraestructura: Sábados, de 8:00 a.m. a 12:00 p.m. (hora de Costa Rica)\n•Innovación de Geotecnia, Análisis de Data y Diseño Vial: Martes y Jueves de 7:00pm a 9:00pm\nFechas de inicio:\n• Innovación de Geotecnia Análisis de Data y Diseño Vial 30 de junio 2026\n• Diseño de Infraestructura y de Materiales para Pavimentos 5 de agosto 2026\n• Gestión de Pavimentos 8 de agosto 2026\nRequisitos: Título de grado en ingeniería Civil\nPrecio $300 USD' },

    // Costos y Financiamiento
    { id: 6, categoryId: 'cat_costos', title: 'Detalles de Financiamiento 4x4', excerpt: 'Le comento que no necesita fiador ni realizar trámites complicados para acceder a nuestro financiamiento.\nÚnicamente se firma un pagaré como compromiso de pago con la universidad.\nTenemos una opción muy cómoda para nuestros estudiantes 🤩\n🍎 Financiamiento 4x4: Le permite financiar tanto la matrícula como las materias, cancelando el monto total en 4 tractos iguales durante el cuatrimestre.\nEl único costo adicional se incluye en el primer pago, que corresponde a ₡4.500 por el uso de herramientas tecnológicas.' },
    { id: 7, categoryId: 'cat_costos', title: 'Costos: Bachillerato', excerpt: 'Hola, muy buenas tardes! 😊\nTe saluda Shantal Gamboa desde la sede San José. 🍎📚\nEn este momento, podés aprovechar:\n✅ 100% de descuento en matrícula.\n✅ 10% de descuento en materias.\nCon estos beneficios y un plan de financiamiento aprobado, estarías pagando solo:\n₡90 577,61 al mes aproximadamente, durante un cuatri completo. 😱\nSi te interesa, con mucho gusto puedo brindarte más información sobre:\n1️⃣ Financiamiento 💳\n2️⃣ Modalidad de estudio 📚\n3️⃣ Convalidaciones 📝' },
    { id: 8, categoryId: 'cat_costos', title: 'Costos: Licenciatura', excerpt: 'LICENCIATURA: Hola, muy buenas tardes! 😊\nTe saluda Shantal Gamboa desde la sede San José. 🍎📚\nEn este momento, podés aprovechar:\n✅ 50% de descuento en matrícula.\n✅ 5% de descuento en materias.\nCon estos beneficios y un plan de financiamiento aprobado, estarías pagando solo:\n₡105 856,58 al mes aproximadamente, durante un cuatri completo. 😱\nSi te interesa, con mucho gusto puedo brindarte más información sobre:\n1️⃣ Financiamiento 💳\n2️⃣ Modalidad de estudio 📚\n3️⃣ Convalidaciones 📝' },
    { id: 9, categoryId: 'cat_costos', title: 'Costos: Ingeniería Ambiental', excerpt: 'Hola, muy buenas tardes! 😊\nTe saluda Shantal Gamboa desde la sede San José. 🍎📚\nEn este momento, podés aprovechar:\n✅ 50% de descuento en matrícula. La matricula tiene un costo de 147.213,67 colones, con este descuento te queda en 73.607,23\n✅ 10% de descuento en materias. Las materias tiene un costo de 98.142,57 colones, con este descuento te quedan en 88.328,31 colones\nCon estos beneficios y un plan de financiamiento aprobado, estarías pagando solo: ₡111 230,06 al mes aproximadamente, durante un cuatri completo. 😱\nSi te interesa, con mucho gusto puedo brindarte más información sobre:\n1️⃣ Financiamiento 💳\n2️⃣ Modalidad de estudio 📚\n3️⃣ Convalidaciones 📝' },

    // Trámites y Requisitos
    { id: 10, categoryId: 'cat_tramites', title: 'Requisitos Generales de Matrícula', excerpt: 'Hola\nLos requisitos para matricularte en bachillerato son:\n• Fotografía del documento de identidad (ambos lados)\n• Fotografía del título de bachillerato en educación media\n• Una fotografía tamaño pasaporte o selfie\nCon estos documentos, tu matrícula será rápida y sencilla. 💙' },
    { id: 11, categoryId: 'cat_tramites', title: 'Datos Solicitados para Matrícula', excerpt: 'Requiero los siguientes datos:\n- Provincia\n- Cantón\n- Distrito\n- Correo\n- Si cuenta con algún número adicional\n- Estado civil\n- Si tiene hijos\n- Dirección exacta de donde vive\n- Como se enteró de nosotros' },
    { id: 12, categoryId: 'cat_tramites', title: 'Proceso de Convalidaciones (Corta)', excerpt: 'Hola 😊 ¡Tenemos excelentes noticias para este cuatrimestre!\nLas convalidaciones no tienen ningún costo 🎉\nSi deseas iniciar el trámite, solo necesitas enviarnos una certificación de materias aprobadas, la cual debe estar vigente, firmada y sellada. Debes de enviarla al correo del director de carrera ______ CC a kacosta@uin.ac.cr\nCon este documento realizamos un estudio de pre-convalidación, donde podrás conocer qué materias se te pueden convalidar 📚\nA partir de ahí, ya sabrás cuáles son los programas que debes solicitar para completar el proceso.\nQuedo atenta para ayudarte en todo lo que necesitas 💬' },
    { id: 13, categoryId: 'cat_tramites', title: 'Proceso de Convalidaciones (Detallada)', excerpt: 'Hola, con gusto te explico cómo funciona el proceso de convalidación de materias en nuestra universidad 📚\nPara poder analizar las materias que deseas convalidar, necesitamos que presentes los siguientes documentos:\n1️⃣ Certificación de notas de la universidad de procedencia vigente, donde se indica la nota y aprobación de las materias que deseas convalidar.\n2️⃣ Plan de estudios, donde se detalla el contenido y los objetivos de los cursos que llevaste.\n3️⃣ Programas de las materias que deseas convalidar, firmados y sellados por la universidad de procedencia.\nSi los programas tienen firma digital, también son válidos.\n4️⃣ Si deseas convalidar el TCU, debes presentar una certificación donde se indique que fue aprobado y la cantidad de horas realizadas.\n✨ Con estos documentos nuestro equipo académico podrá revisar tu caso y determinar las materias que se pueden convalidar.' },

    // Seguimiento y Atención
    { id: 14, categoryId: 'cat_seguimiento', title: 'Aviso de Fuera de Matrícula', excerpt: '¡Hola, te saluda Shantal Gamboa desde la sede San José! 🍎📚😊\nEn este momento todavía no estamos en período de matrícula, por lo que aún no puedo brindarte el costo con descuentos o financiamiento.\nSin embargo, te adjunto nuestra factura proforma donde podrás ver el costo de la matrícula y de cada materia sin descuentos, para que tengás una referencia.\nCualquier consulta con gusto te ayudo. 📚' },
    { id: 15, categoryId: 'cat_seguimiento', title: 'Seguimiento de Interés (General)', excerpt: 'Hola! 😊\nQueríamos saber si tuviste la oportunidad de revisar la información que te compartimos.\nNos encantaría conocer tu opinión y saber qué te pareció.\nSi tienes alguna duda o necesitas más detalles, con gusto estoy para ayudarte 💬' },
    { id: 16, categoryId: 'cat_seguimiento', title: 'Seguimiento para Retomar Matrícula', excerpt: 'Hola 😊 ¡Espero que estés súper bien!\nQuería consultarte si te gustaría retomar tu proceso de matrícula.\nEstoy aquí para ayudarte en todo lo que necesitas 💬\n¡Aprovecha los descuentos vigentes y no dejes pasar esta oportunidad! 🚀' },
    { id: 17, categoryId: 'cat_seguimiento', title: 'Invitación a Capacitación', excerpt: 'Por este medio le informamos que el próximo sábado 09 de mayo a la 1:30 pm, la Universidad Isaac Newton llevará a cabo una capacitación virtual, a la cual es importante que todos los participantes se conecten.\nLa sesión se realizará a través de Microsoft Teams. A continuación, encontrará los detalles de acceso:\nReunión de Microsoft Teams https://teams.microsoft.com/meet/270247214646658?p=CkRHVThSnQvaJ7Jc0T\nId. de reunión: 270 247 214 646 658\nCódigo de acceso: sF39FW98' }
];

// En la V2 usaremos la propiedad isPinned directa en allMessages.

const recentItems = [
    { id: 1, title: "Modalidad Presencialidad Remota", time: "hace 5 min", excerpt: defaultMessages.find(m => m.id===1).excerpt },
    { id: 4, title: "Aclaración sobre CIDEP", time: "hace 12 min", excerpt: defaultMessages.find(m => m.id===4).excerpt },
    { id: 10, title: "Requisitos Generales de Matrícula", time: "hace 1 hora", excerpt: defaultMessages.find(m => m.id===10).excerpt }
];

// Cargar estado de LocalStorage o usar por defecto (Usamos llave V2 para inyectar esta BD final y sobreescribir pruebas antiguas)
let allMessages = JSON.parse(localStorage.getItem('uin_messages_v2')) || defaultMessages;
let workspaceCategories = JSON.parse(localStorage.getItem('uin_categories_v2')) || defaultCategories;

// Cargar papelera y auto-limpiar (>30 días)
let trashMessages = JSON.parse(localStorage.getItem('uin_trash_v1')) || [];
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
    localStorage.setItem('uin_messages_v2', JSON.stringify(allMessages));
    localStorage.setItem('uin_categories_v2', JSON.stringify(workspaceCategories));
    localStorage.setItem('uin_trash_v1', JSON.stringify(trashMessages));
}

// Cargar y Aplicar Perfil
function loadUserProfile() {
    const defaultProfile = { name: 'Equipo UIN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UIN&backgroundColor=e2e8f0' };
    const saved = JSON.parse(localStorage.getItem('uin_profile_v1')) || defaultProfile;
    
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

        let gridHtml = `<div class="messages-square-grid" style="margin-bottom: 32px;">`;
        gridHtml += msgsList.map(msg => {
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
        return gridHtml;
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
            localStorage.setItem('uin_profile_v1', JSON.stringify({
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
