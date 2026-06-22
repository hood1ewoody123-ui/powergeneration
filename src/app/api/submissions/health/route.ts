import {
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
  isSupabaseConfigured,
  testSupabaseConnection,
} from '@/lib/supabase/admin'
import { isTelegramConfigured, testTelegramConnection } from '@/lib/telegram'

export async function GET(req: Request): Promise<Response> {
  const url = new URL(req.url)
  const pingTelegram = url.searchParams.get('ping') === 'telegram'

  const supabaseConfigured = isSupabaseConfigured()
  const telegramConfigured = isTelegramConfigured()

  const supabase =
    supabaseConfigured ? await testSupabaseConnection() : { ok: false, error: 'not configured' }

  let telegram: { ok: boolean; error?: string } = {
    ok: false,
    error: telegramConfigured ? 'add ?ping=telegram to send test message' : 'not configured',
  }

  if (pingTelegram && telegramConfigured) {
    telegram = await testTelegramConnection()
  }

  let supabaseHost: string | null = null
  try {
    const rawUrl = getSupabaseUrl()
    supabaseHost = rawUrl ? new URL(rawUrl).host : null
  } catch {
    supabaseHost = 'invalid-url'
  }

  return Response.json({
    version: 'submissions-v2',
    env: {
      supabaseUrl: Boolean(getSupabaseUrl()),
      supabaseHost,
      supabaseKey: Boolean(getSupabaseServiceRoleKey()),
      telegramToken: Boolean(process.env.TELEGRAM_BOT_TOKEN?.trim()),
      telegramChatId: Boolean(process.env.TELEGRAM_CHAT_ID?.trim()),
    },
    supabase: {
      configured: supabaseConfigured,
      ...supabase,
    },
    telegram: {
      configured: telegramConfigured,
      ...telegram,
    },
  })
}
