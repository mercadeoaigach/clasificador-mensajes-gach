import { supabase } from '../supabase.js';
import { defaultWorkspaceCategories, defaultAppMessages } from '../generated_app_data.js';

// --- ESTADO GLOBAL ---
let currentUser = null;
let allConjuntos = [];
let workspaceCategories = [];
let allSubcategorias = [];
let allMessages = [];
let activeConjuntoId = localStorage.getItem('uin_activeConjuntoId') || null;
let activeCategoryId = localStorage.getItem('uin_activeCategoryId') || 'all';
let searchQuery = '';

// Elementos del DOM
const logoutBtn = document.getElementById('logout-btn');
const conjuntosSelect = document.getElementById('conjuntos-select');
const btnNewConjunto = document.getElementById('btn-new-conjunto');
const conjuntoModal = document.getElementById('conjunto-modal');
const inputConjuntoName = document.getElementById('new-conjunto-name');

// DOM Refs Subcategoría
const subcategoriaModal = document.getElementById('subcategoria-modal');
const inputSubcategoriaName = document.getElementById('new-subcategoria-name');
const inputSubcategoriaOldName = document.getElementById('edit-subcategoria-old-name');


// --- AUTENTICACIÓN ---
async function checkAuth() {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
        window.location.href = '/auth.html';
        return false;
    }
    currentUser = session.user;
    
    // Cargar perfil guardado o default
    loadUserProfile();
    return true;
}

// --- PERFIL Y VISTAS ---
function loadUserProfile() {
    const defaultProfile = { name: currentUser.email.split('@')[0], avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UIN&backgroundColor=e2e8f0' };
    
    let saved = defaultProfile;
    try {
        const stored = localStorage.getItem(`uin_profile_${currentUser.id}`);
        if (stored) {
            saved = JSON.parse(stored);
        }
    } catch(e) {
        console.error("Error parseando perfil", e);
    }
    
    // Aplicar a cabecera
    const headerAvatar = document.getElementById('header-avatar');
    const headerName = document.getElementById('header-user-name');
    if (headerAvatar && saved.avatar) headerAvatar.src = saved.avatar;
    if (headerName && saved.name) headerName.textContent = saved.name;
    
    // Aplicar a previsualizaciones en Configuración
    const settingsPreview = document.getElementById('settings-avatar-preview');
    const settingsNameInput = document.getElementById('settings-profile-name');
    if (settingsPreview && saved.avatar) settingsPreview.src = saved.avatar;
    if (settingsNameInput && saved.name) settingsNameInput.value = saved.name;
}

// Navegación de vistas
document.querySelectorAll('.dropdown-item[data-view], .sidebar-view-btn').forEach(item => {
    item.addEventListener('click', async (e) => {
        e.preventDefault();
        
        // Update active class in menu (only for header ones)
        if (e.currentTarget.classList.contains('dropdown-item')) {
            document.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('active'));
            e.currentTarget.classList.add('active');
        }
        
        const viewName = e.currentTarget.getAttribute('data-view');
        
        // Hide all views
        document.querySelectorAll('.view').forEach(v => {
            v.classList.remove('active');
            v.style.display = 'none';
        });
        
        // Show target view
        const targetView = document.getElementById(`view-${viewName}`);
        if (targetView) {
            targetView.classList.add('active');
            targetView.style.display = 'block';
        }
        
        // Si es la vista de la papelera, cargamos sus datos
        if (viewName === 'trash') {
            await loadGlobalTrash();
        }
        
        // Si volvemos al workspace, re-renderizamos los mensajes del conjunto activo
        if (viewName === 'workspace') {
            activeCategoryId = 'all';
            renderCategories();
            renderMessages();
            renderRightPinned();
            renderRightRecent();
        }
        
        // Close profile dropdown
        document.getElementById('profile-dropdown').style.display = 'none';
    });
});

// Guardar Perfil
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
            avatarPreview.src = event.target.result;
        };
        reader.readAsDataURL(file);
    });
}

if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
        const newName = nameInput.value.trim() || currentUser.email.split('@')[0];
        const currentPhoto = avatarPreview.src;
        
        localStorage.setItem(`uin_profile_${currentUser.id}`, JSON.stringify({
            name: newName,
            avatar: currentPhoto
        }));

        loadUserProfile();
        
        const originalText = saveProfileBtn.innerHTML;
        saveProfileBtn.innerHTML = '<i data-lucide="check"></i> Guardado';
        lucide.createIcons();
        
        setTimeout(() => {
            saveProfileBtn.innerHTML = originalText;
        }, 2000);
    });
}

logoutBtn.addEventListener('click', async (e) => {
    e.preventDefault();
    await supabase.auth.signOut();
    window.location.href = '/auth.html';
});

// --- CARGA DE DATOS DESDE SUPABASE ---
async function loadConjuntos() {
    const { data, error } = await supabase.from('conjuntos').select('*').order('created_at', { ascending: false });

    if (error) {
        console.error("Error al cargar conjuntos:", error);
        document.getElementById('messages-grid').innerHTML = `<p style="text-align:center; padding: 40px; color: var(--danger);">Error cargando conjuntos: ${error.message || error.details || JSON.stringify(error)}</p>`;
        conjuntosSelect.innerHTML = '<option value="">Error de carga</option>';
        return;
    }
    allConjuntos = data || [];
    


    renderConjuntos();
    
    // Si el activo actual fue borrado, o no hay, seleccionar el primero activo
    const activeConjuntos = allConjuntos.filter(c => !c.deleted_at);
    if (!activeConjuntoId || !allConjuntos.find(c => c.id === activeConjuntoId)) {
        if (activeConjuntos.length > 0) {
            activeConjuntoId = activeConjuntos[0].id;
        } else if (allConjuntos.length > 0) {
            activeConjuntoId = allConjuntos[0].id; // Fallback a los de papelera si solo hay eso
        }
    }
    if (activeConjuntoId) localStorage.setItem('uin_activeConjuntoId', activeConjuntoId);
    
    if (allConjuntos.length > 0) {
        conjuntosSelect.value = activeConjuntoId;
        await loadDataForConjunto(activeConjuntoId);
    } else {
        document.getElementById('messages-grid').innerHTML = '<p style="text-align:center; padding: 40px; color: var(--text-muted);">No tienes conjuntos aún. Crea uno para empezar.</p>';
        document.getElementById('directory-categories').innerHTML = '';
    }
}

async function loadDataForConjunto(conjuntoId) {
    if (!conjuntoId) return;

    // Actualizar UI de fecha
    const dateEl = document.getElementById('conjunto-update-date');
    const conjunto = allConjuntos.find(c => c.id == conjuntoId);
    if (dateEl && conjunto && conjunto.created_at) {
        const date = new Date(conjunto.created_at);
        const dateStr = date.toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
        dateEl.textContent = `Act. ${dateStr}`;
        dateEl.style.display = 'block';
    } else if (dateEl) {
        dateEl.style.display = 'none';
    }

    // Restaurar perfil original si salimos de la vista previa
    if (typeof loadUserProfile === 'function') {
        loadUserProfile();
    }
    
    // Cargar categorías del conjunto
    const { data: categorias, error: errCat } = await supabase.from('categorias').select('*').eq('conjunto_id', conjuntoId);
    if (!errCat) workspaceCategories = categorias;
    
    // Cargar mensajes de esas categorías
    const catIds = workspaceCategories.map(c => c.id);
    if (catIds.length > 0) {
        const { data: mensajes, error: errMsg } = await supabase.from('mensajes').select('*').in('categoria_id', catIds).order('created_at', { ascending: false });
        if (!errMsg) allMessages = mensajes;

        const { data: subs, error: errSub } = await supabase.from('subcategorias').select('*').in('categoria_id', catIds);
        if (!errSub) allSubcategorias = subs;
    } else {
        allMessages = [];
        allSubcategorias = [];
    }

    // Renderizado UI
    if (activeCategoryId !== 'trash' && !workspaceCategories.find(c => c.id === activeCategoryId)) {
        activeCategoryId = 'all';
        localStorage.setItem('uin_activeCategoryId', 'all');
    }
    document.getElementById('btn-new-message').style.display = 'inline-flex';
    
    renderCategories();
    renderMessages();
    renderRightPinned();
    renderRightRecent();
}

conjuntosSelect.addEventListener('change', async (e) => {
    activeConjuntoId = e.target.value;
    localStorage.setItem('uin_activeConjuntoId', activeConjuntoId);
    if (activeConjuntoId) {
        await loadDataForConjunto(activeConjuntoId);
    }
});

// --- RENDERIZADO BÁSICO (Adaptado a nueva estructura) ---
function renderConjuntos() {
    const active = allConjuntos.filter(c => !c.deleted_at);
    
    let html = '';
    if (active.length > 0) {
        html = active.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    }
    
    if (active.length === 0) {
        html = '<option value="">Sin conjuntos</option>';
    }
    
    conjuntosSelect.innerHTML = html;
}

function renderCategories() {
    let html = `
        <div class="category-nav-item ${activeCategoryId === 'all' ? 'active' : ''}" data-id="all">
            <div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; border-radius: 6px; flex-shrink: 0; background-color: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-muted);">
                <i data-lucide="inbox" style="width: 14px; height: 14px;"></i>
            </div>
            <span class="category-text">Todos los mensajes</span>
        </div>
    `;

    html += workspaceCategories.map(cat => {
        const isActive = cat.id === activeCategoryId;
        let catHtml = `
            <div class="category-nav-item ${isActive ? 'active' : ''}" data-id="${cat.id}">
                <div style="display: flex; align-items: center; justify-content: center; width: 24px; height: 24px; flex-shrink: 0; border-radius: 6px;" class="${cat.color}">
                    <i data-lucide="${cat.icon || 'message-circle'}" style="width: 14px; height: 14px;"></i>
                </div>
                <span class="category-text">${cat.name}</span>
                <div class="category-actions">
                    <button class="icon-btn btn-edit-category" data-id="${cat.id}" title="Editar categoría">
                        <i data-lucide="edit-2" style="width:12px; height:12px; color:var(--text-muted)"></i>
                    </button>
                </div>
            </div>
        `;
        
        if (isActive) {
            const subs = allSubcategorias.filter(s => s.categoria_id === cat.id);
            if (subs.length > 0) {
                catHtml += `<div class="subcategory-nav-list" style="padding-left: 32px; margin-top: -4px; margin-bottom: 8px; display: flex; flex-direction: column; gap: 4px;">`;
                subs.forEach(s => {
                    catHtml += `<div class="subcategory-nav-item" data-name="${s.name}" style="padding: 4px 8px; color: var(--text-muted); font-size: 0.7rem; cursor: pointer; border-radius: 4px; transition: background 0.2s;">
                        └ ${s.name}
                    </div>`;
                });
                catHtml += `</div>`;
            }
        }
        return catHtml;
    }).join('');
    // Papelera antigua eliminada
    
    document.getElementById('directory-categories').innerHTML = html;
    lucide.createIcons();

    document.querySelectorAll('.category-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            if(e.target.closest('.btn-edit-category')) {
                const idToEdit = e.target.closest('.btn-edit-category').getAttribute('data-id');
                const cat = workspaceCategories.find(c => c.id == idToEdit);
                if (cat) {
                    document.getElementById('category-modal-title').textContent = "Editar Categoría";
                    document.getElementById('edit-category-id').value = cat.id;
                    document.getElementById('new-category-name').value = cat.name;
                    document.getElementById('btn-delete-category').style.display = 'inline-flex';
                    
                    // Select color
                    document.querySelectorAll('#category-color-palette .color-swatch').forEach(s => s.classList.remove('selected'));
                    const colorSwatch = document.querySelector(`#category-color-palette .color-swatch[data-color="${cat.color}"]`);
                    if (colorSwatch) colorSwatch.classList.add('selected');
                    selectedColor = cat.color;
                    
                    // Select icon
                    document.querySelectorAll('#category-icon-palette .icon-swatch').forEach(s => s.classList.remove('selected'));
                    const iconSwatch = document.querySelector(`#category-icon-palette .icon-swatch[data-icon="${cat.icon}"]`);
                    if (iconSwatch) iconSwatch.classList.add('selected');
                    selectedIcon = cat.icon;

                    document.getElementById('category-modal').classList.add('show');
                }
                return;
            }
            activeCategoryId = e.currentTarget.getAttribute('data-id');
            localStorage.setItem('uin_activeCategoryId', activeCategoryId);
            renderCategories();
            renderMessages();
        });
    });

    document.querySelectorAll('.subcategory-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // prevent clicking the parent category again
            const subName = e.currentTarget.getAttribute('data-name');
            const targetId = 'subcat-' + subName.replace(/\\s+/g, '-');
            const targetEl = document.getElementById(targetId);
            if (targetEl) {
                const scrollContainer = document.querySelector('.view.active');
                if (scrollContainer) {
                    const containerRect = scrollContainer.getBoundingClientRect();
                    const targetRect = targetEl.getBoundingClientRect();
                    const relativeTop = targetRect.top - containerRect.top + scrollContainer.scrollTop;
                    scrollContainer.scrollTo({
                        top: relativeTop - 20, // Ajustado porque el contenedor de scroll ya no queda por debajo del header
                        behavior: 'smooth'
                    });
                }
                // Optional visual highlight
                targetEl.style.transition = 'background-color 0.5s';
                targetEl.style.backgroundColor = 'rgba(100, 100, 100, 0.1)';
                setTimeout(() => targetEl.style.backgroundColor = 'transparent', 1000);
            }
        });
    });
}

function getCatObj(catId) {
    return workspaceCategories.find(c => c.id === catId) || { name: 'SIN CATEGORÍA', color: 'bg-default', icon: 'message-circle' };
}

function renderMessages() {
    let html = '';
    const searchVal = searchQuery.toLowerCase().trim();

    const filterMsgs = (list, catId) => {
        return list.filter(m => {
            const isDeleted = !!m.deleted_at;
            if (catId === 'trash' && !isDeleted) return false;
            if (catId !== 'trash' && isDeleted) return false;
            
            // Support both supabase column and local mock data property
            const msgCatId = m.categoria_id || m.categoryId;
            const matchesCat = (catId === 'all' || catId === 'trash' || msgCatId === catId);
            const rawTitle = m.title.toLowerCase();
            const rawExcerpt = m.excerpt.toLowerCase();
            return matchesCat && (!searchVal || rawTitle.includes(searchVal) || rawExcerpt.includes(searchVal));
        });
    };

    const msgsToRender = filterMsgs(allMessages, activeCategoryId);

    // Dynamic title
    const panelTitle = document.getElementById('main-panel-title');
    if (panelTitle) {
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
                    <i data-lucide="${activeCat.icon}" style="width: 22px; height: 22px;"></i>
                </div>
                ${activeCat.name}
            </span>`;
        }
    }

    if (msgsToRender.length === 0) {
        html = '<p style="text-align:center; padding: 40px; width: 100%; color: var(--text-muted);">No hay mensajes aquí.</p>';
    } else {
        const grouped = {};
        
        // 1. Inicializar los grupos basados en allSubcategorias para que se muestren aunque estén vacíos
        if (activeCategoryId !== 'all' && activeCategoryId !== 'trash') {
            grouped['General'] = []; // Siempre mostrar la zona general
            const subsForCat = allSubcategorias.filter(s => s.categoria_id === activeCategoryId);
            subsForCat.forEach(s => {
                grouped[s.name] = [];
            });
        }
        
        // 2. Llenar los mensajes
        msgsToRender.forEach(msg => {
            const sc = msg.sub_categoria || msg.subCategory || 'General';
            if (!grouped[sc]) grouped[sc] = [];
            grouped[sc].push(msg);
        });

        let fullHtml = '';
        const groups = Object.keys(grouped).sort((a,b) => a === 'General' ? -1 : (b === 'General' ? 1 : a.localeCompare(b)));

        groups.forEach(groupName => {
            if (groupName !== 'General' && Object.keys(grouped).length > 0) {
                fullHtml += `<div id="subcat-${groupName.replace(/\\s+/g, '-')}" style="display:flex; align-items:center; gap:8px; margin-top: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                    <h4 style="margin:0; font-size: 0.95rem; color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">${groupName}</h4>
                    <button class="icon-action-btn edit-subcat-btn" data-name="${groupName}" style="width: 24px; height: 24px;"><i data-lucide="edit-2" style="width:12px; height:12px;"></i></button>
                </div>`;
            }
            let gridHtml = `<div class="messages-square-grid" data-division="${groupName}" style="margin-bottom: 24px;">`;
            if (grouped[groupName].length === 0) {
                const emptyText = groupName === 'General' ? 'Soltar fuera de la división' : 'Arrastra un mensaje aquí';
                gridHtml += `<div class="empty-division-placeholder" data-division="${groupName}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; grid-column: 1 / -1; padding: 24px; text-align: center; color: var(--text-muted); font-size: 0.9rem; background-color: var(--card-bg); border: 2px dashed var(--border-color); border-radius: 12px; transition: all 0.2s ease;">
                    <i data-lucide="inbox" style="width:24px; height:24px; margin-bottom:8px; opacity:0.5;"></i>
                    <span style="opacity: 0.7;">${emptyText}</span>
                </div>`;
            } else {
                gridHtml += grouped[groupName].map(msg => {
                const catObj = getCatObj(msg.categoria_id || msg.categoryId); // fallback for dummy data categoryId
            const isTrash = !!msg.deleted_at;
            
            let actionsHtml = '';
            if (isTrash) {
                actionsHtml = `
                    <button class="icon-action-btn btn-restore" data-id="${msg.id}" title="Restaurar mensaje" style="color: var(--success); background-color: rgba(16, 185, 129, 0.1);">
                        <i data-lucide="rotate-ccw"></i>
                    </button>
                    <button class="icon-action-btn btn-hard-delete" data-id="${msg.id}" title="Eliminar definitivamente" style="color: var(--danger); background-color: rgba(239, 68, 68, 0.1);">
                        <i data-lucide="trash"></i>
                    </button>
                `;
            } else {
                actionsHtml = `
                    <button class="icon-action-btn card-copy-act" data-text="${msg.excerpt.replace(/"/g, '&quot;')}" title="Copiar al portapapeles">
                        <i data-lucide="copy"></i>
                    </button>
                    <button class="icon-action-btn btn-pin" data-id="${msg.id}" title="Anclar/Desanclar mensaje">
                        <i data-lucide="pin" class="${msg.is_pinned ? 'text-primary' : ''}" style="${msg.is_pinned ? 'fill: currentColor;' : ''}"></i>
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
                <div class="square-card ${isTrash ? 'trash-card' : ''}" draggable="${!isTrash}" data-id="${msg.id}" style="${isTrash ? 'border-color: rgba(239, 68, 68, 0.3); opacity: 0.85;' : ''}">
                    <div class="square-card-header">
                        <div class="square-card-icon ${catObj.color}">
                            <i data-lucide="${catObj.icon}"></i>
                        </div>
                        <div class="icon-actions">
                            ${actionsHtml}
                        </div>
                    </div>
                    <h3 class="square-card-title">${msg.title}</h3>
                    ${msg.internal_note ? `
                    <div class="internal-note-badge" title="Este mensaje contiene una nota interna">
                        <i data-lucide="alert-circle" style="width: 12px; height: 12px;"></i>
                        Nota
                    </div>
                    ` : ''}
                    <p class="square-card-excerpt" data-id="${msg.id}" title="Clic para expandir" style="cursor: pointer;">${msg.excerpt}</p>
                </div>
            `;
        }).join('');
                
                // Dropzone fantasma al final de cada división o sección general
                const phantomText = groupName === 'General' ? 'Soltar fuera de la división' : 'Añadir a esta división';
                gridHtml += `
                <div class="empty-division-placeholder phantom-dropzone" data-division="${groupName}" style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; text-align: center; color: var(--text-muted); font-size: 0.85rem; background-color: transparent; border: 2px dashed var(--border-color); border-radius: 12px; transition: all 0.2s ease; min-height: 120px;">
                    <i data-lucide="plus" style="width:24px; height:24px; margin-bottom:8px; opacity:0.5;"></i>
                    <span style="opacity: 0.7;">${phantomText}</span>
                </div>
                `;
            }
            gridHtml += `</div>`;
            fullHtml += gridHtml;
        });
        
        // Agregar botón de nueva división si estamos en una categoría específica
        if (activeCategoryId !== 'all' && activeCategoryId !== 'trash') {
            fullHtml += `
            <div style="margin-top: 24px; text-align: center; display: flex; justify-content: center;">
                <button class="btn-secondary" id="btn-add-division" style="background-color: var(--sidebar-bg); border: 1px dashed var(--border-color); color: var(--text-muted); width: 100%; max-width: 400px; display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <i data-lucide="plus"></i> Nueva División
                </button>
            </div>`;
        }
        
        html = fullHtml;
    }

    document.getElementById('messages-grid').innerHTML = html;
    lucide.createIcons();
    
    // Asignar eventos de subcategorías
    document.querySelectorAll('.edit-subcat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const name = e.currentTarget.getAttribute('data-name');
            openSubcategoriaModal(name);
        });
    });
    const btnAddDiv = document.getElementById('btn-add-division');
    if (btnAddDiv) {
        btnAddDiv.addEventListener('click', () => openSubcategoriaModal());
    }

}

function renderRightPinned() {
    const pItems = allMessages.filter(m => m.is_pinned && !m.deleted_at);
    const html = pItems.map(item => `
        <li class="right-item right-pinned-item" data-id="${item.id}" style="cursor:pointer;" title="Click para ver completo">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 8px;">
                <span class="right-item-title" style="flex:1;">${item.title}</span>
                <div style="display:flex; gap: 2px;">
                    <button class="icon-action-btn right-copy-act" data-text="${item.excerpt.replace(/"/g, '&quot;')}" title="Copiar al portapapeles" style="width: 28px; height: 28px;">
                        <i data-lucide="copy" style="width:14px; height:14px;"></i>
                    </button>
                    <button class="icon-action-btn btn-pin" data-id="${item.id}" title="Desanclar" style="width: 28px; height: 28px;">
                        <i data-lucide="pin-off" style="width:14px; height:14px;"></i>
                    </button>
                </div>
            </div>
            <span class="right-item-meta">${getCatObj(item.categoria_id || item.categoryId).name}</span>
        </li>
    `).join('');
    document.getElementById('right-pinned').innerHTML = html || '<p style="color:var(--text-muted); font-size:0.8rem; padding: 10px 0;">No hay mensajes anclados</p>';
    lucide.createIcons();
}

function renderRightRecent() {
    const recent = allMessages.filter(m => !m.deleted_at).slice(0, 5);
    const html = recent.map(item => `
        <li class="right-item right-recent-item" data-id="${item.id}" style="cursor:pointer;" title="Click para ver completo">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; gap: 8px;">
                <span class="right-item-title" style="flex:1;">${item.title}</span>
                <button class="icon-action-btn right-copy-act" data-text="${item.excerpt.replace(/"/g, '&quot;')}" title="Copiar al portapapeles" style="width: 28px; height: 28px;">
                    <i data-lucide="copy" style="width:14px; height:14px;"></i>
                </button>
            </div>
            <span class="right-item-meta">${getCatObj(item.categoria_id || item.categoryId).name}</span>
        </li>
    `).join('');
    document.getElementById('right-recent').innerHTML = html || '<p style="color:var(--text-muted); font-size:0.8rem; padding: 10px 0;">No hay mensajes</p>';
    lucide.createIcons();
}

// Búsqueda
document.getElementById('global-search').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderMessages();
});

// Modal de Conjuntos
// (Ya declarados en la parte superior: btnNewConjunto, conjuntoModal, inputConjuntoName)
const btnEditConjunto = document.getElementById('btn-edit-conjunto');

btnNewConjunto.addEventListener('click', () => {
    document.getElementById('conjunto-modal-title').textContent = "Nuevo Conjunto";
    document.getElementById('edit-conjunto-id').value = "";
    document.getElementById('btn-delete-conjunto').style.display = 'none';
    document.getElementById('new-conjunto-name').value = '';
    conjuntoModal.classList.add('show');
});

if (btnEditConjunto) {
    btnEditConjunto.addEventListener('click', () => {
        if (!activeConjuntoId) return;
        const activeConjuntoObj = allConjuntos.find(c => c.id == activeConjuntoId);
        
        if (activeConjuntoObj && activeConjuntoObj.deleted_at) {
            document.getElementById('edit-conjunto-id').value = activeConjuntoObj.id;
            document.getElementById('new-conjunto-name').value = activeConjuntoObj.name;
            document.getElementById('conjunto-modal-title').textContent = "Restaurar Conjunto";
            document.getElementById('save-conjunto-modal').textContent = "Restaurar de la papelera";
            document.getElementById('btn-delete-conjunto').style.display = 'flex';
            document.getElementById('btn-delete-conjunto').innerHTML = '<i data-lucide="trash-2" style="width:15px;height:15px;"></i> Eliminar Definitivamente';
            conjuntoModal.classList.add('show');
            lucide.createIcons();
        } else {
            document.getElementById('edit-conjunto-id').value = activeConjuntoObj ? activeConjuntoId : '';
            document.getElementById('new-conjunto-name').value = activeConjuntoObj ? activeConjuntoObj.name : '';
            document.getElementById('conjunto-modal-title').textContent = "Editar Conjunto";
            document.getElementById('save-conjunto-modal').textContent = "Guardar";
            document.getElementById('btn-delete-conjunto').style.display = 'flex';
            document.getElementById('btn-delete-conjunto').innerHTML = '<i data-lucide="trash-2" style="width:15px;height:15px;"></i> Mover a Papelera';
            conjuntoModal.classList.add('show');
            lucide.createIcons();
        }
    });
}

document.getElementById('close-conjunto-modal').addEventListener('click', () => conjuntoModal.classList.remove('show'));
document.getElementById('cancel-conjunto-modal').addEventListener('click', () => conjuntoModal.classList.remove('show'));

document.getElementById('save-conjunto-modal').addEventListener('click', async () => {
    const name = document.getElementById('new-conjunto-name').value.trim();
    if (!name) return alert("Ingresa un nombre para el conjunto");
    
    const editId = document.getElementById('edit-conjunto-id').value;
    document.getElementById('save-conjunto-modal').textContent = 'Procesando...';
    
    let error;
    if (editId) {
        const conjunto = allConjuntos.find(c => c.id == editId);
        // Si está en la papelera y le dan "Guardar" (Restaurar)
        if (conjunto && conjunto.deleted_at) {
            const { error: err } = await supabase.from('conjuntos').update({ name, deleted_at: null }).eq('id', editId);
            error = err;
        } else {
            const { error: err } = await supabase.from('conjuntos').update({ name }).eq('id', editId);
            error = err;
        }
    } else {
        const { error: err } = await supabase.from('conjuntos').insert([{ user_id: currentUser.id, name }]);
        error = err;
    }
    
    if (error) {
        alert("Error guardando conjunto");
        console.error(error);
    } else {
        conjuntoModal.classList.remove('show');
        await loadConjuntos();
    }
    document.getElementById('save-conjunto-modal').textContent = 'Guardar';
});

document.getElementById('btn-delete-conjunto').addEventListener('click', async () => {
    const editId = document.getElementById('edit-conjunto-id').value;
    const conjunto = allConjuntos.find(c => c.id == editId);
    
    if (conjunto && conjunto.deleted_at) {
        if (confirm("⚠️ ¿Estás seguro de que quieres eliminar este conjunto PERMANENTEMENTE? Todos sus mensajes se perderán. Esta acción NO se puede deshacer.")) {
            const { error } = await supabase.from('conjuntos').delete().eq('id', editId);
            if (error) {
                alert("Error: " + error.message);
                return;
            }
            conjuntoModal.classList.remove('show');
            await loadConjuntos();
        }
    } else {
        if (confirm("⚠️ ¿Estás seguro de que quieres mover este conjunto a la papelera?")) {
            const { error } = await supabase.from('conjuntos').update({ deleted_at: new Date().toISOString() }).eq('id', editId);
            
            if (error) {
                if (error.message && error.message.includes('deleted_at')) {
                    alert("Para usar la papelera en conjuntos, debes ejecutar en tu SQL de Supabase: ALTER TABLE conjuntos ADD COLUMN deleted_at TIMESTAMPTZ;");
                } else {
                    alert("Error: " + error.message);
                }
                return;
            }
            
            conjuntoModal.classList.remove('show');
            await loadConjuntos();
        }
    }
});

// Toast / Click Actions functionality
let messageToDeleteId = null;
const deleteModal = document.getElementById('delete-modal');

document.body.addEventListener('click', async (e) => {
    // Copiar (Derecha o Central)
    const copyBtn = e.target.closest('.card-copy-act, .right-copy-act');
    if (copyBtn) {
        navigator.clipboard.writeText(copyBtn.getAttribute('data-text')).then(() => {
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').textContent = 'Copiado al portapapeles';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        });
        return;
    }
    
    // Vista completa (Click en texto central)
    const expandArea = e.target.closest('.square-card-excerpt');
    if (expandArea) {
        const idToView = expandArea.getAttribute('data-id');
        openReadingModal(idToView);
        return;
    }

    // Vista completa (Sidebar derecha)
    const sidebarItem = e.target.closest('.right-item');
    if (sidebarItem && !e.target.closest('button')) {
        const idToView = sidebarItem.getAttribute('data-id');
        if (idToView) openReadingModal(idToView);
        return;
    }
    
    // Editar
    const editBtn = e.target.closest('.btn-edit');
    if (editBtn) {
        const id = editBtn.getAttribute('data-id');
        const msg = allMessages.find(m => String(m.id) === String(id));
        if (msg) {
            document.getElementById('edit-id').value = msg.id;
            document.getElementById('edit-title').value = msg.title;
            document.getElementById('edit-excerpt').value = msg.excerpt;
            
            const catId = msg.categoria_id || msg.categoryId;
            document.getElementById('edit-category').innerHTML = workspaceCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
            document.getElementById('edit-category').value = catId;
            
            // Subcategorias
            const selectSub = document.getElementById('edit-subcategory');
            const subs = allSubcategorias.filter(s => s.categoria_id === catId).map(s => s.name);
            selectSub.innerHTML = '<option value="">General (Sin división)</option>' + subs.map(s => `<option value="${s}">${s}</option>`).join('');
            selectSub.value = msg.sub_categoria || msg.subCategory || '';
            
            document.getElementById('edit-category').onchange = (e) => {
                const newCatId = e.target.value;
                const newSubs = allSubcategorias.filter(s => s.categoria_id === newCatId).map(s => s.name);
                selectSub.innerHTML = '<option value="">General (Sin división)</option>' + newSubs.map(s => `<option value="${s}">${s}</option>`).join('');
            };
            
            initialMessageState = { title: msg.title, excerpt: msg.excerpt }; // Guardar estado
            document.getElementById('edit-modal').classList.add('show');
        }
        return;
    }
    
    // Anclar
    const pinBtn = e.target.closest('.btn-pin, .btn-unpin');
    if (pinBtn) {
        const id = pinBtn.getAttribute('data-id');
        const msg = allMessages.find(m => String(m.id) === String(id));
        if (msg) {
            const newState = !msg.is_pinned;
            msg.is_pinned = newState; // optimistic UI update
            renderMessages();
            renderRightPinned();
            if (activeConjuntoId !== 'local-preview') {
                await supabase.from('mensajes').update({ is_pinned: newState }).eq('id', id);
            }
        }
        return;
    }
    
    // Borrar a papelera
    const deleteBtn = e.target.closest('.btn-delete');
    if (deleteBtn) {
        messageToDeleteId = deleteBtn.getAttribute('data-id');
        deleteModal.classList.add('show');
        return;
    }

    // Restaurar
    const restoreBtn = e.target.closest('.btn-restore');
    if (restoreBtn) {
        const id = restoreBtn.getAttribute('data-id');
        if (activeConjuntoId === 'local-preview') {
            const msg = allMessages.find(m => String(m.id) === String(id));
            if (msg) {
                msg.deleted_at = null;
                renderMessages();
            }
        } else {
            await supabase.from('mensajes').update({ deleted_at: null }).eq('id', id);
            await loadDataForConjunto(activeConjuntoId); // Recargar
        }
        return;
    }

    // Borrado definitivo
    const hardDeleteBtn = e.target.closest('.btn-hard-delete');
    if (hardDeleteBtn) {
        if (confirm("⚠️ ¿Eliminar definitivamente? Esta acción no se puede deshacer.")) {
            const id = hardDeleteBtn.getAttribute('data-id');
            if (activeConjuntoId === 'local-preview') {
                allMessages = allMessages.filter(m => String(m.id) !== String(id));
                renderMessages();
            } else {
                await supabase.from('mensajes').delete().eq('id', id);
                await loadDataForConjunto(activeConjuntoId); // Recargar
            }
        }
        return;
    }
});

// Lógica para confirmar el borrado de mensajes
document.getElementById('close-delete-modal').addEventListener('click', () => deleteModal.classList.remove('show'));
document.getElementById('cancel-delete-modal').addEventListener('click', () => deleteModal.classList.remove('show'));
document.getElementById('confirm-delete-modal').addEventListener('click', async () => {
    if (messageToDeleteId) {
        document.getElementById('confirm-delete-modal').textContent = 'Borrando...';
        if (activeConjuntoId === 'local-preview') {
            const msg = allMessages.find(m => String(m.id) === String(messageToDeleteId));
            if (msg) {
                msg.deleted_at = new Date().toISOString();
                renderMessages();
            }
            deleteModal.classList.remove('show');
            document.getElementById('confirm-delete-modal').textContent = 'Mover a Papelera';
        } else {
            // Soft delete (mover a papelera virtual poniendo deleted_at)
            await supabase.from('mensajes').update({ deleted_at: new Date().toISOString() }).eq('id', messageToDeleteId);
            deleteModal.classList.remove('show');
            document.getElementById('confirm-delete-modal').textContent = 'Mover a Papelera';
            await loadDataForConjunto(activeConjuntoId); // Recargar
        }
    }
});

// --- LÓGICA DE LECTURA (MODAL) ---
let currentReadingId = null;
function openReadingModal(id) {
    const msg = allMessages.find(m => String(m.id) === String(id));
    if (!msg) return;
    currentReadingId = id;
    
    document.getElementById('reading-modal-title').textContent = msg.title;
    document.getElementById('reading-modal-content').textContent = msg.excerpt;
    
    const internalNoteEl = document.getElementById('reading-modal-internal-note');
    if (internalNoteEl) {
        if (msg.internal_note) {
            internalNoteEl.innerHTML = `
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px; font-weight: 600;">
                    <i data-lucide="alert-triangle" style="width: 14px; height: 14px;"></i>
                    Nota
                </div>
                ${msg.internal_note}
            `;
            internalNoteEl.style.display = 'block';
        } else {
            internalNoteEl.style.display = 'none';
            internalNoteEl.innerHTML = '';
        }
    }
    
    const pinIcon = document.getElementById('reading-icon-pin');
    if (pinIcon) {
        if (msg.is_pinned) {
            pinIcon.classList.add('text-primary');
            pinIcon.style.fill = 'currentColor';
        } else {
            pinIcon.classList.remove('text-primary');
            pinIcon.style.fill = 'none';
        }
    }
    
    document.getElementById('reading-modal').classList.add('show');
    lucide.createIcons();
}

document.getElementById('close-reading-modal')?.addEventListener('click', () => {
    document.getElementById('reading-modal').classList.remove('show');
});

document.getElementById('reading-btn-copy')?.addEventListener('click', () => {
    const msg = allMessages.find(m => String(m.id) === String(currentReadingId));
    if (msg) {
        navigator.clipboard.writeText(msg.excerpt).then(() => {
            document.getElementById('reading-modal').classList.remove('show');
            const toast = document.getElementById('toast');
            document.getElementById('toast-message').textContent = 'Copiado al portapapeles';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 2000);
        });
    }
});

document.getElementById('reading-btn-pin')?.addEventListener('click', async () => {
    const msg = allMessages.find(m => String(m.id) === String(currentReadingId));
    if (msg) {
        const newState = !msg.is_pinned;
        msg.is_pinned = newState; // optimistic UI update
        const pinIcon = document.getElementById('reading-icon-pin');
        if (pinIcon) {
            if (newState) {
                pinIcon.classList.add('text-primary');
                pinIcon.style.fill = 'currentColor';
            } else {
                pinIcon.classList.remove('text-primary');
                pinIcon.style.fill = 'none';
            }
        }
        renderMessages();
        renderRightPinned();
        if (activeConjuntoId !== 'local-preview') {
            await supabase.from('mensajes').update({ is_pinned: newState }).eq('id', currentReadingId);
        }
    }
});

document.getElementById('reading-btn-edit')?.addEventListener('click', () => {
    const msg = allMessages.find(m => String(m.id) === String(currentReadingId));
    if (msg) {
        document.getElementById('reading-modal').classList.remove('show');
        
        document.getElementById('edit-id').value = msg.id;
        document.getElementById('edit-title').value = msg.title;
        document.getElementById('edit-excerpt').value = msg.excerpt;
        document.getElementById('edit-internal-note').value = msg.internal_note || '';
        
        const catId = msg.categoria_id || msg.categoryId;
        document.getElementById('edit-category').innerHTML = workspaceCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
        document.getElementById('edit-category').value = catId;
        
        // Subcategorias
        const selectSub = document.getElementById('edit-subcategory');
        const subs = allSubcategorias.filter(s => s.categoria_id === catId).map(s => s.name);
        selectSub.innerHTML = '<option value="">General (Sin división)</option>' + subs.map(s => `<option value="${s}">${s}</option>`).join('');
        selectSub.value = msg.sub_categoria || msg.subCategory || '';
        
        document.getElementById('edit-category').onchange = (e) => {
            const newCatId = e.target.value;
            const newSubs = allSubcategorias.filter(s => s.categoria_id === newCatId).map(s => s.name);
            selectSub.innerHTML = '<option value="">General (Sin división)</option>' + newSubs.map(s => `<option value="${s}">${s}</option>`).join('');
        };
        
        initialMessageState = { title: msg.title, excerpt: msg.excerpt }; // Guardar estado
        document.getElementById('edit-modal').classList.add('show');
    }
});

document.getElementById('reading-btn-delete')?.addEventListener('click', () => {
    if (currentReadingId) {
        document.getElementById('reading-modal').classList.remove('show');
        messageToDeleteId = currentReadingId;
        document.getElementById('delete-modal').classList.add('show');
    }
});

// Modales UI genéricos
const profileTrigger = document.getElementById('profile-trigger');
const profileDropdown = document.getElementById('profile-dropdown');
if (profileTrigger && profileDropdown) {
    profileTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.style.display = profileDropdown.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', (e) => {
        if (!profileTrigger.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.style.display = 'none';
        }
    });
}

// --- CREAR CATEGORÍAS ---
const btnNewCategory = document.getElementById('btn-new-category');
const categoryModal = document.getElementById('category-modal');
let selectedColor = 'bg-red';
let selectedIcon = 'message-circle';

document.querySelectorAll('#category-color-palette .color-swatch').forEach(sw => {
    sw.addEventListener('click', (e) => {
        document.querySelectorAll('#category-color-palette .color-swatch').forEach(s => s.classList.remove('selected'));
        e.target.classList.add('selected');
        selectedColor = e.target.getAttribute('data-color');
    });
});
document.querySelectorAll('#category-icon-palette .icon-swatch').forEach(sw => {
    sw.addEventListener('click', (e) => {
        const target = e.target.closest('.icon-swatch');
        document.querySelectorAll('#category-icon-palette .icon-swatch').forEach(s => s.classList.remove('selected'));
        target.classList.add('selected');
        selectedIcon = target.getAttribute('data-icon');
    });
});

btnNewCategory.addEventListener('click', () => {
    if (!activeConjuntoId) return alert("Primero selecciona o crea un conjunto");
    document.getElementById('category-modal-title').textContent = "Nueva Categoría";
    document.getElementById('edit-category-id').value = "";
    document.getElementById('btn-delete-category').style.display = 'none';
    document.getElementById('new-category-name').value = '';
    categoryModal.classList.add('show');
});

document.getElementById('close-category-modal').addEventListener('click', () => categoryModal.classList.remove('show'));
document.getElementById('cancel-category-modal').addEventListener('click', () => categoryModal.classList.remove('show'));

document.getElementById('save-category-modal').addEventListener('click', async () => {
    const name = document.getElementById('new-category-name').value.trim();
    if (!name) return alert("Ingresa un nombre para la categoría");
    
    const editId = document.getElementById('edit-category-id').value;
    document.getElementById('save-category-modal').textContent = 'Guardando...';
    
    let error;
    if (editId) {
        const { error: err } = await supabase.from('categorias').update({ name, color: selectedColor, icon: selectedIcon }).eq('id', editId);
        error = err;
    } else {
        const { error: err } = await supabase.from('categorias').insert([{ conjunto_id: activeConjuntoId, name, color: selectedColor, icon: selectedIcon }]);
        error = err;
    }
    
    if (error) alert("Error: " + error.message);
    else {
        categoryModal.classList.remove('show');
        await loadDataForConjunto(activeConjuntoId);
    }
    document.getElementById('save-category-modal').textContent = 'Añadir Categoría';
});

const btnDeleteCategory = document.getElementById('btn-delete-category');
if (btnDeleteCategory) {
    btnDeleteCategory.addEventListener('click', async () => {
        const id = document.getElementById('edit-category-id').value;
        if (!id) return;
        
        if(confirm("¿Estás seguro de que deseas eliminar esta categoría? Se moverán sus mensajes a la papelera (o se perderán).")) {
            const { error } = await supabase.from('categorias').delete().eq('id', id);
            if (!error) {
                categoryModal.classList.remove('show');
                await loadDataForConjunto(activeConjuntoId);
            } else {
                alert("Error eliminando categoría");
            }
        }
    });
}

// --- CREAR MENSAJES ---
const btnNewMessage = document.getElementById('btn-new-message');
const messageModal = document.getElementById('edit-modal');
const inputMessageTitle = document.getElementById('edit-title');
const inputMessageExcerpt = document.getElementById('edit-excerpt');
const inputMessageCategory = document.getElementById('edit-category');
let initialMessageState = { title: '', excerpt: '' };

function closeMessageModalWithCheck() {
    const currentTitle = inputMessageTitle.value.trim();
    const currentExcerpt = inputMessageExcerpt.value.trim();
    
    if (currentTitle !== initialMessageState.title || currentExcerpt !== initialMessageState.excerpt) {
        if (!confirm("Tienes cambios sin guardar. ¿Seguro que quieres cerrar sin guardar?")) {
            return; // Cancelar cierre
        }
    }
    messageModal.classList.remove('show');
}

btnNewMessage.addEventListener('click', () => {
    if (workspaceCategories.length === 0) return alert("Crea una categoría primero");
    inputMessageTitle.value = '';
    inputMessageExcerpt.value = '';
    document.getElementById('edit-internal-note').value = '';
    inputMessageCategory.innerHTML = workspaceCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
    if (activeCategoryId !== 'all') inputMessageCategory.value = activeCategoryId;
    
    initialMessageState = { title: '', excerpt: '' }; // Guardar estado
    messageModal.classList.add('show');
});

document.getElementById('close-message-modal').addEventListener('click', closeMessageModalWithCheck);
document.getElementById('cancel-message-modal').addEventListener('click', closeMessageModalWithCheck);

document.getElementById('save-message-modal').addEventListener('click', async () => {
    const id = document.getElementById('edit-id').value;
    const title = inputMessageTitle.value.trim();
    const excerpt = inputMessageExcerpt.value.trim();
    const internalNote = document.getElementById('edit-internal-note').value.trim();
    const catId = inputMessageCategory.value;
    const subCat = document.getElementById('edit-subcategory').value || null;
    
    if (!title || !excerpt) return alert("Título y mensaje son obligatorios");
    
    document.getElementById('save-message-modal').textContent = 'Guardando...';
    
    if (activeConjuntoId === 'local-preview') {
        if (id) {
            const m = allMessages.find(msg => String(msg.id) === String(id));
            if (m) {
                m.title = title;
                m.excerpt = excerpt;
                m.internal_note = internalNote;
                m.categoria_id = catId;
                m.categoryId = catId;
                m.sub_categoria = subCat;
                m.subCategory = subCat;
            }
        } else {
            allMessages.unshift({
                id: 'mock_msg_' + Date.now(),
                title: title,
                excerpt: excerpt,
                internal_note: internalNote,
                categoria_id: catId,
                categoryId: catId,
                sub_categoria: subCat,
                subCategory: subCat,
                is_pinned: false,
                created_at: new Date().toISOString()
            });
        }
        initialMessageState = { title: title, excerpt: excerpt };
        messageModal.classList.remove('show');
        renderMessages();
    } else {
        let error;
        if (id) {
            // Actualizar mensaje existente
            const { error: updateError } = await supabase.from('mensajes').update({
                categoria_id: catId,
                title: title,
                excerpt: excerpt,
                internal_note: internalNote,
                sub_categoria: subCat
            }).eq('id', id);
            error = updateError;
        } else {
            // Crear nuevo mensaje
            const { error: insertError } = await supabase.from('mensajes').insert([{
                categoria_id: catId,
                title: title,
                excerpt: excerpt,
                internal_note: internalNote,
                sub_categoria: subCat
            }]);
            error = insertError;
        }
        
        if (error) alert("Error: " + error.message);
        else {
            initialMessageState = { title: title, excerpt: excerpt };
            messageModal.classList.remove('show');
            await loadDataForConjunto(activeConjuntoId);
        }
    }
    document.getElementById('save-message-modal').textContent = 'Guardar Mensaje';
});

// --- PAPELERA GLOBAL ---
async function loadGlobalTrash() {
    try {
        document.getElementById('global-trash-conjuntos').innerHTML = '<p style="color: var(--text-muted);">Cargando conjuntos...</p>';
        document.getElementById('global-trash-mensajes').innerHTML = '<p style="color: var(--text-muted);">Cargando mensajes...</p>';
        
        // Conjuntos en papelera
        const { data: trashConjuntos, error: errC } = await supabase.from('conjuntos').select('*').not('deleted_at', 'is', null).order('deleted_at', { ascending: false });
        
        if (errC) {
            document.getElementById('global-trash-conjuntos').innerHTML = `<p style="color: var(--danger);">Error conjuntos: ${errC.message}</p>`;
        } else if (trashConjuntos.length === 0) {
            document.getElementById('global-trash-conjuntos').innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No hay conjuntos eliminados.</p>';
        } else {
            document.getElementById('global-trash-conjuntos').innerHTML = trashConjuntos.map(c => `
                <div class="card" style="display: flex; justify-content: space-between; align-items: center; border-left: 4px solid var(--danger);">
                    <div>
                        <h3 style="margin: 0; font-size: 1.05rem;">${c.name}</h3>
                        <span style="font-size: 0.75rem; color: var(--text-muted);">Eliminado el: ${new Date(c.deleted_at).toLocaleDateString()}</span>
                    </div>
                    <div style="display: flex; gap: 8px;">
                        <button class="icon-action-btn global-restore-conjunto" data-id="${c.id}" title="Restaurar" style="color: var(--success); background-color: rgba(16, 185, 129, 0.1);">
                            <i data-lucide="rotate-ccw" style="width: 18px; height: 18px;"></i>
                        </button>
                        <button class="icon-action-btn global-hard-delete-conjunto" data-id="${c.id}" title="Eliminar Definitivamente" style="color: var(--danger); background-color: rgba(239, 68, 68, 0.1);">
                            <i data-lucide="trash" style="width: 18px; height: 18px;"></i>
                        </button>
                    </div>
                </div>
            `).join('');
        }
        
        // Mensajes en papelera
        // Corregido el join: mensajes -> categorias -> conjuntos
        const { data: trashMensajes, error: errM } = await supabase.from('mensajes').select('*, categorias:categoria_id(name, conjuntos:conjunto_id(name))').not('deleted_at', 'is', null).order('deleted_at', { ascending: false });
        
        if (errM) {
            if (errM.message && errM.message.includes('deleted_at')) {
                document.getElementById('global-trash-mensajes').innerHTML = `<p style="color: var(--danger);">Error: Falta la columna deleted_at en la tabla mensajes.</p>`;
            } else {
                document.getElementById('global-trash-mensajes').innerHTML = `<p style="color: var(--danger);">Error mensajes: ${errM.message}</p>`;
            }
        } else if (trashMensajes.length === 0) {
        document.getElementById('global-trash-mensajes').innerHTML = '<p style="color: var(--text-muted); font-style: italic;">No hay mensajes eliminados.</p>';
    } else {
        document.getElementById('global-trash-mensajes').innerHTML = trashMensajes.map(m => `
            <div style="background: var(--card-bg); border: 1px solid var(--border-color); border-left: 4px solid var(--danger); border-radius: var(--radius-md); padding: 16px; display: flex; justify-content: space-between; align-items: flex-start; gap: 16px;">
                <div style="flex: 1; min-width: 0;">
                    <span style="display: inline-block; font-size: 0.75rem; color: var(--danger); background: rgba(239,68,68,0.08); border: 1px solid rgba(239,68,68,0.2); border-radius: 4px; padding: 2px 8px; margin-bottom: 8px;">
                        ${m.categorias?.conjuntos?.name || 'Desconocido'} &rsaquo; ${m.categorias?.name || 'Sin categoría'}
                    </span>
                    <h3 style="margin: 0 0 4px 0; font-size: 1rem; font-weight: 600; color: var(--text-main); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${m.title}</h3>
                    <p style="margin: 0 0 8px 0; font-size: 0.85rem; color: var(--text-muted); overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;">${m.excerpt}</p>
                    <span style="font-size: 0.75rem; color: var(--text-muted);">Eliminado el: ${new Date(m.deleted_at).toLocaleDateString()}</span>
                </div>
                <div style="display: flex; flex-direction: column; gap: 8px; flex-shrink: 0;">
                    <button class="icon-action-btn global-restore-mensaje" data-id="${m.id}" title="Restaurar" style="color: var(--success); background-color: rgba(16, 185, 129, 0.1); width: 36px; height: 36px;">
                        <i data-lucide="rotate-ccw" style="width: 16px; height: 16px;"></i>
                    </button>
                    <button class="icon-action-btn global-hard-delete-mensaje" data-id="${m.id}" title="Eliminar Definitivamente" style="color: var(--danger); background-color: rgba(239, 68, 68, 0.1); width: 36px; height: 36px;">
                        <i data-lucide="trash" style="width: 16px; height: 16px;"></i>
                    </button>
                </div>
            </div>
        `).join('');
    }
    lucide.createIcons();
    
    // Bind listeners para restaurar/eliminar conjuntos
    document.querySelectorAll('.global-restore-conjunto').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            await supabase.from('conjuntos').update({ deleted_at: null }).eq('id', id);
            await loadConjuntos(); // refresh nav
            await loadGlobalTrash(); // refresh trash
        });
    });
    document.querySelectorAll('.global-hard-delete-conjunto').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            if (confirm("⚠️ ¿Estás seguro de que quieres eliminar este conjunto PERMANENTEMENTE?")) {
                await supabase.from('conjuntos').delete().eq('id', id);
                await loadConjuntos();
                await loadGlobalTrash();
            }
        });
    });
    
    // Bind listeners para restaurar/eliminar mensajes
    document.querySelectorAll('.global-restore-mensaje').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            await supabase.from('mensajes').update({ deleted_at: null }).eq('id', id);
            await loadGlobalTrash();
            if (activeConjuntoId) await loadDataForConjunto(activeConjuntoId);
        });
    });
    document.querySelectorAll('.global-hard-delete-mensaje').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.currentTarget.getAttribute('data-id');
            if (confirm("⚠️ ¿Estás seguro de que quieres eliminar este mensaje PERMANENTEMENTE?")) {
                await supabase.from('mensajes').delete().eq('id', id);
                await loadGlobalTrash();
                if (activeConjuntoId) await loadDataForConjunto(activeConjuntoId);
            }
        });
    });
    } catch (err) {
        console.error("Excepción en loadGlobalTrash:", err);
        document.getElementById('global-trash-conjuntos').innerHTML = `<p style="color: var(--danger);">Ocurrió un error inesperado al cargar la papelera. Mira la consola.</p>`;
        document.getElementById('global-trash-mensajes').innerHTML = '';
    }
}

// --- LÓGICA DE TECLADO GLOBAL (ESCAPE) ---
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Cerrar modal de lectura si está abierto
        if (document.getElementById('reading-modal').classList.contains('show')) {
            document.getElementById('reading-modal').classList.remove('show');
            return;
        }
        // Cerrar modal de mensaje con advertencia si está abierto
        if (messageModal.classList.contains('show')) {
            closeMessageModalWithCheck();
            return;
        }
        // Cerrar otros modales sin advertencia
        document.querySelectorAll('.modal-backdrop.show').forEach(modal => {
            modal.classList.remove('show');
        });
    }
});

// --- NOTIFICACIONES Y TUTORIAL ---
const notificationsTrigger = document.getElementById('notifications-trigger');
const notificationsDropdown = document.getElementById('notifications-dropdown');
const notificationDot = document.getElementById('notification-dot');
const notificationsList = document.getElementById('notifications-list');

if (notificationsTrigger && notificationsDropdown) {
    notificationsTrigger.addEventListener('click', (e) => {
        e.stopPropagation();
        notificationsDropdown.style.display = notificationsDropdown.style.display === 'none' ? 'flex' : 'none';
        if (notificationsDropdown.style.display === 'flex') {
            // Marcar como leídas
            notificationDot.style.display = 'none';
            if (currentUser) {
                localStorage.setItem('notifications_read_' + currentUser.id, 'true');
            }
        }
    });
    document.addEventListener('click', (e) => {
        if (!notificationsTrigger.contains(e.target) && !notificationsDropdown.contains(e.target)) {
            notificationsDropdown.style.display = 'none';
        }
    });
}

function showTutorial() {
    const tutorialModal = document.getElementById('tutorial-modal');
    if (tutorialModal) {
        tutorialModal.classList.add('show');
        lucide.createIcons();
    }
}

document.getElementById('close-tutorial-modal')?.addEventListener('click', () => {
    document.getElementById('tutorial-modal').classList.remove('show');
});
document.getElementById('btn-finish-tutorial')?.addEventListener('click', () => {
    document.getElementById('tutorial-modal').classList.remove('show');
});

function startTour() {
    if (!window.driver || !window.driver.js) {
        console.error("Driver.js no está cargado correctamente");
        return;
    }
    
    // Inyectar mensajes falsos si la pantalla está vacía para que el tutorial funcione y se vea como un grid real
    const grid = document.getElementById('messages-grid');
    const hasMessages = grid && grid.querySelectorAll('.square-card').length > 0;
    let dummyElements = [];
    
    if (!hasMessages && grid) {
        const dummyData = [
            {
                title: "Modalidad Presencialidad Remota",
                icon: "info",
                excerpt: "📚✨ Modalidad Presencialidad Remota 💻🌍 Estudiá de forma flexible y conectate con tus docentes en tiempo real desde cualquier lugar."
            },
            {
                title: "Carreras Disponibles (Ingenierías)",
                icon: "graduation-cap",
                excerpt: "¡Hola! 😊 Actualmente en la universidad contamos con las carreras de Ingeniería Civil e Ingeniería Industrial."
            },
            {
                title: "Aclaración sobre CIDEP",
                icon: "help-circle",
                excerpt: "Hola! Muchas gracias por tu interés. Te comento que nuestra universidad no ofrece carreras técnicas, cursos libres ni diplomados directamente."
            }
        ];

        // Clear the "No hay mensajes" text if it's there
        if (grid.innerHTML.includes('No hay mensajes')) {
            grid.innerHTML = '';
        }
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(300px, 1fr))';

        dummyData.forEach((data, index) => {
            let dummyMsg = document.createElement('div');
            dummyMsg.className = 'square-card';
            dummyMsg.id = 'dummy-tour-msg-' + index;
            dummyMsg.style.cssText = 'position: relative; z-index: 10000; background-color: var(--card-bg); border-radius: 12px; padding: 20px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: 12px; width: 100%;';
            dummyMsg.innerHTML = `
                <div class="square-card-header" style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="square-card-icon bg-blue-light" style="display: flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 10px; background-color: rgba(59, 130, 246, 0.1); color: #3b82f6;">
                        <i data-lucide="${data.icon}" style="width: 20px; height: 20px;"></i>
                    </div>
                    <div class="icon-actions" style="display: flex; gap: 4px;">
                        <button class="icon-action-btn" title="Copiar al portapapeles"><i data-lucide="copy" style="width: 16px; height: 16px;"></i></button>
                        <button class="icon-action-btn" title="Anclar mensaje"><i data-lucide="pin" style="width: 16px; height: 16px;"></i></button>
                        <button class="icon-action-btn" title="Editar mensaje"><i data-lucide="edit-2" style="width: 16px; height: 16px;"></i></button>
                    </div>
                </div>
                <h3 class="square-card-title" style="margin: 0; font-size: 1.05rem; font-weight: 600; color: var(--text-main);">${data.title}</h3>
                <p class="square-card-excerpt" style="margin: 0; font-size: 0.9rem; color: var(--text-muted); line-height: 1.5;">${data.excerpt}</p>
            `;
            grid.appendChild(dummyMsg);
            dummyElements.push(dummyMsg);
        });
        
        lucide.createIcons();
    }

    const driver = window.driver.js.driver;
    const driverObj = driver({
        showProgress: true,
        animate: true,
        popoverClass: 'gach-driver-theme',
        nextBtnText: 'Siguiente',
        prevBtnText: 'Anterior',
        doneBtnText: '¡Entendido!',
        allowClose: true,
        showButtons: ['next', 'previous', 'close'],
        onDestroyed: () => {
            dummyElements.forEach(el => {
                if (el && el.parentNode) {
                    el.parentNode.removeChild(el);
                }
            });
        },
        steps: [
            { popover: { title: '¡Bienvenido a GACH!', description: 'Vamos a darte un rápido recorrido por tu nueva herramienta de respuestas.' } },
            { element: '#conjuntos-select', popover: { title: 'Espacios de Trabajo', description: 'Aquí puedes cambiar entre diferentes guías o departamentos.' } },
            { element: '.search-container', popover: { title: 'Buscador Inteligente', description: '¿Buscas algo específico? Escribe palabras clave y encontraremos las respuestas al instante en toda tu base de datos.' } },
            { element: '#directory-categories', popover: { title: 'Categorías', description: 'Navega entre los distintos temas para encontrar respuestas rápidas.' } },
            { element: '#messages-grid', popover: { title: 'Tus Mensajes', description: 'Aquí están tus respuestas. ¡Puedes arrastrarlas y soltarlas para organizarlas a tu gusto entre divisiones!' } },
            { element: hasMessages ? '.square-card .icon-actions' : '#dummy-tour-msg-0 .icon-actions', popover: { title: 'Acciones Rápidas', description: 'Aquí tienes tus botones. El más importante es "Copiar", que envía todo el texto directo a tu portapapeles listo para enviar al cliente. También puedes anclarlo o editarlo.' } },
            { element: '.workspace-rightbar', popover: { title: 'Accesos Rápidos', description: 'En este panel de la derecha siempre tendrás a la mano tus mensajes Anclados (los más importantes) y tu historial reciente de copias para mayor velocidad.' } }
        ]
    });
    driverObj.drive();
}

function checkFirstLogin() {
    if (!currentUser) return;
    
    // For testing purposes, we ALWAYS show the tour right now, 
    // just for this session, as requested by the user.
    // In production, uncomment the check:
    // const hasSeenTutorial = localStorage.getItem('tutorial_seen_' + currentUser.id);
    // if (!hasSeenTutorial) {
    
    setTimeout(() => {
        startTour();
        localStorage.setItem('tutorial_seen_' + currentUser.id, 'true');
    }, 800);
    
    // }
}

document.getElementById('btn-replay-tutorial')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('profile-dropdown').style.display = 'none';
    startTour();
});

document.getElementById('header-tutorial-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    startTour();
});

// INICIO
async function initApp() {
    if (await checkAuth()) {
        lucide.createIcons();
        await loadConjuntos();
        checkFirstLogin();
    }
}

initApp();

// --- Lógica de Subcategorías ---
function openSubcategoriaModal(oldName = '') {
    inputSubcategoriaOldName.value = oldName;
    inputSubcategoriaName.value = oldName;
    document.getElementById('subcategoria-modal-title').textContent = oldName ? "Editar División" : "Nueva División";
    document.getElementById('btn-delete-subcategoria').style.display = oldName ? "inline-flex" : "none";
    subcategoriaModal.classList.add('show');
}

document.getElementById('close-subcategoria-modal')?.addEventListener('click', () => subcategoriaModal.classList.remove('show'));
document.getElementById('cancel-subcategoria-modal')?.addEventListener('click', () => subcategoriaModal.classList.remove('show'));

document.getElementById('save-subcategoria-modal')?.addEventListener('click', async () => {
    const newName = inputSubcategoriaName.value.trim().toUpperCase();
    const oldName = inputSubcategoriaOldName.value;
    if (!newName) return;

    if (activeConjuntoId === 'local-preview') {
        // Renombrar en memoria local
        if (oldName) {
            // Edit
            const subObj = allSubcategorias.find(s => s.name === oldName);
            if (subObj) subObj.name = newName;
            
            allMessages.forEach(m => {
                if (m.subCategory === oldName) m.subCategory = newName;
            });
        } else {
            // Create
            allSubcategorias.push({
                id: 'mock_sub_' + Date.now(),
                categoria_id: activeCategoryId,
                name: newName
            });
        }
    } else {
        // PRODUCCIÓN (Supabase)
        if (oldName) {
            // Edit en BD
            const subObj = allSubcategorias.find(s => s.name === oldName && s.categoria_id === activeCategoryId);
            if (subObj) {
                subObj.name = newName;
                supabase.from('subcategorias').update({ name: newName }).eq('id', subObj.id).then();
            }
            allMessages.forEach(m => {
                if (m.subCategory === oldName) m.subCategory = newName;
            });
        } else {
            // Create en BD
            supabase.from('subcategorias').insert([{ categoria_id: activeCategoryId, name: newName }]).select().then(({data}) => {
                if (data && data[0]) {
                    allSubcategorias.push(data[0]);
                    renderMessages(); // re-render para mostrarla
                }
            });
        }
    }
    subcategoriaModal.classList.remove('show');
    renderMessages();
    showToast("División guardada");
});

// --- NOTIFICACIÓN TOAST ---
const toastEl = document.getElementById('toast');
const toastMsgEl = document.getElementById('toast-message');
let toastTimeout;

function showToast(message = "¡Acción realizada con éxito!") {
    clearTimeout(toastTimeout);
    if (toastMsgEl) toastMsgEl.textContent = message;
    if (toastEl) {
        toastEl.classList.add('show');
        toastTimeout = setTimeout(() => {
            toastEl.classList.remove('show');
        }, 3000);
    }
}

// --- DRAG AND DROP (EVENT DELEGATION) ---
let draggedMessageId = null;

document.body.addEventListener('dragstart', (e) => {
    const card = e.target.closest('.square-card');
    if (card) {
        document.body.classList.add('is-dragging');
        draggedMessageId = card.getAttribute('data-id');
        e.dataTransfer.setData('text/plain', draggedMessageId);
        card.classList.add('dragging');
        
        // Highlight active category items on sidebar and empty division placeholders in grid
        document.querySelectorAll('.category-nav-item, .subcategory-nav-item, .empty-division-placeholder').forEach(el => {
            el.classList.add('drag-ready');
        });
    }
});

document.body.addEventListener('dragend', (e) => {
    document.body.classList.remove('is-dragging');
    const card = e.target.closest('.square-card');
    if (card) {
        card.classList.remove('dragging');
    }
    document.querySelectorAll('.category-nav-item, .subcategory-nav-item, .square-card, .empty-division-placeholder').forEach(el => {
        el.classList.remove('drag-ready', 'drag-hover');
    });
});

document.body.addEventListener('dragover', (e) => {
    e.preventDefault(); // Always allow drop to prevent snap-back delay
    const categoryTarget = e.target.closest('.category-nav-item, .subcategory-nav-item');
    const cardTarget = e.target.closest('.square-card');
    const emptyPlaceholderTarget = e.target.closest('.empty-division-placeholder');
    
    if (categoryTarget || (cardTarget && cardTarget.getAttribute('data-id') !== draggedMessageId) || emptyPlaceholderTarget) {
        if (categoryTarget) {
            categoryTarget.classList.add('drag-hover');
        }
        if (cardTarget) {
            cardTarget.classList.add('drag-hover');
        }
        if (emptyPlaceholderTarget) {
            emptyPlaceholderTarget.classList.add('drag-hover');
        }
    }
});

document.body.addEventListener('dragleave', (e) => {
    const target = e.target.closest('.category-nav-item, .subcategory-nav-item, .square-card, .empty-division-placeholder');
    if (target) {
        target.classList.remove('drag-hover');
    }
});

document.body.addEventListener('drop', async (e) => {
    e.preventDefault();
    document.body.classList.remove('is-dragging');
    const categoryTarget = e.target.closest('.category-nav-item');
    const subcategoryTarget = e.target.closest('.subcategory-nav-item');
    const cardTarget = e.target.closest('.square-card');
    const emptyPlaceholderTarget = e.target.closest('.empty-division-placeholder');
    
    if (!draggedMessageId) return;
    
    // Case 1: Drop on category
    if (categoryTarget) {
        const newCatId = categoryTarget.getAttribute('data-id');
        if (newCatId === 'all' || newCatId === 'trash') return;
        await moveMessageToCategory(draggedMessageId, newCatId, null);
    }
    // Case 2: Drop on subcategory (division) in sidebar
    else if (subcategoryTarget) {
        const subName = subcategoryTarget.getAttribute('data-name');
        const subObj = allSubcategorias.find(s => s.name === subName);
        if (subObj) {
            await moveMessageToCategory(draggedMessageId, subObj.categoria_id, subName);
        }
    }
    // Case 3: Drop on empty division placeholder in the grid
    else if (emptyPlaceholderTarget) {
        const subName = emptyPlaceholderTarget.getAttribute('data-division');
        if (activeCategoryId && activeCategoryId !== 'all' && activeCategoryId !== 'trash') {
            await moveMessageToCategory(draggedMessageId, activeCategoryId, subName);
        }
    }
    // Case 4: Drop on card (reorder)
    else if (cardTarget) {
        const targetId = cardTarget.getAttribute('data-id');
        if (targetId && targetId !== draggedMessageId) {
            await swapMessagesOrder(draggedMessageId, targetId);
        }
    }
});

async function moveMessageToCategory(messageId, catId, subCatName) {
    const finalSubCat = subCatName === 'General' ? null : subCatName;
    const msg = allMessages.find(m => String(m.id) === String(messageId));
    
    if (msg) {
        // Actualización optimista de la UI
        msg.categoria_id = catId;
        msg.sub_categoria = finalSubCat;
        renderMessages();
        renderCategories();
        
        // Petición asíncrona en segundo plano
        const { error } = await supabase.from('mensajes').update({
            categoria_id: catId,
            sub_categoria: finalSubCat
        }).eq('id', messageId);
        
        if (error) {
            alert("Error al mover mensaje: " + error.message);
            await loadDataForConjunto(activeConjuntoId); // Revertir en caso de error
        } else {
            showToast("Mensaje movido con éxito");
        }
    }
}

async function swapMessagesOrder(msgId1, msgId2) {
    const msg1 = allMessages.find(m => String(m.id) === String(msgId1));
    const msg2 = allMessages.find(m => String(m.id) === String(msgId2));
    
    if (!msg1 || !msg2) return;
    
    const div1 = msg1.sub_categoria || msg1.subCategory || null;
    const div2 = msg2.sub_categoria || msg2.subCategory || null;
    const sameDivision = div1 === div2;
    
    const tempCreatedAt = msg1.created_at;
    const tempCreatedAt2 = msg2.created_at;
    
    // Actualización optimista
    msg1.created_at = tempCreatedAt2;
    msg2.created_at = tempCreatedAt;
    if (!sameDivision) {
        msg1.sub_categoria = div2;
    }
    
    const idx1 = allMessages.indexOf(msg1);
    const idx2 = allMessages.indexOf(msg2);
    if (idx1 !== -1 && idx2 !== -1) {
        allMessages[idx1] = msg2;
        allMessages[idx2] = msg1;
    }
    renderMessages();
    
    // Guardar en segundo plano
    const updateData = { created_at: tempCreatedAt2 };
    if (!sameDivision) {
        updateData.sub_categoria = div2;
    }
    
    const { error } = await supabase.from('mensajes').update(updateData).eq('id', msg1.id);
    const { error: error2 } = await supabase.from('mensajes').update({ created_at: tempCreatedAt }).eq('id', msg2.id);
    
    if (error || error2) {
        alert("Error al reordenar: " + (error?.message || error2?.message));
        await loadDataForConjunto(activeConjuntoId);
    } else {
        showToast(sameDivision ? "Mensajes reordenados" : "Mensaje movido de división");
    }
}

// --- LÓGICA DE EXPORTACIÓN (RESPALDO) ---
async function handleExportBackup(e) {
    const btn = e.currentTarget;
    try {
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i data-lucide="loader" class="spin" style="width: 14px; height: 14px;"></i> Exportando...';
        
        // Cargar todo directamente de Supabase (todas las tablas asociadas a este usuario)
        const { data: conjuntos, error: errConj } = await supabase.from('conjuntos').select('*');
        if (errConj) throw errConj;
        
        const { data: categorias, error: errCat } = await supabase.from('categorias').select('*');
        if (errCat) throw errCat;
        
        const { data: subcategorias, error: errSub } = await supabase.from('subcategorias').select('*');
        if (errSub) throw errSub;
        
        const { data: mensajes, error: errMsj } = await supabase.from('mensajes').select('*');
        if (errMsj) throw errMsj;
        
        const backupData = {
            export_date: new Date().toISOString(),
            user: currentUser?.email,
            conjuntos,
            categorias,
            subcategorias,
            mensajes
        };
        
        const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `uin_respaldo_total_${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        btn.innerHTML = originalText;
        if(window.lucide) lucide.createIcons();
    } catch (error) {
        console.error("Error al exportar:", error);
        alert("Ocurrió un error al generar el respaldo: " + error.message);
        btn.innerHTML = '<i data-lucide="download" style="width: 14px; height: 14px;"></i> Exportar Respaldo';
        if(window.lucide) lucide.createIcons();
    }
}

document.getElementById('btn-export-backup')?.addEventListener('click', handleExportBackup);
document.getElementById('btn-export-settings')?.addEventListener('click', handleExportBackup);
