import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    'Supabase env vars are missing. Create .env from .env.example and set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.',
  )
}

const fallbackSupabaseUrl = 'https://example.supabase.co'
const fallbackSupabaseAnonKey = 'missing-supabase-anon-key'

export const supabase = createClient(
  supabaseUrl ?? fallbackSupabaseUrl,
  supabaseAnonKey ?? fallbackSupabaseAnonKey,
)