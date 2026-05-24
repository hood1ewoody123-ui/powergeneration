'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select, Textarea } from '@/components/ui/input'
import {
  campFormButtonClassName,
  CAMP_FORM,
} from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import { RegisterSchema, type RegisterInput } from '@/lib/schemas'
import type { SkillLevel } from '@/types'

const LEVEL_OPTIONS: { value: SkillLevel; label: string }[] = [
  { value: 'beginner', label: 'Начинающий' },
  { value: 'intermediate', label: 'Средний' },
  { value: 'advanced', label: 'Продвинутый' },
]

const defaultValues: RegisterInput = {
  name: '',
  city: '',
  age: 10,
  level: 'beginner',
  phone: '',
  email: '',
  socials: '',
  comment: '',
  consent: false,
}

const inputClass = cn(CAMP_FORM.fieldInput, 'w-full outline-none')

function FormField({
  label,
  required,
  hint,
  error,
  children,
}: {
  label: string
  required?: boolean
  hint?: string
  error?: string
  children: ReactNode
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className={CAMP_FORM.fieldLabel}>
        {label}
        {required ? ' *' : ''}
      </span>
      {children}
      {error ? (
        <span className={CAMP_FORM.fieldError}>{error}</span>
      ) : hint && !error ? (
        <span className={cn(CAMP_FORM.fieldLabel, 'normal-case opacity-80')}>
          {hint}
        </span>
      ) : null}
    </div>
  )
}

export function RegisterFormClient() {
  const honeypotId = useId()
  const [honeypot, setHoneypot] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
    mode: 'onBlur',
  })

  async function onSubmit(values: RegisterInput): Promise<void> {
    setSubmitError(null)

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
        socials: values.socials?.trim() || undefined,
        comment: values.comment?.trim() || undefined,
        company: honeypot,
      }),
    })

    if (!res.ok) {
      const payload = (await res.json().catch(() => null)) as {
        error?: string
      } | null
      setSubmitError(
        payload?.error ?? 'Не удалось отправить заявку. Попробуйте ещё раз.',
      )
      return
    }

    setSuccess(true)
    reset(defaultValues)
  }

  if (success) {
    return (
      <div className="space-y-3">
        <p className={CAMP_FORM.monoBright}>заявка принята</p>
        <p className={CAMP_FORM.consent}>
          Свяжемся в течение 1–2 рабочих дней.
        </p>
        <button
          type="button"
          className={cn(campFormButtonClassName(), 'mt-3')}
          onClick={() => setSuccess(false)}
        >
          Отправить ещё
        </button>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="relative space-y-6"
      aria-busy={isSubmitting}
    >
      {submitError ? (
        <p role="alert" className={CAMP_FORM.fieldError}>
          {submitError}
        </p>
      ) : null}

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor={honeypotId}>Company</label>
        <input
          id={honeypotId}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Имя" required error={errors.name?.message}>
          <Input
            {...register('name')}
            className={inputClass}
            autoComplete="name"
            placeholder="Иван Иванов"
            error={Boolean(errors.name)}
          />
        </FormField>
        <FormField label="Город" required error={errors.city?.message}>
          <Input
            {...register('city')}
            className={inputClass}
            autoComplete="address-level2"
            placeholder="Казань"
            error={Boolean(errors.city)}
          />
        </FormField>
        <FormField label="Возраст" required error={errors.age?.message}>
          <Input
            {...register('age', { valueAsNumber: true })}
            className={inputClass}
            type="number"
            min={7}
            max={35}
            inputMode="numeric"
            autoComplete="off"
            error={Boolean(errors.age)}
          />
        </FormField>
        <FormField label="Уровень" required error={errors.level?.message}>
          <Select
            {...register('level')}
            className={inputClass}
            error={Boolean(errors.level)}
          >
            {LEVEL_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </FormField>
        <FormField
          label="Телефон"
          required
          hint="+7…"
          error={errors.phone?.message}
        >
          <Input
            {...register('phone')}
            className={inputClass}
            type="tel"
            autoComplete="tel"
            placeholder="+79001234567"
            error={Boolean(errors.phone)}
          />
        </FormField>
        <FormField label="Email" required error={errors.email?.message}>
          <Input
            {...register('email')}
            className={inputClass}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={Boolean(errors.email)}
          />
        </FormField>
      </div>

      <FormField label="Соцсети" error={errors.socials?.message}>
        <Input
          {...register('socials')}
          className={inputClass}
          type="url"
          autoComplete="url"
          placeholder="https://"
          error={Boolean(errors.socials)}
        />
      </FormField>

      <FormField label="Комментарий" error={errors.comment?.message}>
        <Textarea
          {...register('comment')}
          className={cn(inputClass, 'min-h-16 resize-none py-2')}
          placeholder="Вопросы…"
          rows={2}
          error={Boolean(errors.comment)}
        />
      </FormField>

      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className={cn(
            'mt-0.5 size-3 shrink-0 appearance-none border-2 border-brand bg-transparent',
            'checked:border-brand checked:bg-brand',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50',
            errors.consent && 'border-brand',
          )}
          {...register('consent')}
        />
        <span className={CAMP_FORM.consent}>
          Согласен на обработку данных и сообщения по заявке.
          {errors.consent ? (
            <span className={cn(CAMP_FORM.fieldError, 'mt-1 block')}>
              {errors.consent.message}
            </span>
          ) : null}
        </span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className={cn(campFormButtonClassName(), isSubmitting && 'opacity-40')}
      >
        {isSubmitting ? 'Отправка…' : 'Отправить заявку'}
      </button>
    </form>
  )
}
