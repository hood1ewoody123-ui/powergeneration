import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export interface CampApplicationInsert {
  name: string
  city: string
  age: number
  level: string
  phone: string
  email: string
  socials?: string | null
  comment?: string | null
  source?: string
  ip?: string | null
}

export interface BattleApplicationInsert {
  name: string
  nickname: string
  age: number
  nomination: string
  source?: string
  ip?: string | null
}

let adminClient: SupabaseClient | null = null

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) return null

  adminClient ??= createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })

  return adminClient
}

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.SUPABASE_SERVICE_ROLE_KEY,
  )
}
