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

export function getSupabaseUrl(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() ||
    process.env.SUPABASE_URL?.trim() ||
    undefined
  )
}

export function getSupabaseServiceRoleKey(): string | undefined {
  return (
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim() ||
    undefined
  )
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = getSupabaseUrl()
  const serviceRoleKey = getSupabaseServiceRoleKey()

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
  return Boolean(getSupabaseUrl() && getSupabaseServiceRoleKey())
}

export async function testSupabaseConnection(): Promise<{
  ok: boolean
  error?: string
}> {
  const supabase = getSupabaseAdmin()
  if (!supabase) {
    return { ok: false, error: 'Supabase env vars missing' }
  }

  const { error } = await supabase
    .from('camp_applications')
    .select('id')
    .limit(1)

  if (error) {
    return { ok: false, error: error.message }
  }

  return { ok: true }
}
