const fs = require('fs');

let appJs = fs.readFileSync('app.js', 'utf8');
const generated = fs.readFileSync('generated_app_data.js', 'utf8');

// 1. Replace the top mock data
const mockDataRegex = /\/\/ --- ESTADO Y DUMMY DATA ---[\s\S]*?\/\/ En la V2 usaremos la propiedad isPinned directa en allMessages\./;
appJs = appJs.replace(mockDataRegex, '// --- ESTADO Y DUMMY DATA ---\n' + generated + '\n\n// En la V3 usaremos la propiedad isPinned directa en allMessages.');

// 2. Change recentItems to point to real ones just for safety (or empty)
const recentRegex = /const recentItems = \[[\s\S]*?\];/;
appJs = appJs.replace(recentRegex, 'const recentItems = [];');

// 3. Change version to v3
appJs = appJs.replace(/uin_messages_v2/g, 'uin_messages_v3');
appJs = appJs.replace(/uin_categories_v2/g, 'uin_categories_v3');
appJs = appJs.replace(/uin_trash_v1/g, 'uin_trash_v3');
appJs = appJs.replace(/uin_profile_v1/g, 'uin_profile_v3');

// 4. Update renderGridForList to support subCategory
const renderGridOld = `const renderGridForList = (msgsList, isTrash = false) => {
        if (msgsList.length === 0) return '';

        let gridHtml = \`<div class="messages-square-grid" style="margin-bottom: 32px;">\`;
        gridHtml += msgsList.map(msg => {`;

const renderGridNew = `const renderGridForList = (msgsList, isTrash = false) => {
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
                fullHtml += \`<h4 style="margin-top: 12px; margin-bottom: 16px; font-size: 0.95rem; color: var(--primary-color); font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">\${groupName}</h4>\`;
            }
            let gridHtml = \`<div class="messages-square-grid" style="margin-bottom: 24px;">\`;
            gridHtml += grouped[groupName].map(msg => {`;

appJs = appJs.replace(renderGridOld, renderGridNew);

// 5. Update the closing of renderGridForList
const renderGridCloseOld = `        }).join('');
        gridHtml += \`</div>\`;
        return gridHtml;
    };`;

const renderGridCloseNew = `        }).join('');
            gridHtml += \`</div>\`;
            fullHtml += gridHtml;
        });
        return fullHtml;
    };`;

appJs = appJs.replace(renderGridCloseOld, renderGridCloseNew);

// 6. Ensure default profile is Shantal Gamboa to bypass login state visually locally
const profileOld = `const defaultProfile = { name: 'Equipo UIN', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=UIN&backgroundColor=e2e8f0' };`;
const profileNew = `const defaultProfile = { name: 'Shantal Gamboa', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shantal&backgroundColor=e2e8f0' };`;
appJs = appJs.replace(profileOld, profileNew);

fs.writeFileSync('app.js', appJs);
console.log("app.js updated successfully!");
