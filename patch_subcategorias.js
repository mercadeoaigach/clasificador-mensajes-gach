const fs = require('fs');

// --- 1. ACTUALIZAR INDEX.HTML ---
let indexHtml = fs.readFileSync('index.html', 'utf8');

// Añadir modal de Subcategoría después de Conjunto Modal
const subModalHtml = `
    <!-- Subcategoría Modal -->
    <div id="subcategoria-modal" class="modal-backdrop">
        <div class="modal-box" style="max-width: 400px;">
            <div class="modal-header">
                <h2 id="subcategoria-modal-title">Nueva División</h2>
                <button class="icon-btn" id="close-subcategoria-modal"><i data-lucide="x"></i></button>
            </div>
            <div class="modal-body">
                <input type="hidden" id="edit-subcategoria-old-name">
                <div class="form-group">
                    <label>Nombre de la división interna</label>
                    <input type="text" id="new-subcategoria-name" class="form-control" placeholder="Ej: CURSOS DOBLES">
                </div>
            </div>
            <div class="modal-footer" style="display:flex; justify-content:space-between; width:100%;">
                <button class="icon-action-btn" id="btn-delete-subcategoria" style="color:var(--danger); display:none;" title="Eliminar división"><i data-lucide="trash-2"></i></button>
                <div style="display:flex; gap:8px; margin-left:auto;">
                    <button class="btn-cancel" id="cancel-subcategoria-modal">Cancelar</button>
                    <button class="btn-primary" id="save-subcategoria-modal">Guardar</button>
                </div>
            </div>
        </div>
    </div>
`;

if (!indexHtml.includes('subcategoria-modal')) {
    indexHtml = indexHtml.replace('<!-- Category Modal -->', subModalHtml + '\n    <!-- Category Modal -->');
}

// Añadir campo de Subcategoría al edit-modal de mensajes
const msgModalSelectOld = `<div class="form-group">
                    <label>Categoría</label>
                    <select id="edit-category" class="form-control">`;
const msgModalSelectNew = `<div class="form-group" style="display:flex; gap: 16px;">
                    <div style="flex:1;">
                        <label>Categoría</label>
                        <select id="edit-category" class="form-control">
                            <!-- dinámico -->
                        </select>
                    </div>
                    <div style="flex:1;">
                        <label>División (Opcional)</label>
                        <select id="edit-subcategory" class="form-control">
                            <option value="">General (Sin división)</option>
                            <!-- dinámico -->
                        </select>
                    </div>
                </div>`;
                
// Wait, in index.html, it currently has options hardcoded:
const msgModalOldFull = `<div class="form-group">
                    <label>Categoría</label>
                    <select id="edit-category" class="form-control">
                        <option value="INFORMACIÓN">INFORMACIÓN</option>
                        <option value="SALUDOS">SALUDOS</option>
                        <option value="CIERRES">CIERRES</option>
                        <option value="SEGUIMIENTO">SEGUIMIENTO</option>
                    </select>
                </div>`;

if (indexHtml.includes(msgModalOldFull)) {
    indexHtml = indexHtml.replace(msgModalOldFull, msgModalSelectNew);
}

fs.writeFileSync('index.html', indexHtml);
console.log("index.html actualizado.");


// --- 2. ACTUALIZAR APP-SUPABASE.JS ---
let appJs = fs.readFileSync('src/app-supabase.js', 'utf8');

// Añadir referencias al DOM para el modal
const domRefsOld = `const conjuntoModal = document.getElementById('conjunto-modal');
const inputConjuntoName = document.getElementById('new-conjunto-name');`;
const domRefsNew = `const conjuntoModal = document.getElementById('conjunto-modal');
const inputConjuntoName = document.getElementById('new-conjunto-name');

// DOM Refs Subcategoría
const subcategoriaModal = document.getElementById('subcategoria-modal');
const inputSubcategoriaName = document.getElementById('new-subcategoria-name');
const inputSubcategoriaOldName = document.getElementById('edit-subcategoria-old-name');
`;
if (!appJs.includes('const subcategoriaModal')) {
    appJs = appJs.replace(domRefsOld, domRefsNew);
}

// Función openSubcategoriaModal
if (!appJs.includes('function openSubcategoriaModal')) {
    appJs += `
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
            allMessages.forEach(m => {
                if (m.subCategory === oldName) m.subCategory = newName;
            });
        }
    } else {
        // En producción actualizaremos todos los mensajes que tengan esta subcategoría localmente (si usamos el campo texto)
        // O si ya está en DB con subcategorias tabla. Por ahora actualizamos subCategory
        if (oldName) {
            allMessages.forEach(m => {
                if (m.subCategory === oldName) m.subCategory = newName;
            });
            // Update Supabase records via custom rpc or individual updates
            // (Requires DB sync implementation)
            console.log("Renombrando en Supabase: " + oldName + " a " + newName);
        }
    }
    subcategoriaModal.classList.remove('show');
    renderMessages();
    showToast("División guardada");
});
`;
}

// Modificar renderMessages para inyectar UI
const groupHeaderOld = `fullHtml += \`<h4 style="margin-top: 12px; margin-bottom: 16px; font-size: 0.95rem; color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">\${groupName}</h4>\`;`;
const groupHeaderNew = `fullHtml += \`<div style="display:flex; align-items:center; gap:8px; margin-top: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
                    <h4 style="margin:0; font-size: 0.95rem; color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">\${groupName}</h4>
                    <button class="icon-action-btn edit-subcat-btn" data-name="\${groupName}" style="width: 24px; height: 24px;"><i data-lucide="edit-2" style="width:12px; height:12px;"></i></button>
                </div>\`;`;

if (appJs.includes(groupHeaderOld)) {
    appJs = appJs.replace(groupHeaderOld, groupHeaderNew);
}

// Botón "Nueva División" y Eventos Delegados en el Grid
const closeRenderOld = `        html = fullHtml;
    }

    document.getElementById('messages-grid').innerHTML = html;
    lucide.createIcons();`;

const closeRenderNew = `        
        // Agregar botón de nueva división si estamos en una categoría específica
        if (activeCategoryId !== 'all' && activeCategoryId !== 'trash') {
            fullHtml += \`
            <div style="margin-top: 24px; text-align: center;">
                <button class="btn-secondary" id="btn-add-division" style="background-color: var(--sidebar-bg); border: 1px dashed var(--border-color); color: var(--text-muted); width: 100%; max-width: 400px;">
                    <i data-lucide="plus"></i> Nueva División
                </button>
            </div>\`;
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
`;
if (appJs.includes(closeRenderOld)) {
    appJs = appJs.replace(closeRenderOld, closeRenderNew);
}

// Actualizar el edit-modal (cargar/guardar mensaje)
const editMsgOld = `            document.getElementById('message-modal-title').textContent = "Editar Mensaje";
            document.getElementById('edit-id').value = msg.id;
            document.getElementById('edit-title').value = msg.title;
            document.getElementById('edit-category').value = msg.categoria_id || msg.categoryId;
            document.getElementById('edit-excerpt').value = msg.excerpt;`;
            
const editMsgNew = `            document.getElementById('message-modal-title').textContent = "Editar Mensaje";
            document.getElementById('edit-id').value = msg.id;
            document.getElementById('edit-title').value = msg.title;
            
            // Llenar select de categorias dinamicamente
            const selectCat = document.getElementById('edit-category');
            selectCat.innerHTML = workspaceCategories.map(c => \`<option value="\${c.id}">\${c.name}</option>\`).join('');
            selectCat.value = msg.categoria_id || msg.categoryId;
            
            // Llenar select de subcategorias extrayendo las existentes en esta categoría
            const selectSub = document.getElementById('edit-subcategory');
            const catId = msg.categoria_id || msg.categoryId;
            const subs = Array.from(new Set(allMessages.filter(m => (m.categoria_id || m.categoryId) === catId && m.subCategory).map(m => m.subCategory)));
            selectSub.innerHTML = '<option value="">General (Sin división)</option>' + subs.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            selectSub.value = msg.subCategory || '';
            
            document.getElementById('edit-excerpt').value = msg.excerpt;`;
if (appJs.includes(editMsgOld)) {
    appJs = appJs.replace(editMsgOld, editMsgNew);
}

// El Save modal event
const saveMsgOld = `    const msgId = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value.trim();
    const excerpt = document.getElementById('edit-excerpt').value.trim();
    const catId = document.getElementById('edit-category').value;`;
const saveMsgNew = `    const msgId = document.getElementById('edit-id').value;
    const title = document.getElementById('edit-title').value.trim();
    const excerpt = document.getElementById('edit-excerpt').value.trim();
    const catId = document.getElementById('edit-category').value;
    const subCat = document.getElementById('edit-subcategory').value;`;

if (appJs.includes(saveMsgOld)) {
    appJs = appJs.replace(saveMsgOld, saveMsgNew);
}

const saveMsgLocOld = `            m.title = title;
            m.excerpt = excerpt;
            m.categoria_id = catId;
            m.categoryId = catId;`;
const saveMsgLocNew = `            m.title = title;
            m.excerpt = excerpt;
            m.categoria_id = catId;
            m.categoryId = catId;
            m.subCategory = subCat || null;`;
if (appJs.includes(saveMsgLocOld)) {
    appJs = appJs.replace(saveMsgLocOld, saveMsgLocNew);
}

fs.writeFileSync('src/app-supabase.js', appJs);
console.log("src/app-supabase.js actualizado.");
