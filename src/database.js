// import { createClient } from '@supabase/supabase-js'

// // const supabaseUrl = env.SUPABASE_URL
// // const supabaseAnonKey = env.SUPABASE_KEY
// // supabase = createClient(supabaseUrl, supabaseAnonKey)


// export const fetchAllPosts = async (env) => await createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
//     .from('posts')
//     .select('*')
//     .limit(10)

// export const fetchSpecificPostById = async (env, id) => await createClient(env.SUPABASE_URL, env.SUPABASE_KEY)
//     .from('posts')
//     .select('*')
//     .eq('id', id)


// import 'dotenv/config'
import { connect } from '@planetscale/database'

// const config = {
//   host: env.DATABASE_HOST,
//   username: env.DATABASE_USERNAME,
//   password: env.DATABASE_PASSWORD
// }

// const conn = connect(config)
// const results = async (env) => await conn.execute('select "Hello World"')

// console.log(results)
const createConn = (env) => connect({
    host: env.DATABASE_HOST,
    username: env.DATABASE_USERNAME,
    password: env.DATABASE_PASSWORD
}) 

export const fetchAllPosts = async (env) => {
    let conn = createConn(env)
    let result = await conn.execute('select * from posts limit 10')
    return result.rows
}
export const fetchSpecificPostById = async (env, id) => {
    let conn = createConn(env)
    let result = await conn.execute('select * from posts where id=?', [id])
    if (result.rows.length == 0) {
        let err = new Error()
        err.name = "404"
        err.message = "this id doesn't exists in the db"
        throw err
    }
    console.log(result)
    return result.rows
}
