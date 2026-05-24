'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useId, useState, type ReactNode } from 'react'
import { useForm } from 'react-hook-form'
import { Input, Select } from '@/components/ui/input'
import {
  campFormButtonClassName,
  CAMP_FORM,
} from '@/lib/camp-minimal'
import { cn } from '@/lib/cn'
import {
  BattleRegisterSchema,
  type BattleNominationValue,
  type BattleRegisterInput,
} from '@/lib/schemas'

const NOMINATION_OPTIONS: {
  value: BattleNominationValue
  label: string
}[] = [
  { value: 'beginners', label: 'Beginners' },
  { value: 'powermove', label: 'Powermove' },
  { value: '2v2_random_kid', label: '2×2 Random — Kid' },
  { value: '2v2_random_pro', label: '2×2 Random — Pro' },
]

const defaultValues: BattleRegisterInput = {
  name: '',
  nickname: '',
  age: 12,
  nomination: 'beginners',
  consent: false,
}

const inputClass = cn(CAMP_FORM.fieldInput, 'w-full outline-none')

function FormField({
  label,
  required,
  error,
  children,
}: {
  label: string
  required?: boolean
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
      ) : null}
    </div>
  )
}

export function BattleRegisterFormClient() {
  const honeypotId = useId()
  const [honeypot, setHoneypot] = useState('')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BattleRegisterInput>({
    resolver: zodResolver(BattleRegisterSchema),
    defaultValues,
    mode: 'onBlur',
  })

  async function onSubmit(values: BattleRegisterInput): Promise<void> {
    setSubmitError(null)

    const res = await fetch('/api/battle-register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...values,
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
        <p className={CAMP_FORM.monoBright}>заявка на баттл принята</p>
        <p className={CAMP_FORM.consent}>
          Свяжемся по номинации и расписанию.
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
            placeholder="Иван"
            error={Boolean(errors.name)}
          />
        </FormField>
        <FormField label="Ник" required error={errors.nickname?.message}>
          <Input
            {...register('nickname')}
            className={inputClass}
            autoComplete="nickname"
            placeholder="b-boy name"
            error={Boolean(errors.nickname)}
          />
        </FormField>
        <FormField label="Возраст" required error={errors.age?.message}>
          <Input
            {...register('age', { valueAsNumber: true })}
            className={inputClass}
            type="number"
            min={7}
            max={99}
            inputMode="numeric"
            autoComplete="off"
            error={Boolean(errors.age)}
          />
        </FormField>
        <FormField label="Номинация" required error={errors.nomination?.message}>
          <Select
            {...register('nomination')}
            className={inputClass}
            error={Boolean(errors.nomination)}
          >
            {NOMINATION_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        </FormField>
      </div>

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
          Согласен на обработку персональных данных.
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
        {isSubmitting ? 'Отправка…' : 'Зарегистрироваться на баттл'}
      </button>
    </form>
  )
}
