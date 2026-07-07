import { createClient } from '@supabase/supabase-js';
import { defaultWorkspaceCategories, defaultAppMessages } from './generated_app_data.js';

const supabaseUrl = 'https://unaaimzvowqyggdkutjo.supabase.co';
const supabaseKey = 'sb_publishable_IR2pdn21FG_-DiKpTH9y3A_7wzmQklO';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    console.log("Signing in...");
    const { data: authData, error: authErr } = await supabase.auth.signInWithPassword({
        email: 'sgamboa@uin.ac.cr',
        password: 'Shantal2026!'
    });
    if (authErr) {
        console.error("Auth Error:", authErr.message);
        return;
    }
    console.log("Logged in as:", authData.user.email);
    
    // 1. Check if "Shantal 2026" conjunto exists, otherwise create it
    let { data: conjuntos, error: cErr } = await supabase.from('conjuntos').select('*').eq('name', 'Shantal 2026');
    if (cErr) throw cErr;
    
    let conjuntoId;
    if (conjuntos && conjuntos.length > 0) {
        conjuntoId = conjuntos[0].id;
        console.log("Found existing conjunto:", conjuntoId);
    } else {
        console.log("Creating conjunto 'Shantal 2026'...");
        const { data: newC, error: ncErr } = await supabase.from('conjuntos').insert([{ name: 'Shantal 2026' }]).select();
        if (ncErr) throw ncErr;
        conjuntoId = newC[0].id;
        console.log("Created conjunto:", conjuntoId);
    }

    // 2. Create Categories
    const categoryIdMap = {}; // mapping from local id (e.g. 'cat_1') to Supabase uuid
    for (const cat of defaultWorkspaceCategories) {
        let { data: existingCats, error: ecErr } = await supabase.from('categorias').select('*').eq('conjunto_id', conjuntoId).eq('name', cat.name);
        let catId;
        if (existingCats && existingCats.length > 0) {
            catId = existingCats[0].id;
            console.log("Found existing category:", cat.name);
        } else {
            console.log("Creating category:", cat.name);
            const { data: newCat, error: ncatErr } = await supabase.from('categorias').insert([{
                conjunto_id: conjuntoId,
                name: cat.name,
                color: cat.color,
                icon: cat.icon
            }]).select();
            if (ncatErr) throw ncatErr;
            catId = newCat[0].id;
        }
        categoryIdMap[cat.id] = catId;
    }
    
    // 3. Create Messages (sub_categoria is a text column on mensajes)
    console.log(`Inserting ${defaultAppMessages.length} messages...`);
    let count = 0;
    for (const msg of defaultAppMessages) {
        const catId = categoryIdMap[msg.categoryId];
        if (!catId) {
            console.log(`Skipping message ${msg.title} because category not found in map.`);
            continue;
        }
        // Ensure no exact duplicate
        let { data: existingMsgs } = await supabase.from('mensajes').select('*').eq('categoria_id', catId).eq('title', msg.title);
        if (existingMsgs && existingMsgs.length > 0) {
            // Already exists, skip
        } else {
            const sub = msg.subCategory && msg.subCategory !== 'null' ? msg.subCategory : null;
            
            // Wait, does subcategorias table exist? If so, we need to add the division!
            // First check if subcategorias exist and insert it if not.
            if (sub) {
                let { data: existingSubs } = await supabase.from('subcategorias').select('*').eq('categoria_id', catId).eq('name', sub);
                if (!existingSubs || existingSubs.length === 0) {
                    await supabase.from('subcategorias').insert([{ categoria_id: catId, name: sub }]);
                    console.log(`Created subcategory ${sub}`);
                }
            }
            
            const { error: nmsgErr } = await supabase.from('mensajes').insert([{
                categoria_id: catId,
                sub_categoria: sub,
                title: msg.title,
                excerpt: msg.excerpt,
                is_pinned: msg.is_pinned || false
            }]);
            if (nmsgErr) {
                console.error("Error inserting message:", msg.title, nmsgErr.message);
            } else {
                count++;
            }
        }
    }
    console.log(`✅ Done uploading to Supabase! Inserted ${count} new messages.`);
}

run().catch(console.error);
