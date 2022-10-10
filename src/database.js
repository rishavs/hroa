import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = env.SUPABASE_URL
// const supabaseAnonKey = env.SUPABASE_KEY
// supabase = createClient(supabaseUrl, supabaseAnonKey)


export const fetchAllPosts = async (env) => await createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
    .from('posts')
    .select('*')
    .limit(10)

export const fetchSpecificPostById = async (env, id) => await createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
    .from('posts')
    .select('*')
    .eq('id', id)