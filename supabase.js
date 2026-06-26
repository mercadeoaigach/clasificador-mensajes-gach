import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://unaaimzvowqyggdkutjo.supabase.co'
// Usaremos la llave que proporcionaste. Si hay algún error, verificaremos si es la correcta.
const supabaseKey = 'sb_publishable_IR2pdn21FG_-DiKpTH9y3A_7wzmQklO'

export const supabase = createClient(supabaseUrl, supabaseKey)
