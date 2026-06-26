import { supabase } from '../supabase.js';

// --- ESTADO GLOBAL ---
let currentUser = null;
let allConjuntos = [];
let workspaceCategories = [];
let allMessages = [];
let activeConjuntoId = null;
let activeCategoryId = 'all';
let searchQuery = '';

// Elementos del DOM
const logoutBtn = document.getElementById('logout-btn');
const conjuntosSelect = document.getElementById('conjuntos-select');
const btnNewConjunto = document.getElementById('btn-new-conjunto');
const conjuntoModal = document.getElementById('conjunto-modal');
const inputConjuntoName = document.getElementById('new-conjunto-name');

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
    allConjuntos = data;
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
    
    // Cargar categorías del conjunto
    const { data: categorias, error: errCat } = await supabase.from('categorias').select('*').eq('conjunto_id', conjuntoId);
    if (!errCat) workspaceCategories = categorias;
    
    // Cargar mensajes de esas categorías
    const catIds = workspaceCategories.map(c => c.id);
    if (catIds.length > 0) {
        const { data: mensajes, error: errMsg } = await supabase.from('mensajes').select('*').in('categoria_id', catIds).order('created_at', { ascending: false });
        if (!errMsg) allMessages = mensajes;
    } else {
        allMessages = [];
    }

    // Renderizado UI
    activeCategoryId = 'all';
    document.getElementById('btn-new-message').style.display = 'inline-flex';
    
    renderCategories();
    renderMessages();
    renderRightPinned();
    renderRightRecent();
}

conjuntosSelect.addEventListener('change', async (e) => {
    activeConjuntoId = e.target.value;
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
            <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 8px; flex-shrink: 0; background-color: var(--card-bg); border: 1px solid var(--border-color); color: var(--text-muted);">
                <i data-lucide="inbox" style="width: 16px; height: 16px;"></i>
            </div>
            <span class="category-text">Todos los mensajes</span>
        </div>
    `;

    html += workspaceCategories.map(cat => {
        const isActive = cat.id === activeCategoryId;
        return `
            <div class="category-nav-item ${isActive ? 'active' : ''}" data-id="${cat.id}">
                <div style="display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; flex-shrink: 0; border-radius: 8px;" class="${cat.color}">
                    <i data-lucide="${cat.icon || 'message-circle'}" style="width: 16px; height: 16px;"></i>
                </div>
                <span class="category-text">${cat.name}</span>
                <div class="category-actions">
                    <button class="icon-btn btn-edit-category" data-id="${cat.id}" title="Editar categoría">
                        <i data-lucide="edit-2" style="width:12px; height:12px; color:var(--text-muted)"></i>
                    </button>
                </div>
            </div>
        `;
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
            renderCategories();
            renderMessages();
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
            
            const matchesCat = (catId === 'all' || catId === 'trash' || m.categoria_id === catId);
            const rawTitle = m.title.toLowerCase();
            const rawExcerpt = m.excerpt.toLowerCase();
            return matchesCat && (!searchVal || rawTitle.includes(searchVal) || rawExcerpt.includes(searchVal));
        });
    };

    const msgsToRender = filterMsgs(allMessages, activeCategoryId);

    if (msgsToRender.length === 0) {
        html = '<p style="text-align:center; padding: 40px; width: 100%; color: var(--text-muted);">No hay mensajes aquí.</p>';
    } else {
        html = '<div class="messages-square-grid" style="margin-bottom: 32px;">' + msgsToRender.map(msg => {
            const catObj = getCatObj(msg.categoria_id);
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
                <div class="square-card ${isTrash ? 'trash-card' : ''}" style="${isTrash ? 'border-color: rgba(239, 68, 68, 0.3); opacity: 0.85;' : ''}">
                    <div class="square-card-header">
                        <div class="square-card-icon ${catObj.color}">
                            <i data-lucide="${catObj.icon}"></i>
                        </div>
                        <div class="icon-actions">
                            ${actionsHtml}
                        </div>
                    </div>
                    <h3 class="square-card-title">${msg.title}</h3>
                    <p class="square-card-excerpt" data-id="${msg.id}" title="Clic para expandir" style="cursor: pointer;">${msg.excerpt}</p>
                </div>
            `;
        }).join('') + '</div>';
    }

    document.getElementById('messages-grid').innerHTML = html;
    lucide.createIcons();
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
            <span class="right-item-meta">${getCatObj(item.categoria_id).name}</span>
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
            <span class="right-item-meta">${getCatObj(item.categoria_id).name}</span>
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
        const msg = allMessages.find(m => m.id === id);
        if (msg) {
            document.getElementById('edit-id').value = msg.id;
            document.getElementById('edit-title').value = msg.title;
            document.getElementById('edit-excerpt').value = msg.excerpt;
            document.getElementById('edit-category').innerHTML = workspaceCategories.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
            document.getElementById('edit-category').value = msg.categoria_id;
            
            initialMessageState = { title: msg.title, excerpt: msg.excerpt }; // Guardar estado
            document.getElementById('edit-modal').classList.add('show');
        }
        return;
    }
    
    // Anclar
    const pinBtn = e.target.closest('.btn-pin, .btn-unpin');
    if (pinBtn) {
        const id = pinBtn.getAttribute('data-id');
        const msg = allMessages.find(m => m.id === id);
        if (msg) {
            const newState = !msg.is_pinned;
            msg.is_pinned = newState; // optimistic UI update
            renderMessages();
            renderRightPinned();
            await supabase.from('mensajes').update({ is_pinned: newState }).eq('id', id);
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
        await supabase.from('mensajes').update({ deleted_at: null }).eq('id', id);
        await loadDataForConjunto(activeConjuntoId); // Recargar
        return;
    }

    // Borrado definitivo
    const hardDeleteBtn = e.target.closest('.btn-hard-delete');
    if (hardDeleteBtn) {
        if (confirm("⚠️ ¿Eliminar definitivamente? Esta acción no se puede deshacer.")) {
            const id = hardDeleteBtn.getAttribute('data-id');
            await supabase.from('mensajes').delete().eq('id', id);
            await loadDataForConjunto(activeConjuntoId); // Recargar
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
        // Soft delete (mover a papelera virtual poniendo deleted_at)
        await supabase.from('mensajes').update({ deleted_at: new Date().toISOString() }).eq('id', messageToDeleteId);
        deleteModal.classList.remove('show');
        document.getElementById('confirm-delete-modal').textContent = 'Mover a Papelera';
        await loadDataForConjunto(activeConjuntoId); // Recargar
    }
});

// --- LÓGICA DE LECTURA (MODAL) ---
let currentReadingId = null;
function openReadingModal(id) {
    const msg = allMessages.find(m => m.id === id);
    if (!msg) return;
    currentReadingId = id;
    
    document.getElementById('reading-modal-title').textContent = msg.title;
    document.getElementById('reading-modal-content').textContent = msg.excerpt;
    
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
    const msg = allMessages.find(m => m.id === currentReadingId);
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
    const catId = inputMessageCategory.value;
    
    if (!title || !excerpt) return alert("Título y mensaje son obligatorios");
    
    document.getElementById('save-message-modal').textContent = 'Guardando...';
    
    let error;
    if (id) {
        // Actualizar mensaje existente
        const { error: updateError } = await supabase.from('mensajes').update({
            categoria_id: catId,
            title: title,
            excerpt: excerpt
        }).eq('id', id);
        error = updateError;
    } else {
        // Crear nuevo mensaje
        const { error: insertError } = await supabase.from('mensajes').insert([{
            categoria_id: catId,
            title: title,
            excerpt: excerpt
        }]);
        error = insertError;
    }
    
    if (error) alert("Error: " + error.message);
    else {
        initialMessageState = { title: title, excerpt: excerpt }; // reset para que no salte alerta
        messageModal.classList.remove('show');
        await loadDataForConjunto(activeConjuntoId);
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

function checkFirstLogin() {
    if (!currentUser) return;
    
    const hasSeenTutorial = localStorage.getItem('tutorial_seen_' + currentUser.id);
    
    // Add notification item
    if (notificationsList) {
        const notifItem = document.createElement('div');
        notifItem.style.cssText = 'padding: 16px; border-bottom: 1px solid var(--border-color); display: flex; gap: 12px; cursor: pointer; transition: background-color var(--transition-fast);';
        notifItem.innerHTML = `
            <div style="background-color: rgba(0, 82, 255, 0.1); color: var(--primary-color); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                <i data-lucide="compass" style="width: 16px; height: 16px;"></i>
            </div>
            <div>
                <h4 style="margin: 0 0 4px 0; font-size: 0.9rem; font-weight: 600; color: var(--text-main);">Bienvenido a GACH</h4>
                <p style="margin: 0; font-size: 0.8rem; color: var(--text-muted);">Haz clic aquí para ver un pequeño tutorial de cómo usar la aplicación.</p>
            </div>
        `;
        notifItem.addEventListener('click', () => {
            showTutorial();
            notificationsDropdown.style.display = 'none';
        });
        
        notificationsList.innerHTML = '';
        notificationsList.appendChild(notifItem);
    }

    if (!hasSeenTutorial) {
        // Show tutorial modal automatically
        setTimeout(() => {
            showTutorial();
            localStorage.setItem('tutorial_seen_' + currentUser.id, 'true');
        }, 500);

        // Show dot
        const hasReadNotifs = localStorage.getItem('notifications_read_' + currentUser.id);
        if (!hasReadNotifs && notificationDot) {
            notificationDot.style.display = 'block';
        }
    }
}

// INICIO
async function initApp() {
    if (await checkAuth()) {
        lucide.createIcons();
        await loadConjuntos();
        checkFirstLogin();
    }
}

initApp();
