import {
  getSupabaseAdmin,
  isSupabaseConfigured,
  type BattleApplicationInsert,
  type CampApplicationInsert,
} from '@/lib/supabase/admin'
import {
  formatTelegramField,
  isTelegramConfigured,
  sendTelegramMessage,
} from '@/lib/telegram'
import type {
  BattleNominationValue,
  BattleRegisterInput,
  RegisterInput,
} from '@/lib/schemas'

const LEVEL_LABELS: Record<RegisterInput['level'], string> = {
  beginner: 'Начинающий',
  intermediate: 'Средний',
  advanced: 'Продвинутый',
}

const NOMINATION_LABELS: Record<BattleNominationValue, string> = {
  beginners: 'Beginners',
  powermove: 'Powermove',
  '2v2_random_kid': '2×2 Random — Kid',
  '2v2_random_pro': '2×2 Random — Pro',
}

interface SubmissionMeta {
  ip: string
}

export function isSubmissionBackendConfigured(): boolean {
  return isSupabaseConfigured() || isTelegramConfigured()
}

export async function submitCampApplication(
  data: RegisterInput,
  meta: SubmissionMeta,
): Promise<void> {
  if (!isSubmissionBackendConfigured()) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[register] new application (no backend configured)', data)
      return
    }
    throw new Error('Submission backend is not configured')
  }

  const errors: string[] = []
  let saved = false
  let notified = false

  if (isSupabaseConfigured()) {
    try {
      await saveCampToSupabase(data, meta)
      saved = true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Supabase error'
      errors.push(message)
      console.error('[register] supabase failed', err)
    }
  }

  if (isTelegramConfigured()) {
    try {
      await sendCampTelegram(data)
      notified = true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Telegram error'
      errors.push(message)
      console.error('[register] telegram failed', err)
    }
  }

  if (!saved && !notified) {
    throw new Error(errors.join(' · ') || 'All backends failed')
  }
}

export async function submitBattleApplication(
  data: BattleRegisterInput,
  meta: SubmissionMeta,
): Promise<void> {
  if (!isSubmissionBackendConfigured()) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[battle-register] new application (no backend configured)', data)
      return
    }
    throw new Error('Submission backend is not configured')
  }

  const errors: string[] = []
  let saved = false
  let notified = false

  if (isSupabaseConfigured()) {
    try {
      await saveBattleToSupabase(data, meta)
      saved = true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Supabase error'
      errors.push(message)
      console.error('[battle-register] supabase failed', err)
    }
  }

  if (isTelegramConfigured()) {
    try {
      await sendBattleTelegram(data)
      notified = true
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Telegram error'
      errors.push(message)
      console.error('[battle-register] telegram failed', err)
    }
  }

  if (!saved && !notified) {
    throw new Error(errors.join(' · ') || 'All backends failed')
  }
}

async function saveCampToSupabase(
  data: RegisterInput,
  meta: SubmissionMeta,
): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) throw new Error('Supabase is not configured')

  const row: CampApplicationInsert = {
    name: data.name,
    city: data.city,
    age: data.age,
    level: data.level,
    phone: data.phone,
    email: data.email,
    socials: data.socials?.trim() || null,
    comment: data.comment?.trim() || null,
    source: 'pgc-landing',
    ip: meta.ip,
  }

  const { error } = await supabase.from('camp_applications').insert(row)

  if (error) {
    throw new Error(`Supabase: ${error.message}`)
  }
}

async function saveBattleToSupabase(
  data: BattleRegisterInput,
  meta: SubmissionMeta,
): Promise<void> {
  const supabase = getSupabaseAdmin()
  if (!supabase) throw new Error('Supabase is not configured')

  const row: BattleApplicationInsert = {
    name: data.name,
    nickname: data.nickname,
    age: data.age,
    nomination: data.nomination,
    source: 'pgc-battle',
    ip: meta.ip,
  }

  const { error } = await supabase.from('battle_applications').insert(row)

  if (error) {
    throw new Error(`Supabase: ${error.message}`)
  }
}

async function sendCampTelegram(data: RegisterInput): Promise<void> {
  const lines = [
    '🏕 Новая заявка · лагерь',
    '',
    formatTelegramField('Имя', data.name),
    formatTelegramField('Город', data.city),
    formatTelegramField('Возраст', String(data.age)),
    formatTelegramField('Уровень', LEVEL_LABELS[data.level]),
    formatTelegramField('Телефон', data.phone),
    formatTelegramField('Email', data.email),
  ]

  if (data.socials?.trim()) {
    lines.push(formatTelegramField('Соцсети', data.socials.trim()))
  }

  if (data.comment?.trim()) {
    lines.push(formatTelegramField('Комментарий', data.comment.trim()))
  }

  await sendTelegramMessage(lines.join('\n'))
}

async function sendBattleTelegram(data: BattleRegisterInput): Promise<void> {
  const lines = [
    '⚔️ Новая заявка · Muta Born Battle',
    '',
    formatTelegramField('Имя', data.name),
    formatTelegramField('Ник', data.nickname),
    formatTelegramField('Возраст', String(data.age)),
    formatTelegramField('Номинация', NOMINATION_LABELS[data.nomination]),
  ]

  await sendTelegramMessage(lines.join('\n'))
}
