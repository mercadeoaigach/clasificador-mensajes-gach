const fs = require('fs');

let app = fs.readFileSync('src/app-supabase.js', 'utf8');

// 1. Imports
if (!app.includes('import { defaultWorkspaceCategories')) {
    app = app.replace(
        `import { supabase } from '../supabase.js';`,
        `import { supabase } from '../supabase.js';\nimport { defaultWorkspaceCategories, defaultAppMessages } from '../generated_app_data.js';`
    );
}

// 2. loadConjuntos
const loadConjuntosOld = `    if (error) {
        console.error("Error al cargar conjuntos:", error);`;
const loadConjuntosNew = `    if (error) {
        console.error("Error al cargar conjuntos:", error);`;

if (!app.includes(`id: 'local-preview'`)) {
    app = app.replace(
        `    allConjuntos = data;
    renderConjuntos();`,
        `    allConjuntos = data || [];
    
    // INYECTAR VISTA PREVIA LOCAL SOLO SI ES LOCALHOST
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        allConjuntos.unshift({
            id: 'local-preview',
            name: '✨ Vista Previa (Local Shantal)',
            created_at: new Date().toISOString()
        });
    }

    renderConjuntos();`
    );
}

// 3. loadDataForConjunto
const loadDataOld = `async function loadDataForConjunto(conjuntoId) {
    if (!conjuntoId) return;
    
    // Cargar categorías del conjunto`;
const loadDataNew = `async function loadDataForConjunto(conjuntoId) {
    if (!conjuntoId) return;

    if (conjuntoId === 'local-preview') {
        workspaceCategories = defaultWorkspaceCategories;
        allMessages = defaultAppMessages;
        
        const headerAvatar = document.getElementById('header-avatar');
        const headerName = document.getElementById('header-user-name');
        if (headerAvatar) headerAvatar.src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shantal&backgroundColor=e2e8f0';
        if (headerName) headerName.textContent = 'Shantal Gamboa';

        activeCategoryId = 'all';
        document.getElementById('btn-new-message').style.display = 'inline-flex';
        renderCategories();
        renderMessages();
        renderRightPinned();
        renderRightRecent();
        return;
    }

    // Restaurar perfil original si salimos de la vista previa
    if (typeof loadUserProfile === 'function') {
        loadUserProfile();
    }
    
    // Cargar categorías del conjunto`;

if (!app.includes(`conjuntoId === 'local-preview'`)) {
    app = app.replace(loadDataOld, loadDataNew);
}

// 4. renderMessages grouping
const renderMsgOld = `    if (msgsToRender.length === 0) {
        html = '<p style="text-align:center; padding: 40px; width: 100%; color: var(--text-muted);">No hay mensajes aquí.</p>';
    } else {
        html = '<div class="messages-square-grid" style="margin-bottom: 32px;">' + msgsToRender.map(msg => {
            const catObj = getCatObj(msg.categoria_id);`;

const renderMsgNew = `    if (msgsToRender.length === 0) {
        html = '<p style="text-align:center; padding: 40px; width: 100%; color: var(--text-muted);">No hay mensajes aquí.</p>';
    } else {
        const grouped = {};
        msgsToRender.forEach(msg => {
            // Check if subCategory exists (either dummy data or future DB column)
            const sc = msg.subCategory || 'General';
            if (!grouped[sc]) grouped[sc] = [];
            grouped[sc].push(msg);
        });

        let fullHtml = '';
        const groups = Object.keys(grouped).sort((a,b) => a === 'General' ? -1 : (b === 'General' ? 1 : a.localeCompare(b)));

        groups.forEach(groupName => {
            if (groupName !== 'General' && Object.keys(grouped).length > 0) {
                fullHtml += \`<h4 style="margin-top: 12px; margin-bottom: 16px; font-size: 0.95rem; color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">\${groupName}</h4>\`;
            }
            let gridHtml = \`<div class="messages-square-grid" style="margin-bottom: 24px;">\`;
            gridHtml += grouped[groupName].map(msg => {
                const catObj = getCatObj(msg.categoria_id || msg.categoryId); // fallback for dummy data categoryId`;

if (!app.includes(`const grouped = {};`)) {
    app = app.replace(renderMsgOld, renderMsgNew);
}

const renderMsgCloseOld = `            return \`
                <div class="square-card \${isTrash ? 'trash-card' : ''}" style="\${isTrash ? 'border-color: rgba(239, 68, 68, 0.3); opacity: 0.85;' : ''}">
                    <div class="square-card-header">
                        <div class="square-card-icon \${catObj.color}">
                            <i data-lucide="\${catObj.icon}"></i>
                        </div>
                        <div class="icon-actions">
                            \${actionsHtml}
                        </div>
                    </div>
                    <h3 class="square-card-title">\${msg.title}</h3>
                    <p class="square-card-excerpt" data-id="\${msg.id}" title="Clic para expandir" style="cursor: pointer;">\${msg.excerpt}</p>
                </div>
            \`;
        }).join('') + '</div>';
    }

    document.getElementById('messages-grid').innerHTML = html;`;

const renderMsgCloseNew = `            return \`
                <div class="square-card \${isTrash ? 'trash-card' : ''}" style="\${isTrash ? 'border-color: rgba(239, 68, 68, 0.3); opacity: 0.85;' : ''}">
                    <div class="square-card-header">
                        <div class="square-card-icon \${catObj.color}">
                            <i data-lucide="\${catObj.icon}"></i>
                        </div>
                        <div class="icon-actions">
                            \${actionsHtml}
                        </div>
                    </div>
                    <h3 class="square-card-title">\${msg.title}</h3>
                    <p class="square-card-excerpt" data-id="\${msg.id}" title="Clic para expandir" style="cursor: pointer;">\${msg.excerpt}</p>
                </div>
            \`;
        }).join('');
            gridHtml += \`</div>\`;
            fullHtml += gridHtml;
        });
        html = fullHtml;
    }

    document.getElementById('messages-grid').innerHTML = html;`;

if (app.includes(`}).join('') + '</div>';`)) {
    app = app.replace(renderMsgCloseOld, renderMsgCloseNew);
}

fs.writeFileSync('src/app-supabase.js', app);
console.log("Patched src/app-supabase.js successfully");
