import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://unaaimzvowqyggdkutjo.supabase.co';
const supabaseKey = 'sb_publishable_IR2pdn21FG_-DiKpTH9y3A_7wzmQklO';

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    // 1. Get all conjuntos to see what users exist
    const { data: conjuntos, error: cErr } = await supabase.from('conjuntos').select('*');
    if (cErr) console.error("Error fetching conjuntos:", cErr);
    else console.log("Conjuntos:", conjuntos);

    // 2. We can try to fetch all messages to see the schema
    const { data: messages, error: mErr } = await supabase.from('mensajes').select('*').limit(1);
    if (mErr) console.error("Error fetching mensajes:", mErr);
    else console.log("Mensajes Schema example:", messages);
}

main();
