import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
    throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseKey)

// Type definitions for database tables (to be expanded as schema evolves)
export type Database = {
    public: {
        Tables: {
            // Future tables will be defined here
            // e.g., metrics: { Row: { id: string, value: number, ... } }
        }
        Views: {
            // Future views will be defined here
        }
        Functions: {
            // Future functions will be defined here
        }
        Enums: {
            // Future enums will be defined here
        }
    }
}
