import { createClient } from '@supabase/supabase-js'

// We'll export a function that creates the Supabase client
export function createSupabaseClient(runtimeConfig) {
  const supabaseUrl = runtimeConfig.public.supabaseUrl
  const supabaseKey = runtimeConfig.public.supabaseKey

  return createClient(supabaseUrl, supabaseKey)
}
