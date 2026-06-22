import { NextResponse, type NextRequest } from 'next/server'
import { ZodError } from 'zod'
import { getClientIp, isHoneypotTriggered, isRateLimited } from '@/lib/api/rate-limit'
import { RegisterApiSchema } from '@/lib/schemas'
import { submitCampApplication } from '@/lib/submissions'

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

    if (isHoneypotTriggered(body)) {
      return NextResponse.json({ ok: true })
    }

    const parsed = RegisterApiSchema.parse(body)
    const { company: _company, ...data } = parsed

    await submitCampApplication(data, { ip })

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
      { error: 'Не удалось отправить заявку. Попробуйте позже.' },
      { status: 502 },
    )
  }
}
