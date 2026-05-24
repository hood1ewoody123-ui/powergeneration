import { NextResponse, type NextRequest } from 'next/server'
import { ZodError } from 'zod'
import { RegisterApiSchema } from '@/lib/schemas'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const ipHits = new Map<string, { count: number; resetAt: number }>()

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown'
  return req.headers.get('x-real-ip') ?? 'unknown'
}

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = ipHits.get(ip)

  if (!entry || now > entry.resetAt) {
    ipHits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return false
  }

  if (entry.count >= RATE_LIMIT_MAX) return true

  entry.count += 1
  return false
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const ip = getClientIp(req)

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Слишком много попыток. Попробуйте через минуту.' },
      { status: 429 },
    )
  }

  try {
    const body: unknown = await req.json()

    if (
      typeof body === 'object' &&
      body !== null &&
      'company' in body &&
      typeof (body as { company?: string }).company === 'string' &&
      (body as { company: string }).company.length > 0
    ) {
      return NextResponse.json({ ok: true })
    }

    const parsed = RegisterApiSchema.parse(body)
    const { company: _company, ...data } = parsed

    const webhookUrl = process.env.REGISTER_WEBHOOK_URL
    if (webhookUrl) {
      const webhookRes = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          submittedAt: new Date().toISOString(),
          source: 'pgc-landing',
        }),
      })

      if (!webhookRes.ok) {
        console.error('[register] webhook failed', webhookRes.status)
        return NextResponse.json(
          { error: 'Не удалось отправить заявку. Попробуйте позже.' },
          { status: 502 },
        )
      }
    } else if (process.env.NODE_ENV === 'development') {
      console.info('[register] new application', data)
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof ZodError) {
      return NextResponse.json(
        { error: 'Проверьте поля формы', fieldErrors: err.flatten().fieldErrors },
        { status: 400 },
      )
    }

    console.error('[register]', err)
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 },
    )
  }
}
