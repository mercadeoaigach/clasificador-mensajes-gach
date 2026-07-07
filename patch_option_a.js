const fs = require('fs');

let appJs = fs.readFileSync('src/app-supabase.js', 'utf8');

// 1. Añadir variables de estado globales para subcategorias
const stateVarsOld = `let allConjuntos = [];
let workspaceCategories = [];
let allMessages = [];`;
const stateVarsNew = `let allConjuntos = [];
let workspaceCategories = [];
let allSubcategorias = [];
let allMessages = [];`;
if (!appJs.includes('let allSubcategorias = [];')) {
    appJs = appJs.replace(stateVarsOld, stateVarsNew);
}

// 2. Mock de subcategorías locales
const loadDataOld = `        workspaceCategories = defaultWorkspaceCategories;
        allMessages = defaultAppMessages;`;
const loadDataNew = `        workspaceCategories = defaultWorkspaceCategories;
        allMessages = defaultAppMessages;
        // Extraemos las subcategorías únicas iniciales como entidades mockeadas
        allSubcategorias = Array.from(new Set(defaultAppMessages.map(m => m.subCategory).filter(Boolean))).map((name, i) => ({
            id: 'mock_sub_' + i,
            categoria_id: 'cat_4', // hardcoded to cat_4 for the mock
            name: name
        }));`;
if (appJs.includes(loadDataOld)) {
    appJs = appJs.replace(loadDataOld, loadDataNew);
}

// 3. Modificar la acción de Guardar Subcategoría para usar allSubcategorias
const saveSubOld = `        if (oldName) {
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
        }`;
const saveSubNew = `        if (oldName) {
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
    }`;
if (appJs.includes(saveSubOld)) {
    appJs = appJs.replace(saveSubOld, saveSubNew);
}

// 4. Modificar renderMessages para que iteré sobre allSubcategorias de la categoria activa, asegurando que existan
const renderMsgOld = `        const grouped = {};
        msgsToRender.forEach(msg => {
            // Check if subCategory exists (either dummy data or future DB column)
            const sc = msg.subCategory || 'General';
            if (!grouped[sc]) grouped[sc] = [];
            grouped[sc].push(msg);
        });

        let fullHtml = '';
        const groups = Object.keys(grouped).sort((a,b) => a === 'General' ? -1 : (b === 'General' ? 1 : a.localeCompare(b)));

        groups.forEach(groupName => {`;
const renderMsgNew = `        const grouped = {};
        // 1. Inicializar los grupos basados en allSubcategorias para que se muestren aunque estén vacíos
        if (activeCategoryId !== 'all' && activeCategoryId !== 'trash') {
            const subsForCat = allSubcategorias.filter(s => s.categoria_id === activeCategoryId);
            subsForCat.forEach(s => {
                grouped[s.name] = [];
            });
        }
        
        // 2. Llenar los mensajes
        msgsToRender.forEach(msg => {
            const sc = msg.subCategory || 'General';
            if (!grouped[sc]) grouped[sc] = [];
            grouped[sc].push(msg);
        });

        let fullHtml = '';
        const groups = Object.keys(grouped).sort((a,b) => a === 'General' ? -1 : (b === 'General' ? 1 : a.localeCompare(b)));

        groups.forEach(groupName => {`;
if (appJs.includes(renderMsgOld)) {
    appJs = appJs.replace(renderMsgOld, renderMsgNew);
}

// 5. Modificar el Edit Modal para que lea desde allSubcategorias
const editCatOld = `            // Llenar select de subcategorias extrayendo las existentes en esta categoría
            const selectSub = document.getElementById('edit-subcategory');
            const catId = msg.categoria_id || msg.categoryId;
            const subs = Array.from(new Set(allMessages.filter(m => (m.categoria_id || m.categoryId) === catId && m.subCategory).map(m => m.subCategory)));
            selectSub.innerHTML = '<option value="">General (Sin división)</option>' + subs.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            selectSub.value = msg.subCategory || '';`;
const editCatNew = `            // Llenar select de subcategorias extrayendo de allSubcategorias
            const selectSub = document.getElementById('edit-subcategory');
            const catId = msg.categoria_id || msg.categoryId;
            const subs = allSubcategorias.filter(s => s.categoria_id === catId).map(s => s.name);
            selectSub.innerHTML = '<option value="">General (Sin división)</option>' + subs.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            selectSub.value = msg.subCategory || '';
            
            // Re-render subcategories when category changes
            document.getElementById('edit-category').onchange = (e) => {
                const newCatId = e.target.value;
                const newSubs = allSubcategorias.filter(s => s.categoria_id === newCatId).map(s => s.name);
                selectSub.innerHTML = '<option value="">General (Sin división)</option>' + newSubs.map(s => \`<option value="\${s}">\${s}</option>\`).join('');
            };`;
if (appJs.includes(editCatOld)) {
    appJs = appJs.replace(editCatOld, editCatNew);
}

fs.writeFileSync('src/app-supabase.js', appJs);
console.log("Option A logic implemented in app-supabase.js");
