import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

// Créer le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Exporter les variables pour utilisation dans les services
export { supabaseUrl, supabaseAnonKey }

