const TELEGRAM_API = 'https://api.telegram.org'

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function getTelegramConfig(): { botToken: string; chatId: string } | null {
  const botToken = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!botToken || !chatId) return null

  return { botToken, chatId }
}

export function isTelegramConfigured(): boolean {
  return getTelegramConfig() !== null
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const config = getTelegramConfig()
  if (!config) return

  const res = await fetch(
    `${TELEGRAM_API}/bot${config.botToken}/sendMessage`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: config.chatId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    },
  )

  if (!res.ok) {
    const payload = (await res.json().catch(() => null)) as {
      description?: string
    } | null
    throw new Error(
      payload?.description ?? `Telegram API error: ${res.status}`,
    )
  }
}

export function formatTelegramField(label: string, value: string): string {
  return `<b>${escapeHtml(label)}:</b> ${escapeHtml(value)}`
}

export { escapeHtml }
