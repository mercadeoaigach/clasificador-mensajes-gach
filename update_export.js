const fs = require('fs');

let content = fs.readFileSync('src/app-supabase.js', 'utf8');

// The block starts at `// --- LÓGICA DE EXPORTACIÓN (RESPALDO) ---`
const blockStart = content.indexOf('// --- LÓGICA DE EXPORTACIÓN (RESPALDO) ---');
if (blockStart !== -1) {
    content = content.substring(0, blockStart);
}

const newLogic = `// --- LÓGICA DE EXPORTACIÓN (RESPALDO) ---
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
        a.download = \`uin_respaldo_total_\${new Date().toISOString().split('T')[0]}.json\`;
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
`;

fs.writeFileSync('src/app-supabase.js', content + newLogic);
console.log('Updated backup logic attached to both buttons.');
