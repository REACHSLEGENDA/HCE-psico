import { createClient } from '@supabase/supabase-js';

// Usar fallbacks sintácticamente válidos para evitar que la inicialización
// falle en local si no se han configurado las variables de entorno .env.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-demo-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
