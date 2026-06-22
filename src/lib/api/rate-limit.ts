import type { NextRequest } from 'next/server'

const RATE_LIMIT_WINDOW_MS = 60_000
const RATE_LIMIT_MAX = 5
const ipHits = new Map<string, { count: number; resetAt: number }>()

export function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() ?? 'unknown'
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export function isRateLimited(ip: string): boolean {
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

export function isHoneypotTriggered(body: unknown): boolean {
  return (
    typeof body === 'object' &&
    body !== null &&
    'company' in body &&
    typeof (body as { company?: string }).company === 'string' &&
    (body as { company: string }).company.length > 0
  )
}
