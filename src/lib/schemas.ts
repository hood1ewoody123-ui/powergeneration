import { z } from 'zod'

const optionalUrl = z
  .string()
  .optional()
  .refine((val) => !val || val === '' || z.url().safeParse(val).success, {
    message: 'Неверный URL',
  })

export const RegisterSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  city: z.string().min(2, 'Укажи город'),
  age: z
    .number({ error: 'Укажи возраст' })
    .min(7, 'Минимум 7 лет')
    .max(35, 'Максимум 35 лет'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Неверный формат телефона'),
  email: z.email('Неверный email'),
  socials: optionalUrl,
  comment: z.string().max(500, 'Максимум 500 символов').optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: 'Нужно согласие на обработку персональных данных',
  }),
})

/** Honeypot — только на API, не в клиентской схеме */
export const RegisterApiSchema = RegisterSchema.extend({
  company: z.string().optional(),
})

export const BattleNomination = z.enum([
  'beginners',
  'powermove',
  '2v2_random_kid',
  '2v2_random_pro',
])

export const BattleRegisterSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  nickname: z.string().min(2, 'Минимум 2 символа'),
  age: z
    .number({ error: 'Укажи возраст' })
    .min(7, 'Минимум 7 лет')
    .max(99, 'Максимум 99 лет'),
  nomination: BattleNomination,
  consent: z.boolean().refine((val) => val === true, {
    message: 'Нужно согласие на обработку персональных данных',
  }),
})

export const BattleRegisterApiSchema = BattleRegisterSchema.extend({
  company: z.string().optional(),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type BattleRegisterInput = z.infer<typeof BattleRegisterSchema>
export type BattleNominationValue = z.infer<typeof BattleNomination>
