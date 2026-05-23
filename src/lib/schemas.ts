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
  age: z.coerce.number().min(14, 'Минимум 14 лет').max(35, 'Максимум 35 лет'),
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Неверный формат телефона'),
  email: z.email('Неверный email'),
  socials: optionalUrl,
  comment: z.string().max(500, 'Максимум 500 символов').optional(),
})

export const BattleSchema = z.object({
  name: z.string().min(2, 'Минимум 2 символа'),
  city: z.string().min(2, 'Укажи город'),
  crew: z.string().optional(),
  category: z.enum(['solo', '2vs2', 'crew']),
  phone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, 'Неверный формат телефона'),
  email: z.email('Неверный email'),
  video_link: optionalUrl,
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type BattleInput = z.infer<typeof BattleSchema>
