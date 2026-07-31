import { createClient } from '@supabase/supabase-js';

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
    
    // 1. Get all conjuntos
    const { data: conjuntos, error: cErr } = await supabase.from('conjuntos').select('*');
    console.log("Conjuntos:", conjuntos);

    for (const c of conjuntos) {
        const { data: cats } = await supabase.from('categorias').select('*').eq('conjunto_id', c.id);
        console.log(`Conjunto: ${c.name} has ${cats.length} categories`);
        for (const cat of cats) {
            const { data: msgs } = await supabase.from('mensajes').select('title, internal_note').eq('categoria_id', cat.id);
            console.log(`  Cat ${cat.name}: ${msgs.length} messages`);
            // just print some titles to see what is corrupted
            if (msgs.length > 0) {
                console.log(`    sample msgs: ${msgs.map(m=>m.title).slice(0, 3).join(', ')}`);
            }
        }
    }
}
run().catch(console.error);
