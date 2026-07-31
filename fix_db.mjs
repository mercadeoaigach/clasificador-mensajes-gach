import { createClient } from '@supabase/supabase-js';
import { validShantalCategories, validShantalMessages, newOfficialCategories, newOfficialMessages } from './official_v2_data.mjs';

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
    const userId = authData.user.id;
    console.log("Logged in as:", authData.user.email);
    
    // ==========================================
    // 1. CLEAN UP "Shantal 2026"
    // ==========================================
    console.log("--- Cleaning Shantal 2026 ---");
    const { data: shantalConjuntos } = await supabase.from('conjuntos').select('*').eq('name', 'Shantal 2026').is('deleted_at', null);
    if (shantalConjuntos && shantalConjuntos.length > 0) {
        const shantalId = shantalConjuntos[0].id;
        
        const { data: shantalCats } = await supabase.from('categorias').select('*').eq('conjunto_id', shantalId);
        for (const cat of shantalCats) {
            if (!validShantalCategories.includes(cat.name)) {
                console.log(`Deleting invalid category from Shantal 2026: ${cat.name}`);
                await supabase.from('categorias').delete().eq('id', cat.id);
            } else {
                // Check messages in valid category
                const { data: msgs } = await supabase.from('mensajes').select('*').eq('categoria_id', cat.id);
                for (const msg of msgs) {
                    if (!validShantalMessages.includes(msg.title)) {
                        console.log(`Deleting invalid message from ${cat.name}: ${msg.title}`);
                        await supabase.from('mensajes').delete().eq('id', msg.id);
                    }
                }
            }
        }
    }

    // ==========================================
    // 2. CLEAN UP OLD OFFICIAL GUIDES
    // ==========================================
    console.log("--- Cleaning old Official Guides ---");
    const { data: oldGuides } = await supabase.from('conjuntos').select('*').like('name', 'Guia para respuestas CRM 2026%').is('deleted_at', null);
    for (const guide of (oldGuides || [])) {
        console.log(`Deleting old guide: ${guide.name}`);
        await supabase.from('conjuntos').update({ deleted_at: new Date().toISOString() }).eq('id', guide.id);
        // Supabase often doesn't cascade logical deletes or we might just use real deletes if possible:
        // Actually, let's hard delete just in case, but soft delete is safe.
        // I will do soft delete for conjuntos, but hard delete for its categories to be safe? 
        // No, soft deleting the conjunto removes it from the UI. That's fine.
    }

    // ==========================================
    // 3. SEED NEW "Guia para respuestas CRM 2026 V2"
    // ==========================================
    console.log("--- Seeding Guia para respuestas CRM 2026 V2 ---");
    const { data: newC, error: ncErr } = await supabase.from('conjuntos').insert([{ user_id: userId, name: 'Guia para respuestas CRM 2026 V2' }]).select();
    if (ncErr) {
        console.error("Error creating V2 conjunto:", ncErr);
        return;
    }
    const newConjuntoId = newC[0].id;

    // Create categories
    const categoryMap = {};
    for (const catDef of newOfficialCategories) {
        const { data: newCat, error: catErr } = await supabase.from('categorias').insert([{
            conjunto_id: newConjuntoId,
            name: catDef.name,
            color: catDef.color,
            icon: catDef.icon
        }]).select();
        
        if (catErr) {
            console.error("Error creating category:", catDef.name, catErr);
        } else {
            categoryMap[catDef.name] = newCat[0].id;
            console.log(`Created category: ${catDef.name}`);
        }
    }

    // Create messages
    let msgCount = 0;
    for (const msgDef of newOfficialMessages) {
        const catId = categoryMap[msgDef.category];
        if (!catId) {
            console.error(`Unknown category for message: ${msgDef.title}`);
            continue;
        }
        const { error: msgErr } = await supabase.from('mensajes').insert([{
            categoria_id: catId,
            title: msgDef.title,
            excerpt: msgDef.excerpt,
            internal_note: msgDef.note,
            is_pinned: false
        }]);
        if (msgErr) {
            console.error(`Error inserting message ${msgDef.title}:`, msgErr);
        } else {
            msgCount++;
        }
    }

    console.log(`✅ Successfully seeded V2 Guide with ${msgCount} messages!`);
}

run().catch(console.error);
